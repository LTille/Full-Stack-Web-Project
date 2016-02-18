//automatic scroll news
//cursor stay (mouseenter) on the content, animation stops, and cursor moves(mouseleave), animation continues
$(function(){
   var $this = $(".scrollNews");
   var scrollTimer;
   $this.hover(function(){
       clearInterval(scrollTimer);//clear timer
   },function(){
       scrollTimer=setInterval(function(){
           scrollNews($this);
       },3000);
   }).trigger("mouseleave");//use trigger() function to trigger the second function of hover
});

function scrollNews(obj){
   var $self = obj.find("ul:first"); //find the first ul elemnt
   var lineHeight = $self.find("li:first").height();//find first li elemnt after ul and get its height
   //get the animation by controlling the height of li
   $self.animate({"marginTop":-lineHeight+"px"},600,function(){
        $self.css({marginTop:0}).find("li:first").appendTo($self);
   });
}
//---------------------------------------------------------------------------------------------
//slide catalog function
$(function(){
  $(".module_up_down").toggle(function(){
    var $self = $(this);
    $self.prev().slideToggle(600,function(){
         $("img",$self).attr("src","images/up.png");
    });
  },function() {
    var $self = $(this);
    $self.prev().slideToggle(600,function(){
         $("img",$self).attr("src","images/down.png");
    });
  });
});

//---------------------------------------------------------------------------------------------
//add hint when mouse is on the scroll news
$(function(){
        var x = 10;  
	var y = 20;
	$("a.tooltip").mouseover(function(e){
       	this.myTitle = this.title;
		this.title = "";//use this to solute the problem that the title attribute 
                                //in the img will also appear	
	    var tooltip = "<div id='tooltip'>"+ this.myTitle +"</div>"; //create new div element
		$("body").append(tooltip);	//append it to the document
		$("#tooltip")
			.css({
				"top": (e.pageY+y) + "px",//e.pageY use get the top position of mouse pointer
				"left": (e.pageX+x)  + "px"//e.pageX use get the left position of mouse pointer
			}).show("fast");	  //set the coordinate and show it
    }).mouseout(function(){		
		this.title = this.myTitle;
		$("#tooltip").remove();   
    }).mousemove(function(e){
		$("#tooltip")
			.css({
				"top": (e.pageY+y) + "px",
				"left": (e.pageX+x)  + "px"
			});
	});
});
//---------------------------------------------------------------------------------------------
//product catalog
$(function(){
   $(".m-treeview >li >span").click(function(){
         var $ul = $(this).siblings("ul");
         if($ul.is(":visible")){
             $(this).parent().attr("class","m-collapsed");
             $ul.hide();
         }else {
             $(this).parent().attr("class","m-expanded");
             $ul.show();
         }
         return false;
   });
});

//---------------------------------------------------------------------------------------------
//ads
$(function(){
    var len = $(".num>li").length;
    var index=0;
    var adTimer;
    $(".num li").mouseover(function(){
         index=$(".num li").index(this);
         showImg(index);
    }).eq(0).mouseover();//set the initial index position

    $(".ad").hover(function(){ //hover(over, out)
          clearInterval(adTimer);
    },function(){
          adTimer=setInterval(function(){
              showImg(index);
              index++;
              if(index===len){index=0;} //if all image shows, return back to the first one
          },3000);
    }).trigger("mouseleave");
});

function showImg(index){
    var adHeight=$(".content_right .ad").height();
    $(".slider").stop(true,false).animate({top:-adHeight*index},1000);
    $(".num li").removeClass("on").eq(index).addClass("on");
}

