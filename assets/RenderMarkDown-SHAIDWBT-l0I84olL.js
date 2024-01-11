import{z as de,q as Br,j as Tt,D as Tn,W as Nr,E as Ae,M as we,I as J}from"./index-fx5UiPgD.js";var On=Ae((e,t)=>{t.exports=function(n){return n!=null&&n.constructor!=null&&typeof n.constructor.isBuffer=="function"&&n.constructor.isBuffer(n)}}),Hr=Ae((e,t)=>{var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,i=Object.defineProperty,l=Object.getOwnPropertyDescriptor,o=function(c){return typeof Array.isArray=="function"?Array.isArray(c):r.call(c)==="[object Array]"},a=function(c){if(!c||r.call(c)!=="[object Object]")return!1;var u=n.call(c,"constructor"),d=c.constructor&&c.constructor.prototype&&n.call(c.constructor.prototype,"isPrototypeOf");if(c.constructor&&!u&&!d)return!1;var p;for(p in c);return typeof p>"u"||n.call(c,p)},s=function(c,u){i&&u.name==="__proto__"?i(c,u.name,{enumerable:!0,configurable:!0,value:u.newValue,writable:!0}):c[u.name]=u.newValue},f=function(c,u){if(u==="__proto__")if(n.call(c,u)){if(l)return l(c,u).value}else return;return c[u]};t.exports=function c(){var u,d,p,y,b,w,g=arguments[0],E=1,S=arguments.length,T=!1;for(typeof g=="boolean"&&(T=g,g=arguments[1]||{},E=2),(g==null||typeof g!="object"&&typeof g!="function")&&(g={});E<S;++E)if(u=arguments[E],u!=null)for(d in u)p=f(g,d),y=f(u,d),g!==y&&(T&&y&&(a(y)||(b=o(y)))?(b?(b=!1,w=p&&o(p)?p:[]):w=p&&a(p)?p:{},s(g,{name:d,newValue:c(T,w,y)})):typeof y<"u"&&s(g,{name:d,newValue:y}));return g}}),Ur=Ae((e,t)=>{var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";t.exports=n}),qr=Ae((e,t)=>{var n=Ur();function r(){}function i(){}i.resetWarningCache=r,t.exports=function(){function l(s,f,c,u,d,p){if(p!==n){var y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw y.name="Invariant Violation",y}}l.isRequired=l;function o(){return l}var a={array:l,bigint:l,bool:l,func:l,number:l,object:l,string:l,symbol:l,any:l,arrayOf:o,element:l,elementType:l,instanceOf:o,node:l,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:i,resetWarningCache:r};return a.PropTypes=a,a}}),Vr=Ae((e,t)=>{t.exports=qr()()}),Wr=Ae((e,t)=>{var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,i=/^\s*/,l=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,s=/^[;\s]*/,f=/^\s+|\s+$/g,c=`
`,u="/",d="*",p="",y="comment",b="declaration";t.exports=function(g,E){if(typeof g!="string")throw new TypeError("First argument must be a string");if(!g)return[];E=E||{};var S=1,T=1;function z(P){var L=P.match(r);L&&(S+=L.length);var q=P.lastIndexOf(c);T=~q?P.length-q:T+P.length}function k(){var P={line:S,column:T};return function(L){return L.position=new A(P),x(),L}}function A(P){this.start=P,this.end={line:S,column:T},this.source=E.source}A.prototype.content=g;function R(P){var L=new Error(E.source+":"+S+":"+T+": "+P);if(L.reason=P,L.filename=E.source,L.line=S,L.column=T,L.source=g,!E.silent)throw L}function B(P){var L=P.exec(g);if(L){var q=L[0];return z(q),g=g.slice(q.length),L}}function x(){B(i)}function D(P){var L;for(P=P||[];L=O();)L!==!1&&P.push(L);return P}function O(){var P=k();if(!(u!=g.charAt(0)||d!=g.charAt(1))){for(var L=2;p!=g.charAt(L)&&(d!=g.charAt(L)||u!=g.charAt(L+1));)++L;if(L+=2,p===g.charAt(L-1))return R("End of comment missing");var q=g.slice(2,L-2);return T+=2,z(q),g=g.slice(L),T+=2,P({type:y,comment:q})}}function U(){var P=k(),L=B(l);if(L){if(O(),!B(o))return R("property missing ':'");var q=B(a),ne=P({type:b,property:w(L[0].replace(n,p)),value:q?w(q[0].replace(n,p)):p});return B(s),ne}}function $(){var P=[];D(P);for(var L;L=U();)L!==!1&&(P.push(L),D(P));return P}return x(),$()};function w(g){return g?g.replace(f,p):p}}),$r=Ae((e,t)=>{var n=Wr();function r(i,l){var o=null;if(!i||typeof i!="string")return o;for(var a,s=n(i),f=typeof l=="function",c,u,d=0,p=s.length;d<p;d++)a=s[d],c=a.property,u=a.value,f?l(c,u,a):u&&(o||(o={}),o[c]=u);return o}t.exports=r,t.exports.default=r}),Qr=de(Br(),1),Wt=["http","https","mailto","tel"];function Kr(e){let t=(e||"").trim(),n=t.charAt(0);if(n==="#"||n==="/")return t;let r=t.indexOf(":");if(r===-1)return t;let i=-1;for(;++i<Wt.length;){let l=Wt[i];if(r===l.length&&t.slice(0,l.length).toLowerCase()===l)return t}return i=t.indexOf("?"),i!==-1&&r>i||(i=t.indexOf("#"),i!==-1&&r>i)?t:"javascript:void(0)"}var it=de(Tt(),1),Yr=de(On(),1);function Ne(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?$t(e.position):"start"in e||"end"in e?$t(e):"line"in e||"column"in e?vt(e):""}function vt(e){return Qt(e&&e.line)+":"+Qt(e&&e.column)}function $t(e){return vt(e&&e.start)+"-"+vt(e&&e.end)}function Qt(e){return e&&typeof e=="number"?e:1}var oe=class extends Error{constructor(e,t,n){let r=[null,null],i={start:{line:null,column:null},end:{line:null,column:null}};if(super(),typeof t=="string"&&(n=t,t=void 0),typeof n=="string"){let l=n.indexOf(":");l===-1?r[1]=n:(r[0]=n.slice(0,l),r[1]=n.slice(l+1))}t&&("type"in t||"position"in t?t.position&&(i=t.position):"start"in t||"end"in t?i=t:("line"in t||"column"in t)&&(i.start=t)),this.name=Ne(t)||"1:1",this.message=typeof e=="object"?e.message:e,this.stack="",typeof e=="object"&&e.stack&&(this.stack=e.stack),this.reason=this.message,this.fatal,this.line=i.start.line,this.column=i.start.column,this.position=i,this.source=r[0],this.ruleId=r[1],this.file,this.actual,this.expected,this.url,this.note}};oe.prototype.file="";oe.prototype.name="";oe.prototype.reason="";oe.prototype.message="";oe.prototype.stack="";oe.prototype.fatal=null;oe.prototype.column=null;oe.prototype.line=null;oe.prototype.source=null;oe.prototype.ruleId=null;oe.prototype.position=null;var pe={basename:Xr,dirname:Jr,extname:Zr,join:Gr,sep:"/"};function Xr(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Ue(e);let n=0,r=-1,i=e.length,l;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.charCodeAt(i)===47){if(l){n=i+1;break}}else r<0&&(l=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let o=-1,a=t.length-1;for(;i--;)if(e.charCodeAt(i)===47){if(l){n=i+1;break}}else o<0&&(l=!0,o=i+1),a>-1&&(e.charCodeAt(i)===t.charCodeAt(a--)?a<0&&(r=i):(a=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function Jr(e){if(Ue(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.charCodeAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.charCodeAt(0)===47?"/":".":t===1&&e.charCodeAt(0)===47?"//":e.slice(0,t)}function Zr(e){Ue(e);let t=e.length,n=-1,r=0,i=-1,l=0,o;for(;t--;){let a=e.charCodeAt(t);if(a===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),a===46?i<0?i=t:l!==1&&(l=1):i>-1&&(l=-1)}return i<0||n<0||l===0||l===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function Gr(...e){let t=-1,n;for(;++t<e.length;)Ue(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":el(n)}function el(e){Ue(e);let t=e.charCodeAt(0)===47,n=tl(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.charCodeAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function tl(e,t){let n="",r=0,i=-1,l=0,o=-1,a,s;for(;++o<=e.length;){if(o<e.length)a=e.charCodeAt(o);else{if(a===47)break;a=47}if(a===47){if(!(i===o-1||l===1))if(i!==o-1&&l===2){if(n.length<2||r!==2||n.charCodeAt(n.length-1)!==46||n.charCodeAt(n.length-2)!==46){if(n.length>2){if(s=n.lastIndexOf("/"),s!==n.length-1){s<0?(n="",r=0):(n=n.slice(0,s),r=n.length-1-n.lastIndexOf("/")),i=o,l=0;continue}}else if(n.length>0){n="",r=0,i=o,l=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1;i=o,l=0}else a===46&&l>-1?l++:l=-1}return n}function Ue(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}var nl={cwd:rl};function rl(){return"/"}function wt(e){return e!==null&&typeof e=="object"&&e.href&&e.origin}function ll(e){if(typeof e=="string")e=new URL(e);else if(!wt(e)){let t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){let t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return il(e)}function il(e){if(e.hostname!==""){let r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}let t=e.pathname,n=-1;for(;++n<t.length;)if(t.charCodeAt(n)===37&&t.charCodeAt(n+1)===50){let r=t.charCodeAt(n+2);if(r===70||r===102){let i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}var ot=["history","path","basename","stem","extname","dirname"],Pn=class{constructor(e){let t;e?typeof e=="string"||ol(e)?t={value:e}:wt(e)?t={path:e}:t=e:t={},this.data={},this.messages=[],this.history=[],this.cwd=nl.cwd(),this.value,this.stored,this.result,this.map;let n=-1;for(;++n<ot.length;){let i=ot[n];i in t&&t[i]!==void 0&&t[i]!==null&&(this[i]=i==="history"?[...t[i]]:t[i])}let r;for(r in t)ot.includes(r)||(this[r]=t[r])}get path(){return this.history[this.history.length-1]}set path(e){wt(e)&&(e=ll(e)),ut(e,"path"),this.path!==e&&this.history.push(e)}get dirname(){return typeof this.path=="string"?pe.dirname(this.path):void 0}set dirname(e){Kt(this.basename,"dirname"),this.path=pe.join(e||"",this.basename)}get basename(){return typeof this.path=="string"?pe.basename(this.path):void 0}set basename(e){ut(e,"basename"),at(e,"basename"),this.path=pe.join(this.dirname||"",e)}get extname(){return typeof this.path=="string"?pe.extname(this.path):void 0}set extname(e){if(at(e,"extname"),Kt(this.dirname,"extname"),e){if(e.charCodeAt(0)!==46)throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=pe.join(this.dirname,this.stem+(e||""))}get stem(){return typeof this.path=="string"?pe.basename(this.path,this.extname):void 0}set stem(e){ut(e,"stem"),at(e,"stem"),this.path=pe.join(this.dirname||"",e+(this.extname||""))}toString(e){return(this.value||"").toString(e||void 0)}message(e,t,n){let r=new oe(e,t,n);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=null,r}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}};function at(e,t){if(e&&e.includes(pe.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+pe.sep+"`")}function ut(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function Kt(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function ol(e){return(0,Yr.default)(e)}function Yt(e){if(e)throw e}var al=de(On(),1),Xt=de(Hr(),1);function St(e){if(typeof e!="object"||e===null)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ul(){let e=[],t={run:n,use:r};return t;function n(...i){let l=-1,o=i.pop();if(typeof o!="function")throw new TypeError("Expected function as last argument, not "+o);a(null,...i);function a(s,...f){let c=e[++l],u=-1;if(s){o(s);return}for(;++u<i.length;)(f[u]===null||f[u]===void 0)&&(f[u]=i[u]);i=f,c?sl(c,a)(...f):o(null,...f)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function sl(e,t){let n;return r;function r(...o){let a=e.length>o.length,s;a&&o.push(i);try{s=e.apply(this,o)}catch(f){let c=f;if(a&&n)throw c;return i(c)}a||(s instanceof Promise?s.then(l,i):s instanceof Error?i(s):l(s))}function i(o,...a){n||(n=!0,t(o,...a))}function l(o){i(null,o)}}var cl=In().freeze(),Ln={}.hasOwnProperty;function In(){let e=ul(),t=[],n={},r,i=-1;return l.data=o,l.Parser=void 0,l.Compiler=void 0,l.freeze=a,l.attachers=t,l.use=s,l.parse=f,l.stringify=c,l.run=u,l.runSync=d,l.process=p,l.processSync=y,l;function l(){let b=In(),w=-1;for(;++w<t.length;)b.use(...t[w]);return b.data((0,Xt.default)(!0,{},n)),b}function o(b,w){return typeof b=="string"?arguments.length===2?(ft("data",r),n[b]=w,l):Ln.call(n,b)&&n[b]||null:b?(ft("data",r),n=b,l):n}function a(){if(r)return l;for(;++i<t.length;){let[b,...w]=t[i];if(w[0]===!1)continue;w[0]===!0&&(w[0]=void 0);let g=b.call(l,...w);typeof g=="function"&&e.use(g)}return r=!0,i=Number.POSITIVE_INFINITY,l}function s(b,...w){let g;if(ft("use",r),b!=null)if(typeof b=="function")z(b,...w);else if(typeof b=="object")Array.isArray(b)?T(b):S(b);else throw new TypeError("Expected usable value, not `"+b+"`");return g&&(n.settings=Object.assign(n.settings||{},g)),l;function E(k){if(typeof k=="function")z(k);else if(typeof k=="object")if(Array.isArray(k)){let[A,...R]=k;z(A,...R)}else S(k);else throw new TypeError("Expected usable value, not `"+k+"`")}function S(k){T(k.plugins),k.settings&&(g=Object.assign(g||{},k.settings))}function T(k){let A=-1;if(k!=null)if(Array.isArray(k))for(;++A<k.length;){let R=k[A];E(R)}else throw new TypeError("Expected a list of plugins, not `"+k+"`")}function z(k,A){let R=-1,B;for(;++R<t.length;)if(t[R][0]===k){B=t[R];break}B?(St(B[1])&&St(A)&&(A=(0,Xt.default)(!0,B[1],A)),B[1]=A):t.push([...arguments])}}function f(b){l.freeze();let w=Be(b),g=l.Parser;return st("parse",g),Jt(g,"parse")?new g(String(w),w).parse():g(String(w),w)}function c(b,w){l.freeze();let g=Be(w),E=l.Compiler;return ct("stringify",E),Zt(b),Jt(E,"compile")?new E(b,g).compile():E(b,g)}function u(b,w,g){if(Zt(b),l.freeze(),!g&&typeof w=="function"&&(g=w,w=void 0),!g)return new Promise(E);E(null,g);function E(S,T){e.run(b,Be(w),z);function z(k,A,R){A=A||b,k?T(k):S?S(A):g(null,A,R)}}}function d(b,w){let g,E;return l.run(b,w,S),Gt("runSync","run",E),g;function S(T,z){Yt(T),g=z,E=!0}}function p(b,w){if(l.freeze(),st("process",l.Parser),ct("process",l.Compiler),!w)return new Promise(g);g(null,w);function g(E,S){let T=Be(b);l.run(l.parse(T),T,(k,A,R)=>{if(k||!A||!R)z(k);else{let B=l.stringify(A,R);B==null||(dl(B)?R.value=B:R.result=B),z(k,R)}});function z(k,A){k||!A?S(k):E?E(A):w(null,A)}}}function y(b){let w;l.freeze(),st("processSync",l.Parser),ct("processSync",l.Compiler);let g=Be(b);return l.process(g,E),Gt("processSync","process",w),g;function E(S){w=!0,Yt(S)}}}function Jt(e,t){return typeof e=="function"&&e.prototype&&(fl(e.prototype)||t in e.prototype)}function fl(e){let t;for(t in e)if(Ln.call(e,t))return!0;return!1}function st(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `Parser`")}function ct(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `Compiler`")}function ft(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function Zt(e){if(!St(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function Gt(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function Be(e){return pl(e)?e:new Pn(e)}function pl(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function dl(e){return typeof e=="string"||(0,al.default)(e)}var hl={};function ml(e,t){let n=t||hl,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return zn(e,r,i)}function zn(e,t,n){if(gl(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return en(e.children,t,n)}return Array.isArray(e)?en(e,t,n):""}function en(e,t,n){let r=[],i=-1;for(;++i<e.length;)r[i]=zn(e[i],t,n);return r.join("")}function gl(e){return!!(e&&typeof e=="object")}function le(e,t,n,r){let i=e.length,l=0,o;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);l<r.length;)o=r.slice(l,l+1e4),o.unshift(t,0),e.splice(...o),l+=1e4,t+=1e4}function ie(e,t){return e.length>0?(le(e,e.length,0,t),e):t}var tn={}.hasOwnProperty;function Mn(e){let t={},n=-1;for(;++n<e.length;)yl(t,e[n]);return t}function yl(e,t){let n;for(n in t){let r=(tn.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n],l;if(i)for(l in i){tn.call(r,l)||(r[l]=[]);let o=i[l];kl(r[l],Array.isArray(o)?o:o?[o]:[])}}}function kl(e,t){let n=-1,r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);le(e,0,0,r)}var bl=/[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,ee=Se(/[A-Za-z]/),G=Se(/[\dA-Za-z]/),xl=Se(/[#-'*+\--9=?A-Z^-~]/);function Ye(e){return e!==null&&(e<32||e===127)}var Ct=Se(/\d/),vl=Se(/[\dA-Fa-f]/),wl=Se(/[!-/:-@[-`{-~]/);function I(e){return e!==null&&e<-2}function W(e){return e!==null&&(e<0||e===32)}function N(e){return e===-2||e===-1||e===32}var Ge=Se(bl),Ee=Se(/\s/);function Se(e){return t;function t(n){return n!==null&&e.test(String.fromCharCode(n))}}function H(e,t,n,r){let i=r?r-1:Number.POSITIVE_INFINITY,l=0;return o;function o(s){return N(s)?(e.enter(n),a(s)):t(s)}function a(s){return N(s)&&l++<i?(e.consume(s),a):(e.exit(n),t(s))}}var Sl={tokenize:Cl};function Cl(e){let t=e.attempt(this.parser.constructs.contentInitial,r,i),n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),H(e,t,"linePrefix")}function i(a){return e.enter("paragraph"),l(a)}function l(a){let s=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=s),n=s,o(a)}function o(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return I(a)?(e.consume(a),e.exit("chunkText"),l):(e.consume(a),o)}}var Fl={tokenize:El},nn={tokenize:Al};function El(e){let t=this,n=[],r=0,i,l,o;return a;function a(S){if(r<n.length){let T=n[r];return t.containerState=T[1],e.attempt(T[0].continuation,s,f)(S)}return f(S)}function s(S){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&E();let T=t.events.length,z=T,k;for(;z--;)if(t.events[z][0]==="exit"&&t.events[z][1].type==="chunkFlow"){k=t.events[z][1].end;break}g(r);let A=T;for(;A<t.events.length;)t.events[A][1].end=Object.assign({},k),A++;return le(t.events,z+1,0,t.events.slice(T)),t.events.length=A,f(S)}return a(S)}function f(S){if(r===n.length){if(!i)return d(S);if(i.currentConstruct&&i.currentConstruct.concrete)return y(S);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(nn,c,u)(S)}function c(S){return i&&E(),g(r),d(S)}function u(S){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,y(S)}function d(S){return t.containerState={},e.attempt(nn,p,y)(S)}function p(S){return r++,n.push([t.currentConstruct,t.containerState]),d(S)}function y(S){if(S===null){i&&E(),g(0),e.consume(S);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{contentType:"flow",previous:l,_tokenizer:i}),b(S)}function b(S){if(S===null){w(e.exit("chunkFlow"),!0),g(0),e.consume(S);return}return I(S)?(e.consume(S),w(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(S),b)}function w(S,T){let z=t.sliceStream(S);if(T&&z.push(null),S.previous=l,l&&(l.next=S),l=S,i.defineSkip(S.start),i.write(z),t.parser.lazy[S.start.line]){let k=i.events.length;for(;k--;)if(i.events[k][1].start.offset<o&&(!i.events[k][1].end||i.events[k][1].end.offset>o))return;let A=t.events.length,R=A,B,x;for(;R--;)if(t.events[R][0]==="exit"&&t.events[R][1].type==="chunkFlow"){if(B){x=t.events[R][1].end;break}B=!0}for(g(r),k=A;k<t.events.length;)t.events[k][1].end=Object.assign({},x),k++;le(t.events,R+1,0,t.events.slice(A)),t.events.length=k}}function g(S){let T=n.length;for(;T-- >S;){let z=n[T];t.containerState=z[1],z[0].exit.call(t,e)}n.length=S}function E(){i.write([null]),l=void 0,i=void 0,t.containerState._closeFlow=void 0}}function Al(e,t,n){return H(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Xe(e){if(e===null||W(e)||Ee(e))return 1;if(Ge(e))return 2}function et(e,t,n){let r=[],i=-1;for(;++i<e.length;){let l=e[i].resolveAll;l&&!r.includes(l)&&(t=l(t,n),r.push(l))}return t}var Ft={name:"attention",tokenize:Tl,resolveAll:Dl};function Dl(e,t){let n=-1,r,i,l,o,a,s,f,c;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;s=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;let u=Object.assign({},e[r][1].end),d=Object.assign({},e[n][1].start);rn(u,-s),rn(d,s),o={type:s>1?"strongSequence":"emphasisSequence",start:u,end:Object.assign({},e[r][1].end)},a={type:s>1?"strongSequence":"emphasisSequence",start:Object.assign({},e[n][1].start),end:d},l={type:s>1?"strongText":"emphasisText",start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},i={type:s>1?"strong":"emphasis",start:Object.assign({},o.start),end:Object.assign({},a.end)},e[r][1].end=Object.assign({},o.start),e[n][1].start=Object.assign({},a.end),f=[],e[r][1].end.offset-e[r][1].start.offset&&(f=ie(f,[["enter",e[r][1],t],["exit",e[r][1],t]])),f=ie(f,[["enter",i,t],["enter",o,t],["exit",o,t],["enter",l,t]]),f=ie(f,et(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),f=ie(f,[["exit",l,t],["enter",a,t],["exit",a,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(c=2,f=ie(f,[["enter",e[n][1],t],["exit",e[n][1],t]])):c=0,le(e,r-1,n-r+3,f),n=r+f.length-c-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function Tl(e,t){let n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=Xe(r),l;return o;function o(s){return l=s,e.enter("attentionSequence"),a(s)}function a(s){if(s===l)return e.consume(s),a;let f=e.exit("attentionSequence"),c=Xe(s),u=!c||c===2&&i||n.includes(s),d=!i||i===2&&c||n.includes(r);return f._open=!!(l===42?u:u&&(i||!d)),f._close=!!(l===42?d:d&&(c||!u)),t(s)}}function rn(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}var Ol={name:"autolink",tokenize:Pl};function Pl(e,t,n){let r=0;return i;function i(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),l}function l(p){return ee(p)?(e.consume(p),o):f(p)}function o(p){return p===43||p===45||p===46||G(p)?(r=1,a(p)):f(p)}function a(p){return p===58?(e.consume(p),r=0,s):(p===43||p===45||p===46||G(p))&&r++<32?(e.consume(p),a):(r=0,f(p))}function s(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||Ye(p)?n(p):(e.consume(p),s)}function f(p){return p===64?(e.consume(p),c):xl(p)?(e.consume(p),f):n(p)}function c(p){return G(p)?u(p):n(p)}function u(p){return p===46?(e.consume(p),r=0,c):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):d(p)}function d(p){if((p===45||G(p))&&r++<63){let y=p===45?d:u;return e.consume(p),y}return n(p)}}var qe={tokenize:Ll,partial:!0};function Ll(e,t,n){return r;function r(l){return N(l)?H(e,i,"linePrefix")(l):i(l)}function i(l){return l===null||I(l)?t(l):n(l)}}var Rn={name:"blockQuote",tokenize:Il,continuation:{tokenize:zl},exit:Ml};function Il(e,t,n){let r=this;return i;function i(o){if(o===62){let a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(o),e.exit("blockQuoteMarker"),l}return n(o)}function l(o){return N(o)?(e.enter("blockQuotePrefixWhitespace"),e.consume(o),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(o))}}function zl(e,t,n){let r=this;return i;function i(o){return N(o)?H(e,l,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):l(o)}function l(o){return e.attempt(Rn,t,n)(o)}}function Ml(e){e.exit("blockQuote")}var jn={name:"characterEscape",tokenize:Rl};function Rl(e,t,n){return r;function r(l){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(l),e.exit("escapeMarker"),i}function i(l){return wl(l)?(e.enter("characterEscapeValue"),e.consume(l),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(l)}}var ln=document.createElement("i");function Ot(e){let t="&"+e+";";ln.innerHTML=t;let n=ln.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}var _n={name:"characterReference",tokenize:jl};function jl(e,t,n){let r=this,i=0,l,o;return a;function a(u){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(u),e.exit("characterReferenceMarker"),s}function s(u){return u===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(u),e.exit("characterReferenceMarkerNumeric"),f):(e.enter("characterReferenceValue"),l=31,o=G,c(u))}function f(u){return u===88||u===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(u),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),l=6,o=vl,c):(e.enter("characterReferenceValue"),l=7,o=Ct,c(u))}function c(u){if(u===59&&i){let d=e.exit("characterReferenceValue");return o===G&&!Ot(r.sliceSerialize(d))?n(u):(e.enter("characterReferenceMarker"),e.consume(u),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return o(u)&&i++<l?(e.consume(u),c):n(u)}}var on={tokenize:Bl,partial:!0},an={name:"codeFenced",tokenize:_l,concrete:!0};function _l(e,t,n){let r=this,i={tokenize:z,partial:!0},l=0,o=0,a;return s;function s(k){return f(k)}function f(k){let A=r.events[r.events.length-1];return l=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,a=k,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),c(k)}function c(k){return k===a?(o++,e.consume(k),c):o<3?n(k):(e.exit("codeFencedFenceSequence"),N(k)?H(e,u,"whitespace")(k):u(k))}function u(k){return k===null||I(k)?(e.exit("codeFencedFence"),r.interrupt?t(k):e.check(on,b,T)(k)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),d(k))}function d(k){return k===null||I(k)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),u(k)):N(k)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),H(e,p,"whitespace")(k)):k===96&&k===a?n(k):(e.consume(k),d)}function p(k){return k===null||I(k)?u(k):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),y(k))}function y(k){return k===null||I(k)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),u(k)):k===96&&k===a?n(k):(e.consume(k),y)}function b(k){return e.attempt(i,T,w)(k)}function w(k){return e.enter("lineEnding"),e.consume(k),e.exit("lineEnding"),g}function g(k){return l>0&&N(k)?H(e,E,"linePrefix",l+1)(k):E(k)}function E(k){return k===null||I(k)?e.check(on,b,T)(k):(e.enter("codeFlowValue"),S(k))}function S(k){return k===null||I(k)?(e.exit("codeFlowValue"),E(k)):(e.consume(k),S)}function T(k){return e.exit("codeFenced"),t(k)}function z(k,A,R){let B=0;return x;function x(P){return k.enter("lineEnding"),k.consume(P),k.exit("lineEnding"),D}function D(P){return k.enter("codeFencedFence"),N(P)?H(k,O,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(P):O(P)}function O(P){return P===a?(k.enter("codeFencedFenceSequence"),U(P)):R(P)}function U(P){return P===a?(B++,k.consume(P),U):B>=o?(k.exit("codeFencedFenceSequence"),N(P)?H(k,$,"whitespace")(P):$(P)):R(P)}function $(P){return P===null||I(P)?(k.exit("codeFencedFence"),A(P)):R(P)}}}function Bl(e,t,n){let r=this;return i;function i(o){return o===null?n(o):(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),l)}function l(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}var pt={name:"codeIndented",tokenize:Hl},Nl={tokenize:Ul,partial:!0};function Hl(e,t,n){let r=this;return i;function i(f){return e.enter("codeIndented"),H(e,l,"linePrefix",5)(f)}function l(f){let c=r.events[r.events.length-1];return c&&c[1].type==="linePrefix"&&c[2].sliceSerialize(c[1],!0).length>=4?o(f):n(f)}function o(f){return f===null?s(f):I(f)?e.attempt(Nl,o,s)(f):(e.enter("codeFlowValue"),a(f))}function a(f){return f===null||I(f)?(e.exit("codeFlowValue"),o(f)):(e.consume(f),a)}function s(f){return e.exit("codeIndented"),t(f)}}function Ul(e,t,n){let r=this;return i;function i(o){return r.parser.lazy[r.now().line]?n(o):I(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),i):H(e,l,"linePrefix",5)(o)}function l(o){let a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):I(o)?i(o):n(o)}}var ql={name:"codeText",tokenize:$l,resolve:Vl,previous:Wl};function Vl(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function Wl(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function $l(e,t,n){let r=0,i,l;return o;function o(u){return e.enter("codeText"),e.enter("codeTextSequence"),a(u)}function a(u){return u===96?(e.consume(u),r++,a):(e.exit("codeTextSequence"),s(u))}function s(u){return u===null?n(u):u===32?(e.enter("space"),e.consume(u),e.exit("space"),s):u===96?(l=e.enter("codeTextSequence"),i=0,c(u)):I(u)?(e.enter("lineEnding"),e.consume(u),e.exit("lineEnding"),s):(e.enter("codeTextData"),f(u))}function f(u){return u===null||u===32||u===96||I(u)?(e.exit("codeTextData"),s(u)):(e.consume(u),f)}function c(u){return u===96?(e.consume(u),i++,c):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(u)):(l.type="codeTextData",f(u))}}function Bn(e){let t={},n=-1,r,i,l,o,a,s,f;for(;++n<e.length;){for(;n in t;)n=t[n];if(r=e[n],n&&r[1].type==="chunkFlow"&&e[n-1][1].type==="listItemPrefix"&&(s=r[1]._tokenizer.events,l=0,l<s.length&&s[l][1].type==="lineEndingBlank"&&(l+=2),l<s.length&&s[l][1].type==="content"))for(;++l<s.length&&s[l][1].type!=="content";)s[l][1].type==="chunkText"&&(s[l][1]._isInFirstContentOfListItem=!0,l++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,Ql(e,n)),n=t[n],f=!0);else if(r[1]._container){for(l=n,i=void 0;l--&&(o=e[l],o[1].type==="lineEnding"||o[1].type==="lineEndingBlank");)o[0]==="enter"&&(i&&(e[i][1].type="lineEndingBlank"),o[1].type="lineEnding",i=l);i&&(r[1].end=Object.assign({},e[i][1].start),a=e.slice(i,n),a.unshift(r),le(e,i,n-i+1,a))}}return!f}function Ql(e,t){let n=e[t][1],r=e[t][2],i=t-1,l=[],o=n._tokenizer||r.parser[n.contentType](n.start),a=o.events,s=[],f={},c,u,d=-1,p=n,y=0,b=0,w=[b];for(;p;){for(;e[++i][1]!==p;);l.push(i),p._tokenizer||(c=r.sliceStream(p),p.next||c.push(null),u&&o.defineSkip(p.start),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(c),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),u=p,p=p.next}for(p=n;++d<a.length;)a[d][0]==="exit"&&a[d-1][0]==="enter"&&a[d][1].type===a[d-1][1].type&&a[d][1].start.line!==a[d][1].end.line&&(b=d+1,w.push(b),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(o.events=[],p?(p._tokenizer=void 0,p.previous=void 0):w.pop(),d=w.length;d--;){let g=a.slice(w[d],w[d+1]),E=l.pop();s.unshift([E,E+g.length-1]),le(e,E,2,g)}for(d=-1;++d<s.length;)f[y+s[d][0]]=y+s[d][1],y+=s[d][1]-s[d][0]-1;return f}var Kl={tokenize:Jl,resolve:Xl},Yl={tokenize:Zl,partial:!0};function Xl(e){return Bn(e),e}function Jl(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(a)}function i(a){return a===null?l(a):I(a)?e.check(Yl,o,l)(a):(e.consume(a),i)}function l(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function o(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function Zl(e,t,n){let r=this;return i;function i(o){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),H(e,l,"linePrefix")}function l(o){if(o===null||I(o))return n(o);let a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):e.interrupt(r.parser.constructs.flow,n,t)(o)}}function Nn(e,t,n,r,i,l,o,a,s){let f=s||Number.POSITIVE_INFINITY,c=0;return u;function u(g){return g===60?(e.enter(r),e.enter(i),e.enter(l),e.consume(g),e.exit(l),d):g===null||g===32||g===41||Ye(g)?n(g):(e.enter(r),e.enter(o),e.enter(a),e.enter("chunkString",{contentType:"string"}),b(g))}function d(g){return g===62?(e.enter(l),e.consume(g),e.exit(l),e.exit(i),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(g))}function p(g){return g===62?(e.exit("chunkString"),e.exit(a),d(g)):g===null||g===60||I(g)?n(g):(e.consume(g),g===92?y:p)}function y(g){return g===60||g===62||g===92?(e.consume(g),p):p(g)}function b(g){return!c&&(g===null||g===41||W(g))?(e.exit("chunkString"),e.exit(a),e.exit(o),e.exit(r),t(g)):c<f&&g===40?(e.consume(g),c++,b):g===41?(e.consume(g),c--,b):g===null||g===32||g===40||Ye(g)?n(g):(e.consume(g),g===92?w:b)}function w(g){return g===40||g===41||g===92?(e.consume(g),b):b(g)}}function Hn(e,t,n,r,i,l){let o=this,a=0,s;return f;function f(p){return e.enter(r),e.enter(i),e.consume(p),e.exit(i),e.enter(l),c}function c(p){return a>999||p===null||p===91||p===93&&!s||p===94&&!a&&"_hiddenFootnoteSupport"in o.parser.constructs?n(p):p===93?(e.exit(l),e.enter(i),e.consume(p),e.exit(i),e.exit(r),t):I(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),c):(e.enter("chunkString",{contentType:"string"}),u(p))}function u(p){return p===null||p===91||p===93||I(p)||a++>999?(e.exit("chunkString"),c(p)):(e.consume(p),s||(s=!N(p)),p===92?d:u)}function d(p){return p===91||p===92||p===93?(e.consume(p),a++,u):u(p)}}function Un(e,t,n,r,i,l){let o;return a;function a(d){return d===34||d===39||d===40?(e.enter(r),e.enter(i),e.consume(d),e.exit(i),o=d===40?41:d,s):n(d)}function s(d){return d===o?(e.enter(i),e.consume(d),e.exit(i),e.exit(r),t):(e.enter(l),f(d))}function f(d){return d===o?(e.exit(l),s(o)):d===null?n(d):I(d)?(e.enter("lineEnding"),e.consume(d),e.exit("lineEnding"),H(e,f,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),c(d))}function c(d){return d===o||d===null||I(d)?(e.exit("chunkString"),f(d)):(e.consume(d),d===92?u:c)}function u(d){return d===o||d===92?(e.consume(d),c):c(d)}}function He(e,t){let n;return r;function r(i){return I(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):N(i)?H(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}function ce(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}var Gl={name:"definition",tokenize:ti},ei={tokenize:ni,partial:!0};function ti(e,t,n){let r=this,i;return l;function l(p){return e.enter("definition"),o(p)}function o(p){return Hn.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return i=ce(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),s):n(p)}function s(p){return W(p)?He(e,f)(p):f(p)}function f(p){return Nn(e,c,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function c(p){return e.attempt(ei,u,u)(p)}function u(p){return N(p)?H(e,d,"whitespace")(p):d(p)}function d(p){return p===null||I(p)?(e.exit("definition"),r.parser.defined.push(i),t(p)):n(p)}}function ni(e,t,n){return r;function r(a){return W(a)?He(e,i)(a):n(a)}function i(a){return Un(e,l,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function l(a){return N(a)?H(e,o,"whitespace")(a):o(a)}function o(a){return a===null||I(a)?t(a):n(a)}}var ri={name:"hardBreakEscape",tokenize:li};function li(e,t,n){return r;function r(l){return e.enter("hardBreakEscape"),e.consume(l),i}function i(l){return I(l)?(e.exit("hardBreakEscape"),t(l)):n(l)}}var ii={name:"headingAtx",tokenize:ai,resolve:oi};function oi(e,t){let n=e.length-2,r=3,i,l;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},l={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},le(e,r,n-r+1,[["enter",i,t],["enter",l,t],["exit",l,t],["exit",i,t]])),e}function ai(e,t,n){let r=0;return i;function i(c){return e.enter("atxHeading"),l(c)}function l(c){return e.enter("atxHeadingSequence"),o(c)}function o(c){return c===35&&r++<6?(e.consume(c),o):c===null||W(c)?(e.exit("atxHeadingSequence"),a(c)):n(c)}function a(c){return c===35?(e.enter("atxHeadingSequence"),s(c)):c===null||I(c)?(e.exit("atxHeading"),t(c)):N(c)?H(e,a,"whitespace")(c):(e.enter("atxHeadingText"),f(c))}function s(c){return c===35?(e.consume(c),s):(e.exit("atxHeadingSequence"),a(c))}function f(c){return c===null||c===35||W(c)?(e.exit("atxHeadingText"),a(c)):(e.consume(c),f)}}var ui=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],un=["pre","script","style","textarea"],si={name:"htmlFlow",tokenize:di,resolveTo:pi,concrete:!0},ci={tokenize:mi,partial:!0},fi={tokenize:hi,partial:!0};function pi(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function di(e,t,n){let r=this,i,l,o,a,s;return f;function f(m){return c(m)}function c(m){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(m),u}function u(m){return m===33?(e.consume(m),d):m===47?(e.consume(m),l=!0,b):m===63?(e.consume(m),i=3,r.interrupt?t:h):ee(m)?(e.consume(m),o=String.fromCharCode(m),w):n(m)}function d(m){return m===45?(e.consume(m),i=2,p):m===91?(e.consume(m),i=5,a=0,y):ee(m)?(e.consume(m),i=4,r.interrupt?t:h):n(m)}function p(m){return m===45?(e.consume(m),r.interrupt?t:h):n(m)}function y(m){let se="CDATA[";return m===se.charCodeAt(a++)?(e.consume(m),a===se.length?r.interrupt?t:O:y):n(m)}function b(m){return ee(m)?(e.consume(m),o=String.fromCharCode(m),w):n(m)}function w(m){if(m===null||m===47||m===62||W(m)){let se=m===47,Te=o.toLowerCase();return!se&&!l&&un.includes(Te)?(i=1,r.interrupt?t(m):O(m)):ui.includes(o.toLowerCase())?(i=6,se?(e.consume(m),g):r.interrupt?t(m):O(m)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(m):l?E(m):S(m))}return m===45||G(m)?(e.consume(m),o+=String.fromCharCode(m),w):n(m)}function g(m){return m===62?(e.consume(m),r.interrupt?t:O):n(m)}function E(m){return N(m)?(e.consume(m),E):x(m)}function S(m){return m===47?(e.consume(m),x):m===58||m===95||ee(m)?(e.consume(m),T):N(m)?(e.consume(m),S):x(m)}function T(m){return m===45||m===46||m===58||m===95||G(m)?(e.consume(m),T):z(m)}function z(m){return m===61?(e.consume(m),k):N(m)?(e.consume(m),z):S(m)}function k(m){return m===null||m===60||m===61||m===62||m===96?n(m):m===34||m===39?(e.consume(m),s=m,A):N(m)?(e.consume(m),k):R(m)}function A(m){return m===s?(e.consume(m),s=null,B):m===null||I(m)?n(m):(e.consume(m),A)}function R(m){return m===null||m===34||m===39||m===47||m===60||m===61||m===62||m===96||W(m)?z(m):(e.consume(m),R)}function B(m){return m===47||m===62||N(m)?S(m):n(m)}function x(m){return m===62?(e.consume(m),D):n(m)}function D(m){return m===null||I(m)?O(m):N(m)?(e.consume(m),D):n(m)}function O(m){return m===45&&i===2?(e.consume(m),L):m===60&&i===1?(e.consume(m),q):m===62&&i===4?(e.consume(m),ue):m===63&&i===3?(e.consume(m),h):m===93&&i===5?(e.consume(m),me):I(m)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(ci,ge,U)(m)):m===null||I(m)?(e.exit("htmlFlowData"),U(m)):(e.consume(m),O)}function U(m){return e.check(fi,$,ge)(m)}function $(m){return e.enter("lineEnding"),e.consume(m),e.exit("lineEnding"),P}function P(m){return m===null||I(m)?U(m):(e.enter("htmlFlowData"),O(m))}function L(m){return m===45?(e.consume(m),h):O(m)}function q(m){return m===47?(e.consume(m),o="",ne):O(m)}function ne(m){if(m===62){let se=o.toLowerCase();return un.includes(se)?(e.consume(m),ue):O(m)}return ee(m)&&o.length<8?(e.consume(m),o+=String.fromCharCode(m),ne):O(m)}function me(m){return m===93?(e.consume(m),h):O(m)}function h(m){return m===62?(e.consume(m),ue):m===45&&i===2?(e.consume(m),h):O(m)}function ue(m){return m===null||I(m)?(e.exit("htmlFlowData"),ge(m)):(e.consume(m),ue)}function ge(m){return e.exit("htmlFlow"),t(m)}}function hi(e,t,n){let r=this;return i;function i(o){return I(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),l):n(o)}function l(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}function mi(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt(qe,t,n)}}var gi={name:"htmlText",tokenize:yi};function yi(e,t,n){let r=this,i,l,o;return a;function a(h){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(h),s}function s(h){return h===33?(e.consume(h),f):h===47?(e.consume(h),z):h===63?(e.consume(h),S):ee(h)?(e.consume(h),R):n(h)}function f(h){return h===45?(e.consume(h),c):h===91?(e.consume(h),l=0,y):ee(h)?(e.consume(h),E):n(h)}function c(h){return h===45?(e.consume(h),p):n(h)}function u(h){return h===null?n(h):h===45?(e.consume(h),d):I(h)?(o=u,q(h)):(e.consume(h),u)}function d(h){return h===45?(e.consume(h),p):u(h)}function p(h){return h===62?L(h):h===45?d(h):u(h)}function y(h){let ue="CDATA[";return h===ue.charCodeAt(l++)?(e.consume(h),l===ue.length?b:y):n(h)}function b(h){return h===null?n(h):h===93?(e.consume(h),w):I(h)?(o=b,q(h)):(e.consume(h),b)}function w(h){return h===93?(e.consume(h),g):b(h)}function g(h){return h===62?L(h):h===93?(e.consume(h),g):b(h)}function E(h){return h===null||h===62?L(h):I(h)?(o=E,q(h)):(e.consume(h),E)}function S(h){return h===null?n(h):h===63?(e.consume(h),T):I(h)?(o=S,q(h)):(e.consume(h),S)}function T(h){return h===62?L(h):S(h)}function z(h){return ee(h)?(e.consume(h),k):n(h)}function k(h){return h===45||G(h)?(e.consume(h),k):A(h)}function A(h){return I(h)?(o=A,q(h)):N(h)?(e.consume(h),A):L(h)}function R(h){return h===45||G(h)?(e.consume(h),R):h===47||h===62||W(h)?B(h):n(h)}function B(h){return h===47?(e.consume(h),L):h===58||h===95||ee(h)?(e.consume(h),x):I(h)?(o=B,q(h)):N(h)?(e.consume(h),B):L(h)}function x(h){return h===45||h===46||h===58||h===95||G(h)?(e.consume(h),x):D(h)}function D(h){return h===61?(e.consume(h),O):I(h)?(o=D,q(h)):N(h)?(e.consume(h),D):B(h)}function O(h){return h===null||h===60||h===61||h===62||h===96?n(h):h===34||h===39?(e.consume(h),i=h,U):I(h)?(o=O,q(h)):N(h)?(e.consume(h),O):(e.consume(h),$)}function U(h){return h===i?(e.consume(h),i=void 0,P):h===null?n(h):I(h)?(o=U,q(h)):(e.consume(h),U)}function $(h){return h===null||h===34||h===39||h===60||h===61||h===96?n(h):h===47||h===62||W(h)?B(h):(e.consume(h),$)}function P(h){return h===47||h===62||W(h)?B(h):n(h)}function L(h){return h===62?(e.consume(h),e.exit("htmlTextData"),e.exit("htmlText"),t):n(h)}function q(h){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),ne}function ne(h){return N(h)?H(e,me,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(h):me(h)}function me(h){return e.enter("htmlTextData"),o(h)}}var Pt={name:"labelEnd",tokenize:Si,resolveTo:wi,resolveAll:vi},ki={tokenize:Ci},bi={tokenize:Fi},xi={tokenize:Ei};function vi(e){let t=-1;for(;++t<e.length;){let n=e[t][1];(n.type==="labelImage"||n.type==="labelLink"||n.type==="labelEnd")&&(e.splice(t+1,n.type==="labelImage"?4:2),n.type="data",t++)}return e}function wi(e,t){let n=e.length,r=0,i,l,o,a;for(;n--;)if(i=e[n][1],l){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(o){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(l=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(o=n);let s={type:e[l][1].type==="labelLink"?"link":"image",start:Object.assign({},e[l][1].start),end:Object.assign({},e[e.length-1][1].end)},f={type:"label",start:Object.assign({},e[l][1].start),end:Object.assign({},e[o][1].end)},c={type:"labelText",start:Object.assign({},e[l+r+2][1].end),end:Object.assign({},e[o-2][1].start)};return a=[["enter",s,t],["enter",f,t]],a=ie(a,e.slice(l+1,l+r+3)),a=ie(a,[["enter",c,t]]),a=ie(a,et(t.parser.constructs.insideSpan.null,e.slice(l+r+4,o-3),t)),a=ie(a,[["exit",c,t],e[o-2],e[o-1],["exit",f,t]]),a=ie(a,e.slice(o+1)),a=ie(a,[["exit",s,t]]),le(e,l,e.length,a),e}function Si(e,t,n){let r=this,i=r.events.length,l,o;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){l=r.events[i][1];break}return a;function a(d){return l?l._inactive?u(d):(o=r.parser.defined.includes(ce(r.sliceSerialize({start:l.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(d),e.exit("labelMarker"),e.exit("labelEnd"),s):n(d)}function s(d){return d===40?e.attempt(ki,c,o?c:u)(d):d===91?e.attempt(bi,c,o?f:u)(d):o?c(d):u(d)}function f(d){return e.attempt(xi,c,u)(d)}function c(d){return t(d)}function u(d){return l._balanced=!0,n(d)}}function Ci(e,t,n){return r;function r(u){return e.enter("resource"),e.enter("resourceMarker"),e.consume(u),e.exit("resourceMarker"),i}function i(u){return W(u)?He(e,l)(u):l(u)}function l(u){return u===41?c(u):Nn(e,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(u)}function o(u){return W(u)?He(e,s)(u):c(u)}function a(u){return n(u)}function s(u){return u===34||u===39||u===40?Un(e,f,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(u):c(u)}function f(u){return W(u)?He(e,c)(u):c(u)}function c(u){return u===41?(e.enter("resourceMarker"),e.consume(u),e.exit("resourceMarker"),e.exit("resource"),t):n(u)}}function Fi(e,t,n){let r=this;return i;function i(a){return Hn.call(r,e,l,o,"reference","referenceMarker","referenceString")(a)}function l(a){return r.parser.defined.includes(ce(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function o(a){return n(a)}}function Ei(e,t,n){return r;function r(l){return e.enter("reference"),e.enter("referenceMarker"),e.consume(l),e.exit("referenceMarker"),i}function i(l){return l===93?(e.enter("referenceMarker"),e.consume(l),e.exit("referenceMarker"),e.exit("reference"),t):n(l)}}var Ai={name:"labelStartImage",tokenize:Di,resolveAll:Pt.resolveAll};function Di(e,t,n){let r=this;return i;function i(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),l}function l(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),o):n(a)}function o(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}var Ti={name:"labelStartLink",tokenize:Oi,resolveAll:Pt.resolveAll};function Oi(e,t,n){let r=this;return i;function i(o){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(o),e.exit("labelMarker"),e.exit("labelLink"),l}function l(o){return o===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(o):t(o)}}var dt={name:"lineEnding",tokenize:Pi};function Pi(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),H(e,t,"linePrefix")}}var Ke={name:"thematicBreak",tokenize:Li};function Li(e,t,n){let r=0,i;return l;function l(f){return e.enter("thematicBreak"),o(f)}function o(f){return i=f,a(f)}function a(f){return f===i?(e.enter("thematicBreakSequence"),s(f)):r>=3&&(f===null||I(f))?(e.exit("thematicBreak"),t(f)):n(f)}function s(f){return f===i?(e.consume(f),r++,s):(e.exit("thematicBreakSequence"),N(f)?H(e,a,"whitespace")(f):a(f))}}var te={name:"list",tokenize:Mi,continuation:{tokenize:Ri},exit:_i},Ii={tokenize:Bi,partial:!0},zi={tokenize:ji,partial:!0};function Mi(e,t,n){let r=this,i=r.events[r.events.length-1],l=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,o=0;return a;function a(p){let y=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(y==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:Ct(p)){if(r.containerState.type||(r.containerState.type=y,e.enter(y,{_container:!0})),y==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(Ke,n,f)(p):f(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),s(p)}return n(p)}function s(p){return Ct(p)&&++o<10?(e.consume(p),s):(!r.interrupt||o<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),f(p)):n(p)}function f(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check(qe,r.interrupt?n:c,e.attempt(Ii,d,u))}function c(p){return r.containerState.initialBlankLine=!0,l++,d(p)}function u(p){return N(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),d):n(p)}function d(p){return r.containerState.size=l+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function Ri(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check(qe,i,l);function i(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,H(e,t,"listItemIndent",r.containerState.size+1)(a)}function l(a){return r.containerState.furtherBlankLines||!N(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(zi,t,o)(a))}function o(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,H(e,e.attempt(te,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function ji(e,t,n){let r=this;return H(e,i,"listItemIndent",r.containerState.size+1);function i(l){let o=r.events[r.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===r.containerState.size?t(l):n(l)}}function _i(e){e.exit(this.containerState.type)}function Bi(e,t,n){let r=this;return H(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(l){let o=r.events[r.events.length-1];return!N(l)&&o&&o[1].type==="listItemPrefixWhitespace"?t(l):n(l)}}var sn={name:"setextUnderline",tokenize:Hi,resolveTo:Ni};function Ni(e,t){let n=e.length,r,i,l;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!l&&e[n][1].type==="definition"&&(l=n);let o={type:"setextHeading",start:Object.assign({},e[i][1].start),end:Object.assign({},e[e.length-1][1].end)};return e[i][1].type="setextHeadingText",l?(e.splice(i,0,["enter",o,t]),e.splice(l+1,0,["exit",e[r][1],t]),e[r][1].end=Object.assign({},e[l][1].end)):e[r][1]=o,e.push(["exit",o,t]),e}function Hi(e,t,n){let r=this,i;return l;function l(f){let c=r.events.length,u;for(;c--;)if(r.events[c][1].type!=="lineEnding"&&r.events[c][1].type!=="linePrefix"&&r.events[c][1].type!=="content"){u=r.events[c][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||u)?(e.enter("setextHeadingLine"),i=f,o(f)):n(f)}function o(f){return e.enter("setextHeadingLineSequence"),a(f)}function a(f){return f===i?(e.consume(f),a):(e.exit("setextHeadingLineSequence"),N(f)?H(e,s,"lineSuffix")(f):s(f))}function s(f){return f===null||I(f)?(e.exit("setextHeadingLine"),t(f)):n(f)}}var Ui={tokenize:qi};function qi(e){let t=this,n=e.attempt(qe,r,e.attempt(this.parser.constructs.flowInitial,i,H(e,e.attempt(this.parser.constructs.flow,i,e.attempt(Kl,i)),"linePrefix")));return n;function r(l){if(l===null){e.consume(l);return}return e.enter("lineEndingBlank"),e.consume(l),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(l){if(l===null){e.consume(l);return}return e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),t.currentConstruct=void 0,n}}var Vi={resolveAll:Vn()},Wi=qn("string"),$i=qn("text");function qn(e){return{tokenize:t,resolveAll:Vn(e==="text"?Qi:void 0)};function t(n){let r=this,i=this.parser.constructs[e],l=n.attempt(i,o,a);return o;function o(c){return f(c)?l(c):a(c)}function a(c){if(c===null){n.consume(c);return}return n.enter("data"),n.consume(c),s}function s(c){return f(c)?(n.exit("data"),l(c)):(n.consume(c),s)}function f(c){if(c===null)return!0;let u=i[c],d=-1;if(u)for(;++d<u.length;){let p=u[d];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function Vn(e){return t;function t(n,r){let i=-1,l;for(;++i<=n.length;)l===void 0?n[i]&&n[i][1].type==="data"&&(l=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==l+2&&(n[l][1].end=n[i-1][1].end,n.splice(l+2,i-l-2),i=l+2),l=void 0);return e?e(n,r):n}}function Qi(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){let r=e[n-1][1],i=t.sliceStream(r),l=i.length,o=-1,a=0,s;for(;l--;){let f=i[l];if(typeof f=="string"){for(o=f.length;f.charCodeAt(o-1)===32;)a++,o--;if(o)break;o=-1}else if(f===-2)s=!0,a++;else if(f!==-1){l++;break}}if(a){let f={type:n===e.length||s||a<2?"lineSuffix":"hardBreakTrailing",start:{line:r.end.line,column:r.end.column-a,offset:r.end.offset-a,_index:r.start._index+l,_bufferIndex:l?o:r.start._bufferIndex+o},end:Object.assign({},r.end)};r.end=Object.assign({},f.start),r.start.offset===r.end.offset?Object.assign(r,f):(e.splice(n,0,["enter",f,t],["exit",f,t]),n+=2)}n++}return e}function Ki(e,t,n){let r=Object.assign(n?Object.assign({},n):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1}),i={},l=[],o=[],a=[],s={consume:E,enter:S,exit:T,attempt:A(z),check:A(k),interrupt:A(k,{interrupt:!0})},f={previous:null,code:null,containerState:{},events:[],parser:e,sliceStream:p,sliceSerialize:d,now:y,defineSkip:b,write:u},c=t.tokenize.call(f,s);return t.resolveAll&&l.push(t),f;function u(D){return o=ie(o,D),w(),o[o.length-1]!==null?[]:(R(t,0),f.events=et(l,f.events,f),f.events)}function d(D,O){return Xi(p(D),O)}function p(D){return Yi(o,D)}function y(){let{line:D,column:O,offset:U,_index:$,_bufferIndex:P}=r;return{line:D,column:O,offset:U,_index:$,_bufferIndex:P}}function b(D){i[D.line]=D.column,x()}function w(){let D;for(;r._index<o.length;){let O=o[r._index];if(typeof O=="string")for(D=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===D&&r._bufferIndex<O.length;)g(O.charCodeAt(r._bufferIndex));else g(O)}}function g(D){c=c(D)}function E(D){I(D)?(r.line++,r.column=1,r.offset+=D===-3?2:1,x()):D!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),f.previous=D}function S(D,O){let U=O||{};return U.type=D,U.start=y(),f.events.push(["enter",U,f]),a.push(U),U}function T(D){let O=a.pop();return O.end=y(),f.events.push(["exit",O,f]),O}function z(D,O){R(D,O.from)}function k(D,O){O.restore()}function A(D,O){return U;function U($,P,L){let q,ne,me,h;return Array.isArray($)?ge($):"tokenize"in $?ge([$]):ue($);function ue(Z){return Oe;function Oe(xe){let Pe=xe!==null&&Z[xe],Le=xe!==null&&Z.null,rt=[...Array.isArray(Pe)?Pe:Pe?[Pe]:[],...Array.isArray(Le)?Le:Le?[Le]:[]];return ge(rt)(xe)}}function ge(Z){return q=Z,ne=0,Z.length===0?L:m(Z[ne])}function m(Z){return Oe;function Oe(xe){return h=B(),me=Z,Z.partial||(f.currentConstruct=Z),Z.name&&f.parser.constructs.disable.null.includes(Z.name)?Te():Z.tokenize.call(O?Object.assign(Object.create(f),O):f,s,se,Te)(xe)}}function se(Z){return D(me,h),P}function Te(Z){return h.restore(),++ne<q.length?m(q[ne]):L}}}function R(D,O){D.resolveAll&&!l.includes(D)&&l.push(D),D.resolve&&le(f.events,O,f.events.length-O,D.resolve(f.events.slice(O),f)),D.resolveTo&&(f.events=D.resolveTo(f.events,f))}function B(){let D=y(),O=f.previous,U=f.currentConstruct,$=f.events.length,P=Array.from(a);return{restore:L,from:$};function L(){r=D,f.previous=O,f.currentConstruct=U,f.events.length=$,a=P,x()}}function x(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function Yi(e,t){let n=t.start._index,r=t.start._bufferIndex,i=t.end._index,l=t.end._bufferIndex,o;if(n===i)o=[e[n].slice(r,l)];else{if(o=e.slice(n,i),r>-1){let a=o[0];typeof a=="string"?o[0]=a.slice(r):o.shift()}l>0&&o.push(e[i].slice(0,l))}return o}function Xi(e,t){let n=-1,r=[],i;for(;++n<e.length;){let l=e[n],o;if(typeof l=="string")o=l;else switch(l){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&i)continue;o=" ";break}default:o=String.fromCharCode(l)}i=l===-2,r.push(o)}return r.join("")}var Wn={};Tn(Wn,{attentionMarkers:()=>lo,contentInitial:()=>Zi,disable:()=>io,document:()=>Ji,flow:()=>eo,flowInitial:()=>Gi,insideSpan:()=>ro,string:()=>to,text:()=>no});var Ji={42:te,43:te,45:te,48:te,49:te,50:te,51:te,52:te,53:te,54:te,55:te,56:te,57:te,62:Rn},Zi={91:Gl},Gi={[-2]:pt,[-1]:pt,32:pt},eo={35:ii,42:Ke,45:[sn,Ke],60:si,61:sn,95:Ke,96:an,126:an},to={38:_n,92:jn},no={[-5]:dt,[-4]:dt,[-3]:dt,33:Ai,38:_n,42:Ft,60:[Ol,gi],91:Ti,92:[ri,jn],93:Pt,95:Ft,96:ql},ro={null:[Ft,Vi]},lo={null:[42,95]},io={null:[]};function oo(e){let t=Mn([Wn,...(e||{}).extensions||[]]),n={defined:[],lazy:{},constructs:t,content:r(Sl),document:r(Fl),flow:r(Ui),string:r(Wi),text:r($i)};return n;function r(i){return l;function l(o){return Ki(n,i,o)}}}var cn=/[\0\t\n\r]/g;function ao(){let e=1,t="",n=!0,r;return i;function i(l,o,a){let s=[],f,c,u,d,p;for(l=t+l.toString(o),u=0,t="",n&&(l.charCodeAt(0)===65279&&u++,n=void 0);u<l.length;){if(cn.lastIndex=u,f=cn.exec(l),d=f&&f.index!==void 0?f.index:l.length,p=l.charCodeAt(d),!f){t=l.slice(u);break}if(p===10&&u===d&&r)s.push(-3),r=void 0;else switch(r&&(s.push(-5),r=void 0),u<d&&(s.push(l.slice(u,d)),e+=d-u),p){case 0:{s.push(65533),e++;break}case 9:{for(c=Math.ceil(e/4)*4,s.push(-2);e++<c;)s.push(-1);break}case 10:{s.push(-4),e=1;break}default:r=!0,e=1}u=d+1}return a&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}function uo(e){for(;!Bn(e););return e}function $n(e,t){let n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCharCode(n)}var so=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Qn(e){return e.replace(so,co)}function co(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){let r=n.charCodeAt(1),i=r===120||r===88;return $n(n.slice(i?2:1),i?16:10)}return Ot(n)||e}var Kn={}.hasOwnProperty,fo=function(e,t,n){return typeof t!="string"&&(n=t,t=void 0),po(n)(uo(oo(n).document().write(ao()(e,t,!0))))};function po(e){let t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:a(qt),autolinkProtocol:D,autolinkEmail:D,atxHeading:a(Nt),blockQuote:a(rt),characterEscape:D,characterReference:D,codeFenced:a(Bt),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:a(Bt,s),codeText:a(Or,s),codeTextData:D,data:D,codeFlowValue:D,definition:a(Pr),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:a(Lr),hardBreakEscape:a(Ht),hardBreakTrailing:a(Ht),htmlFlow:a(Ut,s),htmlFlowData:D,htmlText:a(Ut,s),htmlTextData:D,image:a(Ir),label:s,link:a(qt),listItem:a(zr),listItemValue:y,listOrdered:a(Vt,p),listUnordered:a(Vt),paragraph:a(Mr),reference:Te,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:a(Nt),strong:a(Rr),thematicBreak:a(_r)},exit:{atxHeading:c(),atxHeadingSequence:A,autolink:c(),autolinkEmail:Le,autolinkProtocol:Pe,blockQuote:c(),characterEscapeValue:O,characterReferenceMarkerHexadecimal:Oe,characterReferenceMarkerNumeric:Oe,characterReferenceValue:xe,codeFenced:c(E),codeFencedFence:g,codeFencedFenceInfo:b,codeFencedFenceMeta:w,codeFlowValue:O,codeIndented:c(S),codeText:c(q),codeTextData:O,data:O,definition:c(),definitionDestinationString:k,definitionLabelString:T,definitionTitleString:z,emphasis:c(),hardBreakEscape:c($),hardBreakTrailing:c($),htmlFlow:c(P),htmlFlowData:O,htmlText:c(L),htmlTextData:O,image:c(me),label:ue,labelText:h,lineEnding:U,link:c(ne),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:Z,resourceDestinationString:ge,resourceTitleString:m,resource:se,setextHeading:c(x),setextHeadingLineSequence:B,setextHeadingText:R,strong:c(),thematicBreak:c()}};Yn(t,(e||{}).mdastExtensions||[]);let n={};return r;function r(v){let F={type:"root",children:[]},M={stack:[F],tokenStack:[],config:t,enter:f,exit:u,buffer:s,resume:d,setData:l,getData:o},V=[],Q=-1;for(;++Q<v.length;)if(v[Q][1].type==="listOrdered"||v[Q][1].type==="listUnordered")if(v[Q][0]==="enter")V.push(Q);else{let fe=V.pop();Q=i(v,fe,Q)}for(Q=-1;++Q<v.length;){let fe=t[v[Q][0]];Kn.call(fe,v[Q][1].type)&&fe[v[Q][1].type].call(Object.assign({sliceSerialize:v[Q][2].sliceSerialize},M),v[Q][1])}if(M.tokenStack.length>0){let fe=M.tokenStack[M.tokenStack.length-1];(fe[1]||fn).call(M,void 0,fe[0])}for(F.position={start:ve(v.length>0?v[0][1].start:{line:1,column:1,offset:0}),end:ve(v.length>0?v[v.length-2][1].end:{line:1,column:1,offset:0})},Q=-1;++Q<t.transforms.length;)F=t.transforms[Q](F)||F;return F}function i(v,F,M){let V=F-1,Q=-1,fe=!1,Ce,ye,je,_e;for(;++V<=M;){let Y=v[V];if(Y[1].type==="listUnordered"||Y[1].type==="listOrdered"||Y[1].type==="blockQuote"?(Y[0]==="enter"?Q++:Q--,_e=void 0):Y[1].type==="lineEndingBlank"?Y[0]==="enter"&&(Ce&&!_e&&!Q&&!je&&(je=V),_e=void 0):Y[1].type==="linePrefix"||Y[1].type==="listItemValue"||Y[1].type==="listItemMarker"||Y[1].type==="listItemPrefix"||Y[1].type==="listItemPrefixWhitespace"||(_e=void 0),!Q&&Y[0]==="enter"&&Y[1].type==="listItemPrefix"||Q===-1&&Y[0]==="exit"&&(Y[1].type==="listUnordered"||Y[1].type==="listOrdered")){if(Ce){let lt=V;for(ye=void 0;lt--;){let ke=v[lt];if(ke[1].type==="lineEnding"||ke[1].type==="lineEndingBlank"){if(ke[0]==="exit")continue;ye&&(v[ye][1].type="lineEndingBlank",fe=!0),ke[1].type="lineEnding",ye=lt}else if(!(ke[1].type==="linePrefix"||ke[1].type==="blockQuotePrefix"||ke[1].type==="blockQuotePrefixWhitespace"||ke[1].type==="blockQuoteMarker"||ke[1].type==="listItemIndent"))break}je&&(!ye||je<ye)&&(Ce._spread=!0),Ce.end=Object.assign({},ye?v[ye][1].start:Y[1].end),v.splice(ye||V,0,["exit",Ce,Y[2]]),V++,M++}Y[1].type==="listItemPrefix"&&(Ce={type:"listItem",_spread:!1,start:Object.assign({},Y[1].start),end:void 0},v.splice(V,0,["enter",Ce,Y[2]]),V++,M++,je=void 0,_e=!0)}}return v[F][1]._spread=fe,M}function l(v,F){n[v]=F}function o(v){return n[v]}function a(v,F){return M;function M(V){f.call(this,v(V),V),F&&F.call(this,V)}}function s(){this.stack.push({type:"fragment",children:[]})}function f(v,F,M){return this.stack[this.stack.length-1].children.push(v),this.stack.push(v),this.tokenStack.push([F,M]),v.position={start:ve(F.start)},v}function c(v){return F;function F(M){v&&v.call(this,M),u.call(this,M)}}function u(v,F){let M=this.stack.pop(),V=this.tokenStack.pop();if(V)V[0].type!==v.type&&(F?F.call(this,v,V[0]):(V[1]||fn).call(this,v,V[0]));else throw new Error("Cannot close `"+v.type+"` ("+Ne({start:v.start,end:v.end})+"): it’s not open");return M.position.end=ve(v.end),M}function d(){return ml(this.stack.pop())}function p(){l("expectingFirstListItemValue",!0)}function y(v){if(o("expectingFirstListItemValue")){let F=this.stack[this.stack.length-2];F.start=Number.parseInt(this.sliceSerialize(v),10),l("expectingFirstListItemValue")}}function b(){let v=this.resume(),F=this.stack[this.stack.length-1];F.lang=v}function w(){let v=this.resume(),F=this.stack[this.stack.length-1];F.meta=v}function g(){o("flowCodeInside")||(this.buffer(),l("flowCodeInside",!0))}function E(){let v=this.resume(),F=this.stack[this.stack.length-1];F.value=v.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),l("flowCodeInside")}function S(){let v=this.resume(),F=this.stack[this.stack.length-1];F.value=v.replace(/(\r?\n|\r)$/g,"")}function T(v){let F=this.resume(),M=this.stack[this.stack.length-1];M.label=F,M.identifier=ce(this.sliceSerialize(v)).toLowerCase()}function z(){let v=this.resume(),F=this.stack[this.stack.length-1];F.title=v}function k(){let v=this.resume(),F=this.stack[this.stack.length-1];F.url=v}function A(v){let F=this.stack[this.stack.length-1];if(!F.depth){let M=this.sliceSerialize(v).length;F.depth=M}}function R(){l("setextHeadingSlurpLineEnding",!0)}function B(v){let F=this.stack[this.stack.length-1];F.depth=this.sliceSerialize(v).charCodeAt(0)===61?1:2}function x(){l("setextHeadingSlurpLineEnding")}function D(v){let F=this.stack[this.stack.length-1],M=F.children[F.children.length-1];(!M||M.type!=="text")&&(M=jr(),M.position={start:ve(v.start)},F.children.push(M)),this.stack.push(M)}function O(v){let F=this.stack.pop();F.value+=this.sliceSerialize(v),F.position.end=ve(v.end)}function U(v){let F=this.stack[this.stack.length-1];if(o("atHardBreak")){let M=F.children[F.children.length-1];M.position.end=ve(v.end),l("atHardBreak");return}!o("setextHeadingSlurpLineEnding")&&t.canContainEols.includes(F.type)&&(D.call(this,v),O.call(this,v))}function $(){l("atHardBreak",!0)}function P(){let v=this.resume(),F=this.stack[this.stack.length-1];F.value=v}function L(){let v=this.resume(),F=this.stack[this.stack.length-1];F.value=v}function q(){let v=this.resume(),F=this.stack[this.stack.length-1];F.value=v}function ne(){let v=this.stack[this.stack.length-1];if(o("inReference")){let F=o("referenceType")||"shortcut";v.type+="Reference",v.referenceType=F,delete v.url,delete v.title}else delete v.identifier,delete v.label;l("referenceType")}function me(){let v=this.stack[this.stack.length-1];if(o("inReference")){let F=o("referenceType")||"shortcut";v.type+="Reference",v.referenceType=F,delete v.url,delete v.title}else delete v.identifier,delete v.label;l("referenceType")}function h(v){let F=this.sliceSerialize(v),M=this.stack[this.stack.length-2];M.label=Qn(F),M.identifier=ce(F).toLowerCase()}function ue(){let v=this.stack[this.stack.length-1],F=this.resume(),M=this.stack[this.stack.length-1];if(l("inReference",!0),M.type==="link"){let V=v.children;M.children=V}else M.alt=F}function ge(){let v=this.resume(),F=this.stack[this.stack.length-1];F.url=v}function m(){let v=this.resume(),F=this.stack[this.stack.length-1];F.title=v}function se(){l("inReference")}function Te(){l("referenceType","collapsed")}function Z(v){let F=this.resume(),M=this.stack[this.stack.length-1];M.label=F,M.identifier=ce(this.sliceSerialize(v)).toLowerCase(),l("referenceType","full")}function Oe(v){l("characterReferenceType",v.type)}function xe(v){let F=this.sliceSerialize(v),M=o("characterReferenceType"),V;M?(V=$n(F,M==="characterReferenceMarkerNumeric"?10:16),l("characterReferenceType")):V=Ot(F);let Q=this.stack.pop();Q.value+=V,Q.position.end=ve(v.end)}function Pe(v){O.call(this,v);let F=this.stack[this.stack.length-1];F.url=this.sliceSerialize(v)}function Le(v){O.call(this,v);let F=this.stack[this.stack.length-1];F.url="mailto:"+this.sliceSerialize(v)}function rt(){return{type:"blockquote",children:[]}}function Bt(){return{type:"code",lang:null,meta:null,value:""}}function Or(){return{type:"inlineCode",value:""}}function Pr(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Lr(){return{type:"emphasis",children:[]}}function Nt(){return{type:"heading",depth:void 0,children:[]}}function Ht(){return{type:"break"}}function Ut(){return{type:"html",value:""}}function Ir(){return{type:"image",title:null,url:"",alt:null}}function qt(){return{type:"link",title:null,url:"",children:[]}}function Vt(v){return{type:"list",ordered:v.type==="listOrdered",start:null,spread:v._spread,children:[]}}function zr(v){return{type:"listItem",spread:v._spread,checked:null,children:[]}}function Mr(){return{type:"paragraph",children:[]}}function Rr(){return{type:"strong",children:[]}}function jr(){return{type:"text",value:""}}function _r(){return{type:"thematicBreak"}}}function ve(e){return{line:e.line,column:e.column,offset:e.offset}}function Yn(e,t){let n=-1;for(;++n<t.length;){let r=t[n];Array.isArray(r)?Yn(e,r):ho(e,r)}}function ho(e,t){let n;for(n in t)if(Kn.call(t,n)){if(n==="canContainEols"){let r=t[n];r&&e[n].push(...r)}else if(n==="transforms"){let r=t[n];r&&e[n].push(...r)}else if(n==="enter"||n==="exit"){let r=t[n];r&&Object.assign(e[n],r)}}}function fn(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+Ne({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Ne({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+Ne({start:t.start,end:t.end})+") is still open")}function mo(e){Object.assign(this,{Parser:t=>{let n=this.data("settings");return fo(t,Object.assign({},n,e,{extensions:this.data("micromarkExtensions")||[],mdastExtensions:this.data("fromMarkdownExtensions")||[]}))}})}function go(e,t){let n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function yo(e,t){let n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function ko(e,t){let n=t.value?t.value+`
`:"",r=t.lang?t.lang.match(/^[^ \t]+(?=[ \t]|$)/):null,i={};r&&(i.className=["language-"+r]);let l={type:"element",tagName:"code",properties:i,children:[{type:"text",value:n}]};return t.meta&&(l.data={meta:t.meta}),e.patch(t,l),l=e.applyData(t,l),l={type:"element",tagName:"pre",properties:{},children:[l]},e.patch(t,l),l}function bo(e,t){let n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function xo(e,t){let n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Me(e){let t=[],n=-1,r=0,i=0;for(;++n<e.length;){let l=e.charCodeAt(n),o="";if(l===37&&G(e.charCodeAt(n+1))&&G(e.charCodeAt(n+2)))i=2;else if(l<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l))||(o=String.fromCharCode(l));else if(l>55295&&l<57344){let a=e.charCodeAt(n+1);l<56320&&a>56319&&a<57344?(o=String.fromCharCode(l,a),i=1):o="�"}else o=String.fromCharCode(l);o&&(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,o=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function Xn(e,t){let n=String(t.identifier).toUpperCase(),r=Me(n.toLowerCase()),i=e.footnoteOrder.indexOf(n),l;i===-1?(e.footnoteOrder.push(n),e.footnoteCounts[n]=1,l=e.footnoteOrder.length):(e.footnoteCounts[n]++,l=i+1);let o=e.footnoteCounts[n],a={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fn-"+r,id:e.clobberPrefix+"fnref-"+r+(o>1?"-"+o:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};e.patch(t,a);let s={type:"element",tagName:"sup",properties:{},children:[a]};return e.patch(t,s),e.applyData(t,s)}function vo(e,t){let n=e.footnoteById,r=1;for(;r in n;)r++;let i=String(r);return n[i]={type:"footnoteDefinition",identifier:i,children:[{type:"paragraph",children:t.children}],position:t.position},Xn(e,{type:"footnoteReference",identifier:i,position:t.position})}function wo(e,t){let n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function So(e,t){if(e.dangerous){let n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}return null}function Jn(e,t){let n=t.referenceType,r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return{type:"text",value:"!["+t.alt+r};let i=e.all(t),l=i[0];l&&l.type==="text"?l.value="["+l.value:i.unshift({type:"text",value:"["});let o=i[i.length-1];return o&&o.type==="text"?o.value+=r:i.push({type:"text",value:r}),i}function Co(e,t){let n=e.definition(t.identifier);if(!n)return Jn(e,t);let r={src:Me(n.url||""),alt:t.alt};n.title!==null&&n.title!==void 0&&(r.title=n.title);let i={type:"element",tagName:"img",properties:r,children:[]};return e.patch(t,i),e.applyData(t,i)}function Fo(e,t){let n={src:Me(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function Eo(e,t){let n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);let r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function Ao(e,t){let n=e.definition(t.identifier);if(!n)return Jn(e,t);let r={href:Me(n.url||"")};n.title!==null&&n.title!==void 0&&(r.title=n.title);let i={type:"element",tagName:"a",properties:r,children:e.all(t)};return e.patch(t,i),e.applyData(t,i)}function Do(e,t){let n={href:Me(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function To(e,t,n){let r=e.all(t),i=n?Oo(n):Zn(t),l={},o=[];if(typeof t.checked=="boolean"){let c=r[0],u;c&&c.type==="element"&&c.tagName==="p"?u=c:(u={type:"element",tagName:"p",properties:{},children:[]},r.unshift(u)),u.children.length>0&&u.children.unshift({type:"text",value:" "}),u.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),l.className=["task-list-item"]}let a=-1;for(;++a<r.length;){let c=r[a];(i||a!==0||c.type!=="element"||c.tagName!=="p")&&o.push({type:"text",value:`
`}),c.type==="element"&&c.tagName==="p"&&!i?o.push(...c.children):o.push(c)}let s=r[r.length-1];s&&(i||s.type!=="element"||s.tagName!=="p")&&o.push({type:"text",value:`
`});let f={type:"element",tagName:"li",properties:l,children:o};return e.patch(t,f),e.applyData(t,f)}function Oo(e){let t=!1;if(e.type==="list"){t=e.spread||!1;let n=e.children,r=-1;for(;!t&&++r<n.length;)t=Zn(n[r])}return t}function Zn(e){let t=e.spread;return t??e.children.length>1}function Po(e,t){let n={},r=e.all(t),i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){let o=r[i];if(o.type==="element"&&o.tagName==="li"&&o.properties&&Array.isArray(o.properties.className)&&o.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}let l={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,l),e.applyData(t,l)}function Lo(e,t){let n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Io(e,t){let n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function zo(e,t){let n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}var Lt=Gn("start"),It=Gn("end");function Mo(e){return{start:Lt(e),end:It(e)}}function Gn(e){return t;function t(n){let r=n&&n.position&&n.position[e]||{};return{line:r.line||null,column:r.column||null,offset:r.offset>-1?r.offset:null}}}function Ro(e,t){let n=e.all(t),r=n.shift(),i=[];if(r){let o={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],o),i.push(o)}if(n.length>0){let o={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=Lt(t.children[1]),s=It(t.children[t.children.length-1]);a.line&&s.line&&(o.position={start:a,end:s}),i.push(o)}let l={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,l),e.applyData(t,l)}function jo(e,t,n){let r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?"th":"td",l=n&&n.type==="table"?n.align:void 0,o=l?l.length:t.children.length,a=-1,s=[];for(;++a<o;){let c=t.children[a],u={},d=l?l[a]:void 0;d&&(u.align=d);let p={type:"element",tagName:i,properties:u,children:[]};c&&(p.children=e.all(c),e.patch(c,p),p=e.applyData(t,p)),s.push(p)}let f={type:"element",tagName:"tr",properties:{},children:e.wrap(s,!0)};return e.patch(t,f),e.applyData(t,f)}function _o(e,t){let n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Bo(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),i=0,l=[];for(;r;)l.push(pn(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return l.push(pn(t.slice(i),i>0,!1)),l.join("")}function pn(e,t,n){let r=0,i=e.length;if(t){let l=e.codePointAt(r);for(;l===9||l===32;)r++,l=e.codePointAt(r)}if(n){let l=e.codePointAt(i-1);for(;l===9||l===32;)i--,l=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function No(e,t){let n={type:"text",value:Bo(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function Ho(e,t){let n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}var Uo={blockquote:go,break:yo,code:ko,delete:bo,emphasis:xo,footnoteReference:Xn,footnote:vo,heading:wo,html:So,imageReference:Co,image:Fo,inlineCode:Eo,linkReference:Ao,link:Do,listItem:To,list:Po,paragraph:Lo,root:Io,strong:zo,table:Ro,tableCell:_o,tableRow:jo,text:No,thematicBreak:Ho,toml:We,yaml:We,definition:We,footnoteDefinition:We};function We(){return null}var zt=function(e){if(e==null)return $o;if(typeof e=="string")return Wo(e);if(typeof e=="object")return Array.isArray(e)?qo(e):Vo(e);if(typeof e=="function")return tt(e);throw new Error("Expected function, string, or object as test")};function qo(e){let t=[],n=-1;for(;++n<e.length;)t[n]=zt(e[n]);return tt(r);function r(...i){let l=-1;for(;++l<t.length;)if(t[l].call(this,...i))return!0;return!1}}function Vo(e){return tt(t);function t(n){let r;for(r in e)if(n[r]!==e[r])return!1;return!0}}function Wo(e){return tt(t);function t(n){return n&&n.type===e}}function tt(e){return t;function t(n,...r){return!!(n&&typeof n=="object"&&"type"in n&&e.call(this,n,...r))}}function $o(){return!0}var Qo=!0,dn=!1,Ko="skip",er=function(e,t,n,r){typeof t=="function"&&typeof n!="function"&&(r=n,n=t,t=null);let i=zt(t),l=r?-1:1;o(e,void 0,[])();function o(a,s,f){let c=a&&typeof a=="object"?a:{};if(typeof c.type=="string"){let d=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(u,"name",{value:"node ("+(a.type+(d?"<"+d+">":""))+")"})}return u;function u(){let d=[],p,y,b;if((!t||i(a,s,f[f.length-1]||null))&&(d=Yo(n(a,f)),d[0]===dn))return d;if(a.children&&d[0]!==Ko)for(y=(r?a.children.length:-1)+l,b=f.concat(a);y>-1&&y<a.children.length;){if(p=o(a.children[y],y,b)(),p[0]===dn)return p;y=typeof p[1]=="number"?p[1]:y+l}return d}}};function Yo(e){return Array.isArray(e)?e:typeof e=="number"?[Qo,e]:[e]}var Mt=function(e,t,n,r){typeof t=="function"&&typeof n!="function"&&(r=n,n=t,t=null),er(e,t,i,r);function i(l,o){let a=o[o.length-1];return n(l,a?a.children.indexOf(l):null,a)}};function Xo(e){return!e||!e.position||!e.position.start||!e.position.start.line||!e.position.start.column||!e.position.end||!e.position.end.line||!e.position.end.column}var hn={}.hasOwnProperty;function Jo(e){let t=Object.create(null);if(!e||!e.type)throw new Error("mdast-util-definitions expected node");return Mt(e,"definition",r=>{let i=mn(r.identifier);i&&!hn.call(t,i)&&(t[i]=r)}),n;function n(r){let i=mn(r);return i&&hn.call(t,i)?t[i]:null}}function mn(e){return String(e||"").toUpperCase()}var Je={}.hasOwnProperty;function Zo(e,t){let n=t||{},r=n.allowDangerousHtml||!1,i={};return o.dangerous=r,o.clobberPrefix=n.clobberPrefix===void 0||n.clobberPrefix===null?"user-content-":n.clobberPrefix,o.footnoteLabel=n.footnoteLabel||"Footnotes",o.footnoteLabelTagName=n.footnoteLabelTagName||"h2",o.footnoteLabelProperties=n.footnoteLabelProperties||{className:["sr-only"]},o.footnoteBackLabel=n.footnoteBackLabel||"Back to content",o.unknownHandler=n.unknownHandler,o.passThrough=n.passThrough,o.handlers=J(J({},Uo),n.handlers),o.definition=Jo(e),o.footnoteById=i,o.footnoteOrder=[],o.footnoteCounts={},o.patch=Go,o.applyData=ea,o.one=a,o.all=s,o.wrap=na,o.augment=l,Mt(e,"footnoteDefinition",f=>{let c=String(f.identifier).toUpperCase();Je.call(i,c)||(i[c]=f)}),o;function l(f,c){if(f&&"data"in f&&f.data){let u=f.data;u.hName&&(c.type!=="element"&&(c={type:"element",tagName:"",properties:{},children:[]}),c.tagName=u.hName),c.type==="element"&&u.hProperties&&(c.properties=J(J({},c.properties),u.hProperties)),"children"in c&&c.children&&u.hChildren&&(c.children=u.hChildren)}if(f){let u="type"in f?f:{position:f};Xo(u)||(c.position={start:Lt(u),end:It(u)})}return c}function o(f,c,u,d){return Array.isArray(u)&&(d=u,u={}),l(f,{type:"element",tagName:c,properties:u||{},children:d||[]})}function a(f,c){return tr(o,f,c)}function s(f){return Rt(o,f)}}function Go(e,t){e.position&&(t.position=Mo(e))}function ea(e,t){let n=t;if(e&&e.data){let r=e.data.hName,i=e.data.hChildren,l=e.data.hProperties;typeof r=="string"&&(n.type==="element"?n.tagName=r:n={type:"element",tagName:r,properties:{},children:[]}),n.type==="element"&&l&&(n.properties=J(J({},n.properties),l)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function tr(e,t,n){let r=t&&t.type;if(!r)throw new Error("Expected node, got `"+t+"`");return Je.call(e.handlers,r)?e.handlers[r](e,t,n):e.passThrough&&e.passThrough.includes(r)?"children"in t?we(J({},t),{children:Rt(e,t)}):t:e.unknownHandler?e.unknownHandler(e,t,n):ta(e,t)}function Rt(e,t){let n=[];if("children"in t){let r=t.children,i=-1;for(;++i<r.length;){let l=tr(e,r[i],t);if(l){if(i&&r[i-1].type==="break"&&(!Array.isArray(l)&&l.type==="text"&&(l.value=l.value.replace(/^\s+/,"")),!Array.isArray(l)&&l.type==="element")){let o=l.children[0];o&&o.type==="text"&&(o.value=o.value.replace(/^\s+/,""))}Array.isArray(l)?n.push(...l):n.push(l)}}}return n}function ta(e,t){let n=t.data||{},r="value"in t&&!(Je.call(n,"hProperties")||Je.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:Rt(e,t)};return e.patch(t,r),e.applyData(t,r)}function na(e,t){let n=[],r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function ra(e){let t=[],n=-1;for(;++n<e.footnoteOrder.length;){let r=e.footnoteById[e.footnoteOrder[n]];if(!r)continue;let i=e.all(r),l=String(r.identifier).toUpperCase(),o=Me(l.toLowerCase()),a=0,s=[];for(;++a<=e.footnoteCounts[l];){let u={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fnref-"+o+(a>1?"-"+a:""),dataFootnoteBackref:!0,className:["data-footnote-backref"],ariaLabel:e.footnoteBackLabel},children:[{type:"text",value:"↩"}]};a>1&&u.children.push({type:"element",tagName:"sup",children:[{type:"text",value:String(a)}]}),s.length>0&&s.push({type:"text",value:" "}),s.push(u)}let f=i[i.length-1];if(f&&f.type==="element"&&f.tagName==="p"){let u=f.children[f.children.length-1];u&&u.type==="text"?u.value+=" ":f.children.push({type:"text",value:" "}),f.children.push(...s)}else i.push(...s);let c={type:"element",tagName:"li",properties:{id:e.clobberPrefix+"fn-"+o},children:e.wrap(i,!0)};e.patch(r,c),t.push(c)}if(t.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:e.footnoteLabelTagName,properties:we(J({},JSON.parse(JSON.stringify(e.footnoteLabelProperties))),{id:"footnote-label"}),children:[{type:"text",value:e.footnoteLabel}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(t,!0)},{type:"text",value:`
`}]}}function nr(e,t){let n=Zo(e,t),r=n.one(e,null),i=ra(n);return i&&r.children.push({type:"text",value:`
`},i),Array.isArray(r)?{type:"root",children:r}:r}var la=function(e,t){return e&&"run"in e?oa(e,t):aa(e||t)},ia=la;function oa(e,t){return(n,r,i)=>{e.run(nr(n,t),r,l=>{i(l)})}}function aa(e){return t=>nr(t,e)}var j=de(Vr(),1),Ve=class{constructor(e,t,n){this.property=e,this.normal=t,n&&(this.space=n)}};Ve.prototype.property={};Ve.prototype.normal={};Ve.prototype.space=null;function rr(e,t){let n={},r={},i=-1;for(;++i<e.length;)Object.assign(n,e[i].property),Object.assign(r,e[i].normal);return new Ve(n,r,t)}function Et(e){return e.toLowerCase()}var ae=class{constructor(e,t){this.property=e,this.attribute=t}};ae.prototype.space=null;ae.prototype.boolean=!1;ae.prototype.booleanish=!1;ae.prototype.overloadedBoolean=!1;ae.prototype.number=!1;ae.prototype.commaSeparated=!1;ae.prototype.spaceSeparated=!1;ae.prototype.commaOrSpaceSeparated=!1;ae.prototype.mustUseProperty=!1;ae.prototype.defined=!1;var Ze={};Tn(Ze,{boolean:()=>_,booleanish:()=>X,commaOrSpaceSeparated:()=>re,commaSeparated:()=>ze,number:()=>C,overloadedBoolean:()=>lr,spaceSeparated:()=>K});var ua=0,_=De(),X=De(),lr=De(),C=De(),K=De(),ze=De(),re=De();function De(){return 2**++ua}var ht=Object.keys(Ze),jt=class extends ae{constructor(e,t,n,r){let i=-1;if(super(e,t),gn(this,"space",r),typeof n=="number")for(;++i<ht.length;){let l=ht[i];gn(this,ht[i],(n&Ze[l])===Ze[l])}}};jt.prototype.defined=!0;function gn(e,t,n){n&&(e[t]=n)}var sa={}.hasOwnProperty;function Re(e){let t={},n={},r;for(r in e.properties)if(sa.call(e.properties,r)){let i=e.properties[r],l=new jt(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(l.mustUseProperty=!0),t[r]=l,n[Et(r)]=r,n[Et(l.attribute)]=r}return new Ve(t,n,e.space)}var ir=Re({space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),or=Re({space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function ar(e,t){return t in e?e[t]:t}function ur(e,t){return ar(e,t.toLowerCase())}var sr=Re({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:ur,properties:{xmlns:null,xmlnsXLink:null}}),cr=Re({transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:X,ariaAutoComplete:null,ariaBusy:X,ariaChecked:X,ariaColCount:C,ariaColIndex:C,ariaColSpan:C,ariaControls:K,ariaCurrent:null,ariaDescribedBy:K,ariaDetails:null,ariaDisabled:X,ariaDropEffect:K,ariaErrorMessage:null,ariaExpanded:X,ariaFlowTo:K,ariaGrabbed:X,ariaHasPopup:null,ariaHidden:X,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:K,ariaLevel:C,ariaLive:null,ariaModal:X,ariaMultiLine:X,ariaMultiSelectable:X,ariaOrientation:null,ariaOwns:K,ariaPlaceholder:null,ariaPosInSet:C,ariaPressed:X,ariaReadOnly:X,ariaRelevant:null,ariaRequired:X,ariaRoleDescription:K,ariaRowCount:C,ariaRowIndex:C,ariaRowSpan:C,ariaSelected:X,ariaSetSize:C,ariaSort:null,ariaValueMax:C,ariaValueMin:C,ariaValueNow:C,ariaValueText:null,role:null}}),ca=Re({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:ur,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:ze,acceptCharset:K,accessKey:K,action:null,allow:null,allowFullScreen:_,allowPaymentRequest:_,allowUserMedia:_,alt:null,as:null,async:_,autoCapitalize:null,autoComplete:K,autoFocus:_,autoPlay:_,blocking:K,capture:_,charSet:null,checked:_,cite:null,className:K,cols:C,colSpan:null,content:null,contentEditable:X,controls:_,controlsList:K,coords:C|ze,crossOrigin:null,data:null,dateTime:null,decoding:null,default:_,defer:_,dir:null,dirName:null,disabled:_,download:lr,draggable:X,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:_,formTarget:null,headers:K,height:C,hidden:_,high:C,href:null,hrefLang:null,htmlFor:K,httpEquiv:K,id:null,imageSizes:null,imageSrcSet:null,inert:_,inputMode:null,integrity:null,is:null,isMap:_,itemId:null,itemProp:K,itemRef:K,itemScope:_,itemType:K,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:_,low:C,manifest:null,max:null,maxLength:C,media:null,method:null,min:null,minLength:C,multiple:_,muted:_,name:null,nonce:null,noModule:_,noValidate:_,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:_,optimum:C,pattern:null,ping:K,placeholder:null,playsInline:_,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:_,referrerPolicy:null,rel:K,required:_,reversed:_,rows:C,rowSpan:C,sandbox:K,scope:null,scoped:_,seamless:_,selected:_,shadowRootDelegatesFocus:_,shadowRootMode:null,shape:null,size:C,sizes:null,slot:null,span:C,spellCheck:X,src:null,srcDoc:null,srcLang:null,srcSet:null,start:C,step:null,style:null,tabIndex:C,target:null,title:null,translate:null,type:null,typeMustMatch:_,useMap:null,value:X,width:C,wrap:null,align:null,aLink:null,archive:K,axis:null,background:null,bgColor:null,border:C,borderColor:null,bottomMargin:C,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:_,declare:_,event:null,face:null,frame:null,frameBorder:null,hSpace:C,leftMargin:C,link:null,longDesc:null,lowSrc:null,marginHeight:C,marginWidth:C,noResize:_,noHref:_,noShade:_,noWrap:_,object:null,profile:null,prompt:null,rev:null,rightMargin:C,rules:null,scheme:null,scrolling:X,standby:null,summary:null,text:null,topMargin:C,valueType:null,version:null,vAlign:null,vLink:null,vSpace:C,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:_,disableRemotePlayback:_,prefix:null,property:null,results:C,security:null,unselectable:null}}),fa=Re({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:ar,properties:{about:re,accentHeight:C,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:C,amplitude:C,arabicForm:null,ascent:C,attributeName:null,attributeType:null,azimuth:C,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:C,by:null,calcMode:null,capHeight:C,className:K,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:C,diffuseConstant:C,direction:null,display:null,dur:null,divisor:C,dominantBaseline:null,download:_,dx:null,dy:null,edgeMode:null,editable:null,elevation:C,enableBackground:null,end:null,event:null,exponent:C,externalResourcesRequired:null,fill:null,fillOpacity:C,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:ze,g2:ze,glyphName:ze,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:C,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:C,horizOriginX:C,horizOriginY:C,id:null,ideographic:C,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:C,k:C,k1:C,k2:C,k3:C,k4:C,kernelMatrix:re,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:C,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:C,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:C,overlineThickness:C,paintOrder:null,panose1:null,path:null,pathLength:C,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:K,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:C,pointsAtY:C,pointsAtZ:C,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:re,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:re,rev:re,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:re,requiredFeatures:re,requiredFonts:re,requiredFormats:re,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:C,specularExponent:C,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:C,strikethroughThickness:C,string:null,stroke:null,strokeDashArray:re,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:C,strokeOpacity:C,strokeWidth:null,style:null,surfaceScale:C,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:re,tabIndex:C,tableValues:null,target:null,targetX:C,targetY:C,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:re,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:C,underlineThickness:C,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:C,values:null,vAlphabetic:C,vMathematical:C,vectorEffect:null,vHanging:C,vIdeographic:C,version:null,vertAdvY:C,vertOriginX:C,vertOriginY:C,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:C,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),pa=/^data[-\w.:]+$/i,yn=/-[a-z]/g,da=/[A-Z]/g;function ha(e,t){let n=Et(t),r=t,i=ae;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&pa.test(t)){if(t.charAt(4)==="-"){let l=t.slice(5).replace(yn,ga);r="data"+l.charAt(0).toUpperCase()+l.slice(1)}else{let l=t.slice(4);if(!yn.test(l)){let o=l.replace(da,ma);o.charAt(0)!=="-"&&(o="-"+o),t="data"+o}}i=jt}return new i(r,t)}function ma(e){return"-"+e.toLowerCase()}function ga(e){return e.charAt(1).toUpperCase()}var kn={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},ya=rr([or,ir,sr,cr,ca],"html"),ka=rr([or,ir,sr,cr,fa],"svg");function ba(e){if(e.allowedElements&&e.disallowedElements)throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");if(e.allowedElements||e.disallowedElements||e.allowElement)return t=>{Mt(t,"element",(n,r,i)=>{let l=i,o;if(e.allowedElements?o=!e.allowedElements.includes(n.tagName):e.disallowedElements&&(o=e.disallowedElements.includes(n.tagName)),!o&&e.allowElement&&typeof r=="number"&&(o=!e.allowElement(n,r,l)),o&&typeof r=="number")return e.unwrapDisallowed&&n.children?l.children.splice(r,1,...n.children):l.children.splice(r,1),r})}}var mt=de(Tt(),1),xa=de(Nr(),1);function va(e){let t=e&&typeof e=="object"&&e.type==="text"?e.value||"":e;return typeof t=="string"&&t.replace(/[ \t\n\f\r]/g,"")===""}function wa(e){return e.join(" ").trim()}function Sa(e,t){let n=t||{};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}var Ca=de($r(),1),Fa=Ca.default,At={}.hasOwnProperty,Ea=new Set(["table","thead","tbody","tfoot","tr"]);function fr(e,t){let n=[],r=-1,i;for(;++r<t.children.length;)i=t.children[r],i.type==="element"?n.push(Aa(e,i,r,t)):i.type==="text"?(t.type!=="element"||!Ea.has(t.tagName)||!va(i))&&n.push(i.value):i.type==="raw"&&!e.options.skipHtml&&n.push(i.value);return n}function Aa(e,t,n,r){let i=e.options,l=i.transformLinkUri===void 0?Kr:i.transformLinkUri,o=e.schema,a=t.tagName,s={},f=o,c;if(o.space==="html"&&a==="svg"&&(f=ka,e.schema=f),t.properties)for(c in t.properties)At.call(t.properties,c)&&Ta(s,c,t.properties[c],e);(a==="ol"||a==="ul")&&e.listDepth++;let u=fr(e,t);(a==="ol"||a==="ul")&&e.listDepth--,e.schema=o;let d=t.position||{start:{line:null,column:null,offset:null},end:{line:null,column:null,offset:null}},p=i.components&&At.call(i.components,a)?i.components[a]:a,y=typeof p=="string"||p===mt.default.Fragment;if(!xa.default.isValidElementType(p))throw new TypeError(`Component for name \`${a}\` not defined or is not renderable`);if(s.key=n,a==="a"&&i.linkTarget&&(s.target=typeof i.linkTarget=="function"?i.linkTarget(String(s.href||""),t.children,typeof s.title=="string"?s.title:null):i.linkTarget),a==="a"&&l&&(s.href=l(String(s.href||""),t.children,typeof s.title=="string"?s.title:null)),!y&&a==="code"&&r.type==="element"&&r.tagName!=="pre"&&(s.inline=!0),!y&&(a==="h1"||a==="h2"||a==="h3"||a==="h4"||a==="h5"||a==="h6")&&(s.level=Number.parseInt(a.charAt(1),10)),a==="img"&&i.transformImageUri&&(s.src=i.transformImageUri(String(s.src||""),String(s.alt||""),typeof s.title=="string"?s.title:null)),!y&&a==="li"&&r.type==="element"){let b=Da(t);s.checked=b&&b.properties?!!b.properties.checked:null,s.index=gt(r,t),s.ordered=r.tagName==="ol"}return!y&&(a==="ol"||a==="ul")&&(s.ordered=a==="ol",s.depth=e.listDepth),(a==="td"||a==="th")&&(s.align&&(s.style||(s.style={}),s.style.textAlign=s.align,delete s.align),y||(s.isHeader=a==="th")),!y&&a==="tr"&&r.type==="element"&&(s.isHeader=r.tagName==="thead"),i.sourcePos&&(s["data-sourcepos"]=La(d)),!y&&i.rawSourcePos&&(s.sourcePosition=t.position),!y&&i.includeElementIndex&&(s.index=gt(r,t),s.siblingCount=gt(r)),y||(s.node=t),u.length>0?mt.default.createElement(p,s,u):mt.default.createElement(p,s)}function Da(e){let t=-1;for(;++t<e.children.length;){let n=e.children[t];if(n.type==="element"&&n.tagName==="input")return n}return null}function gt(e,t){let n=-1,r=0;for(;++n<e.children.length&&e.children[n]!==t;)e.children[n].type==="element"&&r++;return r}function Ta(e,t,n,r){let i=ha(r.schema,t),l=n;l==null||l!==l||(Array.isArray(l)&&(l=i.commaSeparated?Sa(l):wa(l)),i.property==="style"&&typeof l=="string"&&(l=Oa(l)),i.space&&i.property?e[At.call(kn,i.property)?kn[i.property]:i.property]=l:i.attribute&&(e[i.attribute]=l))}function Oa(e){let t={};try{Fa(e,n)}catch{}return t;function n(r,i){let l=r.slice(0,4)==="-ms-"?`ms-${r.slice(4)}`:r;t[l.replace(/-([a-z])/g,Pa)]=i}}function Pa(e,t){return t.toUpperCase()}function La(e){return[e.start.line,":",e.start.column,"-",e.end.line,":",e.end.column].map(String).join("")}var bn={}.hasOwnProperty,Ia="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",$e={plugins:{to:"remarkPlugins",id:"change-plugins-to-remarkplugins"},renderers:{to:"components",id:"change-renderers-to-components"},astPlugins:{id:"remove-buggy-html-in-markdown-parser"},allowDangerousHtml:{id:"remove-buggy-html-in-markdown-parser"},escapeHtml:{id:"remove-buggy-html-in-markdown-parser"},source:{to:"children",id:"change-source-to-children"},allowNode:{to:"allowElement",id:"replace-allownode-allowedtypes-and-disallowedtypes"},allowedTypes:{to:"allowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},disallowedTypes:{to:"disallowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},includeNodeIndex:{to:"includeElementIndex",id:"change-includenodeindex-to-includeelementindex"}};function pr(e){for(let l in $e)if(bn.call($e,l)&&bn.call(e,l)){let o=$e[l];console.warn(`[react-markdown] Warning: please ${o.to?`use \`${o.to}\` instead of`:"remove"} \`${l}\` (see <${Ia}#${o.id}> for more info)`),delete $e[l]}let t=cl().use(mo).use(e.remarkPlugins||[]).use(ia,we(J({},e.remarkRehypeOptions),{allowDangerousHtml:!0})).use(e.rehypePlugins||[]).use(ba,e),n=new Pn;typeof e.children=="string"?n.value=e.children:e.children!==void 0&&e.children!==null&&console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`);let r=t.runSync(t.parse(n),n);if(r.type!=="root")throw new TypeError("Expected a `root` node");let i=it.default.createElement(it.default.Fragment,{},fr({options:e,schema:ya,listDepth:0},r));return e.className&&(i=it.default.createElement("div",{className:e.className},i)),i}pr.propTypes={children:j.default.string,className:j.default.string,allowElement:j.default.func,allowedElements:j.default.arrayOf(j.default.string),disallowedElements:j.default.arrayOf(j.default.string),unwrapDisallowed:j.default.bool,remarkPlugins:j.default.arrayOf(j.default.oneOfType([j.default.object,j.default.func,j.default.arrayOf(j.default.oneOfType([j.default.bool,j.default.string,j.default.object,j.default.func,j.default.arrayOf(j.default.any)]))])),rehypePlugins:j.default.arrayOf(j.default.oneOfType([j.default.object,j.default.func,j.default.arrayOf(j.default.oneOfType([j.default.bool,j.default.string,j.default.object,j.default.func,j.default.arrayOf(j.default.any)]))])),sourcePos:j.default.bool,rawSourcePos:j.default.bool,skipHtml:j.default.bool,includeElementIndex:j.default.bool,transformLinkUri:j.default.oneOfType([j.default.func,j.default.bool]),linkTarget:j.default.oneOfType([j.default.func,j.default.string]),transformImageUri:j.default.func,components:j.default.object};var za=`
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
`,Ma=(0,Qr.default)(pr)`
  ${za}
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
`,Ra={tokenize:Ua,partial:!0},dr={tokenize:qa,partial:!0},hr={tokenize:Va,partial:!0},mr={tokenize:Wa,partial:!0},ja={tokenize:$a,partial:!0},gr={tokenize:Na,previous:kr},yr={tokenize:Ha,previous:br},be={tokenize:Ba,previous:xr},he={},_a={text:he},Fe=48;for(;Fe<123;)he[Fe]=be,Fe++,Fe===58?Fe=65:Fe===91&&(Fe=97);he[43]=be;he[45]=be;he[46]=be;he[95]=be;he[72]=[be,yr];he[104]=[be,yr];he[87]=[be,gr];he[119]=[be,gr];function Ba(e,t,n){let r=this,i,l;return o;function o(u){return!Dt(u)||!xr.call(r,r.previous)||_t(r.events)?n(u):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(u))}function a(u){return Dt(u)?(e.consume(u),a):u===64?(e.consume(u),s):n(u)}function s(u){return u===46?e.check(ja,c,f)(u):u===45||u===95||G(u)?(l=!0,e.consume(u),s):c(u)}function f(u){return e.consume(u),i=!0,s}function c(u){return l&&i&&ee(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(u)):n(u)}}function Na(e,t,n){let r=this;return i;function i(o){return o!==87&&o!==119||!kr.call(r,r.previous)||_t(r.events)?n(o):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(Ra,e.attempt(dr,e.attempt(hr,l),n),n)(o))}function l(o){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(o)}}function Ha(e,t,n){let r=this,i="",l=!1;return o;function o(u){return(u===72||u===104)&&br.call(r,r.previous)&&!_t(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),i+=String.fromCodePoint(u),e.consume(u),a):n(u)}function a(u){if(ee(u)&&i.length<5)return i+=String.fromCodePoint(u),e.consume(u),a;if(u===58){let d=i.toLowerCase();if(d==="http"||d==="https")return e.consume(u),s}return n(u)}function s(u){return u===47?(e.consume(u),l?f:(l=!0,s)):n(u)}function f(u){return u===null||Ye(u)||W(u)||Ee(u)||Ge(u)?n(u):e.attempt(dr,e.attempt(hr,c),n)(u)}function c(u){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(u)}}function Ua(e,t,n){let r=0;return i;function i(o){return(o===87||o===119)&&r<3?(r++,e.consume(o),i):o===46&&r===3?(e.consume(o),l):n(o)}function l(o){return o===null?n(o):t(o)}}function qa(e,t,n){let r,i,l;return o;function o(f){return f===46||f===95?e.check(mr,s,a)(f):f===null||W(f)||Ee(f)||f!==45&&Ge(f)?s(f):(l=!0,e.consume(f),o)}function a(f){return f===95?r=!0:(i=r,r=void 0),e.consume(f),o}function s(f){return i||r||!l?n(f):t(f)}}function Va(e,t){let n=0,r=0;return i;function i(o){return o===40?(n++,e.consume(o),i):o===41&&r<n?l(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?e.check(mr,t,l)(o):o===null||W(o)||Ee(o)?t(o):(e.consume(o),i)}function l(o){return o===41&&r++,e.consume(o),i}}function Wa(e,t,n){return r;function r(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),r):a===38?(e.consume(a),l):a===93?(e.consume(a),i):a===60||a===null||W(a)||Ee(a)?t(a):n(a)}function i(a){return a===null||a===40||a===91||W(a)||Ee(a)?t(a):r(a)}function l(a){return ee(a)?o(a):n(a)}function o(a){return a===59?(e.consume(a),r):ee(a)?(e.consume(a),o):n(a)}}function $a(e,t,n){return r;function r(l){return e.consume(l),i}function i(l){return G(l)?n(l):t(l)}}function kr(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||W(e)}function br(e){return!ee(e)}function xr(e){return!(e===47||Dt(e))}function Dt(e){return e===43||e===45||e===46||e===95||G(e)}function _t(e){let t=e.length,n=!1;for(;t--;){let r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}var Qa={tokenize:tu,partial:!0};function Ka(){return{document:{91:{tokenize:Za,continuation:{tokenize:Ga},exit:eu}},text:{91:{tokenize:Ja},93:{add:"after",tokenize:Ya,resolveTo:Xa}}}}function Ya(e,t,n){let r=this,i=r.events.length,l=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),o;for(;i--;){let s=r.events[i][1];if(s.type==="labelImage"){o=s;break}if(s.type==="gfmFootnoteCall"||s.type==="labelLink"||s.type==="label"||s.type==="image"||s.type==="link")break}return a;function a(s){if(!o||!o._balanced)return n(s);let f=ce(r.sliceSerialize({start:o.end,end:r.now()}));return f.codePointAt(0)!==94||!l.includes(f.slice(1))?n(s):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(s),e.exit("gfmFootnoteCallLabelMarker"),t(s))}}function Xa(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";let r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;let l={type:"gfmFootnoteCallString",start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},l.start),end:Object.assign({},l.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",i,t],["exit",i,t],["enter",l,t],["enter",o,t],["exit",o,t],["exit",l,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function Ja(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),l=0,o;return a;function a(u){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(u),e.exit("gfmFootnoteCallLabelMarker"),s}function s(u){return u!==94?n(u):(e.enter("gfmFootnoteCallMarker"),e.consume(u),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",f)}function f(u){if(l>999||u===93&&!o||u===null||u===91||W(u))return n(u);if(u===93){e.exit("chunkString");let d=e.exit("gfmFootnoteCallString");return i.includes(ce(r.sliceSerialize(d)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(u),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(u)}return W(u)||(o=!0),l++,e.consume(u),u===92?c:f}function c(u){return u===91||u===92||u===93?(e.consume(u),l++,f):f(u)}}function Za(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),l,o=0,a;return s;function s(y){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionLabelMarker"),f}function f(y){return y===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",c):n(y)}function c(y){if(o>999||y===93&&!a||y===null||y===91||W(y))return n(y);if(y===93){e.exit("chunkString");let b=e.exit("gfmFootnoteDefinitionLabelString");return l=ce(r.sliceSerialize(b)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),d}return W(y)||(a=!0),o++,e.consume(y),y===92?u:c}function u(y){return y===91||y===92||y===93?(e.consume(y),o++,c):c(y)}function d(y){return y===58?(e.enter("definitionMarker"),e.consume(y),e.exit("definitionMarker"),i.includes(l)||i.push(l),H(e,p,"gfmFootnoteDefinitionWhitespace")):n(y)}function p(y){return t(y)}}function Ga(e,t,n){return e.check(qe,t,e.attempt(Qa,t,n))}function eu(e){e.exit("gfmFootnoteDefinition")}function tu(e,t,n){let r=this;return H(e,i,"gfmFootnoteDefinitionIndent",5);function i(l){let o=r.events[r.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?t(l):n(l)}}function nu(e){let t=(e||{}).singleTilde,n={tokenize:i,resolveAll:r};return t==null&&(t=!0),{text:{126:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function r(l,o){let a=-1;for(;++a<l.length;)if(l[a][0]==="enter"&&l[a][1].type==="strikethroughSequenceTemporary"&&l[a][1]._close){let s=a;for(;s--;)if(l[s][0]==="exit"&&l[s][1].type==="strikethroughSequenceTemporary"&&l[s][1]._open&&l[a][1].end.offset-l[a][1].start.offset===l[s][1].end.offset-l[s][1].start.offset){l[a][1].type="strikethroughSequence",l[s][1].type="strikethroughSequence";let f={type:"strikethrough",start:Object.assign({},l[s][1].start),end:Object.assign({},l[a][1].end)},c={type:"strikethroughText",start:Object.assign({},l[s][1].end),end:Object.assign({},l[a][1].start)},u=[["enter",f,o],["enter",l[s][1],o],["exit",l[s][1],o],["enter",c,o]],d=o.parser.constructs.insideSpan.null;d&&le(u,u.length,0,et(d,l.slice(s+1,a),o)),le(u,u.length,0,[["exit",c,o],["enter",l[a][1],o],["exit",l[a][1],o],["exit",f,o]]),le(l,s-1,a-s+3,u),a=s+u.length-2;break}}for(a=-1;++a<l.length;)l[a][1].type==="strikethroughSequenceTemporary"&&(l[a][1].type="data");return l}function i(l,o,a){let s=this.previous,f=this.events,c=0;return u;function u(p){return s===126&&f[f.length-1][1].type!=="characterEscape"?a(p):(l.enter("strikethroughSequenceTemporary"),d(p))}function d(p){let y=Xe(s);if(p===126)return c>1?a(p):(l.consume(p),c++,d);if(c<2&&!t)return a(p);let b=l.exit("strikethroughSequenceTemporary"),w=Xe(p);return b._open=!w||w===2&&!!y,b._close=!y||y===2&&!!w,o(p)}}}var ru=class{constructor(){this.map=[]}add(e,t,n){lu(this,e,t,n)}consume(e){if(this.map.sort((i,l)=>i[0]-l[0]),this.map.length===0)return;let t=this.map.length,n=[];for(;t>0;)t-=1,n.push(e.slice(this.map[t][0]+this.map[t][1])),n.push(this.map[t][2]),e.length=this.map[t][0];n.push([...e]),e.length=0;let r=n.pop();for(;r;)e.push(...r),r=n.pop();this.map.length=0}};function lu(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function iu(e,t){let n=!1,r=[];for(;t<e.length;){let i=e[t];if(n){if(i[0]==="enter")i[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(i[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){let l=r.length-1;r[l]=r[l]==="left"?"center":"right"}}else if(i[1].type==="tableDelimiterRow")break}else i[0]==="enter"&&i[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}var ou={flow:{null:{tokenize:au,resolveAll:uu}}};function au(e,t,n){let r=this,i=0,l=0,o;return a;function a(x){let D=r.events.length-1;for(;D>-1;){let $=r.events[D][1].type;if($==="lineEnding"||$==="linePrefix")D--;else break}let O=D>-1?r.events[D][1].type:null,U=O==="tableHead"||O==="tableRow"?k:s;return U===k&&r.parser.lazy[r.now().line]?n(x):U(x)}function s(x){return e.enter("tableHead"),e.enter("tableRow"),f(x)}function f(x){return x===124||(o=!0,l+=1),c(x)}function c(x){return x===null?n(x):I(x)?l>1?(l=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),p):n(x):N(x)?H(e,c,"whitespace")(x):(l+=1,o&&(o=!1,i+=1),x===124?(e.enter("tableCellDivider"),e.consume(x),e.exit("tableCellDivider"),o=!0,c):(e.enter("data"),u(x)))}function u(x){return x===null||x===124||W(x)?(e.exit("data"),c(x)):(e.consume(x),x===92?d:u)}function d(x){return x===92||x===124?(e.consume(x),u):u(x)}function p(x){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(x):(e.enter("tableDelimiterRow"),o=!1,N(x)?H(e,y,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):y(x))}function y(x){return x===45||x===58?w(x):x===124?(o=!0,e.enter("tableCellDivider"),e.consume(x),e.exit("tableCellDivider"),b):z(x)}function b(x){return N(x)?H(e,w,"whitespace")(x):w(x)}function w(x){return x===58?(l+=1,o=!0,e.enter("tableDelimiterMarker"),e.consume(x),e.exit("tableDelimiterMarker"),g):x===45?(l+=1,g(x)):x===null||I(x)?T(x):z(x)}function g(x){return x===45?(e.enter("tableDelimiterFiller"),E(x)):z(x)}function E(x){return x===45?(e.consume(x),E):x===58?(o=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(x),e.exit("tableDelimiterMarker"),S):(e.exit("tableDelimiterFiller"),S(x))}function S(x){return N(x)?H(e,T,"whitespace")(x):T(x)}function T(x){return x===124?y(x):x===null||I(x)?!o||i!==l?z(x):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(x)):z(x)}function z(x){return n(x)}function k(x){return e.enter("tableRow"),A(x)}function A(x){return x===124?(e.enter("tableCellDivider"),e.consume(x),e.exit("tableCellDivider"),A):x===null||I(x)?(e.exit("tableRow"),t(x)):N(x)?H(e,A,"whitespace")(x):(e.enter("data"),R(x))}function R(x){return x===null||x===124||W(x)?(e.exit("data"),A(x)):(e.consume(x),x===92?B:R)}function B(x){return x===92||x===124?(e.consume(x),R):R(x)}}function uu(e,t){let n=-1,r=!0,i=0,l=[0,0,0,0],o=[0,0,0,0],a=!1,s=0,f,c,u,d=new ru;for(;++n<e.length;){let p=e[n],y=p[1];p[0]==="enter"?y.type==="tableHead"?(a=!1,s!==0&&(xn(d,t,s,f,c),c=void 0,s=0),f={type:"table",start:Object.assign({},y.start),end:Object.assign({},y.end)},d.add(n,0,[["enter",f,t]])):y.type==="tableRow"||y.type==="tableDelimiterRow"?(r=!0,u=void 0,l=[0,0,0,0],o=[0,n+1,0,0],a&&(a=!1,c={type:"tableBody",start:Object.assign({},y.start),end:Object.assign({},y.end)},d.add(n,0,[["enter",c,t]])),i=y.type==="tableDelimiterRow"?2:c?3:1):i&&(y.type==="data"||y.type==="tableDelimiterMarker"||y.type==="tableDelimiterFiller")?(r=!1,o[2]===0&&(l[1]!==0&&(o[0]=o[1],u=Qe(d,t,l,i,void 0,u),l=[0,0,0,0]),o[2]=n)):y.type==="tableCellDivider"&&(r?r=!1:(l[1]!==0&&(o[0]=o[1],u=Qe(d,t,l,i,void 0,u)),l=o,o=[l[1],n,0,0])):y.type==="tableHead"?(a=!0,s=n):y.type==="tableRow"||y.type==="tableDelimiterRow"?(s=n,l[1]!==0?(o[0]=o[1],u=Qe(d,t,l,i,n,u)):o[1]!==0&&(u=Qe(d,t,o,i,n,u)),i=0):i&&(y.type==="data"||y.type==="tableDelimiterMarker"||y.type==="tableDelimiterFiller")&&(o[3]=n)}for(s!==0&&xn(d,t,s,f,c),d.consume(t.events),n=-1;++n<t.events.length;){let p=t.events[n];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=iu(t.events,n))}return e}function Qe(e,t,n,r,i,l){let o=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",a="tableContent";n[0]!==0&&(l.end=Object.assign({},Ie(t.events,n[0])),e.add(n[0],0,[["exit",l,t]]));let s=Ie(t.events,n[1]);if(l={type:o,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[["enter",l,t]]),n[2]!==0){let f=Ie(t.events,n[2]),c=Ie(t.events,n[3]),u={type:a,start:Object.assign({},f),end:Object.assign({},c)};if(e.add(n[2],0,[["enter",u,t]]),r!==2){let d=t.events[n[2]],p=t.events[n[3]];if(d[1].end=Object.assign({},p[1].end),d[1].type="chunkText",d[1].contentType="text",n[3]>n[2]+1){let y=n[2]+1,b=n[3]-n[2]-1;e.add(y,b,[])}}e.add(n[3]+1,0,[["exit",u,t]])}return i!==void 0&&(l.end=Object.assign({},Ie(t.events,i)),e.add(i,0,[["exit",l,t]]),l=void 0),l}function xn(e,t,n,r,i){let l=[],o=Ie(t.events,n);i&&(i.end=Object.assign({},o),l.push(["exit",i,t])),r.end=Object.assign({},o),l.push(["exit",r,t]),e.add(n+1,0,l)}function Ie(e,t){let n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}var su={tokenize:fu},cu={text:{91:su}};function fu(e,t,n){let r=this;return i;function i(s){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(s):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),l)}function l(s){return W(s)?(e.enter("taskListCheckValueUnchecked"),e.consume(s),e.exit("taskListCheckValueUnchecked"),o):s===88||s===120?(e.enter("taskListCheckValueChecked"),e.consume(s),e.exit("taskListCheckValueChecked"),o):n(s)}function o(s){return s===93?(e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(s)}function a(s){return I(s)?t(s):N(s)?e.check({tokenize:pu},t,n)(s):n(s)}}function pu(e,t,n){return H(e,r,"whitespace");function r(i){return i===null?n(i):t(i)}}function du(e){return Mn([_a,Ka(),nu(e),ou,cu])}function vn(e,t){let n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function hu(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}var mu={}.hasOwnProperty,gu=function(e,t,n,r){let i,l;typeof t=="string"||t instanceof RegExp?(l=[[t,n]],i=r):(l=t,i=n),i||(i={});let o=zt(i.ignore||[]),a=yu(l),s=-1;for(;++s<a.length;)er(e,"text",f);return e;function f(u,d){let p=-1,y;for(;++p<d.length;){let b=d[p];if(o(b,y?y.children.indexOf(b):void 0,y))return;y=b}if(y)return c(u,d)}function c(u,d){let p=d[d.length-1],y=a[s][0],b=a[s][1],w=0,g=p.children.indexOf(u),E=!1,S=[];y.lastIndex=0;let T=y.exec(u.value);for(;T;){let z=T.index,k={index:T.index,input:T.input,stack:[...d,u]},A=b(...T,k);if(typeof A=="string"&&(A=A.length>0?{type:"text",value:A}:void 0),A!==!1&&(w!==z&&S.push({type:"text",value:u.value.slice(w,z)}),Array.isArray(A)?S.push(...A):A&&S.push(A),w=z+T[0].length,E=!0),!y.global)break;T=y.exec(u.value)}return E?(w<u.value.length&&S.push({type:"text",value:u.value.slice(w)}),p.children.splice(g,1,...S)):S=[u],g+S.length}};function yu(e){let t=[];if(typeof e!="object")throw new TypeError("Expected array or object as schema");if(Array.isArray(e)){let n=-1;for(;++n<e.length;)t.push([wn(e[n][0]),Sn(e[n][1])])}else{let n;for(n in e)mu.call(e,n)&&t.push([wn(n),Sn(e[n])])}return t}function wn(e){return typeof e=="string"?new RegExp(hu(e),"g"):e}function Sn(e){return typeof e=="function"?e:()=>e}var yt="phrasing",kt=["autolink","link","image","label"],ku={transforms:[Fu],enter:{literalAutolink:xu,literalAutolinkEmail:bt,literalAutolinkHttp:bt,literalAutolinkWww:bt},exit:{literalAutolink:Cu,literalAutolinkEmail:Su,literalAutolinkHttp:vu,literalAutolinkWww:wu}},bu={unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:yt,notInConstruct:kt},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:yt,notInConstruct:kt},{character:":",before:"[ps]",after:"\\/",inConstruct:yt,notInConstruct:kt}]};function xu(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function bt(e){this.config.enter.autolinkProtocol.call(this,e)}function vu(e){this.config.exit.autolinkProtocol.call(this,e)}function wu(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.url="http://"+this.sliceSerialize(e)}function Su(e){this.config.exit.autolinkEmail.call(this,e)}function Cu(e){this.exit(e)}function Fu(e){gu(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,Eu],[/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g,Au]],{ignore:["link","linkReference"]})}function Eu(e,t,n,r,i){let l="";if(!vr(i)||(/^w/i.test(t)&&(n=t+n,t="",l="http://"),!Du(n)))return!1;let o=Tu(n+r);if(!o[0])return!1;let a={type:"link",title:null,url:l+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[a,{type:"text",value:o[1]}]:a}function Au(e,t,n,r){return!vr(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function Du(e){let t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function Tu(e){let t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")"),i=vn(e,"("),l=vn(e,")");for(;r!==-1&&i>l;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),l++;return[e,n]}function vr(e,t){let n=e.input.charCodeAt(e.index-1);return(e.index===0||Ee(n)||Ge(n))&&(!t||n!==47)}function wr(e){return e.label||!e.identifier?e.label||"":Qn(e.identifier)}function Ou(e,t,n){let r=t.indexStack,i=e.children||[],l=t.createTracker(n),o=[],a=-1;for(r.push(-1);++a<i.length;){let s=i[a];r[r.length-1]=a,o.push(l.move(t.handle(s,e,t,J({before:`
`,after:`
`},l.current())))),s.type!=="list"&&(t.bulletLastUsed=void 0),a<i.length-1&&o.push(l.move(Pu(s,i[a+1],e,t)))}return r.pop(),o.join("")}function Pu(e,t,n,r){let i=r.join.length;for(;i--;){let l=r.join[i](e,t,n,r);if(l===!0||l===1)break;if(typeof l=="number")return`
`.repeat(1+l);if(l===!1)return`

