import{S as V,i as q,s as z,l as $,m as b,n as d,h,p as l,b as B,B as H,F as J,G as K,w as y,a as L,x as A,c as S,H as k,I as g,y as I,f as w,t as E,z as M,J as O,K as P,L as Q,M as R,N as T}from"../../chunks/index-52270b8f.js";import{p as U}from"../../chunks/stores-36324de2.js";function W(i){let e,t,r;return{c(){e=$("i"),this.h()},l(s){e=b(s,"I",{"aria-hidden":!0,"aria-label":!0,class:!0}),d(e).forEach(h),this.h()},h(){l(e,"aria-hidden",t=!i[1]),l(e,"aria-label",i[1]),l(e,"class",r=`bi bi-${i[0]} ${i[2].class||""}`)},m(s,a){B(s,e,a)},p(s,[a]){a&2&&t!==(t=!s[1])&&l(e,"aria-hidden",t),a&2&&l(e,"aria-label",s[1]),a&5&&r!==(r=`bi bi-${s[0]} ${s[2].class||""}`)&&l(e,"class",r)},i:H,o:H,d(s){s&&h(e)}}}function X(i,e,t){let{icon:r}=e,{label:s=void 0}=e;return i.$$set=a=>{t(2,e=J(J({},e),K(a))),"icon"in a&&t(0,r=a.icon),"label"in a&&t(1,s=a.label)},e=K(e),[r,s,e]}class j extends V{constructor(e){super(),q(this,e,X,W,z,{icon:0,label:1})}}function Y(i){let e,t,r,s,a,m,u,n,c,v,_,p,N;return r=new j({props:{icon:"book"}}),m=new j({props:{icon:"search"}}),c=new j({props:{icon:"bookmark"}}),p=new j({props:{icon:"github"}}),{c(){e=$("nav"),t=$("a"),y(r.$$.fragment),s=L(),a=$("a"),y(m.$$.fragment),u=L(),n=$("a"),y(c.$$.fragment),v=L(),_=$("a"),y(p.$$.fragment),this.h()},l(o){e=b(o,"NAV",{"aria-label":!0,class:!0});var f=d(e);t=b(f,"A",{href:!0,class:!0});var C=d(t);A(r.$$.fragment,C),C.forEach(h),s=S(f),a=b(f,"A",{href:!0,class:!0});var D=d(a);A(m.$$.fragment,D),D.forEach(h),u=S(f),n=b(f,"A",{href:!0,class:!0});var F=d(n);A(c.$$.fragment,F),F.forEach(h),v=S(f),_=b(f,"A",{id:!0,target:!0,rel:!0,href:!0,class:!0});var G=d(_);A(p.$$.fragment,G),G.forEach(h),f.forEach(h),this.h()},h(){l(t,"href","/browse"),l(t,"class","svelte-1leb4nw"),k(t,"active",i[0].url.pathname==="/browse"),l(a,"href","/search"),l(a,"class","svelte-1leb4nw"),k(a,"active",i[0].url.pathname==="/search"),l(n,"href","/bookmarks"),l(n,"class","svelte-1leb4nw"),k(n,"active",i[0].url.pathname==="/bookmarks"),l(_,"id","github"),l(_,"target","_blank"),l(_,"rel","noopener"),l(_,"href","https://github.com/mnorlin/wiki-2"),l(_,"class","svelte-1leb4nw"),l(e,"aria-label","Menu"),l(e,"class","svelte-1leb4nw")},m(o,f){B(o,e,f),g(e,t),I(r,t,null),g(e,s),g(e,a),I(m,a,null),g(e,u),g(e,n),I(c,n,null),g(e,v),g(e,_),I(p,_,null),N=!0},p(o,[f]){f&1&&k(t,"active",o[0].url.pathname==="/browse"),f&1&&k(a,"active",o[0].url.pathname==="/search"),f&1&&k(n,"active",o[0].url.pathname==="/bookmarks")},i(o){N||(w(r.$$.fragment,o),w(m.$$.fragment,o),w(c.$$.fragment,o),w(p.$$.fragment,o),N=!0)},o(o){E(r.$$.fragment,o),E(m.$$.fragment,o),E(c.$$.fragment,o),E(p.$$.fragment,o),N=!1},d(o){o&&h(e),M(r),M(m),M(c),M(p)}}}function Z(i,e,t){let r;return O(i,U,s=>t(0,r=s)),[r]}class x extends V{constructor(e){super(),q(this,e,Z,Y,z,{})}}function ee(i){let e,t,r,s,a;t=new x({});const m=i[1].default,u=P(m,i,i[0],null);return{c(){e=$("div"),y(t.$$.fragment),r=L(),s=$("main"),u&&u.c(),this.h()},l(n){e=b(n,"DIV",{id:!0,class:!0});var c=d(e);A(t.$$.fragment,c),r=S(c),s=b(c,"MAIN",{class:!0});var v=d(s);u&&u.l(v),v.forEach(h),c.forEach(h),this.h()},h(){l(s,"class","svelte-1hbsjxs"),l(e,"id","page"),l(e,"class","svelte-1hbsjxs")},m(n,c){B(n,e,c),I(t,e,null),g(e,r),g(e,s),u&&u.m(s,null),a=!0},p(n,[c]){u&&u.p&&(!a||c&1)&&Q(u,m,n,n[0],a?T(m,n[0],c,null):R(n[0]),null)},i(n){a||(w(t.$$.fragment,n),w(u,n),a=!0)},o(n){E(t.$$.fragment,n),E(u,n),a=!1},d(n){n&&h(e),M(t),u&&u.d(n)}}}function ae(i,e,t){let{$$slots:r={},$$scope:s}=e;return i.$$set=a=>{"$$scope"in a&&t(0,s=a.$$scope)},[s,r]}class ne extends V{constructor(e){super(),q(this,e,ae,ee,z,{})}}export{ne as default};