//---------------------------------------------------------------------------------------------
//Search bar
var resizeElements;
$(function() {

  // Set up common variables
  // --------------------------------------------------

  var bar = ".search_bar";
  var input = bar + " input[type='text']";
  var button = bar + " button[type='submit']";
  var dropdown = bar + " .search_dropdown";
  var dropdownLabel = dropdown + " > span";
  var dropdownList = dropdown + " ul";
  var dropdownListItems = dropdownList + " li";

  // Set up common functions
  resizeElements = function() {
    var barWidth = $(bar).outerWidth();//get the outer width of search bar

    var labelWidth = $(dropdownLabel).outerWidth();
    $(dropdown).width(labelWidth);

    var dropdownWidth = $(dropdown).outerWidth();
    var buttonWidth = $(button).outerWidth();
    var inputWidth = barWidth - dropdownWidth - buttonWidth;
    var inputWidthPercent = inputWidth / barWidth * 100 + "%";

    $(input).css({
      'margin-left': dropdownWidth,
      'width': inputWidthPercent
    });
  };

  function dropdownOn() {
    $(dropdownList).fadeIn(25);// gradually changes the opacity from hidden to visible
    $(dropdown).addClass("active");
  }

  function dropdownOff() {
    $(dropdownList).fadeOut(25);
    $(dropdown).removeClass("active");
  }

  // Initialize initial resize of initial elements
  resizeElements();

  // Toggle new dropdown menu on click
  $(dropdown).click(function(event) {
    if ($(dropdown).hasClass("active")) {
      dropdownOff();
    } else {
      dropdownOn();
    }

    event.stopPropagation();//stops the bubbling of an event to parent elements
    return false;
  });

  $("html").click(dropdownOff);

  // Activate new dropdown option and show tray if applicable
  $(dropdownListItems).click(function() {
    $(this).siblings("li.selected").removeClass("selected");
    $(this).addClass("selected");

    // Focus the input
    $(this).parents("form.search_bar:first").find("input[type=text]").focus();

    var labelText = $(this).text();
    $(dropdownLabel).text(labelText);
    resizeElements();

  });
  // Resize all elements when the window resizes
  $(window).resize(function() {
    resizeElements();
  });
});

//---------------------------------------------------------------------------------------------
//create the modal for logging in
$(function(){
   $("#myBtn").click(function(){
      $('#myModal').show();
      //$('.search_dropdown').css("z-index":"0");
   });
});

// Get the <span> element that closes the modal
$(function(){
   $(".close").click(function(){
     $('#myModal').hide();
   });
});

//---------------------------------------------------------------------------------------------
//upload file
$(function(){
    $('.file-upload-input').change(function(){
        if (this.files && this.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {
                $('.image-upload-wrap').hide();

                $('.file-upload-image').attr('src', e.target.result);
                $('.file-upload-content').show();

                $('.image-title').html(this.files[0].name);
            };

            reader.readAsDataURL(this.files[0]);

  } else {
    removeUpload();
  }
    });
});

$(function(){
    $('.remove-image').click(function () {
        $('.file-upload-input').replaceWith($('.file-upload-input').clone());
        $('.file-upload-content').hide();
        $('.image-upload-wrap').show();

        $('.image-upload-wrap').bind('dragover', function () {
            $('.image-upload-wrap').addClass('image-dropping');
        });
        $('.image-upload-wrap').bind('dragleave', function () {
            $('.image-upload-wrap').removeClass('image-dropping');
        });

    });
});

//---------------------------------------------------------------------------------------------
$(function(){
	$('#registration-form form :input').blur(function(){
	var $parent = $(this).parent();
  $parent.find(".formtips").remove();//delete the formed appended elements
 var errorMsg;

	if($(this).is('#username')){
            
              //implement after collection database
		if(this.value===""){
			errorMsg='User Name already exists';
			$parent.append('<span class="formtips onError">'+errorMsg+'</span>');
		}
	}
	if($(this).is('#email')){
		if(this.value===""||(this.value!=="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value))){
			errorMsg='Enter correct email address';
			$parent.append('<span class="formtips onError">'+errorMsg+'</span>');
                }
	}
       
       if($(this).is('#cpassword')){
                if ($('#password').attr('value') !== $(this).attr('value')) {
                        errorMsg='Password not the same';
	               $parent.append('<span class="formtips onError">'+errorMsg+'</span>');
                 } 
        }
}).keyup(function(){
   $(this).triggerHandler("blur");
}).focus(function(){
   $(this).triggerHandler("blur");
});
});

/*My Profile*/
$(function(){
	    var $div_li =$("div.tab_menu ul li");
	    $div_li.click(function(){
			$(this).addClass("selected")            
				   .siblings().removeClass("selected");  
            var index =  $div_li.index(this);  
			$("div.tab_box > div")   	
					.eq(index).show()   
					.siblings().hide(); 
		}).hover(function(){
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		});
});