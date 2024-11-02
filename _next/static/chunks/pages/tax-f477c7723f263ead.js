(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{80065:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return tax}});var r=a(1029),l=a(86028),n=a(75271),TaxCalculator_Guide=()=>n.createElement("section",{className:"mt-8 flex w-full flex-col items-center justify-center space-y-4 rounded bg-zinc-100 px-4 py-4 dark:bg-zinc-900"},n.createElement("h2",{className:"text-center text-xl font-bold text-cyan-700 dark:text-cyan-600"},"Guide to tax calculator"),n.createElement("p",{className:"max-w-prose text-sm"},"This calculator is used to give estimations for what a salary would translate to in another country, and on how much tax you will have pay for a given income in that country. It is designed to allow you to easily compare across countries."," ",n.createElement("em",null,"This should in no way be used for actual tax forms"),"."),n.createElement("p",{className:"max-w-prose text-sm"},"Currently only a limited number of countries and their tax systems are available. I plan to extend this in the future to support more countries and possible add a way to add your own, and provide better inside where the tax percentages is gather from (government website in the individual countries)."));function getDefaultState(){return{currency:"USD",workOptions:{workdaysPerYear:260,hoursPerDay:8}}}let c=(0,n.createContext)({state:getDefaultState(),dispatch:e=>{}});var u=(0,a(89115).n)("tax_calculator_state",function(e,t){switch(t.type){case"SET SALARY":return{...e,salary:t.salary};case"SET CURRENCY":return{...e,currency:t.currency};default:return console.warn(`Unhandled state: ${t}`),e}}),s=a(92452),i=a(70729),o=a(67850);function TaxCalculatorInput(){let{values:e}=(0,n.useContext)(l.Z),{state:t,dispatch:a}=(0,n.useContext)(c),r=(0,n.useCallback)(e=>a({type:"SET CURRENCY",currency:e}),[a]);return n.createElement("div",{className:"flex space-x-4 p-4"},n.createElement("label",{className:"flex flex-col space-y-2"},n.createElement("span",{className:"input-label"},"Income"),n.createElement(i.h3,{inputMode:"numeric",placeholder:"100,000",className:"rounded-md bg-white py-2 px-4 shadow focus:border-indigo-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-gray-100",defaultValue:t.salary,thousandSeparator:!0,onValueChange:e=>a({type:"SET SALARY",salary:e.floatValue??0})})),n.createElement(s.Z,{label:"Currency",onChange:r,defaultCurrency:e.preferredDisplayCurrency}),n.createElement(SalaryInPreferredCurrency,{salary:t.salary,currency:t.currency}))}function SalaryInPreferredCurrency({salary:e,currency:t}){let{values:{preferredDisplayCurrency:a,currencyRates:r}}=(0,n.useContext)(l.Z);if(!e)return null;let c=(0,o.fK)(e,r.usd,t,a);return n.createElement("div",{className:"flex h-full flex-col space-y-2"},n.createElement("label",{className:"input-label"},"Income in preferred currency"),n.createElement("span",{className:"py-1 text-yellow-700 dark:text-yellow-400"},(0,o.xG)(c,a,{maximumFractionDigits:0})))}function addTaxResults(e,t){let a=e.taxes+t.taxes;return{taxes:a,pre_tax:e.pre_tax,after_tax:e.pre_tax-a}}function calculateTaxes(e,t){let a=0,r=t.taxFreeAllowance;for(let l=0;l<t.brackets.length;l++){let n=0===l?t.taxFreeAllowance:t.brackets[l-1].limit,c=t.brackets[l],u=Math.min(e,c.limit)-n;u>0&&(a+=u*c.rate,r+=u*(1-c.rate))}return{pre_tax:e,taxes:a,after_tax:r}}var m={uk:{country:"England",currency:"GBP",taxFreeAllowance:12570,brackets:[{limit:50270,rate:.2},{limit:15e4,rate:.4},{limit:1/0,rate:.45}],calculate:function(e){return addTaxResults(calculateTaxes(e,this),calculateTaxes(e,{...this,brackets:[{limit:9568,rate:0},{limit:50270,rate:.135},{limit:1/0,rate:.02}]}))}},dk:{country:"Denmark",currency:"DKK",taxFreeAllowance:46600,brackets:[{limit:552500,rate:.361},{limit:1/0,rate:.511}],calculate:function(e){let t=calculateTaxes(.92*e,this);return{...t,taxes:t.taxes+.08*e}}},dk_capital:{country:"Denmark Capital",currency:"DKK",taxFreeAllowance:0,brackets:[{limit:56500,rate:.27},{limit:1/0,rate:.42}],calculate:function(e){return calculateTaxes(e,this)}},us:{country:"United States",currency:"USD",calculate:function(e){return calculateTaxes(e,this)},taxFreeAllowance:0,brackets:[{limit:9950,rate:.1},{limit:40525,rate:.12},{limit:86375,rate:.22},{limit:164925,rate:.24},{limit:209425,rate:.32},{limit:523600,rate:.35},{limit:1/0,rate:.37}]},ca:{country:"Canada",currency:"CAD",taxFreeAllowance:0,calculate:function(e){let t=calculateTaxes(e,this),a=({country:"Canada",currency:"CAD",taxFreeAllowance:0,calculate:function(e){return calculateTaxes(e,this)},brackets:[{limit:43070,rate:.0506},{limit:86141,rate:.077},{limit:98901,rate:.105},{limit:120094,rate:.1229},{limit:162832,rate:.147},{limit:227091,rate:.168},{limit:1/0,rate:.205}]}).calculate(e);return addTaxResults(t,a)},brackets:[{limit:50197,rate:.15},{limit:100392,rate:.205},{limit:155625,rate:.26},{limit:221708,rate:.29},{limit:1/0,rate:.33}]},sg:{country:"Singapore",currency:"SGD",taxFreeAllowance:0,brackets:[{limit:2e4,rate:0},{limit:3e4,rate:.02},{limit:4e4,rate:.035},{limit:8e4,rate:.07},{limit:12e4,rate:.115},{limit:16e4,rate:.15},{limit:2e5,rate:.18},{limit:24e4,rate:.19},{limit:28e4,rate:.195},{limit:32e4,rate:.2},{limit:5e5,rate:.22},{limit:1e6,rate:.23},{limit:1/0,rate:.24}],calculate:function(e){return calculateTaxes(e,this)}},tw:{country:"Taiwan",currency:"TWD",taxFreeAllowance:0,brackets:[{limit:56e4,rate:.05},{limit:126e4,rate:.12},{limit:252e4,rate:.2},{limit:472e4,rate:.3},{limit:1/0,rate:.4}],calculate:function(e){return calculateTaxes(e,this)}}};let y={maximumFractionDigits:0};function TaxTable(){let{values:{currencyRates:e,preferredDisplayCurrency:t}}=(0,n.useContext)(l.Z),{state:{salary:a,currency:r,workOptions:u}}=(0,n.useContext)(c),s=Object.keys(m).sort(),i=(0,n.useCallback)((a,l)=>(function(a,l){let n=l.calculate(a),c=(0,o.sL)(l.currency,r,e.usd);r!==l.currency&&(n={pre_tax:c(a),taxes:c(n.taxes),after_tax:c(n.after_tax)},a=c(a));let s=n.taxes/a,i=n.after_tax/(u.workdaysPerYear*u.hoursPerDay),m={salaryGross:a,salaryNet:n.after_tax,taxes:n.taxes,hourlyRateNet:i};return{country:l.country,taxPercent:s,base:m,local:convertCalculationResultInCurrency(m,r,l.currency,e),preferred:convertCalculationResultInCurrency(m,r,t,e)}})(a,l),[r,t,e,u]);return a?n.createElement("div",{className:"overflow-x-auto"},n.createElement("table",{className:"w-full"},n.createElement(TableHeader,null),n.createElement(TableBody,{countries:s,calculator:i}))):null}function TableBody({countries:e,calculator:t}){let{state:{salary:a,currency:r}}=(0,n.useContext)(c);return a?n.createElement("tbody",null,e.map(e=>n.createElement(TableRow,{key:e,country:e,salary:a,currency:r,calculator:t}))):null}function TableRow({country:e,salary:t,currency:a,calculator:r}){let{values:{currencyRates:c,preferredDisplayCurrency:u}}=(0,n.useContext)(l.Z),s=m[e].currency,i=(0,o.fK)(t,c.usd,a,s),d=r(i,m[e]),x=(0,n.useCallback)(e=>(0,o.xG)(e,s,y),[s]),f=(0,n.useCallback)(e=>(0,o.xG)(e,u,y),[u]);return n.createElement("tr",{key:e,className:"tax-row"},n.createElement("td",null,d.country),n.createElement("td",{className:"text-green-700 dark:text-green-400"},f(d.preferred.salaryNet)),n.createElement("td",{className:"text-red-700 dark:text-red-400"},f(d.preferred.taxes)),n.createElement("td",null,d.taxPercent.toLocaleString(void 0,{style:"percent"})),n.createElement("td",null,x(d.local.salaryGross)),n.createElement("td",null,x(d.local.salaryNet)),n.createElement("td",null,x(d.local.salaryGross/12)),n.createElement("td",null,x(d.local.salaryNet/12)),n.createElement("td",null,f(d.preferred.hourlyRateNet)))}function TableHeader(){return n.createElement("thead",{className:"tax-header"},n.createElement("tr",null,n.createElement("th",{className:"text-left"},"Country"),n.createElement("th",null,"Net salary"),n.createElement("th",null,"Taxes"),n.createElement("th",null,"Tax percent"),n.createElement("th",null,"Gross salary"),n.createElement("th",null,"Net salary"),n.createElement("th",null,"Gross salary (m)"),n.createElement("th",null,"Net salary (m)"),n.createElement("th",null,"Hourly net salary")))}function convertCalculationResultInCurrency(e,t,a,r){let converter=e=>(0,o.fK)(e,r.usd,t,a);return{salaryGross:converter(e.salaryGross),salaryNet:converter(e.salaryNet),taxes:converter(e.taxes),hourlyRateNet:converter(e.hourlyRateNet)}}var features_TaxCalculator=()=>{let{values:e}=(0,n.useContext)(l.Z),[t,a]=(0,n.useReducer)(u,{...getDefaultState(),currency:e.preferredDisplayCurrency});return n.createElement("div",{className:"h-full bg-white dark:bg-gray-800"},n.createElement(c.Provider,{value:{state:t,dispatch:a}},n.createElement(TaxCalculatorInput,null),n.createElement(TaxTable,null)),n.createElement(TaxCalculator_Guide,null))},tax=()=>n.createElement(n.Fragment,null,n.createElement(r.Z,{title:"Tax calculator"}),n.createElement(features_TaxCalculator,null))},1029:function(e,t,a){"use strict";var r=a(79238),l=a.n(r),n=a(75271);t.Z=({title:e})=>{let t=`${e} | Finance`;return n.createElement(l(),null,n.createElement("title",null,t))}},67850:function(e,t,a){"use strict";a.d(t,{CV:function(){return sortObject},fK:function(){return convertToCurrency},p3:function(){return parseNumber},sL:function(){return useConverter},xG:function(){return formatCurrency}});var r=a(75271);function parseNumber(e){return Number.parseFloat(e.toString().replace(/[^.\d]/g,""))}function formatCurrency(e,t,a){if(!e||Number.isNaN(e))return"0";let format=t=>e.toLocaleString("en-US",{style:"currency",currency:t,currencyDisplay:"symbol",...a});try{return format(t??"USD")}catch(a){if(a instanceof RangeError&&a.message.startsWith("Invalid currency code")&&t)return format("USD").replace("USD",t);return e.toString()}}function convertToCurrency(e,t,a,r){return e*getConversionRate(t,a,r)}function getConversionRate(e,t,a){let r=t?.toLowerCase(),l=a?.toLowerCase();return r&&l&&r!==l?"usd"===r?"GBp"===a?100*e.gbp:l in e?e[l]:1:"usd"!==l?getConversionRate(e,t,"usd")*getConversionRate(e,"usd",a):"GBp"===t?1/(100*e.gbp):r in e?1/e[r]:1:1}function useConverter(e,t,a){return(0,r.useCallback)(r=>r*getConversionRate(a,e,t),[e,a,t])}function sortObject(e){return Object.keys(e).sort().reduce((t,a)=>(t[a]=e[a],t),{})}Intl.NumberFormat(void 0,{style:"currency",currency:"DKK",currencyDisplay:"code"})},72746:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tax",function(){return a(80065)}])}},function(e){e.O(0,[729,888,774,179],function(){return e(e.s=72746)}),_N_E=e.O()}]);