!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=10)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("d3-scale")},function(e,t){e.exports=require("d3-array")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("d3-selection")},function(e,t){e.exports=require("d3-axis")},function(e,t,r){"use strict";r.r(t);var a=r(2),n=r.n(a),l=r(0),o=r.n(l),i=r(5),s=r(6),c=r.n(s),u=r(7),d=r.n(u),p=r(1),m=r.n(p),h=r(8),y=r(9),b=r(3),x=r(4);function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}var g=e=>o.a.createElement("rect",f({},e,{stroke:"rgba(40, 20, 20, 0.15)",strokeWidth:1}));function v({x:e,y:t,color:r,label:a}){return o.a.createElement("g",{className:"ledgend-key"},o.a.createElement(g,{x:e,y:t,width:20,height:20,fill:r}),o.a.createElement("text",{x:e,y:t,dx:10,dy:35,textAnchor:"middle"},a))}v.propTypes={x:m.a.number.isRequired,y:m.a.number.isRequired,color:m.a.string.isRequired,label:m.a.string.isRequired};var E=v;var S=()=>o.a.createElement("figcaption",{style:{textAlign:"center"}},o.a.createElement("h1",null,o.a.createElement("div",null,"Monthly Global Land-Surface Temperature"),o.a.createElement("div",null,"Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.")),o.a.createElement("p",null,"Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average."),o.a.createElement("p",null,"Estimated Jan 1951-Dec 1980 absolute temperature ℃: 8.66 +/- 0.07"));function T(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const N=620/12,w="http://www.w3.org/2000/svg";class O extends o.a.Component{constructor(...e){super(...e),T(this,"state",{data:{xScale:null,colorScale:null,tempatures:[]},error:!1}),T(this,"legend",()=>{const{data:{colorScale:e}}=this.state;return e?o.a.createElement("g",{transform:"translate(900,670)"},o.a.createElement("text",{x:0,y:15},"Ledgend"),o.a.createElement(E,{x:60,y:0,color:e(0),label:"0"}),o.a.createElement(E,{x:80,y:0,color:e(3),label:"3"}),o.a.createElement(E,{x:100,y:0,color:e(4),label:"4"}),o.a.createElement(E,{x:120,y:0,color:e(6),label:"6"}),o.a.createElement(E,{x:140,y:0,color:e(7),label:"7"}),o.a.createElement(E,{x:160,y:0,color:e(8),label:"8"}),o.a.createElement(E,{x:180,y:0,color:e(9),label:"9"}),o.a.createElement(E,{x:200,y:0,color:e(10),label:"10"}),o.a.createElement(E,{x:220,y:0,color:e(11),label:"11"}),o.a.createElement(E,{x:240,y:0,color:e(12),label:"12"}),o.a.createElement(E,{x:260,y:0,color:e(13),label:"13"})):null})}static get propTypes(){return{data:m.a.shape({monthlyVariance:m.a.array,baseTemperature:m.a.number}).isRequired}}componentWillMount(){const{data:{monthlyVariance:e,baseTemperature:t}}=this.props,r=e.map(e=>({...e,temp:t+ +e.variance})),a={tempatures:r,xScale:Object(b.scaleTime)().domain(Object(x.extent)(r,e=>(new Date).setFullYear(e.year))).range([80,1200]),colorScale:Object(b.scaleQuantile)().domain(Object(x.extent)(r,e=>e.temp)).range(["hsl(200, 100%, 30%)","hsl(200, 90%, 40%)","hsl(200, 80%, 50%)","hsl(200, 70%, 60%)","hsl(200, 60%, 70%)","hsl(200, 50%, 80%)","hsl(0, 60%, 70%)","hsl(0, 70%, 60%)","hsl(0, 80%, 50%)","hsl(0, 90%, 40%)","hsl(0, 100%, 30%)"])};this.setState({data:a})}getCursorPos({x:e,y:t}){const r=this.svg.createSVGPoint();return r.x=e,r.y=t,r.matrixTransform(this.svg.getScreenCTM().inverse())}addTextNode({x:e,y:t},r){const a=document.createElementNS(w,"text"),n=document.createTextNode(r);return a.setAttributeNS(null,"x",e+10),a.setAttributeNS(null,"y",t+20),a.setAttributeNS(null,"fill","white"),a.appendChild(n),a}addRectNode({x:e,y:t,width:r,height:a}){const n=document.createElementNS(w,"rect");return n.setAttributeNS(null,"x",e),n.setAttributeNS(null,"rx",10),n.setAttributeNS(null,"y",t),n.setAttributeNS(null,"ry",10),n.setAttributeNS(null,"width",r),n.setAttributeNS(null,"height",a),n.setAttributeNS(null,"fill","rgba(20, 20, 20, 0.8)"),n}showTooltip({clientX:e,clientY:t,target:r}){const a=r.getAttribute("data-year"),n=r.getAttribute("data-variance"),l=`${parseFloat(r.getAttribute("data-temp")).toFixed(2)} C`;if(a){this.tooltip=document.createElementNS(w,"g");const r=this.getCursorPos({x:e,y:t}),o={x:r.x-55,y:r.y+15};this.tooltip.appendChild(this.addRectNode({...o,width:110,height:75})),this.tooltip.appendChild(this.addTextNode(o,`Year: ${a}`)),this.tooltip.appendChild(this.addTextNode({...o,y:o.y+20},`Variance ${n}`)),this.tooltip.appendChild(this.addTextNode({...o,y:o.y+40},`Temp: ${l}`)),this.svg.appendChild(this.tooltip)}}hideTooltip(){this.tooltip&&(this.svg.removeChild(this.tooltip),this.tooltip=null)}componentDidMount(){const{data:{xScale:e}}=this.state;if(e){const t=Object(y.axisBottom)(e);Object(h.select)(this.xAxis).call(t)}}renderMonths(){return["January","Febuary","March","April","May","June","July","August","September","October","November","December"].map((e,t)=>o.a.createElement("text",{key:e,x:10,y:20+N*t,dy:N/2},e))}render(){const{data:e,error:t}=this.state;return o.a.createElement("figure",{className:"chart"},t&&o.a.createElement("div",{className:"error"},"There was a problem loading the data"),o.a.createElement(S,null),o.a.createElement("svg",{width:1280,height:720,viewBox:"0,0,1280,720",ref:e=>{this.svg=e},style:{display:"block",margin:"auto"}},o.a.createElement("g",null,function(e,t,r){const{xScale:a,colorScale:n,tempatures:l}=e;return l.map(e=>o.a.createElement(g,{key:JSON.stringify(e),x:a((new Date).setFullYear(e.year)),y:20+N*(e.month-1),"data-temp":e.temp,"data-variance":e.variance,"data-year":e.year,onMouseOver:e=>t(e),onFocus:e=>t(e),onMouseOut:()=>r(),onBlur:()=>r(),fill:n(e.temp),width:5,height:N}))}(e,e=>this.showTooltip(e),e=>this.hideTooltip(e))),o.a.createElement("g",null,this.legend()),o.a.createElement("g",{className:"axis",ref:e=>{this.xAxis=e},transform:"translate(0,640)"}),o.a.createElement("g",null,this.renderMonths())))}}function j({data:e}){return o.a.createElement("div",null,o.a.createElement(O,{data:e}))}j.propTypes={data:m.a.object.isRequired};var A=j;const C=n()();C.use(d()()),C.use(n.a.static("build/client")),C.use((e,t,r)=>{c.a.get("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json").then(t=>{e.data=t.data,r()}).catch(e=>r(e))}),C.get("/robots.txt",(e,t)=>{t.send("")}),C.get("*",(e,t)=>{t.send(((e,t)=>`\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n\t<meta name="description" content="Monthly Global Land-Surface Temperature">\n\n  <title>Heat Map</title>\n\n  <link rel="stylesheet" href="styles/bundle.css" type="text/css">\n  <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css">\n</head>\n\n<body>\n  <div id="app">${e}</div>\n  <script>\n    var INIT_STATE = ${JSON.stringify(t)}\n  <\/script>\n  <script src="js/bundle.js"><\/script>\n</body>\n</html>\n`)(Object(i.renderToString)(o.a.createElement(A,{data:e.data})),e.data))});t.default=C}]));