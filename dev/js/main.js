var requirejs,require,define;(function(e){function h(e,t){return f.call(e,t)}function p(e,t){var n,r,i,s,o,a,f,l,h,p,d,v=t&&t.split("/"),m=u.map,g=m&&m["*"]||{};if(e&&e.charAt(0)===".")if(t){v=v.slice(0,v.length-1),e=e.split("/"),o=e.length-1,u.nodeIdCompat&&c.test(e[o])&&(e[o]=e[o].replace(c,"")),e=v.concat(e);for(h=0;h<e.length;h+=1){d=e[h];if(d===".")e.splice(h,1),h-=1;else if(d===".."){if(h===1&&(e[2]===".."||e[0]===".."))break;h>0&&(e.splice(h-1,2),h-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((v||g)&&m){n=e.split("/");for(h=n.length;h>0;h-=1){r=n.slice(0,h).join("/");if(v)for(p=v.length;p>0;p-=1){i=m[v.slice(0,p).join("/")];if(i){i=i[r];if(i){s=i,a=h;break}}}if(s)break;!f&&g&&g[r]&&(f=g[r],l=h)}!s&&f&&(s=f,a=l),s&&(n.splice(0,a,s),e=n.join("/"))}return e}function d(t,r){return function(){return n.apply(e,l.call(arguments,0).concat([t,r]))}}function v(e){return function(t){return p(t,e)}}function m(e){return function(t){s[e]=t}}function g(n){if(h(o,n)){var r=o[n];delete o[n],a[n]=!0,t.apply(e,r)}if(!h(s,n)&&!h(a,n))throw new Error("No "+n);return s[n]}function y(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function b(e){return function(){return u&&u.config&&u.config[e]||{}}}var t,n,r,i,s={},o={},u={},a={},f=Object.prototype.hasOwnProperty,l=[].slice,c=/\.js$/;r=function(e,t){var n,r=y(e),i=r[0];return e=r[1],i&&(i=p(i,t),n=g(i)),i?n&&n.normalize?e=n.normalize(e,v(t)):e=p(e,t):(e=p(e,t),r=y(e),i=r[0],e=r[1],i&&(n=g(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},i={require:function(e){return d(e)},exports:function(e){var t=s[e];return typeof t!="undefined"?t:s[e]={}},module:function(e){return{id:e,uri:"",exports:s[e],config:b(e)}}},t=function(t,n,u,f){var l,c,p,v,y,b=[],w=typeof u,E;f=f||t;if(w==="undefined"||w==="function"){n=!n.length&&u.length?["require","exports","module"]:n;for(y=0;y<n.length;y+=1){v=r(n[y],f),c=v.f;if(c==="require")b[y]=i.require(t);else if(c==="exports")b[y]=i.exports(t),E=!0;else if(c==="module")l=b[y]=i.module(t);else if(h(s,c)||h(o,c)||h(a,c))b[y]=g(c);else{if(!v.p)throw new Error(t+" missing "+c);v.p.load(v.n,d(f,!0),m(c),{}),b[y]=s[c]}}p=u?u.apply(s[t],b):undefined;if(t)if(l&&l.exports!==e&&l.exports!==s[t])s[t]=l.exports;else if(p!==e||!E)s[t]=p}else t&&(s[t]=u)},requirejs=require=n=function(s,o,a,f,l){if(typeof s=="string")return i[s]?i[s](o):g(r(s,o).f);if(!s.splice){u=s,u.deps&&n(u.deps,u.callback);if(!o)return;o.splice?(s=o,o=a,a=null):s=e}return o=o||function(){},typeof a=="function"&&(a=f,f=l),f?t(e,s,o,a):setTimeout(function(){t(e,s,o,a)},4),n},n.config=function(e){return n(e)},requirejs._defined=s,define=function(e,t,n){t.splice||(n=t,t=[]),!h(s,e)&&!h(o,e)&&(o[e]=[e,t,n])},define.amd={jQuery:!0}})(),define("bower_components/almond/almond",function(){}),!window.addEventListener&&Element.prototype&&function(e){function t(){[e]}function n(e,n,r){r=!!r;var i=this;i.__eventListener=i.__eventListener||{},i.__eventListener[e]=i.__eventListener[e]||[[],[]],!i.__eventListener[e][0].length&&!i.__eventListener[e][1].length&&(i.__eventListener["on"+e]=function(n){var r=new t,s=[],o=n.srcElement||i,u;for(u in n)r[u]=n[u];r.currentTarget=i,r.pageX=n.clientX+document.documentElement.scrollLeft,r.pageY=n.clientY+document.documentElement.scrollTop,r.target=o,r.timeStamp=+(new Date),r.nativeEvent=n;while(o)s.unshift(o),o=o.parentNode;for(var a,f=0;a=s[f];++f)if(a.__eventListener&&a.__eventListener[e])for(var l,c=0;l=a.__eventListener[e][0][c];++c)l.call(i,r);s.reverse();for(var a,f=0;(a=s[f])&&!n.cancelBubble;++f)if(a.__eventListener&&a.__eventListener[e])for(var l,c=0;(l=a.__eventListener[e][1][c])&&!n.cancelBubble;++c)l.call(i,r);n.cancelBubble=!0},i.attachEvent("on"+e,i.__eventListener["on"+e])),i.__eventListener[e][r?0:1].push(n)}function r(e,t,n){n=!!n;var r=this,i;r.__eventListener=r.__eventListener||{},r.__eventListener[e]=r.__eventListener[e]||[[],[]],i=r.__eventListener[e][n?0:1];for(eventIndex=i.length-1,eventLength=-1;eventIndex>eventLength;--eventIndex)i[eventIndex]==t&&i.splice(eventIndex,1)[0][1];!r.__eventListener[e][0].length&&!r.__eventListener[e][1].length&&r.detachEvent("on"+e,r.__eventListener["on"+e])}t.prototype.preventDefault=function(){this.nativeEvent.returnValue=!1},t.prototype.stopPropagation=function(){this.nativeEvent.cancelBubble=!0},window.constructor.prototype.addEventListener=document.constructor.prototype.addEventListener=Element.prototype.addEventListener=n,window.constructor.prototype.removeEventListener=document.constructor.prototype.removeEventListener=Element.prototype.removeEventListener=r}(),define("ie8addEventListener",function(e){return function(){var t,n;return t||e.ie8addEventListener}}(this)),function(e){var t="carousel",n="."+t,r="data-transition",i=t+"-transitioning",s=t+"-item",o=t+"-active",u=t+"-in",a=t+"-out",f=t+"-nav",l=function(){var e="webkit Moz O Ms".split(" "),t=!1,n;while(e.length){n=e.shift()+"Transition";if(n in document.documentElement.style!==undefined&&n in document.documentElement.style!=0){t=!0;break}}return t}(),c={_create:function(){e(this).trigger("beforecreate."+t)[t]("_init")[t]("_addNextPrev").trigger("create."+t)},_init:function(){var n=e(this).attr(r);return n||(l=!1),e(this).addClass(t+" "+(n?t+"-"+n:"")+" ").children().addClass(s).first().addClass(o)},next:function(){e(this)[t]("goTo","+1")},prev:function(){e(this)[t]("goTo","-1")},goTo:function(n){var i=e(this),f=i.attr(r),c=" "+t+"-"+f+"-reverse";e(this).find("."+s).removeClass([a,u,c].join(" "));var h=e(this).find("."+o),p=h.index(),d=(p<0?0:p)+1,v=typeof n=="number"?n:d+parseFloat(n),m=e(this).find(".carousel-item").eq(v-1),g=typeof n=="string"&&!parseFloat(n)||v>d?"":c;m.length||(m=e(this).find("."+s)[g.length?"last":"first"]()),l?i[t]("_transitionStart",h,m,g):(m.addClass(o),i[t]("_transitionEnd",h,m,g)),i.trigger("goto."+t,m)},update:function(){return e(this).children().not("."+f).addClass(s),e(this).trigger("update."+t)},_transitionStart:function(n,r,i){var s=e(this);r.one(navigator.userAgent.indexOf("AppleWebKit")>-1?"webkitTransitionEnd":"transitionend otransitionend",function(){s[t]("_transitionEnd",n,r,i)}),e(this).addClass(i),n.addClass(a),r.addClass(u)},_transitionEnd:function(t,n,r){e(this).removeClass(r),t.removeClass(a+" "+o),n.removeClass(u).addClass(o)},_bindEventListeners:function(){var n=e(this).bind("click",function(r){var i=e(r.target).closest("a[href='#next'],a[href='#prev']");i.length&&(n[t](i.is("[href='#next']")?"next":"prev"),r.preventDefault())});return this},_addNextPrev:function(){return e(this).append("<nav class='"+f+"'><a href='#prev' class='prev' aria-hidden='true' title='Previous'>Prev</a><a href='#next' class='next' aria-hidden='true' title='Next'>Next</a></nav>")[t]("_bindEventListeners")},destroy:function(){}};e.fn[t]=function(n,r,i,s){return this.each(function(){if(n&&typeof n=="string")return e.fn[t].prototype[n].call(this,r,i,s);if(e(this).data(t+"data"))return e(this);e(this).data(t+"active",!0),e.fn[t].prototype._create.call(this)})},e.extend(e.fn[t].prototype,c)}(jQuery),function(e){var t="carousel",n="."+t,r=t+"-no-transition",i=/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,s={_dragBehavior:function(){var t=e(this),s,o={},u,a,f=function(t){var r=t.touches||t.originalEvent.touches,i=e(t.target).closest(n);t.type==="touchstart"&&(s={x:r[0].pageX,y:r[0].pageY}),r[0]&&r[0].pageX&&(o.touches=r,o.deltaX=r[0].pageX-s.x,o.deltaY=r[0].pageY-s.y,o.w=i.width(),o.h=i.height(),o.xPercent=o.deltaX/o.w,o.yPercent=o.deltaY/o.h,o.srcEvent=t)},l=function(t){f(t),o.touches.length===1&&e(t.target).closest(n).trigger("drag"+t.type.split("touch")[1],o)};e(this).bind("touchstart",function(t){e(this).addClass(r),l(t)}).bind("touchmove",function(e){f(e),l(e),i||(e.preventDefault(),window.scrollBy(0,-o.deltaY))}).bind("touchend",function(t){e(this).removeClass(r),l(t)})}};e.extend(e.fn[t].prototype,s),e(n).on("create."+t,function(){e(this)[t]("_dragBehavior")})}(jQuery),function(e){var t="carousel",n="."+t,r=t+"-active",i=t+"-item",s=function(e){return Math.abs(e)>4},o=function(e,n){var r=e.find("."+t+"-active"),s=r.prevAll().length+1,o=n<0,u=s+(o?1:-1),a=e.find("."+i).eq(u-1);return a.length||(a=e.find("."+i)[o?"first":"last"]()),[r,a]};e(n).on("dragmove",function(t,n){if(!s(n.deltaX))return;var r=o(e(this),n.deltaX);r[0].css("left",n.deltaX+"px"),r[1].css("left",n.deltaX<0?n.w+n.deltaX+"px":-n.w+n.deltaX+"px")}).on("dragend",function(n,i){if(!s(i.deltaX))return;var u=o(e(this),i.deltaX),a=Math.abs(i.deltaX)>45;e(this).one(navigator.userAgent.indexOf("AppleWebKit")?"webkitTransitionEnd":"transitionEnd",function(){u[0].add(u[1]).css("left",""),e(this).trigger("goto."+t,u[1].prevAll().length)}),a?(u[0].removeClass(r).css("left",i.deltaX>0?i.w+"px":-i.w+"px"),u[1].addClass(r).css("left",0)):(u[0].css("left",0),u[1].css("left",i.deltaX>0?-i.w+"px":i.w+"px"))})}(jQuery),function(e,t){var n="carousel",r="."+n+"[data-paginate]",i=n+"-pagination",s=n+"-active-page",o={_createPagination:function(){var t=e(this).find("."+n+"-nav"),r=e(this).find("."+n+"-item"),s=e("<ol class='"+i+"'></ol>"),o,u,a;t.find("."+i).remove(),r.each(function(t){o=t+1,u=e(this).attr("data-thumb"),a=o,u&&(a="<img src='"+u+"' alt=''>"),s.append("<li><a href='#"+o+"' title='Go to slide "+o+"'>"+a+"</a>")}),u&&s.addClass(n+"-nav-thumbs"),t.addClass(n+"-nav-paginated").find("a").first().after(s)},_bindPaginationEvents:function(){e(this).bind("click",function(t){var r=e(t.target);t.target.nodeName==="IMG"&&(r=r.parent()),r=r.closest("a");var s=r.attr("href");r.closest("."+i).length&&s&&(e(this)[n]("goTo",parseFloat(s.split("#")[1])),t.preventDefault())}).bind("goto."+n,function(t,n){var r=n?e(n).index():0;e(this).find("ol."+i+" li").removeClass(s).eq(r).addClass(s)}).trigger("goto."+n)}};e.extend(e.fn[n].prototype,o),e(r).on("create."+n,function(){e(this)[n]("_createPagination")[n]("_bindPaginationEvents")}).on("update."+n,function(){e(this)[n]("_createPagination")})}(jQuery),function(e){e(function(){e(".carousel").carousel()})}(jQuery),define("responsiveCarousel",function(e){return function(){var t,n;return t||e.responsiveCarousel}}(this)),function(e,t){function u(e,t){var n=0,r=e.length,i=[];for(;n<r;n++)i[n]=t(e[n],n);return i}function a(e){return e}function f(e,s){var o=this,l=t;s=s||{},e!==undefined&&(typeof e=="string"?(s.selector=e,e=undefined):typeof e.length=="undefined"&&(s=e,e=undefined)),this.imagesOffScreen=[],this.viewportHeight=l.documentElement.clientHeight,this.selector=s.selector||".delayed-image-load",this.className=s.className||"image-replace",this.gif=l.createElement("img"),this.gif.src="data:image/gif;base64,R0lGODlhEAAJAIAAAP///wAAACH5BAEAAAAALAAAAAAQAAkAAAIKhI+py+0Po5yUFQA7",this.gif.className=this.className,this.gif.alt="",this.scrollDelay=s.scrollDelay||250,this.onResize=s.hasOwnProperty("onResize")?s.onResize:!0,this.lazyload=s.hasOwnProperty("lazyload")?s.lazyload:!1,this.scrolled=!1,this.availablePixelRatios=s.availablePixelRatios||[1,2],this.availableWidths=s.availableWidths||n,this.onImagesReplaced=s.onImagesReplaced||function(){},this.widthsMap={},this.refreshPixelRatio(),this.widthInterpolator=s.widthInterpolator||a,this.gif.removeAttribute("height"),this.gif.removeAttribute("width"),typeof this.availableWidths!="function"&&(typeof this.availableWidths.length=="number"?this.widthsMap=f.createWidthsMap(this.availableWidths,this.widthInterpolator):(this.widthsMap=this.availableWidths,this.availableWidths=r(this.availableWidths)),this.availableWidths=this.availableWidths.sort(function(e,t){return e-t})),e?(this.divs=u(e,a),this.selector=null):this.divs=u(l.querySelectorAll(this.selector),a),this.changeDivsToEmptyImages(),i(function(){o.init()})}var n,r,i,s,o;i=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)},o=function(){return Object.prototype.hasOwnProperty.call(t.createElement("img"),"naturalWidth")?function(e){return e.naturalWidth}:function(e){var n=t.createElement("img");return n.src=e.src,n.width}}(),s=function(){return t.addEventListener?function(t,n,r){return t.addEventListener(n,r,!1)}:function(t,n,r){return t.attachEvent("on"+n,r)}}(),n=[96,130,165,200,235,270,304,340,375,410,445,485,520,555,590,625,660,695,736],r=typeof Object.keys=="function"?Object.keys:function(e){var t=[],n;for(n in e)t.push(n);return t},f.prototype.scrollCheck=function(){this.scrolled&&(this.imagesOffScreen.length||e.clearInterval(this.interval),this.divs=this.imagesOffScreen.slice(0),this.imagesOffScreen.length=0,this.changeDivsToEmptyImages(),this.scrolled=!1)},f.prototype.init=function(){this.initialized=!0,this.checkImagesNeedReplacing(this.divs),this.onResize&&this.registerResizeEvent(),this.lazyload&&this.registerScrollEvent()},f.prototype.createGif=function(e){if(e.className.match(new RegExp("(^| )"+this.className+"( |$)")))return e;var t=e.getAttribute("data-class"),n=e.getAttribute("data-width"),r=this.gif.cloneNode(!1);return n&&(r.width=n,r.setAttribute("data-width",n)),r.className=(t?t+" ":"")+this.className,r.setAttribute("data-src",e.getAttribute("data-src")),r.setAttribute("alt",e.getAttribute("data-alt")||this.gif.alt),e.parentNode.replaceChild(r,e),r},f.prototype.changeDivsToEmptyImages=function(){var e=this;u(this.divs,function(t,n){e.lazyload?e.isThisElementOnScreen(t)?e.divs[n]=e.createGif(t):e.imagesOffScreen.push(t):e.divs[n]=e.createGif(t)}),this.initialized&&this.checkImagesNeedReplacing(this.divs)},f.prototype.isThisElementOnScreen=function(e){var t=f.getPageOffset(),n=0;if(e.offsetParent)do n+=e.offsetTop;while(e=e.offsetParent);return n<this.viewportHeight+t?!0:!1},f.prototype.checkImagesNeedReplacing=function(e){var t=this;this.isResizing||(this.isResizing=!0,this.refreshPixelRatio(),u(e,function(e){t.replaceImagesBasedOnScreenDimensions(e)}),this.isResizing=!1,this.onImagesReplaced(e))},f.prototype.replaceImagesBasedOnScreenDimensions=function(e){var t,n,r;r=o(e),t=typeof this.availableWidths=="function"?this.availableWidths(e):this.determineAppropriateResolution(e),e.width=t;if(e.src!==this.gif.src&&t<=r)return;n=this.changeImageSrcToUseNewImageDimensions(e.getAttribute("data-src"),t),e.src=n},f.prototype.determineAppropriateResolution=function(e){return f.getClosestValue(e.getAttribute("data-width")||e.parentNode.clientWidth,this.availableWidths)},f.prototype.refreshPixelRatio=function(){this.devicePixelRatio=f.getClosestValue(f.getPixelRatio(),this.availablePixelRatios)},f.prototype.changeImageSrcToUseNewImageDimensions=function(e,t){return e.replace(/{width}/g,f.transforms.width(t,this.widthsMap)).replace(/{pixel_ratio}/g,f.transforms.pixelRatio(this.devicePixelRatio))},f.getPixelRatio=function(n){return(n||e).devicePixelRatio||1},f.createWidthsMap=function(t,n){var r={},i=t.length;while(i--)r[t[i]]=n(t[i]);return r},f.transforms={pixelRatio:function(e){return e===1?"":"-"+e+"x"},width:function(e,t){return t[e]||e}},f.getClosestValue=function(t,n){var r=n.length,i=n[r-1];t=parseFloat(t,10);while(r--)t<=n[r]&&(i=n[r]);return i},f.prototype.registerResizeEvent=function(){var t=this;s(e,"resize",function(){t.checkImagesNeedReplacing(t.divs)})},f.prototype.registerScrollEvent=function(){var t=this;this.scrolled=!1,this.interval=e.setInterval(function(){t.scrollCheck()},t.scrollDelay),s(e,"scroll",function(){t.scrolled=!0})},f.getPageOffsetGenerator=function(r){return r?function(){return e.pageYOffset}:function(){return t.documentElement.scrollTop}},f.getPageOffset=f.getPageOffsetGenerator(Object.prototype.hasOwnProperty.call(e,"pageYOffset")),f.applyEach=u,typeof module=="object"&&typeof module.exports=="object"?module.exports=exports=f:typeof define=="function"&&define.amd?define("imager",[],function(){return f}):typeof e=="object"&&(e.Imager=f)}(window,document),function(e,t,n){var r=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},i=function(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")!==-1},s=function(e,t){i(e,t)||(e.className=e.className===""?t:e.className+" "+t)},o=function(e,t){e.className=r((" "+e.className+" ").replace(" "+t+" "," "))},u=function(e,t){if(e)do{if(e.id===t)return!0;if(e.nodeType===9)break}while(e=e.parentNode);return!1},a=t.documentElement,f=e.Modernizr.prefixed("transform"),l=e.Modernizr.prefixed("transition"),c=function(){var e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"};return e.hasOwnProperty(l)?e[l]:!1}();e.App=function(){var n={},r=t.getElementById("inner-wrap"),u=!1,f="js-nav",h=!1,p="js-toolbox",d=function(e){e&&e.target===r&&t.removeEventListener(c,d,!1),u=!1},v=function(e){e&&e.target===r&&t.removeEventListener(c,v,!1),h=!1};return n.closeNav=function(){if(u){var n=c&&l?parseFloat(e.getComputedStyle(r,"")[l+"Duration"]):0;n>0?t.addEventListener(c,d,!1):d(null)}o(a,f)},n.closeToolbox=function(){if(h){var n=c&&l?parseFloat(e.getComputedStyle(r,"")[l+"Duration"]):0;n>0?t.addEventListener(c,v,!1):v(null)}o(a,p)},n.openNav=function(){if(u)return;s(a,f),u=!0},n.openToolbox=function(){if(h)return;s(a,p),h=!0},n.toggleNav=function(e){u&&i(a,f)?(n.closeNav(),e.preventDefault()):(n.closeToolbox(),n.openNav()),e&&e.preventDefault()},n.toggleToolbox=function(e){h&&i(a,p)?(n.closeToolbox(),e.preventDefault()):(n.closeNav(),n.openToolbox()),e&&e.preventDefault()},t.getElementById("toolbox-open-btn").addEventListener("click",n.toggleToolbox,!1),t.getElementById("toolbox-close-btn").addEventListener("click",n.toggleToolbox,!1),n}()}(window,window.document),define("offCanvas",function(e){return function(){var t,n;return t||e.offCanvas}}(this)),!function(e,t){"function"==typeof define&&define.amd?define("smoothScroll",t(e)):"object"==typeof exports?module.smoothScroll=t(e):e.smoothScroll=t(e)}(this,function(e){var t,n={},r=!!document.querySelector&&!!e.addEventListener,i={speed:500,easing:"easeInOutCubic",offset:0,updateURL:!1,callbackBefore:function(){},callbackAfter:function(){}},s=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.call(n,e[r],r,e);else for(var i=0,s=e.length;s>i;i++)t.call(n,e[i],i,e)},o=function(e,t){var n={};return s(e,function(t,r){n[r]=e[r]}),s(t,function(e,r){n[r]=t[r]}),n},u=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+ --t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},a=function(e,t,n){var r=0;if(e.offsetParent)do r+=e.offsetTop,e=e.offsetParent;while(e);return r=r-t-n,r>=0?r:0},f=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},l=function(e){return e.replace(/^\s+|\s+$/g,"")},c=function(e){var t={};return e&&(e=e.split(";"),e.forEach(function(e){e=l(e),""!==e&&(e=e.split(":"),t[e[0]]=l(e[1]))})),t},h=function(e,t){history.pushState&&(t||"true"===t)&&history.pushState({pos:e.id},"",e)};return n.animateScroll=function(t,n,r,s){var l=o(l||i,r||{}),p=c(t?t.getAttribute("data-options"):null);l=o(l,p);var v,m,g,y=document.querySelector("[data-scroll-header]"),b=null===y?0:y.offsetHeight+y.offsetTop,w=e.pageYOffset,E=a(document.querySelector(n),b,parseInt(l.offset,10)),S=E-w,x=f(),T=0;t&&"a"===t.tagName.toLowerCase()&&s&&s.preventDefault(),h(n,l.updateURL);var N=function(r,i,s){var o=e.pageYOffset;(r==i||o==i||e.innerHeight+o>=x)&&(clearInterval(s),l.callbackAfter(t,n))},C=function(){T+=16,m=T/parseInt(l.speed,10),m=m>1?1:m,g=w+S*u(l.easing,m),e.scrollTo(0,Math.floor(g)),N(g,E,v)},k=function(){l.callbackBefore(t,n),v=setInterval(C,16)};0===e.pageYOffset&&e.scrollTo(0,0),k()},n.init=function(e){if(r){t=o(i,e||{});var u=document.querySelectorAll("[data-scroll]");s(u,function(e){e.addEventListener("click",n.animateScroll.bind(null,e,e.hash,t),!1)})}},n}),define("smoothScroll",function(e){return function(){var t,n;return t||e.smoothScroll}}(this)),require.config({baseUrl:"",paths:{ie8addEventListener:"scripts/ie8addEventListener",responsiveCarousel:"scripts/vendor/responsive-carousel/dist/responsive-carousel.min",imager:"bower_components/imager.js/Imager",offCanvas:"scripts/off-canvas",smoothScroll:"bower_components/smooth-scroll.js/dist/js/smooth-scroll.min"},shim:{ie8addEventListener:{exports:"ie8addEventListener"},responsiveCarousel:{exports:"responsiveCarousel"},imager:{exports:"Imager"},offCanvas:{exports:"offCanvas"},smoothScroll:{exports:"smoothScroll"}}}),require(["ie8addEventListener","responsiveCarousel","imager","offCanvas","smoothScroll"],function(e,t,n,r,i){new n({lazyload:!1,scrollDelay:250,availableWidths:[200,300,400,500,600,700,800,900,1e3,1100,1200]}),i.init({easing:"easeInOutQuint"})}),define("scripts/main",function(){});