## bootstrap menu

Simple menu for bootstrap. [Examples and documentation](http://wenzhixin.net.cn/p/bootstrap-menu/)

### How to use:

```
	<div id="menu" class="bs-menu"></div>
	
	$(function() {
	    $('#menu').bootstrapMenu({
	        isOpen: true,
	        data: [{
	            name: 'menu1',
	            title: 'Menu1',
	            icon: 'images/1.png',
	            children: [{
	                name: 'menu11',
	                title: 'Menu11'
	            }, {
	                name: 'menu12',
	                title: 'Menu12'
	            }, {
	                name: 'menu13',
	                title: 'Menu13'
	            }]
	        }, {
	            name: 'menu2',
	            title: 'Menu2',
	            icon: 'images/2.png',
	            children: [{
	                name: 'menu21',
	                title: 'Menu21'
	            }]
	        }, {
	            name: 'menu3',
	            title: 'Menu3',
	            icon: 'images/3.png',
	            children: [{
	                name: 'menu31',
	                title: 'Menu31'
	            }]
	        }, {
	            name: 'menu4',
	            title: 'Menu4',
	            icon: 'images/4.png',
	            children: [{
	                name: 'menu41',
	                title: 'Menu41'
	            }]
	        }],
	        onToggle: function(index) {
	            console.log(index);
	        },
	        onSelect: function(name) {
	            console.log(name);
	        }
	    });
	});
```