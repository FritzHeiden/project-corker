/**
 * menu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function() {

	function scrollY() {
		return window.pageYOffset || window.document.documentElement.scrollTop;
	}

	function init() {
		var showMenu = document.getElementById( 'showMenu' ),
			perspectiveWrapper = document.getElementById( 'perspective' ),
			container = perspectiveWrapper.querySelector( '.container' ),
			contentWrapper = container.querySelector( '.wrapper' );

		showMenu.addEventListener( 'click', function( ev ) {
			ev.stopPropagation();
			ev.preventDefault();
			docscroll = scrollY();
			// change top of contentWrapper
			contentWrapper.style.top = docscroll * -1 + 'px';
			// mac chrome issue:
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			// add modalview class
			classie.add( perspectiveWrapper, 'modalview' );
			// animate..
			setTimeout( function() { classie.add( perspectiveWrapper, 'animate' ); }, 25 );

			setTimeout(menuFunction('block'),1500);
		});

		container.addEventListener( 'click', function( ev ) {
			if( classie.has( perspectiveWrapper, 'animate') ) {
				var onEndTransFn = function( ev ) {
					if( ( ev.target.className !== 'container' || ev.propertyName.indexOf( 'transform' ) == -1 ) ) return;
					classie.remove( perspectiveWrapper, 'modalview' );
					// mac chrome issue:
					document.body.scrollTop = document.documentElement.scrollTop = docscroll;
					// change top of contentWrapper
					contentWrapper.style.top = '0px';
				};
				classie.remove( perspectiveWrapper, 'animate' );
			}

			setTimeout(menuFunction('none'),1500);
		});

		perspectiveWrapper.addEventListener( 'click', function( ev ) { return false; } );
	}

	function menuFunction(displayOption){
			let options = document.getElementById('menuOps')
			options.style.display = displayOption;

	}

	init();

})();
