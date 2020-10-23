
/*-------------------------------------------

Template Name: CV / Resume & Portfolio Template
Description: CV / Resume & Portfolio HTML5 Template
Author: Abdul Khalik
Designed & Developed by: Abdul Khalik
Author URI: https://akhalik.com
Version: 1.0

---------------------------------------------*/

 window.p = new Particles(document.getElementById("particles"));



/* Demo Scripts for Bootstrap Carousel and Animate.css article
* on SitePoint by Maria Antonietta Perna
*/
(function( $ ) {

//Function to animate slider captions 
function doAnimations( elems ) {
  //Cache the animationend event in a variable
  var animEndEv = 'webkitAnimationEnd animationend';
  
  elems.each(function () {
      var $this = $(this),
          $animationType = $this.data('animation');
      $this.addClass($animationType).one(animEndEv, function () {
          $this.removeClass($animationType);
      });
  });
}

//Variables on page load 
var $myCarousel = $('#main-slider'),
  $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
  
//Initialize carousel 
$myCarousel.carousel();

//Animate captions in first slide on page load 
doAnimations($firstAnimatingElems);

//Pause carousel  
$myCarousel.carousel('pause');

//Other slides to be animated on carousel slide event 
$myCarousel.on('slide.bs.carousel', function (e) {
  var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
  doAnimations($animatingElems);
});  
    
})(jQuery);


// For carosal Timer progress
$(document).ready(function(){
  var percent = 0,
  interval = 50,//it takes about 6s, interval=20 takes about 4s
  $bar = $('.slide-timer-progress'),
  $crsl = $('#main-slider');
  $('.carousel-indicators li, .slide-control').click(function (){$bar.css({width:0+'%'});});
  /*line above just for showing when controls are clicked the bar goes to 0.5% to make more friendly, 
  if you want when clicked set bar empty, change on width:0.5 to width:0*/
  $crsl.carousel({//initialize
    interval: false,
    pause: true
  }).on('slide.bs.carousel', function (){percent = 0;});//This event fires immediately when the bootstrap slide instance method is invoked.
  function progressBarCarousel() {
    $bar.css({width:percent+'%'});
    percent = percent +0.5;
    if (percent>=100) {
      percent=0;
      $crsl.carousel('next');
    }
  }
  var barInterval = setInterval(progressBarCarousel, interval);//set interval to progressBarCarousel function
  if (!(/Mobi/.test(navigator.userAgent))) {//tests if it isn't mobile
    $crsl.hover(function(){
          clearInterval(barInterval);
        },
        function(){
          barInterval = setInterval(progressBarCarousel, interval);
        }
    );
  }
});
// End carosal Timer progress
// End Slider



/*====== main menu ======*/

//jquery sticky menu on scroll
$(window).on('scroll', function () {
    if ($(window).scrollTop() > 0.5) {
        $('#sticker').addClass('stick');
    } else {
        $('#sticker').removeClass('stick');
    }
});

// jQuery page scrolling feature - requires jQuery Easing plugin
$('nav a').unbind('click').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top -50
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});

// jQuery navbar dropdown item on click to collapse (small device)
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});
// end main menu   


$('.slider-section .carousel-inner .item').css('height',$(window).height()); 


// skill bar Start
$('.skill-chart').waypoint(function() {
  $('.progress-bar').each(function(){
      $(this).find('.progress').animate({
          width:$(this).attr('data-percent')
      },3000);
  });
  //Viewport Code
 }, {
   offset: '100%'
 });


//animat start
wow = new WOW(
    {
      boxClass:     'wow',   
      animateClass: 'animated',
      offset:       0,  
      mobile:       true, 
      live:         true 
    }
  )
wow.init();
//animat End

/*=========================
            jQuery isotope (Filtter portfolio on click)
        ==============================*/
$(window).load(function(){
    var $container = $('.gallery');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.filter-btn li').click(function(){
        $('.filter-btn .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 
});


var owl = $(".feedback");
  owl.owlCarousel({
    center: true,
    loop:true,
    margin:0,
    nav:false,
    items: 1,
    autoplay:3000,
    autoplayHoverPause:true
});



var owl = $(".client");
  owl.owlCarousel({
    nav: false,
    dots: false,
    loop:true,
    margin:10,
    //autoplay: 5000, //Set AutoPlay to 3 seconds
    responsiveClass:true,
    responsive:{
        0: { items:1 },
      568: { items:3 },
      768: { items:5 },
      980: { items:5 },
     1199: { items:5 }
    }
  });




// contact-form
$(function () {

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});



$(function () {
    $.scrollUp({
        scrollName: 'scrollUp',      // Element ID
        scrollDistance: 300,         // Distance from top/bottom before showing element (px)
        scrollFrom: 'top',           // 'top' or 'bottom'
        scrollSpeed: 300,            // Speed back to top (ms)
        easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
        animation: 'fade',           // Fade, slide, none
        animationSpeed: 200,         // Animation speed (ms)
        scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
        scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
        scrollText: '<i class="fa fa-angle-up"></i>',  // Text or icon for element, can contain HTML
        scrollTitle: false,          // Set a custom <a> title if required.
        scrollImg: false,            // Set true to use image
        activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 2147483647           // Z-Index for the overlay
    });
});