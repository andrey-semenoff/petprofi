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
      
      768: {
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

    $('.jcarousel').jcarousel({
      // vertical: true
    });

    $('.jcarousel-nav_prev').click(function() {
        $('.jcarousel').jcarousel('scroll', '-=1');
    });

    $('.jcarousel-nav_next').click(function() {
        $('.jcarousel').jcarousel('scroll', '+=1');
    });

    $('.jcarousel-pagination').jcarouselPagination({
      'perPage': 1,
      item: function(page) {
        var class_active = 'class="active"';

        if( page > 1 ) {
          class_active = '';
        }
        return '<a '+ class_active +' href="#' + page + '"></a>';
      }
    })
    .on('jcarouselpagination:active', 'a', function() {
        $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function() {
        $(this).removeClass('active');
    });




  $(window).resize(function (e) {
    var $width = $(this).outerWidth(),
        $btn_search = $('.btn_search'),
        $btn_burger = $('.btn_burger');

    if( $width > 992 ) {
      if( $btn_search.hasClass('btn_search-close') ) {
        toggleSearch($btn_search);
      }

      if( $btn_burger.children('.burger').hasClass('burger_close') ) {
        toggleMenu($btn_burger);
      }

      $('.form_search').attr('style', '');
      $('.header__menu').attr('style', '');
    }

    if( $width < 768 ) {
      $('.filters').hide();
    } else {
      $('.filters').show();
    }

    if( $width > 480 ) {
      $('.contacts-col__content').show();
    } else {
      $('.contacts-col__content').hide();
      $('.contacts-col__content').removeClass('contacts-col__title_opened');
    }

  });

  // wrap|unwrap list categories
  $('.categories__item_parent .icon').click(function(e) {
    e.preventDefault();
    var $this = $(this);

    $this.parent().siblings('.categories__list').slideToggle();
    $this.toggleClass('icon_up');
  });

  // $('.categories__item_parent .icon').click();

  // $('.categories__list .categories__list').hide();
  // $('.categories__item_parent .icon').removeClass('icon_up');

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

  // change catalog view
  $('.catalog__view-link').click(function(e) {
    var $this = $(this),
        view = $this.data('view'),
        $catalog__products = $('.catalog__products');

    if( !$this.hasClass('catalog__view-link_active') ) {
      $this.siblings().removeClass('catalog__view-link_active');
      $this.addClass('catalog__view-link_active');

      if( view == 'linear' ) {
        $catalog__products.addClass('catalog__products_linear');
      } else {
        $catalog__products.removeClass('catalog__products_linear');
      }
    }
  });

  // select thumb photo to show
  $('.product-in__more-link').click(function (e) {
    e.preventDefault();

    var $this = $(this),
        src = $this.children('img').attr('src'),
        $main_photo = $('.product-in__photo'),
        width = $(window).outerWidth();

    $('.product-in__more-link').removeClass('product-in__more-link_active');
    $this.addClass('product-in__more-link_active');
    
    if( width > 992 ) {
      $main_photo.attr('src', src);
    } else {
      open_fancy();
    }
  });

  // init fancybox product-in
  $('.product-in__photo-holder').on('click', function (e) {
    e.preventDefault();
    
    open_fancy();
  });

  // select radio
  $('.product-in__input').change(function(e) {
    var $this = $(this),
        $btns = $this.parents('.product-in__group').find('.counter__button');

    $('.counter__button').prop('disabled', true);
    $('.counter__number').text(1);
    $btns.prop('disabled', false);
  });

  // change number of product
  $('.counter__button').click(function(e) {
    var $this = $(this),
        type = $this.data('type'),
        $counter__number = $this.siblings('.counter__number'),
        count = parseInt($counter__number.text());

    if( type == '-' ) {
      if( (count - 1) >= 1 ) {
        $counter__number.text(--count);
      } 
    } else {
      $counter__number.text(++count);
    }
  });

  // wrap|unwrap product-in desc group
  $('.product-in__desc-group-name').click(function (e) {
    var $this = $(this);

    $this.toggleClass('product-in__desc-group-name_collapsed');
    $this.siblings('.product-in__desc-group-body').slideToggle();
  })

  // next script
  $('.phones .icon').click(function (e) {
    var $this = $(this),
        $list_holder = $this.parent();

    $list_holder.toggleClass('phones__list-holder_show');
  })

  // open|hide mobile menu
  $(document).on('click', '.btn_burger', function (e) {
    var $this = $(this),
        $btn_search = $this.siblings('.btn_search'),
        $phones = '';

    if( $btn_search.hasClass('btn_search-close') ) {
      toggleSearch($btn_search);
    }

    toggleMenu($this);

    $('.phones__list-holder').removeClass('phones__list-holder_show');

  });

  // open|hide search form
  $(document).on('click', '.btn_search', function (e) {
    var $this = $(this),
        $btn_burger = $this.siblings('.btn_burger');

    if( $btn_burger.children('.burger').hasClass('burger_close') ) {
      toggleMenu($btn_burger);
    }

    toggleSearch($this);

    $('.phones__list-holder').removeClass('phones__list-holder_show');

  });

  // show|hide contacts details in footer
  $('.contacts-col__title').on('click', function(e){
    var $this = $(this),
        width = $(window).outerWidth();

    if( width <= 480 ) {
      $this.toggleClass('contacts-col__title_opened');
      $this.siblings('.contacts-col__content').slideToggle();
    }
  });

  $('.categories__item_parent .icon').click();

  // show|hide filters in sidebar
  $('.filter__title').on('click', function(e){
    var $this = $(this),
        width = $(window).outerWidth();

      $this.toggleClass('filter__title_opened');
      $this.siblings('.filter__list, .filter-prices').slideToggle();
  });

  $('.filter__title').click();
  
  
  // show|hide filter on mobile
  $('.mobile-cat-nav__btn_filters').on('click', function(e){
    e.preventDefault();
    $('.filters').slideToggle();
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

function toggleMenu($this) {
  var $menu = $('.header__menu');
  
  $menu.slideToggle();
  $this.children('.burger').toggleClass('burger_close');
}

function toggleSearch($this) {
  var $form = $('.form_search');

  $this.toggleClass('btn_search-close');
  $form.slideToggle();
  $form.find('input').first().focus();
}

// open fancybox with product photos
function open_fancy() {
  var sources = [],
      index_num = $('.product-in__more-link_active').parent().index();

  $('.product-in__more-photo').each(function (i, item) {
    var $item = $(item),
        src = $item.attr('src');
    sources.push(src);
    // sources.push(src.replace('_s' , ''));
  });

  $.fancybox.open( sources ,
    {
      maxWidth: '800px',
      index: index_num,
      prevEffect    : 'fade',
      nextEffect    : 'fade'
    }
  )
}

// next function

// END FUNCTIONS