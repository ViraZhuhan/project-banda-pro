!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequirec0f3;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequirec0f3=i),i("i8Q71"),i("cs7FV"),i("7jbwn"),i("gVa74"),i("f6Iod"),i("lVU68"),i("aZhHc");var o,u=i("bpxeT"),a=i("2TvXO"),f=i("b7ONl"),c=i("l5bVx"),l="Expected a function",s=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,v=/^0b[01]+$/i,p=/^0o[0-7]+$/i,y=parseInt,m="object"==typeof t&&t&&t.Object===Object&&t,g="object"==typeof self&&self&&self.Object===Object&&self,b=m||g||Function("return this")(),h=Object.prototype.toString,w=Math.max,x=Math.min,T=function(){return b.Date.now()};function O(e,t,n){var r,i,o,u,a,f,c=0,s=!1,d=!1,v=!0;if("function"!=typeof e)throw new TypeError(l);function p(t){var n=r,o=i;return r=i=void 0,c=t,u=e.apply(o,n)}function y(e){return c=e,a=setTimeout(g,t),s?p(e):u}function m(e){var n=e-f;return void 0===f||n>=t||n<0||d&&e-c>=o}function g(){var e=T();if(m(e))return b(e);a=setTimeout(g,function(e){var n=t-(e-f);return d?x(n,o-(e-c)):n}(e))}function b(e){return a=void 0,v&&r?p(e):(r=i=void 0,u)}function h(){var e=T(),n=m(e);if(r=arguments,i=this,f=e,n){if(void 0===a)return y(f);if(d)return a=setTimeout(g,t),p(f)}return void 0===a&&(a=setTimeout(g,t)),u}return t=E(t)||0,j(n)&&(s=!!n.leading,o=(d="maxWait"in n)?w(E(n.maxWait)||0,t):o,v="trailing"in n?!!n.trailing:v),h.cancel=function(){void 0!==a&&clearTimeout(a),c=0,r=f=i=a=void 0},h.flush=function(){return void 0===a?u:b(T())},h}function j(t){var n=void 0===t?"undefined":e(c)(t);return!!t&&("object"==n||"function"==n)}function E(t){if("number"==typeof t)return t;if(function(t){return"symbol"==(void 0===t?"undefined":e(c)(t))||function(e){return!!e&&"object"==typeof e}(t)&&"[object Symbol]"==h.call(t)}(t))return NaN;if(j(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=j(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(s,"");var r=v.test(t);return r||p.test(t)?y(t.slice(2),r?2:8):d.test(t)?NaN:+t}o=function(e,t,n){var r=!0,i=!0;if("function"!=typeof e)throw new TypeError(l);return j(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),O(e,t,{leading:r,maxWait:t,trailing:i})};var N=i("cwHAv"),M=i("6JpON"),H=new(0,f.default),L=e(M).Notify,_=document.getElementById("search-form"),q=document.getElementById("search-input"),B=document.querySelector(".gallery");function D(){return(D=e(u)(e(a).mark((function t(n){var r,i;return e(a).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),r=n.currentTarget.elements.searchQuery.value.trim(),e.next=4,H.searchMovieByQuery(r);case 4:if(i=e.sent,""!==r){e.next=7;break}return e.abrupt("return",L.failure("Sorry, there are no images matching your search query. Please try again.",{timeout:1e3}));case 7:L.info("Hooray! We found ".concat(i.total_results," images."),{timeout:1e3}),H.reset(),H.nextPage(),Q(),I(i.results);case 12:case"end":return e.stop()}}),t)})))).apply(this,arguments)}_.addEventListener("submit",(function(e){return D.apply(this,arguments)})),window.addEventListener("scroll",e(o)((function(e){var t,n,r;t=q.value.trim(),n=document.body.offsetHeight,r=window.innerHeight,window.scrollY+r>=n-r/4&&H.searchMovieByQuery(t).then((function(e){I(e.results),H.nextPage()}))}),3e3));var I=function(e){B.insertAdjacentHTML("beforeend",(0,N.createGallery)(e))},Q=function(){return B.innerHTML=""}}();
//# sourceMappingURL=catalog.cb280413.js.map
