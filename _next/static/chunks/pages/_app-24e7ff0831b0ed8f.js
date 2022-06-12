(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{7818:function(e,t,n){"use strict";n.d(t,{$m:function(){return w},II:function(){return y},J$:function(){return h},Ph:function(){return x},ZD:function(){return M},_7:function(){return g},q5:function(){return C},qO:function(){return d},u_:function(){return E},zx:function(){return s}});var r=n(7294),a=n(3935);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}function c(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}var l=["children","buttonType","disabled"],s=function(e){var t=e.children,n=e.buttonType,a=e.disabled,o=c(e,l);return r.createElement("button",Object.assign({className:"btn "+(a?"":i(n)),disabled:a},o),t)};function i(e){switch(e){case"Link":return"btn-link";case"Warning":return"btn-warning";case"Danger":return"btn-danger";case"Transparent":return"btn-transparent";case"Success":return"btn-success";case"Secondary":return"btn-secondary";default:return"btn-primary"}}function u(e){return void 0===e?"":" "+e}s.defaultProps={buttonType:"Primary"};var d=function(e){var t=e.position,n=e.className,a=e.children;return r.createElement("div",{className:"w-full flex flex-row rounded-md space-x-4 p-4 bg-gray-50 dark:bg-gray-900 "+f(t)+u(n)},a)};function f(e){switch(e){case"Left":return"justify-start";case"Center":return"justify-center";default:return"justify-end"}}var m=function(){return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r.createElement("path",{d:"M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32"}))},p=function(){return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"32",d:"M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"}),r.createElement("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"32"}))},h=function(e){var t=e.darkMode,n=e.onToggle;return r.createElement("button",{onClick:n,className:"h-6 w-6 focus:outline-none","aria-label":"theme toggle"},t?r.createElement(m,null):r.createElement(p,null))};function g(e,t){(0,r.useEffect)((function(){function n(n){e.current&&!e.current.contains(n.target)&&t()}return document.addEventListener("mousedown",n),function(){document.removeEventListener("mousedown",n)}}),[t,e])}var v=["label","errorMessage","className"],y=(0,r.forwardRef)((function(e,t){var n=e.label,a=e.errorMessage,o=e.className,l=c(e,v);return r.createElement("div",{className:"space-y-2"},r.createElement("label",{className:"space-y-2"},r.createElement("span",{className:"input-label"},n),r.createElement("input",Object.assign({ref:t,type:"text"},l,{className:"py-2 px-4 rounded-md shadow focus:outline-none focus:ring focus:border-indigo-400 bg-white dark:bg-gray-900 dark:text-gray-100"+u(o)}))),void 0!==a&&r.createElement("div",{className:"text-red-700 dark:text-red-600 text-sm"},a))})),E=function(e){return e.isOpen?r.createElement(k,Object.assign({},e)):null},k=function(e){var t=e.children,n=e.onDismiss,o=function(e,t){var n=(0,r.useMemo)((function(){return document.createElement("div")}),[]);t&&Object.assign(n,t);return(0,r.useEffect)((function(){var t=function(e){var t=document.getElementById(e);if(!t){var n=document.getElementsByTagName("body")[0];(t=document.createElement("div")).id=e,n.appendChild(t)}return t}(e);return t.appendChild(n),function(){null==t||t.removeChild(n)}}),[n,e]),{node:n}}("modal-root",{className:"absolute top-0 left-0 w-screen h-screen"}),c=o.node,l=r.createElement("div",{className:"h-full max-w-full center bg-opacity-50 bg-white dark:bg-opacity-50 dark:bg-black",onClick:n},r.createElement("div",{className:"bg-white dark:bg-black rounded-md m-4",onClick:function(e){return e.stopPropagation()}},t));return a.createPortal(l,c)};var b=["label","children","onSelection"],x=(0,r.forwardRef)((function(e,t){var n=e.label,a=e.children,o=e.onSelection,l=c(e,b),s=(0,r.useCallback)((function(e){null==o||o(e.currentTarget.value)}),[o]);return r.createElement("label",{className:"flex flex-col space-y-2"},r.createElement("span",{className:"input-label"},n),r.createElement("select",Object.assign({ref:t,className:"rounded-md px-4 py-2 bg-gray-100 dark:bg-gray-900 dark:text-white shadow focus:outline-none focus:ring focus:border-indigo-400",onChange:s},l),a))})),w=function(e){var t=e.value,n=e.children;return r.createElement("option",{value:t},null!=n?n:t)},M=function(e){var t=o({},e);return r.createElement("label",{className:"switch"},r.createElement("input",Object.assign({type:"checkbox"},t)),r.createElement("span",{className:"slider"}))};function O(){var e=(0,r.useState)("undefined"!==typeof window&&("theme"in localStorage?"dark"===localStorage.theme:window.matchMedia("(prefers-color-scheme: dark)").matches)),t=e[0],n=e[1];return{isDarkMode:t,setDarkMode:(0,r.useCallback)((function(e){"undefined"!==typeof window&&(localStorage.theme=e?"dark":"light"),n(e)}),[])}}function C(){var e=O(),t=e.isDarkMode,n=e.setDarkMode;return(0,r.useEffect)((function(){t?document.body.classList.contains("dark")||document.body.classList.add("dark"):document.body.classList.remove("dark")}),[t]),{isDarkMode:t,setDarkMode:n}}},7285:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;const a=((r=n(7294))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=a},9546:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=c,t.useAmp=function(){return c(a.default.useContext(o.AmpStateContext))};var r,a=(r=n(7294))&&r.__esModule?r:{default:r},o=n(7285);function c({ampFirst:e=!1,hybrid:t=!1,hasQuery:n=!1}={}){return e||t&&n}("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},6505:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=i,t.default=void 0;var r,a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294)),o=(r=n(148))&&r.__esModule?r:{default:r},c=n(7285),l=n(523),s=n(9546);n(7206);function i(e=!1){const t=[a.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(a.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function u(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce(((e,t)=>"string"===typeof t||"number"===typeof t?e:e.concat(t)),[])):e.concat(t)}const d=["name","httpEquiv","charSet","itemProp"];function f(e,t){return e.reduce(((e,t)=>{const n=a.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(u,[]).reverse().concat(i(t.inAmpMode)).filter(function(){const e=new Set,t=new Set,n=new Set,r={};return a=>{let o=!0,c=!1;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){c=!0;const t=a.key.slice(a.key.indexOf("$")+1);e.has(t)?o=!1:e.add(t)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(let e=0,t=d.length;e<t;e++){const t=d[e];if(a.props.hasOwnProperty(t))if("charSet"===t)n.has(t)?o=!1:n.add(t);else{const e=a.props[t],n=r[t]||new Set;"name"===t&&c||!n.has(e)?(n.add(e),r[t]=n):o=!1}}}return o}}()).reverse().map(((e,n)=>{const r=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((t=>e.props.href.startsWith(t)))){const t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,a.default.cloneElement(e,t)}return a.default.cloneElement(e,{key:r})}))}var m=function({children:e}){const t=a.useContext(c.AmpStateContext),n=a.useContext(l.HeadManagerContext);return a.default.createElement(o.default,{reduceComponentsToState:f,headManager:n,inAmpMode:s.isInAmpMode(t)},e)};t.default=m,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},148:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294));class a extends r.Component{constructor(e){super(e),this.emitChange=()=>{this._hasHeadManager&&this.props.headManager.updateHead(this.props.reduceComponentsToState([...this.props.headManager.mountedInstances],this.props))},this._hasHeadManager=this.props.headManager&&this.props.headManager.mountedInstances}componentDidMount(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}componentDidUpdate(){this.emitChange()}componentWillUnmount(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}render(){return null}}t.default=a},8328:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return L}});n(847);var r=n(7294);var a=({children:e})=>{const[t,n]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{n(!0)}),[]),t?r.createElement(r.Fragment,null,e):null},o=n(7818);var c=n(2370),l=n(8250),s=n(6508);var i=()=>{const{values:{preferredDisplayCurrency:e},dispatch:t}=(0,r.useContext)(s.Z),n=(0,r.useCallback)((e=>t({type:"SET DISPLAY CURRENCY",currency:e})),[t]);return r.createElement(l.Z,{label:"Preferred display currency",defaultCurrency:e,onChange:n})};var u=()=>{const{values:e,dispatch:t}=(0,r.useContext)(s.Z);return r.createElement(r.Fragment,null,r.createElement("span",null,"Theme follow OS"),r.createElement("div",{className:"flex flex-row justify-end"},r.createElement(o.ZD,{checked:e.themeFollowsOS,onChange:e=>t({type:"SET THEME TO FOLLOW OS",shouldFollowOS:e.target.checked})})),!e.themeFollowsOS&&r.createElement(r.Fragment,null,r.createElement("span",null,"Theme"),r.createElement("div",{className:"flex flex-row justify-end"},r.createElement(o.J$,{onToggle:()=>t({type:"SET THEME",preferresDarkMode:!e.preferresDarkMode}),darkMode:e.preferresDarkMode}))))};var d=()=>{const{dispatch:e}=(0,r.useContext)(s.Z),[t,n]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{(function(e="usd"){return fetch(function(e){return`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${e}.min.json`}(e)).then((async e=>await e.json()))})().then((t=>e({type:"SET CURRENCY RATES",rates:t}))).catch((()=>console.warn("Unable to load currency rates")))}),[e]),r.createElement("div",{className:"z-50"},r.createElement("button",{className:"flex h-full justify-center",title:"Settings",onClick:()=>n((e=>!e))},r.createElement(c.Fuo,{size:24})),r.createElement(o.u_,{isOpen:t,onDismiss:()=>n(!1)},r.createElement("div",{className:"space-y-4 rounded bg-indigo-100 p-4 text-black dark:bg-indigo-900 dark:text-white"},r.createElement("h2",{className:"bold col-span-2 text-xl"},"Settings"),r.createElement(f,null),r.createElement(o.zx,{buttonType:"Secondary",onClick:()=>n(!1)},"Close"))))};const f=()=>r.createElement("div",{className:"grid grid-cols-2 gap-y-4 gap-x-12"},r.createElement("div",{className:"col-span-2"},r.createElement(i,null)),r.createElement(u,null));var m=n(7538);var p=({authorizeUrl:e})=>r.createElement("a",{className:"btn btn-primary",href:e},"Login");var h=({isOpen:e,logoutUrl:t})=>r.createElement("div",{className:(e?"":"hidden")+" absolute top-full right-0 z-10 rounded bg-gray-100 py-4 shadow outline group-hover:block dark:bg-gray-700"},r.createElement("a",{href:t,className:"btn flex items-center space-x-2 hover:text-gray-900 hover:underline dark:hover:text-gray-400"},r.createElement(c.qgu,{className:"inline"}),r.createElement("span",{className:"align-middle"},"Logout")));var g=({user:e})=>r.createElement("img",{src:`${e.avatar_url}&s=80`,alt:"Avatar of the logged in user",className:"max-h-10 rounded-full",loading:"lazy"});var v=({user:e,authorizeUrl:t,logoutUrl:n})=>null===e?r.createElement(p,{authorizeUrl:t}):r.createElement(y,{user:e,logoutUrl:n});const y=({user:e,logoutUrl:t})=>{const[n,a]=(0,r.useState)(!1),c=(0,r.useRef)(null);return(0,o._7)(c,(0,r.useCallback)((()=>a(!1)),[])),console.debug(t),r.createElement("div",{ref:c,className:"relative flex items-center space-x-4"},r.createElement("span",{className:"hidden sm:inline"},e.login),r.createElement("div",{className:"group"},r.createElement("button",{onClick:()=>a((e=>!e))},r.createElement(g,{user:e}))),r.createElement(h,{isOpen:n,logoutUrl:t}))},E=[{path:"/",text:"Overview"},{path:"/stocks",text:"Stocks"},{path:"/interest",text:"Interest"},{path:"/tax",text:"Tax calculator"}];var k=()=>{const[e,t]=(0,r.useState)(!1);return r.createElement("nav",{className:"flex flex-col justify-center md:flex-row"},r.createElement("div",{className:"flex items-center"},r.createElement("button",{className:"md:hidden",title:"Menu",onClick:()=>t((e=>!e))},e?r.createElement(c.IOM,{size:32}):r.createElement(c.lIk,{size:32})),r.createElement("a",{href:"/"},r.createElement("h1",{className:"px-4 font-sans text-xl font-light uppercase md:px-0"},"Finance tracker"))),r.createElement("ul",{className:(e?"flex":"hidden")+" flex-col md:flex md:flex-row md:items-center md:space-x-4 md:pl-8"},E.map((e=>r.createElement("li",{key:e.path},r.createElement("a",{href:e.path,className:"h-full align-middle font-light hover:underline"},e.text))))))};const b="https://finance.oliverflecke.me";var x=()=>{const[e,t]=(0,r.useState)(null);return(0,r.useEffect)((()=>{fetch(`${m.NS}/${m.tW}/user/me`,{credentials:"include"}).then((e=>e.json())).catch((e=>console.error(e))).then((e=>{e&&t(e)}))}),[]),r.createElement("header",{className:"flex flex-row justify-between bg-emerald-900 px-4 py-2 text-gray-300"},r.createElement(k,null),r.createElement("div",null,r.createElement("div",{className:"flex flex-row items-center justify-center space-x-4"},r.createElement(v,{user:e,logoutUrl:`${m.NS}/signout?returnUrl=${b}`,authorizeUrl:`${m.NS}/signin?returnUrl=${b}`}),r.createElement(a,null,r.createElement(d,null)))))};var w=()=>{const[e,t]=(0,r.useState)(M()?.matches??!1),n=e=>t(e.matches);return(0,r.useEffect)((()=>{const e=M();return e?.addEventListener("change",n),()=>e?.removeEventListener("change",n)}),[]),e};function M(){return window.matchMedia("(prefers-color-scheme: dark)")}var O=(0,n(7384).n)("settings",(function(e,t){switch(t.type){case"SET CURRENCY RATES":return{...e,currencyRates:t.rates};case"SET DISPLAY CURRENCY":return{...e,preferredDisplayCurrency:t.currency};case"SET THEME":return{...e,preferresDarkMode:t.preferresDarkMode};case"SET THEME TO FOLLOW OS":return{...e,themeFollowsOS:t.shouldFollowOS};default:return console.warn(`Action not handled: ${t}`),e}}));var C=n(9436);var S=({children:e})=>{const[t,n]=(0,r.useReducer)(O,(0,C.w)()),{setDarkMode:a}=(0,o.q5)(),c=w();return(0,r.useEffect)((()=>{a(t.themeFollowsOS?c:t.preferresDarkMode)}),[t.preferresDarkMode,t.themeFollowsOS,c,a]),r.createElement(s.Z.Provider,{value:{values:t,dispatch:n}},e)},N=n(9008),j=n.n(N);var L=({Component:e,pageProps:t})=>r.createElement(r.Fragment,null,r.createElement(j(),null,r.createElement("meta",{charSet:"utf-8"}),r.createElement("link",{rel:"icon",href:"/favicon.ico"}),r.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),r.createElement("meta",{name:"theme-color",media:"(prefers-color-scheme: light)",content:"#064e3b"}),r.createElement("meta",{name:"theme-color",media:"(prefers-color-scheme: dark)",content:"#064e3b"}),r.createElement("meta",{name:"description",content:"Finance tracker"}),r.createElement("link",{rel:"apple-touch-icon",href:"/logo192.png"}),r.createElement("link",{rel:"manifest",href:"/manifest.json"}),r.createElement("meta",{name:"color-scheme",content:"dark light"})),r.createElement(S,null,r.createElement(x,null),r.createElement("main",{className:"h-full min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200"},r.createElement(e,t))))},8250:function(e,t,n){"use strict";var r=n(6508),a=n(7294);t.Z=({label:e,defaultCurrency:t,onChange:n})=>{const o=(0,a.useId)(),{values:{currencyRates:c,preferredDisplayCurrency:l}}=(0,a.useContext)(r.Z),[s,i]=(0,a.useState)(t??l),u=(0,a.useCallback)((e=>{const t=e.currentTarget.value;t&&(i(t),n(t))}),[n]);return c?a.createElement(a.Fragment,null,a.createElement("label",{htmlFor:o,className:"space-y-2"},a.createElement("span",{className:"input-label"},e),a.createElement("select",{id:o,onChange:u,className:"block rounded bg-gray-100 px-4 py-2 text-black shadow dark:bg-gray-700 dark:text-white"},Object.keys(c.usd).map((e=>e.toUpperCase())).map((e=>a.createElement("option",{key:e,value:e,selected:e===s},e)))))):null}},6508:function(e,t,n){"use strict";var r=n(7294),a=n(9436);const o=(0,r.createContext)({dispatch:e=>{},values:(0,a.O)()});t.Z=o},9436:function(e,t,n){"use strict";n.d(t,{O:function(){return o},w:function(){return a}});var r=n(7384);function a(){return(0,r.v)("settings",o())}function o(){return{preferredDisplayCurrency:"DKK",currencyRates:{usd:{},date:(new Date).toString()},themeFollowsOS:!0,preferresDarkMode:!1}}},7538:function(e,t,n){"use strict";n.d(t,{NS:function(){return a},gz:function(){return l},tW:function(){return o},v_:function(){return c},xh:function(){return r}});const r=false,a="https://finance.oliverflecke.me",o="api/v1";function c(e,t){return s("POST",e,t)}function l(e,t){return s("PUT",e,t)}function s(e,t,n){return fetch(t,{method:e,credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}},7384:function(e,t,n){"use strict";function r(e,t={}){const n=localStorage.getItem(e)??void 0;return{...t,...void 0===n||""===n?{}:JSON.parse(n)}}function a(e,t){return(n,r)=>{const a=t(n,r);return localStorage.setItem(e,JSON.stringify(a)),a}}n.d(t,{n:function(){return a},v:function(){return r}})},6840:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(8328)}])},847:function(){},9008:function(e,t,n){e.exports=n(6505)},2370:function(e,t,n){"use strict";n.d(t,{RWZ:function(){return d},lmx:function(){return f},Gal:function(){return m},IOM:function(){return p},XSk:function(){return h},qgu:function(){return g},lIk:function(){return v},A$d:function(){return y},Fuo:function(){return E},j7b:function(){return k},BFV:function(){return b}});var r=n(7294),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=r.createContext&&r.createContext(a),c=function(){return c=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},c.apply(this,arguments)},l=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function s(e){return e&&e.map((function(e,t){return r.createElement(e.tag,c({key:t},e.attr),s(e.child))}))}function i(e){return function(t){return r.createElement(u,c({attr:c({},e.attr)},t),s(e.child))}}function u(e){var t=function(t){var n,a=e.attr,o=e.size,s=e.title,i=l(e,["attr","size","title"]),u=o||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",c({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,i,{className:n,style:c(c({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),s&&r.createElement("title",null,s),e.children)};return void 0!==o?r.createElement(o.Consumer,null,(function(e){return t(e)})):t(a)}function d(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeMiterlimit:"10",strokeWidth:"32",d:"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"}},{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M256 176v160m80-80H176"}}]})(e)}function f(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"}}]})(e)}function m(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"}}]})(e)}function p(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M368 368L144 144m224 0L144 368"}}]})(e)}function h(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"circle",attr:{cx:"256",cy:"256",r:"26"}},{tag:"circle",attr:{cx:"346",cy:"256",r:"26"}},{tag:"circle",attr:{cx:"166",cy:"256",r:"26"}},{tag:"path",attr:{fill:"none",strokeMiterlimit:"10",strokeWidth:"32",d:"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"}}]})(e)}function g(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256"}}]})(e)}function v(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"32",d:"M80 160h352M80 256h352M80 352h352"}}]})(e)}function y(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"32",d:"M400 148l-21.12-24.57A191.43 191.43 0 00240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 00181.07-128"}},{tag:"path",attr:{d:"M464 97.42V208a16 16 0 01-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z"}}]})(e)}function E(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"}}]})(e)}function k(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M400 304l48 48-48 48m0-288l48 48-48 48M64 352h85.19a80 80 0 0066.56-35.62L256 256"}},{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M64 160h85.19a80 80 0 0166.56 35.62l80.5 120.76A80 80 0 00362.81 352H416m0-192h-53.19a80 80 0 00-66.56 35.62L288 208"}}]})(e)}function b(e){return i({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"}},{tag:"path",attr:{strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"32",d:"M80 112h352"}},{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40m-64 64v224m-72-224l8 224m136-224l-8 224"}}]})(e)}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6840),t(1587)}));var n=e.O();_N_E=n}]);