"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[533],{28533:function(e,t,i){i.d(t,{cI:function(){return useForm}});var r=i(75271),isCheckBoxInput=e=>"checkbox"===e.type,isDateObject=e=>e instanceof Date,isNullOrUndefined=e=>null==e;let isObjectType=e=>"object"==typeof e;var isObject=e=>!isNullOrUndefined(e)&&!Array.isArray(e)&&isObjectType(e)&&!isDateObject(e),getEventValue=e=>isObject(e)&&e.target?isCheckBoxInput(e.target)?e.target.checked:e.target.value:e,getNodeParentName=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,isNameInFieldArray=(e,t)=>e.has(getNodeParentName(t)),isPlainObject=e=>{let t=e.constructor&&e.constructor.prototype;return isObject(t)&&t.hasOwnProperty("isPrototypeOf")},s="undefined"!=typeof window&&void 0!==window.HTMLElement&&"undefined"!=typeof document;function cloneObject(e){let t;let i=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(!(s&&(e instanceof Blob||e instanceof FileList))&&(i||isObject(e))))return e;else if(t=i?[]:{},i||isPlainObject(e))for(let i in e)e.hasOwnProperty(i)&&(t[i]=cloneObject(e[i]));else t=e;return t}var compact=e=>Array.isArray(e)?e.filter(Boolean):[],isUndefined=e=>void 0===e,get=(e,t,i)=>{if(!t||!isObject(e))return i;let r=compact(t.split(/[,[\].]+?/)).reduce((e,t)=>isNullOrUndefined(e)?e:e[t],e);return isUndefined(r)||r===e?isUndefined(e[t])?i:e[t]:r},isBoolean=e=>"boolean"==typeof e,isKey=e=>/^\w*$/.test(e),stringToPath=e=>compact(e.replace(/["|']|\]/g,"").split(/\.|\[/)),set=(e,t,i)=>{let r=-1,s=isKey(t)?[t]:stringToPath(t),a=s.length,l=a-1;for(;++r<a;){let t=s[r],a=i;if(r!==l){let i=e[t];a=isObject(i)||Array.isArray(i)?i:isNaN(+s[r+1])?{}:[]}if("__proto__"===t)return;e[t]=a,e=e[t]}return e};let a={BLUR:"blur",FOCUS_OUT:"focusout"},l={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},n={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};r.createContext(null);var getProxyFormState=(e,t,i,r=!0)=>{let s={defaultValues:t._defaultValues};for(let a in e)Object.defineProperty(s,a,{get:()=>(t._proxyFormState[a]!==l.all&&(t._proxyFormState[a]=!r||l.all),i&&(i[a]=!0),e[a])});return s},isEmptyObject=e=>isObject(e)&&!Object.keys(e).length,shouldRenderFormState=(e,t,i,r)=>{i(e);let{name:s,...a}=e;return isEmptyObject(a)||Object.keys(a).length>=Object.keys(t).length||Object.keys(a).find(e=>t[e]===(!r||l.all))},convertToArrayPayload=e=>Array.isArray(e)?e:[e],isString=e=>"string"==typeof e,generateWatchOutput=(e,t,i,r,s)=>isString(e)?(r&&t.watch.add(e),get(i,e,s)):Array.isArray(e)?e.map(e=>(r&&t.watch.add(e),get(i,e))):(r&&(t.watchAll=!0),i),appendErrors=(e,t,i,r,s)=>t?{...i[e],types:{...i[e]&&i[e].types?i[e].types:{},[r]:s||!0}}:{},getValidationModes=e=>({isOnSubmit:!e||e===l.onSubmit,isOnBlur:e===l.onBlur,isOnChange:e===l.onChange,isOnAll:e===l.all,isOnTouch:e===l.onTouched}),isWatched=(e,t,i)=>!i&&(t.watchAll||t.watch.has(e)||[...t.watch].some(t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length))));let iterateFieldsByAction=(e,t,i,r)=>{for(let s of i||Object.keys(e)){let i=get(e,s);if(i){let{_f:e,...a}=i;if(e){if(e.refs&&e.refs[0]&&t(e.refs[0],s)&&!r||e.ref&&t(e.ref,e.name)&&!r)return!0;if(iterateFieldsByAction(a,t))break}else if(isObject(a)&&iterateFieldsByAction(a,t))break}}};var updateFieldArrayRootError=(e,t,i)=>{let r=convertToArrayPayload(get(e,i));return set(r,"root",t[i]),set(e,i,r),e},isFileInput=e=>"file"===e.type,isFunction=e=>"function"==typeof e,isHTMLElement=e=>{if(!s)return!1;let t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},isMessage=e=>isString(e),isRadioInput=e=>"radio"===e.type,isRegex=e=>e instanceof RegExp;let u={value:!1,isValid:!1},d={value:!0,isValid:!0};var getCheckboxValue=e=>{if(Array.isArray(e)){if(e.length>1){let t=e.filter(e=>e&&e.checked&&!e.disabled).map(e=>e.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!isUndefined(e[0].attributes.value)?isUndefined(e[0].value)||""===e[0].value?d:{value:e[0].value,isValid:!0}:d:u}return u};let o={isValid:!1,value:null};var getRadioValue=e=>Array.isArray(e)?e.reduce((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e,o):o;function getValidateError(e,t,i="validate"){if(isMessage(e)||Array.isArray(e)&&e.every(isMessage)||isBoolean(e)&&!e)return{type:i,message:isMessage(e)?e:"",ref:t}}var getValueAndMessage=e=>isObject(e)&&!isRegex(e)?e:{value:e,message:""},validateField=async(e,t,i,r,s)=>{let{ref:a,refs:l,required:u,maxLength:d,minLength:o,min:c,max:f,pattern:g,validate:y,name:m,valueAsNumber:p,mount:b,disabled:h}=e._f,V=get(t,m);if(!b||h)return{};let v=l?l[0]:a,setCustomValidity=e=>{r&&v.reportValidity&&(v.setCustomValidity(isBoolean(e)?"":e||""),v.reportValidity())},_={},F=isRadioInput(a),O=isCheckBoxInput(a),A=(p||isFileInput(a))&&isUndefined(a.value)&&isUndefined(V)||isHTMLElement(a)&&""===a.value||""===V||Array.isArray(V)&&!V.length,S=appendErrors.bind(null,m,i,_),getMinMaxMessage=(e,t,i,r=n.maxLength,s=n.minLength)=>{let l=e?t:i;_[m]={type:e?r:s,message:l,ref:a,...S(e?r:s,l)}};if(s?!Array.isArray(V)||!V.length:u&&(!(F||O)&&(A||isNullOrUndefined(V))||isBoolean(V)&&!V||O&&!getCheckboxValue(l).isValid||F&&!getRadioValue(l).isValid)){let{value:e,message:t}=isMessage(u)?{value:!!u,message:u}:getValueAndMessage(u);if(e&&(_[m]={type:n.required,message:t,ref:v,...S(n.required,t)},!i))return setCustomValidity(t),_}if(!A&&(!isNullOrUndefined(c)||!isNullOrUndefined(f))){let e,t;let r=getValueAndMessage(f),s=getValueAndMessage(c);if(isNullOrUndefined(V)||isNaN(V)){let i=a.valueAsDate||new Date(V),convertTimeToDate=e=>new Date(new Date().toDateString()+" "+e),l="time"==a.type,n="week"==a.type;isString(r.value)&&V&&(e=l?convertTimeToDate(V)>convertTimeToDate(r.value):n?V>r.value:i>new Date(r.value)),isString(s.value)&&V&&(t=l?convertTimeToDate(V)<convertTimeToDate(s.value):n?V<s.value:i<new Date(s.value))}else{let i=a.valueAsNumber||(V?+V:V);isNullOrUndefined(r.value)||(e=i>r.value),isNullOrUndefined(s.value)||(t=i<s.value)}if((e||t)&&(getMinMaxMessage(!!e,r.message,s.message,n.max,n.min),!i))return setCustomValidity(_[m].message),_}if((d||o)&&!A&&(isString(V)||s&&Array.isArray(V))){let e=getValueAndMessage(d),t=getValueAndMessage(o),r=!isNullOrUndefined(e.value)&&V.length>+e.value,s=!isNullOrUndefined(t.value)&&V.length<+t.value;if((r||s)&&(getMinMaxMessage(r,e.message,t.message),!i))return setCustomValidity(_[m].message),_}if(g&&!A&&isString(V)){let{value:e,message:t}=getValueAndMessage(g);if(isRegex(e)&&!V.match(e)&&(_[m]={type:n.pattern,message:t,ref:a,...S(n.pattern,t)},!i))return setCustomValidity(t),_}if(y){if(isFunction(y)){let e=await y(V,t),r=getValidateError(e,v);if(r&&(_[m]={...r,...S(n.validate,r.message)},!i))return setCustomValidity(r.message),_}else if(isObject(y)){let e={};for(let r in y){if(!isEmptyObject(e)&&!i)break;let s=getValidateError(await y[r](V,t),v,r);s&&(e={...s,...S(r,s.message)},setCustomValidity(s.message),i&&(_[m]=e))}if(!isEmptyObject(e)&&(_[m]={ref:v,...e},!i))return _}}return setCustomValidity(!0),_};function unset(e,t){let i=Array.isArray(t)?t:isKey(t)?[t]:stringToPath(t),r=1===i.length?e:function(e,t){let i=t.slice(0,-1).length,r=0;for(;r<i;)e=isUndefined(e)?r++:e[t[r++]];return e}(e,i),s=i.length-1,a=i[s];return r&&delete r[a],0!==s&&(isObject(r)&&isEmptyObject(r)||Array.isArray(r)&&function(e){for(let t in e)if(e.hasOwnProperty(t)&&!isUndefined(e[t]))return!1;return!0}(r))&&unset(e,i.slice(0,-1)),e}var createSubject=()=>{let e=[];return{get observers(){return e},next:t=>{for(let i of e)i.next&&i.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter(e=>e!==t)}}),unsubscribe:()=>{e=[]}}},isPrimitive=e=>isNullOrUndefined(e)||!isObjectType(e);function deepEqual(e,t){if(isPrimitive(e)||isPrimitive(t))return e===t;if(isDateObject(e)&&isDateObject(t))return e.getTime()===t.getTime();let i=Object.keys(e),r=Object.keys(t);if(i.length!==r.length)return!1;for(let s of i){let i=e[s];if(!r.includes(s))return!1;if("ref"!==s){let e=t[s];if(isDateObject(i)&&isDateObject(e)||isObject(i)&&isObject(e)||Array.isArray(i)&&Array.isArray(e)?!deepEqual(i,e):i!==e)return!1}}return!0}var isMultipleSelect=e=>"select-multiple"===e.type,isRadioOrCheckbox=e=>isRadioInput(e)||isCheckBoxInput(e),live=e=>isHTMLElement(e)&&e.isConnected,objectHasFunction=e=>{for(let t in e)if(isFunction(e[t]))return!0;return!1};function markFieldsDirty(e,t={}){let i=Array.isArray(e);if(isObject(e)||i)for(let i in e)Array.isArray(e[i])||isObject(e[i])&&!objectHasFunction(e[i])?(t[i]=Array.isArray(e[i])?[]:{},markFieldsDirty(e[i],t[i])):isNullOrUndefined(e[i])||(t[i]=!0);return t}var getDirtyFields=(e,t)=>(function getDirtyFieldsFromDefaultValues(e,t,i){let r=Array.isArray(e);if(isObject(e)||r)for(let r in e)Array.isArray(e[r])||isObject(e[r])&&!objectHasFunction(e[r])?isUndefined(t)||isPrimitive(i[r])?i[r]=Array.isArray(e[r])?markFieldsDirty(e[r],[]):{...markFieldsDirty(e[r])}:getDirtyFieldsFromDefaultValues(e[r],isNullOrUndefined(t)?{}:t[r],i[r]):i[r]=!deepEqual(e[r],t[r]);return i})(e,t,markFieldsDirty(t)),getFieldValueAs=(e,{valueAsNumber:t,valueAsDate:i,setValueAs:r})=>isUndefined(e)?e:t?""===e?NaN:e?+e:e:i&&isString(e)?new Date(e):r?r(e):e;function getFieldValue(e){let t=e.ref;return(e.refs?e.refs.every(e=>e.disabled):t.disabled)?void 0:isFileInput(t)?t.files:isRadioInput(t)?getRadioValue(e.refs).value:isMultipleSelect(t)?[...t.selectedOptions].map(({value:e})=>e):isCheckBoxInput(t)?getCheckboxValue(e.refs).value:getFieldValueAs(isUndefined(t.value)?e.ref.value:t.value,e)}var getResolverOptions=(e,t,i,r)=>{let s={};for(let i of e){let e=get(t,i);e&&set(s,i,e._f)}return{criteriaMode:i,names:[...e],fields:s,shouldUseNativeValidation:r}},getRuleValue=e=>isUndefined(e)?e:isRegex(e)?e.source:isObject(e)?isRegex(e.value)?e.value.source:e.value:e;let c="AsyncFunction";var hasPromiseValidation=e=>(!e||!e.validate)&&!!(isFunction(e.validate)&&e.validate.constructor.name===c||isObject(e.validate)&&Object.values(e.validate).find(e=>e.constructor.name===c)),hasValidation=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function schemaErrorLookup(e,t,i){let r=get(e,i);if(r||isKey(i))return{error:r,name:i};let s=i.split(".");for(;s.length;){let r=s.join("."),a=get(t,r),l=get(e,r);if(a&&!Array.isArray(a)&&i!==r)break;if(l&&l.type)return{name:r,error:l};s.pop()}return{name:i}}var skipValidation=(e,t,i,r,s)=>!s.isOnAll&&(!i&&s.isOnTouch?!(t||e):(i?r.isOnBlur:s.isOnBlur)?!e:(i?!r.isOnChange:!s.isOnChange)||e),unsetEmptyArray=(e,t)=>!compact(get(e,t)).length&&unset(e,t);let f={mode:l.onSubmit,reValidateMode:l.onChange,shouldFocusError:!0};function useForm(e={}){let t=r.useRef(),i=r.useRef(),[n,u]=r.useState({isDirty:!1,isValidating:!1,isLoading:isFunction(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:isFunction(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...function(e={}){let t,i={...f,...e},r={submitCount:0,isDirty:!1,isLoading:isFunction(i.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:i.errors||{},disabled:i.disabled||!1},n={},u=(isObject(i.defaultValues)||isObject(i.values))&&cloneObject(i.defaultValues||i.values)||{},d=i.shouldUnregister?{}:cloneObject(u),o={action:!1,mount:!1,watch:!1},c={mount:new Set,unMount:new Set,array:new Set,watch:new Set},g=0,y={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},m={values:createSubject(),array:createSubject(),state:createSubject()},p=getValidationModes(i.mode),b=getValidationModes(i.reValidateMode),h=i.criteriaMode===l.all,debounce=e=>t=>{clearTimeout(g),g=setTimeout(e,t)},_updateValid=async t=>{if(!e.disabled&&(y.isValid||t)){let e=i.resolver?isEmptyObject((await _executeSchema()).errors):await executeBuiltInValidation(n,!0);e!==r.isValid&&m.state.next({isValid:e})}},_updateIsValidating=(t,i)=>{!e.disabled&&(y.isValidating||y.validatingFields)&&((t||Array.from(c.mount)).forEach(e=>{e&&(i?set(r.validatingFields,e,i):unset(r.validatingFields,e))}),m.state.next({validatingFields:r.validatingFields,isValidating:!isEmptyObject(r.validatingFields)}))},updateErrors=(e,t)=>{set(r.errors,e,t),m.state.next({errors:r.errors})},updateValidAndValue=(e,t,i,r)=>{let s=get(n,e);if(s){let a=get(d,e,isUndefined(i)?get(u,e):i);isUndefined(a)||r&&r.defaultChecked||t?set(d,e,t?a:getFieldValue(s._f)):setFieldValue(e,a),o.mount&&_updateValid()}},updateTouchAndDirty=(t,i,s,a,l)=>{let d=!1,o=!1,c={name:t};if(!e.disabled){let e=!!(get(n,t)&&get(n,t)._f&&get(n,t)._f.disabled);if(!s||a){y.isDirty&&(o=r.isDirty,r.isDirty=c.isDirty=_getDirty(),d=o!==c.isDirty);let s=e||deepEqual(get(u,t),i);o=!!(!e&&get(r.dirtyFields,t)),s||e?unset(r.dirtyFields,t):set(r.dirtyFields,t,!0),c.dirtyFields=r.dirtyFields,d=d||y.dirtyFields&&!s!==o}if(s){let e=get(r.touchedFields,t);e||(set(r.touchedFields,t,s),c.touchedFields=r.touchedFields,d=d||y.touchedFields&&e!==s)}d&&l&&m.state.next(c)}return d?c:{}},shouldRenderByError=(i,s,a,l)=>{let n=get(r.errors,i),u=y.isValid&&isBoolean(s)&&r.isValid!==s;if(e.delayError&&a?(t=debounce(()=>updateErrors(i,a)))(e.delayError):(clearTimeout(g),t=null,a?set(r.errors,i,a):unset(r.errors,i)),(a?!deepEqual(n,a):n)||!isEmptyObject(l)||u){let e={...l,...u&&isBoolean(s)?{isValid:s}:{},errors:r.errors,name:i};r={...r,...e},m.state.next(e)}},_executeSchema=async e=>{_updateIsValidating(e,!0);let t=await i.resolver(d,i.context,getResolverOptions(e||c.mount,n,i.criteriaMode,i.shouldUseNativeValidation));return _updateIsValidating(e),t},executeSchemaAndUpdateState=async e=>{let{errors:t}=await _executeSchema(e);if(e)for(let i of e){let e=get(t,i);e?set(r.errors,i,e):unset(r.errors,i)}else r.errors=t;return t},executeBuiltInValidation=async(e,t,s={valid:!0})=>{for(let a in e){let l=e[a];if(l){let{_f:e,...n}=l;if(e){let n=c.array.has(e.name),u=l._f&&hasPromiseValidation(l._f);u&&y.validatingFields&&_updateIsValidating([a],!0);let o=await validateField(l,d,h,i.shouldUseNativeValidation&&!t,n);if(u&&y.validatingFields&&_updateIsValidating([a]),o[e.name]&&(s.valid=!1,t))break;t||(get(o,e.name)?n?updateFieldArrayRootError(r.errors,o,e.name):set(r.errors,e.name,o[e.name]):unset(r.errors,e.name))}isEmptyObject(n)||await executeBuiltInValidation(n,t,s)}}return s.valid},_getDirty=(t,i)=>!e.disabled&&(t&&i&&set(d,t,i),!deepEqual(getValues(),u)),_getWatch=(e,t,i)=>generateWatchOutput(e,c,{...o.mount?d:isUndefined(t)?u:isString(e)?{[e]:t}:t},i,t),setFieldValue=(e,t,i={})=>{let r=get(n,e),s=t;if(r){let i=r._f;i&&(i.disabled||set(d,e,getFieldValueAs(t,i)),s=isHTMLElement(i.ref)&&isNullOrUndefined(t)?"":t,isMultipleSelect(i.ref)?[...i.ref.options].forEach(e=>e.selected=s.includes(e.value)):i.refs?isCheckBoxInput(i.ref)?i.refs.length>1?i.refs.forEach(e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(s)?!!s.find(t=>t===e.value):s===e.value)):i.refs[0]&&(i.refs[0].checked=!!s):i.refs.forEach(e=>e.checked=e.value===s):isFileInput(i.ref)?i.ref.value="":(i.ref.value=s,i.ref.type||m.values.next({name:e,values:{...d}})))}(i.shouldDirty||i.shouldTouch)&&updateTouchAndDirty(e,s,i.shouldTouch,i.shouldDirty,!0),i.shouldValidate&&trigger(e)},setValues=(e,t,i)=>{for(let r in t){let s=t[r],a=`${e}.${r}`,l=get(n,a);(c.array.has(e)||isObject(s)||l&&!l._f)&&!isDateObject(s)?setValues(a,s,i):setFieldValue(a,s,i)}},setValue=(e,t,i={})=>{let s=get(n,e),a=c.array.has(e),l=cloneObject(t);set(d,e,l),a?(m.array.next({name:e,values:{...d}}),(y.isDirty||y.dirtyFields)&&i.shouldDirty&&m.state.next({name:e,dirtyFields:getDirtyFields(u,d),isDirty:_getDirty(e,l)})):!s||s._f||isNullOrUndefined(l)?setFieldValue(e,l,i):setValues(e,l,i),isWatched(e,c)&&m.state.next({...r}),m.values.next({name:o.mount?e:void 0,values:{...d}})},onChange=async s=>{o.mount=!0;let l=s.target,u=l.name,f=!0,g=get(n,u),_updateIsFieldValueUpdated=e=>{f=Number.isNaN(e)||isDateObject(e)&&isNaN(e.getTime())||deepEqual(e,get(d,u,e))};if(g){let o,V;let v=l.type?getFieldValue(g._f):getEventValue(s),_=s.type===a.BLUR||s.type===a.FOCUS_OUT,F=!hasValidation(g._f)&&!i.resolver&&!get(r.errors,u)&&!g._f.deps||skipValidation(_,get(r.touchedFields,u),r.isSubmitted,b,p),O=isWatched(u,c,_);set(d,u,v),_?(g._f.onBlur&&g._f.onBlur(s),t&&t(0)):g._f.onChange&&g._f.onChange(s);let A=updateTouchAndDirty(u,v,_,!1),S=!isEmptyObject(A)||O;if(_||m.values.next({name:u,type:s.type,values:{...d}}),F)return y.isValid&&("onBlur"===e.mode?_&&_updateValid():_updateValid()),S&&m.state.next({name:u,...O?{}:A});if(!_&&O&&m.state.next({...r}),i.resolver){let{errors:e}=await _executeSchema([u]);if(_updateIsFieldValueUpdated(v),f){let t=schemaErrorLookup(r.errors,n,u),i=schemaErrorLookup(e,n,t.name||u);o=i.error,u=i.name,V=isEmptyObject(e)}}else _updateIsValidating([u],!0),o=(await validateField(g,d,h,i.shouldUseNativeValidation))[u],_updateIsValidating([u]),_updateIsFieldValueUpdated(v),f&&(o?V=!1:y.isValid&&(V=await executeBuiltInValidation(n,!0)));f&&(g._f.deps&&trigger(g._f.deps),shouldRenderByError(u,V,o,A))}},_focusInput=(e,t)=>{if(get(r.errors,t)&&e.focus)return e.focus(),1},trigger=async(e,t={})=>{let s,a;let l=convertToArrayPayload(e);if(i.resolver){let t=await executeSchemaAndUpdateState(isUndefined(e)?e:l);s=isEmptyObject(t),a=e?!l.some(e=>get(t,e)):s}else e?((a=(await Promise.all(l.map(async e=>{let t=get(n,e);return await executeBuiltInValidation(t&&t._f?{[e]:t}:t)}))).every(Boolean))||r.isValid)&&_updateValid():a=s=await executeBuiltInValidation(n);return m.state.next({...!isString(e)||y.isValid&&s!==r.isValid?{}:{name:e},...i.resolver||!e?{isValid:s}:{},errors:r.errors}),t.shouldFocus&&!a&&iterateFieldsByAction(n,_focusInput,e?l:c.mount),a},getValues=e=>{let t={...o.mount?d:u};return isUndefined(e)?t:isString(e)?get(t,e):e.map(e=>get(t,e))},getFieldState=(e,t)=>({invalid:!!get((t||r).errors,e),isDirty:!!get((t||r).dirtyFields,e),error:get((t||r).errors,e),isValidating:!!get(r.validatingFields,e),isTouched:!!get((t||r).touchedFields,e)}),setError=(e,t,i)=>{let s=(get(n,e,{_f:{}})._f||{}).ref,a=get(r.errors,e)||{},{ref:l,message:u,type:d,...o}=a;set(r.errors,e,{...o,...t,ref:s}),m.state.next({name:e,errors:r.errors,isValid:!1}),i&&i.shouldFocus&&s&&s.focus&&s.focus()},unregister=(e,t={})=>{for(let s of e?convertToArrayPayload(e):c.mount)c.mount.delete(s),c.array.delete(s),t.keepValue||(unset(n,s),unset(d,s)),t.keepError||unset(r.errors,s),t.keepDirty||unset(r.dirtyFields,s),t.keepTouched||unset(r.touchedFields,s),t.keepIsValidating||unset(r.validatingFields,s),i.shouldUnregister||t.keepDefaultValue||unset(u,s);m.values.next({values:{...d}}),m.state.next({...r,...t.keepDirty?{isDirty:_getDirty()}:{}}),t.keepIsValid||_updateValid()},_updateDisabledField=({disabled:e,name:t,field:i,fields:r,value:s})=>{if(isBoolean(e)&&o.mount||e){let a=e?void 0:isUndefined(s)?getFieldValue(i?i._f:get(r,t)._f):s;set(d,t,a),updateTouchAndDirty(t,a,!1,!1,!0)}},register=(t,r={})=>{let s=get(n,t),a=isBoolean(r.disabled)||isBoolean(e.disabled);return set(n,t,{...s||{},_f:{...s&&s._f?s._f:{ref:{name:t}},name:t,mount:!0,...r}}),c.mount.add(t),s?_updateDisabledField({field:s,disabled:isBoolean(r.disabled)?r.disabled:e.disabled,name:t,value:r.value}):updateValidAndValue(t,!0,r.value),{...a?{disabled:r.disabled||e.disabled}:{},...i.progressive?{required:!!r.required,min:getRuleValue(r.min),max:getRuleValue(r.max),minLength:getRuleValue(r.minLength),maxLength:getRuleValue(r.maxLength),pattern:getRuleValue(r.pattern)}:{},name:t,onChange,onBlur:onChange,ref:e=>{if(e){register(t,r),s=get(n,t);let i=isUndefined(e.value)&&e.querySelectorAll&&e.querySelectorAll("input,select,textarea")[0]||e,a=isRadioOrCheckbox(i),l=s._f.refs||[];(a?l.find(e=>e===i):i===s._f.ref)||(set(n,t,{_f:{...s._f,...a?{refs:[...l.filter(live),i,...Array.isArray(get(u,t))?[{}]:[]],ref:{type:i.type,name:t}}:{ref:i}}}),updateValidAndValue(t,!1,void 0,i))}else(s=get(n,t,{}))._f&&(s._f.mount=!1),(i.shouldUnregister||r.shouldUnregister)&&!(isNameInFieldArray(c.array,t)&&o.action)&&c.unMount.add(t)}}},_focusError=()=>i.shouldFocusError&&iterateFieldsByAction(n,_focusInput,c.mount),handleSubmit=(e,t)=>async s=>{let a;s&&(s.preventDefault&&s.preventDefault(),s.persist&&s.persist());let l=cloneObject(d);if(m.state.next({isSubmitting:!0}),i.resolver){let{errors:e,values:t}=await _executeSchema();r.errors=e,l=t}else await executeBuiltInValidation(n);if(unset(r.errors,"root"),isEmptyObject(r.errors)){m.state.next({errors:{}});try{await e(l,s)}catch(e){a=e}}else t&&await t({...r.errors},s),_focusError(),setTimeout(_focusError);if(m.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:isEmptyObject(r.errors)&&!a,submitCount:r.submitCount+1,errors:r.errors}),a)throw a},_reset=(t,i={})=>{let a=t?cloneObject(t):u,l=cloneObject(a),f=isEmptyObject(t),g=f?u:l;if(i.keepDefaultValues||(u=a),!i.keepValues){if(i.keepDirtyValues){let e=new Set([...c.mount,...Object.keys(getDirtyFields(u,d))]);for(let t of Array.from(e))get(r.dirtyFields,t)?set(g,t,get(d,t)):setValue(t,get(g,t))}else{if(s&&isUndefined(t))for(let e of c.mount){let t=get(n,e);if(t&&t._f){let e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(isHTMLElement(e)){let t=e.closest("form");if(t){t.reset();break}}}}n={}}d=e.shouldUnregister?i.keepDefaultValues?cloneObject(u):{}:cloneObject(g),m.array.next({values:{...g}}),m.values.next({values:{...g}})}c={mount:i.keepDirtyValues?c.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},o.mount=!y.isValid||!!i.keepIsValid||!!i.keepDirtyValues,o.watch=!!e.shouldUnregister,m.state.next({submitCount:i.keepSubmitCount?r.submitCount:0,isDirty:!f&&(i.keepDirty?r.isDirty:!!(i.keepDefaultValues&&!deepEqual(t,u))),isSubmitted:!!i.keepIsSubmitted&&r.isSubmitted,dirtyFields:f?{}:i.keepDirtyValues?i.keepDefaultValues&&d?getDirtyFields(u,d):r.dirtyFields:i.keepDefaultValues&&t?getDirtyFields(u,t):i.keepDirty?r.dirtyFields:{},touchedFields:i.keepTouched?r.touchedFields:{},errors:i.keepErrors?r.errors:{},isSubmitSuccessful:!!i.keepIsSubmitSuccessful&&r.isSubmitSuccessful,isSubmitting:!1})},reset=(e,t)=>_reset(isFunction(e)?e(d):e,t);return{control:{register,unregister,getFieldState,handleSubmit,setError,_executeSchema,_getWatch,_getDirty,_updateValid,_removeUnmounted:()=>{for(let e of c.unMount){let t=get(n,e);t&&(t._f.refs?t._f.refs.every(e=>!live(e)):!live(t._f.ref))&&unregister(e)}c.unMount=new Set},_updateFieldArray:(t,i=[],s,a,l=!0,c=!0)=>{if(a&&s&&!e.disabled){if(o.action=!0,c&&Array.isArray(get(n,t))){let e=s(get(n,t),a.argA,a.argB);l&&set(n,t,e)}if(c&&Array.isArray(get(r.errors,t))){let e=s(get(r.errors,t),a.argA,a.argB);l&&set(r.errors,t,e),unsetEmptyArray(r.errors,t)}if(y.touchedFields&&c&&Array.isArray(get(r.touchedFields,t))){let e=s(get(r.touchedFields,t),a.argA,a.argB);l&&set(r.touchedFields,t,e)}y.dirtyFields&&(r.dirtyFields=getDirtyFields(u,d)),m.state.next({name:t,isDirty:_getDirty(t,i),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else set(d,t,i)},_updateDisabledField,_getFieldArray:t=>compact(get(o.mount?d:u,t,e.shouldUnregister?get(u,t,[]):[])),_reset,_resetDefaultValues:()=>isFunction(i.defaultValues)&&i.defaultValues().then(e=>{reset(e,i.resetOptions),m.state.next({isLoading:!1})}),_updateFormState:e=>{r={...r,...e}},_disableForm:e=>{isBoolean(e)&&(m.state.next({disabled:e}),iterateFieldsByAction(n,(t,i)=>{let r=get(n,i);r&&(t.disabled=r._f.disabled||e,Array.isArray(r._f.refs)&&r._f.refs.forEach(t=>{t.disabled=r._f.disabled||e}))},0,!1))},_subjects:m,_proxyFormState:y,_setErrors:e=>{r.errors=e,m.state.next({errors:r.errors,isValid:!1})},get _fields(){return n},get _formValues(){return d},get _state(){return o},set _state(value){o=value},get _defaultValues(){return u},get _names(){return c},set _names(value){c=value},get _formState(){return r},set _formState(value){r=value},get _options(){return i},set _options(value){i={...i,...value}}},trigger,register,handleSubmit,watch:(e,t)=>isFunction(e)?m.values.subscribe({next:i=>e(_getWatch(void 0,t),i)}):_getWatch(e,t,!0),setValue,getValues,reset,resetField:(e,t={})=>{get(n,e)&&(isUndefined(t.defaultValue)?setValue(e,cloneObject(get(u,e))):(setValue(e,t.defaultValue),set(u,e,cloneObject(t.defaultValue))),t.keepTouched||unset(r.touchedFields,e),t.keepDirty||(unset(r.dirtyFields,e),r.isDirty=t.defaultValue?_getDirty(e,cloneObject(get(u,e))):_getDirty()),!t.keepError&&(unset(r.errors,e),y.isValid&&_updateValid()),m.state.next({...r}))},clearErrors:e=>{e&&convertToArrayPayload(e).forEach(e=>unset(r.errors,e)),m.state.next({errors:e?r.errors:{}})},unregister,setError,setFocus:(e,t={})=>{let i=get(n,e),r=i&&i._f;if(r){let e=r.refs?r.refs[0]:r.ref;e.focus&&(e.focus(),t.shouldSelect&&e.select())}},getFieldState}}(e),formState:n});let d=t.current.control;return d._options=e,!function(e){let t=r.useRef(e);t.current=e,r.useEffect(()=>{let i=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{i&&i.unsubscribe()}},[e.disabled])}({subject:d._subjects.state,next:e=>{shouldRenderFormState(e,d._proxyFormState,d._updateFormState,!0)&&u({...d._formState})}}),r.useEffect(()=>d._disableForm(e.disabled),[d,e.disabled]),r.useEffect(()=>{if(d._proxyFormState.isDirty){let e=d._getDirty();e!==n.isDirty&&d._subjects.state.next({isDirty:e})}},[d,n.isDirty]),r.useEffect(()=>{e.values&&!deepEqual(e.values,i.current)?(d._reset(e.values,d._options.resetOptions),i.current=e.values,u(e=>({...e}))):d._resetDefaultValues()},[e.values,d]),r.useEffect(()=>{e.errors&&d._setErrors(e.errors)},[e.errors,d]),r.useEffect(()=>{d._state.mount||(d._updateValid(),d._state.mount=!0),d._state.watch&&(d._state.watch=!1,d._subjects.state.next({...d._formState})),d._removeUnmounted()}),r.useEffect(()=>{e.shouldUnregister&&d._subjects.values.next({values:d._getWatch()})},[e.shouldUnregister,d]),r.useEffect(()=>{t.current&&(t.current.watch=t.current.watch.bind({}))},[n]),t.current.formState=getProxyFormState(n,d),t.current}}}]);