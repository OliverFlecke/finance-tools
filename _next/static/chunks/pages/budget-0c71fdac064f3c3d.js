(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[852],{41646:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return Z}});var n=a(4235),r=a(67294),l=a(39630),c=a(36510);let u=r.createContext({state:s(),dispatch:e=>{}});function s(){return(0,c.v)("budget",{hideItems:!1})}var m=()=>{let{state:{hideItems:e},dispatch:t}=(0,r.useContext)(u);return r.createElement("div",{className:"mx-4 mt-2 rounded bg-sky-300 p-4 dark:bg-sky-900"},r.createElement("label",{className:"space-x-4"},r.createElement("span",null,"Hide items"),r.createElement("input",{type:"checkbox",checked:e,onChange:e=>t({type:"HIDE ITEMS",value:e.target.checked})})))},i=a(4076),o=a(37555),d=({value:e})=>r.createElement(r.Fragment,null,r.createElement("td",{className:"currency"},(0,o.xG)(e,j)),r.createElement("td",{className:"currency"},(0,o.xG)(12*e,j))),E=a(76201),g=a(72370);function b({onClick:e}){return r.createElement("button",{onClick:e,className:"flex focus:outline-none"},r.createElement(g.RWZ,{size:24,className:"text-green-700 dark:text-green-500"}))}var p=a(87536);function f(){return(f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var x=({add:e,category:t})=>{let{register:a,handleSubmit:n}=(0,p.cI)({defaultValues:{category:t}});return r.createElement("tbody",null,r.createElement("tr",null,r.createElement("td",{colSpan:4},r.createElement("form",{onSubmit:n(e),className:"flex flex-wrap justify-end space-x-2 pb-4 pt-2"},!t&&r.createElement("input",f({placeholder:"Category",className:"budget add-item"},a("category",{required:!0}))),r.createElement("input",f({placeholder:"Name",className:"budget add-item"},a("name",{required:!0}))),r.createElement("input",f({placeholder:"Amount",className:"budget add-item",onKeyDown:e=>{/\d|\.|Enter|Shift|Tab|Backspace|Delete|Arrow/.test(e.key)||e.preventDefault()}},a("amount",{required:!0,valueAsNumber:!0}))),r.createElement("button",{type:"submit",className:"btn btn-primary flex items-center space-x-2 align-middle"},r.createElement("span",null,"Add"),r.createElement(g.RWZ,{size:24,className:"text-green-400 dark:text-green-500"}))))))};function y({onClick:e}){return r.createElement("button",{onClick:e,className:"flex focus:outline-none"},r.createElement(g.MPJ,{size:24,className:"text-red-700 dark:text-red-500"}))}var k=a(74543),N=a(87818);function h(){return(h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var v=({update:e,item:t})=>{let{register:a,handleSubmit:n}=(0,p.cI)({defaultValues:t}),l=(0,r.useCallback)(a=>{e(t.id,a)},[t.id,e]);return r.createElement("form",{onSubmit:n(l),className:"flex w-96 max-w-screen-lg flex-col space-y-4 rounded bg-indigo-500 p-4 dark:bg-indigo-900"},r.createElement("h4",{className:"text-xl"},"Edit item"),r.createElement("label",{className:"edit-item"},r.createElement("span",null,"Category"),r.createElement("input",h({placeholder:"Category",className:"budget edit-item"},a("category",{required:!0})))),r.createElement("label",{className:"edit-item"},r.createElement("span",null,"Name"),r.createElement("input",h({placeholder:"Name",className:"budget edit-item"},a("name",{required:!0})))),r.createElement("label",{className:"edit-item"},r.createElement("span",null,"Amount"),r.createElement("input",h({placeholder:"Amount",className:"budget edit-item",onKeyDown:e=>{/-|\d|\.|Enter|Shift|Tab|Backspace|Delete|Arrow/.test(e.key)||e.preventDefault()}},a("amount",{required:!0,valueAsNumber:!0})))),r.createElement(N.qO,null,r.createElement(N.zx,{buttonType:"Transparent"},"Cancel"),r.createElement(N.zx,{type:"submit",buttonType:"Primary",className:"btn btn-primary flex items-center justify-center space-x-2 align-middle"},r.createElement("span",null,"Save"),r.createElement(g.Tri,null))))},C=({item:e,deleteItem:t,updateItem:a})=>{let[n,l]=(0,r.useState)(!1),c=(0,r.useCallback)((e,t)=>{a(e,t),l(!1)},[a,l]);return r.createElement("td",{className:"flex flex-row justify-end space-x-2 pr-4"},r.createElement(k.Z,{onClick:()=>t(e.id)}),r.createElement("button",{onClick:()=>l(!0),className:"text-green-700 dark:text-green-400"},r.createElement(g.orQ,{size:24})),r.createElement(N.u_,{isOpen:n,onDismiss:()=>l(!1)},r.createElement(v,{item:e,update:c})))},w=({title:e,items:t,total:a,addItem:n,deleteItem:l,updateItem:c,primaryBackgroundColor:s,oddRowBackgroundColor:m})=>{let{state:{hideItems:i}}=(0,r.useContext)(u),g=(0,r.useMemo)(()=>Array.from(function*(e){let t=new Map;for(let a of e){let e=t.get(a.category)??[];e.push(a),t.set(a.category,e)}for(let[e,a]of t)yield{category:e,items:a}}(t)),[t]),[p,f]=(0,r.useState)(!1);return r.createElement(r.Fragment,null,r.createElement("tbody",{className:s},r.createElement("tr",null,r.createElement("th",{className:"px-4 pt-2 text-left text-xl underline",colSpan:4},e)),g.map(e=>r.createElement(r.Fragment,{key:e.category},r.createElement("tr",{key:e.category,className:`text-fuchsia-700 dark:text-fuchsia-300 ${i?m:""}`},r.createElement("th",{className:"px-8 text-left font-normal"},e.category),r.createElement(d,{value:Math.abs((0,E.S)(...e.items.map(e=>e.amount)))}),r.createElement("td",null)),!i&&e.items.sort((e,t)=>e.amount-t.amount).map(e=>r.createElement("tr",{key:e.name,className:`px-8 ${m}`},r.createElement("td",{className:"pl-12"},e.name),r.createElement(d,{value:Math.abs(e.amount)}),r.createElement(C,{item:e,deleteItem:l,updateItem:c}))))),r.createElement("tr",null,r.createElement("th",{className:"pl-4 pb-2 text-left"},"Total"),r.createElement("th",{className:"currency"},(0,o.xG)(a,j)),r.createElement("th",{className:"currency"},(0,o.xG)(12*a,j)),r.createElement("th",{className:"flex flex-row justify-end pr-4"},p?r.createElement(y,{onClick:()=>f(!1)}):r.createElement(b,{onClick:()=>f(!0)})))),p&&r.createElement(x,{add:n}))},S=({items:e,addItem:t,deleteItem:a,updateItem:n})=>{let[l,c]=(0,r.useState)(!1),u=e.map(e=>e.amount).reduce((e,t)=>e+t,0);return r.createElement(r.Fragment,null,r.createElement("tbody",{className:"bg-blue-100 dark:bg-blue-900"},r.createElement("tr",null,r.createElement("td",{className:"px-4 pt-2 text-left text-xl underline",colSpan:4},"Savings")),e.map(e=>r.createElement("tr",{key:e.id,className:"odd:bg-blue-200 dark:odd:bg-blue-800"},r.createElement("td",{className:"pl-8 text-fuchsia-700  dark:text-fuchsia-500 "},e.name),r.createElement(d,{value:e.amount}),r.createElement(C,{item:e,deleteItem:a,updateItem:n}))),r.createElement("tr",{className:"font-bold"},r.createElement("td",{className:"px-4 pb-2"},"Total"),r.createElement(d,{value:u}),r.createElement("th",{className:"flex flex-row justify-end pr-4"},l?r.createElement(y,{onClick:()=>c(!1)}):r.createElement(b,{onClick:()=>c(!0)})))),l&&r.createElement(x,{add:t,category:"Savings"}))},I=({budget:e})=>{let{income:t,expenses:a,total:n,totalIncome:l,totalExpenses:c,savings:s,totalSavings:m,remaining:i}=function(e){let t=(0,r.useMemo)(()=>e.items.filter(e=>e.amount>=0).filter(e=>"Savings"!==e.category),[e.items]),a=(0,r.useMemo)(()=>e.items.filter(e=>e.amount<0),[e.items]),n=(0,r.useMemo)(()=>e.items.filter(e=>"Savings"===e.category),[e.items]),l=(0,r.useMemo)(()=>(0,E.S)(...t.map(e=>e.amount)),[t]),c=(0,r.useMemo)(()=>-(0,E.S)(...a.map(e=>e.amount)),[a]),u=(0,r.useMemo)(()=>l-c,[l,c]),s=(0,r.useMemo)(()=>n.reduce((e,t)=>e+t.amount,0),[n]);return{income:t,expenses:a,savings:n,total:u,totalIncome:l,totalExpenses:c,totalSavings:s,remaining:u-s}}(e),{deleteItem:o,updateItem:d,addItem:g,addExpense:b,addSavings:p}=function(e){let{dispatch:t}=(0,r.useContext)(u),a=(0,r.useCallback)(a=>{t({type:"REMOVE ITEM",budget_id:e,item_id:a})},[e,t]),n=(0,r.useCallback)((e,a)=>{t({type:"EDIT ITEM",item_id:e,item:a})},[t]),l=(0,r.useCallback)(a=>t({type:"ADD INCOME",budget_id:e,item:a}),[e,t]),c=(0,r.useCallback)(a=>{a.amount=-a.amount,t({type:"ADD EXPENSE",budget_id:e,item:a})},[e,t]),s=(0,r.useCallback)(a=>{t({type:"ADD SAVINGS",budget_id:e,item:a})},[e,t]);return{deleteItem:a,updateItem:n,addItem:l,addExpense:c,addSavings:s}}(e.id);return r.createElement("div",{className:"mx-4 pt-4 pb-8"},r.createElement("table",{className:"w-full border-separate border-spacing-0 overflow-hidden rounded"},r.createElement(T,null),r.createElement(w,{title:"Income",items:t,total:l,addItem:g,deleteItem:o,updateItem:d,primaryBackgroundColor:"bg-green-200 dark:bg-green-900",oddRowBackgroundColor:"odd:bg-green-300 dark:odd:bg-green-700"}),r.createElement(w,{title:"Expenses",items:a,total:c,addItem:b,deleteItem:o,updateItem:d,primaryBackgroundColor:"bg-red-200 dark:bg-red-900",oddRowBackgroundColor:"odd:bg-red-300 dark:odd:bg-red-700"}),r.createElement(S,{items:s,addItem:p,deleteItem:o,updateItem:d}),r.createElement(D,{totalIncome:l,total:n,savings:m,remaining:i})))};let D=({totalIncome:e,total:t,savings:a,remaining:n})=>r.createElement("tfoot",{className:"bg-sky-300 dark:bg-sky-900"},r.createElement("tr",{className:(0,i.yZ)(t)},r.createElement("th",{className:"px-4 pt-2 text-left"},"After monthley expenses"),r.createElement(d,{value:t}),r.createElement("td",null)),r.createElement("tr",null,r.createElement("td",{className:"px-4 py-2 text-left"},"Savings"),r.createElement(d,{value:a}),r.createElement("td",{className:"pr-4 text-right"},(100*(a/e)).toFixed(2)," %")),r.createElement("tr",{className:`text-fuchsia-700 underline dark:text-fuchsia-500 ${(0,i.yZ)(n)}`},r.createElement("th",{className:"px-4 pb-2 text-left"},"Remaining"),r.createElement(d,{value:n}),r.createElement("td",null))),T=()=>r.createElement("thead",{className:"bg-sky-300 dark:bg-sky-900"},r.createElement("tr",{className:"text-right"},r.createElement("th",{className:"px-2"}),r.createElement("th",{className:"px-2"},"Per month"),r.createElement("th",{className:"px-2"},"Per year"),r.createElement("th",null)));var _=a(65639),O=a(9880);let M=_.yG?"http://localhost:4000":"https://finance.oliverflecke.me/api/v1";function $(){return($=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var B=({onBudgetCreated:e})=>{let t=(0,O.ku)(`${M}/budget`,{method:"POST"}),{register:a,handleSubmit:n}=(0,p.cI)(),l=(0,r.useCallback)(async a=>{console.log(`Creating budget with name: ${a.title}`),await t(a),e()},[t,e]);return r.createElement("div",{className:"flex max-w-lg flex-col space-y-2 rounded bg-sky-300 p-4 dark:bg-sky-900"},r.createElement("h3",{className:"text-lg"},"New budget"),r.createElement("form",{onSubmit:n(l),className:"flex flex-col space-y-4"},r.createElement("label",{className:"flex flex-col items-baseline"},r.createElement("span",{className:"text-md text-gray-700 dark:text-gray-100"},"Title"),r.createElement(N.II,$({},a("title"),{placeholder:"My budget"}))),r.createElement("input",{type:"submit",value:"Create",className:"btn btn-success w-full"})))},A=()=>{let{dispatch:e}=(0,r.useContext)(u),t=(0,O.h_)(`${M}/budget`,{method:"GET"}),a=function(){let e=(0,O.t1)();return(0,r.useCallback)(t=>e(`${M}/budget/${t}`,{method:"DELETE"}),[e])}(),n=function(){let e=(0,O.t1)();return(0,r.useCallback)(async t=>{let a=await e(`${M}/budget/${t}`,{method:"GET"}),n=await a?.text();return n?(0,O.S5)(n):null},[e])}(),l=(0,r.useCallback)(async t=>{let a=await n(t.id);a&&e({type:"SET BUDGET",budget:a})},[e,n]),c=(0,r.useCallback)(async e=>{await a(e),t.refresh()},[t,a]),[s,m]=(0,r.useState)(!1);return r.createElement(r.Fragment,null,r.createElement("div",{className:"bg-sky-300 p-4 dark:bg-sky-900"},r.createElement("div",{className:"flex w-full flex-row justify-between space-x-4 font-bold text-gray-800 dark:text-gray-300"},r.createElement("span",null,"Title"),r.createElement("span",null,"Created at"),r.createElement("span",null)),t.data&&r.createElement("ul",null,t.data?.map(e=>r.createElement(P,{key:`${e.title}-${e.created_at.toISOString()}`,budget:e,deleteCallback:c,onSelect:l}))),r.createElement("div",{className:"flex-end flex w-full"},r.createElement(b,{onClick:()=>m(!0)})),r.createElement(N.u_,{isOpen:s,onDismiss:()=>m(!1)},r.createElement(B,{onBudgetCreated:t.refresh}))))};let P=({budget:e,deleteCallback:t,onSelect:a})=>r.createElement("li",{className:"flex w-full flex-row justify-between space-x-4 rounded px-4 odd:bg-slate-200 dark:odd:bg-slate-800"},r.createElement("span",{onClick:()=>a(e),className:"hover:cursor-pointer"},e.title),r.createElement("span",null,e.created_at.toDateString()),r.createElement("span",null,r.createElement(k.Z,{onClick:()=>t(e.id)}))),j="GBP",G=({reducer:e})=>{let[t,a]=function(e,t,a){let[n,l]=(0,r.useState)({...t,loading:!1,error:null}),c=(0,r.useCallback)(e=>{a&&localStorage.setItem(a,JSON.stringify(e)),l(e)},[a,l]),u=(0,r.useCallback)(async t=>{let a=e(n,t);a instanceof Promise?(l({...n,loading:!0,error:null}),a.then(e=>c({...e,loading:!1,error:null})).catch(e=>l({...n,loading:!1,error:e}))):c({...a,loading:!1,error:null})},[c,e,n]);return[n,u]}(e,s(),"budget");return r.createElement(r.Fragment,null,r.createElement(u.Provider,{value:{state:t,dispatch:a}},r.createElement(A,null),r.createElement(l.Z,null,t.budget&&r.createElement(r.Fragment,null,r.createElement("h3",{className:" px-4 pt-6 text-3xl text-fuchsia-700 dark:text-fuchsia-600"},t.budget.title),r.createElement(m,null),r.createElement(I,{budget:t.budget})))))};var F=()=>{let e=function(){let e=(0,O.t1)();return(0,r.useCallback)(async(t,a)=>{let n=await e(`${M}/budget/${t}/item`,{method:"POST"},a);if(!n?.ok)throw Error(await n?.text());return await n.text()},[e])}(),t=function(){let e=(0,O.t1)();return(0,r.useCallback)(async(t,a)=>{let n=await e(`${M}/budget/${t}/item/${a}`,{method:"DELETE"});if(!n?.ok)throw Error(await n?.text())},[e])}(),a=function(){let e=(0,O.t1)();return(0,r.useCallback)(async(t,a,n)=>{let r=await e(`${M}/budget/${t}/item/${a}`,{method:"PUT"},n);if(!r?.ok)throw Error(await r?.text())},[e])}(),n=(0,r.useMemo)(()=>{var n;return n={addItemToBudgetCallback:e,deleteItemFromBudgetCallback:t,updateItemCallback:a},async(e,t)=>{switch(t.type){case"HIDE ITEMS":return{...e,hideItems:t.value};case"ADD SAVINGS":case"ADD EXPENSE":case"ADD INCOME":if(!e.budget)throw Error("No budget has been selected");let a=await n.addItemToBudgetCallback(t.budget_id,t.item),r=new Date(Date.now()),l={...t.item,created_at:r,modified_at:r,id:a,budget_id:t.budget_id};return{...e,budget:{...e.budget,items:e.budget.items.concat(l)}};case"REMOVE ITEM":if(!e.budget)throw Error("No budget has been selected");return await n.deleteItemFromBudgetCallback(t.budget_id,t.item_id),{...e,budget:{...e.budget,items:e.budget.items.filter(e=>e.id!==t.item_id)}};case"EDIT ITEM":if(!e.budget)throw Error("No budget has been selected");return await n.updateItemCallback(e.budget.id,t.item_id,t.item),{...e,budget:{...e.budget,items:e.budget.items.map(e=>e.id===t.item_id?{...e,...t.item}:e)}};case"SET BUDGET":return{...e,budget:t.budget};default:return console.warn(`Unhandled action: ${t}`),Promise.resolve(e)}}},[e,t,a]);return r.createElement(G,{reducer:n})},Z=()=>r.createElement(r.Fragment,null,r.createElement(n.Z,{title:"Budget"}),r.createElement(F,null))},74543:function(e,t,a){"use strict";a.d(t,{Z:function(){return l}});var n=a(67294),r=a(72370);function l({onClick:e}){return n.createElement("button",{onClick:e,className:"flex focus:outline-none"},n.createElement(r.BFV,{size:24,className:"text-red-700 dark:text-red-500"}))}},4235:function(e,t,a){"use strict";var n=a(9008),r=a.n(n),l=a(67294);t.Z=({title:e})=>{let t=`${e} | Finance`;return l.createElement(r(),null,l.createElement("title",null,t))}},4076:function(e,t,a){"use strict";function n(e){return e>0?l.positiveColor:e<0?l.negativeColor:""}function r(e){return e>0?l.positiveBackground:e<0?l.positiveBackground:""}a.d(t,{yY:function(){return n},yZ:function(){return r}});let l={positiveColor:"text-green-700 dark:text-green-500",negativeColor:"text-red-700 dark:text-red-500",positiveBackground:"bg-green-400 dark:bg-green-700"}},37555:function(e,t,a){"use strict";a.d(t,{CV:function(){return m},fK:function(){return c},p3:function(){return r},sL:function(){return s},xG:function(){return l}});var n=a(67294);function r(e){return Number.parseFloat(e.toString().replace(/[^.\d]/g,""))}function l(e,t,a){if(!e||Number.isNaN(e))return"0";let n=t=>e.toLocaleString("en-US",{style:"currency",currency:t,currencyDisplay:"symbol",...a});try{return n(t??"USD")}catch(a){if(a instanceof RangeError&&a.message.startsWith("Invalid currency code")&&t)return n("USD").replace("USD",t);return e.toString()}}function c(e,t,a,n){return e*u(t,a,n)}function u(e,t,a){let n=t?.toLowerCase(),r=a?.toLowerCase();return n&&r&&n!==r?"usd"===n?"GBp"===a?100*e.gbp:r in e?e[r]:1:"usd"!==r?u(e,t,"usd")*u(e,"usd",a):"GBp"===t?1/(100*e.gbp):n in e?1/e[n]:1:1}function s(e,t,a){return(0,n.useCallback)(n=>n*u(a,e,t),[e,a,t])}function m(e){return Object.keys(e).sort().reduce((t,a)=>(t[a]=e[a],t),{})}Intl.NumberFormat(void 0,{style:"currency",currency:"DKK",currencyDisplay:"code"})},76201:function(e,t,a){"use strict";function n(...e){return e.reduce((e,t)=>e+t,0)}a.d(t,{S:function(){return n}})},19142:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/budget",function(){return a(41646)}])}},function(e){e.O(0,[536,888,774,179],function(){return e(e.s=19142)}),_N_E=e.O()}]);