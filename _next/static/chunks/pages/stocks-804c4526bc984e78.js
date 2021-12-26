(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[170],{3573:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return q}});var a=r(7294),n=r(2370),s=r(7818),c=r(2283),l=r(5563);const o=`${l.NS}/${l.tW}`;const u=`${l.NS}/${l.tW}/stock`;async function i(...e){const t=await fetch(`${u}?symbols=${e.join(",")}`,{method:"GET"}),r=await t.json();if(r.error)throw new Error(r.error);return r??[]}var m,d=r(5637),y=new Uint8Array(16);function p(){if(!m&&!(m="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return m(y)}var E=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var b=function(e){return"string"===typeof e&&E.test(e)},f=[],k=0;k<256;++k)f.push((k+256).toString(16).substr(1));var g=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(f[e[t+0]]+f[e[t+1]]+f[e[t+2]]+f[e[t+3]]+"-"+f[e[t+4]]+f[e[t+5]]+"-"+f[e[t+6]]+f[e[t+7]]+"-"+f[e[t+8]]+f[e[t+9]]+"-"+f[e[t+10]]+f[e[t+11]]+f[e[t+12]]+f[e[t+13]]+f[e[t+14]]+f[e[t+15]]).toLowerCase();if(!b(r))throw TypeError("Stringified UUID is invalid");return r};var h=function(e,t,r){var a=(e=e||{}).random||(e.rng||p)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){r=r||0;for(var n=0;n<16;++n)t[r+n]=a[n];return t}return g(a)};const C="stocks_state",N=(0,a.createContext)({state:S(),dispatch:e=>{}});function v(e,t){return(0,d.n)(C,x)(e,t)}function S(){const e=(0,d.v)(C,{stocks:[],preferredCurrency:"usd",currencyRates:{usd:{}}});for(const t of Object.keys(e.stocks))for(const r of e.stocks[t].lots)r.buyDate=new Date(Date.parse(r.buyDate)),r.soldDate=r.soldDate?new Date(Date.parse(r.soldDate)):void 0;return e}function x(e,t){switch(console.debug(`received action: ${t.type}`),t.type){case"ADD STOCK":return e.stocks.find((e=>e.symbol===t.stock.symbol))?e:{...e,stocks:e.stocks.concat(t.stock)};case"DELETE STOCK":return{...e,stocks:e.stocks.filter((e=>e.symbol!==t.symbol))};case"UPDATE STOCKS":return console.log(t.stocks),{...e,stocks:e.stocks.map((e=>{const r=t.stocks.find((t=>t.symbol===e.symbol));return{...e,...r,lots:e.lots}}))};case"SET STOCKS":return{...e,stocks:t.stocks.map((e=>({...e,lots:e.lots??[]})))};case"ADD LOT":{const r={id:t.lotId??h(),shares:0,buyDate:new Date,buyPrice:e.stocks.find((e=>e.symbol===t.symbol))?.regularMarketPrice??0,buyBrokerage:0};return{...e,stocks:e.stocks.map((e=>e.symbol!==t.symbol?e:{...e,lots:e.lots.concat(r)}))}}case"DELETE LOT":return{...e,stocks:e.stocks.map((e=>e.symbol!==t.symbol?e:{...e,lots:e.lots.filter((e=>e.id!==t.id))}))};case"EDIT LOT":return{...e,stocks:e.stocks.map((e=>e.symbol!==t.symbol?e:{...e,lots:e.lots.filter((e=>e.id!==t.lot.id)).concat(t.lot)}))};case"SET PREFERRED CURRENCY":return{...e,preferredCurrency:t.currency.toLowerCase()};case"SET CURRENCY RATES":return{...e,currencyRates:t.rates};default:return console.warn("action not implemented"),e}}function w(){return(w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}var D=()=>{const{dispatch:e}=(0,a.useContext)(N),[t,r]=(0,a.useState)(!1),{register:l,handleSubmit:u,formState:{errors:m},reset:d}=(0,c.cI)(),y=(0,a.useCallback)((async t=>{const r=await i(t.symbol);0===r.length?alert(`Stock with symbol '${t.symbol}' was not found`):(await async function(e){await fetch(`${o}/stock/tracked`,{method:"POST",credentials:"include",body:e}).then((()=>console.log(`Stock tracked: ${e}`))).catch((e=>console.log(e)))}(t.symbol),e({type:"ADD STOCK",stock:{...r[0],symbol:t.symbol,lots:[]}}),d())}),[e,d]);return a.createElement(a.Fragment,null,a.createElement("button",{className:"btn btn-primary space-x-2",onClick:()=>r(!0)},a.createElement(n.RWZ,{className:"inline"}),a.createElement("span",{className:"align-middle"},"Add symbol")),a.createElement(s.u_,{isOpen:t,onDismiss:()=>r(!1)},a.createElement("div",{className:"p-4 rounded bg-gray-300 dark:bg-gray-700"},a.createElement("h3",{className:"text-lg font-bold pb-4"},"Add symbol"),a.createElement("form",{onSubmit:u(y),className:"space-y-4"},a.createElement("fieldset",{className:"space-y-2"},a.createElement(s.II,w({placeholder:"AAPL, MSFT...",label:"Symbol"},l("symbol",{required:!0}),{errorMessage:m.symbol&&"Please provide a symbol to add"}))),a.createElement(s.qO,null,a.createElement(s.zx,{type:"submit",className:"btn btn-primary ml-4 order-last"},"Add"),a.createElement(s.zx,{buttonType:"Transparent",onClick:()=>r(!1)},"Cancel"))))))};var T=r(8381);function O(...e){return e.reduce(((e,t)=>e+t),0)}function P(e){return O(...e.lots.map((e=>e.shares)))}function R(e){const t=P(e);return O(...e.lots.map((e=>e.shares*e.buyPrice)))/t}function K(e,t,r){const a=P(e),n=R(e);return(0,T.fK)(a*e.regularMarketPrice-a*n,e.currency,t,r?.usd)}var L=()=>{const{state:e,dispatch:t}=(0,a.useContext)(N),r=(0,a.useCallback)((async()=>{try{const r=await i(...e.stocks.map((e=>e.symbol)));t({type:"UPDATE STOCKS",stocks:r})}catch(r){console.error(r)}}),[e.stocks,t]);return a.createElement(s.zx,{onClick:r,className:"btn btn-primary space-x-2"},a.createElement(n.A$d,{"aria-label":"Reload current stock prices",className:"inline"}),a.createElement("span",{className:"align-middle"},"Refresh stocks"))};function j(e){return e>0?A.positiveColor:e<0?A.negativeColor:""}const A={positiveColor:"text-green-700 dark:text-green-400",negativeColor:"text-red-700 dark:text-red-400"};var $=r(9184);function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}var F=({stock:e,lot:t})=>{const{dispatch:r,state:{preferredCurrency:s,currencyRates:l}}=(0,a.useContext)(N),{register:u,handleSubmit:i,watch:m}=(0,c.cI)({mode:"onChange",defaultValues:{...t,buyDate:(0,$.p)(t.buyDate)}}),d=(0,a.useCallback)((async t=>{if(""===t.buyDate)return;const a={shares:Number(t.shares),buyPrice:Number(t.buyPrice),buyDate:new Date(Date.parse(t.buyDate.toString())),buyBrokerage:0};await async function(e,t){await fetch(`${o}/stock/lot/${e}`,{method:"PUT",credentials:"include",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}(t.id,a),r({type:"EDIT LOT",symbol:e.symbol,lot:{...a,id:t.id}})}),[r,e.symbol]),y=(0,a.useCallback)((async()=>{await async function(e){await fetch(`${o}/stock/lot/${e}`,{method:"DELETE",credentials:"include",mode:"cors",headers:{"Content-Type":"application/json"}})}(t.id),r({type:"DELETE LOT",symbol:e.symbol,id:t.id})}),[r,t.id,e.symbol]),p=(0,T.sL)(e.currency,s,l.usd),E=m("shares")*e.regularMarketPrice,b=m("buyPrice")*m("shares"),f=E-b;return a.createElement("tr",{className:"odd:bg-gray-200 dark:odd:bg-gray-600"},a.createElement("td",{colSpan:3},a.createElement("form",{onChange:i(d),className:"flex flex-row justify-evenly w-full"},a.createElement("input",M({type:"date"},u("buyDate"),{className:"bg-transparent"})),a.createElement("input",M({type:"number"},u("shares"),{className:"bg-transparent w-20 text-center"})),a.createElement("input",M({type:"number"},u("buyPrice"),{className:"bg-transparent w-20 text-center"})))),a.createElement("td",{className:"text-right"},(0,T.xG)(p(E),s)),a.createElement("td",{className:`${j(f)} text-right flex flex-col`},a.createElement("span",null,(0,T.xG)(p(f),s)),a.createElement("span",null,(100*(E/b-1)).toFixed(2)," %")),a.createElement("td",{className:"pl-4"},a.createElement("button",{onClick:y},a.createElement(n.BFV,{className:"text-red-700 dark:text-red-500",size:24}))))};var _=({lots:e,stock:t})=>{const{dispatch:r}=(0,a.useContext)(N),c=(0,a.useCallback)((async()=>{const e=await(a={symbol:t.symbol,shares:0,buyDate:new Date,buyPrice:0,buyBrokerage:0},fetch(`${o}/stock/lot`,{method:"POST",credentials:"include",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((e=>e.json())));var a;r({type:"ADD LOT",symbol:t.symbol,lotId:e})}),[r,t]);return a.createElement(a.Fragment,null,a.createElement("h3",{className:"text-center text-2xl text-green-700 dark:text-green-400"},"Lots for ",t.displayName??t.symbol),a.createElement("div",{className:"bg-gray-300 dark:bg-gray-700 rounded shadow mx-8"},a.createElement("table",{className:"w-full"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"Buy date"),a.createElement("th",null,"Shares"),a.createElement("th",null,"Buy price"),a.createElement("th",null,"Market value"),a.createElement("th",null,"Total gain"))),a.createElement("tbody",null,e.map((e=>a.createElement(F,{key:e.id,lot:e,stock:t}))))),a.createElement("div",{className:"p-4"},a.createElement(s.zx,{onClick:c,className:"space-x-2 btn btn-primary"},a.createElement(n.RWZ,{className:"inline"}),a.createElement("span",{className:"align-middle"},"Add lot")))))};var G=({stock:e})=>{const{state:{preferredCurrency:t,currencyRates:r}}=(0,a.useContext)(N),n=(0,T.sL)(e.currency,t,r.usd),s=P(e),c=R(e),l=c*s,o=e.regularMarketPrice*s,u=K(e,t,r),i=100*(o/l-1),[m,d]=(0,a.useState)(!1);return a.createElement(a.Fragment,null,a.createElement("tr",{className:"w-full relative text-right bg-gray-200 dark:bg-gray-800"},a.createElement("td",{className:"text-left px-4"},e.symbol),a.createElement("td",null,(0,T.xG)(e.regularMarketPrice,e.currency)),a.createElement("td",null,(0,T.xG)(n(o),t)),a.createElement("td",null,s),a.createElement("td",{className:j(c)},(0,T.xG)(c,e.currency)),a.createElement("td",{className:`${j(u)} flex flex-col`},a.createElement("span",null,(0,T.xG)(u,t)),a.createElement("span",{className:isNaN(i)?"hidden":""},i.toFixed(2),"%")),a.createElement(U,{stock:e,setShowLots:d})),a.createElement("tr",null,a.createElement("td",{colSpan:7,className:"p-0 pb-4 "+(m?"":"hidden")},a.createElement(_,{lots:e.lots,stock:e}))))};const U=({stock:e,setShowLots:t})=>{const{dispatch:r}=(0,a.useContext)(N),s=(0,a.useCallback)((()=>{r({type:"DELETE STOCK",symbol:e.symbol})}),[r,e.symbol]);return a.createElement("td",{className:"h-full space-x-2 pr-4"},a.createElement("button",{onClick:()=>t((e=>!e)),className:"hover:cursor-pointer"},a.createElement(n.XSk,{size:24})),a.createElement("button",{onClick:s,className:"hover:cursor-pointer"},a.createElement(n.BFV,{className:"text-red-500",size:24})))};var I=()=>{const{state:{preferredCurrency:e,currencyRates:t},dispatch:r}=(0,a.useContext)(N),[c,l]=(0,a.useState)(!1),o=(0,a.useCallback)((()=>l(!0)),[l]),u=(0,a.useCallback)((e=>{const t=e.currentTarget.value;t&&r({type:"SET PREFERRED CURRENCY",currency:t})}),[r]);return a.createElement(a.Fragment,null,a.createElement("button",{className:"btn btn-secondary",onClick:o},a.createElement(n.Fuo,null)),a.createElement(s.u_,{isOpen:c,onDismiss:()=>l(!1)},a.createElement("div",{className:"p-4 dark:bg-gray-900"},a.createElement("h2",{className:"font-bold text-lg"},"Stock settings"),a.createElement("div",{className:"grid grid-cols-2 gap-8"},a.createElement("label",null,"Preferred currency"),a.createElement("select",{onChange:u,defaultValue:e,className:"rounded dark:bg-gray-700"},Object.keys(t.usd).map((e=>a.createElement("option",{key:e,value:e},e.toLocaleUpperCase()))))),a.createElement(s.qO,{className:"mt-4"},a.createElement("button",{onClick:()=>l(!1),className:"btn btn-primary space-x-2"},a.createElement(n.Jvf,{size:24,className:"inline"}),a.createElement("span",{className:"align-middle"},"Close"))))))};var z=({stocks:e})=>{const{state:{preferredCurrency:t,currencyRates:r}}=(0,a.useContext)(N),n=(0,a.useMemo)((()=>O(...e.flatMap((e=>e.lots.map((a=>(0,T.fK)(e.regularMarketPrice*a.shares,e.currency,t,r.usd))))))),[r.usd,t,e]),s=(0,a.useMemo)((()=>O(...e.flatMap((e=>e.lots.map((a=>(0,T.fK)(e.regularMarketPrice*a.shares-a.buyPrice*a.shares,e.currency,t,r.usd))))))),[r.usd,t,e]);return a.createElement("tr",{className:"text-right font-bold dark:text-purple-400"},a.createElement("td",null),a.createElement("td",null),a.createElement("td",null,(0,T.xG)(n,t)),a.createElement("td",null),a.createElement("td",null),a.createElement("td",null,(0,T.xG)(s,t)))};var V=()=>{const[e,t]=(0,a.useReducer)(v,S());return(0,a.useEffect)((()=>{(function(e="usd"){return fetch(function(e){return`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${e}.min.json`}(e)).then((async e=>await e.json()))})().then((e=>t({type:"SET CURRENCY RATES",rates:e}))).catch((e=>console.warn(e)))}),[]),(0,a.useEffect)((()=>{fetch(`${o}/stock/tracked`,{credentials:"include"}).then((async e=>await e.json())).then((e=>e.map((e=>({...e,lots:e.lots.map((e=>({...e,buyDate:new Date(Date.parse(e.buyDate)),soldDate:e.soldDate?new Date(Date.parse(e.soldDate)):void 0})))}))))).then((e=>t({type:"SET STOCKS",stocks:e}))).then((async()=>{const r=await i(...e.stocks.map((e=>e.symbol)));t({type:"UPDATE STOCKS",stocks:r})}))}),[]),a.createElement(N.Provider,{value:{state:e,dispatch:t}},a.createElement("h2",{className:"text-xl px-4 py-4"},"Stocks"),a.createElement(B,{stocks:e.stocks}),a.createElement(J,null))};const B=({stocks:e,currencyRates:t,preferredCurrency:r})=>{const[n,s]=(0,a.useState)(),[c,l]=(0,a.useState)(!1),o=(0,a.useCallback)((e=>()=>{n===e?l((e=>!e)):s(e)}),[s,l,n]);return a.createElement("div",{className:"overflow-x-scroll"},a.createElement("table",{className:"w-full"},a.createElement("thead",null,a.createElement("tr",{className:"text-sm align-bottom text-gray-600 dark:text-gray-400"},a.createElement(Y,{sort:o,currentSortKey:n,sortKey:"Symbol",ascending:c},"Symbol"),a.createElement(Y,{sort:o,currentSortKey:n,sortKey:"Current price",ascending:c},"Current price"),a.createElement(Y,{sort:o,currentSortKey:n,sortKey:"Total value",ascending:c},"Total value"),a.createElement(Y,{sort:o,currentSortKey:n,sortKey:"Total shares",ascending:c},"Total shares"),a.createElement(Y,{sort:o,currentSortKey:n,sortKey:"Average price",ascending:c},"Average price"),a.createElement(Y,{sort:o,currentSortKey:n,sortKey:"Gain",ascending:c},"Gain"))),a.createElement("tbody",null,e.sort(function(e,t,r,a){return e?(n,s)=>{let c=0;switch(e){case"Symbol":c=n.symbol.localeCompare(s.symbol);break;case"Gain":c=K(n,r,a)-K(s,r,a);break;case"Average price":c=R(n)-R(s);break;case"Current price":c=n.regularMarketPrice-s.regularMarketPrice;break;case"Total shares":c=P(n)-P(s);break;case"Total value":c=n.regularMarketPrice*P(n)-s.regularMarketPrice*P(s)}return c*(t?1:-1)}:()=>0}(n,c,r,t)).map((e=>a.createElement(G,{key:e.symbol,stock:e})))),a.createElement("tfoot",null,a.createElement(z,{stocks:e}))))},J=()=>a.createElement("div",{className:"p-4 justify-between flex"},a.createElement(D,null),a.createElement(L,null),a.createElement(I,null)),Y=({sort:e,children:t,currentSortKey:r,sortKey:n,ascending:s})=>a.createElement("th",null,a.createElement("button",{onClick:e(n),className:"px-2 focus:ring-1 ring-red-800 dark:ring-red-600 rounded-sm"},t,n===r&&a.createElement(Z,{ascending:s}))),Z=({ascending:e})=>a.createElement(a.Fragment,null,e?a.createElement(n.lmx,{className:"inline"}):a.createElement(n.Gal,{className:"inline"}));var W=r(7515);var q=()=>a.createElement(a.Fragment,null,a.createElement(W.Z,{title:"Stocks"}),a.createElement(V,null))},7515:function(e,t,r){"use strict";var a=r(9008),n=r(7294);t.Z=({title:e})=>n.createElement(a.default,null,n.createElement("title",null,e," | Finance"))},8381:function(e,t,r){"use strict";r.d(t,{p3:function(){return n},oB:function(){return s},xG:function(){return c},fK:function(){return l},sL:function(){return u},CV:function(){return m}});var a=r(7294);function n(e){return Number.parseFloat(e.toString().replace(/[,a-zA-Z]/g,""))}const s=Intl.NumberFormat(void 0,{style:"currency",currency:"DKK",currencyDisplay:"code"});function c(e,t){return Number.isNaN(e)?"-":e.toLocaleString(void 0,{style:"currency",currency:t??"USD",currencyDisplay:"code"})}function l(e,t,r,a){return e*o(t,r,a)}function o(e,t,r){const a="usd";return e=e?.toLowerCase(),t=t?.toLowerCase(),r=r??i,e&&t&&e!==t?e===a?t in r?r[t]:1:t===a?e in r?1/r[e]:1:o(e,a)*o(a,t):1}function u(e,t,r){return(0,a.useCallback)((a=>l(a,e,t,r)),[e,r,t])}const i={dkk:6.36,nok:9,eur:.85};function m(e){return Object.keys(e).sort().reduce(((t,r)=>(t[r]=e[r],t)),{})}},9184:function(e,t,r){"use strict";function a(e){const t=e.getFullYear();let r=""+(e.getMonth()+1),a=""+e.getDate();return r.length<2&&(r="0"+r),a.length<2&&(a="0"+a),[t,r,a].join("-")}r.d(t,{p:function(){return a}})},5637:function(e,t,r){"use strict";function a(e,t={}){const r=localStorage.getItem(e)??void 0;return{...t,...void 0===r||""===r?{}:JSON.parse(r)}}function n(e,t){return(r,a)=>{const n=t(r,a);return localStorage.setItem(e,JSON.stringify(n)),n}}r.d(t,{v:function(){return a},n:function(){return n}})},9433:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/stocks",function(){return r(3573)}])}},function(e){e.O(0,[283,888,774,179],(function(){return t=9433,e(e.s=t);var t}));var t=e.O();_N_E=t}]);