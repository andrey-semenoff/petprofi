'use strict';

$(function () {

  // Инициализация скрипта плавный сколл
  Smooth_Scroll.init();
  
  // owl-carousel on main page
  $(".owl-carousel[data-type='main']").owlCarousel({
  	items: 3,
  	loop: true,
  	smartSpeed: 1000,
  	// autoHeight: true,
  	nav: true,
  	navText: [
  		"<svg class='icon'><use xlink:href='#arrow'></use></svg>",
  		"<svg class='icon'><use xlink:href='#arrow'></use></svg>"
  	],
  	responsive: {
  		992: {
        items: 3,
      },
      
      640: {
      	items: 2,
      },

      0: {
      	items: 1,
      }
  	},

    onInitialized: enlargeImage,
    onTranslated: enlargeImage,
    onTranslate: reduceImage,
    onDrag: reduceImage,
    onResize: function() {
      reduceImage();
      enlargeImage();
    }
  });


  // wrap|unwrap list categories
  $('.categories__item_parent .icon').click(function(e) {
    e.preventDefault();
    $(this).parent().siblings('.categories__list').slideToggle();
  });

  // check on checkboxes
  var $filter__input = $(".filter__input");
  if($filter__input.length > 0) {
    $filter__input.each(function(){
      checkFilters($(this));
    });
  }

  $(".filter__input").on("change", function (e) {
    checkFilters($(this));
  });

  // next script
});
// END DOCUMENT ONLOAD SCRIPTS

/////////////////////
// START FUNCTIONS
/////////////////////

// animate center image in carousel
function enlargeImage() {
  if( $(window).width() > 992 ) {
    $(".owl-item.active").eq(1).addClass('owl-item_enlarged');
  }
}

function reduceImage() {
  $(".owl-item.active").removeClass('owl-item_enlarged');
}

function checkFilters($this) {
  var checked = $this.is(':checked'),
  $item = $this.parents("label"),
  $icon = $item.find(".icon");

  if( checked ) {
    $item.addClass("filter__item_active");
    $icon.children().attr('xlink:href', '#check')
  } else {
    $item.removeClass("filter__item_active");
    $icon.children().attr('xlink:href', '');
  }
}

// next function

// END FUNCTIONS