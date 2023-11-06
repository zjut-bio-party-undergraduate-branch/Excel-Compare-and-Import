import{D as de,G as Nr,T as Ot,N as On,r as ke,$ as Se,j as J}from"./index.b882922b.js";var Tn=ke((e,t)=>{t.exports=function(n){return n!=null&&n.constructor!=null&&typeof n.constructor.isBuffer=="function"&&n.constructor.isBuffer(n)}}),Br=ke((e,t)=>{var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,i=Object.defineProperty,l=Object.getOwnPropertyDescriptor,o=function(c){return typeof Array.isArray=="function"?Array.isArray(c):r.call(c)==="[object Array]"},a=function(c){if(!c||r.call(c)!=="[object Object]")return!1;var u=n.call(c,"constructor"),h=c.constructor&&c.constructor.prototype&&n.call(c.constructor.prototype,"isPrototypeOf");if(c.constructor&&!u&&!h)return!1;var p;for(p in c);return typeof p>"u"||n.call(c,p)},s=function(c,u){i&&u.name==="__proto__"?i(c,u.name,{enumerable:!0,configurable:!0,value:u.newValue,writable:!0}):c[u.name]=u.newValue},f=function(c,u){if(u==="__proto__")if(n.call(c,u)){if(l)return l(c,u).value}else return;return c[u]};t.exports=function c(){var u,h,p,y,k,b,d=arguments[0],E=1,S=arguments.length,O=!1;for(typeof d=="boolean"&&(O=d,d=arguments[1]||{},E=2),(d==null||typeof d!="object"&&typeof d!="function")&&(d={});E<S;++E)if(u=arguments[E],u!=null)for(h in u)p=f(d,h),y=f(u,h),d!==y&&(O&&y&&(a(y)||(k=o(y)))?(k?(k=!1,b=p&&o(p)?p:[]):b=p&&a(p)?p:{},s(d,{name:h,newValue:c(O,b,y)})):typeof y<"u"&&s(d,{name:h,newValue:y}));return d}}),Hr=ke((e,t)=>{var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";t.exports=n}),Ur=ke((e,t)=>{var n=Hr();function r(){}function i(){}i.resetWarningCache=r,t.exports=function(){function l(s,f,c,u,h,p){if(p!==n){var y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw y.name="Invariant Violation",y}}l.isRequired=l;function o(){return l}var a={array:l,bigint:l,bool:l,func:l,number:l,object:l,string:l,symbol:l,any:l,arrayOf:o,element:l,elementType:l,instanceOf:o,node:l,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:i,resetWarningCache:r};return a.PropTypes=a,a}}),$r=ke((e,t)=>{t.exports=Ur()()}),qr=ke(e=>{var t=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),o=Symbol.for("react.provider"),a=Symbol.for("react.context"),s=Symbol.for("react.server_context"),f=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen"),k;k=Symbol.for("react.module.reference");function b(d){if(typeof d=="object"&&d!==null){var E=d.$$typeof;switch(E){case t:switch(d=d.type,d){case r:case l:case i:case c:case u:return d;default:switch(d=d&&d.$$typeof,d){case s:case a:case f:case p:case h:case o:return d;default:return E}}case n:return E}}}e.ContextConsumer=a,e.ContextProvider=o,e.Element=t,e.ForwardRef=f,e.Fragment=r,e.Lazy=p,e.Memo=h,e.Portal=n,e.Profiler=l,e.StrictMode=i,e.Suspense=c,e.SuspenseList=u,e.isAsyncMode=function(){return!1},e.isConcurrentMode=function(){return!1},e.isContextConsumer=function(d){return b(d)===a},e.isContextProvider=function(d){return b(d)===o},e.isElement=function(d){return typeof d=="object"&&d!==null&&d.$$typeof===t},e.isForwardRef=function(d){return b(d)===f},e.isFragment=function(d){return b(d)===r},e.isLazy=function(d){return b(d)===p},e.isMemo=function(d){return b(d)===h},e.isPortal=function(d){return b(d)===n},e.isProfiler=function(d){return b(d)===l},e.isStrictMode=function(d){return b(d)===i},e.isSuspense=function(d){return b(d)===c},e.isSuspenseList=function(d){return b(d)===u},e.isValidElementType=function(d){return typeof d=="string"||typeof d=="function"||d===r||d===l||d===i||d===c||d===u||d===y||typeof d=="object"&&d!==null&&(d.$$typeof===p||d.$$typeof===h||d.$$typeof===o||d.$$typeof===a||d.$$typeof===f||d.$$typeof===k||d.getModuleId!==void 0)},e.typeOf=b}),Vr=ke((e,t)=>{t.exports=qr()}),Wr=ke((e,t)=>{var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,i=/^\s*/,l=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,s=/^[;\s]*/,f=/^\s+|\s+$/g,c=`
`,u="/",h="*",p="",y="comment",k="declaration";t.exports=function(d,E){if(typeof d!="string")throw new TypeError("First argument must be a string");if(!d)return[];E=E||{};var S=1,O=1;function I(z){var L=z.match(r);L&&(S+=L.length);var $=z.lastIndexOf(c);O=~$?z.length-$:O+z.length}function x(){var z={line:S,column:O};return function(L){return L.position=new A(z),v(),L}}function A(z){this.start=z,this.end={line:S,column:O},this.source=E.source}A.prototype.content=d;function j(z){var L=new Error(E.source+":"+S+":"+O+": "+z);if(L.reason=z,L.filename=E.source,L.line=S,L.column=O,L.source=d,!E.silent)throw L}function N(z){var L=z.exec(d);if(L){var $=L[0];return I($),d=d.slice($.length),L}}function v(){N(i)}function D(z){var L;for(z=z||[];L=T();)L!==!1&&z.push(L);return z}function T(){var z=x();if(!(u!=d.charAt(0)||h!=d.charAt(1))){for(var L=2;p!=d.charAt(L)&&(h!=d.charAt(L)||u!=d.charAt(L+1));)++L;if(L+=2,p===d.charAt(L-1))return j("End of comment missing");var $=d.slice(2,L-2);return O+=2,I($),d=d.slice(L),O+=2,z({type:y,comment:$})}}function U(){var z=x(),L=N(l);if(L){if(T(),!N(o))return j("property missing ':'");var $=N(a),ne=z({type:k,property:b(L[0].replace(n,p)),value:$?b($[0].replace(n,p)):p});return N(s),ne}}function W(){var z=[];D(z);for(var L;L=U();)L!==!1&&(z.push(L),D(z));return z}return v(),W()};function b(d){return d?d.replace(f,p):p}}),Qr=ke((e,t)=>{var n=Wr();function r(i,l){var o=null;if(!i||typeof i!="string")return o;for(var a,s=n(i),f=typeof l=="function",c,u,h=0,p=s.length;h<p;h++)a=s[h],c=a.property,u=a.value,f?l(c,u,a):u&&(o||(o={}),o[c]=u);return o}t.exports=r,t.exports.default=r}),Yr=de(Nr(),1),Vt=["http","https","mailto","tel"];function Kr(e){let t=(e||"").trim(),n=t.charAt(0);if(n==="#"||n==="/")return t;let r=t.indexOf(":");if(r===-1)return t;let i=-1;for(;++i<Vt.length;){let l=Vt[i];if(r===l.length&&t.slice(0,l.length).toLowerCase()===l)return t}return i=t.indexOf("?"),i!==-1&&r>i||(i=t.indexOf("#"),i!==-1&&r>i)?t:"javascript:void(0)"}var it=de(Ot(),1),Xr=de(Tn(),1);function Be(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Wt(e.position):"start"in e||"end"in e?Wt(e):"line"in e||"column"in e?vt(e):""}function vt(e){return Qt(e&&e.line)+":"+Qt(e&&e.column)}function Wt(e){return vt(e&&e.start)+"-"+vt(e&&e.end)}function Qt(e){return e&&typeof e=="number"?e:1}var oe=class extends Error{constructor(e,t,n){let r=[null,null],i={start:{line:null,column:null},end:{line:null,column:null}};if(super(),typeof t=="string"&&(n=t,t=void 0),typeof n=="string"){let l=n.indexOf(":");l===-1?r[1]=n:(r[0]=n.slice(0,l),r[1]=n.slice(l+1))}t&&("type"in t||"position"in t?t.position&&(i=t.position):"start"in t||"end"in t?i=t:("line"in t||"column"in t)&&(i.start=t)),this.name=Be(t)||"1:1",this.message=typeof e=="object"?e.message:e,this.stack="",typeof e=="object"&&e.stack&&(this.stack=e.stack),this.reason=this.message,this.fatal,this.line=i.start.line,this.column=i.start.column,this.position=i,this.source=r[0],this.ruleId=r[1],this.file,this.actual,this.expected,this.url,this.note}};oe.prototype.file="";oe.prototype.name="";oe.prototype.reason="";oe.prototype.message="";oe.prototype.stack="";oe.prototype.fatal=null;oe.prototype.column=null;oe.prototype.line=null;oe.prototype.source=null;oe.prototype.ruleId=null;oe.prototype.position=null;var pe={basename:Jr,dirname:Gr,extname:Zr,join:el,sep:"/"};function Jr(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Ue(e);let n=0,r=-1,i=e.length,l;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.charCodeAt(i)===47){if(l){n=i+1;break}}else r<0&&(l=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let o=-1,a=t.length-1;for(;i--;)if(e.charCodeAt(i)===47){if(l){n=i+1;break}}else o<0&&(l=!0,o=i+1),a>-1&&(e.charCodeAt(i)===t.charCodeAt(a--)?a<0&&(r=i):(a=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function Gr(e){if(Ue(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.charCodeAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.charCodeAt(0)===47?"/":".":t===1&&e.charCodeAt(0)===47?"//":e.slice(0,t)}function Zr(e){Ue(e);let t=e.length,n=-1,r=0,i=-1,l=0,o;for(;t--;){let a=e.charCodeAt(t);if(a===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),a===46?i<0?i=t:l!==1&&(l=1):i>-1&&(l=-1)}return i<0||n<0||l===0||l===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function el(...e){let t=-1,n;for(;++t<e.length;)Ue(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":tl(n)}function tl(e){Ue(e);let t=e.charCodeAt(0)===47,n=nl(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.charCodeAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function nl(e,t){let n="",r=0,i=-1,l=0,o=-1,a,s;for(;++o<=e.length;){if(o<e.length)a=e.charCodeAt(o);else{if(a===47)break;a=47}if(a===47){if(!(i===o-1||l===1))if(i!==o-1&&l===2){if(n.length<2||r!==2||n.charCodeAt(n.length-1)!==46||n.charCodeAt(n.length-2)!==46){if(n.length>2){if(s=n.lastIndexOf("/"),s!==n.length-1){s<0?(n="",r=0):(n=n.slice(0,s),r=n.length-1-n.lastIndexOf("/")),i=o,l=0;continue}}else if(n.length>0){n="",r=0,i=o,l=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1;i=o,l=0}else a===46&&l>-1?l++:l=-1}return n}function Ue(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}var rl={cwd:ll};function ll(){return"/"}function wt(e){return e!==null&&typeof e=="object"&&e.href&&e.origin}function il(e){if(typeof e=="string")e=new URL(e);else if(!wt(e)){let t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){let t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return ol(e)}function ol(e){if(e.hostname!==""){let r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}let t=e.pathname,n=-1;for(;++n<t.length;)if(t.charCodeAt(n)===37&&t.charCodeAt(n+1)===50){let r=t.charCodeAt(n+2);if(r===70||r===102){let i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}var ot=["history","path","basename","stem","extname","dirname"],zn=class{constructor(e){let t;e?typeof e=="string"||al(e)?t={value:e}:wt(e)?t={path:e}:t=e:t={},this.data={},this.messages=[],this.history=[],this.cwd=rl.cwd(),this.value,this.stored,this.result,this.map;let n=-1;for(;++n<ot.length;){let i=ot[n];i in t&&t[i]!==void 0&&t[i]!==null&&(this[i]=i==="history"?[...t[i]]:t[i])}let r;for(r in t)ot.includes(r)||(this[r]=t[r])}get path(){return this.history[this.history.length-1]}set path(e){wt(e)&&(e=il(e)),ut(e,"path"),this.path!==e&&this.history.push(e)}get dirname(){return typeof this.path=="string"?pe.dirname(this.path):void 0}set dirname(e){Yt(this.basename,"dirname"),this.path=pe.join(e||"",this.basename)}get basename(){return typeof this.path=="string"?pe.basename(this.path):void 0}set basename(e){ut(e,"basename"),at(e,"basename"),this.path=pe.join(this.dirname||"",e)}get extname(){return typeof this.path=="string"?pe.extname(this.path):void 0}set extname(e){if(at(e,"extname"),Yt(this.dirname,"extname"),e){if(e.charCodeAt(0)!==46)throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=pe.join(this.dirname,this.stem+(e||""))}get stem(){return typeof this.path=="string"?pe.basename(this.path,this.extname):void 0}set stem(e){ut(e,"stem"),at(e,"stem"),this.path=pe.join(this.dirname||"",e+(this.extname||""))}toString(e){return(this.value||"").toString(e||void 0)}message(e,t,n){let r=new oe(e,t,n);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=null,r}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}};function at(e,t){if(e&&e.includes(pe.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+pe.sep+"`")}function ut(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function Yt(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function al(e){return(0,Xr.default)(e)}function Kt(e){if(e)throw e}var ul=de(Tn(),1),Xt=de(Br(),1);function St(e){if(typeof e!="object"||e===null)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function sl(){let e=[],t={run:n,use:r};return t;function n(...i){let l=-1,o=i.pop();if(typeof o!="function")throw new TypeError("Expected function as last argument, not "+o);a(null,...i);function a(s,...f){let c=e[++l],u=-1;if(s){o(s);return}for(;++u<i.length;)(f[u]===null||f[u]===void 0)&&(f[u]=i[u]);i=f,c?cl(c,a)(...f):o(null,...f)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function cl(e,t){let n;return r;function r(...o){let a=e.length>o.length,s;a&&o.push(i);try{s=e.apply(this,o)}catch(f){let c=f;if(a&&n)throw c;return i(c)}a||(s instanceof Promise?s.then(l,i):s instanceof Error?i(s):l(s))}function i(o,...a){n||(n=!0,t(o,...a))}function l(o){i(null,o)}}var fl=Pn().freeze(),Ln={}.hasOwnProperty;function Pn(){let e=sl(),t=[],n={},r,i=-1;return l.data=o,l.Parser=void 0,l.Compiler=void 0,l.freeze=a,l.attachers=t,l.use=s,l.parse=f,l.stringify=c,l.run=u,l.runSync=h,l.process=p,l.processSync=y,l;function l(){let k=Pn(),b=-1;for(;++b<t.length;)k.use(...t[b]);return k.data((0,Xt.default)(!0,{},n)),k}function o(k,b){return typeof k=="string"?arguments.length===2?(ft("data",r),n[k]=b,l):Ln.call(n,k)&&n[k]||null:k?(ft("data",r),n=k,l):n}function a(){if(r)return l;for(;++i<t.length;){let[k,...b]=t[i];if(b[0]===!1)continue;b[0]===!0&&(b[0]=void 0);let d=k.call(l,...b);typeof d=="function"&&e.use(d)}return r=!0,i=Number.POSITIVE_INFINITY,l}function s(k,...b){let d;if(ft("use",r),k!=null)if(typeof k=="function")I(k,...b);else if(typeof k=="object")Array.isArray(k)?O(k):S(k);else throw new TypeError("Expected usable value, not `"+k+"`");return d&&(n.settings=Object.assign(n.settings||{},d)),l;function E(x){if(typeof x=="function")I(x);else if(typeof x=="object")if(Array.isArray(x)){let[A,...j]=x;I(A,...j)}else S(x);else throw new TypeError("Expected usable value, not `"+x+"`")}function S(x){O(x.plugins),x.settings&&(d=Object.assign(d||{},x.settings))}function O(x){let A=-1;if(x!=null)if(Array.isArray(x))for(;++A<x.length;){let j=x[A];E(j)}else throw new TypeError("Expected a list of plugins, not `"+x+"`")}function I(x,A){let j=-1,N;for(;++j<t.length;)if(t[j][0]===x){N=t[j];break}N?(St(N[1])&&St(A)&&(A=(0,Xt.default)(!0,N[1],A)),N[1]=A):t.push([...arguments])}}function f(k){l.freeze();let b=Ne(k),d=l.Parser;return st("parse",d),Jt(d,"parse")?new d(String(b),b).parse():d(String(b),b)}function c(k,b){l.freeze();let d=Ne(b),E=l.Compiler;return ct("stringify",E),Gt(k),Jt(E,"compile")?new E(k,d).compile():E(k,d)}function u(k,b,d){if(Gt(k),l.freeze(),!d&&typeof b=="function"&&(d=b,b=void 0),!d)return new Promise(E);E(null,d);function E(S,O){e.run(k,Ne(b),I);function I(x,A,j){A=A||k,x?O(x):S?S(A):d(null,A,j)}}}function h(k,b){let d,E;return l.run(k,b,S),Zt("runSync","run",E),d;function S(O,I){Kt(O),d=I,E=!0}}function p(k,b){if(l.freeze(),st("process",l.Parser),ct("process",l.Compiler),!b)return new Promise(d);d(null,b);function d(E,S){let O=Ne(k);l.run(l.parse(O),O,(x,A,j)=>{if(x||!A||!j)I(x);else{let N=l.stringify(A,j);N==null||(hl(N)?j.value=N:j.result=N),I(x,j)}});function I(x,A){x||!A?S(x):E?E(A):b(null,A)}}}function y(k){let b;l.freeze(),st("processSync",l.Parser),ct("processSync",l.Compiler);let d=Ne(k);return l.process(d,E),Zt("processSync","process",b),d;function E(S){b=!0,Kt(S)}}}function Jt(e,t){return typeof e=="function"&&e.prototype&&(pl(e.prototype)||t in e.prototype)}function pl(e){let t;for(t in e)if(Ln.call(e,t))return!0;return!1}function st(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `Parser`")}function ct(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `Compiler`")}function ft(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function Gt(e){if(!St(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function Zt(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function Ne(e){return dl(e)?e:new zn(e)}function dl(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function hl(e){return typeof e=="string"||(0,ul.default)(e)}var gl={};function ml(e,t){let n=t||gl,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return In(e,r,i)}function In(e,t,n){if(yl(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return en(e.children,t,n)}return Array.isArray(e)?en(e,t,n):""}function en(e,t,n){let r=[],i=-1;for(;++i<e.length;)r[i]=In(e[i],t,n);return r.join("")}function yl(e){return!!(e&&typeof e=="object")}function le(e,t,n,r){let i=e.length,l=0,o;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);l<r.length;)o=r.slice(l,l+1e4),o.unshift(t,0),e.splice(...o),l+=1e4,t+=1e4}function ie(e,t){return e.length>0?(le(e,e.length,0,t),e):t}var tn={}.hasOwnProperty;function Mn(e){let t={},n=-1;for(;++n<e.length;)xl(t,e[n]);return t}function xl(e,t){let n;for(n in t){let r=(tn.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n],l;if(i)for(l in i){tn.call(r,l)||(r[l]=[]);let o=i[l];kl(r[l],Array.isArray(o)?o:o?[o]:[])}}}function kl(e,t){let n=-1,r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);le(e,0,0,r)}var bl=/[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,ee=Ce(/[A-Za-z]/),Z=Ce(/[\dA-Za-z]/),vl=Ce(/[#-'*+\--9=?A-Z^-~]/);function Ke(e){return e!==null&&(e<32||e===127)}var Ct=Ce(/\d/),wl=Ce(/[\dA-Fa-f]/),Sl=Ce(/[!-/:-@[-`{-~]/);function P(e){return e!==null&&e<-2}function V(e){return e!==null&&(e<0||e===32)}function B(e){return e===-2||e===-1||e===32}var Ze=Ce(bl),Ae=Ce(/\s/);function Ce(e){return t;function t(n){return n!==null&&e.test(String.fromCharCode(n))}}function H(e,t,n,r){let i=r?r-1:Number.POSITIVE_INFINITY,l=0;return o;function o(s){return B(s)?(e.enter(n),a(s)):t(s)}function a(s){return B(s)&&l++<i?(e.consume(s),a):(e.exit(n),t(s))}}var Cl={tokenize:El};function El(e){let t=e.attempt(this.parser.constructs.contentInitial,r,i),n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),H(e,t,"linePrefix")}function i(a){return e.enter("paragraph"),l(a)}function l(a){let s=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=s),n=s,o(a)}function o(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return P(a)?(e.consume(a),e.exit("chunkText"),l):(e.consume(a),o)}}var Fl={tokenize:Al},nn={tokenize:Dl};function Al(e){let t=this,n=[],r=0,i,l,o;return a;function a(S){if(r<n.length){let O=n[r];return t.containerState=O[1],e.attempt(O[0].continuation,s,f)(S)}return f(S)}function s(S){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&E();let O=t.events.length,I=O,x;for(;I--;)if(t.events[I][0]==="exit"&&t.events[I][1].type==="chunkFlow"){x=t.events[I][1].end;break}d(r);let A=O;for(;A<t.events.length;)t.events[A][1].end=Object.assign({},x),A++;return le(t.events,I+1,0,t.events.slice(O)),t.events.length=A,f(S)}return a(S)}function f(S){if(r===n.length){if(!i)return h(S);if(i.currentConstruct&&i.currentConstruct.concrete)return y(S);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(nn,c,u)(S)}function c(S){return i&&E(),d(r),h(S)}function u(S){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,y(S)}function h(S){return t.containerState={},e.attempt(nn,p,y)(S)}function p(S){return r++,n.push([t.currentConstruct,t.containerState]),h(S)}function y(S){if(S===null){i&&E(),d(0),e.consume(S);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{contentType:"flow",previous:l,_tokenizer:i}),k(S)}function k(S){if(S===null){b(e.exit("chunkFlow"),!0),d(0),e.consume(S);return}return P(S)?(e.consume(S),b(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(S),k)}function b(S,O){let I=t.sliceStream(S);if(O&&I.push(null),S.previous=l,l&&(l.next=S),l=S,i.defineSkip(S.start),i.write(I),t.parser.lazy[S.start.line]){let x=i.events.length;for(;x--;)if(i.events[x][1].start.offset<o&&(!i.events[x][1].end||i.events[x][1].end.offset>o))return;let A=t.events.length,j=A,N,v;for(;j--;)if(t.events[j][0]==="exit"&&t.events[j][1].type==="chunkFlow"){if(N){v=t.events[j][1].end;break}N=!0}for(d(r),x=A;x<t.events.length;)t.events[x][1].end=Object.assign({},v),x++;le(t.events,j+1,0,t.events.slice(A)),t.events.length=x}}function d(S){let O=n.length;for(;O-- >S;){let I=n[O];t.containerState=I[1],I[0].exit.call(t,e)}n.length=S}function E(){i.write([null]),l=void 0,i=void 0,t.containerState._closeFlow=void 0}}function Dl(e,t,n){return H(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Xe(e){if(e===null||V(e)||Ae(e))return 1;if(Ze(e))return 2}function et(e,t,n){let r=[],i=-1;for(;++i<e.length;){let l=e[i].resolveAll;l&&!r.includes(l)&&(t=l(t,n),r.push(l))}return t}var Et={name:"attention",tokenize:Tl,resolveAll:Ol};function Ol(e,t){let n=-1,r,i,l,o,a,s,f,c;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;s=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;let u=Object.assign({},e[r][1].end),h=Object.assign({},e[n][1].start);rn(u,-s),rn(h,s),o={type:s>1?"strongSequence":"emphasisSequence",start:u,end:Object.assign({},e[r][1].end)},a={type:s>1?"strongSequence":"emphasisSequence",start:Object.assign({},e[n][1].start),end:h},l={type:s>1?"strongText":"emphasisText",start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},i={type:s>1?"strong":"emphasis",start:Object.assign({},o.start),end:Object.assign({},a.end)},e[r][1].end=Object.assign({},o.start),e[n][1].start=Object.assign({},a.end),f=[],e[r][1].end.offset-e[r][1].start.offset&&(f=ie(f,[["enter",e[r][1],t],["exit",e[r][1],t]])),f=ie(f,[["enter",i,t],["enter",o,t],["exit",o,t],["enter",l,t]]),f=ie(f,et(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),f=ie(f,[["exit",l,t],["enter",a,t],["exit",a,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(c=2,f=ie(f,[["enter",e[n][1],t],["exit",e[n][1],t]])):c=0,le(e,r-1,n-r+3,f),n=r+f.length-c-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function Tl(e,t){let n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=Xe(r),l;return o;function o(s){return l=s,e.enter("attentionSequence"),a(s)}function a(s){if(s===l)return e.consume(s),a;let f=e.exit("attentionSequence"),c=Xe(s),u=!c||c===2&&i||n.includes(s),h=!i||i===2&&c||n.includes(r);return f._open=!!(l===42?u:u&&(i||!h)),f._close=!!(l===42?h:h&&(c||!u)),t(s)}}function rn(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}var zl={name:"autolink",tokenize:Ll};function Ll(e,t,n){let r=0;return i;function i(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),l}function l(p){return ee(p)?(e.consume(p),o):f(p)}function o(p){return p===43||p===45||p===46||Z(p)?(r=1,a(p)):f(p)}function a(p){return p===58?(e.consume(p),r=0,s):(p===43||p===45||p===46||Z(p))&&r++<32?(e.consume(p),a):(r=0,f(p))}function s(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||Ke(p)?n(p):(e.consume(p),s)}function f(p){return p===64?(e.consume(p),c):vl(p)?(e.consume(p),f):n(p)}function c(p){return Z(p)?u(p):n(p)}function u(p){return p===46?(e.consume(p),r=0,c):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):h(p)}function h(p){if((p===45||Z(p))&&r++<63){let y=p===45?h:u;return e.consume(p),y}return n(p)}}var $e={tokenize:Pl,partial:!0};function Pl(e,t,n){return r;function r(l){return B(l)?H(e,i,"linePrefix")(l):i(l)}function i(l){return l===null||P(l)?t(l):n(l)}}var jn={name:"blockQuote",tokenize:Il,continuation:{tokenize:Ml},exit:jl};function Il(e,t,n){let r=this;return i;function i(o){if(o===62){let a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(o),e.exit("blockQuoteMarker"),l}return n(o)}function l(o){return B(o)?(e.enter("blockQuotePrefixWhitespace"),e.consume(o),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(o))}}function Ml(e,t,n){let r=this;return i;function i(o){return B(o)?H(e,l,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):l(o)}function l(o){return e.attempt(jn,t,n)(o)}}function jl(e){e.exit("blockQuote")}var Rn={name:"characterEscape",tokenize:Rl};function Rl(e,t,n){return r;function r(l){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(l),e.exit("escapeMarker"),i}function i(l){return Sl(l)?(e.enter("characterEscapeValue"),e.consume(l),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(l)}}var ln=document.createElement("i");function Tt(e){let t="&"+e+";";ln.innerHTML=t;let n=ln.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}var _n={name:"characterReference",tokenize:_l};function _l(e,t,n){let r=this,i=0,l,o;return a;function a(u){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(u),e.exit("characterReferenceMarker"),s}function s(u){return u===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(u),e.exit("characterReferenceMarkerNumeric"),f):(e.enter("characterReferenceValue"),l=31,o=Z,c(u))}function f(u){return u===88||u===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(u),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),l=6,o=wl,c):(e.enter("characterReferenceValue"),l=7,o=Ct,c(u))}function c(u){if(u===59&&i){let h=e.exit("characterReferenceValue");return o===Z&&!Tt(r.sliceSerialize(h))?n(u):(e.enter("characterReferenceMarker"),e.consume(u),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return o(u)&&i++<l?(e.consume(u),c):n(u)}}var on={tokenize:Bl,partial:!0},an={name:"codeFenced",tokenize:Nl,concrete:!0};function Nl(e,t,n){let r=this,i={tokenize:I,partial:!0},l=0,o=0,a;return s;function s(x){return f(x)}function f(x){let A=r.events[r.events.length-1];return l=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,a=x,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),c(x)}function c(x){return x===a?(o++,e.consume(x),c):o<3?n(x):(e.exit("codeFencedFenceSequence"),B(x)?H(e,u,"whitespace")(x):u(x))}function u(x){return x===null||P(x)?(e.exit("codeFencedFence"),r.interrupt?t(x):e.check(on,k,O)(x)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),h(x))}function h(x){return x===null||P(x)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),u(x)):B(x)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),H(e,p,"whitespace")(x)):x===96&&x===a?n(x):(e.consume(x),h)}function p(x){return x===null||P(x)?u(x):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),y(x))}function y(x){return x===null||P(x)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),u(x)):x===96&&x===a?n(x):(e.consume(x),y)}function k(x){return e.attempt(i,O,b)(x)}function b(x){return e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),d}function d(x){return l>0&&B(x)?H(e,E,"linePrefix",l+1)(x):E(x)}function E(x){return x===null||P(x)?e.check(on,k,O)(x):(e.enter("codeFlowValue"),S(x))}function S(x){return x===null||P(x)?(e.exit("codeFlowValue"),E(x)):(e.consume(x),S)}function O(x){return e.exit("codeFenced"),t(x)}function I(x,A,j){let N=0;return v;function v(z){return x.enter("lineEnding"),x.consume(z),x.exit("lineEnding"),D}function D(z){return x.enter("codeFencedFence"),B(z)?H(x,T,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(z):T(z)}function T(z){return z===a?(x.enter("codeFencedFenceSequence"),U(z)):j(z)}function U(z){return z===a?(N++,x.consume(z),U):N>=o?(x.exit("codeFencedFenceSequence"),B(z)?H(x,W,"whitespace")(z):W(z)):j(z)}function W(z){return z===null||P(z)?(x.exit("codeFencedFence"),A(z)):j(z)}}}function Bl(e,t,n){let r=this;return i;function i(o){return o===null?n(o):(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),l)}function l(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}var pt={name:"codeIndented",tokenize:Ul},Hl={tokenize:$l,partial:!0};function Ul(e,t,n){let r=this;return i;function i(f){return e.enter("codeIndented"),H(e,l,"linePrefix",4+1)(f)}function l(f){let c=r.events[r.events.length-1];return c&&c[1].type==="linePrefix"&&c[2].sliceSerialize(c[1],!0).length>=4?o(f):n(f)}function o(f){return f===null?s(f):P(f)?e.attempt(Hl,o,s)(f):(e.enter("codeFlowValue"),a(f))}function a(f){return f===null||P(f)?(e.exit("codeFlowValue"),o(f)):(e.consume(f),a)}function s(f){return e.exit("codeIndented"),t(f)}}function $l(e,t,n){let r=this;return i;function i(o){return r.parser.lazy[r.now().line]?n(o):P(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),i):H(e,l,"linePrefix",4+1)(o)}function l(o){let a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):P(o)?i(o):n(o)}}var ql={name:"codeText",tokenize:Ql,resolve:Vl,previous:Wl};function Vl(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function Wl(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Ql(e,t,n){let r=0,i,l;return o;function o(u){return e.enter("codeText"),e.enter("codeTextSequence"),a(u)}function a(u){return u===96?(e.consume(u),r++,a):(e.exit("codeTextSequence"),s(u))}function s(u){return u===null?n(u):u===32?(e.enter("space"),e.consume(u),e.exit("space"),s):u===96?(l=e.enter("codeTextSequence"),i=0,c(u)):P(u)?(e.enter("lineEnding"),e.consume(u),e.exit("lineEnding"),s):(e.enter("codeTextData"),f(u))}function f(u){return u===null||u===32||u===96||P(u)?(e.exit("codeTextData"),s(u)):(e.consume(u),f)}function c(u){return u===96?(e.consume(u),i++,c):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(u)):(l.type="codeTextData",f(u))}}function Nn(e){let t={},n=-1,r,i,l,o,a,s,f;for(;++n<e.length;){for(;n in t;)n=t[n];if(r=e[n],n&&r[1].type==="chunkFlow"&&e[n-1][1].type==="listItemPrefix"&&(s=r[1]._tokenizer.events,l=0,l<s.length&&s[l][1].type==="lineEndingBlank"&&(l+=2),l<s.length&&s[l][1].type==="content"))for(;++l<s.length&&s[l][1].type!=="content";)s[l][1].type==="chunkText"&&(s[l][1]._isInFirstContentOfListItem=!0,l++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,Yl(e,n)),n=t[n],f=!0);else if(r[1]._container){for(l=n,i=void 0;l--&&(o=e[l],o[1].type==="lineEnding"||o[1].type==="lineEndingBlank");)o[0]==="enter"&&(i&&(e[i][1].type="lineEndingBlank"),o[1].type="lineEnding",i=l);i&&(r[1].end=Object.assign({},e[i][1].start),a=e.slice(i,n),a.unshift(r),le(e,i,n-i+1,a))}}return!f}function Yl(e,t){let n=e[t][1],r=e[t][2],i=t-1,l=[],o=n._tokenizer||r.parser[n.contentType](n.start),a=o.events,s=[],f={},c,u,h=-1,p=n,y=0,k=0,b=[k];for(;p;){for(;e[++i][1]!==p;);l.push(i),p._tokenizer||(c=r.sliceStream(p),p.next||c.push(null),u&&o.defineSkip(p.start),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(c),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),u=p,p=p.next}for(p=n;++h<a.length;)a[h][0]==="exit"&&a[h-1][0]==="enter"&&a[h][1].type===a[h-1][1].type&&a[h][1].start.line!==a[h][1].end.line&&(k=h+1,b.push(k),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(o.events=[],p?(p._tokenizer=void 0,p.previous=void 0):b.pop(),h=b.length;h--;){let d=a.slice(b[h],b[h+1]),E=l.pop();s.unshift([E,E+d.length-1]),le(e,E,2,d)}for(h=-1;++h<s.length;)f[y+s[h][0]]=y+s[h][1],y+=s[h][1]-s[h][0]-1;return f}var Kl={tokenize:Gl,resolve:Jl},Xl={tokenize:Zl,partial:!0};function Jl(e){return Nn(e),e}function Gl(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(a)}function i(a){return a===null?l(a):P(a)?e.check(Xl,o,l)(a):(e.consume(a),i)}function l(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function o(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function Zl(e,t,n){let r=this;return i;function i(o){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),H(e,l,"linePrefix")}function l(o){if(o===null||P(o))return n(o);let a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):e.interrupt(r.parser.constructs.flow,n,t)(o)}}function Bn(e,t,n,r,i,l,o,a,s){let f=s||Number.POSITIVE_INFINITY,c=0;return u;function u(d){return d===60?(e.enter(r),e.enter(i),e.enter(l),e.consume(d),e.exit(l),h):d===null||d===32||d===41||Ke(d)?n(d):(e.enter(r),e.enter(o),e.enter(a),e.enter("chunkString",{contentType:"string"}),k(d))}function h(d){return d===62?(e.enter(l),e.consume(d),e.exit(l),e.exit(i),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(d))}function p(d){return d===62?(e.exit("chunkString"),e.exit(a),h(d)):d===null||d===60||P(d)?n(d):(e.consume(d),d===92?y:p)}function y(d){return d===60||d===62||d===92?(e.consume(d),p):p(d)}function k(d){return!c&&(d===null||d===41||V(d))?(e.exit("chunkString"),e.exit(a),e.exit(o),e.exit(r),t(d)):c<f&&d===40?(e.consume(d),c++,k):d===41?(e.consume(d),c--,k):d===null||d===32||d===40||Ke(d)?n(d):(e.consume(d),d===92?b:k)}function b(d){return d===40||d===41||d===92?(e.consume(d),k):k(d)}}function Hn(e,t,n,r,i,l){let o=this,a=0,s;return f;function f(p){return e.enter(r),e.enter(i),e.consume(p),e.exit(i),e.enter(l),c}function c(p){return a>999||p===null||p===91||p===93&&!s||p===94&&!a&&"_hiddenFootnoteSupport"in o.parser.constructs?n(p):p===93?(e.exit(l),e.enter(i),e.consume(p),e.exit(i),e.exit(r),t):P(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),c):(e.enter("chunkString",{contentType:"string"}),u(p))}function u(p){return p===null||p===91||p===93||P(p)||a++>999?(e.exit("chunkString"),c(p)):(e.consume(p),s||(s=!B(p)),p===92?h:u)}function h(p){return p===91||p===92||p===93?(e.consume(p),a++,u):u(p)}}function Un(e,t,n,r,i,l){let o;return a;function a(h){return h===34||h===39||h===40?(e.enter(r),e.enter(i),e.consume(h),e.exit(i),o=h===40?41:h,s):n(h)}function s(h){return h===o?(e.enter(i),e.consume(h),e.exit(i),e.exit(r),t):(e.enter(l),f(h))}function f(h){return h===o?(e.exit(l),s(o)):h===null?n(h):P(h)?(e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),H(e,f,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),c(h))}function c(h){return h===o||h===null||P(h)?(e.exit("chunkString"),f(h)):(e.consume(h),h===92?u:c)}function u(h){return h===o||h===92?(e.consume(h),c):c(h)}}function He(e,t){let n;return r;function r(i){return P(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):B(i)?H(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}function ce(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}var ei={name:"definition",tokenize:ni},ti={tokenize:ri,partial:!0};function ni(e,t,n){let r=this,i;return l;function l(p){return e.enter("definition"),o(p)}function o(p){return Hn.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return i=ce(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),s):n(p)}function s(p){return V(p)?He(e,f)(p):f(p)}function f(p){return Bn(e,c,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function c(p){return e.attempt(ti,u,u)(p)}function u(p){return B(p)?H(e,h,"whitespace")(p):h(p)}function h(p){return p===null||P(p)?(e.exit("definition"),r.parser.defined.push(i),t(p)):n(p)}}function ri(e,t,n){return r;function r(a){return V(a)?He(e,i)(a):n(a)}function i(a){return Un(e,l,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function l(a){return B(a)?H(e,o,"whitespace")(a):o(a)}function o(a){return a===null||P(a)?t(a):n(a)}}var li={name:"hardBreakEscape",tokenize:ii};function ii(e,t,n){return r;function r(l){return e.enter("hardBreakEscape"),e.consume(l),i}function i(l){return P(l)?(e.exit("hardBreakEscape"),t(l)):n(l)}}var oi={name:"headingAtx",tokenize:ui,resolve:ai};function ai(e,t){let n=e.length-2,r=3,i,l;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},l={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},le(e,r,n-r+1,[["enter",i,t],["enter",l,t],["exit",l,t],["exit",i,t]])),e}function ui(e,t,n){let r=0;return i;function i(c){return e.enter("atxHeading"),l(c)}function l(c){return e.enter("atxHeadingSequence"),o(c)}function o(c){return c===35&&r++<6?(e.consume(c),o):c===null||V(c)?(e.exit("atxHeadingSequence"),a(c)):n(c)}function a(c){return c===35?(e.enter("atxHeadingSequence"),s(c)):c===null||P(c)?(e.exit("atxHeading"),t(c)):B(c)?H(e,a,"whitespace")(c):(e.enter("atxHeadingText"),f(c))}function s(c){return c===35?(e.consume(c),s):(e.exit("atxHeadingSequence"),a(c))}function f(c){return c===null||c===35||V(c)?(e.exit("atxHeadingText"),a(c)):(e.consume(c),f)}}var si=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],un=["pre","script","style","textarea"],ci={name:"htmlFlow",tokenize:hi,resolveTo:di,concrete:!0},fi={tokenize:mi,partial:!0},pi={tokenize:gi,partial:!0};function di(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function hi(e,t,n){let r=this,i,l,o,a,s;return f;function f(m){return c(m)}function c(m){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(m),u}function u(m){return m===33?(e.consume(m),h):m===47?(e.consume(m),l=!0,k):m===63?(e.consume(m),i=3,r.interrupt?t:g):ee(m)?(e.consume(m),o=String.fromCharCode(m),b):n(m)}function h(m){return m===45?(e.consume(m),i=2,p):m===91?(e.consume(m),i=5,a=0,y):ee(m)?(e.consume(m),i=4,r.interrupt?t:g):n(m)}function p(m){return m===45?(e.consume(m),r.interrupt?t:g):n(m)}function y(m){let se="CDATA[";return m===se.charCodeAt(a++)?(e.consume(m),a===se.length?r.interrupt?t:T:y):n(m)}function k(m){return ee(m)?(e.consume(m),o=String.fromCharCode(m),b):n(m)}function b(m){if(m===null||m===47||m===62||V(m)){let se=m===47,Oe=o.toLowerCase();return!se&&!l&&un.includes(Oe)?(i=1,r.interrupt?t(m):T(m)):si.includes(o.toLowerCase())?(i=6,se?(e.consume(m),d):r.interrupt?t(m):T(m)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(m):l?E(m):S(m))}return m===45||Z(m)?(e.consume(m),o+=String.fromCharCode(m),b):n(m)}function d(m){return m===62?(e.consume(m),r.interrupt?t:T):n(m)}function E(m){return B(m)?(e.consume(m),E):v(m)}function S(m){return m===47?(e.consume(m),v):m===58||m===95||ee(m)?(e.consume(m),O):B(m)?(e.consume(m),S):v(m)}function O(m){return m===45||m===46||m===58||m===95||Z(m)?(e.consume(m),O):I(m)}function I(m){return m===61?(e.consume(m),x):B(m)?(e.consume(m),I):S(m)}function x(m){return m===null||m===60||m===61||m===62||m===96?n(m):m===34||m===39?(e.consume(m),s=m,A):B(m)?(e.consume(m),x):j(m)}function A(m){return m===s?(e.consume(m),s=null,N):m===null||P(m)?n(m):(e.consume(m),A)}function j(m){return m===null||m===34||m===39||m===47||m===60||m===61||m===62||m===96||V(m)?I(m):(e.consume(m),j)}function N(m){return m===47||m===62||B(m)?S(m):n(m)}function v(m){return m===62?(e.consume(m),D):n(m)}function D(m){return m===null||P(m)?T(m):B(m)?(e.consume(m),D):n(m)}function T(m){return m===45&&i===2?(e.consume(m),L):m===60&&i===1?(e.consume(m),$):m===62&&i===4?(e.consume(m),ue):m===63&&i===3?(e.consume(m),g):m===93&&i===5?(e.consume(m),ge):P(m)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(fi,me,U)(m)):m===null||P(m)?(e.exit("htmlFlowData"),U(m)):(e.consume(m),T)}function U(m){return e.check(pi,W,me)(m)}function W(m){return e.enter("lineEnding"),e.consume(m),e.exit("lineEnding"),z}function z(m){return m===null||P(m)?U(m):(e.enter("htmlFlowData"),T(m))}function L(m){return m===45?(e.consume(m),g):T(m)}function $(m){return m===47?(e.consume(m),o="",ne):T(m)}function ne(m){if(m===62){let se=o.toLowerCase();return un.includes(se)?(e.consume(m),ue):T(m)}return ee(m)&&o.length<8?(e.consume(m),o+=String.fromCharCode(m),ne):T(m)}function ge(m){return m===93?(e.consume(m),g):T(m)}function g(m){return m===62?(e.consume(m),ue):m===45&&i===2?(e.consume(m),g):T(m)}function ue(m){return m===null||P(m)?(e.exit("htmlFlowData"),me(m)):(e.consume(m),ue)}function me(m){return e.exit("htmlFlow"),t(m)}}function gi(e,t,n){let r=this;return i;function i(o){return P(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),l):n(o)}function l(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}function mi(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt($e,t,n)}}var yi={name:"htmlText",tokenize:xi};function xi(e,t,n){let r=this,i,l,o;return a;function a(g){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(g),s}function s(g){return g===33?(e.consume(g),f):g===47?(e.consume(g),I):g===63?(e.consume(g),S):ee(g)?(e.consume(g),j):n(g)}function f(g){return g===45?(e.consume(g),c):g===91?(e.consume(g),l=0,y):ee(g)?(e.consume(g),E):n(g)}function c(g){return g===45?(e.consume(g),p):n(g)}function u(g){return g===null?n(g):g===45?(e.consume(g),h):P(g)?(o=u,$(g)):(e.consume(g),u)}function h(g){return g===45?(e.consume(g),p):u(g)}function p(g){return g===62?L(g):g===45?h(g):u(g)}function y(g){let ue="CDATA[";return g===ue.charCodeAt(l++)?(e.consume(g),l===ue.length?k:y):n(g)}function k(g){return g===null?n(g):g===93?(e.consume(g),b):P(g)?(o=k,$(g)):(e.consume(g),k)}function b(g){return g===93?(e.consume(g),d):k(g)}function d(g){return g===62?L(g):g===93?(e.consume(g),d):k(g)}function E(g){return g===null||g===62?L(g):P(g)?(o=E,$(g)):(e.consume(g),E)}function S(g){return g===null?n(g):g===63?(e.consume(g),O):P(g)?(o=S,$(g)):(e.consume(g),S)}function O(g){return g===62?L(g):S(g)}function I(g){return ee(g)?(e.consume(g),x):n(g)}function x(g){return g===45||Z(g)?(e.consume(g),x):A(g)}function A(g){return P(g)?(o=A,$(g)):B(g)?(e.consume(g),A):L(g)}function j(g){return g===45||Z(g)?(e.consume(g),j):g===47||g===62||V(g)?N(g):n(g)}function N(g){return g===47?(e.consume(g),L):g===58||g===95||ee(g)?(e.consume(g),v):P(g)?(o=N,$(g)):B(g)?(e.consume(g),N):L(g)}function v(g){return g===45||g===46||g===58||g===95||Z(g)?(e.consume(g),v):D(g)}function D(g){return g===61?(e.consume(g),T):P(g)?(o=D,$(g)):B(g)?(e.consume(g),D):N(g)}function T(g){return g===null||g===60||g===61||g===62||g===96?n(g):g===34||g===39?(e.consume(g),i=g,U):P(g)?(o=T,$(g)):B(g)?(e.consume(g),T):(e.consume(g),W)}function U(g){return g===i?(e.consume(g),i=void 0,z):g===null?n(g):P(g)?(o=U,$(g)):(e.consume(g),U)}function W(g){return g===null||g===34||g===39||g===60||g===61||g===96?n(g):g===47||g===62||V(g)?N(g):(e.consume(g),W)}function z(g){return g===47||g===62||V(g)?N(g):n(g)}function L(g){return g===62?(e.consume(g),e.exit("htmlTextData"),e.exit("htmlText"),t):n(g)}function $(g){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(g),e.exit("lineEnding"),ne}function ne(g){return B(g)?H(e,ge,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(g):ge(g)}function ge(g){return e.enter("htmlTextData"),o(g)}}var zt={name:"labelEnd",tokenize:Ci,resolveTo:Si,resolveAll:wi},ki={tokenize:Ei},bi={tokenize:Fi},vi={tokenize:Ai};function wi(e){let t=-1;for(;++t<e.length;){let n=e[t][1];(n.type==="labelImage"||n.type==="labelLink"||n.type==="labelEnd")&&(e.splice(t+1,n.type==="labelImage"?4:2),n.type="data",t++)}return e}function Si(e,t){let n=e.length,r=0,i,l,o,a;for(;n--;)if(i=e[n][1],l){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(o){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(l=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(o=n);let s={type:e[l][1].type==="labelLink"?"link":"image",start:Object.assign({},e[l][1].start),end:Object.assign({},e[e.length-1][1].end)},f={type:"label",start:Object.assign({},e[l][1].start),end:Object.assign({},e[o][1].end)},c={type:"labelText",start:Object.assign({},e[l+r+2][1].end),end:Object.assign({},e[o-2][1].start)};return a=[["enter",s,t],["enter",f,t]],a=ie(a,e.slice(l+1,l+r+3)),a=ie(a,[["enter",c,t]]),a=ie(a,et(t.parser.constructs.insideSpan.null,e.slice(l+r+4,o-3),t)),a=ie(a,[["exit",c,t],e[o-2],e[o-1],["exit",f,t]]),a=ie(a,e.slice(o+1)),a=ie(a,[["exit",s,t]]),le(e,l,e.length,a),e}function Ci(e,t,n){let r=this,i=r.events.length,l,o;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){l=r.events[i][1];break}return a;function a(h){return l?l._inactive?u(h):(o=r.parser.defined.includes(ce(r.sliceSerialize({start:l.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(h),e.exit("labelMarker"),e.exit("labelEnd"),s):n(h)}function s(h){return h===40?e.attempt(ki,c,o?c:u)(h):h===91?e.attempt(bi,c,o?f:u)(h):o?c(h):u(h)}function f(h){return e.attempt(vi,c,u)(h)}function c(h){return t(h)}function u(h){return l._balanced=!0,n(h)}}function Ei(e,t,n){return r;function r(u){return e.enter("resource"),e.enter("resourceMarker"),e.consume(u),e.exit("resourceMarker"),i}function i(u){return V(u)?He(e,l)(u):l(u)}function l(u){return u===41?c(u):Bn(e,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(u)}function o(u){return V(u)?He(e,s)(u):c(u)}function a(u){return n(u)}function s(u){return u===34||u===39||u===40?Un(e,f,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(u):c(u)}function f(u){return V(u)?He(e,c)(u):c(u)}function c(u){return u===41?(e.enter("resourceMarker"),e.consume(u),e.exit("resourceMarker"),e.exit("resource"),t):n(u)}}function Fi(e,t,n){let r=this;return i;function i(a){return Hn.call(r,e,l,o,"reference","referenceMarker","referenceString")(a)}function l(a){return r.parser.defined.includes(ce(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function o(a){return n(a)}}function Ai(e,t,n){return r;function r(l){return e.enter("reference"),e.enter("referenceMarker"),e.consume(l),e.exit("referenceMarker"),i}function i(l){return l===93?(e.enter("referenceMarker"),e.consume(l),e.exit("referenceMarker"),e.exit("reference"),t):n(l)}}var Di={name:"labelStartImage",tokenize:Oi,resolveAll:zt.resolveAll};function Oi(e,t,n){let r=this;return i;function i(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),l}function l(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),o):n(a)}function o(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}var Ti={name:"labelStartLink",tokenize:zi,resolveAll:zt.resolveAll};function zi(e,t,n){let r=this;return i;function i(o){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(o),e.exit("labelMarker"),e.exit("labelLink"),l}function l(o){return o===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(o):t(o)}}var dt={name:"lineEnding",tokenize:Li};function Li(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),H(e,t,"linePrefix")}}var Ye={name:"thematicBreak",tokenize:Pi};function Pi(e,t,n){let r=0,i;return l;function l(f){return e.enter("thematicBreak"),o(f)}function o(f){return i=f,a(f)}function a(f){return f===i?(e.enter("thematicBreakSequence"),s(f)):r>=3&&(f===null||P(f))?(e.exit("thematicBreak"),t(f)):n(f)}function s(f){return f===i?(e.consume(f),r++,s):(e.exit("thematicBreakSequence"),B(f)?H(e,a,"whitespace")(f):a(f))}}var te={name:"list",tokenize:ji,continuation:{tokenize:Ri},exit:Ni},Ii={tokenize:Bi,partial:!0},Mi={tokenize:_i,partial:!0};function ji(e,t,n){let r=this,i=r.events[r.events.length-1],l=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,o=0;return a;function a(p){let y=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(y==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:Ct(p)){if(r.containerState.type||(r.containerState.type=y,e.enter(y,{_container:!0})),y==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(Ye,n,f)(p):f(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),s(p)}return n(p)}function s(p){return Ct(p)&&++o<10?(e.consume(p),s):(!r.interrupt||o<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),f(p)):n(p)}function f(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check($e,r.interrupt?n:c,e.attempt(Ii,h,u))}function c(p){return r.containerState.initialBlankLine=!0,l++,h(p)}function u(p){return B(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),h):n(p)}function h(p){return r.containerState.size=l+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function Ri(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check($e,i,l);function i(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,H(e,t,"listItemIndent",r.containerState.size+1)(a)}function l(a){return r.containerState.furtherBlankLines||!B(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(Mi,t,o)(a))}function o(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,H(e,e.attempt(te,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function _i(e,t,n){let r=this;return H(e,i,"listItemIndent",r.containerState.size+1);function i(l){let o=r.events[r.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===r.containerState.size?t(l):n(l)}}function Ni(e){e.exit(this.containerState.type)}function Bi(e,t,n){let r=this;return H(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4+1);function i(l){let o=r.events[r.events.length-1];return!B(l)&&o&&o[1].type==="listItemPrefixWhitespace"?t(l):n(l)}}var sn={name:"setextUnderline",tokenize:Ui,resolveTo:Hi};function Hi(e,t){let n=e.length,r,i,l;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!l&&e[n][1].type==="definition"&&(l=n);let o={type:"setextHeading",start:Object.assign({},e[i][1].start),end:Object.assign({},e[e.length-1][1].end)};return e[i][1].type="setextHeadingText",l?(e.splice(i,0,["enter",o,t]),e.splice(l+1,0,["exit",e[r][1],t]),e[r][1].end=Object.assign({},e[l][1].end)):e[r][1]=o,e.push(["exit",o,t]),e}function Ui(e,t,n){let r=this,i;return l;function l(f){let c=r.events.length,u;for(;c--;)if(r.events[c][1].type!=="lineEnding"&&r.events[c][1].type!=="linePrefix"&&r.events[c][1].type!=="content"){u=r.events[c][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||u)?(e.enter("setextHeadingLine"),i=f,o(f)):n(f)}function o(f){return e.enter("setextHeadingLineSequence"),a(f)}function a(f){return f===i?(e.consume(f),a):(e.exit("setextHeadingLineSequence"),B(f)?H(e,s,"lineSuffix")(f):s(f))}function s(f){return f===null||P(f)?(e.exit("setextHeadingLine"),t(f)):n(f)}}var $i={tokenize:qi};function qi(e){let t=this,n=e.attempt($e,r,e.attempt(this.parser.constructs.flowInitial,i,H(e,e.attempt(this.parser.constructs.flow,i,e.attempt(Kl,i)),"linePrefix")));return n;function r(l){if(l===null){e.consume(l);return}return e.enter("lineEndingBlank"),e.consume(l),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(l){if(l===null){e.consume(l);return}return e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),t.currentConstruct=void 0,n}}var Vi={resolveAll:qn()},Wi=$n("string"),Qi=$n("text");function $n(e){return{tokenize:t,resolveAll:qn(e==="text"?Yi:void 0)};function t(n){let r=this,i=this.parser.constructs[e],l=n.attempt(i,o,a);return o;function o(c){return f(c)?l(c):a(c)}function a(c){if(c===null){n.consume(c);return}return n.enter("data"),n.consume(c),s}function s(c){return f(c)?(n.exit("data"),l(c)):(n.consume(c),s)}function f(c){if(c===null)return!0;let u=i[c],h=-1;if(u)for(;++h<u.length;){let p=u[h];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function qn(e){return t;function t(n,r){let i=-1,l;for(;++i<=n.length;)l===void 0?n[i]&&n[i][1].type==="data"&&(l=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==l+2&&(n[l][1].end=n[i-1][1].end,n.splice(l+2,i-l-2),i=l+2),l=void 0);return e?e(n,r):n}}function Yi(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){let r=e[n-1][1],i=t.sliceStream(r),l=i.length,o=-1,a=0,s;for(;l--;){let f=i[l];if(typeof f=="string"){for(o=f.length;f.charCodeAt(o-1)===32;)a++,o--;if(o)break;o=-1}else if(f===-2)s=!0,a++;else if(f!==-1){l++;break}}if(a){let f={type:n===e.length||s||a<2?"lineSuffix":"hardBreakTrailing",start:{line:r.end.line,column:r.end.column-a,offset:r.end.offset-a,_index:r.start._index+l,_bufferIndex:l?o:r.start._bufferIndex+o},end:Object.assign({},r.end)};r.end=Object.assign({},f.start),r.start.offset===r.end.offset?Object.assign(r,f):(e.splice(n,0,["enter",f,t],["exit",f,t]),n+=2)}n++}return e}function Ki(e,t,n){let r=Object.assign(n?Object.assign({},n):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1}),i={},l=[],o=[],a=[],s={consume:E,enter:S,exit:O,attempt:A(I),check:A(x),interrupt:A(x,{interrupt:!0})},f={previous:null,code:null,containerState:{},events:[],parser:e,sliceStream:p,sliceSerialize:h,now:y,defineSkip:k,write:u},c=t.tokenize.call(f,s);return t.resolveAll&&l.push(t),f;function u(D){return o=ie(o,D),b(),o[o.length-1]!==null?[]:(j(t,0),f.events=et(l,f.events,f),f.events)}function h(D,T){return Ji(p(D),T)}function p(D){return Xi(o,D)}function y(){let{line:D,column:T,offset:U,_index:W,_bufferIndex:z}=r;return{line:D,column:T,offset:U,_index:W,_bufferIndex:z}}function k(D){i[D.line]=D.column,v()}function b(){let D;for(;r._index<o.length;){let T=o[r._index];if(typeof T=="string")for(D=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===D&&r._bufferIndex<T.length;)d(T.charCodeAt(r._bufferIndex));else d(T)}}function d(D){c=c(D)}function E(D){P(D)?(r.line++,r.column=1,r.offset+=D===-3?2:1,v()):D!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),f.previous=D}function S(D,T){let U=T||{};return U.type=D,U.start=y(),f.events.push(["enter",U,f]),a.push(U),U}function O(D){let T=a.pop();return T.end=y(),f.events.push(["exit",T,f]),T}function I(D,T){j(D,T.from)}function x(D,T){T.restore()}function A(D,T){return U;function U(W,z,L){let $,ne,ge,g;return Array.isArray(W)?me(W):"tokenize"in W?me([W]):ue(W);function ue(G){return Te;function Te(ve){let ze=ve!==null&&G[ve],Le=ve!==null&&G.null,rt=[...Array.isArray(ze)?ze:ze?[ze]:[],...Array.isArray(Le)?Le:Le?[Le]:[]];return me(rt)(ve)}}function me(G){return $=G,ne=0,G.length===0?L:m(G[ne])}function m(G){return Te;function Te(ve){return g=N(),ge=G,G.partial||(f.currentConstruct=G),G.name&&f.parser.constructs.disable.null.includes(G.name)?Oe():G.tokenize.call(T?Object.assign(Object.create(f),T):f,s,se,Oe)(ve)}}function se(G){return D(ge,g),z}function Oe(G){return g.restore(),++ne<$.length?m($[ne]):L}}}function j(D,T){D.resolveAll&&!l.includes(D)&&l.push(D),D.resolve&&le(f.events,T,f.events.length-T,D.resolve(f.events.slice(T),f)),D.resolveTo&&(f.events=D.resolveTo(f.events,f))}function N(){let D=y(),T=f.previous,U=f.currentConstruct,W=f.events.length,z=Array.from(a);return{restore:L,from:W};function L(){r=D,f.previous=T,f.currentConstruct=U,f.events.length=W,a=z,v()}}function v(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function Xi(e,t){let n=t.start._index,r=t.start._bufferIndex,i=t.end._index,l=t.end._bufferIndex,o;if(n===i)o=[e[n].slice(r,l)];else{if(o=e.slice(n,i),r>-1){let a=o[0];typeof a=="string"?o[0]=a.slice(r):o.shift()}l>0&&o.push(e[i].slice(0,l))}return o}function Ji(e,t){let n=-1,r=[],i;for(;++n<e.length;){let l=e[n],o;if(typeof l=="string")o=l;else switch(l){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&i)continue;o=" ";break}default:o=String.fromCharCode(l)}i=l===-2,r.push(o)}return r.join("")}var Vn={};On(Vn,{attentionMarkers:()=>io,contentInitial:()=>Zi,disable:()=>oo,document:()=>Gi,flow:()=>to,flowInitial:()=>eo,insideSpan:()=>lo,string:()=>no,text:()=>ro});var Gi={[42]:te,[43]:te,[45]:te,[48]:te,[49]:te,[50]:te,[51]:te,[52]:te,[53]:te,[54]:te,[55]:te,[56]:te,[57]:te,[62]:jn},Zi={[91]:ei},eo={[-2]:pt,[-1]:pt,[32]:pt},to={[35]:oi,[42]:Ye,[45]:[sn,Ye],[60]:ci,[61]:sn,[95]:Ye,[96]:an,[126]:an},no={[38]:_n,[92]:Rn},ro={[-5]:dt,[-4]:dt,[-3]:dt,[33]:Di,[38]:_n,[42]:Et,[60]:[zl,yi],[91]:Ti,[92]:[li,Rn],[93]:zt,[95]:Et,[96]:ql},lo={null:[Et,Vi]},io={null:[42,95]},oo={null:[]};function ao(e){let t=Mn([Vn,...(e||{}).extensions||[]]),n={defined:[],lazy:{},constructs:t,content:r(Cl),document:r(Fl),flow:r($i),string:r(Wi),text:r(Qi)};return n;function r(i){return l;function l(o){return Ki(n,i,o)}}}var cn=/[\0\t\n\r]/g;function uo(){let e=1,t="",n=!0,r;return i;function i(l,o,a){let s=[],f,c,u,h,p;for(l=t+l.toString(o),u=0,t="",n&&(l.charCodeAt(0)===65279&&u++,n=void 0);u<l.length;){if(cn.lastIndex=u,f=cn.exec(l),h=f&&f.index!==void 0?f.index:l.length,p=l.charCodeAt(h),!f){t=l.slice(u);break}if(p===10&&u===h&&r)s.push(-3),r=void 0;else switch(r&&(s.push(-5),r=void 0),u<h&&(s.push(l.slice(u,h)),e+=h-u),p){case 0:{s.push(65533),e++;break}case 9:{for(c=Math.ceil(e/4)*4,s.push(-2);e++<c;)s.push(-1);break}case 10:{s.push(-4),e=1;break}default:r=!0,e=1}u=h+1}return a&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}function so(e){for(;!Nn(e););return e}function Wn(e,t){let n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"\uFFFD":String.fromCharCode(n)}var co=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Qn(e){return e.replace(co,fo)}function fo(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){let r=n.charCodeAt(1),i=r===120||r===88;return Wn(n.slice(i?2:1),i?16:10)}return Tt(n)||e}var Yn={}.hasOwnProperty,po=function(e,t,n){return typeof t!="string"&&(n=t,t=void 0),ho(n)(so(ao(n).document().write(uo()(e,t,!0))))};function ho(e){let t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:a($t),autolinkProtocol:D,autolinkEmail:D,atxHeading:a(Bt),blockQuote:a(rt),characterEscape:D,characterReference:D,codeFenced:a(Nt),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:a(Nt,s),codeText:a(Tr,s),codeTextData:D,data:D,codeFlowValue:D,definition:a(zr),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:a(Lr),hardBreakEscape:a(Ht),hardBreakTrailing:a(Ht),htmlFlow:a(Ut,s),htmlFlowData:D,htmlText:a(Ut,s),htmlTextData:D,image:a(Pr),label:s,link:a($t),listItem:a(Ir),listItemValue:y,listOrdered:a(qt,p),listUnordered:a(qt),paragraph:a(Mr),reference:Oe,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:a(Bt),strong:a(jr),thematicBreak:a(_r)},exit:{atxHeading:c(),atxHeadingSequence:A,autolink:c(),autolinkEmail:Le,autolinkProtocol:ze,blockQuote:c(),characterEscapeValue:T,characterReferenceMarkerHexadecimal:Te,characterReferenceMarkerNumeric:Te,characterReferenceValue:ve,codeFenced:c(E),codeFencedFence:d,codeFencedFenceInfo:k,codeFencedFenceMeta:b,codeFlowValue:T,codeIndented:c(S),codeText:c($),codeTextData:T,data:T,definition:c(),definitionDestinationString:x,definitionLabelString:O,definitionTitleString:I,emphasis:c(),hardBreakEscape:c(W),hardBreakTrailing:c(W),htmlFlow:c(z),htmlFlowData:T,htmlText:c(L),htmlTextData:T,image:c(ge),label:ue,labelText:g,lineEnding:U,link:c(ne),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:G,resourceDestinationString:me,resourceTitleString:m,resource:se,setextHeading:c(v),setextHeadingLineSequence:N,setextHeadingText:j,strong:c(),thematicBreak:c()}};Kn(t,(e||{}).mdastExtensions||[]);let n={};return r;function r(w){let F={type:"root",children:[]},M={stack:[F],tokenStack:[],config:t,enter:f,exit:u,buffer:s,resume:h,setData:l,getData:o},q=[],Q=-1;for(;++Q<w.length;)if(w[Q][1].type==="listOrdered"||w[Q][1].type==="listUnordered")if(w[Q][0]==="enter")q.push(Q);else{let fe=q.pop();Q=i(w,fe,Q)}for(Q=-1;++Q<w.length;){let fe=t[w[Q][0]];Yn.call(fe,w[Q][1].type)&&fe[w[Q][1].type].call(Object.assign({sliceSerialize:w[Q][2].sliceSerialize},M),w[Q][1])}if(M.tokenStack.length>0){let fe=M.tokenStack[M.tokenStack.length-1];(fe[1]||fn).call(M,void 0,fe[0])}for(F.position={start:we(w.length>0?w[0][1].start:{line:1,column:1,offset:0}),end:we(w.length>0?w[w.length-2][1].end:{line:1,column:1,offset:0})},Q=-1;++Q<t.transforms.length;)F=t.transforms[Q](F)||F;return F}function i(w,F,M){let q=F-1,Q=-1,fe=!1,Ee,ye,Re,_e;for(;++q<=M;){let K=w[q];if(K[1].type==="listUnordered"||K[1].type==="listOrdered"||K[1].type==="blockQuote"?(K[0]==="enter"?Q++:Q--,_e=void 0):K[1].type==="lineEndingBlank"?K[0]==="enter"&&(Ee&&!_e&&!Q&&!Re&&(Re=q),_e=void 0):K[1].type==="linePrefix"||K[1].type==="listItemValue"||K[1].type==="listItemMarker"||K[1].type==="listItemPrefix"||K[1].type==="listItemPrefixWhitespace"||(_e=void 0),!Q&&K[0]==="enter"&&K[1].type==="listItemPrefix"||Q===-1&&K[0]==="exit"&&(K[1].type==="listUnordered"||K[1].type==="listOrdered")){if(Ee){let lt=q;for(ye=void 0;lt--;){let xe=w[lt];if(xe[1].type==="lineEnding"||xe[1].type==="lineEndingBlank"){if(xe[0]==="exit")continue;ye&&(w[ye][1].type="lineEndingBlank",fe=!0),xe[1].type="lineEnding",ye=lt}else if(!(xe[1].type==="linePrefix"||xe[1].type==="blockQuotePrefix"||xe[1].type==="blockQuotePrefixWhitespace"||xe[1].type==="blockQuoteMarker"||xe[1].type==="listItemIndent"))break}Re&&(!ye||Re<ye)&&(Ee._spread=!0),Ee.end=Object.assign({},ye?w[ye][1].start:K[1].end),w.splice(ye||q,0,["exit",Ee,K[2]]),q++,M++}K[1].type==="listItemPrefix"&&(Ee={type:"listItem",_spread:!1,start:Object.assign({},K[1].start),end:void 0},w.splice(q,0,["enter",Ee,K[2]]),q++,M++,Re=void 0,_e=!0)}}return w[F][1]._spread=fe,M}function l(w,F){n[w]=F}function o(w){return n[w]}function a(w,F){return M;function M(q){f.call(this,w(q),q),F&&F.call(this,q)}}function s(){this.stack.push({type:"fragment",children:[]})}function f(w,F,M){return this.stack[this.stack.length-1].children.push(w),this.stack.push(w),this.tokenStack.push([F,M]),w.position={start:we(F.start)},w}function c(w){return F;function F(M){w&&w.call(this,M),u.call(this,M)}}function u(w,F){let M=this.stack.pop(),q=this.tokenStack.pop();if(q)q[0].type!==w.type&&(F?F.call(this,w,q[0]):(q[1]||fn).call(this,w,q[0]));else throw new Error("Cannot close `"+w.type+"` ("+Be({start:w.start,end:w.end})+"): it\u2019s not open");return M.position.end=we(w.end),M}function h(){return ml(this.stack.pop())}function p(){l("expectingFirstListItemValue",!0)}function y(w){if(o("expectingFirstListItemValue")){let F=this.stack[this.stack.length-2];F.start=Number.parseInt(this.sliceSerialize(w),10),l("expectingFirstListItemValue")}}function k(){let w=this.resume(),F=this.stack[this.stack.length-1];F.lang=w}function b(){let w=this.resume(),F=this.stack[this.stack.length-1];F.meta=w}function d(){o("flowCodeInside")||(this.buffer(),l("flowCodeInside",!0))}function E(){let w=this.resume(),F=this.stack[this.stack.length-1];F.value=w.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),l("flowCodeInside")}function S(){let w=this.resume(),F=this.stack[this.stack.length-1];F.value=w.replace(/(\r?\n|\r)$/g,"")}function O(w){let F=this.resume(),M=this.stack[this.stack.length-1];M.label=F,M.identifier=ce(this.sliceSerialize(w)).toLowerCase()}function I(){let w=this.resume(),F=this.stack[this.stack.length-1];F.title=w}function x(){let w=this.resume(),F=this.stack[this.stack.length-1];F.url=w}function A(w){let F=this.stack[this.stack.length-1];if(!F.depth){let M=this.sliceSerialize(w).length;F.depth=M}}function j(){l("setextHeadingSlurpLineEnding",!0)}function N(w){let F=this.stack[this.stack.length-1];F.depth=this.sliceSerialize(w).charCodeAt(0)===61?1:2}function v(){l("setextHeadingSlurpLineEnding")}function D(w){let F=this.stack[this.stack.length-1],M=F.children[F.children.length-1];(!M||M.type!=="text")&&(M=Rr(),M.position={start:we(w.start)},F.children.push(M)),this.stack.push(M)}function T(w){let F=this.stack.pop();F.value+=this.sliceSerialize(w),F.position.end=we(w.end)}function U(w){let F=this.stack[this.stack.length-1];if(o("atHardBreak")){let M=F.children[F.children.length-1];M.position.end=we(w.end),l("atHardBreak");return}!o("setextHeadingSlurpLineEnding")&&t.canContainEols.includes(F.type)&&(D.call(this,w),T.call(this,w))}function W(){l("atHardBreak",!0)}function z(){let w=this.resume(),F=this.stack[this.stack.length-1];F.value=w}function L(){let w=this.resume(),F=this.stack[this.stack.length-1];F.value=w}function $(){let w=this.resume(),F=this.stack[this.stack.length-1];F.value=w}function ne(){let w=this.stack[this.stack.length-1];if(o("inReference")){let F=o("referenceType")||"shortcut";w.type+="Reference",w.referenceType=F,delete w.url,delete w.title}else delete w.identifier,delete w.label;l("referenceType")}function ge(){let w=this.stack[this.stack.length-1];if(o("inReference")){let F=o("referenceType")||"shortcut";w.type+="Reference",w.referenceType=F,delete w.url,delete w.title}else delete w.identifier,delete w.label;l("referenceType")}function g(w){let F=this.sliceSerialize(w),M=this.stack[this.stack.length-2];M.label=Qn(F),M.identifier=ce(F).toLowerCase()}function ue(){let w=this.stack[this.stack.length-1],F=this.resume(),M=this.stack[this.stack.length-1];if(l("inReference",!0),M.type==="link"){let q=w.children;M.children=q}else M.alt=F}function me(){let w=this.resume(),F=this.stack[this.stack.length-1];F.url=w}function m(){let w=this.resume(),F=this.stack[this.stack.length-1];F.title=w}function se(){l("inReference")}function Oe(){l("referenceType","collapsed")}function G(w){let F=this.resume(),M=this.stack[this.stack.length-1];M.label=F,M.identifier=ce(this.sliceSerialize(w)).toLowerCase(),l("referenceType","full")}function Te(w){l("characterReferenceType",w.type)}function ve(w){let F=this.sliceSerialize(w),M=o("characterReferenceType"),q;M?(q=Wn(F,M==="characterReferenceMarkerNumeric"?10:16),l("characterReferenceType")):q=Tt(F);let Q=this.stack.pop();Q.value+=q,Q.position.end=we(w.end)}function ze(w){T.call(this,w);let F=this.stack[this.stack.length-1];F.url=this.sliceSerialize(w)}function Le(w){T.call(this,w);let F=this.stack[this.stack.length-1];F.url="mailto:"+this.sliceSerialize(w)}function rt(){return{type:"blockquote",children:[]}}function Nt(){return{type:"code",lang:null,meta:null,value:""}}function Tr(){return{type:"inlineCode",value:""}}function zr(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Lr(){return{type:"emphasis",children:[]}}function Bt(){return{type:"heading",depth:void 0,children:[]}}function Ht(){return{type:"break"}}function Ut(){return{type:"html",value:""}}function Pr(){return{type:"image",title:null,url:"",alt:null}}function $t(){return{type:"link",title:null,url:"",children:[]}}function qt(w){return{type:"list",ordered:w.type==="listOrdered",start:null,spread:w._spread,children:[]}}function Ir(w){return{type:"listItem",spread:w._spread,checked:null,children:[]}}function Mr(){return{type:"paragraph",children:[]}}function jr(){return{type:"strong",children:[]}}function Rr(){return{type:"text",value:""}}function _r(){return{type:"thematicBreak"}}}function we(e){return{line:e.line,column:e.column,offset:e.offset}}function Kn(e,t){let n=-1;for(;++n<t.length;){let r=t[n];Array.isArray(r)?Kn(e,r):go(e,r)}}function go(e,t){let n;for(n in t)if(Yn.call(t,n)){if(n==="canContainEols"){let r=t[n];r&&e[n].push(...r)}else if(n==="transforms"){let r=t[n];r&&e[n].push(...r)}else if(n==="enter"||n==="exit"){let r=t[n];r&&Object.assign(e[n],r)}}}function fn(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+Be({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Be({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+Be({start:t.start,end:t.end})+") is still open")}function mo(e){Object.assign(this,{Parser:t=>{let n=this.data("settings");return po(t,Object.assign({},n,e,{extensions:this.data("micromarkExtensions")||[],mdastExtensions:this.data("fromMarkdownExtensions")||[]}))}})}function yo(e,t){let n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function xo(e,t){let n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function ko(e,t){let n=t.value?t.value+`
`:"",r=t.lang?t.lang.match(/^[^ \t]+(?=[ \t]|$)/):null,i={};r&&(i.className=["language-"+r]);let l={type:"element",tagName:"code",properties:i,children:[{type:"text",value:n}]};return t.meta&&(l.data={meta:t.meta}),e.patch(t,l),l=e.applyData(t,l),l={type:"element",tagName:"pre",properties:{},children:[l]},e.patch(t,l),l}function bo(e,t){let n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function vo(e,t){let n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Me(e){let t=[],n=-1,r=0,i=0;for(;++n<e.length;){let l=e.charCodeAt(n),o="";if(l===37&&Z(e.charCodeAt(n+1))&&Z(e.charCodeAt(n+2)))i=2;else if(l<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l))||(o=String.fromCharCode(l));else if(l>55295&&l<57344){let a=e.charCodeAt(n+1);l<56320&&a>56319&&a<57344?(o=String.fromCharCode(l,a),i=1):o="\uFFFD"}else o=String.fromCharCode(l);o&&(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,o=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function Xn(e,t){let n=String(t.identifier).toUpperCase(),r=Me(n.toLowerCase()),i=e.footnoteOrder.indexOf(n),l;i===-1?(e.footnoteOrder.push(n),e.footnoteCounts[n]=1,l=e.footnoteOrder.length):(e.footnoteCounts[n]++,l=i+1);let o=e.footnoteCounts[n],a={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fn-"+r,id:e.clobberPrefix+"fnref-"+r+(o>1?"-"+o:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};e.patch(t,a);let s={type:"element",tagName:"sup",properties:{},children:[a]};return e.patch(t,s),e.applyData(t,s)}function wo(e,t){let n=e.footnoteById,r=1;for(;r in n;)r++;let i=String(r);return n[i]={type:"footnoteDefinition",identifier:i,children:[{type:"paragraph",children:t.children}],position:t.position},Xn(e,{type:"footnoteReference",identifier:i,position:t.position})}function So(e,t){let n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Co(e,t){if(e.dangerous){let n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}return null}function Jn(e,t){let n=t.referenceType,r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return{type:"text",value:"!["+t.alt+r};let i=e.all(t),l=i[0];l&&l.type==="text"?l.value="["+l.value:i.unshift({type:"text",value:"["});let o=i[i.length-1];return o&&o.type==="text"?o.value+=r:i.push({type:"text",value:r}),i}function Eo(e,t){let n=e.definition(t.identifier);if(!n)return Jn(e,t);let r={src:Me(n.url||""),alt:t.alt};n.title!==null&&n.title!==void 0&&(r.title=n.title);let i={type:"element",tagName:"img",properties:r,children:[]};return e.patch(t,i),e.applyData(t,i)}function Fo(e,t){let n={src:Me(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function Ao(e,t){let n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);let r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function Do(e,t){let n=e.definition(t.identifier);if(!n)return Jn(e,t);let r={href:Me(n.url||"")};n.title!==null&&n.title!==void 0&&(r.title=n.title);let i={type:"element",tagName:"a",properties:r,children:e.all(t)};return e.patch(t,i),e.applyData(t,i)}function Oo(e,t){let n={href:Me(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function To(e,t,n){let r=e.all(t),i=n?zo(n):Gn(t),l={},o=[];if(typeof t.checked=="boolean"){let c=r[0],u;c&&c.type==="element"&&c.tagName==="p"?u=c:(u={type:"element",tagName:"p",properties:{},children:[]},r.unshift(u)),u.children.length>0&&u.children.unshift({type:"text",value:" "}),u.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),l.className=["task-list-item"]}let a=-1;for(;++a<r.length;){let c=r[a];(i||a!==0||c.type!=="element"||c.tagName!=="p")&&o.push({type:"text",value:`
`}),c.type==="element"&&c.tagName==="p"&&!i?o.push(...c.children):o.push(c)}let s=r[r.length-1];s&&(i||s.type!=="element"||s.tagName!=="p")&&o.push({type:"text",value:`
`});let f={type:"element",tagName:"li",properties:l,children:o};return e.patch(t,f),e.applyData(t,f)}function zo(e){let t=!1;if(e.type==="list"){t=e.spread||!1;let n=e.children,r=-1;for(;!t&&++r<n.length;)t=Gn(n[r])}return t}function Gn(e){let t=e.spread;return t==null?e.children.length>1:t}function Lo(e,t){let n={},r=e.all(t),i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){let o=r[i];if(o.type==="element"&&o.tagName==="li"&&o.properties&&Array.isArray(o.properties.className)&&o.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}let l={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,l),e.applyData(t,l)}function Po(e,t){let n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Io(e,t){let n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function Mo(e,t){let n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}var Lt=Zn("start"),Pt=Zn("end");function jo(e){return{start:Lt(e),end:Pt(e)}}function Zn(e){return t;function t(n){let r=n&&n.position&&n.position[e]||{};return{line:r.line||null,column:r.column||null,offset:r.offset>-1?r.offset:null}}}function Ro(e,t){let n=e.all(t),r=n.shift(),i=[];if(r){let o={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],o),i.push(o)}if(n.length>0){let o={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=Lt(t.children[1]),s=Pt(t.children[t.children.length-1]);a.line&&s.line&&(o.position={start:a,end:s}),i.push(o)}let l={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,l),e.applyData(t,l)}function _o(e,t,n){let r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?"th":"td",l=n&&n.type==="table"?n.align:void 0,o=l?l.length:t.children.length,a=-1,s=[];for(;++a<o;){let c=t.children[a],u={},h=l?l[a]:void 0;h&&(u.align=h);let p={type:"element",tagName:i,properties:u,children:[]};c&&(p.children=e.all(c),e.patch(c,p),p=e.applyData(t,p)),s.push(p)}let f={type:"element",tagName:"tr",properties:{},children:e.wrap(s,!0)};return e.patch(t,f),e.applyData(t,f)}function No(e,t){let n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Bo(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),i=0,l=[];for(;r;)l.push(pn(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return l.push(pn(t.slice(i),i>0,!1)),l.join("")}function pn(e,t,n){let r=0,i=e.length;if(t){let l=e.codePointAt(r);for(;l===9||l===32;)r++,l=e.codePointAt(r)}if(n){let l=e.codePointAt(i-1);for(;l===9||l===32;)i--,l=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function Ho(e,t){let n={type:"text",value:Bo(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function Uo(e,t){let n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}var $o={blockquote:yo,break:xo,code:ko,delete:bo,emphasis:vo,footnoteReference:Xn,footnote:wo,heading:So,html:Co,imageReference:Eo,image:Fo,inlineCode:Ao,linkReference:Do,link:Oo,listItem:To,list:Lo,paragraph:Po,root:Io,strong:Mo,table:Ro,tableCell:No,tableRow:_o,text:Ho,thematicBreak:Uo,toml:Ve,yaml:Ve,definition:Ve,footnoteDefinition:Ve};function Ve(){return null}var It=function(e){if(e==null)return Qo;if(typeof e=="string")return Wo(e);if(typeof e=="object")return Array.isArray(e)?qo(e):Vo(e);if(typeof e=="function")return tt(e);throw new Error("Expected function, string, or object as test")};function qo(e){let t=[],n=-1;for(;++n<e.length;)t[n]=It(e[n]);return tt(r);function r(...i){let l=-1;for(;++l<t.length;)if(t[l].call(this,...i))return!0;return!1}}function Vo(e){return tt(t);function t(n){let r;for(r in e)if(n[r]!==e[r])return!1;return!0}}function Wo(e){return tt(t);function t(n){return n&&n.type===e}}function tt(e){return t;function t(n,...r){return!!(n&&typeof n=="object"&&"type"in n&&e.call(this,n,...r))}}function Qo(){return!0}var Yo=!0,dn=!1,Ko="skip",er=function(e,t,n,r){typeof t=="function"&&typeof n!="function"&&(r=n,n=t,t=null);let i=It(t),l=r?-1:1;o(e,void 0,[])();function o(a,s,f){let c=a&&typeof a=="object"?a:{};if(typeof c.type=="string"){let h=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(u,"name",{value:"node ("+(a.type+(h?"<"+h+">":""))+")"})}return u;function u(){let h=[],p,y,k;if((!t||i(a,s,f[f.length-1]||null))&&(h=Xo(n(a,f)),h[0]===dn))return h;if(a.children&&h[0]!==Ko)for(y=(r?a.children.length:-1)+l,k=f.concat(a);y>-1&&y<a.children.length;){if(p=o(a.children[y],y,k)(),p[0]===dn)return p;y=typeof p[1]=="number"?p[1]:y+l}return h}}};function Xo(e){return Array.isArray(e)?e:typeof e=="number"?[Yo,e]:[e]}var Mt=function(e,t,n,r){typeof t=="function"&&typeof n!="function"&&(r=n,n=t,t=null),er(e,t,i,r);function i(l,o){let a=o[o.length-1];return n(l,a?a.children.indexOf(l):null,a)}};function Jo(e){return!e||!e.position||!e.position.start||!e.position.start.line||!e.position.start.column||!e.position.end||!e.position.end.line||!e.position.end.column}var hn={}.hasOwnProperty;function Go(e){let t=Object.create(null);if(!e||!e.type)throw new Error("mdast-util-definitions expected node");return Mt(e,"definition",r=>{let i=gn(r.identifier);i&&!hn.call(t,i)&&(t[i]=r)}),n;function n(r){let i=gn(r);return i&&hn.call(t,i)?t[i]:null}}function gn(e){return String(e||"").toUpperCase()}var Je={}.hasOwnProperty;function Zo(e,t){let n=t||{},r=n.allowDangerousHtml||!1,i={};return o.dangerous=r,o.clobberPrefix=n.clobberPrefix===void 0||n.clobberPrefix===null?"user-content-":n.clobberPrefix,o.footnoteLabel=n.footnoteLabel||"Footnotes",o.footnoteLabelTagName=n.footnoteLabelTagName||"h2",o.footnoteLabelProperties=n.footnoteLabelProperties||{className:["sr-only"]},o.footnoteBackLabel=n.footnoteBackLabel||"Back to content",o.unknownHandler=n.unknownHandler,o.passThrough=n.passThrough,o.handlers=J(J({},$o),n.handlers),o.definition=Go(e),o.footnoteById=i,o.footnoteOrder=[],o.footnoteCounts={},o.patch=ea,o.applyData=ta,o.one=a,o.all=s,o.wrap=ra,o.augment=l,Mt(e,"footnoteDefinition",f=>{let c=String(f.identifier).toUpperCase();Je.call(i,c)||(i[c]=f)}),o;function l(f,c){if(f&&"data"in f&&f.data){let u=f.data;u.hName&&(c.type!=="element"&&(c={type:"element",tagName:"",properties:{},children:[]}),c.tagName=u.hName),c.type==="element"&&u.hProperties&&(c.properties=J(J({},c.properties),u.hProperties)),"children"in c&&c.children&&u.hChildren&&(c.children=u.hChildren)}if(f){let u="type"in f?f:{position:f};Jo(u)||(c.position={start:Lt(u),end:Pt(u)})}return c}function o(f,c,u,h){return Array.isArray(u)&&(h=u,u={}),l(f,{type:"element",tagName:c,properties:u||{},children:h||[]})}function a(f,c){return tr(o,f,c)}function s(f){return jt(o,f)}}function ea(e,t){e.position&&(t.position=jo(e))}function ta(e,t){let n=t;if(e&&e.data){let r=e.data.hName,i=e.data.hChildren,l=e.data.hProperties;typeof r=="string"&&(n.type==="element"?n.tagName=r:n={type:"element",tagName:r,properties:{},children:[]}),n.type==="element"&&l&&(n.properties=J(J({},n.properties),l)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function tr(e,t,n){let r=t&&t.type;if(!r)throw new Error("Expected node, got `"+t+"`");return Je.call(e.handlers,r)?e.handlers[r](e,t,n):e.passThrough&&e.passThrough.includes(r)?"children"in t?Se(J({},t),{children:jt(e,t)}):t:e.unknownHandler?e.unknownHandler(e,t,n):na(e,t)}function jt(e,t){let n=[];if("children"in t){let r=t.children,i=-1;for(;++i<r.length;){let l=tr(e,r[i],t);if(l){if(i&&r[i-1].type==="break"&&(!Array.isArray(l)&&l.type==="text"&&(l.value=l.value.replace(/^\s+/,"")),!Array.isArray(l)&&l.type==="element")){let o=l.children[0];o&&o.type==="text"&&(o.value=o.value.replace(/^\s+/,""))}Array.isArray(l)?n.push(...l):n.push(l)}}}return n}function na(e,t){let n=t.data||{},r="value"in t&&!(Je.call(n,"hProperties")||Je.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:jt(e,t)};return e.patch(t,r),e.applyData(t,r)}function ra(e,t){let n=[],r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function la(e){let t=[],n=-1;for(;++n<e.footnoteOrder.length;){let r=e.footnoteById[e.footnoteOrder[n]];if(!r)continue;let i=e.all(r),l=String(r.identifier).toUpperCase(),o=Me(l.toLowerCase()),a=0,s=[];for(;++a<=e.footnoteCounts[l];){let u={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fnref-"+o+(a>1?"-"+a:""),dataFootnoteBackref:!0,className:["data-footnote-backref"],ariaLabel:e.footnoteBackLabel},children:[{type:"text",value:"\u21A9"}]};a>1&&u.children.push({type:"element",tagName:"sup",children:[{type:"text",value:String(a)}]}),s.length>0&&s.push({type:"text",value:" "}),s.push(u)}let f=i[i.length-1];if(f&&f.type==="element"&&f.tagName==="p"){let u=f.children[f.children.length-1];u&&u.type==="text"?u.value+=" ":f.children.push({type:"text",value:" "}),f.children.push(...s)}else i.push(...s);let c={type:"element",tagName:"li",properties:{id:e.clobberPrefix+"fn-"+o},children:e.wrap(i,!0)};e.patch(r,c),t.push(c)}if(t.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:e.footnoteLabelTagName,properties:Se(J({},JSON.parse(JSON.stringify(e.footnoteLabelProperties))),{id:"footnote-label"}),children:[{type:"text",value:e.footnoteLabel}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(t,!0)},{type:"text",value:`
`}]}}function nr(e,t){let n=Zo(e,t),r=n.one(e,null),i=la(n);return i&&r.children.push({type:"text",value:`
`},i),Array.isArray(r)?{type:"root",children:r}:r}var ia=function(e,t){return e&&"run"in e?aa(e,t):ua(e||t)},oa=ia;function aa(e,t){return(n,r,i)=>{e.run(nr(n,t),r,l=>{i(l)})}}function ua(e){return t=>nr(t,e)}var R=de($r(),1),qe=class{constructor(e,t,n){this.property=e,this.normal=t,n&&(this.space=n)}};qe.prototype.property={};qe.prototype.normal={};qe.prototype.space=null;function rr(e,t){let n={},r={},i=-1;for(;++i<e.length;)Object.assign(n,e[i].property),Object.assign(r,e[i].normal);return new qe(n,r,t)}function Ft(e){return e.toLowerCase()}var ae=class{constructor(e,t){this.property=e,this.attribute=t}};ae.prototype.space=null;ae.prototype.boolean=!1;ae.prototype.booleanish=!1;ae.prototype.overloadedBoolean=!1;ae.prototype.number=!1;ae.prototype.commaSeparated=!1;ae.prototype.spaceSeparated=!1;ae.prototype.commaOrSpaceSeparated=!1;ae.prototype.mustUseProperty=!1;ae.prototype.defined=!1;var Ge={};On(Ge,{boolean:()=>_,booleanish:()=>X,commaOrSpaceSeparated:()=>re,commaSeparated:()=>Ie,number:()=>C,overloadedBoolean:()=>lr,spaceSeparated:()=>Y});var sa=0,_=De(),X=De(),lr=De(),C=De(),Y=De(),Ie=De(),re=De();function De(){return 2**++sa}var ht=Object.keys(Ge),Rt=class extends ae{constructor(e,t,n,r){let i=-1;if(super(e,t),mn(this,"space",r),typeof n=="number")for(;++i<ht.length;){let l=ht[i];mn(this,ht[i],(n&Ge[l])===Ge[l])}}};Rt.prototype.defined=!0;function mn(e,t,n){n&&(e[t]=n)}var ca={}.hasOwnProperty;function je(e){let t={},n={},r;for(r in e.properties)if(ca.call(e.properties,r)){let i=e.properties[r],l=new Rt(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(l.mustUseProperty=!0),t[r]=l,n[Ft(r)]=r,n[Ft(l.attribute)]=r}return new qe(t,n,e.space)}var ir=je({space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),or=je({space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function ar(e,t){return t in e?e[t]:t}function ur(e,t){return ar(e,t.toLowerCase())}var sr=je({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:ur,properties:{xmlns:null,xmlnsXLink:null}}),cr=je({transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:X,ariaAutoComplete:null,ariaBusy:X,ariaChecked:X,ariaColCount:C,ariaColIndex:C,ariaColSpan:C,ariaControls:Y,ariaCurrent:null,ariaDescribedBy:Y,ariaDetails:null,ariaDisabled:X,ariaDropEffect:Y,ariaErrorMessage:null,ariaExpanded:X,ariaFlowTo:Y,ariaGrabbed:X,ariaHasPopup:null,ariaHidden:X,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Y,ariaLevel:C,ariaLive:null,ariaModal:X,ariaMultiLine:X,ariaMultiSelectable:X,ariaOrientation:null,ariaOwns:Y,ariaPlaceholder:null,ariaPosInSet:C,ariaPressed:X,ariaReadOnly:X,ariaRelevant:null,ariaRequired:X,ariaRoleDescription:Y,ariaRowCount:C,ariaRowIndex:C,ariaRowSpan:C,ariaSelected:X,ariaSetSize:C,ariaSort:null,ariaValueMax:C,ariaValueMin:C,ariaValueNow:C,ariaValueText:null,role:null}}),fa=je({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:ur,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Ie,acceptCharset:Y,accessKey:Y,action:null,allow:null,allowFullScreen:_,allowPaymentRequest:_,allowUserMedia:_,alt:null,as:null,async:_,autoCapitalize:null,autoComplete:Y,autoFocus:_,autoPlay:_,capture:_,charSet:null,checked:_,cite:null,className:Y,cols:C,colSpan:null,content:null,contentEditable:X,controls:_,controlsList:Y,coords:C|Ie,crossOrigin:null,data:null,dateTime:null,decoding:null,default:_,defer:_,dir:null,dirName:null,disabled:_,download:lr,draggable:X,encType:null,enterKeyHint:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:_,formTarget:null,headers:Y,height:C,hidden:_,high:C,href:null,hrefLang:null,htmlFor:Y,httpEquiv:Y,id:null,imageSizes:null,imageSrcSet:null,inputMode:null,integrity:null,is:null,isMap:_,itemId:null,itemProp:Y,itemRef:Y,itemScope:_,itemType:Y,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:_,low:C,manifest:null,max:null,maxLength:C,media:null,method:null,min:null,minLength:C,multiple:_,muted:_,name:null,nonce:null,noModule:_,noValidate:_,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:_,optimum:C,pattern:null,ping:Y,placeholder:null,playsInline:_,poster:null,preload:null,readOnly:_,referrerPolicy:null,rel:Y,required:_,reversed:_,rows:C,rowSpan:C,sandbox:Y,scope:null,scoped:_,seamless:_,selected:_,shape:null,size:C,sizes:null,slot:null,span:C,spellCheck:X,src:null,srcDoc:null,srcLang:null,srcSet:null,start:C,step:null,style:null,tabIndex:C,target:null,title:null,translate:null,type:null,typeMustMatch:_,useMap:null,value:X,width:C,wrap:null,align:null,aLink:null,archive:Y,axis:null,background:null,bgColor:null,border:C,borderColor:null,bottomMargin:C,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:_,declare:_,event:null,face:null,frame:null,frameBorder:null,hSpace:C,leftMargin:C,link:null,longDesc:null,lowSrc:null,marginHeight:C,marginWidth:C,noResize:_,noHref:_,noShade:_,noWrap:_,object:null,profile:null,prompt:null,rev:null,rightMargin:C,rules:null,scheme:null,scrolling:X,standby:null,summary:null,text:null,topMargin:C,valueType:null,version:null,vAlign:null,vLink:null,vSpace:C,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:_,disableRemotePlayback:_,prefix:null,property:null,results:C,security:null,unselectable:null}}),pa=je({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:ar,properties:{about:re,accentHeight:C,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:C,amplitude:C,arabicForm:null,ascent:C,attributeName:null,attributeType:null,azimuth:C,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:C,by:null,calcMode:null,capHeight:C,className:Y,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:C,diffuseConstant:C,direction:null,display:null,dur:null,divisor:C,dominantBaseline:null,download:_,dx:null,dy:null,edgeMode:null,editable:null,elevation:C,enableBackground:null,end:null,event:null,exponent:C,externalResourcesRequired:null,fill:null,fillOpacity:C,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Ie,g2:Ie,glyphName:Ie,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:C,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:C,horizOriginX:C,horizOriginY:C,id:null,ideographic:C,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:C,k:C,k1:C,k2:C,k3:C,k4:C,kernelMatrix:re,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:C,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:C,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:C,overlineThickness:C,paintOrder:null,panose1:null,path:null,pathLength:C,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Y,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:C,pointsAtY:C,pointsAtZ:C,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:re,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:re,rev:re,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:re,requiredFeatures:re,requiredFonts:re,requiredFormats:re,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:C,specularExponent:C,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:C,strikethroughThickness:C,string:null,stroke:null,strokeDashArray:re,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:C,strokeOpacity:C,strokeWidth:null,style:null,surfaceScale:C,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:re,tabIndex:C,tableValues:null,target:null,targetX:C,targetY:C,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:re,to:null,transform:null,u1:null,u2:null,underlinePosition:C,underlineThickness:C,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:C,values:null,vAlphabetic:C,vMathematical:C,vectorEffect:null,vHanging:C,vIdeographic:C,version:null,vertAdvY:C,vertOriginX:C,vertOriginY:C,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:C,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),da=/^data[-\w.:]+$/i,yn=/-[a-z]/g,ha=/[A-Z]/g;function ga(e,t){let n=Ft(t),r=t,i=ae;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&da.test(t)){if(t.charAt(4)==="-"){let l=t.slice(5).replace(yn,ya);r="data"+l.charAt(0).toUpperCase()+l.slice(1)}else{let l=t.slice(4);if(!yn.test(l)){let o=l.replace(ha,ma);o.charAt(0)!=="-"&&(o="-"+o),t="data"+o}}i=Rt}return new i(r,t)}function ma(e){return"-"+e.toLowerCase()}function ya(e){return e.charAt(1).toUpperCase()}var xn={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},xa=rr([or,ir,sr,cr,fa],"html"),ka=rr([or,ir,sr,cr,pa],"svg");function ba(e){if(e.allowedElements&&e.disallowedElements)throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");if(e.allowedElements||e.disallowedElements||e.allowElement)return t=>{Mt(t,"element",(n,r,i)=>{let l=i,o;if(e.allowedElements?o=!e.allowedElements.includes(n.tagName):e.disallowedElements&&(o=e.disallowedElements.includes(n.tagName)),!o&&e.allowElement&&typeof r=="number"&&(o=!e.allowElement(n,r,l)),o&&typeof r=="number")return e.unwrapDisallowed&&n.children?l.children.splice(r,1,...n.children):l.children.splice(r,1),r})}}var gt=de(Ot(),1),va=de(Vr(),1);function wa(e){let t=e&&typeof e=="object"&&e.type==="text"?e.value||"":e;return typeof t=="string"&&t.replace(/[ \t\n\f\r]/g,"")===""}function Sa(e){return e.join(" ").trim()}function Ca(e,t){let n=t||{};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}var Ea=de(Qr(),1),Fa=Ea.default,At={}.hasOwnProperty,Aa=new Set(["table","thead","tbody","tfoot","tr"]);function fr(e,t){let n=[],r=-1,i;for(;++r<t.children.length;)i=t.children[r],i.type==="element"?n.push(Da(e,i,r,t)):i.type==="text"?(t.type!=="element"||!Aa.has(t.tagName)||!wa(i))&&n.push(i.value):i.type==="raw"&&!e.options.skipHtml&&n.push(i.value);return n}function Da(e,t,n,r){let i=e.options,l=i.transformLinkUri===void 0?Kr:i.transformLinkUri,o=e.schema,a=t.tagName,s={},f=o,c;if(o.space==="html"&&a==="svg"&&(f=ka,e.schema=f),t.properties)for(c in t.properties)At.call(t.properties,c)&&Ta(s,c,t.properties[c],e);(a==="ol"||a==="ul")&&e.listDepth++;let u=fr(e,t);(a==="ol"||a==="ul")&&e.listDepth--,e.schema=o;let h=t.position||{start:{line:null,column:null,offset:null},end:{line:null,column:null,offset:null}},p=i.components&&At.call(i.components,a)?i.components[a]:a,y=typeof p=="string"||p===gt.default.Fragment;if(!va.default.isValidElementType(p))throw new TypeError(`Component for name \`${a}\` not defined or is not renderable`);if(s.key=n,a==="a"&&i.linkTarget&&(s.target=typeof i.linkTarget=="function"?i.linkTarget(String(s.href||""),t.children,typeof s.title=="string"?s.title:null):i.linkTarget),a==="a"&&l&&(s.href=l(String(s.href||""),t.children,typeof s.title=="string"?s.title:null)),!y&&a==="code"&&r.type==="element"&&r.tagName!=="pre"&&(s.inline=!0),!y&&(a==="h1"||a==="h2"||a==="h3"||a==="h4"||a==="h5"||a==="h6")&&(s.level=Number.parseInt(a.charAt(1),10)),a==="img"&&i.transformImageUri&&(s.src=i.transformImageUri(String(s.src||""),String(s.alt||""),typeof s.title=="string"?s.title:null)),!y&&a==="li"&&r.type==="element"){let k=Oa(t);s.checked=k&&k.properties?!!k.properties.checked:null,s.index=mt(r,t),s.ordered=r.tagName==="ol"}return!y&&(a==="ol"||a==="ul")&&(s.ordered=a==="ol",s.depth=e.listDepth),(a==="td"||a==="th")&&(s.align&&(s.style||(s.style={}),s.style.textAlign=s.align,delete s.align),y||(s.isHeader=a==="th")),!y&&a==="tr"&&r.type==="element"&&(s.isHeader=r.tagName==="thead"),i.sourcePos&&(s["data-sourcepos"]=Pa(h)),!y&&i.rawSourcePos&&(s.sourcePosition=t.position),!y&&i.includeElementIndex&&(s.index=mt(r,t),s.siblingCount=mt(r)),y||(s.node=t),u.length>0?gt.default.createElement(p,s,u):gt.default.createElement(p,s)}function Oa(e){let t=-1;for(;++t<e.children.length;){let n=e.children[t];if(n.type==="element"&&n.tagName==="input")return n}return null}function mt(e,t){let n=-1,r=0;for(;++n<e.children.length&&e.children[n]!==t;)e.children[n].type==="element"&&r++;return r}function Ta(e,t,n,r){let i=ga(r.schema,t),l=n;l==null||l!==l||(Array.isArray(l)&&(l=i.commaSeparated?Ca(l):Sa(l)),i.property==="style"&&typeof l=="string"&&(l=za(l)),i.space&&i.property?e[At.call(xn,i.property)?xn[i.property]:i.property]=l:i.attribute&&(e[i.attribute]=l))}function za(e){let t={};try{Fa(e,n)}catch{}return t;function n(r,i){let l=r.slice(0,4)==="-ms-"?`ms-${r.slice(4)}`:r;t[l.replace(/-([a-z])/g,La)]=i}}function La(e,t){return t.toUpperCase()}function Pa(e){return[e.start.line,":",e.start.column,"-",e.end.line,":",e.end.column].map(String).join("")}var kn={}.hasOwnProperty,Ia="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",We={plugins:{to:"remarkPlugins",id:"change-plugins-to-remarkplugins"},renderers:{to:"components",id:"change-renderers-to-components"},astPlugins:{id:"remove-buggy-html-in-markdown-parser"},allowDangerousHtml:{id:"remove-buggy-html-in-markdown-parser"},escapeHtml:{id:"remove-buggy-html-in-markdown-parser"},source:{to:"children",id:"change-source-to-children"},allowNode:{to:"allowElement",id:"replace-allownode-allowedtypes-and-disallowedtypes"},allowedTypes:{to:"allowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},disallowedTypes:{to:"disallowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},includeNodeIndex:{to:"includeElementIndex",id:"change-includenodeindex-to-includeelementindex"}};function pr(e){for(let l in We)if(kn.call(We,l)&&kn.call(e,l)){let o=We[l];console.warn(`[react-markdown] Warning: please ${o.to?`use \`${o.to}\` instead of`:"remove"} \`${l}\` (see <${Ia}#${o.id}> for more info)`),delete We[l]}let t=fl().use(mo).use(e.remarkPlugins||[]).use(oa,Se(J({},e.remarkRehypeOptions),{allowDangerousHtml:!0})).use(e.rehypePlugins||[]).use(ba,e),n=new zn;typeof e.children=="string"?n.value=e.children:e.children!==void 0&&e.children!==null&&console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`);let r=t.runSync(t.parse(n),n);if(r.type!=="root")throw new TypeError("Expected a `root` node");let i=it.default.createElement(it.default.Fragment,{},fr({options:e,schema:xa,listDepth:0},r));return e.className&&(i=it.default.createElement("div",{className:e.className},i)),i}pr.propTypes={children:R.default.string,className:R.default.string,allowElement:R.default.func,allowedElements:R.default.arrayOf(R.default.string),disallowedElements:R.default.arrayOf(R.default.string),unwrapDisallowed:R.default.bool,remarkPlugins:R.default.arrayOf(R.default.oneOfType([R.default.object,R.default.func,R.default.arrayOf(R.default.oneOfType([R.default.bool,R.default.string,R.default.object,R.default.func,R.default.arrayOf(R.default.any)]))])),rehypePlugins:R.default.arrayOf(R.default.oneOfType([R.default.object,R.default.func,R.default.arrayOf(R.default.oneOfType([R.default.bool,R.default.string,R.default.object,R.default.func,R.default.arrayOf(R.default.any)]))])),sourcePos:R.default.bool,rawSourcePos:R.default.bool,skipHtml:R.default.bool,includeElementIndex:R.default.bool,transformLinkUri:R.default.oneOfType([R.default.func,R.default.bool]),linkTarget:R.default.oneOfType([R.default.func,R.default.string]),transformImageUri:R.default.func,components:R.default.object};var Ma=`
  color-scheme: light;
  --color-prettylights-syntax-comment: #6e7781;
  --color-prettylights-syntax-constant: #0550ae;
  --color-prettylights-syntax-entity: #8250df;
  --color-prettylights-syntax-storage-modifier-import: #24292f;
  --color-prettylights-syntax-entity-tag: #116329;
  --color-prettylights-syntax-keyword: #cf222e;
  --color-prettylights-syntax-string: #0a3069;
  --color-prettylights-syntax-variable: #953800;
  --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
  --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
  --color-prettylights-syntax-invalid-illegal-bg: #82071e;
  --color-prettylights-syntax-carriage-return-text: #f6f8fa;
  --color-prettylights-syntax-carriage-return-bg: #cf222e;
  --color-prettylights-syntax-string-regexp: #116329;
  --color-prettylights-syntax-markup-list: #3b2300;
  --color-prettylights-syntax-markup-heading: #0550ae;
  --color-prettylights-syntax-markup-italic: #24292f;
  --color-prettylights-syntax-markup-bold: #24292f;
  --color-prettylights-syntax-markup-deleted-text: #82071e;
  --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
  --color-prettylights-syntax-markup-inserted-text: #116329;
  --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
  --color-prettylights-syntax-markup-changed-text: #953800;
  --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
  --color-prettylights-syntax-markup-ignored-text: #eaeef2;
  --color-prettylights-syntax-markup-ignored-bg: #0550ae;
  --color-prettylights-syntax-meta-diff-range: #8250df;
  --color-prettylights-syntax-brackethighlighter-angle: #57606a;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;
  --color-prettylights-syntax-constant-other-reference-link: #0a3069;
  --color-fg-default: #24292f;
  --color-fg-muted: #57606a;
  --color-fg-subtle: #6e7781;
  --color-canvas-default: #ffffff;
  --color-canvas-subtle: #f6f8fa;
  --color-border-default: #d0d7de;
  --color-border-muted: hsla(210, 18%, 87%, 1);
  --color-neutral-muted: rgba(175, 184, 193, 0.2);
  --color-accent-fg: #0969da;
  --color-accent-emphasis: #0969da;
  --color-attention-subtle: #fff8c5;
  --color-danger-fg: #cf222e;
`,ja=(0,Yr.default)(pr)`
  ${Ma}
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  color: var(--color-fg-default);
  background-color: var(--color-canvas-default);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;

  .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }
  h1:hover .anchor .octicon-link:before,
  h2:hover .anchor .octicon-link:before,
  h3:hover .anchor .octicon-link:before,
  h4:hover .anchor .octicon-link:before,
  h5:hover .anchor .octicon-link:before,
  h6:hover .anchor .octicon-link:before {
    width: 16px;
    height: 16px;
    content: ' ';
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
    mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  }

  details,
  figcaption,
  figure {
    display: block;
  }

  summary {
    display: list-item;
  }

  [hidden] {
    display: none !important;
  }

  a {
    background-color: transparent;
    color: var(--color-accent-fg);
    text-decoration: none;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: var(--base-text-weight-semibold, 600);
  }

  dfn {
    font-style: italic;
  }

  h1 {
    margin: 0.67em 0;
    font-weight: var(--base-text-weight-semibold, 600);
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid var(--color-border-muted);
  }

  mark {
    background-color: var(--color-attention-subtle);
    color: var(--color-fg-default);
  }

  small {
    font-size: 90%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
    background-color: var(--color-canvas-default);
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
    font-size: 1em;
  }

  figure {
    margin: 1em 40px;
  }

  hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid var(--color-border-muted);
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: var(--color-border-default);
    border: 0;
  }

  input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search']::-webkit-search-cancel-button,
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  ::placeholder {
    color: var(--color-fg-subtle);
    opacity: 1;
  }

  hr::before {
    display: table;
    content: '';
  }

  hr::after {
    display: table;
    clear: both;
    content: '';
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
    display: block;
    width: max-content;
    max-width: 100%;
    overflow: auto;
  }

  td,
  th {
    padding: 0;
  }

  details summary {
    cursor: pointer;
  }

  details:not([open]) > *:not(summary) {
    display: none !important;
  }

  a:focus,
  [role='button']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus {
    outline: 2px solid var(--color-accent-fg);
    outline-offset: -2px;
    box-shadow: none;
  }

  a:focus:not(:focus-visible),
  [role='button']:focus:not(:focus-visible),
  input[type='radio']:focus:not(:focus-visible),
  input[type='checkbox']:focus:not(:focus-visible) {
    outline: solid 1px transparent;
  }

  a:focus-visible,
  [role='button']:focus-visible,
  input[type='radio']:focus-visible,
  input[type='checkbox']:focus-visible {
    outline: 2px solid var(--color-accent-fg);
    outline-offset: -2px;
    box-shadow: none;
  }

  a:not([class]):focus,
  a:not([class]):focus-visible,
  input[type='radio']:focus,
  input[type='radio']:focus-visible,
  input[type='checkbox']:focus,
  input[type='checkbox']:focus-visible {
    outline-offset: 0;
  }

  kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    line-height: 10px;
    color: var(--color-fg-default);
    vertical-align: middle;
    background-color: var(--color-canvas-subtle);
    border: solid 1px var(--color-neutral-muted);
    border-bottom-color: var(--color-neutral-muted);
    border-radius: 6px;
    box-shadow: inset 0 -1px 0 var(--color-neutral-muted);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: var(--base-text-weight-semibold, 600);
    line-height: 1.25;
  }

  h2 {
    font-weight: var(--base-text-weight-semibold, 600);
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid var(--color-border-muted);
  }

  h3 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 1.25em;
  }

  h4 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 1em;
  }

  h5 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 0.875em;
  }

  h6 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 0.85em;
    color: var(--color-fg-muted);
  }

  p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  blockquote {
    margin: 0;
    padding: 0 1em;
    color: var(--color-fg-muted);
    border-left: 0.25em solid var(--color-border-default);
  }

  ul,
  ol {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2em;
  }

  ol ol,
  ul ol {
    list-style-type: lower-roman;
  }

  ul ul ol,
  ul ol ol,
  ol ul ol,
  ol ol ol {
    list-style-type: lower-alpha;
  }

  dd {
    margin-left: 0;
  }

  tt,
  code,
  samp {
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
  }

  pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
    word-wrap: normal;
  }

  .octicon {
    display: inline-block;
    overflow: visible !important;
    vertical-align: text-bottom;
    fill: currentColor;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .markdown-body::before {
    display: table;
    content: '';
  }

  .markdown-body::after {
    display: table;
    clear: both;
    content: '';
  }

  .markdown-body > *:first-child {
    margin-top: 0 !important;
  }

  .markdown-body > *:last-child {
    margin-bottom: 0 !important;
  }

  a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .absent {
    color: var(--color-danger-fg);
  }

  .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
  }

  .anchor:focus {
    outline: none;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre,
  details {
    margin-top: 0;
    margin-bottom: 16px;
  }

  blockquote > :first-child {
    margin-top: 0;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  h1 .octicon-link,
  h2 .octicon-link,
  h3 .octicon-link,
  h4 .octicon-link,
  h5 .octicon-link,
  h6 .octicon-link {
    color: var(--color-fg-default);
    vertical-align: middle;
    visibility: hidden;
  }

  h1:hover .anchor,
  h2:hover .anchor,
  h3:hover .anchor,
  h4:hover .anchor,
  h5:hover .anchor,
  h6:hover .anchor {
    text-decoration: none;
  }

  h1:hover .anchor .octicon-link,
  h2:hover .anchor .octicon-link,
  h3:hover .anchor .octicon-link,
  h4:hover .anchor .octicon-link,
  h5:hover .anchor .octicon-link,
  h6:hover .anchor .octicon-link {
    visibility: visible;
  }

  h1 tt,
  h1 code,
  h2 tt,
  h2 code,
  h3 tt,
  h3 code,
  h4 tt,
  h4 code,
  h5 tt,
  h5 code,
  h6 tt,
  h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }

  summary h1,
  summary h2,
  summary h3,
  summary h4,
  summary h5,
  summary h6 {
    display: inline-block;
  }

  summary h1 .anchor,
  summary h2 .anchor,
  summary h3 .anchor,
  summary h4 .anchor,
  summary h5 .anchor,
  summary h6 .anchor {
    margin-left: -40px;
  }

  summary h1,
  summary h2 {
    padding-bottom: 0;
    border-bottom: 0;
  }

  ul.no-list,
  ol.no-list {
    padding: 0;
    list-style-type: none;
  }

  ol[type='a'] {
    list-style-type: lower-alpha;
  }

  ol[type='A'] {
    list-style-type: upper-alpha;
  }

  ol[type='i'] {
    list-style-type: lower-roman;
  }

  ol[type='I'] {
    list-style-type: upper-roman;
  }

  ol[type='1'] {
    list-style-type: decimal;
  }

  div > ol:not([type]) {
    list-style-type: decimal;
  }

  ul ul,
  ul ol,
  ol ol,
  ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  li > p {
    margin-top: 16px;
  }

  li + li {
    margin-top: 0.25em;
  }

  dl {
    padding: 0;
  }

  dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: var(--base-text-weight-semibold, 600);
  }

  dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  table th {
    font-weight: var(--base-text-weight-semibold, 600);
  }

  table th,
  table td {
    padding: 6px 13px;
    border: 1px solid var(--color-border-default);
  }

  table tr {
    background-color: var(--color-canvas-default);
    border-top: 1px solid var(--color-border-muted);
  }

  table tr:nth-child(2n) {
    background-color: var(--color-canvas-subtle);
  }

  table img {
    background-color: transparent;
  }

  img[align='right'] {
    padding-left: 20px;
  }

  img[align='left'] {
    padding-right: 20px;
  }

  .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent;
  }

  span.frame {
    display: block;
    overflow: hidden;
  }

  span.frame > span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid var(--color-border-default);
  }

  span.frame span img {
    display: block;
    float: left;
  }

  span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: var(--color-fg-default);
  }

  span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
  }

  span.align-center > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center;
  }

  span.align-center span img {
    margin: 0 auto;
    text-align: center;
  }

  span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
  }

  span.align-right > span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right;
  }

  span.align-right span img {
    margin: 0;
    text-align: right;
  }

  span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden;
  }

  span.float-left span {
    margin: 13px 0 0;
  }

  span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden;
  }

  span.float-right > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right;
  }

  code,
  tt {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: var(--color-neutral-muted);
    border-radius: 6px;
  }

  code br,
  tt br {
    display: none;
  }

  del code {
    text-decoration: inherit;
  }

  samp {
    font-size: 85%;
  }

  pre code {
    font-size: 100%;
  }

  pre > code {
    padding: 0;
    margin: 0;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .highlight {
    margin-bottom: 16px;
  }

  .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .highlight pre,
  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: var(--color-canvas-subtle);
    border-radius: 6px;
  }

  pre code,
  pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  .csv-data td,
  .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
  }

  .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: var(--color-canvas-default);
    border: 0;
  }

  .csv-data tr {
    border-top: 0;
  }

  .csv-data th {
    font-weight: var(--base-text-weight-semibold, 600);
    background: var(--color-canvas-subtle);
    border-top: 0;
  }

  [data-footnote-ref]::before {
    content: '[';
  }

  [data-footnote-ref]::after {
    content: ']';
  }

  .footnotes {
    font-size: 12px;
    color: var(--color-fg-muted);
    border-top: 1px solid var(--color-border-default);
  }

  .footnotes ol {
    padding-left: 16px;
  }

  .footnotes ol ul {
    display: inline-block;
    padding-left: 16px;
    margin-top: 16px;
  }

  .footnotes li {
    position: relative;
  }

  .footnotes li:target::before {
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -24px;
    pointer-events: none;
    content: '';
    border: 2px solid var(--color-accent-emphasis);
    border-radius: 6px;
  }

  .footnotes li:target {
    color: var(--color-fg-default);
  }

  .footnotes .data-footnote-backref g-emoji {
    font-family: monospace;
  }

  .pl-c {
    color: var(--color-prettylights-syntax-comment);
  }

  .pl-c1,
  .pl-s .pl-v {
    color: var(--color-prettylights-syntax-constant);
  }

  .pl-e,
  .pl-en {
    color: var(--color-prettylights-syntax-entity);
  }

  .pl-smi,
  .pl-s .pl-s1 {
    color: var(--color-prettylights-syntax-storage-modifier-import);
  }

  .pl-ent {
    color: var(--color-prettylights-syntax-entity-tag);
  }

  .pl-k {
    color: var(--color-prettylights-syntax-keyword);
  }

  .pl-s,
  .pl-pds,
  .pl-s .pl-pse .pl-s1,
  .pl-sr,
  .pl-sr .pl-cce,
  .pl-sr .pl-sre,
  .pl-sr .pl-sra {
    color: var(--color-prettylights-syntax-string);
  }

  .pl-v,
  .pl-smw {
    color: var(--color-prettylights-syntax-variable);
  }

  .pl-bu {
    color: var(--color-prettylights-syntax-brackethighlighter-unmatched);
  }

  .pl-ii {
    color: var(--color-prettylights-syntax-invalid-illegal-text);
    background-color: var(--color-prettylights-syntax-invalid-illegal-bg);
  }

  .pl-c2 {
    color: var(--color-prettylights-syntax-carriage-return-text);
    background-color: var(--color-prettylights-syntax-carriage-return-bg);
  }

  .pl-sr .pl-cce {
    font-weight: bold;
    color: var(--color-prettylights-syntax-string-regexp);
  }

  .pl-ml {
    color: var(--color-prettylights-syntax-markup-list);
  }

  .pl-mh,
  .pl-mh .pl-en,
  .pl-ms {
    font-weight: bold;
    color: var(--color-prettylights-syntax-markup-heading);
  }

  .pl-mi {
    font-style: italic;
    color: var(--color-prettylights-syntax-markup-italic);
  }

  .pl-mb {
    font-weight: bold;
    color: var(--color-prettylights-syntax-markup-bold);
  }

  .pl-md {
    color: var(--color-prettylights-syntax-markup-deleted-text);
    background-color: var(--color-prettylights-syntax-markup-deleted-bg);
  }

  .pl-mi1 {
    color: var(--color-prettylights-syntax-markup-inserted-text);
    background-color: var(--color-prettylights-syntax-markup-inserted-bg);
  }

  .pl-mc {
    color: var(--color-prettylights-syntax-markup-changed-text);
    background-color: var(--color-prettylights-syntax-markup-changed-bg);
  }

  .pl-mi2 {
    color: var(--color-prettylights-syntax-markup-ignored-text);
    background-color: var(--color-prettylights-syntax-markup-ignored-bg);
  }

  .pl-mdr {
    font-weight: bold;
    color: var(--color-prettylights-syntax-meta-diff-range);
  }

  .pl-ba {
    color: var(--color-prettylights-syntax-brackethighlighter-angle);
  }

  .pl-sg {
    color: var(--color-prettylights-syntax-sublimelinter-gutter-mark);
  }

  .pl-corl {
    text-decoration: underline;
    color: var(--color-prettylights-syntax-constant-other-reference-link);
  }

  g-emoji {
    display: inline-block;
    min-width: 1ch;
    font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 1em;
    font-style: normal !important;
    font-weight: var(--base-text-weight-normal, 400);
    line-height: 1;
    vertical-align: -0.075em;
  }

  g-emoji img {
    width: 1em;
    height: 1em;
  }

  .task-list-item {
    list-style-type: none;
  }

  .task-list-item label {
    font-weight: var(--base-text-weight-normal, 400);
  }

  .task-list-item.enabled label {
    cursor: pointer;
  }

  .task-list-item + .task-list-item {
    margin-top: 4px;
  }

  .task-list-item .handle {
    display: none;
  }

  .task-list-item-checkbox {
    margin: 0 0.2em 0.25em -1.4em;
    vertical-align: middle;
  }

  .contains-task-list:dir(rtl) .task-list-item-checkbox {
    margin: 0 -1.6em 0.25em 0.2em;
  }

  .contains-task-list {
    position: relative;
  }

  .contains-task-list:hover .task-list-item-convert-container,
  .contains-task-list:focus-within .task-list-item-convert-container {
    display: block;
    width: auto;
    height: 24px;
    overflow: visible;
    clip: auto;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }
`,Ra={tokenize:$a,partial:!0},dr={tokenize:qa,partial:!0},hr={tokenize:Va,partial:!0},gr={tokenize:Wa,partial:!0},_a={tokenize:Qa,partial:!0},mr={tokenize:Ha,previous:xr},yr={tokenize:Ua,previous:kr},be={tokenize:Ba,previous:br},he={},Na={text:he},Fe=48;for(;Fe<123;)he[Fe]=be,Fe++,Fe===58?Fe=65:Fe===91&&(Fe=97);he[43]=be;he[45]=be;he[46]=be;he[95]=be;he[72]=[be,yr];he[104]=[be,yr];he[87]=[be,mr];he[119]=[be,mr];function Ba(e,t,n){let r=this,i,l;return o;function o(u){return!Dt(u)||!br.call(r,r.previous)||_t(r.events)?n(u):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(u))}function a(u){return Dt(u)?(e.consume(u),a):u===64?(e.consume(u),s):n(u)}function s(u){return u===46?e.check(_a,c,f)(u):u===45||u===95||Z(u)?(l=!0,e.consume(u),s):c(u)}function f(u){return e.consume(u),i=!0,s}function c(u){return l&&i&&ee(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(u)):n(u)}}function Ha(e,t,n){let r=this;return i;function i(o){return o!==87&&o!==119||!xr.call(r,r.previous)||_t(r.events)?n(o):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(Ra,e.attempt(dr,e.attempt(hr,l),n),n)(o))}function l(o){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(o)}}function Ua(e,t,n){let r=this,i="",l=!1;return o;function o(u){return(u===72||u===104)&&kr.call(r,r.previous)&&!_t(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),i+=String.fromCodePoint(u),e.consume(u),a):n(u)}function a(u){if(ee(u)&&i.length<5)return i+=String.fromCodePoint(u),e.consume(u),a;if(u===58){let h=i.toLowerCase();if(h==="http"||h==="https")return e.consume(u),s}return n(u)}function s(u){return u===47?(e.consume(u),l?f:(l=!0,s)):n(u)}function f(u){return u===null||Ke(u)||V(u)||Ae(u)||Ze(u)?n(u):e.attempt(dr,e.attempt(hr,c),n)(u)}function c(u){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(u)}}function $a(e,t,n){let r=0;return i;function i(o){return(o===87||o===119)&&r<3?(r++,e.consume(o),i):o===46&&r===3?(e.consume(o),l):n(o)}function l(o){return o===null?n(o):t(o)}}function qa(e,t,n){let r,i,l;return o;function o(f){return f===46||f===95?e.check(gr,s,a)(f):f===null||V(f)||Ae(f)||f!==45&&Ze(f)?s(f):(l=!0,e.consume(f),o)}function a(f){return f===95?r=!0:(i=r,r=void 0),e.consume(f),o}function s(f){return i||r||!l?n(f):t(f)}}function Va(e,t){let n=0,r=0;return i;function i(o){return o===40?(n++,e.consume(o),i):o===41&&r<n?l(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?e.check(gr,t,l)(o):o===null||V(o)||Ae(o)?t(o):(e.consume(o),i)}function l(o){return o===41&&r++,e.consume(o),i}}function Wa(e,t,n){return r;function r(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),r):a===38?(e.consume(a),l):a===93?(e.consume(a),i):a===60||a===null||V(a)||Ae(a)?t(a):n(a)}function i(a){return a===null||a===40||a===91||V(a)||Ae(a)?t(a):r(a)}function l(a){return ee(a)?o(a):n(a)}function o(a){return a===59?(e.consume(a),r):ee(a)?(e.consume(a),o):n(a)}}function Qa(e,t,n){return r;function r(l){return e.consume(l),i}function i(l){return Z(l)?n(l):t(l)}}function xr(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||V(e)}function kr(e){return!ee(e)}function br(e){return!(e===47||Dt(e))}function Dt(e){return e===43||e===45||e===46||e===95||Z(e)}function _t(e){let t=e.length,n=!1;for(;t--;){let r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}var Ya={tokenize:nu,partial:!0};function Ka(){return{document:{[91]:{tokenize:Za,continuation:{tokenize:eu},exit:tu}},text:{[91]:{tokenize:Ga},[93]:{add:"after",tokenize:Xa,resolveTo:Ja}}}}function Xa(e,t,n){let r=this,i=r.events.length,l=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),o;for(;i--;){let s=r.events[i][1];if(s.type==="labelImage"){o=s;break}if(s.type==="gfmFootnoteCall"||s.type==="labelLink"||s.type==="label"||s.type==="image"||s.type==="link")break}return a;function a(s){if(!o||!o._balanced)return n(s);let f=ce(r.sliceSerialize({start:o.end,end:r.now()}));return f.codePointAt(0)!==94||!l.includes(f.slice(1))?n(s):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(s),e.exit("gfmFootnoteCallLabelMarker"),t(s))}}function Ja(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";let r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;let l={type:"gfmFootnoteCallString",start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},l.start),end:Object.assign({},l.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",i,t],["exit",i,t],["enter",l,t],["enter",o,t],["exit",o,t],["exit",l,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function Ga(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),l=0,o;return a;function a(u){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(u),e.exit("gfmFootnoteCallLabelMarker"),s}function s(u){return u!==94?n(u):(e.enter("gfmFootnoteCallMarker"),e.consume(u),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",f)}function f(u){if(l>999||u===93&&!o||u===null||u===91||V(u))return n(u);if(u===93){e.exit("chunkString");let h=e.exit("gfmFootnoteCallString");return i.includes(ce(r.sliceSerialize(h)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(u),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(u)}return V(u)||(o=!0),l++,e.consume(u),u===92?c:f}function c(u){return u===91||u===92||u===93?(e.consume(u),l++,f):f(u)}}function Za(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),l,o=0,a;return s;function s(y){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionLabelMarker"),f}function f(y){return y===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",c):n(y)}function c(y){if(o>999||y===93&&!a||y===null||y===91||V(y))return n(y);if(y===93){e.exit("chunkString");let k=e.exit("gfmFootnoteDefinitionLabelString");return l=ce(r.sliceSerialize(k)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),h}return V(y)||(a=!0),o++,e.consume(y),y===92?u:c}function u(y){return y===91||y===92||y===93?(e.consume(y),o++,c):c(y)}function h(y){return y===58?(e.enter("definitionMarker"),e.consume(y),e.exit("definitionMarker"),i.includes(l)||i.push(l),H(e,p,"gfmFootnoteDefinitionWhitespace")):n(y)}function p(y){return t(y)}}function eu(e,t,n){return e.check($e,t,e.attempt(Ya,t,n))}function tu(e){e.exit("gfmFootnoteDefinition")}function nu(e,t,n){let r=this;return H(e,i,"gfmFootnoteDefinitionIndent",4+1);function i(l){let o=r.events[r.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?t(l):n(l)}}function ru(e){let t=(e||{}).singleTilde,n={tokenize:i,resolveAll:r};return t==null&&(t=!0),{text:{[126]:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function r(l,o){let a=-1;for(;++a<l.length;)if(l[a][0]==="enter"&&l[a][1].type==="strikethroughSequenceTemporary"&&l[a][1]._close){let s=a;for(;s--;)if(l[s][0]==="exit"&&l[s][1].type==="strikethroughSequenceTemporary"&&l[s][1]._open&&l[a][1].end.offset-l[a][1].start.offset===l[s][1].end.offset-l[s][1].start.offset){l[a][1].type="strikethroughSequence",l[s][1].type="strikethroughSequence";let f={type:"strikethrough",start:Object.assign({},l[s][1].start),end:Object.assign({},l[a][1].end)},c={type:"strikethroughText",start:Object.assign({},l[s][1].end),end:Object.assign({},l[a][1].start)},u=[["enter",f,o],["enter",l[s][1],o],["exit",l[s][1],o],["enter",c,o]],h=o.parser.constructs.insideSpan.null;h&&le(u,u.length,0,et(h,l.slice(s+1,a),o)),le(u,u.length,0,[["exit",c,o],["enter",l[a][1],o],["exit",l[a][1],o],["exit",f,o]]),le(l,s-1,a-s+3,u),a=s+u.length-2;break}}for(a=-1;++a<l.length;)l[a][1].type==="strikethroughSequenceTemporary"&&(l[a][1].type="data");return l}function i(l,o,a){let s=this.previous,f=this.events,c=0;return u;function u(p){return s===126&&f[f.length-1][1].type!=="characterEscape"?a(p):(l.enter("strikethroughSequenceTemporary"),h(p))}function h(p){let y=Xe(s);if(p===126)return c>1?a(p):(l.consume(p),c++,h);if(c<2&&!t)return a(p);let k=l.exit("strikethroughSequenceTemporary"),b=Xe(p);return k._open=!b||b===2&&!!y,k._close=!y||y===2&&!!b,o(p)}}}var lu=class{constructor(){this.map=[]}add(e,t,n){iu(this,e,t,n)}consume(e){if(this.map.sort((i,l)=>i[0]-l[0]),this.map.length===0)return;let t=this.map.length,n=[];for(;t>0;)t-=1,n.push(e.slice(this.map[t][0]+this.map[t][1])),n.push(this.map[t][2]),e.length=this.map[t][0];n.push([...e]),e.length=0;let r=n.pop();for(;r;)e.push(...r),r=n.pop();this.map.length=0}};function iu(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function ou(e,t){let n=!1,r=[];for(;t<e.length;){let i=e[t];if(n){if(i[0]==="enter")i[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(i[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){let l=r.length-1;r[l]=r[l]==="left"?"center":"right"}}else if(i[1].type==="tableDelimiterRow")break}else i[0]==="enter"&&i[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}var au={flow:{null:{tokenize:uu,resolveAll:su}}};function uu(e,t,n){let r=this,i=0,l=0,o;return a;function a(v){let D=r.events.length-1;for(;D>-1;){let W=r.events[D][1].type;if(W==="lineEnding"||W==="linePrefix")D--;else break}let T=D>-1?r.events[D][1].type:null,U=T==="tableHead"||T==="tableRow"?x:s;return U===x&&r.parser.lazy[r.now().line]?n(v):U(v)}function s(v){return e.enter("tableHead"),e.enter("tableRow"),f(v)}function f(v){return v===124||(o=!0,l+=1),c(v)}function c(v){return v===null?n(v):P(v)?l>1?(l=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(v),e.exit("lineEnding"),p):n(v):B(v)?H(e,c,"whitespace")(v):(l+=1,o&&(o=!1,i+=1),v===124?(e.enter("tableCellDivider"),e.consume(v),e.exit("tableCellDivider"),o=!0,c):(e.enter("data"),u(v)))}function u(v){return v===null||v===124||V(v)?(e.exit("data"),c(v)):(e.consume(v),v===92?h:u)}function h(v){return v===92||v===124?(e.consume(v),u):u(v)}function p(v){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(v):(e.enter("tableDelimiterRow"),o=!1,B(v)?H(e,y,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(v):y(v))}function y(v){return v===45||v===58?b(v):v===124?(o=!0,e.enter("tableCellDivider"),e.consume(v),e.exit("tableCellDivider"),k):I(v)}function k(v){return B(v)?H(e,b,"whitespace")(v):b(v)}function b(v){return v===58?(l+=1,o=!0,e.enter("tableDelimiterMarker"),e.consume(v),e.exit("tableDelimiterMarker"),d):v===45?(l+=1,d(v)):v===null||P(v)?O(v):I(v)}function d(v){return v===45?(e.enter("tableDelimiterFiller"),E(v)):I(v)}function E(v){return v===45?(e.consume(v),E):v===58?(o=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(v),e.exit("tableDelimiterMarker"),S):(e.exit("tableDelimiterFiller"),S(v))}function S(v){return B(v)?H(e,O,"whitespace")(v):O(v)}function O(v){return v===124?y(v):v===null||P(v)?!o||i!==l?I(v):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(v)):I(v)}function I(v){return n(v)}function x(v){return e.enter("tableRow"),A(v)}function A(v){return v===124?(e.enter("tableCellDivider"),e.consume(v),e.exit("tableCellDivider"),A):v===null||P(v)?(e.exit("tableRow"),t(v)):B(v)?H(e,A,"whitespace")(v):(e.enter("data"),j(v))}function j(v){return v===null||v===124||V(v)?(e.exit("data"),A(v)):(e.consume(v),v===92?N:j)}function N(v){return v===92||v===124?(e.consume(v),j):j(v)}}function su(e,t){let n=-1,r=!0,i=0,l=[0,0,0,0],o=[0,0,0,0],a=!1,s=0,f,c,u,h=new lu;for(;++n<e.length;){let p=e[n],y=p[1];p[0]==="enter"?y.type==="tableHead"?(a=!1,s!==0&&(bn(h,t,s,f,c),c=void 0,s=0),f={type:"table",start:Object.assign({},y.start),end:Object.assign({},y.end)},h.add(n,0,[["enter",f,t]])):y.type==="tableRow"||y.type==="tableDelimiterRow"?(r=!0,u=void 0,l=[0,0,0,0],o=[0,n+1,0,0],a&&(a=!1,c={type:"tableBody",start:Object.assign({},y.start),end:Object.assign({},y.end)},h.add(n,0,[["enter",c,t]])),i=y.type==="tableDelimiterRow"?2:c?3:1):i&&(y.type==="data"||y.type==="tableDelimiterMarker"||y.type==="tableDelimiterFiller")?(r=!1,o[2]===0&&(l[1]!==0&&(o[0]=o[1],u=Qe(h,t,l,i,void 0,u),l=[0,0,0,0]),o[2]=n)):y.type==="tableCellDivider"&&(r?r=!1:(l[1]!==0&&(o[0]=o[1],u=Qe(h,t,l,i,void 0,u)),l=o,o=[l[1],n,0,0])):y.type==="tableHead"?(a=!0,s=n):y.type==="tableRow"||y.type==="tableDelimiterRow"?(s=n,l[1]!==0?(o[0]=o[1],u=Qe(h,t,l,i,n,u)):o[1]!==0&&(u=Qe(h,t,o,i,n,u)),i=0):i&&(y.type==="data"||y.type==="tableDelimiterMarker"||y.type==="tableDelimiterFiller")&&(o[3]=n)}for(s!==0&&bn(h,t,s,f,c),h.consume(t.events),n=-1;++n<t.events.length;){let p=t.events[n];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=ou(t.events,n))}return e}function Qe(e,t,n,r,i,l){let o=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",a="tableContent";n[0]!==0&&(l.end=Object.assign({},Pe(t.events,n[0])),e.add(n[0],0,[["exit",l,t]]));let s=Pe(t.events,n[1]);if(l={type:o,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[["enter",l,t]]),n[2]!==0){let f=Pe(t.events,n[2]),c=Pe(t.events,n[3]),u={type:a,start:Object.assign({},f),end:Object.assign({},c)};if(e.add(n[2],0,[["enter",u,t]]),r!==2){let h=t.events[n[2]],p=t.events[n[3]];if(h[1].end=Object.assign({},p[1].end),h[1].type="chunkText",h[1].contentType="text",n[3]>n[2]+1){let y=n[2]+1,k=n[3]-n[2]-1;e.add(y,k,[])}}e.add(n[3]+1,0,[["exit",u,t]])}return i!==void 0&&(l.end=Object.assign({},Pe(t.events,i)),e.add(i,0,[["exit",l,t]]),l=void 0),l}function bn(e,t,n,r,i){let l=[],o=Pe(t.events,n);i&&(i.end=Object.assign({},o),l.push(["exit",i,t])),r.end=Object.assign({},o),l.push(["exit",r,t]),e.add(n+1,0,l)}function Pe(e,t){let n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}var cu={tokenize:pu},fu={text:{[91]:cu}};function pu(e,t,n){let r=this;return i;function i(s){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(s):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),l)}function l(s){return V(s)?(e.enter("taskListCheckValueUnchecked"),e.consume(s),e.exit("taskListCheckValueUnchecked"),o):s===88||s===120?(e.enter("taskListCheckValueChecked"),e.consume(s),e.exit("taskListCheckValueChecked"),o):n(s)}function o(s){return s===93?(e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(s)}function a(s){return P(s)?t(s):B(s)?e.check({tokenize:du},t,n)(s):n(s)}}function du(e,t,n){return H(e,r,"whitespace");function r(i){return i===null?n(i):t(i)}}function hu(e){return Mn([Na,Ka(),ru(e),au,fu])}function vn(e,t){let n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function gu(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}var mu={}.hasOwnProperty,yu=function(e,t,n,r){let i,l;typeof t=="string"||t instanceof RegExp?(l=[[t,n]],i=r):(l=t,i=n),i||(i={});let o=It(i.ignore||[]),a=xu(l),s=-1;for(;++s<a.length;)er(e,"text",f);return e;function f(u,h){let p=-1,y;for(;++p<h.length;){let k=h[p];if(o(k,y?y.children.indexOf(k):void 0,y))return;y=k}if(y)return c(u,h)}function c(u,h){let p=h[h.length-1],y=a[s][0],k=a[s][1],b=0,d=p.children.indexOf(u),E=!1,S=[];y.lastIndex=0;let O=y.exec(u.value);for(;O;){let I=O.index,x={index:O.index,input:O.input,stack:[...h,u]},A=k(...O,x);if(typeof A=="string"&&(A=A.length>0?{type:"text",value:A}:void 0),A!==!1&&(b!==I&&S.push({type:"text",value:u.value.slice(b,I)}),Array.isArray(A)?S.push(...A):A&&S.push(A),b=I+O[0].length,E=!0),!y.global)break;O=y.exec(u.value)}return E?(b<u.value.length&&S.push({type:"text",value:u.value.slice(b)}),p.children.splice(d,1,...S)):S=[u],d+S.length}};function xu(e){let t=[];if(typeof e!="object")throw new TypeError("Expected array or object as schema");if(Array.isArray(e)){let n=-1;for(;++n<e.length;)t.push([wn(e[n][0]),Sn(e[n][1])])}else{let n;for(n in e)mu.call(e,n)&&t.push([wn(n),Sn(e[n])])}return t}function wn(e){return typeof e=="string"?new RegExp(gu(e),"g"):e}function Sn(e){return typeof e=="function"?e:()=>e}var yt="phrasing",xt=["autolink","link","image","label"],ku={transforms:[Fu],enter:{literalAutolink:vu,literalAutolinkEmail:kt,literalAutolinkHttp:kt,literalAutolinkWww:kt},exit:{literalAutolink:Eu,literalAutolinkEmail:Cu,literalAutolinkHttp:wu,literalAutolinkWww:Su}},bu={unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:yt,notInConstruct:xt},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:yt,notInConstruct:xt},{character:":",before:"[ps]",after:"\\/",inConstruct:yt,notInConstruct:xt}]};function vu(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function kt(e){this.config.enter.autolinkProtocol.call(this,e)}function wu(e){this.config.exit.autolinkProtocol.call(this,e)}function Su(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.url="http://"+this.sliceSerialize(e)}function Cu(e){this.config.exit.autolinkEmail.call(this,e)}function Eu(e){this.exit(e)}function Fu(e){yu(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,Au],[/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g,Du]],{ignore:["link","linkReference"]})}function Au(e,t,n,r,i){let l="";if(!vr(i)||(/^w/i.test(t)&&(n=t+n,t="",l="http://"),!Ou(n)))return!1;let o=Tu(n+r);if(!o[0])return!1;let a={type:"link",title:null,url:l+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[a,{type:"text",value:o[1]}]:a}function Du(e,t,n,r){return!vr(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function Ou(e){let t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function Tu(e){let t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")"),i=vn(e,"("),l=vn(e,")");for(;r!==-1&&i>l;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),l++;return[e,n]}function vr(e,t){let n=e.input.charCodeAt(e.index-1);return(e.index===0||Ae(n)||Ze(n))&&(!t||n!==47)}function wr(e){return e.label||!e.identifier?e.label||"":Qn(e.identifier)}function zu(e,t,n){let r=t.indexStack,i=e.children||[],l=t.createTracker(n),o=[],a=-1;for(r.push(-1);++a<i.length;){let s=i[a];r[r.length-1]=a,o.push(l.move(t.handle(s,e,t,J({before:`
`,after:`
`},l.current())))),s.type!=="list"&&(t.bulletLastUsed=void 0),a<i.length-1&&o.push(l.move(Lu(s,i[a+1],e,t)))}return r.pop(),o.join("")}function Lu(e,t,n,r){let i=r.join.length;for(;i--;){let l=r.join[i](e,t,n,r);if(l===!0||l===1)break;if(typeof l=="number")return`
`.repeat(1+l);if(l===!1)return`

<!---->

`}return`

`}var Pu=/\r?\n|\r/g;function Iu(e,t){let n=[],r=0,i=0,l;for(;l=Pu.exec(e);)o(e.slice(r,l.index)),n.push(l[0]),r=l.index+l[0].length,i++;return o(e.slice(r)),n.join("");function o(a){n.push(t(a,i,!a))}}function Sr(e){if(!e._compiled){let t=(e.atBreak?"[\\r\\n][\\t ]*":"")+(e.before?"(?:"+e.before+")":"");e._compiled=new RegExp((t?"("+t+")":"")+(/[|\\{}()[\]^$+*?.-]/.test(e.character)?"\\":"")+e.character+(e.after?"(?:"+e.after+")":""),"g")}return e._compiled}function Mu(e,t){return Cn(e,t.inConstruct,!0)&&!Cn(e,t.notInConstruct,!1)}function Cn(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function Cr(e,t,n){let r=(n.before||"")+(t||"")+(n.after||""),i=[],l=[],o={},a=-1;for(;++a<e.unsafe.length;){let c=e.unsafe[a];if(!Mu(e.stack,c))continue;let u=Sr(c),h;for(;h=u.exec(r);){let p="before"in c||!!c.atBreak,y="after"in c,k=h.index+(p?h[1].length:0);i.includes(k)?(o[k].before&&!p&&(o[k].before=!1),o[k].after&&!y&&(o[k].after=!1)):(i.push(k),o[k]={before:p,after:y})}}i.sort(ju);let s=n.before?n.before.length:0,f=r.length-(n.after?n.after.length:0);for(a=-1;++a<i.length;){let c=i[a];c<s||c>=f||c+1<f&&i[a+1]===c+1&&o[c].after&&!o[c+1].before&&!o[c+1].after||i[a-1]===c-1&&o[c].before&&!o[c-1].before&&!o[c-1].after||(s!==c&&l.push(En(r.slice(s,c),"\\")),s=c,/[!-/:-@[-`{-~]/.test(r.charAt(c))&&(!n.encode||!n.encode.includes(r.charAt(c)))?l.push("\\"):(l.push("&#x"+r.charCodeAt(c).toString(16).toUpperCase()+";"),s++))}return l.push(En(r.slice(s,f),n.after)),l.join("")}function ju(e,t){return e-t}function En(e,t){let n=/\\(?=[!-/:-@[-`{-~])/g,r=[],i=[],l=e+t,o=-1,a=0,s;for(;s=n.exec(l);)r.push(s.index);for(;++o<r.length;)a!==r[o]&&i.push(e.slice(a,r[o])),i.push("\\"),a=r[o];return i.push(e.slice(a)),i.join("")}function nt(e){let t=e||{},n=t.now||{},r=t.lineShift||0,i=n.line||1,l=n.column||1;return{move:s,current:o,shift:a};function o(){return{now:{line:i,column:l},lineShift:r}}function a(f){r+=f}function s(f){let c=f||"",u=c.split(/\r?\n|\r/g),h=u[u.length-1];return i+=u.length-1,l=u.length===1?l+h.length:1+h.length+r,c}}Er.peek=Qu;function Ru(){return{enter:{gfmFootnoteDefinition:Nu,gfmFootnoteDefinitionLabelString:Bu,gfmFootnoteCall:$u,gfmFootnoteCallString:qu},exit:{gfmFootnoteDefinition:Uu,gfmFootnoteDefinitionLabelString:Hu,gfmFootnoteCall:Wu,gfmFootnoteCallString:Vu}}}function _u(){return{unsafe:[{character:"[",inConstruct:["phrasing","label","reference"]}],handlers:{footnoteDefinition:Yu,footnoteReference:Er}}}function Nu(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function Bu(){this.buffer()}function Hu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=ce(this.sliceSerialize(e)).toLowerCase()}function Uu(e){this.exit(e)}function $u(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function qu(){this.buffer()}function Vu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=ce(this.sliceSerialize(e)).toLowerCase()}function Wu(e){this.exit(e)}function Er(e,t,n,r){let i=nt(r),l=i.move("[^"),o=n.enter("footnoteReference"),a=n.enter("reference");return l+=i.move(Cr(n,wr(e),Se(J({},i.current()),{before:l,after:"]"}))),a(),o(),l+=i.move("]"),l}function Qu(){return"["}function Yu(e,t,n,r){let i=nt(r),l=i.move("[^"),o=n.enter("footnoteDefinition"),a=n.enter("label");return l+=i.move(Cr(n,wr(e),Se(J({},i.current()),{before:l,after:"]"}))),a(),l+=i.move("]:"+(e.children&&e.children.length>0?" ":"")),i.shift(4),l+=i.move(Iu(zu(e,n,i.current()),Ku)),o(),l}function Ku(e,t,n){return t===0?e:(n?"":"    ")+e}function Fr(e,t,n){let r=t.indexStack,i=e.children||[],l=[],o=-1,a=n.before;r.push(-1);let s=t.createTracker(n);for(;++o<i.length;){let f=i[o],c;if(r[r.length-1]=o,o+1<i.length){let u=t.handle.handlers[i[o+1].type];u&&u.peek&&(u=u.peek),c=u?u(i[o+1],e,t,J({before:"",after:""},s.current())).charAt(0):""}else c=n.after;l.length>0&&(a==="\r"||a===`
`)&&f.type==="html"&&(l[l.length-1]=l[l.length-1].replace(/(\r?\n|\r)$/," "),a=" ",s=t.createTracker(n),s.move(l.join(""))),l.push(s.move(t.handle(f,e,t,Se(J({},s.current()),{before:a,after:c})))),a=l[l.length-1].slice(-1)}return r.pop(),l.join("")}var Xu=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Ar.peek=ts;var Ju={canContainEols:["delete"],enter:{strikethrough:Zu},exit:{strikethrough:es}},Gu={unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:Xu}],handlers:{delete:Ar}};function Zu(e){this.enter({type:"delete",children:[]},e)}function es(e){this.exit(e)}function Ar(e,t,n,r){let i=nt(r),l=n.enter("strikethrough"),o=i.move("~~");return o+=Fr(e,n,Se(J({},i.current()),{before:o,after:"~"})),o+=i.move("~~"),l(),o}function ts(){return"~"}Dr.peek=ns;function Dr(e,t,n){let r=e.value||"",i="`",l=-1;for(;new RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++l<n.unsafe.length;){let o=n.unsafe[l],a=Sr(o),s;if(o.atBreak)for(;s=a.exec(r);){let f=s.index;r.charCodeAt(f)===10&&r.charCodeAt(f-1)===13&&f--,r=r.slice(0,f)+" "+r.slice(s.index+1)}}return i+r+i}function ns(){return"`"}function rs(e,t={}){let n=(t.align||[]).concat(),r=t.stringLength||is,i=[],l=[],o=[],a=[],s=0,f=-1;for(;++f<e.length;){let y=[],k=[],b=-1;for(e[f].length>s&&(s=e[f].length);++b<e[f].length;){let d=ls(e[f][b]);if(t.alignDelimiters!==!1){let E=r(d);k[b]=E,(a[b]===void 0||E>a[b])&&(a[b]=E)}y.push(d)}l[f]=y,o[f]=k}let c=-1;if(typeof n=="object"&&"length"in n)for(;++c<s;)i[c]=Fn(n[c]);else{let y=Fn(n);for(;++c<s;)i[c]=y}c=-1;let u=[],h=[];for(;++c<s;){let y=i[c],k="",b="";y===99?(k=":",b=":"):y===108?k=":":y===114&&(b=":");let d=t.alignDelimiters===!1?1:Math.max(1,a[c]-k.length-b.length),E=k+"-".repeat(d)+b;t.alignDelimiters!==!1&&(d=k.length+d+b.length,d>a[c]&&(a[c]=d),h[c]=d),u[c]=E}l.splice(1,0,u),o.splice(1,0,h),f=-1;let p=[];for(;++f<l.length;){let y=l[f],k=o[f];c=-1;let b=[];for(;++c<s;){let d=y[c]||"",E="",S="";if(t.alignDelimiters!==!1){let O=a[c]-(k[c]||0),I=i[c];I===114?E=" ".repeat(O):I===99?O%2?(E=" ".repeat(O/2+.5),S=" ".repeat(O/2-.5)):(E=" ".repeat(O/2),S=E):S=" ".repeat(O)}t.delimiterStart!==!1&&!c&&b.push("|"),t.padding!==!1&&!(t.alignDelimiters===!1&&d==="")&&(t.delimiterStart!==!1||c)&&b.push(" "),t.alignDelimiters!==!1&&b.push(E),b.push(d),t.alignDelimiters!==!1&&b.push(S),t.padding!==!1&&b.push(" "),(t.delimiterEnd!==!1||c!==s-1)&&b.push("|")}p.push(t.delimiterEnd===!1?b.join("").replace(/ +$/,""):b.join(""))}return p.join(`
`)}function ls(e){return e==null?"":String(e)}function is(e){return e.length}function Fn(e){let t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}var os={enter:{table:as,tableData:An,tableHeader:An,tableRow:ss},exit:{codeText:cs,table:us,tableData:bt,tableHeader:bt,tableRow:bt}};function as(e){let t=e._align;this.enter({type:"table",align:t.map(n=>n==="none"?null:n),children:[]},e),this.setData("inTable",!0)}function us(e){this.exit(e),this.setData("inTable")}function ss(e){this.enter({type:"tableRow",children:[]},e)}function bt(e){this.exit(e)}function An(e){this.enter({type:"tableCell",children:[]},e)}function cs(e){let t=this.resume();this.getData("inTable")&&(t=t.replace(/\\([\\|])/g,fs));let n=this.stack[this.stack.length-1];n.value=t,this.exit(e)}function fs(e,t){return t==="|"?t:e}function ps(e){let t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,l=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{table:o,tableRow:a,tableCell:s,inlineCode:h}};function o(p,y,k,b){return f(c(p,k,b),p.align)}function a(p,y,k,b){let d=u(p,k,b),E=f([d]);return E.slice(0,E.indexOf(`
`))}function s(p,y,k,b){let d=k.enter("tableCell"),E=k.enter("phrasing"),S=Fr(p,k,Se(J({},b),{before:l,after:l}));return E(),d(),S}function f(p,y){return rs(p,{align:y,alignDelimiters:r,padding:n,stringLength:i})}function c(p,y,k){let b=p.children,d=-1,E=[],S=y.enter("table");for(;++d<b.length;)E[d]=u(b[d],y,k);return S(),E}function u(p,y,k){let b=p.children,d=-1,E=[],S=y.enter("tableRow");for(;++d<b.length;)E[d]=s(b[d],p,y,k);return S(),E}function h(p,y,k){let b=Dr(p,y,k);return k.stack.includes("tableCell")&&(b=b.replace(/\|/g,"\\$&")),b}}function ds(e){let t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function hs(e){let t=e.options.listItemIndent||"tab";if(t===1||t==="1")return"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function gs(e,t,n,r){let i=hs(n),l=n.bulletCurrent||ds(n);t&&t.type==="list"&&t.ordered&&(l=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+l);let o=l.length+1;(i==="tab"||i==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(o=Math.ceil(o/4)*4);let a=n.createTracker(r);a.move(l+" ".repeat(o-l.length)),a.shift(o);let s=n.enter("listItem"),f=n.indentLines(n.containerFlow(e,a.current()),c);return s(),f;function c(u,h,p){return h?(p?"":" ".repeat(o))+u:(p?l:l+" ".repeat(o-l.length))+u}}var ms={exit:{taskListCheckValueChecked:Dn,taskListCheckValueUnchecked:Dn,paragraph:xs}},ys={unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:ks}};function Dn(e){let t=this.stack[this.stack.length-2];t.checked=e.type==="taskListCheckValueChecked"}function xs(e){let t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){let n=this.stack[this.stack.length-1],r=n.children[0];if(r&&r.type==="text"){let i=t.children,l=-1,o;for(;++l<i.length;){let a=i[l];if(a.type==="paragraph"){o=a;break}}o===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function ks(e,t,n,r){let i=e.children[0],l=typeof e.checked=="boolean"&&i&&i.type==="paragraph",o="["+(e.checked?"x":" ")+"] ",a=nt(r);l&&a.move(o);let s=gs(e,t,n,J(J({},r),a.current()));return l&&(s=s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,f)),s;function f(c){return c+o}}function bs(){return[ku,Ru(),Ju,os,ms]}function vs(e){return{extensions:[bu,_u(),Gu,ps(e),ys]}}function ws(e={}){let t=this.data();n("micromarkExtensions",hu(e)),n("fromMarkdownExtensions",bs()),n("toMarkdownExtensions",vs(e));function n(r,i){(t[r]?t[r]:t[r]=[]).push(i)}}var Or=de(Ot(),1);function Ss(e){return Or.default.createElement("a",{href:e.href,target:"_blank",rel:"noreferrer"},e.children)}function Es({source:e}){return Or.default.createElement(ja,{components:{a:Ss},rehypePlugins:[ws]},e)}/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

react-is/cjs/react-is.production.min.js:
  (**
   * @license React
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/export{Es as default};