<!---->

`}return`

`}var Lu=/\r?\n|\r/g;function Iu(e,t){let n=[],r=0,i=0,l;for(;l=Lu.exec(e);)o(e.slice(r,l.index)),n.push(l[0]),r=l.index+l[0].length,i++;return o(e.slice(r)),n.join("");function o(a){n.push(t(a,i,!a))}}function Sr(e){if(!e._compiled){let t=(e.atBreak?"[\\r\\n][\\t ]*":"")+(e.before?"(?:"+e.before+")":"");e._compiled=new RegExp((t?"("+t+")":"")+(/[|\\{}()[\]^$+*?.-]/.test(e.character)?"\\":"")+e.character+(e.after?"(?:"+e.after+")":""),"g")}return e._compiled}function zu(e,t){return Cn(e,t.inConstruct,!0)&&!Cn(e,t.notInConstruct,!1)}function Cn(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function Cr(e,t,n){let r=(n.before||"")+(t||"")+(n.after||""),i=[],l=[],o={},a=-1;for(;++a<e.unsafe.length;){let c=e.unsafe[a];if(!zu(e.stack,c))continue;let u=Sr(c),d;for(;d=u.exec(r);){let p="before"in c||!!c.atBreak,y="after"in c,b=d.index+(p?d[1].length:0);i.includes(b)?(o[b].before&&!p&&(o[b].before=!1),o[b].after&&!y&&(o[b].after=!1)):(i.push(b),o[b]={before:p,after:y})}}i.sort(Mu);let s=n.before?n.before.length:0,f=r.length-(n.after?n.after.length:0);for(a=-1;++a<i.length;){let c=i[a];c<s||c>=f||c+1<f&&i[a+1]===c+1&&o[c].after&&!o[c+1].before&&!o[c+1].after||i[a-1]===c-1&&o[c].before&&!o[c-1].before&&!o[c-1].after||(s!==c&&l.push(Fn(r.slice(s,c),"\\")),s=c,/[!-/:-@[-`{-~]/.test(r.charAt(c))&&(!n.encode||!n.encode.includes(r.charAt(c)))?l.push("\\"):(l.push("&#x"+r.charCodeAt(c).toString(16).toUpperCase()+";"),s++))}return l.push(Fn(r.slice(s,f),n.after)),l.join("")}function Mu(e,t){return e-t}function Fn(e,t){let n=/\\(?=[!-/:-@[-`{-~])/g,r=[],i=[],l=e+t,o=-1,a=0,s;for(;s=n.exec(l);)r.push(s.index);for(;++o<r.length;)a!==r[o]&&i.push(e.slice(a,r[o])),i.push("\\"),a=r[o];return i.push(e.slice(a)),i.join("")}function nt(e){let t=e||{},n=t.now||{},r=t.lineShift||0,i=n.line||1,l=n.column||1;return{move:s,current:o,shift:a};function o(){return{now:{line:i,column:l},lineShift:r}}function a(f){r+=f}function s(f){let c=f||"",u=c.split(/\r?\n|\r/g),d=u[u.length-1];return i+=u.length-1,l=u.length===1?l+d.length:1+d.length+r,c}}Fr.peek=$u;function Ru(){return{enter:{gfmFootnoteDefinition:_u,gfmFootnoteDefinitionLabelString:Bu,gfmFootnoteCall:Uu,gfmFootnoteCallString:qu},exit:{gfmFootnoteDefinition:Hu,gfmFootnoteDefinitionLabelString:Nu,gfmFootnoteCall:Wu,gfmFootnoteCallString:Vu}}}function ju(){return{unsafe:[{character:"[",inConstruct:["phrasing","label","reference"]}],handlers:{footnoteDefinition:Qu,footnoteReference:Fr}}}function _u(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function Bu(){this.buffer()}function Nu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=ce(this.sliceSerialize(e)).toLowerCase()}function Hu(e){this.exit(e)}function Uu(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function qu(){this.buffer()}function Vu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=ce(this.sliceSerialize(e)).toLowerCase()}function Wu(e){this.exit(e)}function Fr(e,t,n,r){let i=nt(r),l=i.move("[^"),o=n.enter("footnoteReference"),a=n.enter("reference");return l+=i.move(Cr(n,wr(e),we(J({},i.current()),{before:l,after:"]"}))),a(),o(),l+=i.move("]"),l}function $u(){return"["}function Qu(e,t,n,r){let i=nt(r),l=i.move("[^"),o=n.enter("footnoteDefinition"),a=n.enter("label");return l+=i.move(Cr(n,wr(e),we(J({},i.current()),{before:l,after:"]"}))),a(),l+=i.move("]:"+(e.children&&e.children.length>0?" ":"")),i.shift(4),l+=i.move(Iu(Ou(e,n,i.current()),Ku)),o(),l}function Ku(e,t,n){return t===0?e:(n?"":"    ")+e}function Er(e,t,n){let r=t.indexStack,i=e.children||[],l=[],o=-1,a=n.before;r.push(-1);let s=t.createTracker(n);for(;++o<i.length;){let f=i[o],c;if(r[r.length-1]=o,o+1<i.length){let u=t.handle.handlers[i[o+1].type];u&&u.peek&&(u=u.peek),c=u?u(i[o+1],e,t,J({before:"",after:""},s.current())).charAt(0):""}else c=n.after;l.length>0&&(a==="\r"||a===`
`)&&f.type==="html"&&(l[l.length-1]=l[l.length-1].replace(/(\r?\n|\r)$/," "),a=" ",s=t.createTracker(n),s.move(l.join(""))),l.push(s.move(t.handle(f,e,t,we(J({},s.current()),{before:a,after:c})))),a=l[l.length-1].slice(-1)}return r.pop(),l.join("")}var Yu=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Ar.peek=es;var Xu={canContainEols:["delete"],enter:{strikethrough:Zu},exit:{strikethrough:Gu}},Ju={unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:Yu}],handlers:{delete:Ar}};function Zu(e){this.enter({type:"delete",children:[]},e)}function Gu(e){this.exit(e)}function Ar(e,t,n,r){let i=nt(r),l=n.enter("strikethrough"),o=i.move("~~");return o+=Er(e,n,we(J({},i.current()),{before:o,after:"~"})),o+=i.move("~~"),l(),o}function es(){return"~"}Dr.peek=ts;function Dr(e,t,n){let r=e.value||"",i="`",l=-1;for(;new RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++l<n.unsafe.length;){let o=n.unsafe[l],a=Sr(o),s;if(o.atBreak)for(;s=a.exec(r);){let f=s.index;r.charCodeAt(f)===10&&r.charCodeAt(f-1)===13&&f--,r=r.slice(0,f)+" "+r.slice(s.index+1)}}return i+r+i}function ts(){return"`"}function ns(e,t={}){let n=(t.align||[]).concat(),r=t.stringLength||ls,i=[],l=[],o=[],a=[],s=0,f=-1;for(;++f<e.length;){let y=[],b=[],w=-1;for(e[f].length>s&&(s=e[f].length);++w<e[f].length;){let g=rs(e[f][w]);if(t.alignDelimiters!==!1){let E=r(g);b[w]=E,(a[w]===void 0||E>a[w])&&(a[w]=E)}y.push(g)}l[f]=y,o[f]=b}let c=-1;if(typeof n=="object"&&"length"in n)for(;++c<s;)i[c]=En(n[c]);else{let y=En(n);for(;++c<s;)i[c]=y}c=-1;let u=[],d=[];for(;++c<s;){let y=i[c],b="",w="";y===99?(b=":",w=":"):y===108?b=":":y===114&&(w=":");let g=t.alignDelimiters===!1?1:Math.max(1,a[c]-b.length-w.length),E=b+"-".repeat(g)+w;t.alignDelimiters!==!1&&(g=b.length+g+w.length,g>a[c]&&(a[c]=g),d[c]=g),u[c]=E}l.splice(1,0,u),o.splice(1,0,d),f=-1;let p=[];for(;++f<l.length;){let y=l[f],b=o[f];c=-1;let w=[];for(;++c<s;){let g=y[c]||"",E="",S="";if(t.alignDelimiters!==!1){let T=a[c]-(b[c]||0),z=i[c];z===114?E=" ".repeat(T):z===99?T%2?(E=" ".repeat(T/2+.5),S=" ".repeat(T/2-.5)):(E=" ".repeat(T/2),S=E):S=" ".repeat(T)}t.delimiterStart!==!1&&!c&&w.push("|"),t.padding!==!1&&!(t.alignDelimiters===!1&&g==="")&&(t.delimiterStart!==!1||c)&&w.push(" "),t.alignDelimiters!==!1&&w.push(E),w.push(g),t.alignDelimiters!==!1&&w.push(S),t.padding!==!1&&w.push(" "),(t.delimiterEnd!==!1||c!==s-1)&&w.push("|")}p.push(t.delimiterEnd===!1?w.join("").replace(/ +$/,""):w.join(""))}return p.join(`
`)}function rs(e){return e==null?"":String(e)}function ls(e){return e.length}function En(e){let t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}var is={enter:{table:os,tableData:An,tableHeader:An,tableRow:us},exit:{codeText:ss,table:as,tableData:xt,tableHeader:xt,tableRow:xt}};function os(e){let t=e._align;this.enter({type:"table",align:t.map(n=>n==="none"?null:n),children:[]},e),this.setData("inTable",!0)}function as(e){this.exit(e),this.setData("inTable")}function us(e){this.enter({type:"tableRow",children:[]},e)}function xt(e){this.exit(e)}function An(e){this.enter({type:"tableCell",children:[]},e)}function ss(e){let t=this.resume();this.getData("inTable")&&(t=t.replace(/\\([\\|])/g,cs));let n=this.stack[this.stack.length-1];n.value=t,this.exit(e)}function cs(e,t){return t==="|"?t:e}function fs(e){let t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,l=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{table:o,tableRow:a,tableCell:s,inlineCode:d}};function o(p,y,b,w){return f(c(p,b,w),p.align)}function a(p,y,b,w){let g=u(p,b,w),E=f([g]);return E.slice(0,E.indexOf(`
`))}function s(p,y,b,w){let g=b.enter("tableCell"),E=b.enter("phrasing"),S=Er(p,b,we(J({},w),{before:l,after:l}));return E(),g(),S}function f(p,y){return ns(p,{align:y,alignDelimiters:r,padding:n,stringLength:i})}function c(p,y,b){let w=p.children,g=-1,E=[],S=y.enter("table");for(;++g<w.length;)E[g]=u(w[g],y,b);return S(),E}function u(p,y,b){let w=p.children,g=-1,E=[],S=y.enter("tableRow");for(;++g<w.length;)E[g]=s(w[g],p,y,b);return S(),E}function d(p,y,b){let w=Dr(p,y,b);return b.stack.includes("tableCell")&&(w=w.replace(/\|/g,"\\$&")),w}}function ps(e){let t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function ds(e){let t=e.options.listItemIndent||"tab";if(t===1||t==="1")return"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function hs(e,t,n,r){let i=ds(n),l=n.bulletCurrent||ps(n);t&&t.type==="list"&&t.ordered&&(l=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+l);let o=l.length+1;(i==="tab"||i==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(o=Math.ceil(o/4)*4);let a=n.createTracker(r);a.move(l+" ".repeat(o-l.length)),a.shift(o);let s=n.enter("listItem"),f=n.indentLines(n.containerFlow(e,a.current()),c);return s(),f;function c(u,d,p){return d?(p?"":" ".repeat(o))+u:(p?l:l+" ".repeat(o-l.length))+u}}var ms={exit:{taskListCheckValueChecked:Dn,taskListCheckValueUnchecked:Dn,paragraph:ys}},gs={unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:ks}};function Dn(e){let t=this.stack[this.stack.length-2];t.checked=e.type==="taskListCheckValueChecked"}function ys(e){let t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){let n=this.stack[this.stack.length-1],r=n.children[0];if(r&&r.type==="text"){let i=t.children,l=-1,o;for(;++l<i.length;){let a=i[l];if(a.type==="paragraph"){o=a;break}}o===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function ks(e,t,n,r){let i=e.children[0],l=typeof e.checked=="boolean"&&i&&i.type==="paragraph",o="["+(e.checked?"x":" ")+"] ",a=nt(r);l&&a.move(o);let s=hs(e,t,n,J(J({},r),a.current()));return l&&(s=s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,f)),s;function f(c){return c+o}}function bs(){return[ku,Ru(),Xu,is,ms]}function xs(e){return{extensions:[bu,ju(),Ju,fs(e),gs]}}function vs(e={}){let t=this.data();n("micromarkExtensions",du(e)),n("fromMarkdownExtensions",bs()),n("toMarkdownExtensions",xs(e));function n(r,i){(t[r]?t[r]:t[r]=[]).push(i)}}var Tr=de(Tt(),1);function ws(e){return Tr.default.createElement("a",{href:e.href,target:"_blank",rel:"noreferrer"},e.children)}function Cs({source:e}){return Tr.default.createElement(Ma,{components:{a:ws},rehypePlugins:[vs]},e)}/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/export{Cs as default};
