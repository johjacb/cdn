// we check for the normal event model is used AND if classList API is available
// this should get us IE10+ and all other modern browsers
if ( document.addEventListener && 'classList' in document.createElement('a')) {
    document.addEventListener( "DOMContentLoaded", function(){
        document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
        [].forEach.call(document.querySelectorAll('.list-expand-hide'), function(el) {
            el.addEventListener('click', function() {
                el.classList.toggle('list-expand-show');
                el.classList.toggle('list-expand-hide');
                el.nextElementSibling.classList.toggle('content-hide');
                el.nextElementSibling.classList.toggle('content-show');
            })
        })
    
    }, false );

// If IE event model is used (<IE9) or we can't get classList support (<IE10)
} else if ( document.attachEvent ) {
    document.attachEvent("onreadystatechange", function() {
        document.detachEvent( "onreadystatechange", arguments.callee );
        var listHeaders = document.querySelectorAll('.list-expand-hide');
        for (var i = 0; i < listHeaders.length; i++) {
            var el = listHeaders[i];

            el.attachEvent('onclick',clickListHeader);

        };

        function clickListHeader(e) {
            var el = e.target || e.srcElement || window.event.target || window.event.srcElement;
            var elSibling = el.getNextElementSibling();

            el.toggleClass('list-expand-hide','list-expand-show');
            elSibling.toggleClass('content-hide','content-show');
            // toggleClass(el,'list-expand-hide','list-expand-show');
            // toggleClass(elSibling,'content-hide','content-show');
        }

        // since we can't use toggle, we need to check the current class
        // attribute and then set it to the opposite value
        Element.prototype.toggleClass = function(classOne,classTwo) {
            if (this.getAttribute('class') == classOne) {
                this.setAttribute('class', classTwo);
            } else if (this.getAttribute('class') == classTwo) {
                this.setAttribute('class', classOne);
            }
        }

        // since old IE doesn't support nextElementSibling, and nextSibling will
        // return whitespace nodes, we need a way to get the next sibling that is
        // a DOM element node.
        Element.prototype.getNextElementSibling = function() {
            sibling = this.nextSibling;
            while(sibling.nodeType != 1) {
                sibling = sibling.nextSibling;
            }
            return sibling;
        }
    })
}
