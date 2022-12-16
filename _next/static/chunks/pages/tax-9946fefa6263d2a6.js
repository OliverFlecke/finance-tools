(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{3735:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return C}});var r=a(447),l=a(6508),n=a(7294);let c=()=>n.createElement("section",{className:"mt-8 flex w-full flex-col items-center justify-center space-y-4 rounded bg-zinc-100 px-4 py-4 dark:bg-zinc-900"},n.createElement("h2",{className:"text-center text-xl font-bold text-cyan-700 dark:text-cyan-600"},"Guide to tax calculator"),n.createElement("p",{className:"max-w-prose text-sm"},"This calculator is used to give estimations for what a salary would translate to in another country, and on how much tax you will have pay for a given income in that country. It is designed to allow you to easily compare across countries."," ",n.createElement("em",null,"This should in no way be used for actual tax forms"),"."),n.createElement("p",{className:"max-w-prose text-sm"},"Currently only a limited number of countries and their tax systems are available. I plan to extend this in the future to support more countries and possible add a way to add your own, and provide better inside where the tax percentages is gather from (government website in the individual countries)."));function u(){return{currency:"USD",workOptions:{workdaysPerYear:260,hoursPerDay:8}}}let s=(0,n.createContext)({state:u(),dispatch(e){}});var i=(0,a(7384).n)("tax_calculator_state",function(e,t){switch(t.type){case"SET SALARY":return{...e,salary:t.salary};case"SET CURRENCY":return{...e,currency:t.currency};default:return console.warn(`Unhandled state: ${t}`),e}}),o=a(8250),m=a(7333);let y=()=>{let{values:e}=(0,n.useContext)(l.Z),{state:t,dispatch:a}=(0,n.useContext)(s),r=(0,n.useCallback)(e=>a({type:"SET CURRENCY",currency:e}),[a]);return n.createElement("div",{className:"flex space-x-4 p-4"},n.createElement("label",{className:"flex flex-col space-y-2"},n.createElement("span",{className:"input-label"},"Income"),n.createElement(m.h3,{inputMode:"numeric",placeholder:"100,000",className:"rounded-md bg-white  py-2 px-4 shadow focus:border-indigo-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-gray-100",defaultValue:t.salary,thousandSeparator:!0,onValueChange:e=>a({type:"SET SALARY",salary:e.floatValue??0})})),n.createElement(o.Z,{label:"Currency",onChange:r,defaultCurrency:e.preferredDisplayCurrency}))};var d=a(515);function x(e,t){let a=e.taxes+t.taxes;return{taxes:a,pre_tax:e.pre_tax,after_tax:e.pre_tax-a}}function f(e,t){let a=0,r=t.taxFreeAllowance;for(let l=0;l<t.brackets.length;l++){let n=0===l?t.taxFreeAllowance:t.brackets[l-1].limit,c=t.brackets[l],u=Math.min(e,c.limit)-n;u>0&&(a+=u*c.rate,r+=u*(1-c.rate))}return{pre_tax:e,taxes:a,after_tax:r}}var h={uk:{country:"England",currency:"GBP",taxFreeAllowance:12570,brackets:[{limit:50270,rate:.2},{limit:15e4,rate:.4},{limit:1/0,rate:.45}],calculate:function(e){return x(f(e,this),f(e,{...this,brackets:[{limit:9568,rate:0},{limit:50270,rate:.135},{limit:1/0,rate:.02}]}))}},dk:{country:"Denmark",currency:"DKK",taxFreeAllowance:46600,brackets:[{limit:552500,rate:.361},{limit:1/0,rate:.511}],calculate:function(e){let t=f(.92*e,this);return{...t,taxes:t.taxes+.08*e}}},dk_capital:{country:"Denmark Capital",currency:"DKK",taxFreeAllowance:0,brackets:[{limit:56500,rate:.27},{limit:1/0,rate:.42}],calculate:function(e){return f(e,this)}},us:{country:"United States",currency:"USD",calculate:function(e){return f(e,this)},taxFreeAllowance:0,brackets:[{limit:9950,rate:.1},{limit:40525,rate:.12},{limit:86375,rate:.22},{limit:164925,rate:.24},{limit:209425,rate:.32},{limit:523600,rate:.35},{limit:1/0,rate:.37}]},ca:{country:"Canada",currency:"CAD",taxFreeAllowance:0,calculate:function(e){let t=f(e,this),a=({country:"Canada",currency:"CAD",taxFreeAllowance:0,calculate:function(e){return f(e,this)},brackets:[{limit:43070,rate:.0506},{limit:86141,rate:.077},{limit:98901,rate:.105},{limit:120094,rate:.1229},{limit:162832,rate:.147},{limit:227091,rate:.168},{limit:1/0,rate:.205}]}).calculate(e);return x(t,a)},brackets:[{limit:50197,rate:.15},{limit:100392,rate:.205},{limit:155625,rate:.26},{limit:221708,rate:.29},{limit:1/0,rate:.33}]}};let E=()=>{let{values:{currencyRates:e}}=(0,n.useContext)(l.Z),{state:{salary:t,currency:a,workOptions:r}}=(0,n.useContext)(s),c=Object.keys(h).sort(),u=(0,n.useCallback)((t,l)=>(function(t,l){let n=l.calculate(t),c=(0,d.sL)(l.currency,a,e.usd);a!==l.currency&&(n={pre_tax:c(t),taxes:c(n.taxes),after_tax:c(n.after_tax)},t=c(t));let u=n.after_tax/(r.workdaysPerYear*r.hoursPerDay),s=n.taxes/t,i=(0,d.fK)(t,e.usd,a,l.currency),o=(0,d.fK)(n.after_tax,e.usd,a,l.currency);return{country:l.country,baseSalary:t,baseSalaryLocal:(0,d.fK)(t,e.usd,a,l.currency),taxes:n.taxes,afterTax:n.after_tax,hourlyRate:u,taxPercent:s,localSalaryGross:i,localSalary:o,monthlyCash:o/12}})(t,l),[a,e,r]);return t?n.createElement("div",{className:"overflow-x-auto"},n.createElement("table",{className:"w-full"},n.createElement(b,null),n.createElement(p,{countries:c,calculator:u}))):null},p=({countries:e,calculator:t})=>{let{values:{currencyRates:a}}=(0,n.useContext)(l.Z),{state:{salary:r,currency:c}}=(0,n.useContext)(s);return r?n.createElement("tbody",null,e.map(e=>{let l=h[e].currency,u=(0,d.fK)(r,a.usd,c,l),s=t(u,h[e]);return n.createElement("tr",{key:e,className:"tax-row"},n.createElement("td",null,s.country),n.createElement("td",null,(0,d.xG)(s.baseSalaryLocal,l)),n.createElement("td",{className:"text-green-700 dark:text-green-400"},(0,d.xG)(s.afterTax,c)),n.createElement("td",{className:"text-red-700 dark:text-red-400"},(0,d.xG)(s.taxes,c)),n.createElement("td",null,s.taxPercent.toLocaleString(void 0,{style:"percent"})),n.createElement("td",null,(0,d.xG)(s.localSalaryGross,l)),n.createElement("td",null,(0,d.xG)(s.localSalary,l)),n.createElement("td",null,(0,d.xG)(s.monthlyCash,l)),n.createElement("td",null,(0,d.xG)(s.hourlyRate,l)))})):null},b=()=>n.createElement("thead",{className:"tax-header"},n.createElement("th",null,"Country"),n.createElement("th",null,"Local base salary"),n.createElement("th",null,"Net salary"),n.createElement("th",null,"Taxes"),n.createElement("th",null,"Tax percent"),n.createElement("th",null,"Local gross salary"),n.createElement("th",null,"Local net salary"),n.createElement("th",null,"Net salary (monthly)"),n.createElement("th",null,"Hourly net salary")),w=()=>{let{values:e}=(0,n.useContext)(l.Z),[t,a]=(0,n.useReducer)(i,{...u(),currency:e.preferredDisplayCurrency});return n.createElement("div",{className:"h-full min-h-screen bg-white dark:bg-gray-800"},n.createElement("h2",{className:"px-4 pt-4 text-2xl"},"Tax calculator"),n.createElement(s.Provider,{value:{state:t,dispatch:a}},n.createElement(y,null),n.createElement(E,null)),n.createElement(c,null))},k=()=>n.createElement(n.Fragment,null,n.createElement(r.Z,{title:"Tax calculator"}),n.createElement(w,null));var C=k},447:function(e,t,a){"use strict";var r=a(9008),l=a.n(r),n=a(7294);let c=({title:e})=>{let t=`${e} | Finance`;return n.createElement(l(),null,n.createElement("title",null,t))};t.Z=c},515:function(e,t,a){"use strict";a.d(t,{CV:function(){return i},fK:function(){return c},p3:function(){return l},sL:function(){return s},xG:function(){return n}});var r=a(7294);function l(e){return Number.parseFloat(e.toString().replace(/[,a-zA-Z]/g,""))}function n(e,t){if(!e||Number.isNaN(e))return"0";let a=t=>e.toLocaleString("en-US",{style:"currency",currency:t,currencyDisplay:"symbol"});try{return a(t??"USD")}catch(r){if(r instanceof RangeError&&r.message.startsWith("Invalid currency code")&&t)return a("USD").replace("USD",t);return e.toString()}}function c(e,t,a,r){return e*u(t,a,r)}function u(e,t,a){return(t=t?.toLowerCase(),a=a?.toLowerCase(),t&&a&&t!==a)?"usd"===t?a in e?e[a]:1:"usd"===a?t in e?1/e[t]:1:u(e,t,"usd")*u(e,"usd",a):1}function s(e,t,a){return(0,r.useCallback)(r=>r*u(a,e,t),[e,a,t])}function i(e){return Object.keys(e).sort().reduce((t,a)=>(t[a]=e[a],t),{})}Intl.NumberFormat(void 0,{style:"currency",currency:"DKK",currencyDisplay:"code"})},4829:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tax",function(){return a(3735)}])}},function(e){e.O(0,[333,888,774,179],function(){return e(e.s=4829)}),_N_E=e.O()}]);