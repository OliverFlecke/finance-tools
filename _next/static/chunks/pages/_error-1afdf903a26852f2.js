(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[820],{9894:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,n=r(2648).Z,o=n(r(7294)),i=n(r(6505));let a={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function d({res:e,err:t}){let r=e&&e.statusCode?e.statusCode:t?t.statusCode:404;return{statusCode:r}}let s={error:{fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",margin:0,marginRight:"20px",padding:"0 23px 0 0",fontSize:"24px",fontWeight:500,verticalAlign:"top",lineHeight:"49px"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"49px",margin:0,padding:0}};class u extends(l=o.default.Component){render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||a[e]||"An unexpected error has occurred";return o.default.createElement("div",{style:s.error},o.default.createElement(i.default,null,o.default.createElement("title",null,e?`${e}: ${r}`:"Application error: a client-side exception has occurred")),o.default.createElement("div",null,o.default.createElement("style",{dangerouslySetInnerHTML:{__html:`
                body { margin: 0; color: #000; background: #fff; }
                .next-error-h1 {
                  border-right: 1px solid rgba(0, 0, 0, .3);
                }

                ${t?`@media (prefers-color-scheme: dark) {
                  body { color: #fff; background: #000; }
                  .next-error-h1 {
                    border-right: 1px solid rgba(255, 255, 255, .3);
                  }
                }`:""}`}}),e?o.default.createElement("h1",{className:"next-error-h1",style:s.h1},e):null,o.default.createElement("div",{style:s.desc},o.default.createElement("h2",{style:s.h2},this.props.title||e?r:o.default.createElement(o.default.Fragment,null,"Application error: a client-side exception has occurred (see the browser console for more information)"),"."))))}}u.displayName="ErrorPage",u.getInitialProps=d,u.origGetInitialProps=d,t.default=u,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6529:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_error",function(){return r(9894)}])}},function(e){e.O(0,[888,774,179],function(){return e(e.s=6529)}),_N_E=e.O()}]);