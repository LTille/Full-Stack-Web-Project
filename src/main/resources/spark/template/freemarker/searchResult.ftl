<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="stylesheets/main.css" type="text/css"/>
  <script src="https://code.jquery.com/jquery-1.3.1.min.js"></script>
  <script src="js/market.js"></script>
  <title> Flea Market</title>
</head>
<body>
    <div id="navigation">
            <ul>
                <li style="border: 1px #ffffff solid;"><a href="publish.html">Publish new item
                 <p class="publish_pin"><img src="images/publish_pin.png" alt="" /></p>
                    </a>
                </li>
                <!-- Trigger/Open The Modal -->
                <li id="myBtn"><a href="#">Login</a>
                    <!-- The Modal -->
                    <div id="myModal" class="modal">
                        <div class="login-wrap">
                            <h2>Login</h2>
                            <div class="form">
                                <input type="text" placeholder="Username" name="un" />
                                <input type="password" placeholder="Password" name="pw" />
                                <div>
                                    <button> Sign in </button>
                                    <button class="close"> Cancel </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script>
                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function (event) {
                            var modal = document.getElementById('myModal');
                            if (event.target === modal) {
                                modal.style.display = "none";
                            }
                        }
                    </script>
                </li>
                <li><a href="register.html">Register</a></li>
                <li>
                    <div class="dropdown">
                        <a href="#" class="dropbtn">My FMarket  <p class="drop_down"><img src="images/drop_down.png" alt="" /></p></a>
                        <div class="dropdown-content">
                            <a href="profile.html">My ads</a>
                            <a href="profile.html">Messages</a>
                            <a href="profile.html">Mark_Item</a>
                            <a href="profile.html">My profile</a>
                        </div>
                    </div>
                </li>
                <li id="logo" style="float:left;list-style-type:none;">
                    <a href="index.html"> FMarket </a>
                </li>
            </ul>
        </div>
   <div id="searchBar">
    <form class="search_bar huge">
        <div class="search_dropdown" style="width: 16px;">
           <span>All</span>
           <ul>
               <li class="selected">All</li>
               <li>Motor</li>
               <li>House</li>
               <li>Book</li>
           </ul>
        </div>
       <input type="text" placeholder="I am looking for......" />
       <button type="submit" value="Search" id="search">Search</button>
    </form>
</div>

   <div id="content">
	<div class="content_left">
		<div class="global_module news">
			<h3>Most Recent update</h3>
			<div class="scrollNews" >
				<ul>
					<li><a href="#" class="tooltip" title="Sara posted a table">Sara posted a pot</a></li>
                                        <li><a href="detail.html" class="tooltip" title="Lucy just posted a lamp to sell">Lucy just posted a lamp to sell</a></li>
                                        <li><a href="detail.html" class="tooltip" title="Various furniture like new">Various furniture like new</a></li>
                                        <li><a href="detail.html" class="tooltip" title="Come here there is a heater">Come here there is a heater</a></li>
                                        <li><a href="detail.html" class="tooltip" title="A automobile only drive for one year">A automobile only drive for one year</a></li>
                                        <li><a href="detail.html" class="tooltip" title="Sara posted a table">Sara posted a pot</a></li>
                                        <li><a href="detail.html" class="tooltip" title="Sara posted a table">Sara posted a pot</a></li>
                                        <li><a href="detail.html" class="tooltip" title="Sara posted a table">Sara posted a pot</a></li>
                                        <li><a href="detail.html" class="tooltip" title="Useful computer science book">Useful computer science book</a></li>
				</ul>
			</div>
			<p class="module_up_down"><img src="images/down.png" alt="" /></p>
		</div>
 		<div class="global_module procatalog">
			<h3>Product Catalog</h3>
			<ul class="m-treeview">
				<li class="m-expanded">
					<span>Motor</span>
					<ul>
              <li><span>Four-door</span></li>
              <li><span>Two-door</span></li>
					</ul>
				</li>
				<li class="m-expanded">
					<span>House</span>
					<ul>
						<li ><span>Furniture</span></li>
						<li ><span>Kitchen</span></li>
					</ul>
				</li>
				<li class="m-expanded">
					<span>Other</span>
					<ul>
						<li><span>Book</span></li>
               <li><span>Electronic</span></li>
               <li><span>History</span></li>
               <li><span>Biology</span></li>
					</ul>
				</li>
		   </ul>
			<p class="module_up_down"><img src="images/down.png" alt="" /></p>
		</div>
    </div>
  <script>
    $(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://desolate-thicket-4106.herokuapp.com/api/productXML",
        dataType: "xml",
        success: xmlParser
    });
});

  function xmlParser(xml) {

      $(xml).find("Item").each(function () {

          $(".prolist_content ul").append('<li><a href="detail.html"><img src="'+$(this).find("Images").text()+'" alt=""/></a><span>'+$(this).find("AdTitle").text()+'</span><span> $'+$(this).find("Price").text()+'</span></li>');

      });
   }
  </script>
	<div class="content_right">
  		<div class="global_module prolist">
			<h3>Search Result</h3>
            <div  class="prolist_content">
                <ul>
                </ul>
            </div>
          </div>
   </div>
</div>
   <footer>
       <h2> <a href="/about">About me</a></h2>
   </footer>
</body>
</html>
