/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @version 0.0.1
 * @github https://github.com/wenzhixin/bootstrap-menu
 * @blog http://wenzhixin.net.cn
 */

(function($) {
			
	'use strict';

	function Menu($el) {
		this.$el = $el;
	}

	Menu.prototype = {
		constructor: Menu,
		
		init: function(options) {
			var html = ['<ul>'];
			
			this.options = options;
			
			$.each(this.options.data, function(i, item) {
				html.push('<li' + (i === 0 ? ' class="active"' : '') + '>');
				html.push(
					'<a class="parent" href="' + (item.url || 'javascript:void(0)') + '">',
						'<img width="32" height="32" src="' + item.icon + '">',
						'<span>' + item.title + '</span>',
					'</a>'
				);
				if (item.children && item.children.length) {
					html.push('<ul>');
					html.push(
						'<li>',
							'<a data-name="' + item.name + '" href="' + (item.url || 'javascript:void(0)') + '">',
								item.title,
							'</a>',
						'</li>'
					);
					$.each(item.children || [], function(i, c) {
						html.push(
							'<li>',
								'<a data-name="' + c.name + '" href="' + (c.url || 'javascript:void(0)') + '">',
									c.title,
								'</a>',
							'</li>'
						);
					});
					html.push('</ul>');
				}
				html.push('</li>');
			});
			this.$el.append(html.join(''));
			this.$el.css('width', this.options.width + 'px');
			if (this.options.isOpen) {
				this.$el.addClass('open');
				this.index = 0;
			}
			
			this.events();
		},
		
		events: function() {
			this.$el.find('.parent').click($.proxy(this, 'toggle'));
			this.$el.find('a[data-name]').click($.proxy(this, 'select'));
		},
		
		toggle: function(event) {
			var $this = $(event.target).parents('li');
			
			$this.addClass('active').siblings().removeClass('active');
			
			if (!this.options.isOpen) {
				this.options.isOpen = true;
				this.$el.addClass('open');
			} else if (this.index === $this.index()) {
				this.options.isOpen = false;
				this.$el.removeClass('open');
			}
			this.index = $this.index();
			this.options.onToggle(this.index);
		},
		
		select: function(event) {
			var $this = $(event.target);
			
			this.options.onSelect($this.data('name'));
		}
	};

	$.fn.bootstrapMenu = function() {
		var option = arguments[0], 
			args = arguments,
			
			value, 
			allowedMethods = [];

		this.each(function() {
			var $this = $(this), 
				data = $this.data('bootstrapMenu'), 
				options = $.extend({}, $.fn.bootstrapMenu.defaults, typeof option === 'object' && option);

			if (typeof option === 'string') {
				if ($.inArray(option, allowedMethods) < 0) {
					throw "Unknown method: " + option;
				}
				value = data[option](args[1]);
			} else {
				if (!data) {
					data = new Menu($this);
					data.init(options, true);
					$this.data('bootstrapMenu', data);
				} else {
					data.init(options);
				}
			}
		});
		
		return value ? value : this;
	};
	
	$.fn.bootstrapMenu.defaults = {
		width: 180,
		isOpen: false,
		data: [],
		onToggle: function(index) { return false; },
		onSelect: function(name) { return false; }
	};
})(jQuery);