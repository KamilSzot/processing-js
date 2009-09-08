/*
 * This code searches for all the <script type="application/processing" src="#canvasid">
 * in your page and loads each script in the target canvas with the proper id.
 * It is useful to smooth the process of adding Processing code in your page and starting
 * the Processing.js engine.
 */
// Cross-browser implementation of element.addEventListener()

(function(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
         var r = elem.attachEvent("on"+evnt, func);
	return r;
    }
    else window.alert('I\'m sorry Dave, I\'m afraid I can\'t do that.');
})("load", window, function() {
	var scripts = document.getElementsByTagName("script");
	
	for ( var i = 0; i < scripts.length; i++ ) {
		if ( scripts[i].type == "application/processing" ) {
			var src = scripts[i].src, canvas = scripts[i].nextSibling;

			if ( src && src.indexOf("#") ) {
				canvas = document.getElementById( src.substr( src.indexOf("#") + 1 ) );
			} else {
				while ( canvas && canvas.nodeName.toUpperCase() != "CANVAS" )
					canvas = canvas.nextSibling;
			}

			if ( canvas ) {
				Processing(canvas, scripts[i].text);
			}
		}
	}
});
