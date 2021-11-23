(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[680],{6064:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return A}});var n=r(7294),a=r(7515),o=r(7818),i=r(2283);function s(){}function l(e){return!!(e||"").match(/\d/)}function u(e){return null===e||void 0===e}function c(e){return e.replace(/[-[\]/{}()*+?.\\^$|]/g,"\\$&")}function p(e,t){void 0===t&&(t=!0);var r="-"===e[0],n=r&&t,a=(e=e.replace("-","")).split(".");return{beforeDecimal:a[0],afterDecimal:a[1]||"",hasNagation:r,addNegation:n}}function m(e,t,r){for(var n="",a=r?"0":"",o=0;o<=t-1;o++)n+=e[o]||a;return n}function f(e,t){return Array(t+1).join(e)}function h(e,t){if(e.value=e.value,null!==e){if(e.createTextRange){var r=e.createTextRange();return r.move("character",t),r.select(),!0}return e.selectionStart||0===e.selectionStart?(e.focus(),e.setSelectionRange(t,t),!0):(e.focus(),!1)}}function d(e,t,r){return Math.min(Math.max(e,t),r)}function g(e){return Math.max(e.selectionStart,e.selectionEnd)}var v={displayType:"input",decimalSeparator:".",thousandsGroupStyle:"thousand",fixedDecimalScale:!1,prefix:"",suffix:"",allowNegative:!0,allowEmptyFormatting:!1,allowLeadingZeros:!1,isNumericString:!1,type:"text",onValueChange:s,onChange:s,onKeyDown:s,onMouseUp:s,onFocus:s,onBlur:s,isAllowed:function(){return!0}},y=function(e){function t(t){e.call(this,t);var r=t.defaultValue;this.validateProps();var n=this.formatValueProp(r);this.state={value:n,numAsString:this.removeFormatting(n),mounted:!1},this.selectionBeforeInput={selectionStart:0,selectionEnd:0},this.onChange=this.onChange.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onFocus=this.onFocus.bind(this),this.onBlur=this.onBlur.bind(this)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.componentDidMount=function(){this.setState({mounted:!0})},t.prototype.componentDidUpdate=function(e){this.updateValueIfRequired(e)},t.prototype.componentWillUnmount=function(){clearTimeout(this.focusTimeout),clearTimeout(this.caretPositionTimeout)},t.prototype.updateValueIfRequired=function(e){var t=this,r=t.props,n=t.state,a=t.focusedElm,o=n.value,i=n.numAsString;if(void 0===i&&(i=""),e!==r){this.validateProps();var s=this.formatNumString(i),l=u(r.value)?s:this.formatValueProp(),c=this.removeFormatting(l),p=parseFloat(c),m=parseFloat(i);(isNaN(p)&&isNaN(m)||p===m)&&s===o&&(null!==a||l===o)||this.updateValue({formattedValue:l,numAsString:c,input:a,source:"prop",event:null})}},t.prototype.getFloatString=function(e){void 0===e&&(e="");var t=this.props.decimalScale,r=this.getSeparators().decimalSeparator,n=this.getNumberRegex(!0),a="-"===e[0];a&&(e=e.replace("-","")),r&&0===t&&(e=e.split(r)[0]);var o=(e=(e.match(n)||[]).join("").replace(r,".")).indexOf(".");return-1!==o&&(e=e.substring(0,o)+"."+e.substring(o+1,e.length).replace(new RegExp(c(r),"g"),"")),a&&(e="-"+e),e},t.prototype.getNumberRegex=function(e,t){var r=this.props,n=r.format,a=r.decimalScale,o=r.customNumerals,i=this.getSeparators().decimalSeparator;return new RegExp("[0-9"+(o?o.join(""):"")+"]"+(!i||0===a||t||n?"":"|"+c(i)),e?"g":void 0)},t.prototype.getSeparators=function(){var e=this.props.decimalSeparator,t=this.props,r=t.thousandSeparator,n=t.allowedDecimalSeparators;return!0===r&&(r=","),n||(n=[e,"."]),{decimalSeparator:e,thousandSeparator:r,allowedDecimalSeparators:n}},t.prototype.getMaskAtIndex=function(e){var t=this.props.mask;return void 0===t&&(t=" "),"string"===typeof t?t:t[e]||" "},t.prototype.getValueObject=function(e,t){var r=parseFloat(t);return{formattedValue:e,value:t,floatValue:isNaN(r)?void 0:r}},t.prototype.validateProps=function(){var e=this.props.mask,t=this.getSeparators(),r=t.decimalSeparator,n=t.thousandSeparator;if(r===n)throw new Error("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: "+n+' (thousandSeparator = {true} is same as thousandSeparator = ",")\n          decimalSeparator: '+r+" (default value for decimalSeparator is .)\n       ");if(e&&("string"===e?e:e.toString()).match(/\d/g))throw new Error("\n          Mask "+e+" should not contain numeric character;\n        ")},t.prototype.setPatchedCaretPosition=function(e,t,r){h(e,t),this.caretPositionTimeout=setTimeout((function(){e.value===r&&h(e,t)}),0)},t.prototype.correctCaretPosition=function(e,t,r){var n=this.props,a=n.prefix,o=n.suffix,i=n.format;if(""===e)return 0;if(t=d(t,0,e.length),!i){var s="-"===e[0];return d(t,a.length+(s?1:0),e.length-o.length)}if("function"===typeof i)return t;if("#"===i[t]&&l(e[t]))return t;if("#"===i[t-1]&&l(e[t-1]))return t;var u=i.indexOf("#");t=d(t,u,i.lastIndexOf("#")+1);for(var c=i.substring(t,i.length).indexOf("#"),p=t,m=t+(-1===c?0:c);p>u&&("#"!==i[p]||!l(e[p]));)p-=1;return!l(e[m])||"left"===r&&t!==u||t-p<m-t?l(e[p])?p+1:p:m},t.prototype.getCaretPosition=function(e,t,r){var n,a,o=this.props.format,i=this.state.value,s=this.getNumberRegex(!0),l=(e.match(s)||[]).join(""),u=(t.match(s)||[]).join("");for(n=0,a=0;a<r;a++){var c=e[a]||"",p=t[n]||"";if((c.match(s)||c===p)&&("0"!==c||!p.match(s)||"0"===p||l.length===u.length)){for(;c!==t[n]&&n<t.length;)n++;n++}}return"string"!==typeof o||i||(n=t.length),n=this.correctCaretPosition(t,n)},t.prototype.removePrefixAndSuffix=function(e){var t=this.props,r=t.format,n=t.prefix,a=t.suffix;if(!r&&e){var o="-"===e[0];o&&(e=e.substring(1,e.length));var i=(e=n&&0===e.indexOf(n)?e.substring(n.length,e.length):e).lastIndexOf(a);e=a&&-1!==i&&i===e.length-a.length?e.substring(0,i):e,o&&(e="-"+e)}return e},t.prototype.removePatternFormatting=function(e){for(var t=this.props.format.split("#").filter((function(e){return""!==e})),r=0,n="",a=0,o=t.length;a<=o;a++){var i=t[a]||"",s=a===o?e.length:e.indexOf(i,r);if(-1===s){n=e;break}n+=e.substring(r,s),r=s+i.length}return(n.match(/\d/g)||[]).join("")},t.prototype.removeFormatting=function(e){var t=this.props,r=t.format,n=t.removeFormatting;return e?(r?e="string"===typeof r?this.removePatternFormatting(e):"function"===typeof n?n(e):(e.match(/\d/g)||[]).join(""):(e=this.removePrefixAndSuffix(e),e=this.getFloatString(e)),e):e},t.prototype.formatWithPattern=function(e){for(var t=this.props.format,r=0,n=t.split(""),a=0,o=t.length;a<o;a++)"#"===t[a]&&(n[a]=e[r]||this.getMaskAtIndex(r),r+=1);return n.join("")},t.prototype.formatAsNumber=function(e){var t=this.props,r=t.decimalScale,n=t.fixedDecimalScale,a=t.prefix,o=t.suffix,i=t.allowNegative,s=t.thousandsGroupStyle,l=this.getSeparators(),u=l.thousandSeparator,c=l.decimalSeparator,f=-1!==e.indexOf(".")||r&&n,h=p(e,i),d=h.beforeDecimal,g=h.afterDecimal,v=h.addNegation;return void 0!==r&&(g=m(g,r,n)),u&&(d=function(e,t,r){var n=function(e){switch(e){case"lakh":return/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;case"wan":return/(\d)(?=(\d{4})+(?!\d))/g;case"thousand":default:return/(\d)(?=(\d{3})+(?!\d))/g}}(r),a=e.search(/[1-9]/);return a=-1===a?e.length:a,e.substring(0,a)+e.substring(a,e.length).replace(n,"$1"+t)}(d,u,s)),a&&(d=a+d),o&&(g+=o),v&&(d="-"+d),e=d+(f&&c||"")+g},t.prototype.formatNumString=function(e){void 0===e&&(e="");var t=this.props,r=t.format,n=t.allowEmptyFormatting,a=t.customNumerals,o=e;if(a&&10===a.length){var i=new RegExp("["+a.join("")+"]","g");o=e.replace(i,(function(e){return a.indexOf(e).toString()}))}return o=""!==e||n?"-"!==e||r?"string"===typeof r?this.formatWithPattern(o):"function"===typeof r?r(o):this.formatAsNumber(o):"-":""},t.prototype.formatValueProp=function(e){var t=this.props,r=t.format,n=t.decimalScale,a=t.fixedDecimalScale,o=t.allowEmptyFormatting,i=this.props,s=i.value,l=i.isNumericString,c=!(s=u(s)?e:s)&&0!==s;return c&&o&&(s=""),c&&!o?"":("number"===typeof s&&(s=function(e){var t="-"===(e+="")[0]?"-":"";t&&(e=e.substring(1));var r=e.split(/[eE]/g),n=r[0],a=r[1];if(!(a=Number(a)))return t+n;var o=1+a,i=(n=n.replace(".","")).length;return o<0?n="0."+f("0",Math.abs(o))+n:o>=i?n+=f("0",o-i):n=(n.substring(0,o)||"0")+"."+n.substring(o),t+n}(s),l=!0),"Infinity"===s&&l&&(s=""),l&&!r&&"number"===typeof n&&(s=function(e,t,r){if(-1!==["","-"].indexOf(e))return e;var n=-1!==e.indexOf(".")&&t,a=p(e),o=a.beforeDecimal,i=a.afterDecimal,s=a.hasNagation,l=parseFloat("0."+(i||"0")),u=(i.length<=t?"0."+i:l.toFixed(t)).split(".");return(s?"-":"")+o.split("").reverse().reduce((function(e,t,r){return e.length>r?(Number(e[0])+Number(t)).toString()+e.substring(1,e.length):t+e}),u[0])+(n?".":"")+m(u[1]||"",Math.min(t,i.length),r)}(s,n,a)),l?this.formatNumString(s):this.formatInput(s))},t.prototype.formatNegation=function(e){void 0===e&&(e="");var t=this.props.allowNegative,r=new RegExp("(-)"),n=new RegExp("(-)(.)*(-)"),a=r.test(e),o=n.test(e);return e=e.replace(/-/g,""),a&&!o&&t&&(e="-"+e),e},t.prototype.formatInput=function(e){return void 0===e&&(e=""),this.props.format||(e=this.removePrefixAndSuffix(e),e=this.formatNegation(e)),e=this.removeFormatting(e),this.formatNumString(e)},t.prototype.isCharacterAFormat=function(e,t){var r=this.props,n=r.format,a=r.prefix,o=r.suffix,i=r.decimalScale,s=r.fixedDecimalScale,l=this.getSeparators().decimalSeparator;return"string"===typeof n&&"#"!==n[e]||!(n||!(e<a.length||e>=t.length-o.length||i&&s&&t[e]===l))},t.prototype.correctInputValue=function(e,t,r){var n=this,a=this.props,o=a.format,i=a.allowNegative,s=a.prefix,l=a.suffix,u=a.decimalScale,c=this.getSeparators(),m=c.allowedDecimalSeparators,f=c.decimalSeparator,h=this.state.numAsString||"",d=this.selectionBeforeInput,g=d.selectionStart,v=d.selectionEnd,y=function(e,t){for(var r=0,n=0,a=e.length,o=t.length;e[r]===t[r]&&r<a;)r++;for(;e[a-1-n]===t[o-1-n]&&o-n>r&&a-n>r;)n++;return{start:r,end:a-n}}(t,r),x=y.start,S=y.end;if(!o&&x===S&&-1!==m.indexOf(r[g])){var b=0===u?"":f;return r.substr(0,g)+b+r.substr(g+1,r.length)}var E=o?0:s.length,w=t.length-(o?0:l.length);if(r.length>t.length||!r.length||x===S||0===g&&v===t.length||0===x&&S===t.length||g===E&&v===w)return r;var N=t.substr(x,S-x);if(!![].concat(N).find((function(e,r){return n.isCharacterAFormat(r+x,t)}))){var P=t.substr(x),D={},A=[];[].concat(P).forEach((function(e,r){n.isCharacterAFormat(r+x,t)?D[r]=e:r>N.length-1&&A.push(e)})),Object.keys(D).forEach((function(e){A.length>e?A.splice(e,0,D[e]):A.push(D[e])})),r=t.substr(0,x)+A.join("")}if(!o){var F=this.removeFormatting(r),C=p(F,i),I=C.beforeDecimal,k=C.afterDecimal,O=C.addNegation,M=e<r.indexOf(f)+1;if(F.length<h.length&&M&&""===I&&!parseFloat(k))return O?"-":""}return r},t.prototype.updateValue=function(e){var t=e.formattedValue,r=e.input,n=e.setCaretPosition;void 0===n&&(n=!0);var a=e.source,o=e.event,i=e.numAsString,s=e.caretPos,l=this.props.onValueChange,u=this.state.value;if(r)if(n){if(!s){var c=e.inputValue||r.value,p=g(r);r.value=t,s=this.getCaretPosition(c,t,p)}this.setPatchedCaretPosition(r,s,t)}else r.value=t;void 0===i&&(i=this.removeFormatting(t)),t!==u&&(this.setState({value:t,numAsString:i}),l(this.getValueObject(t,i),{event:o,source:a}))},t.prototype.onChange=function(e){var t=e.target,r=t.value,n=this.state,a=this.props,o=a.isAllowed,i=n.value||"",s=g(t);r=this.correctInputValue(s,i,r);var l=this.formatInput(r)||"",u=this.removeFormatting(l),c=o(this.getValueObject(l,u));c||(l=i),this.updateValue({formattedValue:l,numAsString:u,inputValue:r,input:t,event:e,source:"event"}),c&&a.onChange(e)},t.prototype.onBlur=function(e){var t=this.props,r=this.state,n=t.format,a=t.onBlur,o=t.allowLeadingZeros,i=r.numAsString,s=r.value;if(this.focusedElm=null,clearTimeout(this.focusTimeout),clearTimeout(this.caretPositionTimeout),!n){isNaN(parseFloat(i))&&(i=""),o||(i=function(e){if(!e)return e;var t="-"===e[0];t&&(e=e.substring(1,e.length));var r=e.split("."),n=r[0].replace(/^0+/,"")||"0",a=r[1]||"";return(t?"-":"")+n+(a?"."+a:"")}(i));var l=this.formatNumString(i);if(l!==s)return this.updateValue({formattedValue:l,numAsString:i,input:e.target,setCaretPosition:!1,event:e,source:"event"}),void a(e)}a(e)},t.prototype.onKeyDown=function(e){var t,r=e.target,n=e.key,a=r.selectionStart,o=r.selectionEnd,i=r.value;void 0===i&&(i="");var s=this.props,l=s.decimalScale,u=s.fixedDecimalScale,c=s.prefix,p=s.suffix,m=s.format,f=s.onKeyDown,h=void 0!==l&&u,d=this.getNumberRegex(!1,h),g=new RegExp("-"),v="string"===typeof m;if(this.selectionBeforeInput={selectionStart:a,selectionEnd:o},"ArrowLeft"===n||"Backspace"===n?t=a-1:"ArrowRight"===n?t=a+1:"Delete"===n&&(t=a),void 0!==t&&a===o){var y=t,x=v?m.indexOf("#"):c.length,S=v?m.lastIndexOf("#")+1:i.length-p.length;if("ArrowLeft"===n||"ArrowRight"===n){var b="ArrowLeft"===n?"left":"right";y=this.correctCaretPosition(i,t,b)}else if("Delete"!==n||d.test(i[t])||g.test(i[t])){if("Backspace"===n&&!d.test(i[t]))if(a<=x+1&&"-"===i[0]&&"undefined"===typeof m){var E=i.substring(1);this.updateValue({formattedValue:E,caretPos:y,input:r,event:e,source:"event"})}else if(!g.test(i[t])){for(;!d.test(i[y-1])&&y>x;)y--;y=this.correctCaretPosition(i,y,"left")}}else for(;!d.test(i[y])&&y<S;)y++;(y!==t||t<x||t>S)&&(e.preventDefault(),this.setPatchedCaretPosition(r,y,i)),e.isUnitTestRun&&this.setPatchedCaretPosition(r,y,i),f(e)}else f(e)},t.prototype.onMouseUp=function(e){var t=e.target,r=t.selectionStart,n=t.selectionEnd,a=t.value;if(void 0===a&&(a=""),r===n){var o=this.correctCaretPosition(a,r);o!==r&&this.setPatchedCaretPosition(t,o,a)}this.props.onMouseUp(e)},t.prototype.onFocus=function(e){var t=this;e.persist(),this.focusedElm=e.target,this.focusTimeout=setTimeout((function(){var r=e.target,n=r.selectionStart,a=r.selectionEnd,o=r.value;void 0===o&&(o="");var i=t.correctCaretPosition(o,n);i===n||0===n&&a===o.length||t.setPatchedCaretPosition(r,i,o),t.props.onFocus(e)}),0)},t.prototype.render=function(){var e=this.props,t=e.type,r=e.displayType,a=e.customInput,o=e.renderText,i=e.getInputRef,s=e.format,l=(e.thousandSeparator,e.decimalSeparator,e.allowedDecimalSeparators,e.thousandsGroupStyle,e.decimalScale,e.fixedDecimalScale,e.prefix,e.suffix,e.removeFormatting,e.mask,e.defaultValue,e.isNumericString,e.allowNegative,e.allowEmptyFormatting,e.allowLeadingZeros,e.onValueChange,e.isAllowed,e.customNumerals,e.onChange,e.onKeyDown,e.onMouseUp,e.onFocus,e.onBlur,e.value,function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(r[n]=e[n]);return r}(e,["type","displayType","customInput","renderText","getInputRef","format","thousandSeparator","decimalSeparator","allowedDecimalSeparators","thousandsGroupStyle","decimalScale","fixedDecimalScale","prefix","suffix","removeFormatting","mask","defaultValue","isNumericString","allowNegative","allowEmptyFormatting","allowLeadingZeros","onValueChange","isAllowed","customNumerals","onChange","onKeyDown","onMouseUp","onFocus","onBlur","value"])),u=this.state,c=u.value,p=u.mounted&&function(e){return e||"undefined"!==typeof navigator&&!(navigator.platform&&/iPhone|iPod/.test(navigator.platform))}(s)?"numeric":void 0,m=Object.assign({inputMode:p},l,{type:t,value:c,onChange:this.onChange,onKeyDown:this.onKeyDown,onMouseUp:this.onMouseUp,onFocus:this.onFocus,onBlur:this.onBlur});if("text"===r)return o?o(c,l)||null:n.createElement("span",Object.assign({},l,{ref:i}),c);if(a){var f=a;return n.createElement(f,Object.assign({},m,{ref:i}))}return n.createElement("input",Object.assign({},m,{ref:i}))},t}(n.Component);y.defaultProps=v;var x=y;function S(e,t,r,n,a=12){const o=function(e,t,r){return Math.pow(1+e/t,t/r)-1}(r,1,a),i=a*n;return e*Math.pow(1+o,i)+t*((Math.pow(1+o,i)-1)/o)}var b=r(8381);function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var w=({})=>{const[e,t]=(0,n.useState)(null),{register:r,handleSubmit:a,formState:{errors:s}}=(0,i.cI)({}),l=a((e=>t(e)));return n.createElement("div",{className:"px-4 dark:bg-coolGray-700"},n.createElement("h2",{className:"text-xl py-4 lg:text-left"},"Compound interest calculator"),n.createElement("form",{onSubmit:l,className:"w-full overflow-x-hidden flex flex-col items-center justify-center"},n.createElement("fieldset",{className:"flex flex-col items-center space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6"},n.createElement(x,E({customInput:o.II,thousandSeparator:!0,label:"Existing amount",placeholder:"20,000",inputMode:"numeric",errorMessage:s.existingAmount?.message},r("existingAmount",{required:!0}))),n.createElement(o.II,E({label:"Expected yearly growth",placeholder:"7",errorMessage:s.interestRate&&"Please provide a valid value"},r("interestRate",{required:!0}))),n.createElement(o.II,E({label:"Investment period",placeholder:"10",errorMessage:s.investmentPeriod&&"Please provide a number of years you are investing"},r("investmentPeriod",{required:!0}))),n.createElement(o.II,E({label:"Interval of interest accrual",placeholder:"Yearly",errorMessage:s.interestAccural?.message},r("interestAccural",{required:!0}))),n.createElement(x,E({customInput:o.II,thousandSeparator:!0,label:"Monthly deposit",placeholder:"10,000",inputMode:"numeric",errorMessage:s.monthlyDeposit?.message},r("monthlyDeposit",{required:!0})))),n.createElement("div",{className:"w-full pt-4 flex justify-center"},n.createElement(o.zx,{type:"submit"},"Calculate"))),e&&n.createElement(P,{existingAmount:(0,b.p3)(e.existingAmount),interestRate:(0,b.p3)(e.interestRate),investmentPeriod:(0,b.p3)(e.investmentPeriod),monthlyDeposit:(0,b.p3)(e.monthlyDeposit),interestAccural:e.interestAccural}))};const N=Intl.NumberFormat("en-US",{style:"currency",currency:"DKK"}),P=e=>{const t=(0,n.useMemo)((()=>e.interestRate/100),[e.interestRate]),r=(0,n.useMemo)((()=>0!==e.monthlyDeposit),[e.monthlyDeposit]),a=S(e.existingAmount,e.monthlyDeposit,t,e.investmentPeriod),o=12*e.monthlyDeposit*e.investmentPeriod+e.existingAmount,i=a-o;return n.createElement(n.Fragment,null,n.createElement("div",{className:"w-full flex flex-col items-center"},n.createElement("div",{className:"max-w-2xl w-full grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 justify-center p-8"},n.createElement(D,{amount:a,label:`Balance after ${e.investmentPeriod} years`,color:"bg-blue-900 dark:bg-blue-300"}),n.createElement(D,{amount:e.existingAmount,label:"Initial amount",color:"bg-green-900 dark:bg-green-300"}),n.createElement(D,{amount:o,label:"Total deposits",color:"bg-indigo-900 dark:bg-indigo-300"}),n.createElement(D,{amount:i,label:"Gain from interest",color:"bg-yellow-900 dark:bg-yellow-300"}))),n.createElement("div",{className:"overflow-x-scroll -mx-4 lg:overflow-x-auto lg:w-full lg:m-0"},n.createElement("table",{className:"w-full"},n.createElement("thead",null,n.createElement("tr",{className:"text-right"},n.createElement("th",{className:"text-center"},"Year"),r&&n.createElement("th",null,"Deposit"),n.createElement("th",{className:"text-green-800 dark:text-green-400"},"Interest"),r&&n.createElement("th",null,"Total deposits"),n.createElement("th",{className:"text-purple-800 dark:text-purple-400"},"Total interest"),n.createElement("th",{className:"text-red-800 dark:text-red-400"},"Balance"))),n.createElement("tbody",{className:"text-right font-mono"},[...Array(e.investmentPeriod+1).keys()].map((a=>{const o=0===a?e.existingAmount:12*e.monthlyDeposit,i=12*a*e.monthlyDeposit+e.existingAmount,s=S(e.existingAmount,e.monthlyDeposit,t,a),l=a-1,u=12*l*e.monthlyDeposit+e.existingAmount,c=S(e.existingAmount,e.monthlyDeposit,t,l),p=s-i,m=0===a?0:p-(c-u);return n.createElement("tr",{key:a,className:"odd:bg-coolGray-200 dark:odd:bg-coolGray-900"},n.createElement("td",{className:"text-center"},a),r&&n.createElement("td",null,N.format(o)),n.createElement("td",null,N.format(m)),r&&n.createElement("td",null,N.format(i)),n.createElement("td",null,N.format(p)),n.createElement("td",null,N.format(s)))}))))))},D=({amount:e,label:t,color:r})=>n.createElement("div",{className:"flex space-x-4"},n.createElement("div",{className:`w-6 h-6 rounded-full ${r}`}),n.createElement("div",null,n.createElement("span",{className:"text-black dark:text-coolGray-300"},t),n.createElement("div",{className:"text-black dark:text-white text-2xl"},N.format(e))));var A=()=>n.createElement(n.Fragment,null,n.createElement(a.Z,{title:"Compound Interest calculator"}),n.createElement(w,null))},7515:function(e,t,r){"use strict";var n=r(9008),a=r(7294);t.Z=({title:e})=>a.createElement(n.default,null,a.createElement("title",null,e," | Finance"))},8381:function(e,t,r){"use strict";r.d(t,{p3:function(){return a},oB:function(){return o},xG:function(){return i},fK:function(){return s},sL:function(){return u},CV:function(){return p}});var n=r(7294);function a(e){return Number.parseFloat(e.toString().replace(/[,a-zA-Z]/g,""))}const o=Intl.NumberFormat(void 0,{style:"currency",currency:"DKK",currencyDisplay:"code"});function i(e,t){return Number.isNaN(e)?"-":e.toLocaleString(void 0,{style:"currency",currency:t??"USD",currencyDisplay:"code"})}function s(e,t,r,n){return e*l(t,r,n)}function l(e,t,r){const n="usd";return e=e?.toLowerCase(),t=t?.toLowerCase(),r=r??c,e&&t&&e!==t?e===n?t in r?r[t]:1:t===n?e in r?1/r[e]:1:l(e,n)*l(n,t):1}function u(e,t,r){return(0,n.useCallback)((n=>s(n,e,t,r)),[e,r,t])}const c={dkk:6.36,nok:9,eur:.85};function p(e){return Object.keys(e).sort().reduce(((t,r)=>(t[r]=e[r],t)),{})}},433:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/interest",function(){return r(6064)}])}},function(e){e.O(0,[283,888,774,179],(function(){return t=433,e(e.s=t);var t}));var t=e.O();_N_E=t}]);