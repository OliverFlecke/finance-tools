(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[680],{3911:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return w}});var a=r(7294),n=r(447),l=r(7818),s=r(7536),o=r(7333),c=r(515);function i(e,t,r,a,n=12){const l=function(e,t,r){return Math.pow(1+e/t,t/r)-1}(r,1,n),s=n*a;return e*Math.pow(1+l,s)+t*((Math.pow(1+l,s)-1)/l)}var m=({amount:e,label:t,color:r})=>a.createElement("div",{className:"flex space-x-4"},a.createElement("div",{className:`h-6 w-6 rounded-full ${r}`}),a.createElement("div",null,a.createElement("span",{className:"text-black dark:text-gray-300"},t),a.createElement("div",{className:"text-2xl text-black dark:text-white"},N.format(e))));function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},u.apply(this,arguments)}var d=e=>{const t=(0,a.useMemo)((()=>e.interestRate/100),[e.interestRate]),r=(0,a.useMemo)((()=>0!==e.monthlyDeposit),[e.monthlyDeposit]),n=i(e.existingAmount,e.monthlyDeposit,t,e.investmentPeriod),l=12*e.monthlyDeposit*e.investmentPeriod+e.existingAmount,s=n-l;return a.createElement(a.Fragment,null,a.createElement("div",{className:"flex w-full flex-col items-center"},a.createElement("div",{className:"grid w-full max-w-2xl grid-cols-1 justify-center gap-y-4 gap-x-8 p-8 md:grid-cols-2"},a.createElement(m,{amount:n,label:`Balance after ${e.investmentPeriod} years`,color:"bg-blue-900 dark:bg-blue-300"}),a.createElement(m,{amount:e.existingAmount,label:"Initial amount",color:"bg-green-900 dark:bg-green-300"}),a.createElement(m,{amount:l,label:"Total deposits",color:"bg-indigo-900 dark:bg-indigo-300"}),a.createElement(m,{amount:s,label:"Gain from interest",color:"bg-yellow-900 dark:bg-yellow-300"}))),a.createElement("div",{className:"overflow-x-scroll lg:m-0 lg:w-full lg:overflow-x-auto"},a.createElement("table",{className:"w-full"},a.createElement(x,{isWithDeposits:r}),a.createElement("tbody",{className:"text-right font-mono"},[...Array(e.investmentPeriod+1).keys()].map((n=>a.createElement(E,u({key:n},e,{year:n,rate:t,isWithDeposits:r,isLastRow:n===e.investmentPeriod}))))))))};const p="text-teal-800 dark:text-teal-400",g="text-green-800 dark:text-green-400",f="text-orange-800 dark:text-orange-400",y="text-purple-800 dark:text-purple-400",h="text-red-800 dark:text-red-400",x=({isWithDeposits:e})=>a.createElement("thead",null,a.createElement("tr",{className:"text-right"},a.createElement("th",{className:"px-4 text-center"},"Year"),e&&a.createElement("th",{className:`px-4 ${p}`},"Deposit"),a.createElement("th",{className:`px-4 ${g}`},"Interest"),e&&a.createElement("th",{className:`px-4 ${f}`},"Total deposits"),a.createElement("th",{className:`px-4 ${y}`},"Total interest"),a.createElement("th",{className:`px-4 ${h}`},"Balance"),a.createElement("th",{className:"px-4"},"Date"))),E=e=>{const{rate:t,year:r,isWithDeposits:n,isLastRow:l}=e,s=0===r?e.existingAmount:12*e.monthlyDeposit,o=12*r*e.monthlyDeposit+e.existingAmount,c=i(e.existingAmount,e.monthlyDeposit,t,r),m=r-1,u=12*m*e.monthlyDeposit+e.existingAmount,d=i(e.existingAmount,e.monthlyDeposit,t,m),x=c-o,E=0===r?0:x-(d-u);return a.createElement("tr",{key:r,className:"odd:bg-gray-200 dark:odd:bg-gray-900"},a.createElement("td",{className:"px-4 text-center"},r),n&&a.createElement("td",{className:`px-4 ${l?p:""}`.trim()},N.format(s)),a.createElement("td",{className:`px-4 ${l?g:""}`.trim()},N.format(E)),n&&a.createElement("td",{className:`px-4 ${l?f:""}`.trim()},N.format(o)),a.createElement("td",{className:`px-4 ${l?y:""}`.trim()},N.format(x)),a.createElement("td",{className:`px-4 ${l?h:""}`.trim()},N.format(c)),a.createElement("td",{className:"px-4"},(v=new Date,b=r,v.setFullYear(v.getFullYear()+b),v).toLocaleDateString()));var v,b};function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},v.apply(this,arguments)}var b=()=>{const[e,t]=(0,a.useState)(null),r=(0,a.useMemo)((()=>{const e=new URL(window.location.href).searchParams;function t(t){return e.has(t)?Number.parseFloat(e.get(t)):void 0}return{existingAmount:t("existingAmount"),interestRate:t("interestRate"),investmentPeriod:t("investmentPeriod"),interestAccural:e.get("interestAccural")??"Yearly",monthlyDeposit:t("monthlyDeposit")}}),[]);(0,a.useEffect)((()=>{var e;e=r,Object.keys(e).every((t=>void 0!==e[t]))&&t(r)}),[r]);const{register:n,setValue:i,handleSubmit:m,formState:{errors:u}}=(0,s.cI)({defaultValues:r}),p=m((e=>{const r=new URL(window.location.href);Object.keys(e).forEach((t=>r.searchParams.set(t,e[t].toString()))),window.history.replaceState(null,"",r.toString()),t(e)})),g=(0,a.useCallback)((()=>{const e=new URL(window.location.href);e.search="",window.location.href=e.toString()}),[]);return a.createElement("div",{className:"pb-4 dark:bg-gray-800"},a.createElement("h2",{className:"px-4 py-4 text-xl lg:text-left"},"Compound interest calculator"),a.createElement("form",{onSubmit:p,className:"flex-col-center w-full overflow-x-hidden px-4"},a.createElement("fieldset",{className:"flex flex-col items-start space-y-6 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0"},a.createElement(o.Z,v({customInput:e=>a.createElement(l.II,v({},e,{label:"Existing amount",errorMessage:u.existingAmount?.message,className:"dark:placeholder-gray-600",placeholder:"20,000",inputMode:"numeric"})),defaultValue:r.existingAmount,thousandSeparator:!0,onValueChange:e=>i("existingAmount",e.floatValue??0)},n("existingAmount",{required:"Please provide your existing amount",valueAsNumber:!0}))),a.createElement(l.II,v({label:"Expected yearly growth",placeholder:"7",className:"dark:placeholder-gray-600",errorMessage:u.interestRate?.message},n("interestRate",{required:"Please provide a valid value"}))),a.createElement(l.II,v({label:"Investment period",placeholder:"10",className:"dark:placeholder-gray-600",errorMessage:u.investmentPeriod?.message},n("investmentPeriod",{required:"Please provide a number of years you are investing"}))),a.createElement(l.Ph,v({label:"Interval of interest accural"},n("interestAccural",{required:!0})),a.createElement(l.$m,{value:"Yearly"},"Yearly"),a.createElement(l.$m,{value:"Monthly"},"Monthly")),a.createElement(o.Z,v({customInput:e=>a.createElement(l.II,v({},e,{label:"Monthly deposit",placeholder:"10,000",inputMode:"numeric",className:"dark:placeholder-gray-600",errorMessage:u.monthlyDeposit?.message})),defaultValue:r.monthlyDeposit,thousandSeparator:!0,onValueChange:e=>i("monthlyDeposit",e.floatValue??0)},n("monthlyDeposit",{required:"Please provide how much you will deposit each month",valueAsNumber:!0})))),a.createElement("div",{className:"flex w-full justify-center space-x-4 pt-4"},a.createElement(l.zx,{type:"submit"},"Calculate"),a.createElement(l.zx,{type:"reset",buttonType:"Secondary",onClick:g},"Reset"))),e&&a.createElement(d,{existingAmount:(0,c.p3)(e.existingAmount),interestRate:(0,c.p3)(e.interestRate),investmentPeriod:(0,c.p3)(e.investmentPeriod),monthlyDeposit:(0,c.p3)(e.monthlyDeposit),interestAccural:e.interestAccural}))};const N=Intl.NumberFormat("en-US",{style:"currency",currency:"DKK"});var w=()=>a.createElement(a.Fragment,null,a.createElement(n.Z,{title:"Interest calculator"}),a.createElement(b,null))},447:function(e,t,r){"use strict";var a=r(9008),n=r.n(a),l=r(7294);t.Z=({title:e})=>l.createElement(n(),null,l.createElement("title",null,e," | Finance"))},515:function(e,t,r){"use strict";r.d(t,{CV:function(){return m},fK:function(){return o},oB:function(){return l},p3:function(){return n},sL:function(){return i},xG:function(){return s}});var a=r(7294);function n(e){return Number.parseFloat(e.toString().replace(/[,a-zA-Z]/g,""))}const l=Intl.NumberFormat(void 0,{style:"currency",currency:"DKK",currencyDisplay:"code"});function s(e,t){if(!e||Number.isNaN(e))return"0";const r=t=>e.toLocaleString(void 0,{style:"currency",currency:t,currencyDisplay:"code"});try{return r(t??"USD")}catch(a){return a instanceof RangeError&&a.message.startsWith("Invalid currency code")&&t?r("USD").replace("USD",t):e.toString()}}function o(e,t,r,a){return e*c(t,r,a)}function c(e,t,r){const a="usd";return t=t?.toLowerCase(),r=r?.toLowerCase(),e=e,t&&r&&t!==r?t===a?r in e?e[r]:1:r===a?t in e?1/e[t]:1:c(e,t,a)*c(e,a,r):1}function i(e,t,r){return(0,a.useCallback)((a=>o(a,r,e,t)),[e,r,t])}function m(e){return Object.keys(e).sort().reduce(((t,r)=>(t[r]=e[r],t)),{})}},8565:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/interest",function(){return r(3911)}])}},function(e){e.O(0,[536,333,888,774,179],(function(){return t=8565,e(e.s=t);var t}));var t=e.O();_N_E=t}]);