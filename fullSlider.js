/**
 * Full Slider
 *
 * A simple jQuery slider plugin
 */
(function($) {
	$.fn.fullSlider = function(options) {
		
		// Default settings
		var settings = $.extend({
			'auto': true,
			'interval': 5000,
			'animation': 'fade'
		}, options);
		
		return this.each(function() {
			var slider = $(this),
				items = slider.find('ul').children('li'),
				itemsCount = items.length,
				navigation = {
					prev: slider.find('i.slider-nav-prev'),
					next: slider.find('i.slider-nav-next')
				},
				current = 0,
				slide,
				slidePlay = false;
			
			function init() {
				if (Modernizr.backgroundsize) {
					items.each(function() {
						var item = $(this);
						item.css('background-image', 'url(' + item.find('img').attr('src') + ')');
					});
				}
				else {
					slider.find('img').show();
				}
				
				items.eq(current).css('opacity', 1);
				
				initEvents();
				
				if (settings.auto) {
					startSlider(settings.interval);
				}
			}
			
			function initEvents() {
				// bind navigation
				navigation.prev.click(function() {
					navigate('prev');
					if (slidePlay) startSlider();
				});
				
				navigation.next.click(function() {
					navigate('next');
					if (slidePlay) startSlider();
				});
			}
			
			// navigate
			function navigate(direction) {
				var oldItem = items.eq(current);
				
				if (direction === 'prev') {
					current = current > 0 ? --current : (itemsCount - 1);
				}
				else if (direction === 'next') {
					current = current < (itemsCount - 1) ? ++current : 0;
				}
				
				var newItem = items.eq(current);
				
				switchItem(oldItem, newItem, settings.animation, settings.direction);
			}
			
			function startSlider() {
				slidePlay = true;
				
				clearTimeout(slide);
				slide = setTimeout(function() {
					navigate('next');
					startSlider();
				}, settings.interval);
			}
			
			function stopSlider() {
				slidePlay = false;
				clearTimeout(slide);
			}
			
			function switchItem(oldItem, newItem, method, direction) {
				switch(method) {
					case 'fade':
						fade(oldItem, newItem);
						break;
					default:
						fade(oldItem, newItem);
						break;
				}
			}
			
			function fade(oldItem, newItem) {
				oldItem.css('opacity', 0);
				newItem.css('opacity', 1);
			}
			
			init();
		});
	};
})(jQuery);
