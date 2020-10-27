(this.webpackJsonppage=this.webpackJsonppage||[]).push([[0],[,,,,function(e,t,n){},,,function(e,t,n){},,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(1),s=n.n(a),i=n(9),r=n.n(i),o=(n(15),n(5));n(16),n(4);var l=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"Headline",children:[Object(c.jsx)("div",{className:"title",children:"react-on-show"}),Object(c.jsx)("div",{className:"subtitle",children:"A Robust React Event Handler When Element is Shown"})]})})};n(7);var j=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"Home",children:"React is deprived of an event handler that triggers when target element is shown in the viewport. Thus we have created an npm library that provides both component and function for this purpose. You can install it via"})})};var d=function(){return Object(c.jsx)("div",{children:"Docs"})},u=n(3);n(17);function b(e){var t=Object(a.useCallback)((function(){var t=document.createElement("input");document.body.appendChild(t),t.value=e.text,t.select(),document.execCommand("copy"),t.remove()}),[e.text]);return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{style:Object(u.a)({},e.style),onClick:t,className:"TextArea anim",children:e.text})})}b.defaultProps={styles:{}};var h=b;function m(e){return Object(c.jsx)("a",{style:Object(u.a)(Object(u.a)({},e.style),{},{display:"inline-block",marginTop:e.margins[0],marginRight:e.margins[1],marginBottom:e.margins[2],marginLeft:e.margins[3]}),href:e.link,target:"_blank",rel:"noopener noreferrer",children:e.content})}m.defaultProps={margins:[0,0,0,0],object:{textDecoration:"none"}};var f=m;var x=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"quickStart",children:[Object(c.jsx)("div",{className:"title header",children:"How to Start?"}),Object(c.jsx)("div",{className:"subtitle header",children:"Installation"}),Object(c.jsxs)("div",{className:"content-text",children:["react-on-show is a library for enabling on-show event in React. You can install the library via"," ",Object(c.jsx)(f,{style:{color:"#0496ff"},content:"NPM",link:"https://www.npmjs.com/"}),", a package manager for Node like below:"]}),Object(c.jsx)("div",{className:"vertical"}),Object(c.jsx)(h,{style:{padding:10},text:"npm i @solariss/react-on-show"}),Object(c.jsx)("div",{className:"subtitle header",children:"Basics"}),Object(c.jsxs)("div",{className:"content-text",children:["You can use both function and component approach to inject this library. For functional approach you have to use"," ",Object(c.jsx)(h,{text:"onShow"})]})]})})},O=n(21);var g=function(e){var t=Object(a.useCallback)((function(){return e.currentPage.type.name}),[e.currentPage]),n=function(n,c){t()!==c&&e.setCurrentPage(n)},s=[{content:"Home",handler:function(){n(Object(c.jsx)(j,{}),"Home")}},{content:Object(c.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(c.jsx)(O.a,{}),"\xa0Quick Start"]}),handler:function(){n(Object(c.jsx)(x,{}),"Quick Start")}},{content:"Docs",handler:function(){n(Object(c.jsx)(d,{}),"Docs")}}];return Object(c.jsx)("div",{className:"NavigationBar",children:s.map((function(e,t){return Object(c.jsx)("div",{className:"link anim",onClick:e.handler,children:e.content},t)}))})},v=n(22);var p=function(){var e=Object(a.useState)("#0496ff"),t=Object(o.a)(e,2),n=t[0],s=t[1],i=Object(a.useRef)();return Object(c.jsx)("div",{className:"NpmBar",children:Object(c.jsx)("div",{onClick:function(){window.open("https://www.npmjs.com/org/solaristudio","_blank")},ref:i,onMouseEnter:function(){i.current.style.backgroundColor="#0496ff",s("#fff")},onMouseLeave:function(){i.current.style.backgroundColor="white",s("#0496ff")},className:"iconWrapper anim",children:Object(c.jsx)(v.a,{color:n,size:32})})})},y=n(23);var w=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"Footer",children:Object(c.jsxs)("div",{style:{textAlign:"left"},children:[Object(c.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8},children:["Powered By",Object(c.jsx)(f,{margins:[0,0,0,8],style:{backgroundColor:"white",padding:4,borderRadius:2},link:"https://github.com/solaristudio",content:Object(c.jsx)("img",{className:"org",width:18,src:"planet_blue_icon.png",alt:"Planet"})})]}),Object(c.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:["Made with"," ",Object(c.jsx)(y.a,{style:{marginLeft:4,marginRight:4},size:18,fill:"#fff"}),"on \xa0",Object(c.jsx)("div",{style:{fontWeight:"bold"},children:"{ React }"})]})]})})})};var N=function(){var e=Object(a.useState)(Object(c.jsx)(j,{})),t=Object(o.a)(e,2),n=t[0],s=t[1];return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"App",children:[Object(c.jsxs)("div",{className:"Body",children:[Object(c.jsx)(l,{}),Object(c.jsx)(p,{}),Object(c.jsx)(g,{setCurrentPage:s,currentPage:n}),n]}),Object(c.jsx)(w,{})]})})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),s(e),i(e)}))};r.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(N,{})}),document.getElementById("root")),k()}],[[20,1,2]]]);
//# sourceMappingURL=main.4f345bd1.chunk.js.map