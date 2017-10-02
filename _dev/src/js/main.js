'use strict';

$(function () {

  // Инициализация скрипта
  Smooth_Scroll.init();
  
  // owl-carousel init
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
      
      550: {
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


  });



  // wrap|unwrap list
  $('.sidebar__item_parent .icon').click(function(e) {
    e.preventDefault();
    $(this).parent().siblings('.sidebar__list').slideToggle();
  });

  // next script
});

function enlargeImage() {
  $(".owl-item.active").eq(1).css({
    'z-index': 99999,
    'transform': 'scale(1.4)'
  })
}

function reduceImage() {
  $(".owl-item.active").css({
    'z-index': -1,
    'transform': 'scale(1)'
  })
}


