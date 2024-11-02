(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[852],{68812:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return budget}});var n=a(1029),r=a(75271),l=a(13942),c=a(89115);let u=r.createContext({state:fetchInitialData(),dispatch:e=>{}});function fetchInitialData(){return(0,c.v)("budget",{hideItems:!1})}var BudgetConfiguration=()=>{let{state:{hideItems:e},dispatch:t}=(0,r.useContext)(u);return r.createElement("div",{className:"mx-4 mt-2 rounded bg-sky-300 p-4 dark:bg-sky-900"},r.createElement("label",{className:"space-x-4"},r.createElement("span",null,"Hide items"),r.createElement("input",{type:"checkbox",checked:e,onChange:e=>t({type:"HIDE ITEMS",value:e.target.checked})})))},s=a(57289),d=a(67850),Budget_MonthAndYearCells=({value:e})=>r.createElement(r.Fragment,null,r.createElement("td",{className:"currency"},(0,d.xG)(e,x)),r.createElement("td",{className:"currency"},(0,d.xG)(12*e,x))),m=a(26754),o=a(79498);function AddButton({onClick:e}){return r.createElement("button",{onClick:e,className:"flex focus:outline-none"},r.createElement(o.RWZ,{size:24,className:"text-green-700 dark:text-green-500"}))}var i=a(28533);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var Budget_AddLine=({add:e,category:t})=>{let{register:a,handleSubmit:n}=(0,i.cI)({defaultValues:{category:t}});return r.createElement("tbody",null,r.createElement("tr",null,r.createElement("td",{colSpan:4},r.createElement("form",{onSubmit:n(e),className:"flex flex-wrap justify-end space-x-2 pb-4 pt-2"},!t&&r.createElement("input",_extends({placeholder:"Category",className:"budget add-item"},a("category",{required:!0}))),r.createElement("input",_extends({placeholder:"Name",className:"budget add-item"},a("name",{required:!0}))),r.createElement("input",_extends({placeholder:"Amount",className:"budget add-item",onKeyDown:e=>{/\d|\.|Enter|Shift|Tab|Backspace|Delete|Arrow/.test(e.key)||e.preventDefault()}},a("amount",{required:!0,valueAsNumber:!0}))),r.createElement("button",{type:"submit",className:"btn btn-primary flex items-center space-x-2 align-middle"},r.createElement("span",null,"Add"),r.createElement(o.RWZ,{size:24,className:"text-green-400 dark:text-green-500"}))))))};function RemoveButton({onClick:e}){return r.createElement("button",{onClick:e,className:"flex focus:outline-none"},r.createElement(o.MPJ,{size:24,className:"text-red-700 dark:text-red-500"}))}var g=a(31485),E=a(90781);function EditItem_extends(){return(EditItem_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var Budget_EditItem=({update:e,item:t})=>{let{register:a,handleSubmit:n}=(0,i.cI)({defaultValues:t}),l=(0,r.useCallback)(a=>{e(t.id,a)},[t.id,e]);return r.createElement("form",{onSubmit:n(l),className:"flex w-96 max-w-screen-lg flex-col space-y-4 rounded bg-indigo-500 p-4 dark:bg-indigo-900"},r.createElement("h4",{className:"text-xl"},"Edit item"),r.createElement("label",{className:"edit-item"},r.createElement("span",null,"Category"),r.createElement("input",EditItem_extends({placeholder:"Category",className:"budget edit-item"},a("category",{required:!0})))),r.createElement("label",{className:"edit-item"},r.createElement("span",null,"Name"),r.createElement("input",EditItem_extends({placeholder:"Name",className:"budget edit-item"},a("name",{required:!0})))),r.createElement("label",{className:"edit-item"},r.createElement("span",null,"Amount"),r.createElement("input",EditItem_extends({placeholder:"Amount",className:"budget edit-item",onKeyDown:e=>{/-|\d|\.|Enter|Shift|Tab|Backspace|Delete|Arrow/.test(e.key)||e.preventDefault()}},a("amount",{required:!0,valueAsNumber:!0})))),r.createElement(E.qO,null,r.createElement(E.zx,{buttonType:"Transparent"},"Cancel"),r.createElement(E.zx,{type:"submit",buttonType:"Primary",className:"btn btn-primary flex items-center justify-center space-x-2 align-middle"},r.createElement("span",null,"Save"),r.createElement(o.Tri,null))))},Budget_BudgetLineActions=({item:e,deleteItem:t,updateItem:a})=>{let[n,l]=(0,r.useState)(!1),c=(0,r.useCallback)((e,t)=>{a(e,t),l(!1)},[a,l]);return r.createElement("td",{className:"flex flex-row justify-end space-x-2 pr-4"},r.createElement(g.Z,{onClick:()=>t(e.id)}),r.createElement("button",{onClick:()=>l(!0),className:"text-green-700 dark:text-green-400"},r.createElement(o.orQ,{size:24})),r.createElement(E.u_,{isOpen:n,onDismiss:()=>l(!1)},r.createElement(Budget_EditItem,{item:e,update:c})))},Budget_ItemList=({title:e,items:t,total:a,addItem:n,deleteItem:l,updateItem:c,primaryBackgroundColor:s,oddRowBackgroundColor:o})=>{let{state:{hideItems:i}}=(0,r.useContext)(u),g=(0,r.useMemo)(()=>Array.from(function*(e){let t=new Map;for(let a of e){let e=t.get(a.category)??[];e.push(a),t.set(a.category,e)}for(let[e,a]of t)yield{category:e,items:a}}(t)),[t]),[E,b]=(0,r.useState)(!1);return r.createElement(r.Fragment,null,r.createElement("tbody",{className:s},r.createElement("tr",null,r.createElement("th",{className:"px-4 pt-2 text-left text-xl underline",colSpan:4},e)),g.map(e=>r.createElement(r.Fragment,{key:e.category},r.createElement("tr",{key:e.category,className:`text-fuchsia-700 dark:text-fuchsia-300 ${i?o:""}`},r.createElement("th",{className:"px-8 text-left font-normal"},e.category),r.createElement(Budget_MonthAndYearCells,{value:Math.abs((0,m.S)(...e.items.map(e=>e.amount)))}),r.createElement("td",null)),!i&&e.items.sort((e,t)=>e.amount-t.amount).map(e=>r.createElement("tr",{key:e.name,className:`px-8 ${o}`},r.createElement("td",{className:"pl-12"},e.name),r.createElement(Budget_MonthAndYearCells,{value:Math.abs(e.amount)}),r.createElement(Budget_BudgetLineActions,{item:e,deleteItem:l,updateItem:c}))))),r.createElement("tr",null,r.createElement("th",{className:"pl-4 pb-2 text-left"},"Total"),r.createElement("th",{className:"currency"},(0,d.xG)(a,x)),r.createElement("th",{className:"currency"},(0,d.xG)(12*a,x)),r.createElement("th",{className:"flex flex-row justify-end pr-4"},E?r.createElement(RemoveButton,{onClick:()=>b(!1)}):r.createElement(AddButton,{onClick:()=>b(!0)})))),E&&r.createElement(Budget_AddLine,{add:n}))},Budget_SavingsList=({items:e,addItem:t,deleteItem:a,updateItem:n})=>{let[l,c]=(0,r.useState)(!1),u=e.map(e=>e.amount).reduce((e,t)=>e+t,0);return r.createElement(r.Fragment,null,r.createElement("tbody",{className:"bg-blue-100 dark:bg-blue-900"},r.createElement("tr",null,r.createElement("td",{className:"px-4 pt-2 text-left text-xl underline",colSpan:4},"Savings")),e.map(e=>r.createElement("tr",{key:e.id,className:"odd:bg-blue-200 dark:odd:bg-blue-800"},r.createElement("td",{className:"pl-8 text-fuchsia-700  dark:text-fuchsia-500 "},e.name),r.createElement(Budget_MonthAndYearCells,{value:e.amount}),r.createElement(Budget_BudgetLineActions,{item:e,deleteItem:a,updateItem:n}))),r.createElement("tr",{className:"font-bold"},r.createElement("td",{className:"px-4 pb-2"},"Total"),r.createElement(Budget_MonthAndYearCells,{value:u}),r.createElement("th",{className:"flex flex-row justify-end pr-4"},l?r.createElement(RemoveButton,{onClick:()=>c(!1)}):r.createElement(AddButton,{onClick:()=>c(!0)})))),l&&r.createElement(Budget_AddLine,{add:t,category:"Savings"}))},Budget_BudgetDetails=({budget:e})=>{let{income:t,expenses:a,total:n,totalIncome:l,totalExpenses:c,savings:s,totalSavings:d,remaining:o}=function(e){let t=(0,r.useMemo)(()=>e.items.filter(e=>e.amount>=0).filter(e=>"Savings"!==e.category),[e.items]),a=(0,r.useMemo)(()=>e.items.filter(e=>e.amount<0),[e.items]),n=(0,r.useMemo)(()=>e.items.filter(e=>"Savings"===e.category),[e.items]),l=(0,r.useMemo)(()=>(0,m.S)(...t.map(e=>e.amount)),[t]),c=(0,r.useMemo)(()=>-(0,m.S)(...a.map(e=>e.amount)),[a]),u=(0,r.useMemo)(()=>l-c,[l,c]),s=(0,r.useMemo)(()=>n.reduce((e,t)=>e+t.amount,0),[n]);return{income:t,expenses:a,savings:n,total:u,totalIncome:l,totalExpenses:c,totalSavings:s,remaining:u-s}}(e),{deleteItem:i,updateItem:g,addItem:E,addExpense:b,addSavings:f}=function(e){let{dispatch:t}=(0,r.useContext)(u),a=(0,r.useCallback)(a=>{t({type:"REMOVE ITEM",budget_id:e,item_id:a})},[e,t]),n=(0,r.useCallback)((e,a)=>{t({type:"EDIT ITEM",item_id:e,item:a})},[t]),l=(0,r.useCallback)(a=>t({type:"ADD INCOME",budget_id:e,item:a}),[e,t]),c=(0,r.useCallback)(a=>{a.amount=-a.amount,t({type:"ADD EXPENSE",budget_id:e,item:a})},[e,t]),s=(0,r.useCallback)(a=>{t({type:"ADD SAVINGS",budget_id:e,item:a})},[e,t]);return{deleteItem:a,updateItem:n,addItem:l,addExpense:c,addSavings:s}}(e.id);return r.createElement("div",{className:"mx-4 pt-4 pb-8"},r.createElement("table",{className:"w-full border-separate border-spacing-0 overflow-hidden rounded"},r.createElement(Header,null),r.createElement(Budget_ItemList,{title:"Income",items:t,total:l,addItem:E,deleteItem:i,updateItem:g,primaryBackgroundColor:"bg-green-200 dark:bg-green-900",oddRowBackgroundColor:"odd:bg-green-300 dark:odd:bg-green-700"}),r.createElement(Budget_ItemList,{title:"Expenses",items:a,total:c,addItem:b,deleteItem:i,updateItem:g,primaryBackgroundColor:"bg-red-200 dark:bg-red-900",oddRowBackgroundColor:"odd:bg-red-300 dark:odd:bg-red-700"}),r.createElement(Budget_SavingsList,{items:s,addItem:f,deleteItem:i,updateItem:g}),r.createElement(Footer,{totalIncome:l,total:n,savings:d,remaining:o})))};let Footer=({totalIncome:e,total:t,savings:a,remaining:n})=>r.createElement("tfoot",{className:"bg-sky-300 dark:bg-sky-900"},r.createElement("tr",{className:(0,s.yZ)(t)},r.createElement("th",{className:"px-4 pt-2 text-left"},"After monthley expenses"),r.createElement(Budget_MonthAndYearCells,{value:t}),r.createElement("td",null)),r.createElement("tr",null,r.createElement("td",{className:"px-4 py-2 text-left"},"Savings"),r.createElement(Budget_MonthAndYearCells,{value:a}),r.createElement("td",{className:"pr-4 text-right"},(100*(a/e)).toFixed(2)," %")),r.createElement("tr",{className:`text-fuchsia-700 underline dark:text-fuchsia-500 ${(0,s.yZ)(n)}`},r.createElement("th",{className:"px-4 pb-2 text-left"},"Remaining"),r.createElement(Budget_MonthAndYearCells,{value:n}),r.createElement("td",null))),Header=()=>r.createElement("thead",{className:"bg-sky-300 dark:bg-sky-900"},r.createElement("tr",{className:"text-right"},r.createElement("th",{className:"px-2"}),r.createElement("th",{className:"px-2"},"Per month"),r.createElement("th",{className:"px-2"},"Per year"),r.createElement("th",null)));var b=a(27620),f=a(48050);let p=b.yG?"http://localhost:4000":"https://finance.oliverflecke.me/api/v1";function BudgetCreate_extends(){return(BudgetCreate_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var Budget_BudgetCreate=({onBudgetCreated:e})=>{let t=(0,f.ku)(`${p}/budget`,{method:"POST"}),{register:a,handleSubmit:n}=(0,i.cI)(),l=(0,r.useCallback)(async a=>{console.log(`Creating budget with name: ${a.title}`),await t(a),e()},[t,e]);return r.createElement("div",{className:"flex max-w-lg flex-col space-y-2 rounded bg-sky-300 p-4 dark:bg-sky-900"},r.createElement("h3",{className:"text-lg"},"New budget"),r.createElement("form",{onSubmit:n(l),className:"flex flex-col space-y-4"},r.createElement("label",{className:"flex flex-col items-baseline"},r.createElement("span",{className:"text-md text-gray-700 dark:text-gray-100"},"Title"),r.createElement(E.II,BudgetCreate_extends({},a("title"),{placeholder:"My budget"}))),r.createElement("input",{type:"submit",value:"Create",className:"btn btn-success w-full"})))},Budget_BudgetList=()=>{let{dispatch:e}=(0,r.useContext)(u),t=(0,f.h_)(`${p}/budget`,{method:"GET"}),a=function(){let e=(0,f.t1)();return(0,r.useCallback)(t=>e(`${p}/budget/${t}`,{method:"DELETE"}),[e])}(),n=function(){let e=(0,f.t1)();return(0,r.useCallback)(async t=>{let a=await e(`${p}/budget/${t}`,{method:"GET"}),n=await a?.text();return n?(0,f.S5)(n):null},[e])}(),l=(0,r.useCallback)(async t=>{let a=await n(t.id);a&&e({type:"SET BUDGET",budget:a})},[e,n]),c=(0,r.useCallback)(async e=>{await a(e),t.refresh()},[t,a]),[s,d]=(0,r.useState)(!1);return r.createElement(r.Fragment,null,r.createElement("div",{className:"bg-sky-300 p-4 dark:bg-sky-900"},r.createElement("div",{className:"flex w-full flex-row justify-between space-x-4 font-bold text-gray-800 dark:text-gray-300"},r.createElement("span",null,"Title"),r.createElement("span",null,"Created at"),r.createElement("span",null)),t.data&&r.createElement("ul",null,t.data?.map(e=>r.createElement(BudgetListItem,{key:`${e.title}-${e.created_at.toISOString()}`,budget:e,deleteCallback:c,onSelect:l}))),r.createElement("div",{className:"flex-end flex w-full"},r.createElement(AddButton,{onClick:()=>d(!0)})),r.createElement(E.u_,{isOpen:s,onDismiss:()=>d(!1)},r.createElement(Budget_BudgetCreate,{onBudgetCreated:t.refresh}))))};let BudgetListItem=({budget:e,deleteCallback:t,onSelect:a})=>r.createElement("li",{className:"flex w-full flex-row justify-between space-x-4 rounded px-4 odd:bg-slate-200 dark:odd:bg-slate-800"},r.createElement("span",{onClick:()=>a(e),className:"hover:cursor-pointer"},e.title),r.createElement("span",null,e.created_at.toDateString()),r.createElement("span",null,r.createElement(g.Z,{onClick:()=>t(e.id)}))),x="GBP",Budget=({reducer:e})=>{let[t,a]=function(e,t,a){let[n,l]=(0,r.useState)({...t,loading:!1,error:null}),c=(0,r.useCallback)(e=>{a&&localStorage.setItem(a,JSON.stringify(e)),l(e)},[a,l]),u=(0,r.useCallback)(async t=>{let a=e(n,t);a instanceof Promise?(l({...n,loading:!0,error:null}),a.then(e=>c({...e,loading:!1,error:null})).catch(e=>l({...n,loading:!1,error:e}))):c({...a,loading:!1,error:null})},[c,e,n]);return[n,u]}(e,fetchInitialData(),"budget");return r.createElement(r.Fragment,null,r.createElement(u.Provider,{value:{state:t,dispatch:a}},r.createElement(Budget_BudgetList,null),r.createElement(l.Z,null,t.budget&&r.createElement(r.Fragment,null,r.createElement("h3",{className:" px-4 pt-6 text-3xl text-fuchsia-700 dark:text-fuchsia-600"},t.budget.title),r.createElement(BudgetConfiguration,null),r.createElement(Budget_BudgetDetails,{budget:t.budget})))))};var features_Budget=()=>{let e=function(){let e=(0,f.t1)();return(0,r.useCallback)(async(t,a)=>{let n=await e(`${p}/budget/${t}/item`,{method:"POST"},a);if(!n?.ok)throw Error(await n?.text());return await n.text()},[e])}(),t=function(){let e=(0,f.t1)();return(0,r.useCallback)(async(t,a)=>{let n=await e(`${p}/budget/${t}/item/${a}`,{method:"DELETE"});if(!n?.ok)throw Error(await n?.text())},[e])}(),a=function(){let e=(0,f.t1)();return(0,r.useCallback)(async(t,a,n)=>{let r=await e(`${p}/budget/${t}/item/${a}`,{method:"PUT"},n);if(!r?.ok)throw Error(await r?.text())},[e])}(),n=(0,r.useMemo)(()=>{var n;return n={addItemToBudgetCallback:e,deleteItemFromBudgetCallback:t,updateItemCallback:a},async(e,t)=>{switch(t.type){case"HIDE ITEMS":return{...e,hideItems:t.value};case"ADD SAVINGS":case"ADD EXPENSE":case"ADD INCOME":if(!e.budget)throw Error("No budget has been selected");let a=await n.addItemToBudgetCallback(t.budget_id,t.item),r=new Date(Date.now()),l={...t.item,created_at:r,modified_at:r,id:a,budget_id:t.budget_id};return{...e,budget:{...e.budget,items:e.budget.items.concat(l)}};case"REMOVE ITEM":if(!e.budget)throw Error("No budget has been selected");return await n.deleteItemFromBudgetCallback(t.budget_id,t.item_id),{...e,budget:{...e.budget,items:e.budget.items.filter(e=>e.id!==t.item_id)}};case"EDIT ITEM":if(!e.budget)throw Error("No budget has been selected");return await n.updateItemCallback(e.budget.id,t.item_id,t.item),{...e,budget:{...e.budget,items:e.budget.items.map(e=>e.id===t.item_id?{...e,...t.item}:e)}};case"SET BUDGET":return{...e,budget:t.budget};default:return console.warn(`Unhandled action: ${t}`),Promise.resolve(e)}}},[e,t,a]);return r.createElement(Budget,{reducer:n})},budget=()=>r.createElement(r.Fragment,null,r.createElement(n.Z,{title:"Budget"}),r.createElement(features_Budget,null))},31485:function(e,t,a){"use strict";a.d(t,{Z:function(){return DeleteButton}});var n=a(75271),r=a(79498);function DeleteButton({onClick:e}){return n.createElement("button",{onClick:e,className:"flex focus:outline-none"},n.createElement(r.BFV,{size:24,className:"text-red-700 dark:text-red-500"}))}},1029:function(e,t,a){"use strict";var n=a(79238),r=a.n(n),l=a(75271);t.Z=({title:e})=>{let t=`${e} | Finance`;return l.createElement(r(),null,l.createElement("title",null,t))}},57289:function(e,t,a){"use strict";function getValueColorIndicator(e){return e>0?n.positiveColor:e<0?n.negativeColor:""}function getBackgroundColorValueIndicator(e){return e>0?n.positiveBackground:e<0?n.positiveBackground:""}a.d(t,{yY:function(){return getValueColorIndicator},yZ:function(){return getBackgroundColorValueIndicator}});let n={positiveColor:"text-green-700 dark:text-green-500",negativeColor:"text-red-700 dark:text-red-500",positiveBackground:"bg-green-400 dark:bg-green-700"}},67850:function(e,t,a){"use strict";a.d(t,{CV:function(){return sortObject},fK:function(){return convertToCurrency},p3:function(){return parseNumber},sL:function(){return useConverter},xG:function(){return formatCurrency}});var n=a(75271);function parseNumber(e){return Number.parseFloat(e.toString().replace(/[^.\d]/g,""))}function formatCurrency(e,t,a){if(!e||Number.isNaN(e))return"0";let format=t=>e.toLocaleString("en-US",{style:"currency",currency:t,currencyDisplay:"symbol",...a});try{return format(t??"USD")}catch(a){if(a instanceof RangeError&&a.message.startsWith("Invalid currency code")&&t)return format("USD").replace("USD",t);return e.toString()}}function convertToCurrency(e,t,a,n){return e*getConversionRate(t,a,n)}function getConversionRate(e,t,a){let n=t?.toLowerCase(),r=a?.toLowerCase();return n&&r&&n!==r?"usd"===n?"GBp"===a?100*e.gbp:r in e?e[r]:1:"usd"!==r?getConversionRate(e,t,"usd")*getConversionRate(e,"usd",a):"GBp"===t?1/(100*e.gbp):n in e?1/e[n]:1:1}function useConverter(e,t,a){return(0,n.useCallback)(n=>n*getConversionRate(a,e,t),[e,a,t])}function sortObject(e){return Object.keys(e).sort().reduce((t,a)=>(t[a]=e[a],t),{})}Intl.NumberFormat(void 0,{style:"currency",currency:"DKK",currencyDisplay:"code"})},26754:function(e,t,a){"use strict";function sum(...e){return e.reduce((e,t)=>e+t,0)}a.d(t,{S:function(){return sum}})},11223:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/budget",function(){return a(68812)}])}},function(e){e.O(0,[533,888,774,179],function(){return e(e.s=11223)}),_N_E=e.O()}]);