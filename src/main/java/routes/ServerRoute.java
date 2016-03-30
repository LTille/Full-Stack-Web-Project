package routes;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;
import java.util.Date;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONObject;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.*;
import javax.xml.transform.stream.*;
import javax.xml.transform.dom.*;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import static spark.Spark.get;
import static spark.Spark.*;
import java.sql.*;
import java.util.ArrayList;
import spark.template.freemarker.FreeMarkerEngine;
import spark.ModelAndView;
import com.heroku.sdk.jdbc.DatabaseUrl;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ServerRoute {

  Gson gson = new Gson();

  public ServerRoute() {
    setupRoutes();
  }

  private void setupRoutes() {

  get("/db", (req, res) -> {
    Connection connection = null;
    Map<String, Object> attributes = new HashMap<>();
    try {
      connection = DatabaseUrl.extract().getConnection();

      Statement stmt = connection.createStatement();
      stmt.executeUpdate("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)");
      stmt.executeUpdate("INSERT INTO ticks VALUES (now())");
      ResultSet rs = stmt.executeQuery("SELECT tick FROM ticks");

      ArrayList<String> output = new ArrayList<String>();
      while (rs.next()) {
        output.add( "Read from DB: " + rs.getTimestamp("tick"));
      }

      attributes.put("results", output);
      return new ModelAndView(attributes, "db.ftl");
    } catch (Exception e) {
      attributes.put("message", "There was an error: " + e);
      return new ModelAndView(attributes, "error.ftl");
    } finally {
      if (connection != null) try{connection.close();} catch(SQLException e){}
      }
    }, new FreeMarkerEngine());

    //get JSON through API
    get("/api/detail/info", (req, res) -> {
      Map<String, Object> data = new HashMap<>();
      data.put("description", "This is a awesome product. Good for study");
      data.put("price", "$40");
      data.put("offer", "Delivery Offered");
      data.put("contact", "Tillie");
      return data;
    }, gson::toJson);

    //respond to post json request from client
    post("/regProcess", (req, res) -> {
         Connection connection = null;
          //**Testing**
          System.out.println(req.body());
        try {
          connection = DatabaseUrl.extract().getConnection();
          JSONObject obj = new JSONObject(req.body());
          String username = obj.getString("username");
          String email = obj.getString("email");
          String password = obj.getString("password");

          String sql = "INSERT INTO student(username, email, password) VALUES ('"
                        + username + "','" + email + "','" + password + "')";

          connection = DatabaseUrl.extract().getConnection();
          Statement stmt = connection.createStatement();
          stmt.executeUpdate(sql);

           //**Testing**
         System.out.println(username);
         System.out.println(email);
         System.out.println(password);

         res.status(200);
         return req.body();
        } catch (Exception e) {
          res.status(500);
          return e.getMessage();
        } finally {

        }
      });

   //freemarker entering through about me footer in the homepage
    get("/about", (request, response) -> {
      Map<String, Object> attributes = new HashMap<>();
      attributes.put("title", "About Me");
      attributes.put("name", "Ting Li");
      attributes.put("description", "This is my first Full Stack websiste.");
      attributes.put("profession", "Currently, I am a master student in Univeristy of Pittsburgh majoring in Information Science");
      return new ModelAndView(attributes, "about.ftl");
    }, new FreeMarkerEngine());

    //freemaker with conditional judgement from contact name in the detail.html page
     get("/contact", (request, response) -> {
       Map<String, Object> attributes = new HashMap<>();
       attributes.put("title","Contact information");
       attributes.put("name", "Tillie");
       attributes.put("address", "734 broughton street PA15213");
       attributes.put("email", "tingli1101376@gmail.com");
       attributes.put("phone", "4123764519");
       attributes.put("delivery", "yes");
       attributes.put("contact", "phone");
       return new ModelAndView(attributes, "contact.ftl");
     }, new FreeMarkerEngine());

    //loading xml with xsd schema from file system and present in freemaker searchResult.ftl
    get("/searchResult", (request, response) -> {
      Map<String, Object> attributes = new HashMap<>();
      attributes.put("title", "SearchResult");
      return new ModelAndView(attributes, "searchResult.ftl");
    }, new FreeMarkerEngine());

   //hard code xml file using Stirng
    get("/api/searchXML", (req, res) -> {
        String xml =    "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
        "<Item>"+
        "<Category>Motor</Category>"+
        "<Delivery>no</Delivery>"+
        "<Address>734 broughton street PA15213</Address>"+
        "<AdTitle>One year used car Sale</AdTitle>"+
        "<Images>images/ads/6.jpg</Images>"+
        "<Description>It was bought one year ago with great engine</Description>"+
        "<Price>10000</Price>"+
        "<Telephone>4124445559</Telephone>"+
        "<Contact>abc123@hotmail.com</Contact>"+
        "</Item>";
      res.type("text/xml");
      return xml;
    });

    get("/api/productXML", (req, res) -> {
      Connection connection = null;
      res.type("application/xml"); //Return as XML
      res.header("Access-Control-Allow-Origin", "https://desolate-thicket-4106.herokuapp.com");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      Map<String, Object> attributes = new HashMap<>();
      try {
        //Connect to Database and execute SQL Query
        connection = DatabaseUrl.extract().getConnection();
        Statement stmt = connection.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM product");

        //Get column count of resultset
        ResultSetMetaData rsmd = rs.getMetaData();
        int colCount = rsmd.getColumnCount();

        //create new document
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.newDocument();

        //create new element for sql results
        Element results = doc.createElement("Product");
        doc.appendChild(results);

        //create each row and make column name tags as element
        while (rs.next()) {
          Element row = doc.createElement("Item");
          results.appendChild(row);
          for (int ii = 1; ii <= colCount; ii++) {
            String columnName = rsmd.getColumnName(ii);
            Object value = rs.getObject(ii);
            Element node = doc.createElement(columnName);
            node.appendChild(doc.createTextNode(value.toString()));
            row.appendChild(node);
          }//end for
        }//end while

        //Add name space to root element as attribute
        Element documentElement = doc.getDocumentElement();
        documentElement.setAttribute("xmlns", "https://desolate-thicket-4106.herokuapp.com/schema/Item");
        documentElement.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        documentElement.setAttribute("xsi:schemaLocation", "https://desolate-thicket-4106.herokuapp.com/schema/Item https://desolate-thicket-4106.herokuapp.com/schema/Item/Item.xsd");

        //output xml document
        return (doc);

      } catch (Exception e) {
        attributes.put("message", "There was an error: " + e);
        return attributes;
      } finally {
        if (connection != null) try{connection.close();} catch(SQLException e){}
        }
      });

      get("/schema/Item/Item.xsd", (req, res) -> {
        Map<String, Object> attributes = new HashMap<>();
        res.type("application/xml"); //Return as XML
        try {
          String content = new String(Files.readAllBytes(Paths.get("src/main/resources/public", "Item.xsd")));

          return content;

        } catch (Exception e) {
          attributes.put("message", "There was an error: " + e);
          return attributes;
        } finally {

        }
      });//End api/Item.xsd

    }
  }
