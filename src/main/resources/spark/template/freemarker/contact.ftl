<!DOCTYPE html>
<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        body{
          border:1px solid #AAA;
        	margin:10px auto;
          width:800px;
        }
        h1{
          text-align: center;
        }
        </style>
    </head>
    <body>
        <h1>Detail information for Contact</h1>
        <h2>Owner: ${name}</h2>
        <h2>Email address: ${email}</h2>
        <h2>Phone number: ${phone}</h2>
        <#if delivery=="yes">
       <h2>This is really a good deal and free delivery if offered. Don't miss this opportunity!</h2>
        <#elseif delivery=="no">
       <h2>This product is really a bargain, please pick up yourself.</h2>
       <#else>
       <h2>Whether or not delivery is offered depends on the buyer's location.</h2>
       </#if>
       <#if contact=="phone">
      <h2>The owner prefers to be contacted by phone.</h2>
      <#elseif contact=="mail">
      <h2>The owner prefers to be contactd by e-mail.</h2>
      <#else>
      <h2>You can contact the owner either by phone or by e-mail.</h2>
      </#if>
    </body>
</html>
