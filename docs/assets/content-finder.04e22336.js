(function(){"use strict";function g(o,{a:n,c:t,m:e}){function c(s,i){function u(f,d){if(f==0n)return{g:d,x:0n,y:1n};{const{g:m,x:a,y}=u(d%f,f);return{g:m,x:y-d/f*a,y:a}}}return u(s,i).x%i}const r=c(n,e)*(o-t)%e;return r<0?r+e:r}function p(o,n){function t(e,c,r,s){return e+BigInt(c)*BigInt(n)**BigInt(s.length-1-r)}return o.reduce(t,0n)}function l(o,n){return Array.from(o).map(t=>n.indexOf(t.codePointAt(0)))}const v=_(),x=7151;function _(){function o(r){c.push(r)}function n(r,s){for(let i=r;i<=s;i++)c.push(i)}function t(r){c=c.filter(s=>s!=r)}function e(r,s){for(let i=r;i<=s;i++)c=c.filter(u=>u!=i)}let c=[];return o(9),o(10),o(13),o(32),n(33,126),n(161,255),n(256,383),n(384,591),n(592,687),n(688,767),n(768,879),n(800,1023),e(888,889),e(896,899),t(907),t(909),t(930),n(1425,1524),e(1480,1487),e(1515,1519),n(1536,1791),t(1565),n(1872,1919),n(5792,5887),e(5881,5887),n(7680,7935),n(8203,8207),n(8304,8351),e(8306,8307),t(8335),e(8349,8351),n(8352,8399),e(8383,8399),n(8448,8527),n(8592,8703),n(8704,8959),n(8960,9215),e(9211,9215),n(9312,9471),n(9472,9599),n(9600,9631),n(9632,9727),n(9728,9983),n(9984,10175),n(10176,10223),n(10240,10495),n(10624,10751),n(10752,11007),n(12353,12438),n(12448,12543),n(12784,12799),n(64336,64449),n(65024,65039),n(119808,120831),t(119893),t(119965),e(119968,119969),e(119971,119972),e(119975,119976),t(119981),t(119994),t(119996),t(120004),t(120070),e(120075,120076),t(120085),t(120093),t(120122),t(120127),t(120133),t(120135),e(120136,120137),t(120145),e(120486,120487),e(120780,120781),n(126976,127019),n(127024,127123),n(127136,127221),e(127151,127152),t(127168),t(127184),n(127232,127487),e(127245,127247),t(127279),e(127340,127343),e(127387,127461),n(127744,128511),t(128378),t(128420),n(128512,128591),n(128592,128639),n(128640,128767),e(128721,128735),e(128749,128751),e(128756,128767),n(129296,129535),t(129343),e(129357,129359),e(129388,129407),e(129432,129487),o(129472),e(129511,129535),c}var h={a:2n**38496n+1n,c:2n**23209n-1n,m:2n**38501n};onmessage=o=>{const n=g(p(l(o.data,v).reverse(),x),h);postMessage({searchString:o.data,pageNumber:n})}})();
