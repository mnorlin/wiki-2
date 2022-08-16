var Ve=Object.defineProperty;var qe=(a,e,n)=>e in a?Ve(a,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[e]=n;var pe=(a,e,n)=>(qe(a,typeof e!="symbol"?e+"":e,n),n);import{S as ze,i as Be,s as Ke,a as Je,e as A,c as He,b as V,g as H,t as O,d as W,f as P,h as T,j as We,k as Fe,o as ge,l as Ge,m as Me,n as Ye,p as _e,q as K,r as Xe,u as Ze,v as Qe,w as q,x as Z,y as z,z as B,A as Se}from"./chunks/index-52270b8f.js";import{w as ae}from"./chunks/index-b01864a9.js";import{_ as G}from"./chunks/preload-helper-c28b9807.js";class ne{constructor(e,n){pe(this,"name","HttpError");pe(this,"stack");this.status=e,this.message=n??`Error: ${e}`}toString(){return this.message}}class Ue{constructor(e,n){this.status=e,this.location=n}}function xe(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function et(a){for(const e in a)a[e]=a[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return a}class tt extends URL{get hash(){throw new Error("url.hash is inaccessible from load. Consider accessing hash from the page store within the script tag of your component.")}}let Ae="",De="";function nt(a){Ae=a.base,De=a.assets||Ae}function Oe(a){let e=a.baseURI;if(!e){const n=a.getElementsByTagName("base");e=n.length?n[0].href:a.URL}return e}function we(){return{x:pageXOffset,y:pageYOffset}}function Pe(a){return a.composedPath().find(n=>n instanceof Node&&n.nodeName.toUpperCase()==="A")}function Ie(a){return a instanceof SVGAElement?new URL(a.href.baseVal,document.baseURI):new URL(a.href)}function je(a){const e=ae(a);let n=!0;function i(){n=!0,e.update(t=>t)}function r(t){n=!1,e.set(t)}function f(t){let o;return e.subscribe(c=>{(o===void 0||n&&c!==o)&&t(o=c)})}return{notify:i,set:r,subscribe:f}}function at(){const{set:a,subscribe:e}=ae(!1);let n;async function i(){clearTimeout(n);const r=await fetch(`${De}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(r.ok){const{version:f}=await r.json(),t=f!=="1660677974077";return t&&(a(!0),clearTimeout(n)),t}else throw new Error(`Version check failed: ${r.status}`)}return{subscribe:e,check:i}}function rt(a){let e=5381,n=a.length;if(typeof a=="string")for(;n;)e=e*33^a.charCodeAt(--n);else for(;n;)e=e*33^a[--n];return(e>>>0).toString(36)}const be=window.fetch;function st(a,e){let i=`script[sveltekit\\:data-type="data"][sveltekit\\:data-url=${JSON.stringify(typeof a=="string"?a:a.url)}]`;e&&typeof e.body=="string"&&(i+=`[sveltekit\\:data-body="${rt(e.body)}"]`);const r=document.querySelector(i);if(r&&r.textContent){const{body:f,...t}=JSON.parse(r.textContent);return Promise.resolve(new Response(f,t))}return be(a,e)}const it=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function ot(a){const e=[],n=[];let i=!0;return{pattern:a===""?/^\/$/:new RegExp(`^${decodeURIComponent(a).split(/(?:@[a-zA-Z0-9_-]+)?(?:\/|$)/).map((f,t,o)=>{const c=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(f);if(c)return e.push(c[1]),n.push(c[2]),"(?:/(.*))?";const u=t===o.length-1;return f&&"/"+f.split(/\[(.+?)\]/).map((h,E)=>{if(E%2){const U=it.exec(h);if(!U)throw new Error(`Invalid param: ${h}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,v,Q,x]=U;return e.push(Q),n.push(x),v?"(.*?)":"([^/]+?)"}return u&&h.includes(".")&&(i=!1),h.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${i?"/?":""}$`),names:e,types:n}}function ct(a,e,n,i){const r={};for(let f=0;f<e.length;f+=1){const t=e[f],o=n[f],c=a[f+1]||"";if(o){const u=i[o];if(!u)throw new Error(`Missing "${o}" param matcher`);if(!u(c))return}r[t]=c}return r}function lt(a,e,n){return Object.entries(e).map(([i,[r,f,t,o]])=>{const{pattern:c,names:u,types:h}=ot(i),E={id:i,exec:U=>{const v=c.exec(U);if(v)return ct(v,u,h,n)},errors:r.map(U=>a[U]),layouts:f.map(U=>a[U]),leaf:a[t],uses_server_data:!!o};return E.errors.length=E.layouts.length=Math.max(E.errors.length,E.layouts.length),E})}function ft(a,e){return new ne(a,e)}function ut(a){let e,n,i;var r=a[0][0];function f(t){return{props:{data:t[1],errors:t[4]}}}return r&&(e=new r(f(a))),{c(){e&&q(e.$$.fragment),n=A()},l(t){e&&Z(e.$$.fragment,t),n=A()},m(t,o){e&&z(e,t,o),V(t,n,o),i=!0},p(t,o){const c={};if(o&2&&(c.data=t[1]),o&16&&(c.errors=t[4]),r!==(r=t[0][0])){if(e){H();const u=e;O(u.$$.fragment,1,0,()=>{B(u,1)}),W()}r?(e=new r(f(t)),q(e.$$.fragment),P(e.$$.fragment,1),z(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&P(e.$$.fragment,t),i=!0)},o(t){e&&O(e.$$.fragment,t),i=!1},d(t){t&&T(n),e&&B(e,t)}}}function dt(a){let e,n,i;var r=a[0][0];function f(t){return{props:{data:t[1],$$slots:{default:[mt]},$$scope:{ctx:t}}}}return r&&(e=new r(f(a))),{c(){e&&q(e.$$.fragment),n=A()},l(t){e&&Z(e.$$.fragment,t),n=A()},m(t,o){e&&z(e,t,o),V(t,n,o),i=!0},p(t,o){const c={};if(o&2&&(c.data=t[1]),o&1053&&(c.$$scope={dirty:o,ctx:t}),r!==(r=t[0][0])){if(e){H();const u=e;O(u.$$.fragment,1,0,()=>{B(u,1)}),W()}r?(e=new r(f(t)),q(e.$$.fragment),P(e.$$.fragment,1),z(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&P(e.$$.fragment,t),i=!0)},o(t){e&&O(e.$$.fragment,t),i=!1},d(t){t&&T(n),e&&B(e,t)}}}function pt(a){let e,n,i;var r=a[0][1];function f(t){return{props:{data:t[2],errors:t[4]}}}return r&&(e=new r(f(a))),{c(){e&&q(e.$$.fragment),n=A()},l(t){e&&Z(e.$$.fragment,t),n=A()},m(t,o){e&&z(e,t,o),V(t,n,o),i=!0},p(t,o){const c={};if(o&4&&(c.data=t[2]),o&16&&(c.errors=t[4]),r!==(r=t[0][1])){if(e){H();const u=e;O(u.$$.fragment,1,0,()=>{B(u,1)}),W()}r?(e=new r(f(t)),q(e.$$.fragment),P(e.$$.fragment,1),z(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&P(e.$$.fragment,t),i=!0)},o(t){e&&O(e.$$.fragment,t),i=!1},d(t){t&&T(n),e&&B(e,t)}}}function _t(a){let e,n,i;var r=a[0][1];function f(t){return{props:{data:t[2],$$slots:{default:[ht]},$$scope:{ctx:t}}}}return r&&(e=new r(f(a))),{c(){e&&q(e.$$.fragment),n=A()},l(t){e&&Z(e.$$.fragment,t),n=A()},m(t,o){e&&z(e,t,o),V(t,n,o),i=!0},p(t,o){const c={};if(o&4&&(c.data=t[2]),o&1033&&(c.$$scope={dirty:o,ctx:t}),r!==(r=t[0][1])){if(e){H();const u=e;O(u.$$.fragment,1,0,()=>{B(u,1)}),W()}r?(e=new r(f(t)),q(e.$$.fragment),P(e.$$.fragment,1),z(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&P(e.$$.fragment,t),i=!0)},o(t){e&&O(e.$$.fragment,t),i=!1},d(t){t&&T(n),e&&B(e,t)}}}function ht(a){let e,n,i;var r=a[0][2];function f(t){return{props:{data:t[3]}}}return r&&(e=new r(f(a))),{c(){e&&q(e.$$.fragment),n=A()},l(t){e&&Z(e.$$.fragment,t),n=A()},m(t,o){e&&z(e,t,o),V(t,n,o),i=!0},p(t,o){const c={};if(o&8&&(c.data=t[3]),r!==(r=t[0][2])){if(e){H();const u=e;O(u.$$.fragment,1,0,()=>{B(u,1)}),W()}r?(e=new r(f(t)),q(e.$$.fragment),P(e.$$.fragment,1),z(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&P(e.$$.fragment,t),i=!0)},o(t){e&&O(e.$$.fragment,t),i=!1},d(t){t&&T(n),e&&B(e,t)}}}function mt(a){let e,n,i,r;const f=[_t,pt],t=[];function o(c,u){return c[0][2]?0:1}return e=o(a),n=t[e]=f[e](a),{c(){n.c(),i=A()},l(c){n.l(c),i=A()},m(c,u){t[e].m(c,u),V(c,i,u),r=!0},p(c,u){let h=e;e=o(c),e===h?t[e].p(c,u):(H(),O(t[h],1,1,()=>{t[h]=null}),W(),n=t[e],n?n.p(c,u):(n=t[e]=f[e](c),n.c()),P(n,1),n.m(i.parentNode,i))},i(c){r||(P(n),r=!0)},o(c){O(n),r=!1},d(c){t[e].d(c),c&&T(i)}}}function Ne(a){let e,n=a[6]&&Te(a);return{c(){e=Ge("div"),n&&n.c(),this.h()},l(i){e=Me(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=Ye(e);n&&n.l(r),r.forEach(T),this.h()},h(){_e(e,"id","svelte-announcer"),_e(e,"aria-live","assertive"),_e(e,"aria-atomic","true"),K(e,"position","absolute"),K(e,"left","0"),K(e,"top","0"),K(e,"clip","rect(0 0 0 0)"),K(e,"clip-path","inset(50%)"),K(e,"overflow","hidden"),K(e,"white-space","nowrap"),K(e,"width","1px"),K(e,"height","1px")},m(i,r){V(i,e,r),n&&n.m(e,null)},p(i,r){i[6]?n?n.p(i,r):(n=Te(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&T(e),n&&n.d()}}}function Te(a){let e;return{c(){e=Xe(a[7])},l(n){e=Ze(n,a[7])},m(n,i){V(n,e,i)},p(n,i){i&128&&Qe(e,n[7])},d(n){n&&T(e)}}}function gt(a){let e,n,i,r,f;const t=[dt,ut],o=[];function c(h,E){return h[0][1]?0:1}e=c(a),n=o[e]=t[e](a);let u=a[5]&&Ne(a);return{c(){n.c(),i=Je(),u&&u.c(),r=A()},l(h){n.l(h),i=He(h),u&&u.l(h),r=A()},m(h,E){o[e].m(h,E),V(h,i,E),u&&u.m(h,E),V(h,r,E),f=!0},p(h,[E]){let U=e;e=c(h),e===U?o[e].p(h,E):(H(),O(o[U],1,1,()=>{o[U]=null}),W(),n=o[e],n?n.p(h,E):(n=o[e]=t[e](h),n.c()),P(n,1),n.m(i.parentNode,i)),h[5]?u?u.p(h,E):(u=Ne(h),u.c(),u.m(r.parentNode,r)):u&&(u.d(1),u=null)},i(h){f||(P(n),f=!0)},o(h){O(n),f=!1},d(h){o[e].d(h),h&&T(i),u&&u.d(h),h&&T(r)}}}function wt(a,e,n){let{stores:i}=e,{page:r}=e,{components:f}=e,{data_0:t=null}=e,{data_1:o=null}=e,{data_2:c=null}=e,{errors:u}=e;We("__svelte__",i),Fe(i.page.notify);let h=!1,E=!1,U=null;return ge(()=>{const v=i.page.subscribe(()=>{h&&(n(6,E=!0),n(7,U=document.title||"untitled page"))});return n(5,h=!0),v}),a.$$set=v=>{"stores"in v&&n(8,i=v.stores),"page"in v&&n(9,r=v.page),"components"in v&&n(0,f=v.components),"data_0"in v&&n(1,t=v.data_0),"data_1"in v&&n(2,o=v.data_1),"data_2"in v&&n(3,c=v.data_2),"errors"in v&&n(4,u=v.errors)},a.$$.update=()=>{a.$$.dirty&768&&i.page.set(r)},[f,t,o,c,u,h,E,U,i,r]}class bt extends ze{constructor(e){super(),Be(this,e,wt,gt,Ke,{stores:8,page:9,components:0,data_0:1,data_1:2,data_2:3,errors:4})}}const yt={},re=[()=>G(()=>import("./chunks/0-874532d7.js"),["_app/immutable/chunks/0-874532d7.js","_app/immutable/components/pages/_layout.svelte-2c1c1993.js","_app/immutable/assets/+layout-3b7efa4c.css","_app/immutable/chunks/index-52270b8f.js","_app/immutable/chunks/stores-36324de2.js"]),()=>G(()=>import("./chunks/1-3e3fbd88.js"),["_app/immutable/chunks/1-3e3fbd88.js","_app/immutable/components/error.svelte-831260e4.js","_app/immutable/chunks/index-52270b8f.js","_app/immutable/chunks/stores-36324de2.js"]),()=>G(()=>import("./chunks/2-be89cb0f.js"),["_app/immutable/chunks/2-be89cb0f.js","_app/immutable/components/pages/_page.svelte-cbdbdc49.js","_app/immutable/chunks/index-52270b8f.js"]),()=>G(()=>import("./chunks/3-d052208e.js"),["_app/immutable/chunks/3-d052208e.js","_app/immutable/components/pages/bookmarks/_page.svelte-0efe8dce.js","_app/immutable/assets/+page-cf41fcad.css","_app/immutable/chunks/index-52270b8f.js","_app/immutable/chunks/bookmarks-b581a12f.js","_app/immutable/chunks/index-b01864a9.js"]),()=>G(()=>import("./chunks/4-6299e35d.js"),["_app/immutable/chunks/4-6299e35d.js","_app/immutable/components/pages/browse/_page.svelte-b16890d0.js","_app/immutable/assets/+page-738cba9e.css","_app/immutable/chunks/index-52270b8f.js","_app/immutable/chunks/preload-helper-c28b9807.js","_app/immutable/chunks/index-b01864a9.js","_app/immutable/chunks/bookmarks-b581a12f.js","_app/immutable/chunks/stores-36324de2.js","_app/immutable/chunks/lcg-params-ea5a6b99.js"]),()=>G(()=>import("./chunks/5-372ae292.js"),["_app/immutable/chunks/5-372ae292.js","_app/immutable/components/pages/search/_page.svelte-2d49dbd4.js","_app/immutable/assets/+page-0b5811f7.css","_app/immutable/chunks/preload-helper-c28b9807.js","_app/immutable/chunks/index-52270b8f.js","_app/immutable/chunks/lcg-params-ea5a6b99.js"])],vt={"":[[1],[0],2],bookmarks:[[1],[0],3],browse:[[1],[0],4],search:[[1],[0],5]},Ce="sveltekit:scroll",J="sveltekit:index",he=lt(re,vt,yt),kt=re[0](),$t=re[1]();let X={};try{X=JSON.parse(sessionStorage[Ce])}catch{}function me(a){X[a]=we()}function Et({target:a,session:e,base:n,trailing_slash:i}){const r=[],f={url:je({}),page:je({}),navigating:ae(null),session:ae(e),updated:at()},t={id:null,promise:null},o={before_navigate:[],after_navigate:[]};let c={branch:[],error:null,session_id:0,url:null},u=!1,h=!0,E=!1,U=1,v=null,Q,x,ye=!1;f.session.subscribe(async s=>{x=s,!(!ye||(U+=1,!c.branch.some(m=>m?.uses.session)))&&ce(new URL(location.href),[])}),ye=!0;let F=!0,j=history.state?.[J];j||(j=Date.now(),history.replaceState({...history.state,[J]:j},"",location.href));const se=X[j];se&&(history.scrollRestoration="manual",scrollTo(se.x,se.y));let ie=!1,oe,ve;async function ke(s,{noscroll:d=!1,replaceState:m=!1,keepfocus:l=!1,state:p={}},$){if(typeof s=="string"&&(s=new URL(s,Oe(document))),F)return fe({url:s,scroll:d?we():null,keepfocus:l,redirect_chain:$,details:{state:p,replaceState:m},accepted:()=>{},blocked:()=>{}});await M(s)}async function $e(s){const d=Le(s);if(!d)throw new Error("Attempted to prefetch a URL that does not belong to this app");return t.promise=Re(d),t.id=d.id,t.promise}async function ce(s,d,m,l){const p=Le(s),$=ve={};let _=p&&await Re(p);if(!_&&s.origin===location.origin&&s.pathname===location.pathname&&(_=await te({status:404,error:new Error(`Not found: ${s.pathname}`),url:s,routeId:null})),!_)return await M(s),!1;if(s=p?.url||s,ve!==$)return!1;if(r.length=0,_.type==="redirect")if(d.length>10||d.includes(s.pathname))_=await te({status:500,error:new Error("Redirect loop"),url:s,routeId:null});else return F?ke(new URL(_.location,s).href,{},[...d,s.pathname]):await M(new URL(_.location,location.href)),!1;else _.props?.page?.status>=400&&await f.updated.check()&&await M(s);if(E=!0,m&&m.details){const{details:b}=m,L=b.replaceState?0:1;b.state[J]=j+=L,history[b.replaceState?"replaceState":"pushState"](b.state,"",s)}if(u?(c=_.state,_.props.page&&(_.props.page.url=s),Q.$set(_.props)):Ee(_),m){const{scroll:b,keepfocus:L}=m;if(!L){const k=document.body,I=k.getAttribute("tabindex");k.tabIndex=-1,k.focus({preventScroll:!0}),setTimeout(()=>{getSelection()?.removeAllRanges()}),I!==null?k.setAttribute("tabindex",I):k.removeAttribute("tabindex")}if(await Se(),h){const k=s.hash&&document.getElementById(s.hash.slice(1));b?scrollTo(b.x,b.y):k?k.scrollIntoView():scrollTo(0,0)}}else await Se();t.promise=null,t.id=null,h=!0,_.props.page&&(oe=_.props.page),F=_.state.branch.at(-1)?.node.shared?.router!==!1,l&&l(),E=!1}function Ee(s){c=s.state;const d=document.querySelector("style[data-sveltekit]");if(d&&d.remove(),oe=s.props.page,Q=new bt({target:a,props:{...s.props,stores:f},hydrate:!0}),F){const m={from:null,to:new URL(location.href)};o.after_navigate.forEach(l=>l(m))}u=!0}async function ee({url:s,params:d,branch:m,status:l,error:p,routeId:$,validation_errors:_}){const R=m.filter(Boolean),b={type:"loaded",state:{url:s,params:d,branch:m,error:p,session_id:U},props:{components:R.map(y=>y.node.component),errors:_}};let L={},k=!1;for(let y=0;y<R.length;y+=1)Object.assign(L,R[y].data),c.branch.some(w=>w===R[y])||(b.props[`data_${y}`]=R[y].data,k=!0);if(!c.url||s.href!==c.url.href||c.error!==p||k){b.props.page={error:p,params:d,routeId:$,status:l,url:s,data:L};const y=(w,g)=>{Object.defineProperty(b.props.page,w,{get:()=>{throw new Error(`$page.${w} has been replaced by $page.url.${g}`)}})};y("origin","origin"),y("path","pathname"),y("query","searchParams")}return b}async function le({node:s,parent:d,url:m,params:l,routeId:p,server_data:$}){const _={params:new Set,url:!1,session:!1,dependencies:new Set,parent:!1};function R(...y){for(const w of y){const{href:g}=new URL(w,m);_.dependencies.add(g)}}let b=null;s.server&&(_.dependencies.add(m.href),_.url=!0);const L={};for(const y in l)Object.defineProperty(L,y,{get(){return _.params.add(y),l[y]},enumerable:!0});const k=x,I=new tt(m);if(s.shared?.load){const y={routeId:p,params:L,data:$,get url(){return _.url=!0,I},get session(){return _.session=!0,k},async fetch(w,g){let S;typeof w=="string"?S=w:(S=w.url,g={body:w.method==="GET"||w.method==="HEAD"?void 0:await w.blob(),cache:w.cache,credentials:w.credentials,headers:w.headers,integrity:w.integrity,keepalive:w.keepalive,method:w.method,mode:w.mode,redirect:w.redirect,referrer:w.referrer,referrerPolicy:w.referrerPolicy,signal:w.signal,...g});const N=new URL(S,m).href;return R(N),u?be(N,g):st(S,g)},setHeaders:()=>{},depends:R,get parent(){return _.parent=!0,d},get props(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},get stuff(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")}};b=await s.shared.load.call(null,y)??null}return{node:s,data:b||$,uses:_}}async function Re({id:s,url:d,params:m,route:l}){if(t.id===s&&t.promise)return t.promise;const{errors:p,layouts:$,leaf:_}=l,R=c.url&&{url:s!==c.url.pathname+c.url.search,params:Object.keys(m).filter(g=>c.params[g]!==m[g]),session:U!==c.session_id};[...p,...$,_].forEach(g=>g?.().catch(()=>{}));const b=[...$,_],L=[];for(let g=0;g<b.length;g++)if(!b[g])L.push(!1);else{const S=c.branch[g],N=!S||R.url&&S.uses.url||R.params.some(D=>S.uses.params.has(D))||R.session&&S.uses.session||Array.from(S.uses.dependencies).some(D=>r.some(Y=>Y(D)))||S.uses.parent&&L.includes(!0);L.push(N)}let k=null;if(l.uses_server_data){try{const g=await be(`${d.pathname}${d.pathname.endsWith("/")?"":"/"}__data.json${d.search}`);if(k=await g.json(),!g.ok)throw k}catch{throw new Error("TODO render fallback error page")}if(k.type==="redirect")return k}const I=k?.nodes,y=b.map(async(g,S)=>Promise.resolve().then(async()=>{if(!g)return;const N=await g(),D=c.branch[S];if(L[S]||!D||N!==D.node){const C=I?.[S];if(C?.status)throw ft(C.status,C.message);if(C?.error)throw C.error;return await le({node:N,url:d,params:m,routeId:l.id,parent:async()=>{const ue={};for(let de=0;de<S;de+=1)Object.assign(ue,(await y[de])?.data);return ue},server_data:C?.data??null})}else return D}));for(const g of y)g.catch(()=>{});const w=[];for(let g=0;g<b.length;g+=1)if(b[g])try{w.push(await y[g])}catch(S){const N=S;if(N instanceof Ue)return{type:"redirect",location:N.location};const D=S instanceof ne?S.status:500;for(;g--;)if(p[g]){let Y,C=g;for(;!w[C];)C-=1;try{return Y={node:await p[g](),data:{},uses:{params:new Set,url:!1,session:!1,dependencies:new Set,parent:!1}},await ee({url:d,params:m,branch:w.slice(0,C+1).concat(Y),status:D,error:N,routeId:l.id})}catch{continue}}return await te({status:D,error:N,url:d,routeId:l.id})}else w.push(void 0);return await ee({url:d,params:m,branch:w,status:200,error:null,routeId:l.id})}async function te({status:s,error:d,url:m,routeId:l}){const p={},$=await le({node:await kt,url:m,params:p,routeId:l,parent:()=>Promise.resolve({}),server_data:null}),_={node:await $t,data:null,uses:{params:new Set,url:!1,session:!1,dependencies:new Set,parent:!1}};return await ee({url:m,params:p,branch:[$,_],status:s,error:d,routeId:l})}function Le(s){if(s.origin!==location.origin||!s.pathname.startsWith(n))return;const d=decodeURI(s.pathname.slice(n.length)||"/");for(const m of he){const l=m.exec(d);if(l){const p=new URL(s.origin+xe(s.pathname,i)+s.search+s.hash);return{id:p.pathname+p.search,route:m,params:et(l),url:p}}}}async function fe({url:s,scroll:d,keepfocus:m,redirect_chain:l,details:p,accepted:$,blocked:_}){const R=c.url;let b=!1;const L={from:R,to:s,cancel:()=>b=!0};if(o.before_navigate.forEach(k=>k(L)),b){_();return}me(j),$(),u&&f.navigating.set({from:c.url,to:s}),await ce(s,l,{scroll:d,keepfocus:m,details:p},()=>{const k={from:R,to:s};o.after_navigate.forEach(I=>I(k)),f.navigating.set(null)})}function M(s){return location.href=s.href,new Promise(()=>{})}return{after_navigate:s=>{ge(()=>(o.after_navigate.push(s),()=>{const d=o.after_navigate.indexOf(s);o.after_navigate.splice(d,1)}))},before_navigate:s=>{ge(()=>(o.before_navigate.push(s),()=>{const d=o.before_navigate.indexOf(s);o.before_navigate.splice(d,1)}))},disable_scroll_handling:()=>{(E||!u)&&(h=!1)},goto:(s,d={})=>ke(s,d,[]),invalidate:s=>{if(s===void 0){for(const d of c.branch)d?.uses.dependencies.add("");r.push(()=>!0)}else if(typeof s=="function")r.push(s);else{const{href:d}=new URL(s,location.href);r.push(m=>m===d)}return v||(v=Promise.resolve().then(async()=>{await ce(new URL(location.href),[]),v=null})),v},prefetch:async s=>{const d=new URL(s,Oe(document));await $e(d)},prefetch_routes:async s=>{const m=(s?he.filter(l=>s.some(p=>l.exec(p))):he).map(l=>Promise.all([...l.layouts,l.leaf].map(p=>p?.())));await Promise.all(m)},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",l=>{let p=!1;const $={from:c.url,to:null,cancel:()=>p=!0};o.before_navigate.forEach(_=>_($)),p?(l.preventDefault(),l.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){me(j);try{sessionStorage[Ce]=JSON.stringify(X)}catch{}}});const s=l=>{const p=Pe(l);p&&p.href&&p.hasAttribute("sveltekit:prefetch")&&$e(Ie(p))};let d;const m=l=>{clearTimeout(d),d=setTimeout(()=>{l.target?.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",s),addEventListener("mousemove",m),addEventListener("sveltekit:trigger_prefetch",s),addEventListener("click",l=>{if(!F||l.button||l.which!==1||l.metaKey||l.ctrlKey||l.shiftKey||l.altKey||l.defaultPrevented)return;const p=Pe(l);if(!p||!p.href)return;const $=p instanceof SVGAElement,_=Ie(p);if(!$&&!(_.protocol==="https:"||_.protocol==="http:"))return;const R=(p.getAttribute("rel")||"").split(/\s+/);if(p.hasAttribute("download")||R.includes("external")||p.hasAttribute("sveltekit:reload")||($?p.target.baseVal:p.target))return;const[b,L]=_.href.split("#");if(L!==void 0&&b===location.href.split("#")[0]){ie=!0,me(j),f.page.set({...oe,url:_}),f.page.notify();return}fe({url:_,scroll:p.hasAttribute("sveltekit:noscroll")?we():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:_.href===location.href},accepted:()=>l.preventDefault(),blocked:()=>l.preventDefault()})}),addEventListener("popstate",l=>{if(l.state&&F){if(l.state[J]===j)return;fe({url:new URL(location.href),scroll:X[l.state[J]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{j=l.state[J]},blocked:()=>{const p=j-l.state[J];history.go(p)}})}}),addEventListener("hashchange",()=>{ie&&(ie=!1,history.replaceState({...history.state,[J]:++j},"",location.href))});for(const l of document.querySelectorAll("link"))l.rel==="icon"&&(l.href=l.href);addEventListener("pageshow",l=>{l.persisted&&f.navigating.set(null)})},_hydrate:async({status:s,error:d,node_ids:m,params:l,routeId:p})=>{const $=new URL(location.href);let _;try{const R=(I,y)=>{const w=document.querySelector(`script[sveltekit\\:data-type="${I}"]`);return w?.textContent?JSON.parse(w.textContent):y},b=R("server_data",[]),L=R("validation_errors",void 0),k=m.map(async(I,y)=>le({node:await re[I](),url:$,params:l,routeId:p,parent:async()=>{const w={};for(let g=0;g<y;g+=1)Object.assign(w,(await k[g]).data);return w},server_data:b[y]??null}));_=await ee({url:$,params:l,branch:await Promise.all(k),status:s,error:d?.__is_http_error?new ne(d.status,d.message):d,validation_errors:L,routeId:p})}catch(R){const b=R;if(b instanceof Ue){await M(new URL(R.location,location.href));return}_=await te({status:b instanceof ne?b.status:500,error:b,url:$,routeId:p})}Ee(_)}}}function Rt(a){a.client}function Ot(a){}async function Pt({paths:a,target:e,session:n,route:i,spa:r,trailing_slash:f,hydrate:t}){const o=Et({target:e,session:n,base:a.base,trailing_slash:f});Rt({client:o}),nt(a),t&&await o._hydrate(t),i&&(r&&o.goto(location.href,{replaceState:!0}),o._start_router()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{Ot as set_public_env,Pt as start};