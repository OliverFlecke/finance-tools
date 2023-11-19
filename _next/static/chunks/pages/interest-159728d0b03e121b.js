(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[680],{40819:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var a=r(67294),n=r(4235),l=r(87818),s=r(87536),o=r(57333),i=r(37555),c=r(65639);function m(e,t,r,a,n=12){let l=Math.pow(1+r/1,1/n)-1,s=n*a;return e*Math.pow(1+l,s)+t*((Math.pow(1+l,s)-1)/l)}var u=({amount:e,label:t,color:r})=>a.createElement("div",{className:"flex space-x-4"},a.createElement("div",{className:`h-6 w-6 rounded-full ${r}`}),a.createElement("div",null,a.createElement("span",{className:"text-black dark:text-gray-300"},t),a.createElement("div",{className:"text-2xl text-black dark:text-white"},E.format(e))));function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}var p=e=>{let t=(0,a.useMemo)(()=>e.interestRate/100,[e.interestRate]),r=(0,a.useMemo)(()=>0!==e.monthlyDeposit,[e.monthlyDeposit]),n=m(e.existingAmount,e.monthlyDeposit,t,e.investmentPeriod),l=12*e.monthlyDeposit*e.investmentPeriod+e.existingAmount;return a.createElement(a.Fragment,null,a.createElement("div",{className:"flex w-full flex-col items-center"},a.createElement("div",{className:"grid w-full max-w-2xl grid-cols-1 justify-center gap-y-4 gap-x-8 p-8 md:grid-cols-2"},a.createElement(u,{amount:n,label:`Balance after ${e.investmentPeriod} years`,color:"bg-blue-900 dark:bg-blue-300"}),a.createElement(u,{amount:e.existingAmount,label:"Initial amount",color:"bg-green-900 dark:bg-green-300"}),a.createElement(u,{amount:l,label:"Total deposits",color:"bg-indigo-900 dark:bg-indigo-300"}),a.createElement(u,{amount:n-l,label:"Gain from interest",color:"bg-yellow-900 dark:bg-yellow-300"}))),a.createElement("div",{className:"overflow-x-scroll lg:m-0 lg:w-full lg:overflow-x-auto"},a.createElement("table",{className:"w-full"},a.createElement(f,{isWithDeposits:r}),a.createElement("tbody",{className:"text-right font-mono"},[...Array(e.investmentPeriod+1).keys()].map(n=>a.createElement(h,d({key:n},e,{year:n,rate:t,isWithDeposits:r,isLastRow:n===e.investmentPeriod})))))))};let g={deposit:"text-teal-800 dark:text-teal-400",interest:"text-green-800 dark:text-green-400",totalDeposit:"text-orange-800 dark:text-orange-400",totalInterest:"text-purple-800 dark:text-purple-400",balance:"text-red-800 dark:text-red-400"},f=({isWithDeposits:e})=>a.createElement("thead",null,a.createElement("tr",{className:"text-right"},a.createElement("th",{className:"px-4 text-center"},"Year"),e&&a.createElement("th",{className:`px-4 ${g.deposit}`},"Deposit"),a.createElement("th",{className:`px-4 ${g.interest}`},"Interest"),e&&a.createElement("th",{className:`px-4 ${g.totalDeposit}`},"Total deposits"),a.createElement("th",{className:`px-4 ${g.totalInterest}`},"Total interest"),a.createElement("th",{className:`px-4 ${g.balance}`},"Balance"),a.createElement("th",{className:"px-4"},"Date"))),h=e=>{var t;let{rate:r,year:n,isWithDeposits:l,isLastRow:s}=e,o=0===n?e.existingAmount:12*e.monthlyDeposit,i=12*n*e.monthlyDeposit+e.existingAmount,c=m(e.existingAmount,e.monthlyDeposit,r,n),u=n-1,d=12*u*e.monthlyDeposit+e.existingAmount,p=m(e.existingAmount,e.monthlyDeposit,r,u),f=c-i,h=0===n?0:f-(p-d);return a.createElement("tr",{key:n,className:"odd:bg-gray-200 dark:odd:bg-gray-900"},a.createElement("td",{className:"px-4 text-center"},n),l&&a.createElement("td",{className:`px-4 ${s?g.deposit:""}`.trim()},E.format(o)),a.createElement("td",{className:`px-4 ${s?g.interest:""}`.trim()},E.format(h)),l&&a.createElement("td",{className:`px-4 ${s?g.totalDeposit:""}`.trim()},E.format(i)),a.createElement("td",{className:`px-4 ${s?g.totalInterest:""}`.trim()},E.format(f)),a.createElement("td",{className:`px-4 ${s?g.balance:""}`.trim()},E.format(c)),a.createElement("td",{className:"px-4"},((t=new Date).setFullYear(t.getFullYear()+n),t).toLocaleDateString()))};function y(){return(y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}var x=()=>{let[e,t]=(0,a.useState)(null),r=(0,a.useMemo)(()=>{let e=new URL(window.location.href).searchParams;function t(t){return e.has(t)?Number.parseFloat(e.get(t)):void 0}return{existingAmount:t("existingAmount"),interestRate:t("interestRate"),investmentPeriod:t("investmentPeriod"),interestAccural:e.get("interestAccural")??"Yearly",monthlyDeposit:t("monthlyDeposit")}},[]);(0,a.useEffect)(()=>{(0,c.vZ)(r)&&t(r)},[r]);let{register:n,setValue:m,handleSubmit:u,formState:{errors:d}}=(0,s.cI)({defaultValues:r}),g=u(e=>{let r=new URL(window.location.href);console.log(e),Object.keys(e).forEach(t=>r.searchParams.set(t,e[t].toString())),window.history.replaceState(null,"",r.toString()),t(e)}),f=(0,a.useCallback)(()=>{let e=new URL(window.location.href);e.search="",window.location.href=e.toString()},[]);return a.createElement("div",{className:"pb-4 dark:bg-gray-800"},a.createElement("h2",{className:"px-4 py-4 text-xl lg:text-left"},"Compound interest calculator"),a.createElement("form",{onSubmit:g,className:"flex-col-center w-full overflow-x-hidden px-4"},a.createElement("fieldset",{className:"flex flex-col items-start space-y-6 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0"},a.createElement(o.h3,y({customInput:e=>a.createElement(l.II,y({},e,{label:"Existing amount",errorMessage:d.existingAmount?.message,className:"dark:placeholder-gray-600",placeholder:"20,000",inputMode:"numeric"})),defaultValue:r.existingAmount,thousandSeparator:!0,onValueChange:e=>m("existingAmount",e.floatValue??0)},n("existingAmount",{required:"Please provide your existing amount",valueAsNumber:!0}))),a.createElement(l.II,y({label:"Expected yearly growth",placeholder:"7",className:"dark:placeholder-gray-600",errorMessage:d.interestRate?.message},n("interestRate",{required:"Please provide a valid value"}))),a.createElement(l.II,y({label:"Investment period",placeholder:"10",className:"dark:placeholder-gray-600",errorMessage:d.investmentPeriod?.message},n("investmentPeriod",{required:"Please provide a number of years you are investing"}))),a.createElement(l.Ph,y({label:"Interval of interest accural"},n("interestAccural",{required:!0})),a.createElement(l.$m,{value:"Yearly"},"Yearly"),a.createElement(l.$m,{value:"Monthly"},"Monthly")),a.createElement(o.h3,y({customInput:e=>a.createElement(l.II,y({},e,{label:"Monthly deposit",placeholder:"10,000",inputMode:"numeric",className:"dark:placeholder-gray-600",errorMessage:d.monthlyDeposit?.message})),defaultValue:r.monthlyDeposit,thousandSeparator:!0,onValueChange:e=>m("monthlyDeposit",e.floatValue??0)},n("monthlyDeposit",{required:"Please provide how much you will deposit each month",valueAsNumber:!0})))),a.createElement("div",{className:"flex w-full justify-center space-x-4 pt-4"},a.createElement(l.zx,{type:"submit"},"Calculate"),a.createElement(l.zx,{type:"reset",buttonType:"Secondary",onClick:f},"Reset"))),e&&a.createElement(p,{existingAmount:(0,i.p3)(e.existingAmount),interestRate:(0,i.p3)(e.interestRate),investmentPeriod:(0,i.p3)(e.investmentPeriod),monthlyDeposit:(0,i.p3)(e.monthlyDeposit),interestAccural:e.interestAccural}))};let E=Intl.NumberFormat("en-US",{style:"currency",currency:"DKK"});var b=()=>a.createElement(a.Fragment,null,a.createElement(n.Z,{title:"Interest calculator"}),a.createElement(x,null))},4235:function(e,t,r){"use strict";var a=r(9008),n=r.n(a),l=r(67294);t.Z=({title:e})=>{let t=`${e} | Finance`;return l.createElement(n(),null,l.createElement("title",null,t))}},37555:function(e,t,r){"use strict";r.d(t,{CV:function(){return c},fK:function(){return s},p3:function(){return n},sL:function(){return i},xG:function(){return l}});var a=r(67294);function n(e){return Number.parseFloat(e.toString().replace(/[^.\d]/g,""))}function l(e,t,r){if(!e||Number.isNaN(e))return"0";let a=t=>e.toLocaleString("en-US",{style:"currency",currency:t,currencyDisplay:"symbol",...r});try{return a(t??"USD")}catch(r){if(r instanceof RangeError&&r.message.startsWith("Invalid currency code")&&t)return a("USD").replace("USD",t);return e.toString()}}function s(e,t,r,a){return e*o(t,r,a)}function o(e,t,r){let a=t?.toLowerCase(),n=r?.toLowerCase();return a&&n&&a!==n?"usd"===a?"GBp"===r?100*e.gbp:n in e?e[n]:1:"usd"!==n?o(e,t,"usd")*o(e,"usd",r):"GBp"===t?1/(100*e.gbp):a in e?1/e[a]:1:1}function i(e,t,r){return(0,a.useCallback)(a=>a*o(r,e,t),[e,r,t])}function c(e){return Object.keys(e).sort().reduce((t,r)=>(t[r]=e[r],t),{})}Intl.NumberFormat(void 0,{style:"currency",currency:"DKK",currencyDisplay:"code"})},68565:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/interest",function(){return r(40819)}])}},function(e){e.O(0,[536,333,888,774,179],function(){return e(e.s=68565)}),_N_E=e.O()}]);