/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/velocity-animate/velocity-animate.d.ts" />
/// <reference path="../typings/handlebars/handlebars.d.ts" />

$((): void => {
  'use strict';

  App.initialize();

  $('[js-collapsible]').each( function( index, el ) {
    var $el = $(el),
        $trigger = $el.find('[js-collapsible-trigger]'),
        $box = $el.find('[js-collapsible-box]');

    $trigger.click( function( event ) {
      if ( $el.is('.is-collapsed') ) {
        $el.removeClass('is-collapsed');
        $box.velocity('slideDown');
      } else {
        $el.addClass('is-collapsed');
        $box.velocity('slideUp');
      }
    });
  });

  var onresize: Function = function(): void {
    var collapses = $('body').height() < $(window).height();
    $('#footer')[collapses ? 'addClass' : 'removeClass']('is-at-bottom');
  };

  onresize();

  $('.tabs').each( function( index, el ) {
    var $el = $(el),
        $links = $el.find('[tabs-activate]'),
        $sections = $el.find('[tabs-tab]');

    $links.on('click', function( event ) {
      event.preventDefault();

      var $target = $('[tabs-tab="' + $(this).attr('tabs-activate') + '"]');
      $links.removeClass('is-active');
      $sections.removeClass('is-active').hide();
      $(this).addClass('is-active');
      $target.addClass('is-active').show();

      // onresize();
    });
  });

  $('[modal]').each( function( index, el ) {
    var $el = $(el),
        $close = $el.find('[modal-close]'),
        $dim = $('#dim');

    $close.click( function( event ) {
      if ( $el.is('.is-visible') ) {
        $el.removeClass('is-visible');
        //$box.velocity('slideDown');
        $dim.removeClass('is-visible');
        $dim.velocity('fadeOut');
        $el.velocity('fadeOut');
      }
    });
  });

  $('[modal-open]').each( function( index, el ) {
    var $el = $(el),
        $target = $('[modal="' + $el.attr('modal-open') + '"]'),
        $dim = $('#dim');

    $el.click( function( event ) {
      event.preventDefault();

      $('[modal]').not($el).filter('.is-visible').removeClass('is-visible').velocity('fadeOut');

      if ( !$el.hasClass('.is-visible') ) {
        $target.addClass('is-visible');
        $target.velocity('fadeIn');
      }

      if(!$dim.hasClass('is-visible')) {
        $dim.addClass('is-visible');
        $dim.velocity('fadeIn');
      }
    });
  });

  $('#dim').click( function( event ) {
    event.preventDefault();
    $('[modal]').removeClass('is-visible').velocity('fadeOut');
    $('#dim').removeClass('is-visible').velocity('fadeOut');
  });
});
