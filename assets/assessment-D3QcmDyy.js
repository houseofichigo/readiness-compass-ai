import{r as p,b as Ti}from"./vendor-DXsvu-ZH.js";import{j as u,S as Mr,P as K,c as mn,u as ue,a as On,b as E,d as Be,e as Rr,f as Er,T as Pr,I as ji,g as Tr,h as jr,i as Oi,C as Or,V as Li,L as Lr,k as Dr,l as Di,m as Fi,n as Fr,R as Gi,o as Bi,p as Gr,q as yt,r as wt,s as tt,t as Br,A as qi,v as zi,w as Hi,F as Ui,D as $i,x as Ki,y as Vi,z as qr,B as Wi,E as Qi,G as Yi,H as Ji,J as Xi,K as Zi,M as es}from"./ui-ukYoQeXI.js";const ns=1,ts=1e6;let Vn=0;function rs(){return Vn=(Vn+1)%Number.MAX_SAFE_INTEGER,Vn.toString()}const Wn=new Map,Qt=e=>{if(Wn.has(e))return;const n=setTimeout(()=>{Wn.delete(e),Qe({type:"REMOVE_TOAST",toastId:e})},ts);Wn.set(e,n)},as=(e,n)=>{switch(n.type){case"ADD_TOAST":return{...e,toasts:[n.toast,...e.toasts].slice(0,ns)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(t=>t.id===n.toast.id?{...t,...n.toast}:t)};case"DISMISS_TOAST":{const{toastId:t}=n;return t?Qt(t):e.toasts.forEach(r=>{Qt(r.id)}),{...e,toasts:e.toasts.map(r=>r.id===t||t===void 0?{...r,open:!1}:r)}}case"REMOVE_TOAST":return n.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(t=>t.id!==n.toastId)}}},hn=[];let bn={toasts:[]};function Qe(e){bn=as(bn,e),hn.forEach(n=>{n(bn)})}function os({...e}){const n=rs(),t=a=>Qe({type:"UPDATE_TOAST",toast:{...a,id:n}}),r=()=>Qe({type:"DISMISS_TOAST",toastId:n});return Qe({type:"ADD_TOAST",toast:{...e,id:n,open:!0,onOpenChange:a=>{a||r()}}}),{id:n,dismiss:r,update:t}}function is(){const[e,n]=p.useState(bn);return p.useEffect(()=>(hn.push(n),()=>{const t=hn.indexOf(n);t>-1&&hn.splice(t,1)}),[e]),{...e,toast:os,dismiss:t=>Qe({type:"DISMISS_TOAST",toastId:t})}}function zr(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(n=0;n<a;n++)e[n]&&(t=zr(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Hr(){for(var e,n,t=0,r="",a=arguments.length;t<a;t++)(e=arguments[t])&&(n=zr(e))&&(r&&(r+=" "),r+=n);return r}const Yt=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,Jt=Hr,Ln=(e,n)=>t=>{var r;if((n==null?void 0:n.variants)==null)return Jt(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:a,defaultVariants:o}=n,i=Object.keys(a).map(c=>{const m=t==null?void 0:t[c],d=o==null?void 0:o[c];if(m===null)return null;const f=Yt(m)||Yt(d);return a[c][f]}),s=t&&Object.entries(t).reduce((c,m)=>{let[d,f]=m;return f===void 0||(c[d]=f),c},{}),l=n==null||(r=n.compoundVariants)===null||r===void 0?void 0:r.reduce((c,m)=>{let{class:d,className:f,...h}=m;return Object.entries(h).every(v=>{let[b,g]=v;return Array.isArray(g)?g.includes({...o,...s}[b]):{...o,...s}[b]===g})?[...c,d,f]:c},[]);return Jt(e,i,l,t==null?void 0:t.class,t==null?void 0:t.className)};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ss=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ur=(...e)=>e.filter((n,t,r)=>!!n&&n.trim()!==""&&r.indexOf(n)===t).join(" ").trim();/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ls={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=p.forwardRef(({color:e="currentColor",size:n=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:a="",children:o,iconNode:i,...s},l)=>p.createElement("svg",{ref:l,...ls,width:n,height:n,stroke:e,strokeWidth:r?Number(t)*24/Number(n):t,className:Ur("lucide",a),...s},[...i.map(([c,m])=>p.createElement(c,m)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,n)=>{const t=p.forwardRef(({className:r,...a},o)=>p.createElement(us,{ref:o,iconNode:n,className:Ur(`lucide-${ss(e)}`,r),...a}));return t.displayName=`${e}`,t};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wf=k("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=k("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ds=k("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=k("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _f=k("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=k("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=k("Calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=k("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=k("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=k("ChartPie",[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=k("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=k("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $r=k("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ps=k("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=k("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ms=k("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=k("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kr=k("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vs=k("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rf=k("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=k("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=k("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=k("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=k("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gs=k("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Of=k("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lf=k("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=k("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hs=k("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=k("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=k("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bf=k("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qf=k("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=k("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=k("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bs=k("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uf=k("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $f=k("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kf=k("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vf=k("TrendingDown",[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7",key:"1r2t7k"}],["polyline",{points:"16 17 22 17 22 11",key:"11uiuu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wf=k("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qf=k("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yf=k("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jf=k("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xf=k("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Ct="-",xs=e=>{const n=ws(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:i=>{const s=i.split(Ct);return s[0]===""&&s.length!==1&&s.shift(),Vr(s,n)||ys(i)},getConflictingClassGroupIds:(i,s)=>{const l=t[i]||[];return s&&r[i]?[...l,...r[i]]:l}}},Vr=(e,n)=>{var i;if(e.length===0)return n.classGroupId;const t=e[0],r=n.nextPart.get(t),a=r?Vr(e.slice(1),r):void 0;if(a)return a;if(n.validators.length===0)return;const o=e.join(Ct);return(i=n.validators.find(({validator:s})=>s(o)))==null?void 0:i.classGroupId},Xt=/^\[(.+)\]$/,ys=e=>{if(Xt.test(e)){const n=Xt.exec(e)[1],t=n==null?void 0:n.substring(0,n.indexOf(":"));if(t)return"arbitrary.."+t}},ws=e=>{const{theme:n,prefix:t}=e,r={nextPart:new Map,validators:[]};return _s(Object.entries(e.classGroups),t).forEach(([o,i])=>{rt(i,r,o,n)}),r},rt=(e,n,t,r)=>{e.forEach(a=>{if(typeof a=="string"){const o=a===""?n:Zt(n,a);o.classGroupId=t;return}if(typeof a=="function"){if(As(a)){rt(a(r),n,t,r);return}n.validators.push({validator:a,classGroupId:t});return}Object.entries(a).forEach(([o,i])=>{rt(i,Zt(n,o),t,r)})})},Zt=(e,n)=>{let t=e;return n.split(Ct).forEach(r=>{t.nextPart.has(r)||t.nextPart.set(r,{nextPart:new Map,validators:[]}),t=t.nextPart.get(r)}),t},As=e=>e.isThemeGetter,_s=(e,n)=>n?e.map(([t,r])=>{const a=r.map(o=>typeof o=="string"?n+o:typeof o=="object"?Object.fromEntries(Object.entries(o).map(([i,s])=>[n+i,s])):o);return[t,a]}):e,Cs=e=>{if(e<1)return{get:()=>{},set:()=>{}};let n=0,t=new Map,r=new Map;const a=(o,i)=>{t.set(o,i),n++,n>e&&(n=0,r=t,t=new Map)};return{get(o){let i=t.get(o);if(i!==void 0)return i;if((i=r.get(o))!==void 0)return a(o,i),i},set(o,i){t.has(o)?t.set(o,i):a(o,i)}}},Wr="!",Is=e=>{const{separator:n,experimentalParseClassName:t}=e,r=n.length===1,a=n[0],o=n.length,i=s=>{const l=[];let c=0,m=0,d;for(let g=0;g<s.length;g++){let y=s[g];if(c===0){if(y===a&&(r||s.slice(g,g+o)===n)){l.push(s.slice(m,g)),m=g+o;continue}if(y==="/"){d=g;continue}}y==="["?c++:y==="]"&&c--}const f=l.length===0?s:s.substring(m),h=f.startsWith(Wr),v=h?f.substring(1):f,b=d&&d>m?d-m:void 0;return{modifiers:l,hasImportantModifier:h,baseClassName:v,maybePostfixModifierPosition:b}};return t?s=>t({className:s,parseClassName:i}):i},Ss=e=>{if(e.length<=1)return e;const n=[];let t=[];return e.forEach(r=>{r[0]==="["?(n.push(...t.sort(),r),t=[]):t.push(r)}),n.push(...t.sort()),n},ks=e=>({cache:Cs(e.cacheSize),parseClassName:Is(e),...xs(e)}),Ns=/\s+/,Ms=(e,n)=>{const{parseClassName:t,getClassGroupId:r,getConflictingClassGroupIds:a}=n,o=[],i=e.trim().split(Ns);let s="";for(let l=i.length-1;l>=0;l-=1){const c=i[l],{modifiers:m,hasImportantModifier:d,baseClassName:f,maybePostfixModifierPosition:h}=t(c);let v=!!h,b=r(v?f.substring(0,h):f);if(!b){if(!v){s=c+(s.length>0?" "+s:s);continue}if(b=r(f),!b){s=c+(s.length>0?" "+s:s);continue}v=!1}const g=Ss(m).join(":"),y=d?g+Wr:g,x=y+b;if(o.includes(x))continue;o.push(x);const _=a(b,v);for(let A=0;A<_.length;++A){const w=_[A];o.push(y+w)}s=c+(s.length>0?" "+s:s)}return s};function Rs(){let e=0,n,t,r="";for(;e<arguments.length;)(n=arguments[e++])&&(t=Qr(n))&&(r&&(r+=" "),r+=t);return r}const Qr=e=>{if(typeof e=="string")return e;let n,t="";for(let r=0;r<e.length;r++)e[r]&&(n=Qr(e[r]))&&(t&&(t+=" "),t+=n);return t};function Es(e,...n){let t,r,a,o=i;function i(l){const c=n.reduce((m,d)=>d(m),e());return t=ks(c),r=t.cache.get,a=t.cache.set,o=s,s(l)}function s(l){const c=r(l);if(c)return c;const m=Ms(l,t);return a(l,m),m}return function(){return o(Rs.apply(null,arguments))}}const G=e=>{const n=t=>t[e]||[];return n.isThemeGetter=!0,n},Yr=/^\[(?:([a-z-]+):)?(.+)\]$/i,Ps=/^\d+\/\d+$/,Ts=new Set(["px","full","screen"]),js=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Os=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ls=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Ds=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Fs=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,ie=e=>Le(e)||Ts.has(e)||Ps.test(e),me=e=>qe(e,"length",Ks),Le=e=>!!e&&!Number.isNaN(Number(e)),Qn=e=>qe(e,"number",Le),$e=e=>!!e&&Number.isInteger(Number(e)),Gs=e=>e.endsWith("%")&&Le(e.slice(0,-1)),N=e=>Yr.test(e),fe=e=>js.test(e),Bs=new Set(["length","size","percentage"]),qs=e=>qe(e,Bs,Jr),zs=e=>qe(e,"position",Jr),Hs=new Set(["image","url"]),Us=e=>qe(e,Hs,Ws),$s=e=>qe(e,"",Vs),Ke=()=>!0,qe=(e,n,t)=>{const r=Yr.exec(e);return r?r[1]?typeof n=="string"?r[1]===n:n.has(r[1]):t(r[2]):!1},Ks=e=>Os.test(e)&&!Ls.test(e),Jr=()=>!1,Vs=e=>Ds.test(e),Ws=e=>Fs.test(e),Qs=()=>{const e=G("colors"),n=G("spacing"),t=G("blur"),r=G("brightness"),a=G("borderColor"),o=G("borderRadius"),i=G("borderSpacing"),s=G("borderWidth"),l=G("contrast"),c=G("grayscale"),m=G("hueRotate"),d=G("invert"),f=G("gap"),h=G("gradientColorStops"),v=G("gradientColorStopPositions"),b=G("inset"),g=G("margin"),y=G("opacity"),x=G("padding"),_=G("saturate"),A=G("scale"),w=G("sepia"),R=G("skew"),j=G("space"),M=G("translate"),F=()=>["auto","contain","none"],O=()=>["auto","hidden","clip","visible","scroll"],B=()=>["auto",N,n],T=()=>[N,n],re=()=>["",ie,me],ee=()=>["auto",Le,N],pe=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],U=()=>["solid","dashed","dotted","double","none"],we=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],S=()=>["start","end","center","between","around","evenly","stretch"],C=()=>["","0",N],L=()=>["auto","avoid","all","avoid-page","page","left","right","column"],D=()=>[Le,N];return{cacheSize:500,separator:":",theme:{colors:[Ke],spacing:[ie,me],blur:["none","",fe,N],brightness:D(),borderColor:[e],borderRadius:["none","","full",fe,N],borderSpacing:T(),borderWidth:re(),contrast:D(),grayscale:C(),hueRotate:D(),invert:C(),gap:T(),gradientColorStops:[e],gradientColorStopPositions:[Gs,me],inset:B(),margin:B(),opacity:D(),padding:T(),saturate:D(),scale:D(),sepia:C(),skew:D(),space:T(),translate:T()},classGroups:{aspect:[{aspect:["auto","square","video",N]}],container:["container"],columns:[{columns:[fe]}],"break-after":[{"break-after":L()}],"break-before":[{"break-before":L()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...pe(),N]}],overflow:[{overflow:O()}],"overflow-x":[{"overflow-x":O()}],"overflow-y":[{"overflow-y":O()}],overscroll:[{overscroll:F()}],"overscroll-x":[{"overscroll-x":F()}],"overscroll-y":[{"overscroll-y":F()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[b]}],"inset-x":[{"inset-x":[b]}],"inset-y":[{"inset-y":[b]}],start:[{start:[b]}],end:[{end:[b]}],top:[{top:[b]}],right:[{right:[b]}],bottom:[{bottom:[b]}],left:[{left:[b]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",$e,N]}],basis:[{basis:B()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",N]}],grow:[{grow:C()}],shrink:[{shrink:C()}],order:[{order:["first","last","none",$e,N]}],"grid-cols":[{"grid-cols":[Ke]}],"col-start-end":[{col:["auto",{span:["full",$e,N]},N]}],"col-start":[{"col-start":ee()}],"col-end":[{"col-end":ee()}],"grid-rows":[{"grid-rows":[Ke]}],"row-start-end":[{row:["auto",{span:[$e,N]},N]}],"row-start":[{"row-start":ee()}],"row-end":[{"row-end":ee()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",N]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",N]}],gap:[{gap:[f]}],"gap-x":[{"gap-x":[f]}],"gap-y":[{"gap-y":[f]}],"justify-content":[{justify:["normal",...S()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...S(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...S(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[x]}],px:[{px:[x]}],py:[{py:[x]}],ps:[{ps:[x]}],pe:[{pe:[x]}],pt:[{pt:[x]}],pr:[{pr:[x]}],pb:[{pb:[x]}],pl:[{pl:[x]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[j]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[j]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",N,n]}],"min-w":[{"min-w":[N,n,"min","max","fit"]}],"max-w":[{"max-w":[N,n,"none","full","min","max","fit","prose",{screen:[fe]},fe]}],h:[{h:[N,n,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[N,n,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[N,n,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[N,n,"auto","min","max","fit"]}],"font-size":[{text:["base",fe,me]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Qn]}],"font-family":[{font:[Ke]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",N]}],"line-clamp":[{"line-clamp":["none",Le,Qn]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",ie,N]}],"list-image":[{"list-image":["none",N]}],"list-style-type":[{list:["none","disc","decimal",N]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[y]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[y]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...U(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",ie,me]}],"underline-offset":[{"underline-offset":["auto",ie,N]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:T()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",N]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",N]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[y]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...pe(),zs]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",qs]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Us]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[v]}],"gradient-via-pos":[{via:[v]}],"gradient-to-pos":[{to:[v]}],"gradient-from":[{from:[h]}],"gradient-via":[{via:[h]}],"gradient-to":[{to:[h]}],rounded:[{rounded:[o]}],"rounded-s":[{"rounded-s":[o]}],"rounded-e":[{"rounded-e":[o]}],"rounded-t":[{"rounded-t":[o]}],"rounded-r":[{"rounded-r":[o]}],"rounded-b":[{"rounded-b":[o]}],"rounded-l":[{"rounded-l":[o]}],"rounded-ss":[{"rounded-ss":[o]}],"rounded-se":[{"rounded-se":[o]}],"rounded-ee":[{"rounded-ee":[o]}],"rounded-es":[{"rounded-es":[o]}],"rounded-tl":[{"rounded-tl":[o]}],"rounded-tr":[{"rounded-tr":[o]}],"rounded-br":[{"rounded-br":[o]}],"rounded-bl":[{"rounded-bl":[o]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[y]}],"border-style":[{border:[...U(),"hidden"]}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[y]}],"divide-style":[{divide:U()}],"border-color":[{border:[a]}],"border-color-x":[{"border-x":[a]}],"border-color-y":[{"border-y":[a]}],"border-color-s":[{"border-s":[a]}],"border-color-e":[{"border-e":[a]}],"border-color-t":[{"border-t":[a]}],"border-color-r":[{"border-r":[a]}],"border-color-b":[{"border-b":[a]}],"border-color-l":[{"border-l":[a]}],"divide-color":[{divide:[a]}],"outline-style":[{outline:["",...U()]}],"outline-offset":[{"outline-offset":[ie,N]}],"outline-w":[{outline:[ie,me]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:re()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[y]}],"ring-offset-w":[{"ring-offset":[ie,me]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",fe,$s]}],"shadow-color":[{shadow:[Ke]}],opacity:[{opacity:[y]}],"mix-blend":[{"mix-blend":[...we(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":we()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[r]}],contrast:[{contrast:[l]}],"drop-shadow":[{"drop-shadow":["","none",fe,N]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[m]}],invert:[{invert:[d]}],saturate:[{saturate:[_]}],sepia:[{sepia:[w]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[r]}],"backdrop-contrast":[{"backdrop-contrast":[l]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[m]}],"backdrop-invert":[{"backdrop-invert":[d]}],"backdrop-opacity":[{"backdrop-opacity":[y]}],"backdrop-saturate":[{"backdrop-saturate":[_]}],"backdrop-sepia":[{"backdrop-sepia":[w]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[i]}],"border-spacing-x":[{"border-spacing-x":[i]}],"border-spacing-y":[{"border-spacing-y":[i]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",N]}],duration:[{duration:D()}],ease:[{ease:["linear","in","out","in-out",N]}],delay:[{delay:D()}],animate:[{animate:["none","spin","ping","pulse","bounce",N]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[A]}],"scale-x":[{"scale-x":[A]}],"scale-y":[{"scale-y":[A]}],rotate:[{rotate:[$e,N]}],"translate-x":[{"translate-x":[M]}],"translate-y":[{"translate-y":[M]}],"skew-x":[{"skew-x":[R]}],"skew-y":[{"skew-y":[R]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",N]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",N]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":T()}],"scroll-mx":[{"scroll-mx":T()}],"scroll-my":[{"scroll-my":T()}],"scroll-ms":[{"scroll-ms":T()}],"scroll-me":[{"scroll-me":T()}],"scroll-mt":[{"scroll-mt":T()}],"scroll-mr":[{"scroll-mr":T()}],"scroll-mb":[{"scroll-mb":T()}],"scroll-ml":[{"scroll-ml":T()}],"scroll-p":[{"scroll-p":T()}],"scroll-px":[{"scroll-px":T()}],"scroll-py":[{"scroll-py":T()}],"scroll-ps":[{"scroll-ps":T()}],"scroll-pe":[{"scroll-pe":T()}],"scroll-pt":[{"scroll-pt":T()}],"scroll-pr":[{"scroll-pr":T()}],"scroll-pb":[{"scroll-pb":T()}],"scroll-pl":[{"scroll-pl":T()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",N]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[ie,me,Qn]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Ys=Es(Qs);function P(...e){return Ys(Hr(e))}/**
 * @remix-run/router v1.20.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ze(){return Ze=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},Ze.apply(this,arguments)}var ve;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(ve||(ve={}));const er="popstate";function Js(e){e===void 0&&(e={});function n(r,a){let{pathname:o,search:i,hash:s}=r.location;return at("",{pathname:o,search:i,hash:s},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function t(r,a){return typeof a=="string"?a:wn(a)}return Zs(n,t,null,e)}function q(e,n){if(e===!1||e===null||typeof e>"u")throw new Error(n)}function Xr(e,n){if(!e)try{throw new Error(n)}catch{}}function Xs(){return Math.random().toString(36).substr(2,8)}function nr(e,n){return{usr:e.state,key:e.key,idx:n}}function at(e,n,t,r){return t===void 0&&(t=null),Ze({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof n=="string"?ze(n):n,{state:t,key:n&&n.key||r||Xs()})}function wn(e){let{pathname:n="/",search:t="",hash:r=""}=e;return t&&t!=="?"&&(n+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(n+=r.charAt(0)==="#"?r:"#"+r),n}function ze(e){let n={};if(e){let t=e.indexOf("#");t>=0&&(n.hash=e.substr(t),e=e.substr(0,t));let r=e.indexOf("?");r>=0&&(n.search=e.substr(r),e=e.substr(0,r)),e&&(n.pathname=e)}return n}function Zs(e,n,t,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:o=!1}=r,i=a.history,s=ve.Pop,l=null,c=m();c==null&&(c=0,i.replaceState(Ze({},i.state,{idx:c}),""));function m(){return(i.state||{idx:null}).idx}function d(){s=ve.Pop;let g=m(),y=g==null?null:g-c;c=g,l&&l({action:s,location:b.location,delta:y})}function f(g,y){s=ve.Push;let x=at(b.location,g,y);c=m()+1;let _=nr(x,c),A=b.createHref(x);try{i.pushState(_,"",A)}catch(w){if(w instanceof DOMException&&w.name==="DataCloneError")throw w;a.location.assign(A)}o&&l&&l({action:s,location:b.location,delta:1})}function h(g,y){s=ve.Replace;let x=at(b.location,g,y);c=m();let _=nr(x,c),A=b.createHref(x);i.replaceState(_,"",A),o&&l&&l({action:s,location:b.location,delta:0})}function v(g){let y=a.location.origin!=="null"?a.location.origin:a.location.href,x=typeof g=="string"?g:wn(g);return x=x.replace(/ $/,"%20"),q(y,"No window.location.(origin|href) available to create URL for href: "+x),new URL(x,y)}let b={get action(){return s},get location(){return e(a,i)},listen(g){if(l)throw new Error("A history only accepts one active listener");return a.addEventListener(er,d),l=g,()=>{a.removeEventListener(er,d),l=null}},createHref(g){return n(a,g)},createURL:v,encodeLocation(g){let y=v(g);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:f,replace:h,go(g){return i.go(g)}};return b}var tr;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(tr||(tr={}));function el(e,n,t){return t===void 0&&(t="/"),nl(e,n,t,!1)}function nl(e,n,t,r){let a=typeof n=="string"?ze(n):n,o=Fe(a.pathname||"/",t);if(o==null)return null;let i=Zr(e);tl(i);let s=null;for(let l=0;s==null&&l<i.length;++l){let c=ml(o);s=dl(i[l],c,r)}return s}function Zr(e,n,t,r){n===void 0&&(n=[]),t===void 0&&(t=[]),r===void 0&&(r="");let a=(o,i,s)=>{let l={relativePath:s===void 0?o.path||"":s,caseSensitive:o.caseSensitive===!0,childrenIndex:i,route:o};l.relativePath.startsWith("/")&&(q(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let c=ge([r,l.relativePath]),m=t.concat(l);o.children&&o.children.length>0&&(q(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Zr(o.children,n,m,c)),!(o.path==null&&!o.index)&&n.push({path:c,score:ul(c,o.index),routesMeta:m})};return e.forEach((o,i)=>{var s;if(o.path===""||!((s=o.path)!=null&&s.includes("?")))a(o,i);else for(let l of ea(o.path))a(o,i,l)}),n}function ea(e){let n=e.split("/");if(n.length===0)return[];let[t,...r]=n,a=t.endsWith("?"),o=t.replace(/\?$/,"");if(r.length===0)return a?[o,""]:[o];let i=ea(r.join("/")),s=[];return s.push(...i.map(l=>l===""?o:[o,l].join("/"))),a&&s.push(...i),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function tl(e){e.sort((n,t)=>n.score!==t.score?t.score-n.score:cl(n.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}const rl=/^:[\w-]+$/,al=3,ol=2,il=1,sl=10,ll=-2,rr=e=>e==="*";function ul(e,n){let t=e.split("/"),r=t.length;return t.some(rr)&&(r+=ll),n&&(r+=ol),t.filter(a=>!rr(a)).reduce((a,o)=>a+(rl.test(o)?al:o===""?il:sl),r)}function cl(e,n){return e.length===n.length&&e.slice(0,-1).every((r,a)=>r===n[a])?e[e.length-1]-n[n.length-1]:0}function dl(e,n,t){let{routesMeta:r}=e,a={},o="/",i=[];for(let s=0;s<r.length;++s){let l=r[s],c=s===r.length-1,m=o==="/"?n:n.slice(o.length)||"/",d=An({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},m),f=l.route;if(!d&&c&&t&&!r[r.length-1].route.index&&(d=An({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},m)),!d)return null;Object.assign(a,d.params),i.push({params:a,pathname:ge([o,d.pathname]),pathnameBase:hl(ge([o,d.pathnameBase])),route:f}),d.pathnameBase!=="/"&&(o=ge([o,d.pathnameBase]))}return i}function An(e,n){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[t,r]=pl(e.path,e.caseSensitive,e.end),a=n.match(t);if(!a)return null;let o=a[0],i=o.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:r.reduce((c,m,d)=>{let{paramName:f,isOptional:h}=m;if(f==="*"){let b=s[d]||"";i=o.slice(0,o.length-b.length).replace(/(.)\/+$/,"$1")}const v=s[d];return h&&!v?c[f]=void 0:c[f]=(v||"").replace(/%2F/g,"/"),c},{}),pathname:o,pathnameBase:i,pattern:e}}function pl(e,n,t){n===void 0&&(n=!1),t===void 0&&(t=!0),Xr(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,l)=>(r.push({paramName:s,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,n?void 0:"i"),r]}function ml(e){try{return e.split("/").map(n=>decodeURIComponent(n).replace(/\//g,"%2F")).join("/")}catch(n){return Xr(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+n+").")),e}}function Fe(e,n){if(n==="/")return e;if(!e.toLowerCase().startsWith(n.toLowerCase()))return null;let t=n.endsWith("/")?n.length-1:n.length,r=e.charAt(t);return r&&r!=="/"?null:e.slice(t)||"/"}function fl(e,n){n===void 0&&(n="/");let{pathname:t,search:r="",hash:a=""}=typeof e=="string"?ze(e):e;return{pathname:t?t.startsWith("/")?t:vl(t,n):n,search:bl(r),hash:xl(a)}}function vl(e,n){let t=n.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?t.length>1&&t.pop():a!=="."&&t.push(a)}),t.length>1?t.join("/"):"/"}function Yn(e,n,t,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+n+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function gl(e){return e.filter((n,t)=>t===0||n.route.path&&n.route.path.length>0)}function It(e,n){let t=gl(e);return n?t.map((r,a)=>a===t.length-1?r.pathname:r.pathnameBase):t.map(r=>r.pathnameBase)}function St(e,n,t,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=ze(e):(a=Ze({},e),q(!a.pathname||!a.pathname.includes("?"),Yn("?","pathname","search",a)),q(!a.pathname||!a.pathname.includes("#"),Yn("#","pathname","hash",a)),q(!a.search||!a.search.includes("#"),Yn("#","search","hash",a)));let o=e===""||a.pathname==="",i=o?"/":a.pathname,s;if(i==null)s=t;else{let d=n.length-1;if(!r&&i.startsWith("..")){let f=i.split("/");for(;f[0]==="..";)f.shift(),d-=1;a.pathname=f.join("/")}s=d>=0?n[d]:"/"}let l=fl(a,s),c=i&&i!=="/"&&i.endsWith("/"),m=(o||i===".")&&t.endsWith("/");return!l.pathname.endsWith("/")&&(c||m)&&(l.pathname+="/"),l}const ge=e=>e.join("/").replace(/\/\/+/g,"/"),hl=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),bl=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,xl=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function yl(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const na=["post","put","patch","delete"];new Set(na);const wl=["get",...na];new Set(wl);/**
 * React Router v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function en(){return en=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},en.apply(this,arguments)}const Dn=p.createContext(null),ta=p.createContext(null),ce=p.createContext(null),Fn=p.createContext(null),de=p.createContext({outlet:null,matches:[],isDataRoute:!1}),ra=p.createContext(null);function Al(e,n){let{relative:t}=n===void 0?{}:n;He()||q(!1);let{basename:r,navigator:a}=p.useContext(ce),{hash:o,pathname:i,search:s}=Bn(e,{relative:t}),l=i;return r!=="/"&&(l=i==="/"?r:ge([r,i])),a.createHref({pathname:l,search:s,hash:o})}function He(){return p.useContext(Fn)!=null}function ke(){return He()||q(!1),p.useContext(Fn).location}function aa(e){p.useContext(ce).static||p.useLayoutEffect(e)}function Gn(){let{isDataRoute:e}=p.useContext(de);return e?Dl():_l()}function _l(){He()||q(!1);let e=p.useContext(Dn),{basename:n,future:t,navigator:r}=p.useContext(ce),{matches:a}=p.useContext(de),{pathname:o}=ke(),i=JSON.stringify(It(a,t.v7_relativeSplatPath)),s=p.useRef(!1);return aa(()=>{s.current=!0}),p.useCallback(function(c,m){if(m===void 0&&(m={}),!s.current)return;if(typeof c=="number"){r.go(c);return}let d=St(c,JSON.parse(i),o,m.relative==="path");e==null&&n!=="/"&&(d.pathname=d.pathname==="/"?n:ge([n,d.pathname])),(m.replace?r.replace:r.push)(d,m.state,m)},[n,r,i,o,e])}const Cl=p.createContext(null);function Il(e){let n=p.useContext(de).outlet;return n&&p.createElement(Cl.Provider,{value:e},n)}function Bn(e,n){let{relative:t}=n===void 0?{}:n,{future:r}=p.useContext(ce),{matches:a}=p.useContext(de),{pathname:o}=ke(),i=JSON.stringify(It(a,r.v7_relativeSplatPath));return p.useMemo(()=>St(e,JSON.parse(i),o,t==="path"),[e,i,o,t])}function Sl(e,n){return kl(e,n)}function kl(e,n,t,r){He()||q(!1);let{navigator:a}=p.useContext(ce),{matches:o}=p.useContext(de),i=o[o.length-1],s=i?i.params:{};i&&i.pathname;let l=i?i.pathnameBase:"/";i&&i.route;let c=ke(),m;if(n){var d;let g=typeof n=="string"?ze(n):n;l==="/"||(d=g.pathname)!=null&&d.startsWith(l)||q(!1),m=g}else m=c;let f=m.pathname||"/",h=f;if(l!=="/"){let g=l.replace(/^\//,"").split("/");h="/"+f.replace(/^\//,"").split("/").slice(g.length).join("/")}let v=el(e,{pathname:h}),b=Pl(v&&v.map(g=>Object.assign({},g,{params:Object.assign({},s,g.params),pathname:ge([l,a.encodeLocation?a.encodeLocation(g.pathname).pathname:g.pathname]),pathnameBase:g.pathnameBase==="/"?l:ge([l,a.encodeLocation?a.encodeLocation(g.pathnameBase).pathname:g.pathnameBase])})),o,t,r);return n&&b?p.createElement(Fn.Provider,{value:{location:en({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:ve.Pop}},b):b}function Nl(){let e=Ll(),n=yl(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),t=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return p.createElement(p.Fragment,null,p.createElement("h2",null,"Unexpected Application Error!"),p.createElement("h3",{style:{fontStyle:"italic"}},n),t?p.createElement("pre",{style:a},t):null,null)}const Ml=p.createElement(Nl,null);class Rl extends p.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,t){return t.location!==n.location||t.revalidation!=="idle"&&n.revalidation==="idle"?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:n.error!==void 0?n.error:t.error,location:t.location,revalidation:n.revalidation||t.revalidation}}componentDidCatch(n,t){}render(){return this.state.error!==void 0?p.createElement(de.Provider,{value:this.props.routeContext},p.createElement(ra.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function El(e){let{routeContext:n,match:t,children:r}=e,a=p.useContext(Dn);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),p.createElement(de.Provider,{value:n},r)}function Pl(e,n,t,r){var a;if(n===void 0&&(n=[]),t===void 0&&(t=null),r===void 0&&(r=null),e==null){var o;if(!t)return null;if(t.errors)e=t.matches;else if((o=r)!=null&&o.v7_partialHydration&&n.length===0&&!t.initialized&&t.matches.length>0)e=t.matches;else return null}let i=e,s=(a=t)==null?void 0:a.errors;if(s!=null){let m=i.findIndex(d=>d.route.id&&(s==null?void 0:s[d.route.id])!==void 0);m>=0||q(!1),i=i.slice(0,Math.min(i.length,m+1))}let l=!1,c=-1;if(t&&r&&r.v7_partialHydration)for(let m=0;m<i.length;m++){let d=i[m];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=m),d.route.id){let{loaderData:f,errors:h}=t,v=d.route.loader&&f[d.route.id]===void 0&&(!h||h[d.route.id]===void 0);if(d.route.lazy||v){l=!0,c>=0?i=i.slice(0,c+1):i=[i[0]];break}}}return i.reduceRight((m,d,f)=>{let h,v=!1,b=null,g=null;t&&(h=s&&d.route.id?s[d.route.id]:void 0,b=d.route.errorElement||Ml,l&&(c<0&&f===0?(v=!0,g=null):c===f&&(v=!0,g=d.route.hydrateFallbackElement||null)));let y=n.concat(i.slice(0,f+1)),x=()=>{let _;return h?_=b:v?_=g:d.route.Component?_=p.createElement(d.route.Component,null):d.route.element?_=d.route.element:_=m,p.createElement(El,{match:d,routeContext:{outlet:m,matches:y,isDataRoute:t!=null},children:_})};return t&&(d.route.ErrorBoundary||d.route.errorElement||f===0)?p.createElement(Rl,{location:t.location,revalidation:t.revalidation,component:b,error:h,children:x(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):x()},null)}var oa=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(oa||{}),_n=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(_n||{});function Tl(e){let n=p.useContext(Dn);return n||q(!1),n}function jl(e){let n=p.useContext(ta);return n||q(!1),n}function Ol(e){let n=p.useContext(de);return n||q(!1),n}function ia(e){let n=Ol(),t=n.matches[n.matches.length-1];return t.route.id||q(!1),t.route.id}function Ll(){var e;let n=p.useContext(ra),t=jl(_n.UseRouteError),r=ia(_n.UseRouteError);return n!==void 0?n:(e=t.errors)==null?void 0:e[r]}function Dl(){let{router:e}=Tl(oa.UseNavigateStable),n=ia(_n.UseNavigateStable),t=p.useRef(!1);return aa(()=>{t.current=!0}),p.useCallback(function(a,o){o===void 0&&(o={}),t.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,en({fromRouteId:n},o)))},[e,n])}function Zf(e){let{to:n,replace:t,state:r,relative:a}=e;He()||q(!1);let{future:o,static:i}=p.useContext(ce),{matches:s}=p.useContext(de),{pathname:l}=ke(),c=Gn(),m=St(n,It(s,o.v7_relativeSplatPath),l,a==="path"),d=JSON.stringify(m);return p.useEffect(()=>c(JSON.parse(d),{replace:t,state:r,relative:a}),[c,d,a,t,r]),null}function ev(e){return Il(e.context)}function Fl(e){q(!1)}function Gl(e){let{basename:n="/",children:t=null,location:r,navigationType:a=ve.Pop,navigator:o,static:i=!1,future:s}=e;He()&&q(!1);let l=n.replace(/^\/*/,"/"),c=p.useMemo(()=>({basename:l,navigator:o,static:i,future:en({v7_relativeSplatPath:!1},s)}),[l,s,o,i]);typeof r=="string"&&(r=ze(r));let{pathname:m="/",search:d="",hash:f="",state:h=null,key:v="default"}=r,b=p.useMemo(()=>{let g=Fe(m,l);return g==null?null:{location:{pathname:g,search:d,hash:f,state:h,key:v},navigationType:a}},[l,m,d,f,h,v,a]);return b==null?null:p.createElement(ce.Provider,{value:c},p.createElement(Fn.Provider,{children:t,value:b}))}function nv(e){let{children:n,location:t}=e;return Sl(ot(n),t)}new Promise(()=>{});function ot(e,n){n===void 0&&(n=[]);let t=[];return p.Children.forEach(e,(r,a)=>{if(!p.isValidElement(r))return;let o=[...n,a];if(r.type===p.Fragment){t.push.apply(t,ot(r.props.children,o));return}r.type!==Fl&&q(!1),!r.props.index||!r.props.children||q(!1);let i={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=ot(r.props.children,o)),t.push(i)}),t}/**
 * React Router DOM v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Cn(){return Cn=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},Cn.apply(this,arguments)}function sa(e,n){if(e==null)return{};var t={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(n.indexOf(a)>=0)&&(t[a]=e[a]);return t}function Bl(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ql(e,n){return e.button===0&&(!n||n==="_self")&&!Bl(e)}function it(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((n,t)=>{let r=e[t];return n.concat(Array.isArray(r)?r.map(a=>[t,a]):[[t,r]])},[]))}function zl(e,n){let t=it(e);return n&&n.forEach((r,a)=>{t.has(a)||n.getAll(a).forEach(o=>{t.append(a,o)})}),t}const Hl=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Ul=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],$l="6";try{window.__reactRouterVersion=$l}catch{}const Kl=p.createContext({isTransitioning:!1}),Vl="startTransition",ar=Ti[Vl];function tv(e){let{basename:n,children:t,future:r,window:a}=e,o=p.useRef();o.current==null&&(o.current=Js({window:a,v5Compat:!0}));let i=o.current,[s,l]=p.useState({action:i.action,location:i.location}),{v7_startTransition:c}=r||{},m=p.useCallback(d=>{c&&ar?ar(()=>l(d)):l(d)},[l,c]);return p.useLayoutEffect(()=>i.listen(m),[i,m]),p.createElement(Gl,{basename:n,children:t,location:s.location,navigationType:s.action,navigator:i,future:r})}const Wl=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Ql=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Yl=p.forwardRef(function(n,t){let{onClick:r,relative:a,reloadDocument:o,replace:i,state:s,target:l,to:c,preventScrollReset:m,viewTransition:d}=n,f=sa(n,Hl),{basename:h}=p.useContext(ce),v,b=!1;if(typeof c=="string"&&Ql.test(c)&&(v=c,Wl))try{let _=new URL(window.location.href),A=c.startsWith("//")?new URL(_.protocol+c):new URL(c),w=Fe(A.pathname,h);A.origin===_.origin&&w!=null?c=w+A.search+A.hash:b=!0}catch{}let g=Al(c,{relative:a}),y=Xl(c,{replace:i,state:s,target:l,preventScrollReset:m,relative:a,viewTransition:d});function x(_){r&&r(_),_.defaultPrevented||y(_)}return p.createElement("a",Cn({},f,{href:v||g,onClick:b||o?r:x,ref:t,target:l}))}),rv=p.forwardRef(function(n,t){let{"aria-current":r="page",caseSensitive:a=!1,className:o="",end:i=!1,style:s,to:l,viewTransition:c,children:m}=n,d=sa(n,Ul),f=Bn(l,{relative:d.relative}),h=ke(),v=p.useContext(ta),{navigator:b,basename:g}=p.useContext(ce),y=v!=null&&Zl(f)&&c===!0,x=b.encodeLocation?b.encodeLocation(f).pathname:f.pathname,_=h.pathname,A=v&&v.navigation&&v.navigation.location?v.navigation.location.pathname:null;a||(_=_.toLowerCase(),A=A?A.toLowerCase():null,x=x.toLowerCase()),A&&g&&(A=Fe(A,g)||A);const w=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let R=_===x||!i&&_.startsWith(x)&&_.charAt(w)==="/",j=A!=null&&(A===x||!i&&A.startsWith(x)&&A.charAt(x.length)==="/"),M={isActive:R,isPending:j,isTransitioning:y},F=R?r:void 0,O;typeof o=="function"?O=o(M):O=[o,R?"active":null,j?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let B=typeof s=="function"?s(M):s;return p.createElement(Yl,Cn({},d,{"aria-current":F,className:O,ref:t,style:B,to:l,viewTransition:c}),typeof m=="function"?m(M):m)});var st;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(st||(st={}));var or;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(or||(or={}));function Jl(e){let n=p.useContext(Dn);return n||q(!1),n}function Xl(e,n){let{target:t,replace:r,state:a,preventScrollReset:o,relative:i,viewTransition:s}=n===void 0?{}:n,l=Gn(),c=ke(),m=Bn(e,{relative:i});return p.useCallback(d=>{if(ql(d,t)){d.preventDefault();let f=r!==void 0?r:wn(c)===wn(m);l(e,{replace:f,state:a,preventScrollReset:o,relative:i,viewTransition:s})}},[c,l,m,r,a,t,e,o,i,s])}function av(e){let n=p.useRef(it(e)),t=p.useRef(!1),r=ke(),a=p.useMemo(()=>zl(r.search,t.current?null:n.current),[r.search]),o=Gn(),i=p.useCallback((s,l)=>{const c=it(typeof s=="function"?s(a):s);t.current=!0,o("?"+c,l)},[o,a]);return[a,i]}function Zl(e,n){n===void 0&&(n={});let t=p.useContext(Kl);t==null&&q(!1);let{basename:r}=Jl(st.useViewTransitionState),a=Bn(e,{relative:n.relative});if(!t.isTransitioning)return!1;let o=Fe(t.currentLocation.pathname,r)||t.currentLocation.pathname,i=Fe(t.nextLocation.pathname,r)||t.nextLocation.pathname;return An(a.pathname,i)!=null||An(a.pathname,o)!=null}const xe=p.forwardRef(({className:e,...n},t)=>u.jsx("div",{ref:t,className:P("rounded-lg border bg-card text-card-foreground shadow-sm",e),...n}));xe.displayName="Card";const eu=p.forwardRef(({className:e,...n},t)=>u.jsx("div",{ref:t,className:P("flex flex-col space-y-1.5 p-6",e),...n}));eu.displayName="CardHeader";const nu=p.forwardRef(({className:e,...n},t)=>u.jsx("h3",{ref:t,className:P("text-2xl font-semibold leading-none tracking-tight",e),...n}));nu.displayName="CardTitle";const tu=p.forwardRef(({className:e,...n},t)=>u.jsx("p",{ref:t,className:P("text-sm text-muted-foreground",e),...n}));tu.displayName="CardDescription";const ru=p.forwardRef(({className:e,...n},t)=>u.jsx("div",{ref:t,className:P("p-6 pt-0",e),...n}));ru.displayName="CardContent";const au=p.forwardRef(({className:e,...n},t)=>u.jsx("div",{ref:t,className:P("flex items-center p-6 pt-0",e),...n}));au.displayName="CardFooter";const ou=Ln("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),In=p.forwardRef(({className:e,variant:n,size:t,asChild:r=!1,...a},o)=>{const i=r?Mr:"button";return u.jsx(i,{className:P(ou({variant:n,size:t,className:e})),ref:o,...a})});In.displayName="Button";const iu=Ln("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),la=p.forwardRef(({className:e,variant:n,...t},r)=>u.jsx("div",{ref:r,role:"alert",className:P(iu({variant:n}),e),...t}));la.displayName="Alert";const su=p.forwardRef(({className:e,...n},t)=>u.jsx("h5",{ref:t,className:P("mb-1 font-medium leading-none tracking-tight",e),...n}));su.displayName="AlertTitle";const lu=p.forwardRef(({className:e,...n},t)=>u.jsx("div",{ref:t,className:P("text-sm [&_p]:leading-relaxed",e),...n}));lu.displayName="AlertDescription";const uu=Ln("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function Ce({className:e,variant:n,...t}){return u.jsx("div",{className:P(uu({variant:n}),e),...t})}function cu(e,n=[]){let t=[];function r(o,i){const s=p.createContext(i),l=t.length;t=[...t,i];function c(d){const{scope:f,children:h,...v}=d,b=(f==null?void 0:f[e][l])||s,g=p.useMemo(()=>v,Object.values(v));return u.jsx(b.Provider,{value:g,children:h})}function m(d,f){const h=(f==null?void 0:f[e][l])||s,v=p.useContext(h);if(v)return v;if(i!==void 0)return i;throw new Error(`\`${d}\` must be used within \`${o}\``)}return c.displayName=o+"Provider",[c,m]}const a=()=>{const o=t.map(i=>p.createContext(i));return function(s){const l=(s==null?void 0:s[e])||o;return p.useMemo(()=>({[`__scope${e}`]:{...s,[e]:l}}),[s,l])}};return a.scopeName=e,[r,du(a,...n)]}function du(...e){const n=e[0];if(e.length===1)return n;const t=()=>{const r=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(o){const i=r.reduce((s,{useScope:l,scopeName:c})=>{const d=l(o)[`__scope${c}`];return{...s,...d}},{});return p.useMemo(()=>({[`__scope${n.scopeName}`]:i}),[i])}};return t.scopeName=n.scopeName,t}var kt="Progress",pu=100,[mu,ov]=cu(kt),[fu,vu]=mu(kt),ua=p.forwardRef((e,n)=>{const{__scopeProgress:t,value:r=null,max:a,getValueLabel:o=gu,...i}=e;(a||a===0)&&ir(a);const s=ir(a)?a:pu;r!==null&&sr(r,s);const l=sr(r,s)?r:null,c=Sn(l)?o(l,s):void 0;return u.jsx(fu,{scope:t,value:l,max:s,children:u.jsx(K.div,{"aria-valuemax":s,"aria-valuemin":0,"aria-valuenow":Sn(l)?l:void 0,"aria-valuetext":c,role:"progressbar","data-state":pa(l,s),"data-value":l??void 0,"data-max":s,...i,ref:n})})});ua.displayName=kt;var ca="ProgressIndicator",da=p.forwardRef((e,n)=>{const{__scopeProgress:t,...r}=e,a=vu(ca,t);return u.jsx(K.div,{"data-state":pa(a.value,a.max),"data-value":a.value??void 0,"data-max":a.max,...r,ref:n})});da.displayName=ca;function gu(e,n){return`${Math.round(e/n*100)}%`}function pa(e,n){return e==null?"indeterminate":e===n?"complete":"loading"}function Sn(e){return typeof e=="number"}function ir(e){return Sn(e)&&!isNaN(e)&&e>0}function sr(e,n){return Sn(e)&&!isNaN(e)&&e<=n&&e>=0}var ma=ua,hu=da;const fa=p.forwardRef(({className:e,value:n,...t},r)=>u.jsx(ma,{ref:r,className:P("relative h-4 w-full overflow-hidden rounded-full bg-secondary",e),...t,children:u.jsx(hu,{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}})}));fa.displayName=ma.displayName;const De=p.forwardRef(({className:e,type:n,...t},r)=>u.jsx("input",{type:n,className:P("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:r,...t}));De.displayName="Input";var Nt="Checkbox",[bu,iv]=mn(Nt),[xu,yu]=bu(Nt),va=p.forwardRef((e,n)=>{const{__scopeCheckbox:t,name:r,checked:a,defaultChecked:o,required:i,disabled:s,value:l="on",onCheckedChange:c,form:m,...d}=e,[f,h]=p.useState(null),v=ue(n,A=>h(A)),b=p.useRef(!1),g=f?m||!!f.closest("form"):!0,[y=!1,x]=On({prop:a,defaultProp:o,onChange:c}),_=p.useRef(y);return p.useEffect(()=>{const A=f==null?void 0:f.form;if(A){const w=()=>x(_.current);return A.addEventListener("reset",w),()=>A.removeEventListener("reset",w)}},[f,x]),u.jsxs(xu,{scope:t,state:y,disabled:s,children:[u.jsx(K.button,{type:"button",role:"checkbox","aria-checked":he(y)?"mixed":y,"aria-required":i,"data-state":ba(y),"data-disabled":s?"":void 0,disabled:s,value:l,...d,ref:v,onKeyDown:E(e.onKeyDown,A=>{A.key==="Enter"&&A.preventDefault()}),onClick:E(e.onClick,A=>{x(w=>he(w)?!0:!w),g&&(b.current=A.isPropagationStopped(),b.current||A.stopPropagation())})}),g&&u.jsx(wu,{control:f,bubbles:!b.current,name:r,value:l,checked:y,required:i,disabled:s,form:m,style:{transform:"translateX(-100%)"},defaultChecked:he(o)?!1:o})]})});va.displayName=Nt;var ga="CheckboxIndicator",ha=p.forwardRef((e,n)=>{const{__scopeCheckbox:t,forceMount:r,...a}=e,o=yu(ga,t);return u.jsx(Be,{present:r||he(o.state)||o.state===!0,children:u.jsx(K.span,{"data-state":ba(o.state),"data-disabled":o.disabled?"":void 0,...a,ref:n,style:{pointerEvents:"none",...e.style}})})});ha.displayName=ga;var wu=e=>{const{control:n,checked:t,bubbles:r=!0,defaultChecked:a,...o}=e,i=p.useRef(null),s=Rr(t),l=Er(n);p.useEffect(()=>{const m=i.current,d=window.HTMLInputElement.prototype,h=Object.getOwnPropertyDescriptor(d,"checked").set;if(s!==t&&h){const v=new Event("click",{bubbles:r});m.indeterminate=he(t),h.call(m,he(t)?!1:t),m.dispatchEvent(v)}},[s,t,r]);const c=p.useRef(he(t)?!1:t);return u.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:a??c.current,...o,tabIndex:-1,ref:i,style:{...e.style,...l,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function he(e){return e==="indeterminate"}function ba(e){return he(e)?"indeterminate":e?"checked":"unchecked"}var xa=va,Au=ha;const fn=p.forwardRef(({className:e,...n},t)=>u.jsx(xa,{ref:t,className:P("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...n,children:u.jsx(Au,{className:P("flex items-center justify-center text-current"),children:u.jsx(At,{className:"h-4 w-4"})})}));fn.displayName=xa.displayName;const xn=Gi,yn=Bi,Ye=p.forwardRef(({className:e,children:n,...t},r)=>u.jsxs(Pr,{ref:r,className:P("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",e),...t,children:[n,u.jsx(ji,{asChild:!0,children:u.jsx(_t,{className:"h-4 w-4 opacity-50"})})]}));Ye.displayName=Pr.displayName;const ya=p.forwardRef(({className:e,...n},t)=>u.jsx(Tr,{ref:t,className:P("flex cursor-default items-center justify-center py-1",e),...n,children:u.jsx(ps,{className:"h-4 w-4"})}));ya.displayName=Tr.displayName;const wa=p.forwardRef(({className:e,...n},t)=>u.jsx(jr,{ref:t,className:P("flex cursor-default items-center justify-center py-1",e),...n,children:u.jsx(_t,{className:"h-4 w-4"})}));wa.displayName=jr.displayName;const Je=p.forwardRef(({className:e,children:n,position:t="popper",...r},a)=>u.jsx(Oi,{children:u.jsxs(Or,{ref:a,className:P("relative z-[100] max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-background text-foreground shadow-elegant data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",e),position:t,...r,children:[u.jsx(ya,{}),u.jsx(Li,{className:P("p-1",t==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n}),u.jsx(wa,{})]})}));Je.displayName=Or.displayName;const _u=p.forwardRef(({className:e,...n},t)=>u.jsx(Lr,{ref:t,className:P("py-1.5 pl-8 pr-2 text-sm font-semibold",e),...n}));_u.displayName=Lr.displayName;const Xe=p.forwardRef(({className:e,children:n,...t},r)=>u.jsxs(Dr,{ref:r,className:P("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...t,children:[u.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:u.jsx(Di,{children:u.jsx(At,{className:"h-4 w-4"})})}),u.jsx(Fi,{children:n})]}));Xe.displayName=Dr.displayName;const Cu=p.forwardRef(({className:e,...n},t)=>u.jsx(Fr,{ref:t,className:P("-mx-1 my-1 h-px bg-muted",e),...n}));Cu.displayName=Fr.displayName;var Iu="Label",Aa=p.forwardRef((e,n)=>u.jsx(K.label,{...e,ref:n,onMouseDown:t=>{var a;t.target.closest("button, input, select, textarea")||((a=e.onMouseDown)==null||a.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));Aa.displayName=Iu;var _a=Aa;const Su=Ln("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),Z=p.forwardRef(({className:e,...n},t)=>u.jsx(_a,{ref:t,className:P(Su(),e),...n}));Z.displayName=_a.displayName;const ku=(e,n,t,r)=>{var o,i,s,l;const a=[t,{code:n,...r||{}}];if((i=(o=e==null?void 0:e.services)==null?void 0:o.logger)!=null&&i.forward)return e.services.logger.forward(a,"warn","react-i18next::",!0);Ie(a[0])&&(a[0]=`react-i18next:: ${a[0]}`),(l=(s=e==null?void 0:e.services)==null?void 0:s.logger)!=null&&l.warn?e.services.logger.warn(...a):console!=null&&console.warn},lr={},lt=(e,n,t,r)=>{Ie(t)&&lr[t]||(Ie(t)&&(lr[t]=new Date),ku(e,n,t,r))},Ca=(e,n)=>()=>{if(e.isInitialized)n();else{const t=()=>{setTimeout(()=>{e.off("initialized",t)},0),n()};e.on("initialized",t)}},ut=(e,n,t)=>{e.loadNamespaces(n,Ca(e,t))},ur=(e,n,t,r)=>{if(Ie(t)&&(t=[t]),e.options.preload&&e.options.preload.indexOf(n)>-1)return ut(e,t,r);t.forEach(a=>{e.options.ns.indexOf(a)<0&&e.options.ns.push(a)}),e.loadLanguages(n,Ca(e,r))},Nu=(e,n,t={})=>!n.languages||!n.languages.length?(lt(n,"NO_LANGUAGES","i18n.languages were undefined or empty",{languages:n.languages}),!0):n.hasLoadedNamespace(e,{lng:t.lng,precheck:(r,a)=>{if(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&r.services.backendConnector.backend&&r.isLanguageChangingTo&&!a(r.isLanguageChangingTo,e))return!1}}),Ie=e=>typeof e=="string",Mu=e=>typeof e=="object"&&e!==null,Ru=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,Eu={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},Pu=e=>Eu[e],Tu=e=>e.replace(Ru,Pu);let ct={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:Tu};const ju=(e={})=>{ct={...ct,...e}},Ou=()=>ct;let Ia;const Lu=e=>{Ia=e},Du=()=>Ia,sv={type:"3rdParty",init(e){ju(e.options.react),Lu(e)}},Fu=p.createContext();class Gu{constructor(){this.usedNamespaces={}}addUsedNamespaces(n){n.forEach(t=>{this.usedNamespaces[t]||(this.usedNamespaces[t]=!0)})}getUsedNamespaces(){return Object.keys(this.usedNamespaces)}}const Bu=(e,n)=>{const t=p.useRef();return p.useEffect(()=>{t.current=e},[e,n]),t.current},Sa=(e,n,t,r)=>e.getFixedT(n,t,r),qu=(e,n,t,r)=>p.useCallback(Sa(e,n,t,r),[e,n,t,r]),Ue=(e,n={})=>{var A,w,R,j;const{i18n:t}=n,{i18n:r,defaultNS:a}=p.useContext(Fu)||{},o=t||r||Du();if(o&&!o.reportNamespaces&&(o.reportNamespaces=new Gu),!o){lt(o,"NO_I18NEXT_INSTANCE","useTranslation: You will need to pass in an i18next instance by using initReactI18next");const M=(O,B)=>Ie(B)?B:Mu(B)&&Ie(B.defaultValue)?B.defaultValue:Array.isArray(O)?O[O.length-1]:O,F=[M,{},!1];return F.t=M,F.i18n={},F.ready=!1,F}(A=o.options.react)!=null&&A.wait&&lt(o,"DEPRECATED_OPTION","useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");const i={...Ou(),...o.options.react,...n},{useSuspense:s,keyPrefix:l}=i;let c=a||((w=o.options)==null?void 0:w.defaultNS);c=Ie(c)?[c]:c||["translation"],(j=(R=o.reportNamespaces).addUsedNamespaces)==null||j.call(R,c);const m=(o.isInitialized||o.initializedStoreOnce)&&c.every(M=>Nu(M,o,i)),d=qu(o,n.lng||null,i.nsMode==="fallback"?c:c[0],l),f=()=>d,h=()=>Sa(o,n.lng||null,i.nsMode==="fallback"?c:c[0],l),[v,b]=p.useState(f);let g=c.join();n.lng&&(g=`${n.lng}${g}`);const y=Bu(g),x=p.useRef(!0);p.useEffect(()=>{const{bindI18n:M,bindI18nStore:F}=i;x.current=!0,!m&&!s&&(n.lng?ur(o,n.lng,c,()=>{x.current&&b(h)}):ut(o,c,()=>{x.current&&b(h)})),m&&y&&y!==g&&x.current&&b(h);const O=()=>{x.current&&b(h)};return M&&(o==null||o.on(M,O)),F&&(o==null||o.store.on(F,O)),()=>{x.current=!1,o&&M&&(M==null||M.split(" ").forEach(B=>o.off(B,O))),F&&o&&F.split(" ").forEach(B=>o.store.off(B,O))}},[o,g]),p.useEffect(()=>{x.current&&m&&b(f)},[o,l,m]);const _=[v,o,m];if(_.t=v,_.i18n=o,_.ready=m,m||!m&&!s)return _;throw new Promise(M=>{n.lng?ur(o,n.lng,c,()=>M()):ut(o,c,()=>M())})};function zu(e,n=[]){let t=[];function r(o,i){const s=p.createContext(i),l=t.length;t=[...t,i];function c(d){const{scope:f,children:h,...v}=d,b=(f==null?void 0:f[e][l])||s,g=p.useMemo(()=>v,Object.values(v));return u.jsx(b.Provider,{value:g,children:h})}function m(d,f){const h=(f==null?void 0:f[e][l])||s,v=p.useContext(h);if(v)return v;if(i!==void 0)return i;throw new Error(`\`${d}\` must be used within \`${o}\``)}return c.displayName=o+"Provider",[c,m]}const a=()=>{const o=t.map(i=>p.createContext(i));return function(s){const l=(s==null?void 0:s[e])||o;return p.useMemo(()=>({[`__scope${e}`]:{...s,[e]:l}}),[s,l])}};return a.scopeName=e,[r,Hu(a,...n)]}function Hu(...e){const n=e[0];if(e.length===1)return n;const t=()=>{const r=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(o){const i=r.reduce((s,{useScope:l,scopeName:c})=>{const d=l(o)[`__scope${c}`];return{...s,...d}},{});return p.useMemo(()=>({[`__scope${n.scopeName}`]:i}),[i])}};return t.scopeName=n.scopeName,t}var Jn="rovingFocusGroup.onEntryFocus",Uu={bubbles:!1,cancelable:!0},qn="RovingFocusGroup",[dt,ka,$u]=Gr(qn),[Ku,zn]=zu(qn,[$u]),[Vu,Wu]=Ku(qn),Na=p.forwardRef((e,n)=>u.jsx(dt.Provider,{scope:e.__scopeRovingFocusGroup,children:u.jsx(dt.Slot,{scope:e.__scopeRovingFocusGroup,children:u.jsx(Qu,{...e,ref:n})})}));Na.displayName=qn;var Qu=p.forwardRef((e,n)=>{const{__scopeRovingFocusGroup:t,orientation:r,loop:a=!1,dir:o,currentTabStopId:i,defaultCurrentTabStopId:s,onCurrentTabStopIdChange:l,onEntryFocus:c,preventScrollOnEntryFocus:m=!1,...d}=e,f=p.useRef(null),h=ue(n,f),v=yt(o),[b=null,g]=On({prop:i,defaultProp:s,onChange:l}),[y,x]=p.useState(!1),_=wt(c),A=ka(t),w=p.useRef(!1),[R,j]=p.useState(0);return p.useEffect(()=>{const M=f.current;if(M)return M.addEventListener(Jn,_),()=>M.removeEventListener(Jn,_)},[_]),u.jsx(Vu,{scope:t,orientation:r,dir:v,loop:a,currentTabStopId:b,onItemFocus:p.useCallback(M=>g(M),[g]),onItemShiftTab:p.useCallback(()=>x(!0),[]),onFocusableItemAdd:p.useCallback(()=>j(M=>M+1),[]),onFocusableItemRemove:p.useCallback(()=>j(M=>M-1),[]),children:u.jsx(K.div,{tabIndex:y||R===0?-1:0,"data-orientation":r,...d,ref:h,style:{outline:"none",...e.style},onMouseDown:E(e.onMouseDown,()=>{w.current=!0}),onFocus:E(e.onFocus,M=>{const F=!w.current;if(M.target===M.currentTarget&&F&&!y){const O=new CustomEvent(Jn,Uu);if(M.currentTarget.dispatchEvent(O),!O.defaultPrevented){const B=A().filter(U=>U.focusable),T=B.find(U=>U.active),re=B.find(U=>U.id===b),pe=[T,re,...B].filter(Boolean).map(U=>U.ref.current);Ea(pe,m)}}w.current=!1}),onBlur:E(e.onBlur,()=>x(!1))})})}),Ma="RovingFocusGroupItem",Ra=p.forwardRef((e,n)=>{const{__scopeRovingFocusGroup:t,focusable:r=!0,active:a=!1,tabStopId:o,...i}=e,s=tt(),l=o||s,c=Wu(Ma,t),m=c.currentTabStopId===l,d=ka(t),{onFocusableItemAdd:f,onFocusableItemRemove:h}=c;return p.useEffect(()=>{if(r)return f(),()=>h()},[r,f,h]),u.jsx(dt.ItemSlot,{scope:t,id:l,focusable:r,active:a,children:u.jsx(K.span,{tabIndex:m?0:-1,"data-orientation":c.orientation,...i,ref:n,onMouseDown:E(e.onMouseDown,v=>{r?c.onItemFocus(l):v.preventDefault()}),onFocus:E(e.onFocus,()=>c.onItemFocus(l)),onKeyDown:E(e.onKeyDown,v=>{if(v.key==="Tab"&&v.shiftKey){c.onItemShiftTab();return}if(v.target!==v.currentTarget)return;const b=Xu(v,c.orientation,c.dir);if(b!==void 0){if(v.metaKey||v.ctrlKey||v.altKey||v.shiftKey)return;v.preventDefault();let y=d().filter(x=>x.focusable).map(x=>x.ref.current);if(b==="last")y.reverse();else if(b==="prev"||b==="next"){b==="prev"&&y.reverse();const x=y.indexOf(v.currentTarget);y=c.loop?Zu(y,x+1):y.slice(x+1)}setTimeout(()=>Ea(y))}})})})});Ra.displayName=Ma;var Yu={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Ju(e,n){return n!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function Xu(e,n,t){const r=Ju(e.key,t);if(!(n==="vertical"&&["ArrowLeft","ArrowRight"].includes(r))&&!(n==="horizontal"&&["ArrowUp","ArrowDown"].includes(r)))return Yu[r]}function Ea(e,n=!1){const t=document.activeElement;for(const r of e)if(r===t||(r.focus({preventScroll:n}),document.activeElement!==t))return}function Zu(e,n){return e.map((t,r)=>e[(n+r)%e.length])}var Pa=Na,Ta=Ra,pt=["Enter"," "],ec=["ArrowDown","PageUp","Home"],ja=["ArrowUp","PageDown","End"],nc=[...ec,...ja],tc={ltr:[...pt,"ArrowRight"],rtl:[...pt,"ArrowLeft"]},rc={ltr:["ArrowLeft"],rtl:["ArrowRight"]},vn="Menu",[nn,ac,oc]=Gr(vn),[Ne,Oa]=mn(vn,[oc,Br,zn]),Hn=Br(),La=zn(),[ic,Me]=Ne(vn),[sc,gn]=Ne(vn),Da=e=>{const{__scopeMenu:n,open:t=!1,children:r,dir:a,onOpenChange:o,modal:i=!0}=e,s=Hn(n),[l,c]=p.useState(null),m=p.useRef(!1),d=wt(o),f=yt(a);return p.useEffect(()=>{const h=()=>{m.current=!0,document.addEventListener("pointerdown",v,{capture:!0,once:!0}),document.addEventListener("pointermove",v,{capture:!0,once:!0})},v=()=>m.current=!1;return document.addEventListener("keydown",h,{capture:!0}),()=>{document.removeEventListener("keydown",h,{capture:!0}),document.removeEventListener("pointerdown",v,{capture:!0}),document.removeEventListener("pointermove",v,{capture:!0})}},[]),u.jsx(Ji,{...s,children:u.jsx(ic,{scope:n,open:t,onOpenChange:d,content:l,onContentChange:c,children:u.jsx(sc,{scope:n,onClose:p.useCallback(()=>d(!1),[d]),isUsingKeyboardRef:m,dir:f,modal:i,children:r})})})};Da.displayName=vn;var lc="MenuAnchor",Mt=p.forwardRef((e,n)=>{const{__scopeMenu:t,...r}=e,a=Hn(t);return u.jsx(qi,{...a,...r,ref:n})});Mt.displayName=lc;var Rt="MenuPortal",[uc,Fa]=Ne(Rt,{forceMount:void 0}),Ga=e=>{const{__scopeMenu:n,forceMount:t,children:r,container:a}=e,o=Me(Rt,n);return u.jsx(uc,{scope:n,forceMount:t,children:u.jsx(Be,{present:t||o.open,children:u.jsx(Yi,{asChild:!0,container:a,children:r})})})};Ga.displayName=Rt;var ne="MenuContent",[cc,Et]=Ne(ne),Ba=p.forwardRef((e,n)=>{const t=Fa(ne,e.__scopeMenu),{forceMount:r=t.forceMount,...a}=e,o=Me(ne,e.__scopeMenu),i=gn(ne,e.__scopeMenu);return u.jsx(nn.Provider,{scope:e.__scopeMenu,children:u.jsx(Be,{present:r||o.open,children:u.jsx(nn.Slot,{scope:e.__scopeMenu,children:i.modal?u.jsx(dc,{...a,ref:n}):u.jsx(pc,{...a,ref:n})})})})}),dc=p.forwardRef((e,n)=>{const t=Me(ne,e.__scopeMenu),r=p.useRef(null),a=ue(n,r);return p.useEffect(()=>{const o=r.current;if(o)return zi(o)},[]),u.jsx(Pt,{...e,ref:a,trapFocus:t.open,disableOutsidePointerEvents:t.open,disableOutsideScroll:!0,onFocusOutside:E(e.onFocusOutside,o=>o.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>t.onOpenChange(!1)})}),pc=p.forwardRef((e,n)=>{const t=Me(ne,e.__scopeMenu);return u.jsx(Pt,{...e,ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>t.onOpenChange(!1)})}),Pt=p.forwardRef((e,n)=>{const{__scopeMenu:t,loop:r=!1,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:i,disableOutsidePointerEvents:s,onEntryFocus:l,onEscapeKeyDown:c,onPointerDownOutside:m,onFocusOutside:d,onInteractOutside:f,onDismiss:h,disableOutsideScroll:v,...b}=e,g=Me(ne,t),y=gn(ne,t),x=Hn(t),_=La(t),A=ac(t),[w,R]=p.useState(null),j=p.useRef(null),M=ue(n,j,g.onContentChange),F=p.useRef(0),O=p.useRef(""),B=p.useRef(0),T=p.useRef(null),re=p.useRef("right"),ee=p.useRef(0),pe=v?Wi:p.Fragment,U=v?{as:Mr,allowPinchZoom:!0}:void 0,we=C=>{var Ee,Vt;const L=O.current+C,D=A().filter(oe=>!oe.disabled),J=document.activeElement,ae=(Ee=D.find(oe=>oe.ref.current===J))==null?void 0:Ee.textValue,Ae=D.map(oe=>oe.textValue),Re=Cc(Ae,L,ae),_e=(Vt=D.find(oe=>oe.textValue===Re))==null?void 0:Vt.ref.current;(function oe(Wt){O.current=Wt,window.clearTimeout(F.current),Wt!==""&&(F.current=window.setTimeout(()=>oe(""),1e3))})(L),_e&&setTimeout(()=>_e.focus())};p.useEffect(()=>()=>window.clearTimeout(F.current),[]),Hi();const S=p.useCallback(C=>{var D,J;return re.current===((D=T.current)==null?void 0:D.side)&&Sc(C,(J=T.current)==null?void 0:J.area)},[]);return u.jsx(cc,{scope:t,searchRef:O,onItemEnter:p.useCallback(C=>{S(C)&&C.preventDefault()},[S]),onItemLeave:p.useCallback(C=>{var L;S(C)||((L=j.current)==null||L.focus(),R(null))},[S]),onTriggerLeave:p.useCallback(C=>{S(C)&&C.preventDefault()},[S]),pointerGraceTimerRef:B,onPointerGraceIntentChange:p.useCallback(C=>{T.current=C},[]),children:u.jsx(pe,{...U,children:u.jsx(Ui,{asChild:!0,trapped:a,onMountAutoFocus:E(o,C=>{var L;C.preventDefault(),(L=j.current)==null||L.focus({preventScroll:!0})}),onUnmountAutoFocus:i,children:u.jsx($i,{asChild:!0,disableOutsidePointerEvents:s,onEscapeKeyDown:c,onPointerDownOutside:m,onFocusOutside:d,onInteractOutside:f,onDismiss:h,children:u.jsx(Pa,{asChild:!0,..._,dir:y.dir,orientation:"vertical",loop:r,currentTabStopId:w,onCurrentTabStopIdChange:R,onEntryFocus:E(l,C=>{y.isUsingKeyboardRef.current||C.preventDefault()}),preventScrollOnEntryFocus:!0,children:u.jsx(Ki,{role:"menu","aria-orientation":"vertical","data-state":to(g.open),"data-radix-menu-content":"",dir:y.dir,...x,...b,ref:M,style:{outline:"none",...b.style},onKeyDown:E(b.onKeyDown,C=>{const D=C.target.closest("[data-radix-menu-content]")===C.currentTarget,J=C.ctrlKey||C.altKey||C.metaKey,ae=C.key.length===1;D&&(C.key==="Tab"&&C.preventDefault(),!J&&ae&&we(C.key));const Ae=j.current;if(C.target!==Ae||!nc.includes(C.key))return;C.preventDefault();const _e=A().filter(Ee=>!Ee.disabled).map(Ee=>Ee.ref.current);ja.includes(C.key)&&_e.reverse(),Ac(_e)}),onBlur:E(e.onBlur,C=>{C.currentTarget.contains(C.target)||(window.clearTimeout(F.current),O.current="")}),onPointerMove:E(e.onPointerMove,tn(C=>{const L=C.target,D=ee.current!==C.clientX;if(C.currentTarget.contains(L)&&D){const J=C.clientX>ee.current?"right":"left";re.current=J,ee.current=C.clientX}}))})})})})})})});Ba.displayName=ne;var mc="MenuGroup",Tt=p.forwardRef((e,n)=>{const{__scopeMenu:t,...r}=e;return u.jsx(K.div,{role:"group",...r,ref:n})});Tt.displayName=mc;var fc="MenuLabel",qa=p.forwardRef((e,n)=>{const{__scopeMenu:t,...r}=e;return u.jsx(K.div,{...r,ref:n})});qa.displayName=fc;var kn="MenuItem",cr="menu.itemSelect",Un=p.forwardRef((e,n)=>{const{disabled:t=!1,onSelect:r,...a}=e,o=p.useRef(null),i=gn(kn,e.__scopeMenu),s=Et(kn,e.__scopeMenu),l=ue(n,o),c=p.useRef(!1),m=()=>{const d=o.current;if(!t&&d){const f=new CustomEvent(cr,{bubbles:!0,cancelable:!0});d.addEventListener(cr,h=>r==null?void 0:r(h),{once:!0}),Qi(d,f),f.defaultPrevented?c.current=!1:i.onClose()}};return u.jsx(za,{...a,ref:l,disabled:t,onClick:E(e.onClick,m),onPointerDown:d=>{var f;(f=e.onPointerDown)==null||f.call(e,d),c.current=!0},onPointerUp:E(e.onPointerUp,d=>{var f;c.current||(f=d.currentTarget)==null||f.click()}),onKeyDown:E(e.onKeyDown,d=>{const f=s.searchRef.current!=="";t||f&&d.key===" "||pt.includes(d.key)&&(d.currentTarget.click(),d.preventDefault())})})});Un.displayName=kn;var za=p.forwardRef((e,n)=>{const{__scopeMenu:t,disabled:r=!1,textValue:a,...o}=e,i=Et(kn,t),s=La(t),l=p.useRef(null),c=ue(n,l),[m,d]=p.useState(!1),[f,h]=p.useState("");return p.useEffect(()=>{const v=l.current;v&&h((v.textContent??"").trim())},[o.children]),u.jsx(nn.ItemSlot,{scope:t,disabled:r,textValue:a??f,children:u.jsx(Ta,{asChild:!0,...s,focusable:!r,children:u.jsx(K.div,{role:"menuitem","data-highlighted":m?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0,...o,ref:c,onPointerMove:E(e.onPointerMove,tn(v=>{r?i.onItemLeave(v):(i.onItemEnter(v),v.defaultPrevented||v.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:E(e.onPointerLeave,tn(v=>i.onItemLeave(v))),onFocus:E(e.onFocus,()=>d(!0)),onBlur:E(e.onBlur,()=>d(!1))})})})}),vc="MenuCheckboxItem",Ha=p.forwardRef((e,n)=>{const{checked:t=!1,onCheckedChange:r,...a}=e;return u.jsx(Wa,{scope:e.__scopeMenu,checked:t,children:u.jsx(Un,{role:"menuitemcheckbox","aria-checked":Nn(t)?"mixed":t,...a,ref:n,"data-state":Ot(t),onSelect:E(a.onSelect,()=>r==null?void 0:r(Nn(t)?!0:!t),{checkForDefaultPrevented:!1})})})});Ha.displayName=vc;var Ua="MenuRadioGroup",[gc,hc]=Ne(Ua,{value:void 0,onValueChange:()=>{}}),$a=p.forwardRef((e,n)=>{const{value:t,onValueChange:r,...a}=e,o=wt(r);return u.jsx(gc,{scope:e.__scopeMenu,value:t,onValueChange:o,children:u.jsx(Tt,{...a,ref:n})})});$a.displayName=Ua;var Ka="MenuRadioItem",Va=p.forwardRef((e,n)=>{const{value:t,...r}=e,a=hc(Ka,e.__scopeMenu),o=t===a.value;return u.jsx(Wa,{scope:e.__scopeMenu,checked:o,children:u.jsx(Un,{role:"menuitemradio","aria-checked":o,...r,ref:n,"data-state":Ot(o),onSelect:E(r.onSelect,()=>{var i;return(i=a.onValueChange)==null?void 0:i.call(a,t)},{checkForDefaultPrevented:!1})})})});Va.displayName=Ka;var jt="MenuItemIndicator",[Wa,bc]=Ne(jt,{checked:!1}),Qa=p.forwardRef((e,n)=>{const{__scopeMenu:t,forceMount:r,...a}=e,o=bc(jt,t);return u.jsx(Be,{present:r||Nn(o.checked)||o.checked===!0,children:u.jsx(K.span,{...a,ref:n,"data-state":Ot(o.checked)})})});Qa.displayName=jt;var xc="MenuSeparator",Ya=p.forwardRef((e,n)=>{const{__scopeMenu:t,...r}=e;return u.jsx(K.div,{role:"separator","aria-orientation":"horizontal",...r,ref:n})});Ya.displayName=xc;var yc="MenuArrow",Ja=p.forwardRef((e,n)=>{const{__scopeMenu:t,...r}=e,a=Hn(t);return u.jsx(Vi,{...a,...r,ref:n})});Ja.displayName=yc;var wc="MenuSub",[lv,Xa]=Ne(wc),Ve="MenuSubTrigger",Za=p.forwardRef((e,n)=>{const t=Me(Ve,e.__scopeMenu),r=gn(Ve,e.__scopeMenu),a=Xa(Ve,e.__scopeMenu),o=Et(Ve,e.__scopeMenu),i=p.useRef(null),{pointerGraceTimerRef:s,onPointerGraceIntentChange:l}=o,c={__scopeMenu:e.__scopeMenu},m=p.useCallback(()=>{i.current&&window.clearTimeout(i.current),i.current=null},[]);return p.useEffect(()=>m,[m]),p.useEffect(()=>{const d=s.current;return()=>{window.clearTimeout(d),l(null)}},[s,l]),u.jsx(Mt,{asChild:!0,...c,children:u.jsx(za,{id:a.triggerId,"aria-haspopup":"menu","aria-expanded":t.open,"aria-controls":a.contentId,"data-state":to(t.open),...e,ref:qr(n,a.onTriggerChange),onClick:d=>{var f;(f=e.onClick)==null||f.call(e,d),!(e.disabled||d.defaultPrevented)&&(d.currentTarget.focus(),t.open||t.onOpenChange(!0))},onPointerMove:E(e.onPointerMove,tn(d=>{o.onItemEnter(d),!d.defaultPrevented&&!e.disabled&&!t.open&&!i.current&&(o.onPointerGraceIntentChange(null),i.current=window.setTimeout(()=>{t.onOpenChange(!0),m()},100))})),onPointerLeave:E(e.onPointerLeave,tn(d=>{var h,v;m();const f=(h=t.content)==null?void 0:h.getBoundingClientRect();if(f){const b=(v=t.content)==null?void 0:v.dataset.side,g=b==="right",y=g?-5:5,x=f[g?"left":"right"],_=f[g?"right":"left"];o.onPointerGraceIntentChange({area:[{x:d.clientX+y,y:d.clientY},{x,y:f.top},{x:_,y:f.top},{x:_,y:f.bottom},{x,y:f.bottom}],side:b}),window.clearTimeout(s.current),s.current=window.setTimeout(()=>o.onPointerGraceIntentChange(null),300)}else{if(o.onTriggerLeave(d),d.defaultPrevented)return;o.onPointerGraceIntentChange(null)}})),onKeyDown:E(e.onKeyDown,d=>{var h;const f=o.searchRef.current!=="";e.disabled||f&&d.key===" "||tc[r.dir].includes(d.key)&&(t.onOpenChange(!0),(h=t.content)==null||h.focus(),d.preventDefault())})})})});Za.displayName=Ve;var eo="MenuSubContent",no=p.forwardRef((e,n)=>{const t=Fa(ne,e.__scopeMenu),{forceMount:r=t.forceMount,...a}=e,o=Me(ne,e.__scopeMenu),i=gn(ne,e.__scopeMenu),s=Xa(eo,e.__scopeMenu),l=p.useRef(null),c=ue(n,l);return u.jsx(nn.Provider,{scope:e.__scopeMenu,children:u.jsx(Be,{present:r||o.open,children:u.jsx(nn.Slot,{scope:e.__scopeMenu,children:u.jsx(Pt,{id:s.contentId,"aria-labelledby":s.triggerId,...a,ref:c,align:"start",side:i.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:m=>{var d;i.isUsingKeyboardRef.current&&((d=l.current)==null||d.focus()),m.preventDefault()},onCloseAutoFocus:m=>m.preventDefault(),onFocusOutside:E(e.onFocusOutside,m=>{m.target!==s.trigger&&o.onOpenChange(!1)}),onEscapeKeyDown:E(e.onEscapeKeyDown,m=>{i.onClose(),m.preventDefault()}),onKeyDown:E(e.onKeyDown,m=>{var h;const d=m.currentTarget.contains(m.target),f=rc[i.dir].includes(m.key);d&&f&&(o.onOpenChange(!1),(h=s.trigger)==null||h.focus(),m.preventDefault())})})})})})});no.displayName=eo;function to(e){return e?"open":"closed"}function Nn(e){return e==="indeterminate"}function Ot(e){return Nn(e)?"indeterminate":e?"checked":"unchecked"}function Ac(e){const n=document.activeElement;for(const t of e)if(t===n||(t.focus(),document.activeElement!==n))return}function _c(e,n){return e.map((t,r)=>e[(n+r)%e.length])}function Cc(e,n,t){const a=n.length>1&&Array.from(n).every(c=>c===n[0])?n[0]:n,o=t?e.indexOf(t):-1;let i=_c(e,Math.max(o,0));a.length===1&&(i=i.filter(c=>c!==t));const l=i.find(c=>c.toLowerCase().startsWith(a.toLowerCase()));return l!==t?l:void 0}function Ic(e,n){const{x:t,y:r}=e;let a=!1;for(let o=0,i=n.length-1;o<n.length;i=o++){const s=n[o].x,l=n[o].y,c=n[i].x,m=n[i].y;l>r!=m>r&&t<(c-s)*(r-l)/(m-l)+s&&(a=!a)}return a}function Sc(e,n){if(!n)return!1;const t={x:e.clientX,y:e.clientY};return Ic(t,n)}function tn(e){return n=>n.pointerType==="mouse"?e(n):void 0}var kc=Da,Nc=Mt,Mc=Ga,Rc=Ba,Ec=Tt,Pc=qa,Tc=Un,jc=Ha,Oc=$a,Lc=Va,Dc=Qa,Fc=Ya,Gc=Ja,Bc=Za,qc=no,Lt="DropdownMenu",[zc,uv]=mn(Lt,[Oa]),Q=Oa(),[Hc,ro]=zc(Lt),ao=e=>{const{__scopeDropdownMenu:n,children:t,dir:r,open:a,defaultOpen:o,onOpenChange:i,modal:s=!0}=e,l=Q(n),c=p.useRef(null),[m=!1,d]=On({prop:a,defaultProp:o,onChange:i});return u.jsx(Hc,{scope:n,triggerId:tt(),triggerRef:c,contentId:tt(),open:m,onOpenChange:d,onOpenToggle:p.useCallback(()=>d(f=>!f),[d]),modal:s,children:u.jsx(kc,{...l,open:m,onOpenChange:d,dir:r,modal:s,children:t})})};ao.displayName=Lt;var oo="DropdownMenuTrigger",io=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,disabled:r=!1,...a}=e,o=ro(oo,t),i=Q(t);return u.jsx(Nc,{asChild:!0,...i,children:u.jsx(K.button,{type:"button",id:o.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":o.open?o.contentId:void 0,"data-state":o.open?"open":"closed","data-disabled":r?"":void 0,disabled:r,...a,ref:qr(n,o.triggerRef),onPointerDown:E(e.onPointerDown,s=>{!r&&s.button===0&&s.ctrlKey===!1&&(o.onOpenToggle(),o.open||s.preventDefault())}),onKeyDown:E(e.onKeyDown,s=>{r||(["Enter"," "].includes(s.key)&&o.onOpenToggle(),s.key==="ArrowDown"&&o.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(s.key)&&s.preventDefault())})})})});io.displayName=oo;var Uc="DropdownMenuPortal",so=e=>{const{__scopeDropdownMenu:n,...t}=e,r=Q(n);return u.jsx(Mc,{...r,...t})};so.displayName=Uc;var lo="DropdownMenuContent",uo=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=ro(lo,t),o=Q(t),i=p.useRef(!1);return u.jsx(Rc,{id:a.contentId,"aria-labelledby":a.triggerId,...o,...r,ref:n,onCloseAutoFocus:E(e.onCloseAutoFocus,s=>{var l;i.current||(l=a.triggerRef.current)==null||l.focus(),i.current=!1,s.preventDefault()}),onInteractOutside:E(e.onInteractOutside,s=>{const l=s.detail.originalEvent,c=l.button===0&&l.ctrlKey===!0,m=l.button===2||c;(!a.modal||m)&&(i.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});uo.displayName=lo;var $c="DropdownMenuGroup",Kc=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Ec,{...a,...r,ref:n})});Kc.displayName=$c;var Vc="DropdownMenuLabel",co=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Pc,{...a,...r,ref:n})});co.displayName=Vc;var Wc="DropdownMenuItem",po=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Tc,{...a,...r,ref:n})});po.displayName=Wc;var Qc="DropdownMenuCheckboxItem",mo=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(jc,{...a,...r,ref:n})});mo.displayName=Qc;var Yc="DropdownMenuRadioGroup",Jc=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Oc,{...a,...r,ref:n})});Jc.displayName=Yc;var Xc="DropdownMenuRadioItem",fo=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Lc,{...a,...r,ref:n})});fo.displayName=Xc;var Zc="DropdownMenuItemIndicator",vo=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Dc,{...a,...r,ref:n})});vo.displayName=Zc;var ed="DropdownMenuSeparator",go=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Fc,{...a,...r,ref:n})});go.displayName=ed;var nd="DropdownMenuArrow",td=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Gc,{...a,...r,ref:n})});td.displayName=nd;var rd="DropdownMenuSubTrigger",ho=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(Bc,{...a,...r,ref:n})});ho.displayName=rd;var ad="DropdownMenuSubContent",bo=p.forwardRef((e,n)=>{const{__scopeDropdownMenu:t,...r}=e,a=Q(t);return u.jsx(qc,{...a,...r,ref:n,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});bo.displayName=ad;var od=ao,id=io,sd=so,xo=uo,yo=co,wo=po,Ao=mo,_o=fo,Co=vo,Io=go,So=ho,ko=bo;const ld=od,ud=id,cd=p.forwardRef(({className:e,inset:n,children:t,...r},a)=>u.jsxs(So,{ref:a,className:P("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",n&&"pl-8",e),...r,children:[t,u.jsx($r,{className:"ml-auto h-4 w-4"})]}));cd.displayName=So.displayName;const dd=p.forwardRef(({className:e,...n},t)=>u.jsx(ko,{ref:t,className:P("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...n}));dd.displayName=ko.displayName;const No=p.forwardRef(({className:e,sideOffset:n=4,...t},r)=>u.jsx(sd,{children:u.jsx(xo,{ref:r,sideOffset:n,className:P("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...t})}));No.displayName=xo.displayName;const Mo=p.forwardRef(({className:e,inset:n,...t},r)=>u.jsx(wo,{ref:r,className:P("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",n&&"pl-8",e),...t}));Mo.displayName=wo.displayName;const pd=p.forwardRef(({className:e,children:n,checked:t,...r},a)=>u.jsxs(Ao,{ref:a,className:P("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),checked:t,...r,children:[u.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:u.jsx(Co,{children:u.jsx(At,{className:"h-4 w-4"})})}),n]}));pd.displayName=Ao.displayName;const md=p.forwardRef(({className:e,children:n,...t},r)=>u.jsxs(_o,{ref:r,className:P("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...t,children:[u.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:u.jsx(Co,{children:u.jsx(Kr,{className:"h-2 w-2 fill-current"})})}),n]}));md.displayName=_o.displayName;const fd=p.forwardRef(({className:e,inset:n,...t},r)=>u.jsx(yo,{ref:r,className:P("px-2 py-1.5 text-sm font-semibold",n&&"pl-8",e),...t}));fd.displayName=yo.displayName;const vd=p.forwardRef(({className:e,...n},t)=>u.jsx(Io,{ref:t,className:P("-mx-1 my-1 h-px bg-muted",e),...n}));vd.displayName=Io.displayName;const dr="user-preferences";function gd(){const[e,n]=p.useState(()=>{try{const r=localStorage.getItem(dr);return r?JSON.parse(r):{language:"en"}}catch{return{language:"en"}}});return{preferences:e,updatePreferences:r=>{const a={...e,...r};n(a);try{localStorage.setItem(dr,JSON.stringify(a))}catch{}}}}const Xn=[{code:"en",name:"English",flag:"🇺🇸"},{code:"fr",name:"Français",flag:"🇫🇷"}];function hd(){const{i18n:e,t:n}=Ue(),{preferences:t,updatePreferences:r}=gd(),a=Xn.find(i=>i.code===e.language)||Xn[0],o=i=>{r({language:i}),e.changeLanguage(i)};return u.jsxs(ld,{children:[u.jsx(ud,{asChild:!0,children:u.jsxs(In,{variant:"outline",size:"sm",className:"gap-2",children:[u.jsx(gs,{className:"h-4 w-4"}),u.jsx("span",{className:"hidden sm:inline",children:a.name}),u.jsx("span",{className:"text-lg",children:a.flag})]})}),u.jsx(No,{align:"end",children:Xn.map(i=>u.jsxs(Mo,{onClick:()=>o(i.code),className:"gap-2",children:[u.jsx("span",{className:"text-lg",children:i.flag}),i.name,e.language===i.code&&u.jsx("span",{className:"ml-auto text-xs text-muted-foreground",children:"✓"})]},i.code))})]})}var Dt="Radio",[bd,Ro]=mn(Dt),[xd,yd]=bd(Dt),Eo=p.forwardRef((e,n)=>{const{__scopeRadio:t,name:r,checked:a=!1,required:o,disabled:i,value:s="on",onCheck:l,form:c,...m}=e,[d,f]=p.useState(null),h=ue(n,g=>f(g)),v=p.useRef(!1),b=d?c||!!d.closest("form"):!0;return u.jsxs(xd,{scope:t,checked:a,disabled:i,children:[u.jsx(K.button,{type:"button",role:"radio","aria-checked":a,"data-state":jo(a),"data-disabled":i?"":void 0,disabled:i,value:s,...m,ref:h,onClick:E(e.onClick,g=>{a||l==null||l(),b&&(v.current=g.isPropagationStopped(),v.current||g.stopPropagation())})}),b&&u.jsx(wd,{control:d,bubbles:!v.current,name:r,value:s,checked:a,required:o,disabled:i,form:c,style:{transform:"translateX(-100%)"}})]})});Eo.displayName=Dt;var Po="RadioIndicator",To=p.forwardRef((e,n)=>{const{__scopeRadio:t,forceMount:r,...a}=e,o=yd(Po,t);return u.jsx(Be,{present:r||o.checked,children:u.jsx(K.span,{"data-state":jo(o.checked),"data-disabled":o.disabled?"":void 0,...a,ref:n})})});To.displayName=Po;var wd=e=>{const{control:n,checked:t,bubbles:r=!0,...a}=e,o=p.useRef(null),i=Rr(t),s=Er(n);return p.useEffect(()=>{const l=o.current,c=window.HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(c,"checked").set;if(i!==t&&d){const f=new Event("click",{bubbles:r});d.call(l,t),l.dispatchEvent(f)}},[i,t,r]),u.jsx("input",{type:"radio","aria-hidden":!0,defaultChecked:t,...a,tabIndex:-1,ref:o,style:{...e.style,...s,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function jo(e){return e?"checked":"unchecked"}var Ad=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],Ft="RadioGroup",[_d,cv]=mn(Ft,[zn,Ro]),Oo=zn(),Lo=Ro(),[Cd,Id]=_d(Ft),Do=p.forwardRef((e,n)=>{const{__scopeRadioGroup:t,name:r,defaultValue:a,value:o,required:i=!1,disabled:s=!1,orientation:l,dir:c,loop:m=!0,onValueChange:d,...f}=e,h=Oo(t),v=yt(c),[b,g]=On({prop:o,defaultProp:a,onChange:d});return u.jsx(Cd,{scope:t,name:r,required:i,disabled:s,value:b,onValueChange:g,children:u.jsx(Pa,{asChild:!0,...h,orientation:l,dir:v,loop:m,children:u.jsx(K.div,{role:"radiogroup","aria-required":i,"aria-orientation":l,"data-disabled":s?"":void 0,dir:v,...f,ref:n})})})});Do.displayName=Ft;var Fo="RadioGroupItem",Go=p.forwardRef((e,n)=>{const{__scopeRadioGroup:t,disabled:r,...a}=e,o=Id(Fo,t),i=o.disabled||r,s=Oo(t),l=Lo(t),c=p.useRef(null),m=ue(n,c),d=o.value===a.value,f=p.useRef(!1);return p.useEffect(()=>{const h=b=>{Ad.includes(b.key)&&(f.current=!0)},v=()=>f.current=!1;return document.addEventListener("keydown",h),document.addEventListener("keyup",v),()=>{document.removeEventListener("keydown",h),document.removeEventListener("keyup",v)}},[]),u.jsx(Ta,{asChild:!0,...s,focusable:!i,active:d,children:u.jsx(Eo,{disabled:i,required:o.required,checked:d,...l,...a,name:o.name,ref:m,onCheck:()=>o.onValueChange(a.value),onKeyDown:E(h=>{h.key==="Enter"&&h.preventDefault()}),onFocus:E(a.onFocus,()=>{var h;f.current&&((h=c.current)==null||h.click())})})})});Go.displayName=Fo;var Sd="RadioGroupIndicator",Bo=p.forwardRef((e,n)=>{const{__scopeRadioGroup:t,...r}=e,a=Lo(t);return u.jsx(To,{...a,...r,ref:n})});Bo.displayName=Sd;var qo=Do,zo=Go,kd=Bo;const Mn=p.forwardRef(({className:e,...n},t)=>u.jsx(qo,{className:P("grid gap-2",e),...n,ref:t}));Mn.displayName=qo.displayName;const rn=p.forwardRef(({className:e,...n},t)=>u.jsx(zo,{ref:t,className:P("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),...n,children:u.jsx(kd,{className:"flex items-center justify-center",children:u.jsx(Kr,{className:"h-2.5 w-2.5 fill-current text-current"})})}));rn.displayName=zo.displayName;function Nd({options:e,value:n,onChange:t,maxRank:r}){const[a,o]=p.useState(null),i=(d,f)=>{o(f),d.dataTransfer.effectAllowed="move"},s=d=>{d.preventDefault(),d.dataTransfer.dropEffect="move"},l=(d,f)=>{if(d.preventDefault(),!a)return;const h=[...n],v=h.indexOf(a);v>-1&&h.splice(v,1),h.splice(f,0,a),t(h.slice(0,r)),o(null)},c=d=>{const f=[...n],h=f.indexOf(d);h>-1?f.splice(h,1):f.length<r&&f.push(d),t(f)},m=d=>{const f=n.indexOf(d);return f>-1?f+1:null};return u.jsxs("div",{className:"mt-4 space-y-4",children:[u.jsxs("div",{className:"text-sm text-muted-foreground",children:["Click or drag to rank your top ",r," choices (1 = highest priority)"]}),u.jsx("div",{className:"grid gap-3",children:e.map((d,f)=>{const h=m(d.value),v=h!==null;return u.jsx(xe,{className:`p-4 cursor-pointer transition-all duration-200 ${v?"bg-primary/10 border-primary shadow-md":"hover:bg-muted/50 hover:border-border"}`,draggable:!0,onDragStart:b=>i(b,d.value),onDragOver:s,onDrop:b=>l(b,f),onClick:()=>c(d.value),children:u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsx("span",{className:"font-medium",children:d.label}),v&&u.jsxs(Ce,{variant:"default",className:"bg-primary",children:["#",h]})]})},d.value)})}),n.length>0&&u.jsxs("div",{className:"mt-6 p-4 bg-accent/50 rounded-lg",children:[u.jsx("h4",{className:"font-medium mb-2",children:"Your Rankings:"}),u.jsx("div",{className:"space-y-1",children:n.map((d,f)=>{const h=e.find(v=>v.value===d);return u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsxs(Ce,{variant:"outline",children:["#",f+1]}),u.jsx("span",{children:h==null?void 0:h.label})]},d)})})]})]})}function Md({options:e,value:n,onChange:t}){const r=(a,o)=>{const i=[...n];if(o)i.includes(a)||i.push(a);else{const s=i.indexOf(a);s>-1&&i.splice(s,1)}t(i)};return u.jsxs("div",{className:"mt-4 space-y-3",children:[u.jsx("div",{className:"text-sm text-muted-foreground mb-3",children:"Select all that apply"}),e.map(a=>u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(fn,{id:a.value,checked:n.includes(a.value),onCheckedChange:o=>r(a.value,o)}),u.jsx(Z,{htmlFor:a.value,className:"font-normal cursor-pointer text-sm",children:a.label})]},a.value)),n.length>0&&u.jsxs("div",{className:"mt-4 p-3 bg-accent/50 rounded-lg",children:[u.jsx("div",{className:"text-sm font-medium mb-1",children:"Selected:"}),u.jsx("div",{className:"text-sm text-muted-foreground",children:n.map(a=>{const o=e.find(i=>i.value===a);return o==null?void 0:o.label}).join(", ")})]})]})}function Rd({rows:e,columns:n,value:t,onChange:r}){const a=(o,i)=>{r({...t,[o]:i})};return u.jsx("div",{className:"mt-4 overflow-x-auto",children:u.jsxs("table",{className:"w-full border-collapse",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{className:"text-left"}),n.map(o=>u.jsx("th",{className:"px-4 py-2 text-center text-sm font-medium",children:o.label},o.value))]})}),u.jsx("tbody",{children:e.map(o=>u.jsxs("tr",{className:"border-t",children:[u.jsx("td",{className:"pr-4 py-2 text-sm",children:o.label}),n.map(i=>u.jsx("td",{className:"text-center py-2",children:u.jsx("input",{type:"radio",id:`${o.value}-${i.value}`,name:o.value,value:i.value,checked:t[o.value]===i.value,onChange:()=>a(o.value,i.value),className:"h-4 w-4 border-primary text-primary focus:ring-primary"})},i.value))]},o.value))})]})})}const Ed=Xi,Pd=Zi,Td=es;/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */function Ho(e){return typeof e>"u"||e===null}function jd(e){return typeof e=="object"&&e!==null}function Od(e){return Array.isArray(e)?e:Ho(e)?[]:[e]}function Ld(e,n){var t,r,a,o;if(n)for(o=Object.keys(n),t=0,r=o.length;t<r;t+=1)a=o[t],e[a]=n[a];return e}function Dd(e,n){var t="",r;for(r=0;r<n;r+=1)t+=e;return t}function Fd(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}var Gd=Ho,Bd=jd,qd=Od,zd=Dd,Hd=Fd,Ud=Ld,H={isNothing:Gd,isObject:Bd,toArray:qd,repeat:zd,isNegativeZero:Hd,extend:Ud};function Uo(e,n){var t="",r=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(t+='in "'+e.mark.name+'" '),t+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!n&&e.mark.snippet&&(t+=`

`+e.mark.snippet),r+" "+t):r}function an(e,n){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=n,this.message=Uo(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}an.prototype=Object.create(Error.prototype);an.prototype.constructor=an;an.prototype.toString=function(n){return this.name+": "+Uo(this,n)};var W=an;function Zn(e,n,t,r,a){var o="",i="",s=Math.floor(a/2)-1;return r-n>s&&(o=" ... ",n=r-s+o.length),t-r>s&&(i=" ...",t=r+s-i.length),{str:o+e.slice(n,t).replace(/\t/g,"→")+i,pos:r-n+o.length}}function et(e,n){return H.repeat(" ",n-e.length)+e}function $d(e,n){if(n=Object.create(n||null),!e.buffer)return null;n.maxLength||(n.maxLength=79),typeof n.indent!="number"&&(n.indent=1),typeof n.linesBefore!="number"&&(n.linesBefore=3),typeof n.linesAfter!="number"&&(n.linesAfter=2);for(var t=/\r?\n|\r|\0/g,r=[0],a=[],o,i=-1;o=t.exec(e.buffer);)a.push(o.index),r.push(o.index+o[0].length),e.position<=o.index&&i<0&&(i=r.length-2);i<0&&(i=r.length-1);var s="",l,c,m=Math.min(e.line+n.linesAfter,a.length).toString().length,d=n.maxLength-(n.indent+m+3);for(l=1;l<=n.linesBefore&&!(i-l<0);l++)c=Zn(e.buffer,r[i-l],a[i-l],e.position-(r[i]-r[i-l]),d),s=H.repeat(" ",n.indent)+et((e.line-l+1).toString(),m)+" | "+c.str+`
`+s;for(c=Zn(e.buffer,r[i],a[i],e.position,d),s+=H.repeat(" ",n.indent)+et((e.line+1).toString(),m)+" | "+c.str+`
`,s+=H.repeat("-",n.indent+m+3+c.pos)+`^
`,l=1;l<=n.linesAfter&&!(i+l>=a.length);l++)c=Zn(e.buffer,r[i+l],a[i+l],e.position-(r[i]-r[i+l]),d),s+=H.repeat(" ",n.indent)+et((e.line+l+1).toString(),m)+" | "+c.str+`
`;return s.replace(/\n$/,"")}var Kd=$d,Vd=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],Wd=["scalar","sequence","mapping"];function Qd(e){var n={};return e!==null&&Object.keys(e).forEach(function(t){e[t].forEach(function(r){n[String(r)]=t})}),n}function Yd(e,n){if(n=n||{},Object.keys(n).forEach(function(t){if(Vd.indexOf(t)===-1)throw new W('Unknown option "'+t+'" is met in definition of "'+e+'" YAML type.')}),this.options=n,this.tag=e,this.kind=n.kind||null,this.resolve=n.resolve||function(){return!0},this.construct=n.construct||function(t){return t},this.instanceOf=n.instanceOf||null,this.predicate=n.predicate||null,this.represent=n.represent||null,this.representName=n.representName||null,this.defaultStyle=n.defaultStyle||null,this.multi=n.multi||!1,this.styleAliases=Qd(n.styleAliases||null),Wd.indexOf(this.kind)===-1)throw new W('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var $=Yd;function pr(e,n){var t=[];return e[n].forEach(function(r){var a=t.length;t.forEach(function(o,i){o.tag===r.tag&&o.kind===r.kind&&o.multi===r.multi&&(a=i)}),t[a]=r}),t}function Jd(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},n,t;function r(a){a.multi?(e.multi[a.kind].push(a),e.multi.fallback.push(a)):e[a.kind][a.tag]=e.fallback[a.tag]=a}for(n=0,t=arguments.length;n<t;n+=1)arguments[n].forEach(r);return e}function mt(e){return this.extend(e)}mt.prototype.extend=function(n){var t=[],r=[];if(n instanceof $)r.push(n);else if(Array.isArray(n))r=r.concat(n);else if(n&&(Array.isArray(n.implicit)||Array.isArray(n.explicit)))n.implicit&&(t=t.concat(n.implicit)),n.explicit&&(r=r.concat(n.explicit));else throw new W("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");t.forEach(function(o){if(!(o instanceof $))throw new W("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(o.loadKind&&o.loadKind!=="scalar")throw new W("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(o.multi)throw new W("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),r.forEach(function(o){if(!(o instanceof $))throw new W("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var a=Object.create(mt.prototype);return a.implicit=(this.implicit||[]).concat(t),a.explicit=(this.explicit||[]).concat(r),a.compiledImplicit=pr(a,"implicit"),a.compiledExplicit=pr(a,"explicit"),a.compiledTypeMap=Jd(a.compiledImplicit,a.compiledExplicit),a};var $o=mt,Ko=new $("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}}),Vo=new $("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}}),Wo=new $("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}}),Qo=new $o({explicit:[Ko,Vo,Wo]});function Xd(e){if(e===null)return!0;var n=e.length;return n===1&&e==="~"||n===4&&(e==="null"||e==="Null"||e==="NULL")}function Zd(){return null}function ep(e){return e===null}var Yo=new $("tag:yaml.org,2002:null",{kind:"scalar",resolve:Xd,construct:Zd,predicate:ep,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function np(e){if(e===null)return!1;var n=e.length;return n===4&&(e==="true"||e==="True"||e==="TRUE")||n===5&&(e==="false"||e==="False"||e==="FALSE")}function tp(e){return e==="true"||e==="True"||e==="TRUE"}function rp(e){return Object.prototype.toString.call(e)==="[object Boolean]"}var Jo=new $("tag:yaml.org,2002:bool",{kind:"scalar",resolve:np,construct:tp,predicate:rp,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function ap(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function op(e){return 48<=e&&e<=55}function ip(e){return 48<=e&&e<=57}function sp(e){if(e===null)return!1;var n=e.length,t=0,r=!1,a;if(!n)return!1;if(a=e[t],(a==="-"||a==="+")&&(a=e[++t]),a==="0"){if(t+1===n)return!0;if(a=e[++t],a==="b"){for(t++;t<n;t++)if(a=e[t],a!=="_"){if(a!=="0"&&a!=="1")return!1;r=!0}return r&&a!=="_"}if(a==="x"){for(t++;t<n;t++)if(a=e[t],a!=="_"){if(!ap(e.charCodeAt(t)))return!1;r=!0}return r&&a!=="_"}if(a==="o"){for(t++;t<n;t++)if(a=e[t],a!=="_"){if(!op(e.charCodeAt(t)))return!1;r=!0}return r&&a!=="_"}}if(a==="_")return!1;for(;t<n;t++)if(a=e[t],a!=="_"){if(!ip(e.charCodeAt(t)))return!1;r=!0}return!(!r||a==="_")}function lp(e){var n=e,t=1,r;if(n.indexOf("_")!==-1&&(n=n.replace(/_/g,"")),r=n[0],(r==="-"||r==="+")&&(r==="-"&&(t=-1),n=n.slice(1),r=n[0]),n==="0")return 0;if(r==="0"){if(n[1]==="b")return t*parseInt(n.slice(2),2);if(n[1]==="x")return t*parseInt(n.slice(2),16);if(n[1]==="o")return t*parseInt(n.slice(2),8)}return t*parseInt(n,10)}function up(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!H.isNegativeZero(e)}var Xo=new $("tag:yaml.org,2002:int",{kind:"scalar",resolve:sp,construct:lp,predicate:up,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),cp=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function dp(e){return!(e===null||!cp.test(e)||e[e.length-1]==="_")}function pp(e){var n,t;return n=e.replace(/_/g,"").toLowerCase(),t=n[0]==="-"?-1:1,"+-".indexOf(n[0])>=0&&(n=n.slice(1)),n===".inf"?t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:n===".nan"?NaN:t*parseFloat(n,10)}var mp=/^[-+]?[0-9]+e/;function fp(e,n){var t;if(isNaN(e))switch(n){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(n){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(n){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(H.isNegativeZero(e))return"-0.0";return t=e.toString(10),mp.test(t)?t.replace("e",".e"):t}function vp(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||H.isNegativeZero(e))}var Zo=new $("tag:yaml.org,2002:float",{kind:"scalar",resolve:dp,construct:pp,predicate:vp,represent:fp,defaultStyle:"lowercase"}),ei=Qo.extend({implicit:[Yo,Jo,Xo,Zo]}),ni=ei,ti=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),ri=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function gp(e){return e===null?!1:ti.exec(e)!==null||ri.exec(e)!==null}function hp(e){var n,t,r,a,o,i,s,l=0,c=null,m,d,f;if(n=ti.exec(e),n===null&&(n=ri.exec(e)),n===null)throw new Error("Date resolve error");if(t=+n[1],r=+n[2]-1,a=+n[3],!n[4])return new Date(Date.UTC(t,r,a));if(o=+n[4],i=+n[5],s=+n[6],n[7]){for(l=n[7].slice(0,3);l.length<3;)l+="0";l=+l}return n[9]&&(m=+n[10],d=+(n[11]||0),c=(m*60+d)*6e4,n[9]==="-"&&(c=-c)),f=new Date(Date.UTC(t,r,a,o,i,s,l)),c&&f.setTime(f.getTime()-c),f}function bp(e){return e.toISOString()}var ai=new $("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:gp,construct:hp,instanceOf:Date,represent:bp});function xp(e){return e==="<<"||e===null}var oi=new $("tag:yaml.org,2002:merge",{kind:"scalar",resolve:xp}),Gt=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function yp(e){if(e===null)return!1;var n,t,r=0,a=e.length,o=Gt;for(t=0;t<a;t++)if(n=o.indexOf(e.charAt(t)),!(n>64)){if(n<0)return!1;r+=6}return r%8===0}function wp(e){var n,t,r=e.replace(/[\r\n=]/g,""),a=r.length,o=Gt,i=0,s=[];for(n=0;n<a;n++)n%4===0&&n&&(s.push(i>>16&255),s.push(i>>8&255),s.push(i&255)),i=i<<6|o.indexOf(r.charAt(n));return t=a%4*6,t===0?(s.push(i>>16&255),s.push(i>>8&255),s.push(i&255)):t===18?(s.push(i>>10&255),s.push(i>>2&255)):t===12&&s.push(i>>4&255),new Uint8Array(s)}function Ap(e){var n="",t=0,r,a,o=e.length,i=Gt;for(r=0;r<o;r++)r%3===0&&r&&(n+=i[t>>18&63],n+=i[t>>12&63],n+=i[t>>6&63],n+=i[t&63]),t=(t<<8)+e[r];return a=o%3,a===0?(n+=i[t>>18&63],n+=i[t>>12&63],n+=i[t>>6&63],n+=i[t&63]):a===2?(n+=i[t>>10&63],n+=i[t>>4&63],n+=i[t<<2&63],n+=i[64]):a===1&&(n+=i[t>>2&63],n+=i[t<<4&63],n+=i[64],n+=i[64]),n}function _p(e){return Object.prototype.toString.call(e)==="[object Uint8Array]"}var ii=new $("tag:yaml.org,2002:binary",{kind:"scalar",resolve:yp,construct:wp,predicate:_p,represent:Ap}),Cp=Object.prototype.hasOwnProperty,Ip=Object.prototype.toString;function Sp(e){if(e===null)return!0;var n=[],t,r,a,o,i,s=e;for(t=0,r=s.length;t<r;t+=1){if(a=s[t],i=!1,Ip.call(a)!=="[object Object]")return!1;for(o in a)if(Cp.call(a,o))if(!i)i=!0;else return!1;if(!i)return!1;if(n.indexOf(o)===-1)n.push(o);else return!1}return!0}function kp(e){return e!==null?e:[]}var si=new $("tag:yaml.org,2002:omap",{kind:"sequence",resolve:Sp,construct:kp}),Np=Object.prototype.toString;function Mp(e){if(e===null)return!0;var n,t,r,a,o,i=e;for(o=new Array(i.length),n=0,t=i.length;n<t;n+=1){if(r=i[n],Np.call(r)!=="[object Object]"||(a=Object.keys(r),a.length!==1))return!1;o[n]=[a[0],r[a[0]]]}return!0}function Rp(e){if(e===null)return[];var n,t,r,a,o,i=e;for(o=new Array(i.length),n=0,t=i.length;n<t;n+=1)r=i[n],a=Object.keys(r),o[n]=[a[0],r[a[0]]];return o}var li=new $("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:Mp,construct:Rp}),Ep=Object.prototype.hasOwnProperty;function Pp(e){if(e===null)return!0;var n,t=e;for(n in t)if(Ep.call(t,n)&&t[n]!==null)return!1;return!0}function Tp(e){return e!==null?e:{}}var ui=new $("tag:yaml.org,2002:set",{kind:"mapping",resolve:Pp,construct:Tp}),Bt=ni.extend({implicit:[ai,oi],explicit:[ii,si,li,ui]}),ye=Object.prototype.hasOwnProperty,Rn=1,ci=2,di=3,En=4,nt=1,jp=2,mr=3,Op=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Lp=/[\x85\u2028\u2029]/,Dp=/[,\[\]\{\}]/,pi=/^(?:!|!!|![a-z\-]+!)$/i,mi=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function fr(e){return Object.prototype.toString.call(e)}function te(e){return e===10||e===13}function Se(e){return e===9||e===32}function Y(e){return e===9||e===32||e===10||e===13}function je(e){return e===44||e===91||e===93||e===123||e===125}function Fp(e){var n;return 48<=e&&e<=57?e-48:(n=e|32,97<=n&&n<=102?n-97+10:-1)}function Gp(e){return e===120?2:e===117?4:e===85?8:0}function Bp(e){return 48<=e&&e<=57?e-48:-1}function vr(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function qp(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}var fi=new Array(256),vi=new Array(256);for(var Pe=0;Pe<256;Pe++)fi[Pe]=vr(Pe)?1:0,vi[Pe]=vr(Pe);function zp(e,n){this.input=e,this.filename=n.filename||null,this.schema=n.schema||Bt,this.onWarning=n.onWarning||null,this.legacy=n.legacy||!1,this.json=n.json||!1,this.listener=n.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function gi(e,n){var t={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return t.snippet=Kd(t),new W(n,t)}function I(e,n){throw gi(e,n)}function Pn(e,n){e.onWarning&&e.onWarning.call(null,gi(e,n))}var gr={YAML:function(n,t,r){var a,o,i;n.version!==null&&I(n,"duplication of %YAML directive"),r.length!==1&&I(n,"YAML directive accepts exactly one argument"),a=/^([0-9]+)\.([0-9]+)$/.exec(r[0]),a===null&&I(n,"ill-formed argument of the YAML directive"),o=parseInt(a[1],10),i=parseInt(a[2],10),o!==1&&I(n,"unacceptable YAML version of the document"),n.version=r[0],n.checkLineBreaks=i<2,i!==1&&i!==2&&Pn(n,"unsupported YAML version of the document")},TAG:function(n,t,r){var a,o;r.length!==2&&I(n,"TAG directive accepts exactly two arguments"),a=r[0],o=r[1],pi.test(a)||I(n,"ill-formed tag handle (first argument) of the TAG directive"),ye.call(n.tagMap,a)&&I(n,'there is a previously declared suffix for "'+a+'" tag handle'),mi.test(o)||I(n,"ill-formed tag prefix (second argument) of the TAG directive");try{o=decodeURIComponent(o)}catch{I(n,"tag prefix is malformed: "+o)}n.tagMap[a]=o}};function be(e,n,t,r){var a,o,i,s;if(n<t){if(s=e.input.slice(n,t),r)for(a=0,o=s.length;a<o;a+=1)i=s.charCodeAt(a),i===9||32<=i&&i<=1114111||I(e,"expected valid JSON character");else Op.test(s)&&I(e,"the stream contains non-printable characters");e.result+=s}}function hr(e,n,t,r){var a,o,i,s;for(H.isObject(t)||I(e,"cannot merge mappings; the provided source object is unacceptable"),a=Object.keys(t),i=0,s=a.length;i<s;i+=1)o=a[i],ye.call(n,o)||(n[o]=t[o],r[o]=!0)}function Oe(e,n,t,r,a,o,i,s,l){var c,m;if(Array.isArray(a))for(a=Array.prototype.slice.call(a),c=0,m=a.length;c<m;c+=1)Array.isArray(a[c])&&I(e,"nested arrays are not supported inside keys"),typeof a=="object"&&fr(a[c])==="[object Object]"&&(a[c]="[object Object]");if(typeof a=="object"&&fr(a)==="[object Object]"&&(a="[object Object]"),a=String(a),n===null&&(n={}),r==="tag:yaml.org,2002:merge")if(Array.isArray(o))for(c=0,m=o.length;c<m;c+=1)hr(e,n,o[c],t);else hr(e,n,o,t);else!e.json&&!ye.call(t,a)&&ye.call(n,a)&&(e.line=i||e.line,e.lineStart=s||e.lineStart,e.position=l||e.position,I(e,"duplicated mapping key")),a==="__proto__"?Object.defineProperty(n,a,{configurable:!0,enumerable:!0,writable:!0,value:o}):n[a]=o,delete t[a];return n}function qt(e){var n;n=e.input.charCodeAt(e.position),n===10?e.position++:n===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):I(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function z(e,n,t){for(var r=0,a=e.input.charCodeAt(e.position);a!==0;){for(;Se(a);)a===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),a=e.input.charCodeAt(++e.position);if(n&&a===35)do a=e.input.charCodeAt(++e.position);while(a!==10&&a!==13&&a!==0);if(te(a))for(qt(e),a=e.input.charCodeAt(e.position),r++,e.lineIndent=0;a===32;)e.lineIndent++,a=e.input.charCodeAt(++e.position);else break}return t!==-1&&r!==0&&e.lineIndent<t&&Pn(e,"deficient indentation"),r}function $n(e){var n=e.position,t;return t=e.input.charCodeAt(n),!!((t===45||t===46)&&t===e.input.charCodeAt(n+1)&&t===e.input.charCodeAt(n+2)&&(n+=3,t=e.input.charCodeAt(n),t===0||Y(t)))}function zt(e,n){n===1?e.result+=" ":n>1&&(e.result+=H.repeat(`
`,n-1))}function Hp(e,n,t){var r,a,o,i,s,l,c,m,d=e.kind,f=e.result,h;if(h=e.input.charCodeAt(e.position),Y(h)||je(h)||h===35||h===38||h===42||h===33||h===124||h===62||h===39||h===34||h===37||h===64||h===96||(h===63||h===45)&&(a=e.input.charCodeAt(e.position+1),Y(a)||t&&je(a)))return!1;for(e.kind="scalar",e.result="",o=i=e.position,s=!1;h!==0;){if(h===58){if(a=e.input.charCodeAt(e.position+1),Y(a)||t&&je(a))break}else if(h===35){if(r=e.input.charCodeAt(e.position-1),Y(r))break}else{if(e.position===e.lineStart&&$n(e)||t&&je(h))break;if(te(h))if(l=e.line,c=e.lineStart,m=e.lineIndent,z(e,!1,-1),e.lineIndent>=n){s=!0,h=e.input.charCodeAt(e.position);continue}else{e.position=i,e.line=l,e.lineStart=c,e.lineIndent=m;break}}s&&(be(e,o,i,!1),zt(e,e.line-l),o=i=e.position,s=!1),Se(h)||(i=e.position+1),h=e.input.charCodeAt(++e.position)}return be(e,o,i,!1),e.result?!0:(e.kind=d,e.result=f,!1)}function Up(e,n){var t,r,a;if(t=e.input.charCodeAt(e.position),t!==39)return!1;for(e.kind="scalar",e.result="",e.position++,r=a=e.position;(t=e.input.charCodeAt(e.position))!==0;)if(t===39)if(be(e,r,e.position,!0),t=e.input.charCodeAt(++e.position),t===39)r=e.position,e.position++,a=e.position;else return!0;else te(t)?(be(e,r,a,!0),zt(e,z(e,!1,n)),r=a=e.position):e.position===e.lineStart&&$n(e)?I(e,"unexpected end of the document within a single quoted scalar"):(e.position++,a=e.position);I(e,"unexpected end of the stream within a single quoted scalar")}function $p(e,n){var t,r,a,o,i,s;if(s=e.input.charCodeAt(e.position),s!==34)return!1;for(e.kind="scalar",e.result="",e.position++,t=r=e.position;(s=e.input.charCodeAt(e.position))!==0;){if(s===34)return be(e,t,e.position,!0),e.position++,!0;if(s===92){if(be(e,t,e.position,!0),s=e.input.charCodeAt(++e.position),te(s))z(e,!1,n);else if(s<256&&fi[s])e.result+=vi[s],e.position++;else if((i=Gp(s))>0){for(a=i,o=0;a>0;a--)s=e.input.charCodeAt(++e.position),(i=Fp(s))>=0?o=(o<<4)+i:I(e,"expected hexadecimal character");e.result+=qp(o),e.position++}else I(e,"unknown escape sequence");t=r=e.position}else te(s)?(be(e,t,r,!0),zt(e,z(e,!1,n)),t=r=e.position):e.position===e.lineStart&&$n(e)?I(e,"unexpected end of the document within a double quoted scalar"):(e.position++,r=e.position)}I(e,"unexpected end of the stream within a double quoted scalar")}function Kp(e,n){var t=!0,r,a,o,i=e.tag,s,l=e.anchor,c,m,d,f,h,v=Object.create(null),b,g,y,x;if(x=e.input.charCodeAt(e.position),x===91)m=93,h=!1,s=[];else if(x===123)m=125,h=!0,s={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=s),x=e.input.charCodeAt(++e.position);x!==0;){if(z(e,!0,n),x=e.input.charCodeAt(e.position),x===m)return e.position++,e.tag=i,e.anchor=l,e.kind=h?"mapping":"sequence",e.result=s,!0;t?x===44&&I(e,"expected the node content, but found ','"):I(e,"missed comma between flow collection entries"),g=b=y=null,d=f=!1,x===63&&(c=e.input.charCodeAt(e.position+1),Y(c)&&(d=f=!0,e.position++,z(e,!0,n))),r=e.line,a=e.lineStart,o=e.position,Ge(e,n,Rn,!1,!0),g=e.tag,b=e.result,z(e,!0,n),x=e.input.charCodeAt(e.position),(f||e.line===r)&&x===58&&(d=!0,x=e.input.charCodeAt(++e.position),z(e,!0,n),Ge(e,n,Rn,!1,!0),y=e.result),h?Oe(e,s,v,g,b,y,r,a,o):d?s.push(Oe(e,null,v,g,b,y,r,a,o)):s.push(b),z(e,!0,n),x=e.input.charCodeAt(e.position),x===44?(t=!0,x=e.input.charCodeAt(++e.position)):t=!1}I(e,"unexpected end of the stream within a flow collection")}function Vp(e,n){var t,r,a=nt,o=!1,i=!1,s=n,l=0,c=!1,m,d;if(d=e.input.charCodeAt(e.position),d===124)r=!1;else if(d===62)r=!0;else return!1;for(e.kind="scalar",e.result="";d!==0;)if(d=e.input.charCodeAt(++e.position),d===43||d===45)nt===a?a=d===43?mr:jp:I(e,"repeat of a chomping mode identifier");else if((m=Bp(d))>=0)m===0?I(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):i?I(e,"repeat of an indentation width identifier"):(s=n+m-1,i=!0);else break;if(Se(d)){do d=e.input.charCodeAt(++e.position);while(Se(d));if(d===35)do d=e.input.charCodeAt(++e.position);while(!te(d)&&d!==0)}for(;d!==0;){for(qt(e),e.lineIndent=0,d=e.input.charCodeAt(e.position);(!i||e.lineIndent<s)&&d===32;)e.lineIndent++,d=e.input.charCodeAt(++e.position);if(!i&&e.lineIndent>s&&(s=e.lineIndent),te(d)){l++;continue}if(e.lineIndent<s){a===mr?e.result+=H.repeat(`
`,o?1+l:l):a===nt&&o&&(e.result+=`
`);break}for(r?Se(d)?(c=!0,e.result+=H.repeat(`
`,o?1+l:l)):c?(c=!1,e.result+=H.repeat(`
`,l+1)):l===0?o&&(e.result+=" "):e.result+=H.repeat(`
`,l):e.result+=H.repeat(`
`,o?1+l:l),o=!0,i=!0,l=0,t=e.position;!te(d)&&d!==0;)d=e.input.charCodeAt(++e.position);be(e,t,e.position,!1)}return!0}function br(e,n){var t,r=e.tag,a=e.anchor,o=[],i,s=!1,l;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=o),l=e.input.charCodeAt(e.position);l!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,I(e,"tab characters must not be used in indentation")),!(l!==45||(i=e.input.charCodeAt(e.position+1),!Y(i))));){if(s=!0,e.position++,z(e,!0,-1)&&e.lineIndent<=n){o.push(null),l=e.input.charCodeAt(e.position);continue}if(t=e.line,Ge(e,n,di,!1,!0),o.push(e.result),z(e,!0,-1),l=e.input.charCodeAt(e.position),(e.line===t||e.lineIndent>n)&&l!==0)I(e,"bad indentation of a sequence entry");else if(e.lineIndent<n)break}return s?(e.tag=r,e.anchor=a,e.kind="sequence",e.result=o,!0):!1}function Wp(e,n,t){var r,a,o,i,s,l,c=e.tag,m=e.anchor,d={},f=Object.create(null),h=null,v=null,b=null,g=!1,y=!1,x;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=d),x=e.input.charCodeAt(e.position);x!==0;){if(!g&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,I(e,"tab characters must not be used in indentation")),r=e.input.charCodeAt(e.position+1),o=e.line,(x===63||x===58)&&Y(r))x===63?(g&&(Oe(e,d,f,h,v,null,i,s,l),h=v=b=null),y=!0,g=!0,a=!0):g?(g=!1,a=!0):I(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,x=r;else{if(i=e.line,s=e.lineStart,l=e.position,!Ge(e,t,ci,!1,!0))break;if(e.line===o){for(x=e.input.charCodeAt(e.position);Se(x);)x=e.input.charCodeAt(++e.position);if(x===58)x=e.input.charCodeAt(++e.position),Y(x)||I(e,"a whitespace character is expected after the key-value separator within a block mapping"),g&&(Oe(e,d,f,h,v,null,i,s,l),h=v=b=null),y=!0,g=!1,a=!1,h=e.tag,v=e.result;else if(y)I(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=c,e.anchor=m,!0}else if(y)I(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=c,e.anchor=m,!0}if((e.line===o||e.lineIndent>n)&&(g&&(i=e.line,s=e.lineStart,l=e.position),Ge(e,n,En,!0,a)&&(g?v=e.result:b=e.result),g||(Oe(e,d,f,h,v,b,i,s,l),h=v=b=null),z(e,!0,-1),x=e.input.charCodeAt(e.position)),(e.line===o||e.lineIndent>n)&&x!==0)I(e,"bad indentation of a mapping entry");else if(e.lineIndent<n)break}return g&&Oe(e,d,f,h,v,null,i,s,l),y&&(e.tag=c,e.anchor=m,e.kind="mapping",e.result=d),y}function Qp(e){var n,t=!1,r=!1,a,o,i;if(i=e.input.charCodeAt(e.position),i!==33)return!1;if(e.tag!==null&&I(e,"duplication of a tag property"),i=e.input.charCodeAt(++e.position),i===60?(t=!0,i=e.input.charCodeAt(++e.position)):i===33?(r=!0,a="!!",i=e.input.charCodeAt(++e.position)):a="!",n=e.position,t){do i=e.input.charCodeAt(++e.position);while(i!==0&&i!==62);e.position<e.length?(o=e.input.slice(n,e.position),i=e.input.charCodeAt(++e.position)):I(e,"unexpected end of the stream within a verbatim tag")}else{for(;i!==0&&!Y(i);)i===33&&(r?I(e,"tag suffix cannot contain exclamation marks"):(a=e.input.slice(n-1,e.position+1),pi.test(a)||I(e,"named tag handle cannot contain such characters"),r=!0,n=e.position+1)),i=e.input.charCodeAt(++e.position);o=e.input.slice(n,e.position),Dp.test(o)&&I(e,"tag suffix cannot contain flow indicator characters")}o&&!mi.test(o)&&I(e,"tag name cannot contain such characters: "+o);try{o=decodeURIComponent(o)}catch{I(e,"tag name is malformed: "+o)}return t?e.tag=o:ye.call(e.tagMap,a)?e.tag=e.tagMap[a]+o:a==="!"?e.tag="!"+o:a==="!!"?e.tag="tag:yaml.org,2002:"+o:I(e,'undeclared tag handle "'+a+'"'),!0}function Yp(e){var n,t;if(t=e.input.charCodeAt(e.position),t!==38)return!1;for(e.anchor!==null&&I(e,"duplication of an anchor property"),t=e.input.charCodeAt(++e.position),n=e.position;t!==0&&!Y(t)&&!je(t);)t=e.input.charCodeAt(++e.position);return e.position===n&&I(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(n,e.position),!0}function Jp(e){var n,t,r;if(r=e.input.charCodeAt(e.position),r!==42)return!1;for(r=e.input.charCodeAt(++e.position),n=e.position;r!==0&&!Y(r)&&!je(r);)r=e.input.charCodeAt(++e.position);return e.position===n&&I(e,"name of an alias node must contain at least one character"),t=e.input.slice(n,e.position),ye.call(e.anchorMap,t)||I(e,'unidentified alias "'+t+'"'),e.result=e.anchorMap[t],z(e,!0,-1),!0}function Ge(e,n,t,r,a){var o,i,s,l=1,c=!1,m=!1,d,f,h,v,b,g;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=i=s=En===t||di===t,r&&z(e,!0,-1)&&(c=!0,e.lineIndent>n?l=1:e.lineIndent===n?l=0:e.lineIndent<n&&(l=-1)),l===1)for(;Qp(e)||Yp(e);)z(e,!0,-1)?(c=!0,s=o,e.lineIndent>n?l=1:e.lineIndent===n?l=0:e.lineIndent<n&&(l=-1)):s=!1;if(s&&(s=c||a),(l===1||En===t)&&(Rn===t||ci===t?b=n:b=n+1,g=e.position-e.lineStart,l===1?s&&(br(e,g)||Wp(e,g,b))||Kp(e,b)?m=!0:(i&&Vp(e,b)||Up(e,b)||$p(e,b)?m=!0:Jp(e)?(m=!0,(e.tag!==null||e.anchor!==null)&&I(e,"alias node should not have any properties")):Hp(e,b,Rn===t)&&(m=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):l===0&&(m=s&&br(e,g))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&I(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),d=0,f=e.implicitTypes.length;d<f;d+=1)if(v=e.implicitTypes[d],v.resolve(e.result)){e.result=v.construct(e.result),e.tag=v.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!=="!"){if(ye.call(e.typeMap[e.kind||"fallback"],e.tag))v=e.typeMap[e.kind||"fallback"][e.tag];else for(v=null,h=e.typeMap.multi[e.kind||"fallback"],d=0,f=h.length;d<f;d+=1)if(e.tag.slice(0,h[d].tag.length)===h[d].tag){v=h[d];break}v||I(e,"unknown tag !<"+e.tag+">"),e.result!==null&&v.kind!==e.kind&&I(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+v.kind+'", not "'+e.kind+'"'),v.resolve(e.result,e.tag)?(e.result=v.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):I(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||m}function Xp(e){var n=e.position,t,r,a,o=!1,i;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(i=e.input.charCodeAt(e.position))!==0&&(z(e,!0,-1),i=e.input.charCodeAt(e.position),!(e.lineIndent>0||i!==37));){for(o=!0,i=e.input.charCodeAt(++e.position),t=e.position;i!==0&&!Y(i);)i=e.input.charCodeAt(++e.position);for(r=e.input.slice(t,e.position),a=[],r.length<1&&I(e,"directive name must not be less than one character in length");i!==0;){for(;Se(i);)i=e.input.charCodeAt(++e.position);if(i===35){do i=e.input.charCodeAt(++e.position);while(i!==0&&!te(i));break}if(te(i))break;for(t=e.position;i!==0&&!Y(i);)i=e.input.charCodeAt(++e.position);a.push(e.input.slice(t,e.position))}i!==0&&qt(e),ye.call(gr,r)?gr[r](e,r,a):Pn(e,'unknown document directive "'+r+'"')}if(z(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,z(e,!0,-1)):o&&I(e,"directives end mark is expected"),Ge(e,e.lineIndent-1,En,!1,!0),z(e,!0,-1),e.checkLineBreaks&&Lp.test(e.input.slice(n,e.position))&&Pn(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&$n(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,z(e,!0,-1));return}if(e.position<e.length-1)I(e,"end of the stream or a document separator is expected");else return}function hi(e,n){e=String(e),n=n||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var t=new zp(e,n),r=e.indexOf("\0");for(r!==-1&&(t.position=r,I(t,"null byte is not allowed in input")),t.input+="\0";t.input.charCodeAt(t.position)===32;)t.lineIndent+=1,t.position+=1;for(;t.position<t.length-1;)Xp(t);return t.documents}function Zp(e,n,t){n!==null&&typeof n=="object"&&typeof t>"u"&&(t=n,n=null);var r=hi(e,t);if(typeof n!="function")return r;for(var a=0,o=r.length;a<o;a+=1)n(r[a])}function em(e,n){var t=hi(e,n);if(t.length!==0){if(t.length===1)return t[0];throw new W("expected a single document in the stream, but found more")}}var nm=Zp,tm=em,bi={loadAll:nm,load:tm},xi=Object.prototype.toString,yi=Object.prototype.hasOwnProperty,Ht=65279,rm=9,on=10,am=13,om=32,im=33,sm=34,ft=35,lm=37,um=38,cm=39,dm=42,wi=44,pm=45,Tn=58,mm=61,fm=62,vm=63,gm=64,Ai=91,_i=93,hm=96,Ci=123,bm=124,Ii=125,V={};V[0]="\\0";V[7]="\\a";V[8]="\\b";V[9]="\\t";V[10]="\\n";V[11]="\\v";V[12]="\\f";V[13]="\\r";V[27]="\\e";V[34]='\\"';V[92]="\\\\";V[133]="\\N";V[160]="\\_";V[8232]="\\L";V[8233]="\\P";var xm=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],ym=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function wm(e,n){var t,r,a,o,i,s,l;if(n===null)return{};for(t={},r=Object.keys(n),a=0,o=r.length;a<o;a+=1)i=r[a],s=String(n[i]),i.slice(0,2)==="!!"&&(i="tag:yaml.org,2002:"+i.slice(2)),l=e.compiledTypeMap.fallback[i],l&&yi.call(l.styleAliases,s)&&(s=l.styleAliases[s]),t[i]=s;return t}function Am(e){var n,t,r;if(n=e.toString(16).toUpperCase(),e<=255)t="x",r=2;else if(e<=65535)t="u",r=4;else if(e<=4294967295)t="U",r=8;else throw new W("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+t+H.repeat("0",r-n.length)+n}var _m=1,sn=2;function Cm(e){this.schema=e.schema||Bt,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=H.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=wm(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType=e.quotingType==='"'?sn:_m,this.forceQuotes=e.forceQuotes||!1,this.replacer=typeof e.replacer=="function"?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function xr(e,n){for(var t=H.repeat(" ",n),r=0,a=-1,o="",i,s=e.length;r<s;)a=e.indexOf(`
`,r),a===-1?(i=e.slice(r),r=s):(i=e.slice(r,a+1),r=a+1),i.length&&i!==`
`&&(o+=t),o+=i;return o}function vt(e,n){return`
`+H.repeat(" ",e.indent*n)}function Im(e,n){var t,r,a;for(t=0,r=e.implicitTypes.length;t<r;t+=1)if(a=e.implicitTypes[t],a.resolve(n))return!0;return!1}function jn(e){return e===om||e===rm}function ln(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==Ht||65536<=e&&e<=1114111}function yr(e){return ln(e)&&e!==Ht&&e!==am&&e!==on}function wr(e,n,t){var r=yr(e),a=r&&!jn(e);return(t?r:r&&e!==wi&&e!==Ai&&e!==_i&&e!==Ci&&e!==Ii)&&e!==ft&&!(n===Tn&&!a)||yr(n)&&!jn(n)&&e===ft||n===Tn&&a}function Sm(e){return ln(e)&&e!==Ht&&!jn(e)&&e!==pm&&e!==vm&&e!==Tn&&e!==wi&&e!==Ai&&e!==_i&&e!==Ci&&e!==Ii&&e!==ft&&e!==um&&e!==dm&&e!==im&&e!==bm&&e!==mm&&e!==fm&&e!==cm&&e!==sm&&e!==lm&&e!==gm&&e!==hm}function km(e){return!jn(e)&&e!==Tn}function We(e,n){var t=e.charCodeAt(n),r;return t>=55296&&t<=56319&&n+1<e.length&&(r=e.charCodeAt(n+1),r>=56320&&r<=57343)?(t-55296)*1024+r-56320+65536:t}function Si(e){var n=/^\n* /;return n.test(e)}var ki=1,gt=2,Ni=3,Mi=4,Te=5;function Nm(e,n,t,r,a,o,i,s){var l,c=0,m=null,d=!1,f=!1,h=r!==-1,v=-1,b=Sm(We(e,0))&&km(We(e,e.length-1));if(n||i)for(l=0;l<e.length;c>=65536?l+=2:l++){if(c=We(e,l),!ln(c))return Te;b=b&&wr(c,m,s),m=c}else{for(l=0;l<e.length;c>=65536?l+=2:l++){if(c=We(e,l),c===on)d=!0,h&&(f=f||l-v-1>r&&e[v+1]!==" ",v=l);else if(!ln(c))return Te;b=b&&wr(c,m,s),m=c}f=f||h&&l-v-1>r&&e[v+1]!==" "}return!d&&!f?b&&!i&&!a(e)?ki:o===sn?Te:gt:t>9&&Si(e)?Te:i?o===sn?Te:gt:f?Mi:Ni}function Mm(e,n,t,r,a){e.dump=function(){if(n.length===0)return e.quotingType===sn?'""':"''";if(!e.noCompatMode&&(xm.indexOf(n)!==-1||ym.test(n)))return e.quotingType===sn?'"'+n+'"':"'"+n+"'";var o=e.indent*Math.max(1,t),i=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-o),s=r||e.flowLevel>-1&&t>=e.flowLevel;function l(c){return Im(e,c)}switch(Nm(n,s,e.indent,i,l,e.quotingType,e.forceQuotes&&!r,a)){case ki:return n;case gt:return"'"+n.replace(/'/g,"''")+"'";case Ni:return"|"+Ar(n,e.indent)+_r(xr(n,o));case Mi:return">"+Ar(n,e.indent)+_r(xr(Rm(n,i),o));case Te:return'"'+Em(n)+'"';default:throw new W("impossible error: invalid scalar style")}}()}function Ar(e,n){var t=Si(e)?String(n):"",r=e[e.length-1]===`
`,a=r&&(e[e.length-2]===`
`||e===`
`),o=a?"+":r?"":"-";return t+o+`
`}function _r(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function Rm(e,n){for(var t=/(\n+)([^\n]*)/g,r=function(){var c=e.indexOf(`
`);return c=c!==-1?c:e.length,t.lastIndex=c,Cr(e.slice(0,c),n)}(),a=e[0]===`
`||e[0]===" ",o,i;i=t.exec(e);){var s=i[1],l=i[2];o=l[0]===" ",r+=s+(!a&&!o&&l!==""?`
`:"")+Cr(l,n),a=o}return r}function Cr(e,n){if(e===""||e[0]===" ")return e;for(var t=/ [^ ]/g,r,a=0,o,i=0,s=0,l="";r=t.exec(e);)s=r.index,s-a>n&&(o=i>a?i:s,l+=`
`+e.slice(a,o),a=o+1),i=s;return l+=`
`,e.length-a>n&&i>a?l+=e.slice(a,i)+`
`+e.slice(i+1):l+=e.slice(a),l.slice(1)}function Em(e){for(var n="",t=0,r,a=0;a<e.length;t>=65536?a+=2:a++)t=We(e,a),r=V[t],!r&&ln(t)?(n+=e[a],t>=65536&&(n+=e[a+1])):n+=r||Am(t);return n}function Pm(e,n,t){var r="",a=e.tag,o,i,s;for(o=0,i=t.length;o<i;o+=1)s=t[o],e.replacer&&(s=e.replacer.call(t,String(o),s)),(le(e,n,s,!1,!1)||typeof s>"u"&&le(e,n,null,!1,!1))&&(r!==""&&(r+=","+(e.condenseFlow?"":" ")),r+=e.dump);e.tag=a,e.dump="["+r+"]"}function Ir(e,n,t,r){var a="",o=e.tag,i,s,l;for(i=0,s=t.length;i<s;i+=1)l=t[i],e.replacer&&(l=e.replacer.call(t,String(i),l)),(le(e,n+1,l,!0,!0,!1,!0)||typeof l>"u"&&le(e,n+1,null,!0,!0,!1,!0))&&((!r||a!=="")&&(a+=vt(e,n)),e.dump&&on===e.dump.charCodeAt(0)?a+="-":a+="- ",a+=e.dump);e.tag=o,e.dump=a||"[]"}function Tm(e,n,t){var r="",a=e.tag,o=Object.keys(t),i,s,l,c,m;for(i=0,s=o.length;i<s;i+=1)m="",r!==""&&(m+=", "),e.condenseFlow&&(m+='"'),l=o[i],c=t[l],e.replacer&&(c=e.replacer.call(t,l,c)),le(e,n,l,!1,!1)&&(e.dump.length>1024&&(m+="? "),m+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),le(e,n,c,!1,!1)&&(m+=e.dump,r+=m));e.tag=a,e.dump="{"+r+"}"}function jm(e,n,t,r){var a="",o=e.tag,i=Object.keys(t),s,l,c,m,d,f;if(e.sortKeys===!0)i.sort();else if(typeof e.sortKeys=="function")i.sort(e.sortKeys);else if(e.sortKeys)throw new W("sortKeys must be a boolean or a function");for(s=0,l=i.length;s<l;s+=1)f="",(!r||a!=="")&&(f+=vt(e,n)),c=i[s],m=t[c],e.replacer&&(m=e.replacer.call(t,c,m)),le(e,n+1,c,!0,!0,!0)&&(d=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,d&&(e.dump&&on===e.dump.charCodeAt(0)?f+="?":f+="? "),f+=e.dump,d&&(f+=vt(e,n)),le(e,n+1,m,!0,d)&&(e.dump&&on===e.dump.charCodeAt(0)?f+=":":f+=": ",f+=e.dump,a+=f));e.tag=o,e.dump=a||"{}"}function Sr(e,n,t){var r,a,o,i,s,l;for(a=t?e.explicitTypes:e.implicitTypes,o=0,i=a.length;o<i;o+=1)if(s=a[o],(s.instanceOf||s.predicate)&&(!s.instanceOf||typeof n=="object"&&n instanceof s.instanceOf)&&(!s.predicate||s.predicate(n))){if(t?s.multi&&s.representName?e.tag=s.representName(n):e.tag=s.tag:e.tag="?",s.represent){if(l=e.styleMap[s.tag]||s.defaultStyle,xi.call(s.represent)==="[object Function]")r=s.represent(n,l);else if(yi.call(s.represent,l))r=s.represent[l](n,l);else throw new W("!<"+s.tag+'> tag resolver accepts not "'+l+'" style');e.dump=r}return!0}return!1}function le(e,n,t,r,a,o,i){e.tag=null,e.dump=t,Sr(e,t,!1)||Sr(e,t,!0);var s=xi.call(e.dump),l=r,c;r&&(r=e.flowLevel<0||e.flowLevel>n);var m=s==="[object Object]"||s==="[object Array]",d,f;if(m&&(d=e.duplicates.indexOf(t),f=d!==-1),(e.tag!==null&&e.tag!=="?"||f||e.indent!==2&&n>0)&&(a=!1),f&&e.usedDuplicates[d])e.dump="*ref_"+d;else{if(m&&f&&!e.usedDuplicates[d]&&(e.usedDuplicates[d]=!0),s==="[object Object]")r&&Object.keys(e.dump).length!==0?(jm(e,n,e.dump,a),f&&(e.dump="&ref_"+d+e.dump)):(Tm(e,n,e.dump),f&&(e.dump="&ref_"+d+" "+e.dump));else if(s==="[object Array]")r&&e.dump.length!==0?(e.noArrayIndent&&!i&&n>0?Ir(e,n-1,e.dump,a):Ir(e,n,e.dump,a),f&&(e.dump="&ref_"+d+e.dump)):(Pm(e,n,e.dump),f&&(e.dump="&ref_"+d+" "+e.dump));else if(s==="[object String]")e.tag!=="?"&&Mm(e,e.dump,n,o,l);else{if(s==="[object Undefined]")return!1;if(e.skipInvalid)return!1;throw new W("unacceptable kind of an object to dump "+s)}e.tag!==null&&e.tag!=="?"&&(c=encodeURI(e.tag[0]==="!"?e.tag.slice(1):e.tag).replace(/!/g,"%21"),e.tag[0]==="!"?c="!"+c:c.slice(0,18)==="tag:yaml.org,2002:"?c="!!"+c.slice(18):c="!<"+c+">",e.dump=c+" "+e.dump)}return!0}function Om(e,n){var t=[],r=[],a,o;for(ht(e,t,r),a=0,o=r.length;a<o;a+=1)n.duplicates.push(t[r[a]]);n.usedDuplicates=new Array(o)}function ht(e,n,t){var r,a,o;if(e!==null&&typeof e=="object")if(a=n.indexOf(e),a!==-1)t.indexOf(a)===-1&&t.push(a);else if(n.push(e),Array.isArray(e))for(a=0,o=e.length;a<o;a+=1)ht(e[a],n,t);else for(r=Object.keys(e),a=0,o=r.length;a<o;a+=1)ht(e[r[a]],n,t)}function Lm(e,n){n=n||{};var t=new Cm(n);t.noRefs||Om(e,t);var r=e;return t.replacer&&(r=t.replacer.call({"":r},"",r)),le(t,0,r,!0,!0)?t.dump+`
`:""}var Dm=Lm,Fm={dump:Dm};function Ut(e,n){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+n+" instead, which is now safe by default.")}}var Gm=$,Bm=$o,qm=Qo,zm=ei,Hm=ni,Um=Bt,$m=bi.load,Km=bi.loadAll,Vm=Fm.dump,Wm=W,Qm={binary:ii,float:Zo,map:Wo,null:Yo,pairs:li,set:ui,timestamp:ai,bool:Jo,int:Xo,merge:oi,omap:si,seq:Vo,str:Ko},Ym=Ut("safeLoad","load"),Jm=Ut("safeLoadAll","loadAll"),Xm=Ut("safeDump","dump"),Zm={Type:Gm,Schema:Bm,FAILSAFE_SCHEMA:qm,JSON_SCHEMA:zm,CORE_SCHEMA:Hm,DEFAULT_SCHEMA:Um,load:$m,loadAll:Km,dump:Vm,YAMLException:Wm,types:Qm,safeLoad:Ym,safeLoadAll:Jm,safeDump:Xm};const ef=`# AI Readiness Assessment v2.0
# Schema-date: 2025-08-03

meta:
  locale_default: en
  size_breakpoints:
    micro: 1-9
    small: 10-49
    medium: 50-249
    large: 250-999
    enterprise: 1000+
  max_visible_questions: 60
  tracks:
    TECH:   "Technical / Data-Lead"
    REG:    "Regulated / Compliance"
    GEN:    "General Business"
  track_detection:
    precedence:
      - if: "role in [CIO / CTO, IT Lead, Data / AI Lead, ML Engineer, Data Engineer, DevOps Engineer, Security Architect, Infrastructure Manager]"
        then: TECH
      - if: "computed.regulated or role in [Legal / Compliance Lead, Privacy Officer, Compliance Manager, Risk Manager, Audit Lead, Governance Officer]"
        then: REG
      - else: GEN
  weight_vectors:
    TECH: { strategy: 20, data: 30, tools: 20, automation: 15, people: 5, governance: 10 }
    REG:  { strategy: 10, data: 20, tools: 10, automation: 10, people: 5, governance: 45 }
    GEN:  { strategy: 25, data: 15, tools: 15, automation: 15, people: 15, governance: 15 }
  question_cap:
    max_questions: 60
    auto_hide: [D2, P6]
  computed_fields:
    regulated:
      logic: "M4_industry in ['Finance & Insurance', 'Health Care & Social Assistance', 'Utilities (Electricity, Gas, Water & Waste)', 'Transportation & Warehousing', 'Manufacturing', 'Information & Communication Technology', 'Professional, Scientific & Technical Services', 'Administrative & Support & Waste Management Services', 'Accommodation & Food Services']"

section_0:
  purpose: "Collect organization profile for track detection and personalized recommendations."
  consent_banner:
    text: "By proceeding, you agree to process your data for this readiness report and related communications."
    type: banner
    required: true
  questions:
    - id: M0
      text: "Organization name"
      type: text
      required: true

    - id: M1
      text: "Full name"
      type: text
      required: true

    - id: M2
      text: "Business e-mail"
      type: email
      helper: "Use your work address (no Gmail, Hotmail, etc.)"
      required: true

    - id: M3
      text: "Primary role"
      type: single
      required: true
      choices:
        - value: "Founder / CEO"
          score: 4
          reasoning: "Senior leadership → high AI influence"
          model_input_context: "Respondent is C-level, with strong ability to steer AI strategy."
        - value: "C-level executive"
          score: 4
          reasoning: "Senior leadership → high AI influence"
          model_input_context: "Respondent is C-level, with strong ability to steer AI strategy."
        - value: "Head of Marketing"
          score: 2
          reasoning: "Functional leader, some AI exposure"
          model_input_context: "Respondent leads marketing—likely some AI use but not core to strategy."
        - value: "Head of Sales"
          score: 2
          reasoning: "Functional leader, some AI exposure"
          model_input_context: "Respondent leads sales—likely some AI use but not core to strategy."
        - value: "Head of Finance"
          score: 2
          reasoning: "Functional leader, some AI exposure"
          model_input_context: "Respondent leads finance—likely some analytical AI use, but not central."
        - value: "Head of Operations"
          score: 2
          reasoning: "Functional leader, some AI exposure"
          model_input_context: "Respondent leads operations—may use process-automation AI, but not core."
        - value: "Product Lead"
          score: 3
          reasoning: "Product management often drives AI feature roadmaps"
          model_input_context: "Respondent leads product—likely directly engaged in AI/ML features."
        - value: "HR Lead"
          score: 1
          reasoning: "Low direct AI influence"
          model_input_context: "Respondent leads HR—AI use is typically more limited."
        - value: "Customer Support Lead"
          score: 1
          reasoning: "Low direct AI influence"
          model_input_context: "Respondent leads support—may use basic AI but not strategic."
        - value: "CIO / CTO"
          score: 5
          reasoning: "Technical leadership → very high AI influence"
          model_input_context: "Respondent is CIO/CTO—primary sponsor for AI infrastructure."
        - value: "IT Lead"
          score: 4
          reasoning: "Senior technical role → high AI influence"
          model_input_context: "Respondent leads IT—strong role in selecting AI platforms."
        - value: "Data / AI Lead"
          score: 5
          reasoning: "Direct AI ownership"
          model_input_context: "Respondent is Data/AI Lead—very familiar with AI use-cases."
        - value: "ML Engineer"
          score: 5
          reasoning: "Hands-on AI practitioner"
          model_input_context: "Respondent is ML Engineer—deep technical AI expertise."
        - value: "Data Engineer"
          score: 4
          reasoning: "Key enabler of data pipelines for AI"
          model_input_context: "Respondent is Data Engineer—critical to AI data readiness."
        - value: "DevOps Engineer"
          score: 3
          reasoning: "Supports deployment, less direct strategy"
          model_input_context: "Respondent is DevOps—helps productionize AI but not strategic lead."
        - value: "Security Architect"
          score: 3
          reasoning: "Enforces governance, moderate AI role"
          model_input_context: "Respondent is Security Architect—supports safe AI deployment."
        - value: "Infrastructure Manager"
          score: 3
          reasoning: "Manages platforms, moderate AI role"
          model_input_context: "Respondent is Infrastructure Manager—ensures compute for AI."
        - value: "Legal / Compliance Lead"
          score: 2
          reasoning: "Governance focus, indirect AI influence"
          model_input_context: "Respondent is Legal/Compliance—ensures AI policies but not strategy."
        - value: "Privacy Officer"
          score: 2
          reasoning: "Governance focus, indirect AI influence"
          model_input_context: "Respondent is Privacy Officer—focus on data privacy over AI strategy."
        - value: "Compliance Manager"
          score: 2
          reasoning: "Governance focus, indirect AI influence"
          model_input_context: "Respondent is Compliance Manager—ensures AI compliance but not adoption lead."
        - value: "Risk Manager"
          score: 1
          reasoning: "Risk oversight, limited AI adoption role"
          model_input_context: "Respondent is Risk Manager—focuses on risk rather than AI enablement."
        - value: "Audit Lead"
          score: 1
          reasoning: "Audit focus, limited AI adoption role"
          model_input_context: "Respondent is Audit Lead—may audit AI but not drive adoption."
        - value: "Governance Officer"
          score: 1
          reasoning: "Governance focus, limited AI adoption role"
          model_input_context: "Respondent is Governance Officer—ensures policy, not AI delivery."

    - id: M4_industry
      text: "Industry & sub-sector"
      type: dropdown
      required: true
      choices:
        - value: "Agriculture, Forestry & Fishing"
          score: 2
          reasoning: "Early AI pilots in precision agriculture, but overall low adoption"
          model_input_context: "Respondent’s industry is Agriculture—emerging AI use in precision farming."
        - value: "Mining & Quarrying"
          score: 2
          reasoning: "AI used for safety and optimization, but limited breadth"
          model_input_context: "Respondent’s industry is Mining—AI adoption growing in safety/optimization."
        - value: "Utilities (Electricity, Gas, Water & Waste)"
          score: 4
          reasoning: "Strong use of AI for grid management, predictive maintenance"
          model_input_context: "Respondent’s industry is Utilities—advanced AI for operations and maintenance."
        - value: "Construction"
          score: 1
          reasoning: "Very low AI adoption, mostly manual workflows"
          model_input_context: "Respondent’s industry is Construction—very early AI stage."
        - value: "Manufacturing"
          score: 4
          reasoning: "Extensive use of AI/automation in factories and supply chains"
          model_input_context: "Respondent’s industry is Manufacturing—high AI maturity in automation."
        - value: "Wholesale Trade"
          score: 3
          reasoning: "Moderate AI adoption in inventory and logistics optimization"
          model_input_context: "Respondent’s industry is Wholesale—using AI for inventory forecasting."
        - value: "Retail Trade"
          score: 3
          reasoning: "AI used in personalization and demand forecasting, moderate maturity"
          model_input_context: "Respondent’s industry is Retail—AI in recommendation engines and forecasting."
        - value: "Transportation & Warehousing"
          score: 2
          reasoning: "Emerging AI in logistics and route optimization"
          model_input_context: "Respondent’s industry is Transportation—AI pilots in routing and warehousing."
        - value: "Information & Communication Technology"
          score: 5
          reasoning: "Leading AI ecosystem with rapid adoption of generative models"
          model_input_context: "Respondent’s industry is ICT—very mature AI ecosystem."
        - value: "Finance & Insurance"
          score: 5
          reasoning: "High AI adoption in risk modeling, fraud detection"
          model_input_context: "Respondent’s industry is Finance—strong AI maturity in analytics."
        - value: "Real Estate & Rental & Leasing"
          score: 2
          reasoning: "Limited AI adoption beyond property valuation"
          model_input_context: "Respondent’s industry is Real Estate—early AI use in valuations."
        - value: "Professional, Scientific & Technical Services"
          score: 4
          reasoning: "Consulting and technical services heavily leverage AI"
          model_input_context: "Respondent’s industry is Professional Services—high AI usage."
        - value: "Administrative & Support & Waste Management Services"
          score: 3
          reasoning: "Moderate AI for process automation and waste analytics"
          model_input_context: "Respondent’s industry is Admin & Support—using AI for workflow automation."
        - value: "Educational Services"
          score: 3
          reasoning: "Growing AI in e-learning and administration"
          model_input_context: "Respondent’s industry is Education—AI in personalized learning and operations."
        - value: "Health Care & Social Assistance"
          score: 3
          reasoning: "Significant regulation but active AI in diagnostics and operations"
          model_input_context: "Respondent’s industry is Health Care—moderate AI maturity under compliance."
        - value: "Arts, Entertainment & Recreation"
          score: 2
          reasoning: "Early AI in content creation, still niche"
          model_input_context: "Respondent’s industry is Arts & Entertainment—exploring AI in creative processes."
        - value: "Accommodation & Food Services"
          score: 2
          reasoning: "AI pilots in demand forecasting and chatbots, limited scale"
          model_input_context: "Respondent’s industry is Accommodation—using AI intermittently in operations."
        - value: "Public Administration"
          score: 3
          reasoning: "AI in citizen services and analytics, moderate adoption"
          model_input_context: "Respondent’s industry is Public Admin—AI used in services and policy analysis."
        - value: "Non-profit & NGO"
          score: 2
          reasoning: "Limited budgets constrain AI experimentation"
          model_input_context: "Respondent’s industry is Non-profit—early AI use for analytics and fundraising."

    - id: M5_country
      text: "Country"
      type: dropdown
      required: true
      choices:
        - "Afghanistan"
        - "Albania"
        - "Algeria"
        - "Andorra"
        - "Angola"
        - "Antigua and Barbuda"
        - "Argentina"
        - "Armenia"
        - "Australia"
        - "Austria"
        - "Azerbaijan"
        - "Bahamas"
        - "Bahrain"
        - "Bangladesh"
        - "Barbados"
        - "Belarus"
        - "Belgium"
        - "Belize"
        - "Benin"
        - "Bhutan"
        - "Bolivia"
        - "Bosnia and Herzegovina"
        - "Botswana"
        - "Brazil"
        - "Brunei Darussalam"
        - "Bulgaria"
        - "Burkina Faso"
        - "Burundi"
        - "Cabo Verde"
        - "Cambodia"
        - "Cameroon"
        - "Canada"
        - "Central African Republic"
        - "Chad"
        - "Chile"
        - "China"
        - "Colombia"
        - "Comoros"
        - "Congo (Brazzaville)"
        - "Costa Rica"
        - "Côte d’Ivoire"
        - "Croatia"
        - "Cuba"
        - "Cyprus"
        - "Czech Republic"
        - "Democratic Republic of the Congo"
        - "Denmark"
        - "Djibouti"
        - "Dominica"
        - "Dominican Republic"
        - "Ecuador"
        - "Egypt"
        - "El Salvador"
        - "Equatorial Guinea"
        - "Eritrea"
        - "Estonia"
        - "Eswatini"
        - "Ethiopia"
        - "Fiji"
        - "Finland"
        - "France"
        - "Gabon"
        - "Gambia"
        - "Georgia"
        - "Germany"
        - "Ghana"
        - "Greece"
        - "Grenada"
        - "Guatemala"
        - "Guinea"
        - "Guinea-Bissau"
        - "Guyana"
        - "Haiti"
        - "Honduras"
        - "Hungary"
        - "Iceland"
        - "India"
        - "Indonesia"
        - "Iran"
        - "Iraq"
        - "Ireland"
        - "Israel"
        - "Italy"
        - "Jamaica"
        - "Japan"
        - "Jordan"
        - "Kazakhstan"
        - "Kenya"
        - "Kiribati"
        - "Kuwait"
        - "Kyrgyzstan"
        - "Laos"
        - "Latvia"
        - "Lebanon"
        - "Lesotho"
        - "Liberia"
        - "Libya"
        - "Liechtenstein"
        - "Lithuania"
        - "Luxembourg"
        - "Madagascar"
        - "Malawi"
        - "Malaysia"
        - "Maldives"
        - "Mali"
        - "Malta"
        - "Marshall Islands"
        - "Mauritania"
        - "Mauritius"
        - "Mexico"
        - "Micronesia"
        - "Moldova"
        - "Monaco"
        - "Mongolia"
        - "Montenegro"
        - "Morocco"
        - "Mozambique"
        - "Myanmar"
        - "Namibia"
        - "Nauru"
        - "Nepal"
        - "Netherlands"
        - "New Zealand"
        - "Nicaragua"
        - "Niger"
        - "Nigeria"
        - "North Macedonia"
        - "Norway"
        - "Oman"
        - "Palestine"
        - "Pakistan"
        - "Palau"
        - "Panama"
        - "Papua New Guinea"
        - "Paraguay"
        - "Peru"
        - "Philippines"
        - "Poland"
        - "Portugal"
        - "Qatar"
        - "Romania"
        - "Russia"
        - "Rwanda"
        - "Saint Kitts and Nevis"
        - "Saint Lucia"
        - "Saint Vincent and the Grenadines"
        - "Samoa"
        - "San Marino"
        - "São Tomé and Príncipe"
        - "Saudi Arabia"
        - "Senegal"
        - "Serbia"
        - "Seychelles"
        - "Sierra Leone"
        - "Singapore"
        - "Slovakia"
        - "Slovenia"
        - "Solomon Islands"
        - "Somalia"
        - "South Africa"
        - "South Korea"
        - "South Sudan"
        - "Spain"
        - "Sri Lanka"
        - "Sudan"
        - "Suriname"
        - "Sweden"
        - "Switzerland"
        - "Syria"
        - "Tajikistan"
        - "Thailand"
        - "Timor-Leste"
        - "Togo"
        - "Tonga"
        - "Trinidad and Tobago"
        - "Tunisia"
        - "Turkey"
        - "Turkmenistan"
        - "Tuvalu"
        - "Uganda"
        - "Ukraine"
        - "United Arab Emirates"
        - "United Kingdom"
        - "United States"
        - "Uruguay"
        - "Uzbekistan"
        - "Vanuatu"
        - "Venezuela"
        - "Vietnam"
        - "Yemen"
        - "Zambia"
        - "Zimbabwe"
      score_map_by_bucket:
        5:
          - "Australia"
          - "Canada"
          - "Denmark"
          - "France"
          - "Germany"
          - "Japan"
          - "Netherlands"
          - "Singapore"
          - "South Korea"
          - "Sweden"
          - "United Kingdom"
          - "United States"
        4:
          - "Austria"
          - "Belgium"
          - "Finland"
          - "Norway"
          - "Switzerland"
        3:
          - "Ireland"
          - "Italy"
          - "New Zealand"
          - "Spain"
        2:
          - "Brazil"
          - "China"
          - "India"
          - "Mexico"
          - "Russia"
          - "South Africa"
          - "*"    # wildcard for any other not listed
        1:
          - "Egypt"
          - "Nigeria"
          - "Philippines"

    - id: M6_size
      text: "Company size (FTE)"
      type: single
      required: true
      choices:
        - value: "1–9"
          score: 1
          reasoning: "Small companies adopt AI less frequently"
          model_input_context: "Organization is very small—limited AI resources."
        - value: "10–49"
          score: 2
          reasoning: "SMBs are starting to pilot AI"
          model_input_context: "Organization is small—early AI stage."
        - value: "50–249"
          score: 3
          reasoning: "Mid-sized firms adopt more AI"
          model_input_context: "Organization is mid-sized—moderate AI maturity."
        - value: "250–999"
          score: 4
          reasoning: "Larger organizations have dedicated AI teams"
          model_input_context: "Organization is large—higher AI maturity."
        - value: "≥ 1 000"
          score: 5
          reasoning: "Enterprise scale → strong AI capability"
          model_input_context: "Organization is enterprise—very strong AI maturity."
        - value: "Prefer not to say"
          score: 0
          reasoning: "No scoring data available"
          model_input_context: "Organization size not disclosed."

    - id: M7_revenue
      text: "Annual revenue"
      type: single
      required: true
      choices:
        - value: "< €250 k"
          score: 1
          reasoning: "Very limited budget for AI"
          model_input_context: "Organization’s revenue is very low—minimal AI funding."
        - value: "€250 k–1 M"
          score: 2
          reasoning: "Small budget constraints"
          model_input_context: "Organization’s revenue is low—some AI capacity but limited."
        - value: "€1 M–€5 M"
          score: 3
          reasoning: "Moderate funding for pilots"
          model_input_context: "Organization’s revenue is moderate—supports AI pilots."
        - value: "€5 M–€20 M"
          score: 4
          reasoning: "Good budget for multiple projects"
          model_input_context: "Organization’s revenue is strong—can scale AI."
        - value: "€20 M–€100 M"
          score: 5
          reasoning: "High funding for enterprise-scale AI"
          model_input_context: "Organization’s revenue is very strong—enterprise AI maturity."
        - value: "> €100 M"
          score: 5
          reasoning: "Enterprise-level funding"
          model_input_context: "Organization’s revenue is very strong—enterprise AI maturity."
section_1:
  category: strategy
  purpose: "Assess strategic alignment & planning maturity."
  pillar_scores:
    strategy:
      logic: |
        ids = ["S1", "S7", "S8"]
        vals = [response[q] for q in ids]
        return sum(vals) / len(ids)
    planning_execution:
      logic: |
        ids = ["S2", "S4", "S5"]
        vals = [response[q] for q in ids]
        return sum(vals) / len(ids)
    process:
      logic: |
        ids = ["S3", "S6"]
        vals = [response[q] for q in ids]
        return sum(vals) / len(ids)
    organisation:
      logic: |
        ids = ["S9", "S10"]
        vals = [response[q] for q in ids]
        return sum(vals) / len(ids)
    measurement:
      logic: |
        ids = ["S11", "S12"]
        vals = [response[q] for q in ids]
        return sum(vals) / len(ids)

  questions:
    - id: S1
      text: "How many AI use cases have you identified for implementation within the next 12 months?"
      type: single
      helper: "Defines your planning maturity and readiness."
      choices:
        - value: "None"
          score: 1
          reasoning: "No use-cases = ad-hoc maturity"
          model_input_context: "Pre-exploration stage. No documented AI opportunities."
        - value: "Ideas listed only"
          score: 2
          reasoning: "Brainstormed but not formalised"
          model_input_context: "Early ideation stage. Informal AI discussions only."
        - value: "1–2 documented use cases"
          score: 3
          reasoning: "A few pilots = exploratory"
          model_input_context: "Initial documentation stage. Formal use-case docs exist."
        - value: "3–5 prioritised with owners"
          score: 4
          reasoning: "Prioritised projects with owners = defined roadmap"
          model_input_context: "Structured planning stage. Clear accountability assigned."
        - value: "6 or more with owners and timelines"
          score: 5
          reasoning: "Portfolio with owners & timelines = integrated strategy"
          model_input_context: "Portfolio management stage. Formal project management in place."
      required: true

    - id: S2
      text: "How do you decide which AI opportunities to pursue first?"
      type: single
      helper: "Select the process you currently use."
      show_if:
        S1:
          not_in: ["None", "Ideas listed only"]
      choices:
        - value: "No formal process"
          score: 1
          reasoning: "No process = ad-hoc"
          model_input_context: "Ad-hoc selection. No systematic framework."
        - value: "Ad hoc based on perceived value"
          score: 2
          reasoning: "Informal value assessment"
          model_input_context: "Uses business judgment without structured criteria."
        - value: "Impact × Effort matrix"
          score: 3
          reasoning: "Simple impact–effort scoring"
          model_input_context: "Standard 2×2 prioritization matrix."
        - value: "Impact × Effort + capacity weighting"
          score: 4
          reasoning: "Adds resource awareness"
          model_input_context: "Considers team capacity in prioritization."
        - value: "ROI-driven financial model"
          score: 5
          reasoning: "Quantitative ROI = mature planning"
          model_input_context: "Requires quantitative business case analysis."
        - value: "Risk-adjusted prioritisation"
          score: 5
          reasoning: "Weighs risk + return = best practice"
          model_input_context: "Integrates risk assessment into prioritization."
      required: true

    - id: S3
      text: "How integrated are your AI performance metrics with corporate KPIs or OKRs?"
      type: single
      helper: "Defines your measurement maturity."
      show_if:
        S1:
          not_in: ["None", "Ideas listed only"]
      choices:
        - value: "No AI KPIs/OKRs defined"
          score: 1
          reasoning: "No KPIs = no alignment"
          model_input_context: "No success criteria defined or tracked."
        - value: "KPIs drafted but not tracked"
          score: 2
          reasoning: "Metrics exist but not monitored"
          model_input_context: "Metrics created but no monitoring systems."
        - value: "KPIs tracked but not linked"
          score: 3
          reasoning: "Monitored but isolated"
          model_input_context: "AI metrics tracked separately from business OKRs."
        - value: "Partially aligned with departmental OKRs"
          score: 4
          reasoning: "Some functional linkage"
          model_input_context: "Connected to some department goals."
        - value: "Fully embedded in executive OKRs"
          score: 5
          reasoning: "Executive-level integration"
          model_input_context: "Tied directly to top-level objectives."
      required: true

    - id: S4
      text: "How do you estimate ROI for AI projects?"
      type: single
      helper: "Choose the method that matches your current practice."
      show_if:
        S1:
          not_in: ["None", "Ideas listed only"]
      choices:
        - value: "Don’t estimate ROI"
          score: 1
          reasoning: "No ROI modelling"
          model_input_context: "No financial analysis performed."
        - value: "Rough experience-based estimates"
          score: 2
          reasoning: "Informal estimates"
          model_input_context: "Uses intuition and past experience."
        - value: "Simple cost–benefit analysis"
          score: 3
          reasoning: "Basic structured analysis"
          model_input_context: "Compares costs against expected benefits."
        - value: "Linked ROI to clear KPIs and goals"
          score: 4
          reasoning: "ROI tied to metrics"
          model_input_context: "Connects returns to measurable outcomes."
        - value: "Detailed financial or risk-adjusted models"
          score: 5
          reasoning: "Advanced modelling"
          model_input_context: "Sophisticated analysis with risk factors."
      required: true

    - id: S5
      text: "What is your typical time from idea to measurable AI impact?"
      type: single
      helper: "Defines speed of execution."
      show_if:
        S1:
          not_in: ["None", "Ideas listed only"]
      choices:
        - value: "Over 12 months"
          score: 1
          reasoning: "Slow execution"
          model_input_context: "Traditional long-term project timelines."
        - value: "6–12 months"
          score: 2
          reasoning: "Moderate timeframe"
          model_input_context: "Standard enterprise delivery cycle."
        - value: "3–6 months"
          score: 3
          reasoning: "Standard pilot timeframe"
          model_input_context: "Balanced agile approach."
        - value: "1–3 months"
          score: 4
          reasoning: "Rapid pilot delivery"
          model_input_context: "Fast execution with existing platforms."
        - value: "Under 30 days"
          score: 5
          reasoning: "Very agile"
          model_input_context: "Off-the-shelf solutions and rapid iteration."
      required: true

    - id: S6
      text: "How do you monitor competitor or industry AI developments?"
      type: single
      helper: "Assesses market awareness."
      choices:
        - value: "Not tracked"
          score: 1
          reasoning: "No trend monitoring"
          model_input_context: "Operates without industry intelligence."
        - value: "Occasional ad hoc research"
          score: 2
          reasoning: "Sporadic benchmarking"
          model_input_context: "Irregular research efforts."
        - value: "Annual review"
          score: 3
          reasoning: "Scheduled but infrequent"
          model_input_context: "Periodic benchmarking cycle."
        - value: "Quarterly reporting"
          score: 4
          reasoning: "Regular updates"
          model_input_context: "Consistent monitoring with reports."
        - value: "Continuous dashboard or feed"
          score: 5
          reasoning: "Real-time monitoring"
          model_input_context: "Automated continuous intelligence feed."
      required: true

    - id: S7
      text: "Rank your top four strategic objectives for AI initiatives"
      type: rank
      helper: "Reveals strategic priorities."
      choices:
        - "Productivity"
        - "Cost reduction"
        - "Revenue growth"
        - "Customer experience"
        - "Innovation"
        - "Regulatory compliance"
        - "Investor positioning"
      max_rank: 4
      weight: [40, 30, 20, 10]
      reasoning: "Innovation/compliance goals score highest; productivity/cost near-term."
      model_input_context: "Priority mapping reflects strategic focus areas."
      required: true

    - id: S8
      text: "How aligned is your leadership team on AI strategy?"
      type: single
      helper: "Assesses executive sponsorship."
      choices:
        - value: "No alignment"
          score: 1
          reasoning: "No exec support"
          model_input_context: "Leadership operates without AI alignment."
        - value: "Occasional discussions"
          score: 2
          reasoning: "Minimal engagement"
          model_input_context: "Informal executive interest only."
        - value: "Executive interest without action"
          score: 3
          reasoning: "Interest but no budget"
          model_input_context: "Understands importance but no resources."
        - value: "Budget approved"
          score: 4
          reasoning: "Financial commitment"
          model_input_context: "Resources allocated for AI."
        - value: "Active executive sponsorship"
          score: 5
          reasoning: "Executive champions"
          model_input_context: "Leadership removes barriers and advocates AI."
      required: true

    - id: S9
      text: "Which teams are involved in defining AI use cases?"
      type: multi
      helper: "Measures cross-functional engagement."
      choices:
        - "Executive leadership"
        - "Product & marketing"
        - "Operations"
        - "Data & IT"
        - "Legal & compliance"
        - "HR"
        - "Finance"
        - "Customer support"
      score_per: 10
      cap: 100
      reasoning: "More functions = broader integration."
      model_input_context: "Breadth of departmental involvement."
      required: true

    - id: S10
      text: "How prepared is your organization to manage change from AI adoption?"
      type: single
      helper: "Assesses change-management readiness."
      choices:
        - value: "Not prepared"
          score: 1
          reasoning: "No framework"
          model_input_context: "No change management processes."
        - value: "Ad hoc readiness"
          score: 2
          reasoning: "Unstructured"
          model_input_context: "Occasional readiness activities."
        - value: "Formal process for some projects"
          score: 3
          reasoning: "Partial coverage"
          model_input_context: "Selective project-level readiness."
        - value: "Organization-wide framework"
          score: 4
          reasoning: "Standardised"
          model_input_context: "Enterprise-level change framework."
        - value: "Continuous improvement culture"
          score: 5
          reasoning: "Proactive culture"
          model_input_context: "Learning-driven continuous change."
      required: true

    - id: S11
      text: "How clear are the goals and metrics for your AI use cases?"
      type: single
      helper: "Assesses goal clarity and measurement."
      show_if:
        S1:
          not_in: ["None", "Ideas listed only"]
      choices:
        - value: "No clear goals"
          score: 1
          reasoning: "No metrics"
          model_input_context: "No objectives defined."
        - value: "Goals defined with no metrics"
          score: 2
          reasoning: "Unmeasured goals"
          model_input_context: "Objectives set but not tracked."
        - value: "Some metrics tracked"
          score: 3
          reasoning: "Partial measurement"
          model_input_context: "Metrics for subset of goals."
        - value: "Most goals with metrics"
          score: 4
          reasoning: "Broad measurement"
          model_input_context: "Majority of goals tracked."
        - value: "All goals have metrics & thresholds"
          score: 5
          reasoning: "Full measurement"
          model_input_context: "Complete metrics and thresholds."
      required: true

    - id: S12
      text: "What best describes your approach to piloting and deploying AI projects?"
      type: single
      helper: "Assesses deployment methodology."
      hide_if:
        P2: "Conservative – pilot tests before scaling"
      choices:
        - value: "POC only with strict compliance checks"
          score: 1
          reasoning: "Very cautious"
          model_input_context: "Proof-of-concept only."
        - value: "Small pilots with controlled access"
          score: 2
          reasoning: "Limited pilots"
          model_input_context: "Restricted pilot deployments."
        - value: "Case-by-case security review"
          score: 3
          reasoning: "Individual reviews"
          model_input_context: "Security checks per deployment."
        - value: "Agile testing with integrated oversight"
          score: 4
          reasoning: "Governed agility"
          model_input_context: "Rapid iterations under oversight."
        - value: "Fast iterations with production readiness & risk mgmt"
          score: 5
          reasoning: "Production-grade agility"
          model_input_context: "Rapid, risk-managed production deployments."
      required: true

section_2:
  category: governance
  purpose: "Assess financial readiness, runway, stakeholder support & compliance."
  pillar_scores:
    financial_strategy:
      logic: |
        ids = ["F1", "F3"]
        vals = [response[q] for q in ids]
        return sum(vals) / len(ids)
    investor_support:
      logic: |
        return response["F4"]
    regulatory_compliance:
      logic: |
        ids = ["F5", "F8"]
        vals = [response[q] for q in ids]
        return sum(vals) / len(ids)
    partnerships_ecosystem:
      logic: |
        return response["F6"]
    ethics_risk_management:
      logic: |
        return response["F7"]

  questions:
    - id: F1
      text: "What is your current monthly budget for AI and data initiatives?"
      type: single
      helper: "Defines your financial commitment level."
      choices:
        - value: "< €100"
          score: 1
          reasoning: "Minimal experimentation"
          model_input_context: "Spends under €100 monthly."
        - value: "€100–500"
          score: 2
          reasoning: "Basic tool coverage"
          model_input_context: "Modest budget for limited experimentation."
        - value: "€500–2 000"
          score: 3
          reasoning: "Supports a few pilots"
          model_input_context: "Budget for multiple pilot projects."
        - value: "€2 000–15 000"
          score: 4
          reasoning: "Multiple concurrent projects"
          model_input_context: "Advanced tooling and pilots."
        - value: "Over €15 000"
          score: 5
          reasoning: "Scaling potential"
          model_input_context: "Strategic investment scale."
      required: true

    - id: F3
      text: "How long can you fund your AI and data efforts without new investment or revenue?"
      type: single
      helper: "Indicates your financial runway."
      choices:
        - value: "Less than 3 months"
          score: 1
          reasoning: "Financial fragility"
          model_input_context: "Immediate funding pressure."
        - value: "3–6 months"
          score: 2
          reasoning: "Risk of interruptions"
          model_input_context: "Short-term runway."
        - value: "6–12 months"
          score: 3
          reasoning: "Sufficient for pilots"
          model_input_context: "Supports complete pilot cycles."
        - value: "12–24 months"
          score: 4
          reasoning: "Supports scaling"
          model_input_context: "Extended runway for scaling."
        - value: "Over 24 months"
          score: 5
          reasoning: "Stable long-term funding"
          model_input_context: "Sustainable AI investment."
      required: true

    - id: F4
      text: "How supportive are your board or investors of your AI initiatives?"
      type: single
      helper: "Assesses executive & investor backing."
      choices:
        - value: "Not supportive"
          score: 1
          reasoning: "Undermines projects"
          model_input_context: "No stakeholder alignment."
        - value: "Discussion only, no commitments"
          score: 2
          reasoning: "Conversations without resources"
          model_input_context: "Interest without commitment."
        - value: "Open to AI initiatives"
          score: 3
          reasoning: "Willingness to explore"
          model_input_context: "Conditional support stage."
        - value: "Budget approved"
          score: 4
          reasoning: "Financial backing in place"
          model_input_context: "Board-approved budget."
        - value: "Active championing"
          score: 5
          reasoning: "Executives champion AI"
          model_input_context: "Strategic sponsorship by board."
      required: true

    - id: F5
      text: "Which additional regulatory or security frameworks apply to your organization?"
      type: multi
      helper: "GDPR and EU AI Act apply by default."
      choices:
        - value: "None apply"
          score: 1
          reasoning: "No awareness of regulations"
          model_input_context: "Regulatory blindness."
        - value: "1–2 frameworks"
          score: 2
          reasoning: "Basic compliance awareness"
          model_input_context: "Identifies primary regulations."
        - value: "3–4 frameworks"
          score: 3
          reasoning: "Broader coverage"
          model_input_context: "Acknowledges multiple regulations."
        - value: "5–6 frameworks"
          score: 4
          reasoning: "Strong oversight"
          model_input_context: "Tracks most relevant requirements."
        - value: "> 6 frameworks"
          score: 5
          reasoning: "Comprehensive compliance"
          model_input_context: "Advanced regulatory management."
      score_per: 10
      cap: 100
      required: true

    - id: F6
      text: "What level of strategic partnerships do you have for AI?"
      type: single
      helper: "Assesses ecosystem engagement."
      choices:
        - value: "None"
          score: 1
          reasoning: "Isolation limits expertise"
          model_input_context: "No external partnerships."
        - value: "Exploratory discussions"
          score: 2
          reasoning: "Early outreach"
          model_input_context: "Preliminary partnership talks."
        - value: "One active partnership"
          score: 3
          reasoning: "Single collaboration"
          model_input_context: "One active AI vendor relationship."
        - value: "Multiple partnerships"
          score: 4
          reasoning: "Networked approach"
          model_input_context: "Several vendor/institution collaborations."
        - value: "Ecosystem collaboration (R&D + vendors)"
          score: 5
          reasoning: "Deep strategic collaborations"
          model_input_context: "Integrated R&D and vendor ecosystem."
      required: true

    - id: F7
      text: "What percentage of your AI budget is allocated to ethics and bias mitigation?"
      type: single
      helper: "Assesses ethical investment."
      choices:
        - value: "None"
          score: 1
          reasoning: "No allocation = compliance risk"
          model_input_context: "No ethics budget."
        - value: "Planned next fiscal year"
          score: 2
          reasoning: "Future intent"
          model_input_context: "Budget planned but not yet allocated."
        - value: "Under 5 % of AI budget"
          score: 3
          reasoning: "Modest funding"
          model_input_context: "Basic ethics activities supported."
        - value: "5–15 % of AI budget"
          score: 4
          reasoning: "Dedicated funding"
          model_input_context: "Substantial ethics investment."
        - value: "Over 15 % of AI budget"
          score: 5
          reasoning: "Significant investment"
          model_input_context: "Strategic ethics commitment."
      required: true
section_3:
  category: data
  purpose: "Data foundation, security, ethics, compliance."
  pillar_scores:
    data_environment:
      logic: |
        vals = [ response["D1"], response["D2"] ]
        return sum(vals) / len(vals)
    governance_policy:
      logic: |
        vals = [ response["D3"], response["D10"] ]
        return sum(vals) / len(vals)
    quality_observability:
      logic: |
        vals = [ response["D4"], response["D7"] ]
        return sum(vals) / len(vals)
    security_controls:
      logic: |
        return response["D5"]
    stewardship_enrichment:
      logic: |
        vals = [ response["D6"], response["D8"], response["D9"] ]
        return sum(vals) / len(vals)

  questions:
    - id: D1
      text: "Where is your most critical data primarily stored?"
      type: multi
      helper: "Critical data drives operations, decisions, and compliance."
      choices:
        - "Files & spreadsheets (e.g. Excel, Google Sheets, local files)"
        - "Databases (e.g. SQL, NoSQL, data warehouses)"
        - "Cloud & SaaS platforms (e.g. Google Drive, Salesforce, HubSpot)"
        - "Internal tools / legacy systems (e.g. custom apps, intranet)"
        - "Analytics & BI platforms (e.g. Power BI, Looker, Tableau)"
      score_per: 1
      cap: 5
      reasoning: "More source types = broader integration"
      model_input_context: "Data integration breadth indicates ecosystem complexity."
      required: true

    - id: D2
      text: "How much data does your organization generate or collect each month?"
      type: single
      choices:
        - value: "Don’t know"
          score: 1
          reasoning: "No awareness = poor data management"
          model_input_context: "Lacks visibility into data volumes."
        - value: "< 1 GB"
          score: 1
          reasoning: "Tiny datasets constrain AI"
          model_input_context: "Minimal data environment."
        - value: "1–10 GB"
          score: 2
          reasoning: "Limited data may inhibit modeling"
          model_input_context: "Small data volumes."
        - value: "10–100 GB"
          score: 3
          reasoning: "Moderate volume supports basic models"
          model_input_context: "Standard data volumes."
        - value: "≥ 100 GB"
          score: 4
          reasoning: "Large datasets enable sophisticated AI"
          model_input_context: "Substantial data volumes."
      required: true

    - id: D3
      text: "How mature is your data management (structure, tools, and lineage)?"
      type: single
      show_if:
        track: [TECH, REG]
      hide_if:
        all_of:
          - { M6_size: "1–9" }
          - { D1: { subset_of: ["Files & spreadsheets (e.g. Excel, Google Sheets, local files)"] } }
      choices:
        - value: "No standards or visibility"
          score: 1
          reasoning: "No standards = inconsistent & risky data"
          model_input_context: "No documented data processes."
        - value: "Basic naming conventions & partial docs"
          score: 2
          reasoning: "Minimal structure; manual processes"
          model_input_context: "Simple conventions, manual tracking."
        - value: "Defined standards with manual processes"
          score: 3
          reasoning: "Standards exist but lack automation"
          model_input_context: "Standards without tool support."
        - value: "Schema tools & automated tracking"
          score: 4
          reasoning: "Automated lineage = strong governance"
          model_input_context: "Uses schema tools for lineage."
        - value: "Version-controlled models & full lineage"
          score: 5
          reasoning: "End-to-end versioning & governance"
          model_input_context: "Comprehensive automated lineage."
      required: true

    - id: D4
      text: "How confident are you in the accuracy and freshness of your critical data?"
      type: single
      show_if:
        track: [TECH, REG]
      hide_if:
        all_of:
          - { M6_size: "1–9" }
          - { D1: { subset_of: ["Files & spreadsheets (e.g. Excel, Google Sheets, local files)"] } }
      choices:
        - value: "Low – data often outdated or unreliable"
          score: 1
          reasoning: "Poor quality yields unreliable AI"
          model_input_context: "Frequent data issues."
        - value: "Medium – manual checks"
          score: 2
          reasoning: "Some QC but error-prone"
          model_input_context: "Manual quality checks."
        - value: "High – periodic tests"
          score: 3
          reasoning: "Regular tests improve trust"
          model_input_context: "Scheduled data quality tests."
        - value: "Very high – automated alerts"
          score: 4
          reasoning: "Proactive alerting"
          model_input_context: "Automated data issue alerts."
        - value: "Excellent – real-time monitoring"
          score: 5
          reasoning: "Continuous validation = best practice"
          model_input_context: "Real-time quality assurance."
      required: true

    - id: D5
      text: "Which security controls protect your data infrastructure?"
      type: multi
      helper: "Security controls keep data safe—encryption, access controls, monitoring."
      choices:
        - "Encryption at rest (e.g. data encrypted on AWS S3 or Azure Blob Storage)"
        - "TLS/HTTPS in transit (e.g. API calls over HTTPS)"
        - "Role-based access controls (e.g. Google Cloud IAM, Azure RBAC)"
        - "Audit logs & monitoring (e.g. AWS CloudTrail, GCP Stackdriver)"
        - "Data Loss Prevention (DLP) (e.g. Google Cloud DLP, Azure Purview)"
        - "Tokenization (e.g. Vault-based tokenization of sensitive fields)"
        - "Differential privacy (e.g. noise injection for analytics)"
        - "None"
        - "I don’t know"
        - "Other (please specify)"
      score_per: 15
      cap: 100
      reasoning: "More controls = stronger security"
      model_input_context: "Number of implemented controls indicates security maturity."
      required: true

    - id: D6
      text: "How is data stewardship and cleaning managed?"
      type: single
      choices:
        - value: "No owner"
          score: 1
          reasoning: "No steward = neglect"
          model_input_context: "No designated data steward."
        - value: "Occasional clean-ups"
          score: 2
          reasoning: "Sporadic maintenance"
          model_input_context: "Reactive cleanup activities."
        - value: "Assigned owner with periodic review"
          score: 3
          reasoning: "Basic stewardship"
          model_input_context: "Owner assigned, periodic reviews."
        - value: "Dedicated steward with monthly routines"
          score: 4
          reasoning: "Regular maintenance"
          model_input_context: "Monthly stewardship routines."
        - value: "Continuous stewardship & monitoring"
          score: 5
          reasoning: "Ongoing oversight"
          model_input_context: "Continuous data monitoring."
      required: true

    - id: D7
      text: "How prepared are you for GDPR or EU AI Act audits?"
      type: single
      helper: "Indicate readiness for compliance or security audits."
      choices:
        - value: "None – no audit readiness"
          score: 1
          reasoning: "No audit capability = low trust"
          model_input_context: "No audit trails or docs."
        - value: "Basic logs only"
          score: 2
          reasoning: "Minimal traceability"
          model_input_context: "Simple logging only."
        - value: "Audit trail for critical systems"
          score: 3
          reasoning: "Key-system traceability"
          model_input_context: "Critical systems logged."
        - value: "Explainability logs + scripts"
          score: 4
          reasoning: "Explainability built into logs"
          model_input_context: "Logs include model rationale."
        - value: "Automated compliance checks"
          score: 5
          reasoning: "Fully automated audits"
          model_input_context: "Automated audit pipelines."
      required: true

    - id: D8
      text: "How mature is your data valueing and annotation process?"
      type: single
      show_if:
        track: [TECH, REG]
      choices:
        - value: "None"
          score: 1
          reasoning: "No values = hampers supervised learning"
          model_input_context: "No valueing process."
        - value: "Ad-hoc manual valueing"
          score: 2
          reasoning: "Unstructured values"
          model_input_context: "Manual ad-hoc valueing."
        - value: "Defined guidelines"
          score: 3
          reasoning: "Standard guidelines"
          model_input_context: "Formal valueing guidelines."
        - value: "Standard taxonomy across datasets"
          score: 4
          reasoning: "Unified taxonomy"
          model_input_context: "Consistent taxonomy applied."
        - value: "Automated valueing & ontology management"
          score: 5
          reasoning: "Automated enrichment"
          model_input_context: "Tool-driven valueing automation."
      required: true

    - id: D9
      text: "Do you use synthetic or third-party data to augment your datasets?"
      type: single
      show_if:
        track: TECH
      choices:
        - value: "No"
          score: 1
          reasoning: "No synthetic data = limits modelling"
          model_input_context: "No synthetic data usage."
        - value: "Exploring choices"
          score: 2
          reasoning: "Considering but not using"
          model_input_context: "Evaluating synthetic data."
        - value: "Limited pilots"
          score: 3
          reasoning: "Initial experiments"
          model_input_context: "Small-scale pilots."
        - value: "Regular production use"
          score: 4
          reasoning: "Mature usage"
          model_input_context: "Production synthetic data workflows."
        - value: "Extensive synthetic pipelines"
          score: 5
          reasoning: "Best practice"
          model_input_context: "Automated synthetic data pipelines."
      required: true

    - id: D10
      text: "How developed are your AI ethics and data privacy policies?"
      type: single
      helper: "Select the maturity stage of your policies and enforcement."
      choices:
        - value: "No formal policies"
          score: 1
          reasoning: "No policies = compliance risk"
          model_input_context: "No documented policies."
        - value: "High-level principles only"
          score: 2
          reasoning: "Principles exist but lack detail"
          model_input_context: "Principles without guidance."
        - value: "Documented guidelines (no training/oversight)"
          score: 3
          reasoning: "Guidelines exist but not enforced"
          model_input_context: "Docs without training."
        - value: "Guidelines + training & oversight"
          score: 4
          reasoning: "Training + oversight fosters adoption"
          model_input_context: "Workshops and reviews in place."
        - value: "Audited & continuously improved"
          score: 5
          reasoning: "Regular audits & updates = best practice"
          model_input_context: "Automated compliance cycles."
      required: true

section_4:
  category: tools
  purpose: "Tool stack & integration maturity (to power workflow and AI agent recommendations)."
  pillar_scores:
    toolset_breadth:
      logic: |
        return min(len(response["T0_tools"]), 5)
    integration_maturity:
      logic: |
        return (response["T1"] + response["T3"]) / 2
    reliability_resilience:
      logic: |
        return (response["T2"] + response["T7"]) / 2
    infrastructure_architecture:
      logic: |
        vals = [ response["T5"], response["T6"], response["T9"] ]
        return sum(vals) / len(vals)
    automation_execution:
      logic: |
        return (response["T4"] + response["T8"]) / 2

  questions:
    - id: T0_tools
      text: "Which tools are actively used by you and your team?"
      type: multi_group
      helper: "Select all tools your team uses—this drives tailored workflow and AI agent suggestions."
      score_by_count:
        "1": 0
        "2-3": 25
        "4-6": 50
        "7-9": 75
        ">=10": 100
      groups:
        - value: "Performance Monitoring"
          show_if: { track: TECH }
          choices:
            - "New Relic"
            - "Datadog"
            - "Dynatrace"
            - "AppDynamics"
            - "Elastic APM"
            - "Sentry"
            - "Splunk APM"
            - "Pingdom"
            - "Bubble"
            - "Mistral"
            - "Other performance monitoring tool (please specify)"
        - value: "Infrastructure & Network Monitoring"
          show_if: { track: TECH }
          choices:
            - "Zabbix"
            - "Nagios"
            - "PRTG"
            - "SolarWinds"
            - "Site24x7"
            - "ManageEngine"
            - "Grafana"
            - "Prometheus"
            - "Checkmk"
            - "Other infrastructure monitoring tool (please specify)"
        - value: "Cloud & DevOps Monitoring"
          show_if: { track: TECH }
          choices:
            - "AWS CloudWatch"
            - "Azure Monitor"
            - "Google Cloud Operations"
            - "LogicMonitor"
            - "Sumo Logic"
            - "PagerDuty"
            - "StatusPage"
            - "Other cloud monitoring tool (please specify)"
        - value: "Web Analytics & User Experience"
          show_if: { track: TECH }
          choices:
            - "Google Analytics"
            - "Adobe Analytics"
            - "Hotjar"
            - "Mixpanel"
            - "Amplitude"
            - "Tealium"
            - "Webflow"
            - "Matomo"
            - "Plausible"
            - "Other web analytics tool (please specify)"
        - value: "Data Management & ETL"
          show_if: { track: TECH }
          choices:
            - "Snowflake"
            - "Databricks"
            - "Fivetran"
            - "Stitch"
            - "Talend"
            - "Apache Airflow"
            - "Other data management tool (please specify)"
        - value: "API Integration & Workflow Automation"
          show_if: { track: TECH }
          choices:
            - "Zapier"
            - "Power Automate"
            - "MuleSoft"
            - "Make"
            - "n8n"
            - "Workato"
            - "Tray.io"
            - "Other automation tool (please specify)"
        - value: "Email Marketing & Communication"
          show_if: { track: GEN }
          choices:
            - "Mailchimp"
            - "Constant Contact"
            - "SendGrid"
            - "Campaign Monitor"
            - "ConvertKit"
            - "ActiveCampaign"
            - "GetResponse"
            - "Cordial"
            - "Brevo (Sendinblue)"
            - "AWeber"
            - "Other email marketing tool (please specify)"
        - value: "Customer Relations & Sales Management"
          show_if: { track: GEN }
          choices:
            - "Salesforce"
            - "HubSpot"
            - "Pipedrive"
            - "Zoho CRM"
            - "Freshsales"
            - "Monday.com"
            - "Close.io"
            - "Zendesk"
            - "Intercom"
            - "Other CRM tool (please specify)"
        - value: "E-commerce & Payment Processing"
          show_if: { track: GEN }
          choices:
            - "Shopify"
            - "WooCommerce"
            - "Stripe"
            - "PayPal"
            - "BigCommerce"
            - "Magento"
            - "Square"
            - "Other e-commerce tool (please specify)"
        - value: "Digital Advertising & Marketing"
          show_if: { track: GEN }
          choices:
            - "Google Ads"
            - "Facebook Ads"
            - "LinkedIn Ads"
            - "Microsoft Advertising"
            - "Twitter Ads"
            - "Pinterest Ads"
            - "TikTok Ads"
            - "Other advertising tool (please specify)"
        - value: "Business Intelligence & Analytics"
          show_if: { track: GEN }
          choices:
            - "Tableau"
            - "Power BI"
            - "Looker"
            - "Qlik Sense"
            - "Sisense"
            - "Domo"
            - "SurveyMonkey"
            - "Other BI tool (please specify)"
        - value: "Project Management & Productivity"
          show_if: { track: GEN }
          choices:
            - "Asana"
            - "Trello"
            - "Jira"
            - "Slack"
            - "Microsoft Teams"
            - "Notion"
            - "ClickUp"
            - "Other productivity tool (please specify)"
        - value: "Financial Management & Accounting"
          show_if: { track: GEN }
          choices:
            - "QuickBooks"
            - "Xero"
            - "FreshBooks"
            - "Sage"
            - "Wave"
            - "Odoo"
            - "Henrri.net"
            - "Other financial tool (please specify)"
        - value: "Business Process Management"
          show_if: { track: GEN }
          choices:
            - "Kissflow"
            - "Nintex"
            - "Pipefy"
            - "ProcessMaker"
            - "Appian"
            - "Pegasystems"
            - "Other workflow tool (please specify)"
        - value: "Data Privacy & GDPR Compliance"
          show_if: { track: REG }
          choices:
            - "OneTrust"
            - "TrustArc"
            - "CookieYes"
            - "Usercentrics"
            - "Didomi"
            - "Cookiebot"
            - "DataGrail"
            - "Other privacy tool (please specify)"
        - value: "Security & Risk Management"
          show_if: { track: REG }
          choices:
            - "Qualys"
            - "Rapid7"
            - "Tenable"
            - "CrowdStrike"
            - "SentinelOne"
            - "Splunk"
            - "Other security tool (please specify)"
        - value: "Audit & Governance"
          show_if: { track: REG }
          choices:
            - "AuditBoard"
            - "MetricStream"
            - "ServiceNow GRC"
            - "RSA Archer"
            - "LogicGate"
            - "Resolver"
            - "Other GRC tool (please specify)"
        - value: "Industry-Specific Compliance"
          show_if: { track: REG }
          choices:
            - "Fenergo"
            - "RegEd"
            - "Thomson Reuters"
            - "Other regulatory tool (please specify)"
        - value: "Document & Records Management"
          show_if: { track: REG }
          choices:
            - "SharePoint"
            - "DocuSign"
            - "Box"
            - "Dropbox Business"
            - "M-Files"
            - "FileHold"
      required: true

    - id: T1
      text: "How well are your tools and systems connected?"
      type: single
      choices:
        - value: "Siloed – no connections"
          score: 1
          reasoning: "Disconnected tools = poor scaling"
          model_input_context: "No integration between systems."
        - value: "Manual – CSV imports/exports"
          score: 2
          reasoning: "Labor-intensive, error-prone"
          model_input_context: "CSV-based manual syncs."
        - value: "Batch – scheduled syncs"
          score: 3
          reasoning: "Regular but delayed"
          model_input_context: "Scheduled batch integrations."
        - value: "API – platform integrations"
          score: 4
          reasoning: "Modern architecture"
          model_input_context: "API-driven connections."
        - value: "Real-time – event-driven mesh"
          score: 5
          reasoning: "Event-driven mesh = highest maturity"
          model_input_context: "Real-time event-driven integrations."
      required: true

    - id: T2
      text: "How often do data connections fail or cause issues?"
      type: single
      choices:
        - value: "Weekly – frequent failures"
          score: 1
          reasoning: "Frequent failures = low trust"
          model_input_context: "Systems fail weekly."
        - value: "Monthly – occasional errors"
          score: 2
          reasoning: "Some reliability issues"
          model_input_context: "Systems error monthly."
        - value: "Quarterly – rare problems"
          score: 3
          reasoning: "Fairly stable"
          model_input_context: "Quarterly issues."
        - value: "Almost never – very stable"
          score: 4
          reasoning: "High reliability"
          model_input_context: "Rare issues."
        - value: "Never – fully reliable"
          score: 5
          reasoning: "No failures = best practice"
          model_input_context: "Zero failures."
      required: true

    - id: T3
      text: "Who owns and maintains your system integrations?"
      type: single
      choices:
        - value: "No clear owner"
          score: 1
          reasoning: "No ownership = accountability gaps"
          model_input_context: "No integration accountability."
        - value: "External agency/freelancer"
          score: 2
          reasoning: "Outsourced, limited internal capacity"
          model_input_context: "External manages integrations."
        - value: "Ops/Product team"
          score: 3
          reasoning: "Shared responsibility"
          model_input_context: "Ops/Product share duties."
        - value: "Internal tech team"
          score: 4
          reasoning: "Dedicated capability"
          model_input_context: "Tech team owns integrations."
        - value: "Dedicated integration team"
          score: 5
          reasoning: "Specialized → high maturity"
          model_input_context: "Integration specialists."
      required: true

    - id: T4
      text: "How well are you connected to external AI services and LLMs?"
      type: single
      helper: "Indicates which LLMs you’re allowed or have in-house."
      choices:
        - value: "Not allowed"
          score: 1
          reasoning: "Bans LLMs = stifles innovation"
          model_input_context: "LLM usage prohibited."
        - value: "Exploratory tests only"
          score: 2
          reasoning: "Sandbox tests"
          model_input_context: "LLMs tested in sandbox."
        - value: "Pilot deployments (small projects)"
          score: 3
          reasoning: "Small-scale pilots"
          model_input_context: "Limited production pilots."
        - value: "One API in production"
          score: 4
          reasoning: "Single integration"
          model_input_context: "One LLM API live."
        - value: "Multiple APIs in production + internal LLM access"
          score: 5
          reasoning: "Broad integration"
          model_input_context: "Multiple APIs and internal models."
      required: true

    - id: T5
      text: "What access do you have to GPU/TPU compute?"
      type: single
      show_if: { track: [TECH, REG] }
      choices:
        - value: "None"
          score: 1
          reasoning: "No compute = restricts AI"
          model_input_context: "No GPU/TPU resources."
        - value: "Colab only"
          score: 2
          reasoning: "Free/shared → early stage"
          model_input_context: "Google Colab access only."
        - value: "On-demand cloud GPUs/TPUs"
          score: 3
          reasoning: "Pay-as-you-go"
          model_input_context: "Cloud-based compute."
        - value: "Dedicated GPU/TPU budget"
          score: 4
          reasoning: "Budgeted hardware"
          model_input_context: "Allocated compute budget."
        - value: "Managed AI compute cluster"
          score: 5
          reasoning: "Best practice cluster"
          model_input_context: "Dedicated AI cluster."
      required: true

    - id: T6
      text: "How well is your technical or data architecture documented?"
      type: single
      show_if: { track: [TECH, REG] }
      choices:
        - value: "None"
          score: 1
          reasoning: "No diagrams = ad-hoc systems"
          model_input_context: "No architecture docs."
        - value: "High-level sketches"
          score: 2
          reasoning: "Rough mapping"
          model_input_context: "Basic sketches only."
        - value: "Critical systems mapped"
          score: 3
          reasoning: "Key components documented"
          model_input_context: "Critical systems documented."
        - value: "Full architecture diagrams"
          score: 4
          reasoning: "Comprehensive documentation"
          model_input_context: "Detailed diagrams maintained."
        - value: "Auto-generated & maintained docs"
          score: 5
          reasoning: "Automated up-to-date docs"
          model_input_context: "Docs auto-generated."
      required: true

    - id: T7
      text: "What level of disaster recovery planning exists for data & AI?"
      type: single
      show_if: { track: [TECH, REG] }
      choices:
        - value: "No plan"
          score: 1
          reasoning: "No plan = high risk"
          model_input_context: "No recovery planning."
        - value: "Backups only"
          score: 2
          reasoning: "Limited resilience"
          model_input_context: "Backups without failover."
        - value: "Manual failover"
          score: 3
          reasoning: "Manual recovery"
          model_input_context: "Human-driven failover."
        - value: "Automated failover"
          score: 4
          reasoning: "Quick recovery"
          model_input_context: "Automated failover scripts."
        - value: "AI-aware recovery playbook"
          score: 5
          reasoning: "AI scenarios covered"
          model_input_context: "Playbooks include AI failures."
      required: true

    - id: T8
      text: "Which low-code or no-code platforms do you use for automation?"
      type: multi
      helper: "Select all platforms; choose None if none."
      choices:
        - value: "None – no low-code/no-code tools"
        - value: "Zapier – connect apps with workflows"
        - value: "Make – multi-step automation builder"
        - value: "n8n – self-hosted workflow automation"
        - value: "Power Automate – Microsoft flow automation"
        - value: "UiPath – RPA for desktop & web"
        - value: "Workato – enterprise integration platform"
        - value: "Airbyte – ELT data pipelines"
        - value: "Fivetran – automated data connectors"
        - value: "dbt – analytics engineering"
      score_per: 1
      cap: 5
      reasoning: "More tools = higher maturity"
      model_input_context: "Indicates automation maturity."
      required: true
section_5:
  category: automation
  purpose: "Automation maturity & AI agent governance."
  pillar_scores:
    strategy_scope:
      logic: |
        return response["A1"]
    agent_deployment:
      logic: |
        return response["A3"]
    execution_scale:
      logic: |
        vals = [ response["A2"], sum(response["A4"]) if isinstance(response["A4"], list) else response["A4"], sum(response["A8"]) if isinstance(response["A8"], list) else response["A8"] ]
        return sum(vals) / len(vals)
    governance_monitoring:
      logic: |
        vals = [ response["A6"], response["A9"], response["A11"] ]
        return sum(vals) / len(vals)
    risk_resilience:
      logic: |
        return (response["A7"] + response["A10"]) / 2

  questions:
    - id: A1
      text: "Which three tasks would most benefit from automation in your organization?"
      type: rank
      helper: "Rank your top priorities for automation."
      choices:
        - value: "Reporting"
          score: 1
        - value: "Scheduling"
          score: 1
        - value: "Data entry"
          score: 1
        - value: "FAQ handling"
          score: 1
        - value: "Ticket triage"
          score: 1
        - value: "Contract generation"
          score: 1
        - value: "Inventory management"
          score: 1
        - value: "Compliance checks"
          score: 1
        - value: "Other (please specify)"
          score: 0
      max_rank: 3
      weight: [40, 30, 20]
      reasoning: "Breadth indicates strategic focus."
      model_input_context: "Identifies key automation priorities."
      required: true

    - id: A1_other
      text: "Please specify your custom task for automation"
      type: text
      show_if:
        A1:
          contains: "Other (please specify)"
      required: true

    - id: A2
      text: "How mature are your current automation efforts?"
      type: single
      choices:
        - value: "None – no automation"
          score: 1
        - value: "1 – ad-hoc scripts only"
          score: 2
        - value: "2 – basic tools with manual oversight"
          score: 3
        - value: "3 – integrated workflows across functions"
          score: 4
        - value: "4 – continuous automation with monitoring"
          score: 5
        - value: "5 – fully autonomous processes"
          score: 5
      required: true

    - id: A3
      text: "What is the current status of AI agents in your operations?"
      type: single
      choices:
        - value: "None implemented – no AI agents"
          score: 1
        - value: "Prototype built – early proof of concept"
          score: 2
        - value: "One agent in production – single live agent"
          score: 3
        - value: "Multiple agents live – several agents running"
          score: 4
        - value: "Organization-wide deployment – agents across teams"
          score: 5
      required: true

    - id: A4
      text: "Which tasks are you considering for AI-agent automation?"
      type: multi
      helper: "Select all that apply."
      choices:
        - value: "Reporting"
        - value: "Scheduling"
        - value: "Data entry"
        - value: "FAQ handling"
        - value: "Ticket triage"
        - value: "Contract generation"
        - value: "Inventory management"
        - value: "Compliance checks"
      score_per: 10
      cap: 100
      reasoning: "Variety indicates maturity."
      model_input_context: "Range of agent use cases."
      required: true

    - id: A6
      text: "How do you monitor and alert on your automated processes?"
      type: single
      helper: "Ensures reliability and rapid issue resolution."
      choices:
        - value: "No monitoring"
          score: 1
        - value: "Manual checks"
          score: 2
        - value: "KPI dashboards"
          score: 3
        - value: "Automated alerts"
          score: 4
        - value: "Full observability & logging"
          score: 5
      required: true

    - id: A7
      text: "What are the main blockers to automating tasks and deploying AI agents?"
      type: multi
      helper: "Select all that apply."
      choices:
        - value: "Data silos"
        - value: "Lack of technical resources"
        - value: "Insufficient buy-in"
        - value: "Compliance concerns"
        - value: "Unclear ROI"
        - value: "Budget constraints"
        - value: "Integration complexity"
      score_formula: "100 - 10 * count"
      reasoning: "Fewer barriers = higher readiness."
      model_input_context: "Identifies adoption risks."
      required: true

    - id: A8
      text: "Which interface do you prefer for interacting with AI agents?"
      type: multi
      helper: "Helps tailor agent UI recommendations."
      choices:
        - value: "Chatbot (Slack/Teams)"
        - value: "Embedded widget"
        - value: "Dashboard"
        - value: "Email assistant"
        - value: "API/CLI"
        - value: "Voice assistant"
        - value: "Need guidance"
      score_per: 10
      cap: 100
      reasoning: "Interface diversity = higher maturity."
      model_input_context: "Indicates preferred agent access."
      required: true

    - id: A9
      text: "What governance processes do you have for AI agents?"
      type: single
      helper: "Ensures safe, compliant agent operations."
      choices:
        - value: "None"
          score: 1
        - value: "Ad-hoc spot checks"
          score: 2
        - value: "Formal review process"
          score: 3
        - value: "Logging with oversight"
          score: 4
        - value: "Continuous auditing"
          score: 5
      hide_if:
        A3: "None implemented – no AI agents"
      required: true

    - id: A10
      text: "What recovery or rollback strategy exists for failed automations or AI agents?"
      type: single
      helper: "Defines resilience and business continuity."
      choices:
        - value: "No plan"
          score: 1
        - value: "Manual rollback steps"
          score: 2
        - value: "Pre-defined failover procedures"
          score: 3
        - value: "Automated rollback"
          score: 4
        - value: "Self-healing loops"
          score: 5
      hide_if:
        A3: "None implemented – no AI agents"
      required: true

    - id: A11
      text: "How do you track the accuracy and quality of AI agent outputs?"
      type: single
      helper: "Drives training on output validation and testing."
      choices:
        - value: "No tracking"
          score: 1
        - value: "Manual spot checks"
          score: 2
        - value: "Release testing"
          score: 3
        - value: "Ongoing tests + spot checks"
          score: 4
        - value: "Continuous accuracy monitoring"
          score: 5
      hide_if:
        A3: "None implemented – no AI agents"
      required: true

section_6:
  category: people
  purpose: "Team capability & learning culture (to drive targeted training recommendations)."
  pillar_scores:
    adoption_engagement:
      logic: |
        vals = [ response["C1"], len(response["C8"]) if isinstance(response["C8"], list) else response["C8"], response["C9"] ]
        return sum(vals) / len(vals)
    skills_sharing:
      logic: |
        matrix_vals = list(response["C2"].values())
        vals = [ sum(matrix_vals) / len(matrix_vals), response["C3"], sum(response["C3a"]) if isinstance(response["C3a"], list) else response["C3a"] ]
        return sum(vals) / len(vals)
    training_investment:
      logic: |
        vals = [ response["C4"], response["C5"], response["C6"] ]
        return sum(vals) / len(vals)
    collaboration_safety:
      logic: |
        vals = [ response["C10"], response["C11"] ]
        return sum(vals) / len(vals)
    external_support:
      logic: |
        return response["C7"]

  questions:
    - id: C1
      text: "How often do you and your team use AI tools in your daily work?"
      type: single
      choices:
        - value: "Never"
          score: 1
        - value: "Rarely"
          score: 2
        - value: "Monthly"
          score: 3
        - value: "Weekly"
          score: 4
        - value: "Daily"
          score: 5
      required: true

    - id: C2
      text: "How confident are you and your team at these prompt-writing skills?"
      type: matrix
      rows:
        - "Writing basic prompts"
        - "Using few-shot examples"
        - "Formatting structured prompts"
        - "Designing multi-step prompt chains"
      columns:
        - value: "No confidence"
          score: 1
        - value: "Some confidence"
          score: 2
        - value: "Confident"
          score: 3
        - value: "Very confident"
          score: 4
      required: true

    - id: C3
      text: "How do you and your team share AI learnings internally?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "Informal tips & tricks"
          score: 2
        - value: "Dedicated chat channel"
          score: 3
        - value: "Regular workshops"
          score: 4
        - value: "Active Community of Practice"
          score: 5
      required: true

    - id: C3a
      text: "Which AI training topics should you and your team prioritize? (Rank top 3)"
      type: rank
      choices:
        - value: "Prompt engineering"
          score: 3
        - value: "AI tool mastery"
          score: 3
        - value: "Data literacy"
          score: 3
        - value: "Model fine-tuning"
          score: 3
        - value: "Retrieval-augmented generation"
          score: 3
        - value: "Agent orchestration"
          score: 3
        - value: "Ethics & governance"
          score: 3
      max_rank: 3
      weight: [50, 30, 20]
      required: true

    - id: C4
      text: "What annual budget do you and your team allocate per person for AI upskilling?"
      type: single
      choices:
        - value: "0 €"
          score: 1
        - value: "< €200"
          score: 2
        - value: "200–500 €"
          score: 3
        - value: "500–1 000 €"
          score: 4
        - value: "> 1 000 €"
          score: 5
      required: true

    - id: C5
      text: "How many hours per month can you and your team dedicate to AI training?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "< 1 hr"
          score: 2
        - value: "1–3 hrs"
          score: 3
        - value: "3–5 hrs"
          score: 4
        - value: "> 5 hrs"
          score: 5
      required: true

    - id: C6
      text: "What format do you and your team prefer for AI training delivery?"
      type: single
      choices:
        - value: "Text guides"
          score: 1
        - value: "Short videos"
          score: 2
        - value: "Live workshops"
          score: 3
        - value: "Self-paced courses"
          score: 4
        - value: "Mixed formats"
          score: 5
      required: true

    - id: C7
      text: "How often do you and your team engage external AI experts?"
      type: single
      choices:
        - value: "None – no external support"
          score: 1
        - value: "Occasional advice"
          score: 2
        - value: "Regular advisory sessions"
          score: 3
        - value: "Access to expert network"
          score: 4
        - value: "Dedicated AI advisory board"
          score: 5
      required: true

    - id: C8
      text: "What stops you and your team from piloting more AI projects?"
      type: multi
      choices:
        - value: "Budget constraints"
        - value: "Lack of skills"
        - value: "Data silos"
        - value: "Compliance concerns"
        - value: "Unclear ROI"
        - value: "Tech complexity"
      score_formula: "100 - 33 * count"
      reasoning: "Fewer blockers = higher readiness."
      required: true

    - id: C9
      text: "How open are you and your team to piloting new AI projects?"
      type: single
      choices:
        - value: "Resistant"
          score: 1
        - value: "Cautious"
          score: 2
        - value: "Interested"
          score: 3
        - value: "Proactive"
          score: 4
        - value: "Active pilots"
          score: 5
      required: true

    - id: C10
      text: "How frequently do you and your team collaborate across functions on AI initiatives?"
      type: single
      choices:
        - value: "Never"
          score: 1
        - value: "Occasionally"
          score: 2
        - value: "Quarterly"
          score: 3
        - value: "In squads"
          score: 4
        - value: "Embedded practice"
          score: 5
      required: true

    - id: C11
      text: "How safe do you and your team feel to experiment and fail with AI?"
      type: single
      choices:
        - value: "No safety – fear of repercussions"
          score: 1
        - value: "Low safety – rarely comfortable"
          score: 2
        - value: "Moderate safety – sometimes comfortable"
          score: 3
        - value: "High safety – often comfortable"
          score: 4
        - value: "Full safety – always encouraged"
          score: 5
      required: true
section_7:
  category: governance
  purpose: "Governance, risk & ethics (to drive targeted policy, oversight, and training recommendations)."
  pillar_scores:
    risk_and_bias_management:
      logic: |
        return response["G1"]
    explainability_transparency:
      logic: |
        vals = [ response["G2"], response["G3"] ]
        return sum(vals) / len(vals)
    incident_response_and_audit:
      logic: |
        vals = [ response["G4"], response["G7"], response["G8"], response["G9"] ]
        return sum(vals) / len(vals)
    oversight_and_compliance:
      logic: |
        vals = [ response["G5"], response["G6"] ]
        return sum(vals) / len(vals)
    fairness_and_ethics_oversight:
      logic: |
        return response["G10"]

  questions:
    - id: G1
      text: "How mature are your processes for identifying and mitigating AI risks and biases?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "Reactive fixes"
          score: 2
        - value: "Pre-release checks"
          score: 3
        - value: "Formal framework"
          score: 4
        - value: "AI-Act–compliant"
          score: 5
      required: true

    - id: G2
      text: "How well can you explain and audit AI model decisions?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "High-risk only"
          score: 2
        - value: "Audit logs"
          score: 3
        - value: "All models"
          score: 4
        - value: "Audit-ready"
          score: 5
      required: true

    - id: G3
      text: "How transparent are you with users and stakeholders about AI use?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "Policy only"
          score: 2
        - value: "Docs & FAQs"
          score: 3
        - value: "Explain button"
          score: 4
        - value: "Full disclosure"
          score: 5
      required: true

    - id: G4
      text: "What level of incident response planning exists for AI failures or harms?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "General IT plan"
          score: 2
        - value: "Manual rollback"
          score: 3
        - value: "Automated rollback"
          score: 4
        - value: "Playbook"
          score: 5
      required: true

    - id: G5
      text: "What level of human oversight do you enforce on AI outputs?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "Final review"
          score: 2
        - value: "Spot checks"
          score: 3
        - value: "Human-in-loop"
          score: 4
        - value: "Escalation"
          score: 5
      required: true

    - id: G6
      text: "How deeply is privacy built into your AI development process?"
      type: single
      choices:
        - value: "Basic compliance"
          score: 1
        - value: "Enhanced controls"
          score: 2
        - value: "PETs"
          score: 3
        - value: "By design"
          score: 4
        - value: "Automated"
          score: 5
      required: true

    - id: G7
      text: "What is the status of independent audits for your AI systems?"
      type: single
      show_if: { track: [REG, TECH] }
      choices:
        - value: "None"
          score: 1
        - value: "Planned"
          score: 2
        - value: "In progress"
          score: 3
        - value: "Completed"
          score: 4
        - value: "Ongoing"
          score: 5
      required: true

    - id: G8
      text: "How far along are you in mapping AI risks under the EU AI Act?"
      type: single
      choices:
        - value: "Not aware"
          score: 1
        - value: "Aware"
          score: 2
        - value: "Mapping started"
          score: 3
        - value: "Completed"
          score: 4
        - value: "Reported"
          score: 5
      required: true

    - id: G9
      text: "How regularly do you test your AI models for fairness?"
      type: single
      show_if: { track: [REG, TECH] }
      choices:
        - value: "Never"
          score: 1
        - value: "Ad-hoc"
          score: 2
        - value: "Pre-release"
          score: 3
        - value: "Quarterly"
          score: 4
        - value: "Continuous"
          score: 5
      required: true

    - id: G10
      text: "What governance body oversees your AI ethics and compliance?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "Informal"
          score: 2
        - value: "Ad-hoc"
          score: 3
        - value: "Scheduled"
          score: 4
        - value: "External"
          score: 5
      required: true

section_8:
  category: strategy
  purpose: "Implementation horizon, KPIs & vision (to align training and strategic planning)."
  pillar_scores:
    adoption_timeline:
      logic: |
        return response["P1"]
    risk_appetite:
      logic: |
        return response["P2"]
    success_metrics:
      logic: |
        vals = response["P3"]
        return sum(vals) / len(vals) if vals else 0
    resource_strategy:
      logic: |
        return response["P4"]
    architecture_preferences:
      logic: |
        vals = response["P5"]
        return sum(vals) / len(vals) if vals else 0
    external_support:
      logic: |
        return response["P6"]
    change_impact:
      logic: |
        return response["P7"]

  questions:
    - id: P1
      text: "When do you plan to roll out your AI initiatives?"
      type: single
      choices:
        - value: "Within 3 months"
          score: 5
        - value: "3–6 months"
          score: 4
        - value: "6–12 months"
          score: 3
        - value: "Over 12 months"
          score: 2
      required: true

    - id: P2
      text: "What level of risk are you comfortable taking on AI projects?"
      type: single
      choices:
        - value: "Conservative"
          score: 2
        - value: "Cautious"
          score: 3
        - value: "Balanced"
          score: 4
        - value: "Bold"
          score: 5
      required: true

    - id: P3
      text: "Which success metrics are most important for your AI work? (Select up to 3)"
      type: multi
      max_select: 3
      choices:
        - value: "Return on Investment (ROI)"
          score: 5
        - value: "Cost reduction"
          score: 4
        - value: "Operational efficiency"
          score: 4
        - value: "Customer experience"
          score: 3
        - value: "Employee productivity"
          score: 3
        - value: "Innovation outcomes"
          score: 5
        - value: "Regulatory compliance"
          score: 4
        - value: "Sustainability impact"
          score: 4
      required: true

    - id: P4
      text: "What is your preferred resource strategy for AI projects?"
      type: single
      choices:
        - value: "Fully in-house build"
          score: 5
        - value: "Hybrid"
          score: 4
        - value: "Fully outsourced"
          score: 2
      required: true

    - id: P5
      text: "Which technology architectures do you prefer for AI solutions? (Select all)"
      type: multi
      choices:
        - value: "Cloud-native"
          score: 5
        - value: "Hybrid/on-premise"
          score: 4
        - value: "API-first"
          score: 4
        - value: "Low-code/no-code"
          score: 3
        - value: "Open-source frameworks"
          score: 4
        - value: "Enterprise software suites"
          score: 3
      required: true

    - id: P6
      text: "What level of external support do you expect for AI implementation?"
      type: single
      choices:
        - value: "None"
          score: 1
        - value: "Occasional consulting"
          score: 2
        - value: "Ongoing advisory"
          score: 3
        - value: "Managed services"
          score: 4
        - value: "Full outsourcing"
          score: 2
      required: true

    - id: P7
      text: "How significant of an organizational change are you prepared for to adopt AI?"
      type: single
      choices:
        - value: "Minimal changes"
          score: 1
        - value: "Minor tweaks"
          score: 2
        - value: "Moderate transformation"
          score: 3
        - value: "Major transformation"
          score: 4
        - value: "Continuous evolution"
          score: 5
      required: true
add_ons:
  - id: T9
    show_if: { track: "TECH" }
    text: "How do you deploy ML models and monitor them in production?"
    type: single
    helper: "Deployment and monitoring ensure reliability and fast issue detection."
    choices:
      - value: "No deployment – models not in production"
        score: 1
      - value: "Manual scripts – ad-hoc launches"
        score: 2
      - value: "CI/CD pipeline – automated builds & deploys"
        score: 3
      - value: "MLOps platform (e.g. Kubeflow, MLflow) with monitoring"
        score: 4
      - value: "Fully automated blue/green deployments + rollback"
        score: 5
    required: true

  - id: F8
    show_if: { track: "REG" }
    text: "Which mechanisms do you use for cross-border data transfers?"
    type: single
    helper: "GDPR requires lawful transfer—select your standard approach."
    choices:
      - value: "No cross-border transfers"
        score: 1
      - value: "Ad-hoc contracts"
        score: 2
      - value: "Standard Contractual Clauses (SCCs)"
        score: 3
      - value: "Binding Corporate Rules (BCRs)"
        score: 4
      - value: "Adequacy decision + continuous monitoring"
        score: 5
    required: true

ui:
  progress_counter: true
  save_resume: true
  ranking_accessible: true
  mobile_touch_tested: true
  auto_deselect_none: true

validation:
  - rule: "Other selected → text field required"
  - rule: "All visible questions required"
  - rule: "Cap visible questions at 60; auto-hide D2 then P6"

scoring:
  use_explicit_option_scores: true
  weight_by_track: weight_vectors
  neutral_for_hidden: 50
  confidence_penalty:
    apply_to: [D2, unknown_like]

reporting:
  show_hidden_explanation: true
  benchmarks: by_track
  store_only: true
  admin_endpoint: /api/admin/assessment

version:
  assessment_version: "2.0"
  schema_date: "2025-08-03"

`,nf={section_0:"Organization Profile",section_1:"Strategy & Use-Case Readiness",section_2:"Budget, Runway & Compliance",section_3:"Data Foundation & Security",section_4:"Tool Stack & Integration",section_5:"Automation & AI Agents",section_6:"Team Capability & Culture",section_7:"Governance, Risk & Ethics",section_8:"Implementation Horizon & Vision"};let se;try{if(se=Zm.load(ef),!se||typeof se!="object")throw new Error("Invalid YAML structure")}catch{se={meta:{title:"Assessment unavailable"},section_0:{purpose:"Basic profile information",questions:[{id:"M0",text:"Organization Name",type:"text",required:!0}]}}}function Ri(e){return e==null?void 0:e.map(n=>typeof n=="string"?{value:n,label:n}:n)}function un(e){return e==null?void 0:e.map(n=>typeof n=="string"?{value:n,label:n}:{value:n.value,label:n.value,score:n.score,reasoning:n.reasoning,model_input_context:n.model_input_context})}function Ei(e,n){return!e||!n?un(e):e.map(t=>{const r=typeof t=="string"?t:t.value;for(const[a,o]of Object.entries(n))if(o.includes(r)||o.includes("*"))return{value:r,label:r,score:parseInt(a),reasoning:`Score ${a} based on country classification`,model_input_context:`Respondent's country has score level ${a}`};return{value:r,label:r,score:n[2]?2:0}})}const X=Object.entries(se).filter(([e])=>e.startsWith("section_")).sort(([e],[n])=>e.localeCompare(n,void 0,{numeric:!0})).map(([e,n])=>{const{category:t,purpose:r="",questions:a=[],consent_banner:o,computed:i=[]}=n??{},s=a.map(l=>{const c={id:l.id,text:l.text,type:l.type,helper:l.helper,required:l.required,showIf:l.show_if,hideIf:l.hide_if,scoreMap:l.score_map,scorePer:l.score_per,cap:l.cap,weight:l.weight,maxRank:l.max_rank,maxSelect:l.max_select,scoreFormula:l.score_formula,scoreByCount:l.score_by_count};return c.reasoning=l.reasoning,c.model_input_context=l.model_input_context,l.choices?l.score_map_by_bucket?c.options=Ei(l.choices,l.score_map_by_bucket):c.options=un(l.choices):l.options&&(c.options=Ri(l.options)),l.rows&&(c.rows=[...l.rows]),l.columns&&(c.columns=[...l.columns]),l.groups&&(c.groups=l.groups.map(m=>({label:m.value||m.label,showIf:m.show_if,options:un(m.choices||m.options)||[]}))),c});return i.length,{id:e,title:nf[e]??e,purpose:r,...t?{category:t}:{},questions:s,...o?{consentBanner:o}:{},...i.length?{computed:i}:{}}}),$t=(se.add_ons??[]).map(e=>{const n={id:e.id,text:e.text,type:e.type,helper:e.helper,required:e.required,showIf:e.show_if,hideIf:e.hide_if,scoreMap:e.score_map,scorePer:e.score_per,cap:e.cap,weight:e.weight,maxRank:e.max_rank,maxSelect:e.max_select,scoreFormula:e.score_formula,scoreByCount:e.score_by_count};return n.reasoning=e.reasoning,n.model_input_context=e.model_input_context,e.choices?e.score_map_by_bucket?n.options=Ei(e.choices,e.score_map_by_bucket):n.options=un(e.choices):e.options&&(n.options=Ri(e.options)),e.rows&&(n.rows=[...e.rows]),e.columns&&(n.columns=[...e.columns]),e.groups&&(n.groups=e.groups.map(t=>({label:t.value||t.label,showIf:t.show_if,options:un(t.choices||t.options)||[]}))),n}),Kt={};var Nr;(Nr=se.meta)!=null&&Nr.computed_fields&&Object.entries(se.meta.computed_fields).forEach(([e,n])=>{Kt[e]={id:e,type:"computed",logic:(n==null?void 0:n.logic)||n,formula:n==null?void 0:n.formula,conditions:n==null?void 0:n.conditions}});const cn=se.meta??{},dv=Object.freeze(Object.defineProperty({__proto__:null,assessmentAddOns:$t,assessmentMeta:cn,assessmentSections:X,computedFields:Kt},Symbol.toStringTag,{value:"Module"}));function dn(e,n,t,r,a={}){var s,l;const o={responses:n,track:t,computed:a};if((((s=cn.question_cap)==null?void 0:s.auto_hide)||[]).includes(e.id)){const c=((l=cn.question_cap)==null?void 0:l.max_questions)||60;if(r>=c)return!1}return!(e.hideIf&&pn(e.hideIf,o)||e.showIf&&!pn(e.showIf,o))}function pn(e,n){if(!e||typeof e!="object")return!1;const t=e;if(typeof e=="string")return tf(e,n);if("every"in t)return(Array.isArray(t.every)?t.every:[]).every(a=>pn(a,n));if("some"in t)return(Array.isArray(t.some)?t.some:[]).some(a=>pn(a,n));for(const[r,a]of Object.entries(t)){const o=bt(r,n);if(!rf(o,a))return!1}return!0}function tf(e,n){const t=e.match(/(\w+(?:\.\w+)?)\s+in\s+\[(.*?)\]/);if(t){const a=t[1],o=t[2].split(",").map(s=>s.trim().replace(/['"]/g,"")),i=bt(a,n);return o.includes(String(i))}return!!bt(e,n)}function bt(e,n){if(e.startsWith("computed.")){const t=e.replace("computed.","");return n.computed[t]}return e==="track"?n.track:n.responses[e]}function rf(e,n){if(n==null)return e===n;if(typeof n=="object"&&!Array.isArray(n)){const t=n;if("in"in t&&Array.isArray(t.in))return t.in.includes(e);if("not_in"in t&&Array.isArray(t.not_in))return!t.not_in.includes(e);if("subset_of"in t&&Array.isArray(t.subset_of)&&Array.isArray(e))return e.every(r=>t.subset_of.includes(r));if("gt"in t)return Number(e)>Number(t.gt);if("gte"in t)return Number(e)>=Number(t.gte);if("lt"in t)return Number(e)<Number(t.lt);if("lte"in t)return Number(e)<=Number(t.lte);if("eq"in t)return e===t.eq;if("ne"in t)return e!==t.ne}return e===n}function af(){try{const e=cn.computed_fields,n=e==null?void 0:e.regulated;if(n!=null&&n.logic){const t=n.logic.match(/\[(.*?)\]/);if(t)return t[1].split(",").map(r=>r.trim().replace(/['"]/g,""))}}catch{}return["Finance & Insurance","Health Care & Social Assistance","Utilities (Electricity, Gas, Water & Waste)","Transportation & Warehousing","Manufacturing","Information & Communication Technology","Professional, Scientific & Technical Services","Administrative & Support & Waste Management Services","Accommodation & Food Services"]}function of(){return["CIO / CTO","IT Lead","Data / AI Lead","ML Engineer","Data Engineer","DevOps Engineer","Security Architect","Infrastructure Manager"]}const sf=of(),lf=af(),uf="Legal / Compliance Lead";function cf(e,n={}){var i;const t={responses:e,track:"unknown",computed:n},r=(i=cn.track_detection)==null?void 0:i.precedence;if(Array.isArray(r))for(const s of r){const{then:l,if:c,else:m}=s;if(m&&!c)return m;if(c&&l&&pn(c,t))return l}const a=e.M3,o=e.M4_industry;return sf.includes(a)?"TECH":o&&(lf.includes(o)||a===uf)?"REG":"GEN"}function df({groups:e,value:n,onChange:t,detectedTrack:r="GEN"}){const[a,o]=p.useState(""),[i,s]=p.useState(new Set),l=p.useMemo(()=>e.filter(v=>{if(!v.showIf)return!0;const b={id:`group_${v.label}`,text:v.label,type:"checkbox",showIf:v.showIf};return dn(b,{},r,0,{})}),[e,r]),c=v=>{const b=new Set(i);b.has(v)?b.delete(v):b.add(v),s(b)},m=(v,b)=>{const g=new Set(n);b?g.add(v):g.delete(v),t(Array.from(g))},d=v=>v.options.filter(b=>n.includes(typeof b=="string"?b:b.value)).length,f=l.filter(v=>!a||v.label.toLowerCase().includes(a.toLowerCase())?!0:v.options.some(b=>(typeof b=="string"?b:b.label).toLowerCase().includes(a.toLowerCase()))),h=n.length;return u.jsxs("div",{className:"mt-4 space-y-4",children:[u.jsxs("div",{className:"space-y-3",children:[u.jsxs("div",{className:"relative",children:[u.jsx(bs,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"}),u.jsx(De,{placeholder:"Search tools or categories...",value:a,onChange:v=>o(v.target.value),className:"pl-10"})]}),h>0&&u.jsx("div",{className:"flex items-center gap-2",children:u.jsxs(Ce,{variant:"secondary",children:[h," tool",h!==1?"s":""," selected"]})})]}),u.jsx("div",{className:"space-y-3",children:f.map(v=>{const b=d(v),g=i.has(v.label),y=v.options.filter(x=>a?(typeof x=="string"?x:x.label).toLowerCase().includes(a.toLowerCase()):!0);return u.jsx(xe,{className:"overflow-hidden",children:u.jsxs(Ed,{open:g,onOpenChange:()=>c(v.label),children:[u.jsx(Pd,{asChild:!0,children:u.jsxs("div",{className:"flex items-center justify-between p-4 hover:bg-accent/50 cursor-pointer transition-colors",children:[u.jsxs("div",{className:"flex items-center gap-3",children:[g?u.jsx(_t,{className:"h-4 w-4 text-muted-foreground"}):u.jsx($r,{className:"h-4 w-4 text-muted-foreground"}),u.jsx(Z,{className:"font-medium cursor-pointer",children:v.label})]}),u.jsxs("div",{className:"flex items-center gap-2",children:[b>0&&u.jsx(Ce,{variant:"default",className:"text-xs",children:b}),u.jsxs(Ce,{variant:"outline",className:"text-xs",children:[v.options.length," tools"]})]})]})}),u.jsx(Td,{children:u.jsx("div",{className:"px-4 pb-4 space-y-3 border-t bg-accent/20",children:u.jsx("div",{className:"pt-3 space-y-2",children:y.map(x=>{const _=typeof x=="string"?x:x.value,A=typeof x=="string"?x:x.label;return u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(fn,{id:`${v.label}-${_}`,checked:n.includes(_),onCheckedChange:w=>m(_,w)}),u.jsx(Z,{htmlFor:`${v.label}-${_}`,className:"font-normal cursor-pointer text-sm",children:A})]},_)})})})})]})},v.label)})}),h>0&&u.jsx(xe,{className:"p-4 bg-primary/5 border-primary/20",children:u.jsxs("div",{className:"space-y-2",children:[u.jsx(Z,{className:"font-medium text-sm",children:"Selected Tools:"}),u.jsxs("div",{className:"flex flex-wrap gap-1",children:[n.slice(0,10).map(v=>u.jsx(Ce,{variant:"secondary",className:"text-xs",children:v},v)),h>10&&u.jsxs(Ce,{variant:"secondary",className:"text-xs",children:["+",h-10," more"]})]})]})})]})}const Pi={section_0:{purpose:"Collecter le profil de votre organisation pour détecter la filière et personnaliser les recommandations"},section_1:{purpose:"Évaluer l'alignement stratégique et la maturité de la planification"},section_2:{purpose:"Gérer budget, trésorerie, soutien investisseurs et conformité"},section_3:{purpose:"Fondation des données, sécurité, éthique et conformité"},section_4:{purpose:"Évaluer la maturité de la stack d'outils et leur intégration"},section_5:{purpose:"Évaluer la maturité de l'automatisation et la gouvernance des agents IA"},section_6:{purpose:"Évaluer les capacités de l'équipe et la culture d'apprentissage"},section_7:{purpose:"Évaluer la gouvernance, les risques et l'éthique"},section_8:{purpose:"Aligner l'horizon de déploiement, les KPI et la vision"},M0:{text:"Quel est le nom de votre organisation ?"},M1:{text:"Quel est votre nom complet ?"},M2:{text:"Quelle est votre adresse e-mail professionnelle ?",helper:"Utilisez votre adresse de travail (pas Gmail, Hotmail, etc.)"},M3:{text:"Quel est votre rôle principal ?",options:[{value:"Founder / CEO",label:"Fondateur·rice / CEO"},{value:"C-level executive",label:"Cadre dirigeant·e"},{value:"Head of Marketing",label:"Responsable Marketing"},{value:"Head of Sales",label:"Responsable Commercial"},{value:"Head of Finance",label:"Responsable Finance"},{value:"Head of Operations",label:"Responsable Opérations"},{value:"Product Lead",label:"Responsable Produit"},{value:"HR Lead",label:"Responsable RH"},{value:"Customer Support Lead",label:"Responsable Support Client"},{value:"CIO / CTO",label:"CIO / CTO"},{value:"IT Lead",label:"Responsable IT"},{value:"Data / AI Lead",label:"Responsable Data / IA"},{value:"ML Engineer",label:"Ingénieur·e ML"},{value:"Data Engineer",label:"Ingénieur·e Data"},{value:"DevOps Engineer",label:"Ingénieur·e DevOps"},{value:"Security Architect",label:"Architecte Sécurité"},{value:"Infrastructure Manager",label:"Responsable Infrastructure"},{value:"Legal / Compliance Lead",label:"Responsable Juridique / Conformité"},{value:"Privacy Officer",label:"Responsable Protection des Données"},{value:"Compliance Manager",label:"Responsable Conformité"},{value:"Risk Manager",label:"Responsable Risques"},{value:"Audit Lead",label:"Responsable Audit"},{value:"Governance Officer",label:"Responsable Gouvernance"},{value:"Privacy Lead",label:"Responsable Confidentialité"},{value:"Compliance Lead",label:"Responsable Conformité"},{value:"Risk Lead",label:"Responsable Risques"},{value:"Audit Lead",label:"Responsable Audit"},{value:"Governance Lead",label:"Responsable Gouvernance"}]},M4_industry:{text:"Quel est votre secteur d'activité et sous-secteur ?",options:[{value:"Agriculture, forestry and fishing",label:"Agriculture, forêt et pêche"},{value:"Mining and quarrying",label:"Extraction minière et carrières"},{value:"Utilities (electricity, gas, water, waste)",label:"Services publics (électricité, gaz, eau, déchets)"},{value:"Construction",label:"Construction"},{value:"Manufacturing",label:"Industrie manufacturière"},{value:"Wholesale trade",label:"Commerce de gros"},{value:"Retail trade",label:"Commerce de détail"},{value:"Transportation and warehousing",label:"Transport et entreposage"},{value:"Information and communication technology",label:"Technologies de l'information et de la communication"},{value:"Finance and insurance",label:"Finance et assurance"},{value:"Real estate and rental",label:"Immobilier et location"},{value:"Professional, scientific and technical services",label:"Services professionnels, scientifiques et techniques"},{value:"Administrative and waste management services",label:"Services administratifs et gestion des déchets"},{value:"Educational services",label:"Services d'enseignement"},{value:"Health care and social assistance",label:"Soins de santé et assistance sociale"},{value:"Arts, entertainment and recreation",label:"Arts, spectacles et loisirs"},{value:"Accommodation and food services",label:"Hébergement et restauration"},{value:"Public administration",label:"Administration publique"},{value:"Associations and NGOs",label:"Associations et ONG"}]},M5_country:{text:"Dans quel pays êtes-vous basé·e ?",options:[{value:"Afghanistan",label:"Afghanistan"},{value:"Albania",label:"Albanie"},{value:"Algeria",label:"Algérie"},{value:"Andorra",label:"Andorre"},{value:"Angola",label:"Angola"},{value:"Antigua and Barbuda",label:"Antigua-et-Barbuda"},{value:"Argentina",label:"Argentine"},{value:"Armenia",label:"Arménie"},{value:"Australia",label:"Australie"},{value:"Austria",label:"Autriche"},{value:"Azerbaijan",label:"Azerbaïdjan"},{value:"Bahamas",label:"Bahamas"},{value:"Bahrain",label:"Bahreïn"},{value:"Bangladesh",label:"Bangladesh"},{value:"Barbados",label:"Barbade"},{value:"Belarus",label:"Biélorussie"},{value:"Belgium",label:"Belgique"},{value:"Belize",label:"Bélize"},{value:"Benin",label:"Bénin"},{value:"Bhutan",label:"Bhoutan"},{value:"Bolivia",label:"Bolivie"},{value:"Bosnia and Herzegovina",label:"Bosnie-Herzégovine"},{value:"Botswana",label:"Botswana"},{value:"Brazil",label:"Brésil"},{value:"Brunei",label:"Brunei"},{value:"Bulgaria",label:"Bulgarie"},{value:"Burkina Faso",label:"Burkina Faso"},{value:"Burundi",label:"Burundi"},{value:"Cambodia",label:"Cambodge"},{value:"Cameroon",label:"Cameroun"},{value:"Canada",label:"Canada"},{value:"Cape Verde",label:"Cap-Vert"},{value:"Central African Republic",label:"République centrafricaine"},{value:"Chad",label:"Tchad"},{value:"Chile",label:"Chili"},{value:"China",label:"Chine"},{value:"Colombia",label:"Colombie"},{value:"Comoros",label:"Comores"},{value:"Congo",label:"République du Congo"},{value:"Democratic Republic of the Congo",label:"République démocratique du Congo"},{value:"Costa Rica",label:"Costa Rica"},{value:"Côte d'Ivoire",label:"Côte d'Ivoire"},{value:"Croatia",label:"Croatie"},{value:"Cuba",label:"Cuba"},{value:"Cyprus",label:"Chypre"},{value:"Czech Republic",label:"République tchèque"},{value:"Denmark",label:"Danemark"},{value:"Djibouti",label:"Djibouti"},{value:"Dominica",label:"Dominique"},{value:"Dominican Republic",label:"République dominicaine"},{value:"Ecuador",label:"Équateur"},{value:"Egypt",label:"Égypte"},{value:"El Salvador",label:"Salvador"},{value:"Equatorial Guinea",label:"Guinée équatoriale"},{value:"Eritrea",label:"Érythrée"},{value:"Estonia",label:"Estonie"},{value:"Eswatini",label:"Eswatini"},{value:"Ethiopia",label:"Éthiopie"},{value:"Fiji",label:"Fidji"},{value:"Finland",label:"Finlande"},{value:"France",label:"France"},{value:"Gabon",label:"Gabon"},{value:"Gambia",label:"Gambie"},{value:"Georgia",label:"Géorgie"},{value:"Germany",label:"Allemagne"},{value:"Ghana",label:"Ghana"},{value:"Greece",label:"Grèce"},{value:"Grenada",label:"Grenade"},{value:"Guatemala",label:"Guatemala"},{value:"Guinea",label:"Guinée"},{value:"Guinea-Bissau",label:"Guinée-Bissau"},{value:"Guyana",label:"Guyana"},{value:"Haiti",label:"Haïti"},{value:"Honduras",label:"Honduras"},{value:"Hungary",label:"Hongrie"},{value:"Iceland",label:"Islande"},{value:"India",label:"Inde"},{value:"Indonesia",label:"Indonésie"},{value:"Iran",label:"Iran"},{value:"Iraq",label:"Iraq"},{value:"Ireland",label:"Irlande"},{value:"Israel",label:"Israël"},{value:"Italy",label:"Italie"},{value:"Jamaica",label:"Jamaïque"},{value:"Japan",label:"Japon"},{value:"Jordan",label:"Jordanie"},{value:"Kazakhstan",label:"Kazakhstan"},{value:"Kenya",label:"Kenya"},{value:"Kiribati",label:"Kiribati"},{value:"Kuwait",label:"Koweït"},{value:"Kyrgyzstan",label:"Kirghizistan"},{value:"Laos",label:"Laos"},{value:"Latvia",label:"Lettonie"},{value:"Lebanon",label:"Liban"},{value:"Lesotho",label:"Lesotho"},{value:"Liberia",label:"Libéria"},{value:"Libya",label:"Libye"},{value:"Liechtenstein",label:"Liechtenstein"},{value:"Lithuania",label:"Lituanie"},{value:"Luxembourg",label:"Luxembourg"},{value:"Madagascar",label:"Madagascar"},{value:"Malawi",label:"Malawi"},{value:"Malaysia",label:"Malaisie"},{value:"Maldives",label:"Maldives"},{value:"Mali",label:"Mali"},{value:"Malta",label:"Malte"},{value:"Marshall Islands",label:"Îles Marshall"},{value:"Mauritania",label:"Mauritanie"},{value:"Mauritius",label:"Maurice"},{value:"Mexico",label:"Mexique"},{value:"Micronesia",label:"Micronésie"},{value:"Moldova",label:"Moldavie"},{value:"Monaco",label:"Monaco"},{value:"Mongolia",label:"Mongolie"},{value:"Montenegro",label:"Monténégro"},{value:"Morocco",label:"Maroc"},{value:"Mozambique",label:"Mozambique"},{value:"Myanmar",label:"Myanmar"},{value:"Namibia",label:"Namibie"},{value:"Nauru",label:"Nauru"},{value:"Nepal",label:"Népal"},{value:"Netherlands",label:"Pays-Bas"},{value:"New Zealand",label:"Nouvelle-Zélande"},{value:"Nicaragua",label:"Nicaragua"},{value:"Niger",label:"Niger"},{value:"Nigeria",label:"Nigéria"},{value:"North Korea",label:"Corée du Nord"},{value:"North Macedonia",label:"Macédoine du Nord"},{value:"Norway",label:"Norvège"},{value:"Oman",label:"Oman"},{value:"Palestine",label:"Palestine"},{value:"Pakistan",label:"Pakistan"},{value:"Palau",label:"Palaos"},{value:"Panama",label:"Panama"},{value:"Papua New Guinea",label:"Papouasie-Nouvelle-Guinée"},{value:"Paraguay",label:"Paraguay"},{value:"Peru",label:"Pérou"},{value:"Philippines",label:"Philippines"},{value:"Poland",label:"Pologne"},{value:"Portugal",label:"Portugal"},{value:"Qatar",label:"Qatar"},{value:"Romania",label:"Roumanie"},{value:"Russia",label:"Russie"},{value:"Rwanda",label:"Rwanda"},{value:"Saint Kitts and Nevis",label:"Saint-Kitts-et-Nevis"},{value:"Saint Lucia",label:"Sainte-Lucie"},{value:"Saint Vincent and the Grenadines",label:"Saint-Vincent-et-les-Grenadines"},{value:"Samoa",label:"Samoa"},{value:"San Marino",label:"Saint-Marin"},{value:"Sao Tome and Principe",label:"Sao Tomé-et-Principe"},{value:"Saudi Arabia",label:"Arabie saoudite"},{value:"Senegal",label:"Sénégal"},{value:"Serbia",label:"Serbie"},{value:"Seychelles",label:"Seychelles"},{value:"Sierra Leone",label:"Sierra Leone"},{value:"Singapore",label:"Singapour"},{value:"Slovakia",label:"Slovaquie"},{value:"Slovenia",label:"Slovénie"},{value:"Solomon Islands",label:"Îles Salomon"},{value:"Somalia",label:"Somalie"},{value:"South Africa",label:"Afrique du Sud"},{value:"South Sudan",label:"Soudan du Sud"},{value:"Spain",label:"Espagne"},{value:"Sri Lanka",label:"Sri Lanka"},{value:"Sudan",label:"Soudan"},{value:"Suriname",label:"Suriname"},{value:"Sweden",label:"Suède"},{value:"Switzerland",label:"Suisse"},{value:"Syria",label:"Syrie"},{value:"Tajikistan",label:"Tadjikistan"},{value:"Thailand",label:"Thaïlande"},{value:"Timor-Leste",label:"Timor-Leste"},{value:"Togo",label:"Togo"},{value:"Tonga",label:"Tonga"},{value:"Trinidad and Tobago",label:"Trinité-et-Tobago"},{value:"Tunisia",label:"Tunisie"},{value:"Turkey",label:"Turquie"},{value:"Turkmenistan",label:"Turkménistan"},{value:"Tuvalu",label:"Tuvalu"},{value:"Uganda",label:"Ouganda"},{value:"Ukraine",label:"Ukraine"},{value:"United Arab Emirates",label:"Émirats arabes unis"},{value:"United Kingdom",label:"Royaume-Uni"},{value:"United States",label:"États-Unis"},{value:"Uruguay",label:"Uruguay"},{value:"Uzbekistan",label:"Ouzbékistan"},{value:"Vanuatu",label:"Vanuatu"},{value:"Venezuela",label:"Venezuela"},{value:"Vietnam",label:"Vietnam"},{value:"Yemen",label:"Yémen"},{value:"Zambia",label:"Zambie"},{value:"Zimbabwe",label:"Zimbabwe"}]},M6_size:{text:"Taille de l'entreprise (équivalent temps plein – ETP)",options:[{value:"1–9",label:"1–9"},{value:"10–49",label:"10–49"},{value:"50–249",label:"50–249"},{value:"250–999",label:"250–999"},{value:"≥ 1,000",label:"≥ 1 000"},{value:"Prefer not to say",label:"Préfère ne pas dire"}]},M7_revenue:{text:"Quel est votre chiffre d'affaires annuel ?",options:[{value:"< €250k",label:"< 250 000 €"},{value:"€250k–1M",label:"250 000–1 M €"},{value:"€1–5M",label:"1–5 M €"},{value:"€5–20M",label:"5–20 M €"},{value:"€20–100M",label:"20–100 M €"},{value:"> €100M",label:"> 100 M €"},{value:"Prefer not to say",label:"Préfère ne pas dire"}]},S1:{text:"Combien de cas d'usage IA avez-vous identifiés pour mise en œuvre dans les 12 prochains mois ?",helper:"Définit votre maturité de planification et votre niveau de préparation",options:[{value:"None",label:"Aucun"},{value:"Ideas only",label:"Idées seulement"},{value:"1–2 documented use cases",label:"1–2 cas documentés"},{value:"3–5 prioritized with owners",label:"3–5 cas priorisés avec responsables"},{value:"6+ with owners and timelines",label:"6 cas ou plus avec responsables et échéances"}]},S2:{text:"Comment décidez-vous quelles opportunités IA prioriser ?",helper:"Sélectionnez le processus que vous utilisez actuellement",options:[{value:"No formal process",label:"Pas de processus formel"},{value:"Ad-hoc based on perceived value",label:"Au cas par cas selon la valeur perçue"},{value:"Impact × Effort matrix",label:"Matrice Impact × Effort"},{value:"Impact × Effort + capability weighting",label:"Impact × Effort + pondération capacité"},{value:"Financial ROI modeling",label:"Modèle financier ROI"},{value:"Risk-adjusted prioritization",label:"Priorisation ajustée au risque"}]},S3:{text:"Dans quelle mesure vos indicateurs IA sont-ils intégrés aux KPI ou OKR de l'entreprise ?",options:[{value:"No AI KPI/OKRs defined",label:"Pas d'IA KPI/OKR définis"},{value:"KPIs written but not tracked",label:"KPI rédigés mais non suivis"},{value:"KPIs tracked but not linked",label:"KPI suivis mais non reliés"},{value:"Partially aligned with departmental OKRs",label:"Partiellement alignés aux OKR départementaux"},{value:"Fully integrated with executive OKRs",label:"Pleinement intégrés aux OKR exécutifs"}]},S4:{text:"Comment évaluez-vous le ROI de vos projets IA ?",helper:"Choisissez la méthode conforme à votre pratique actuelle",options:[{value:"No ROI estimation",label:"Pas d'estimation de ROI"},{value:"Rough empirical estimates",label:"Estimations empiriques approximatives"},{value:"Simple cost-benefit analysis",label:"Analyse coût – bénéfice simplifiée"},{value:"ROI tied to clear KPIs",label:"ROI lié à des KPI clairs"},{value:"Financial or risk-adjusted models",label:"Modèles financiers ou ajustés au risque"}]},S5:{text:"Quel est votre délai typique de l'idée à un impact IA mesurable ?",options:[{value:"12+ months",label:"Plus de 12 mois"},{value:"6–12 months",label:"6 – 12 mois"},{value:"3–6 months",label:"3 – 6 mois"},{value:"1–3 months",label:"1 – 3 mois"},{value:"< 30 days",label:"Moins de 30 jours"}]},S6:{text:"Comment suivez-vous les avancées IA de vos concurrents et du secteur ?",options:[{value:"No tracking",label:"Non suivi"},{value:"Ad-hoc research",label:"Recherches ponctuelles"},{value:"Annual review",label:"Revue annuelle"},{value:"Quarterly reports",label:"Rapports trimestriels"},{value:"Continuous dashboard",label:"Tableau de bord continu"}]},S7:{text:"Classez vos quatre principaux objectifs stratégiques pour les initiatives IA ?",options:[{value:"Productivity",label:"Productivité"},{value:"Cost reduction",label:"Réduction des coûts"},{value:"Revenue growth",label:"Croissance du chiffre d'affaires"},{value:"Customer experience",label:"Expérience client"},{value:"Innovation",label:"Innovation"},{value:"Regulatory compliance",label:"Conformité réglementaire"},{value:"Investor positioning",label:"Positionnement investisseurs"}]},S8:{text:"Quel est le niveau d'adhésion de votre comité de direction à la stratégie IA ?",options:[{value:"No buy-in",label:"Pas d'adhésion"},{value:"Ad-hoc discussions",label:"Discussions ponctuelles"},{value:"Interest without action",label:"Intérêt sans action"},{value:"Budget approved",label:"Budget approuvé"},{value:"Active executive sponsorship",label:"Sponsoring exécutif actif"}]},S9:{text:"Quelles équipes participent à la définition des cas d'usage IA ?",options:[{value:"Executive leadership",label:"Direction exécutive"},{value:"Product and marketing",label:"Produit et marketing"},{value:"Operations",label:"Opérations"},{value:"Data and IT",label:"Data et IT"},{value:"Legal and compliance",label:"Juridique et conformité"},{value:"HR",label:"RH"},{value:"Finance",label:"Finance"},{value:"Customer support",label:"Support client"}]},S10:{text:"Dans quelle mesure votre organisation est-elle prête à gérer le changement induit par l'IA ?",options:[{value:"Not prepared",label:"Pas prête"},{value:"Ad-hoc preparation",label:"Préparation ad hoc"},{value:"Formal process for some projects",label:"Processus formel pour certains projets"},{value:"Organizational framework",label:"Cadre organisationnel"},{value:"Continuous improvement culture",label:"Culture d'amélioration continue"}]},S11:{text:"Dans quelle mesure vos objectifs IA sont-ils assortis d'indicateurs clairs ?",options:[{value:"No clear goals",label:"Pas d'objectifs clairs"},{value:"Goals defined without metrics",label:"Objectifs définis sans indicateurs"},{value:"Some metrics tracked",label:"Quelques indicateurs suivis"},{value:"Most goals with metrics",label:"La plupart des objectifs avec indicateurs"},{value:"All goals with metrics and thresholds",label:"Tous les objectifs avec indicateurs et seuils"}]},S12:{text:"Quelle est votre approche pour piloter et déployer vos projets IA ?",options:[{value:"POC only with strict controls",label:"POC uniquement avec contrôles stricts"},{value:"Small pilots with gated access",label:"Petits pilotes en accès contrôlé"},{value:"Case-by-case security review",label:"Revue sécurité au cas par cas"},{value:"Agile testing with supervision",label:"Tests agiles avec supervision"},{value:"Fast iterations ready for production",label:"Itérations rapides prêtes pour production"}]},F1:{text:"Quel est votre budget mensuel pour les initiatives IA et données ?",options:[{value:"< €100",label:"< 100 €"},{value:"€100–500",label:"100 – 500 €"},{value:"€500–2,000",label:"500 – 2 000 €"},{value:"€2,000–15,000",label:"2 000 – 15 000 €"},{value:"> €15,000",label:"> 15 000 €"}]},F3:{text:"Combien de temps pouvez-vous financer vos efforts IA sans nouvel apport ?",helper:"Indiquez votre trésorerie disponible pour vos projets IA",options:[{value:"< 3 months",label:"Moins de 3 mois"},{value:"3–6 months",label:"3 – 6 mois"},{value:"6–12 months",label:"6 – 12 mois"},{value:"12–24 months",label:"12 – 24 mois"},{value:"> 24 months",label:"> 24 mois"}]},F4:{text:"Quel est le niveau de soutien de votre conseil ou de vos investisseurs pour l'IA ?",options:[{value:"No support",label:"Pas de soutien"},{value:"Discussion without commitment",label:"Discussion sans engagement"},{value:"Open to AI initiatives",label:"Ouverts aux initiatives IA"},{value:"Budget approved",label:"Budget approuvé"},{value:"Active support",label:"Soutien actif"}]},F5:{text:"Quels cadres réglementaires ou de sécurité supplémentaires s'appliquent à votre organisation ?",helper:"Le RGPD et le règlement IA européen s'appliquent par défaut",options:[{value:"MiFID II / MDR – Finance & health (EU)",label:"MiFID II / MDR – Finance & santé (UE)"},{value:"ISO 27001 – Information security",label:"ISO 27001 – Sécurité de l'information"},{value:"PCI-DSS – Payment security",label:"PCI-DSS – Sécurité des paiements"},{value:"HIPAA – US health data",label:"HIPAA – Données de santé US"},{value:"CCPA – California privacy",label:"CCPA – Confidentialité Californie"},{value:"LGPD – Brazil privacy",label:"LGPD – Confidentialité Brésil"},{value:"POPIA – South Africa privacy",label:"POPIA – Confidentialité Afrique du Sud"},{value:"None",label:"Aucun"}]},F6:{text:"Quel niveau de partenariats stratégiques avez-vous pour l'IA ?",helper:"Choisissez l'activité partenariale IA actuelle",options:[{value:"None",label:"Aucun"},{value:"Exploratory discussions",label:"Discussions exploratoires"},{value:"One active partnership",label:"Un partenariat actif"},{value:"Multiple partnerships",label:"Plusieurs partenariats"},{value:"Ecosystem collaboration (R&D + vendors)",label:"Collaboration écosystème (R & D + fournisseurs)"}]},F7:{text:"Quelle part de votre budget IA est consacrée à l'éthique et à la lutte contre les biais ?",options:[{value:"None",label:"Aucune"},{value:"Planned next year",label:"Prévue l'an prochain"},{value:"< 5%",label:"< 5 %"},{value:"5–15%",label:"5 – 15 %"},{value:"> 15%",label:"> 15 %"}]},D1:{text:"Où sont principalement stockées vos données critiques ?",helper:"Ces données pilotent vos opérations, décisions et conformité",options:[{value:"Files and spreadsheets (Excel, Google Sheets, local files)",label:"Fichiers et tableurs (Excel, Google Sheets, fichiers locaux)"},{value:"Databases (SQL, NoSQL, data warehouses)",label:"Bases de données (SQL, NoSQL, entrepôts de données)"},{value:"Cloud and SaaS (Google Drive, Salesforce, HubSpot)",label:"Cloud et SaaS (Google Drive, Salesforce, HubSpot)"},{value:"Internal tools and legacy systems",label:"Outils internes et systèmes hérités"},{value:"BI platforms (Power BI, Looker, Tableau)",label:"Plateformes BI (Power BI, Looker, Tableau)"}]},D2:{text:"Quel volume de données générez-vous ou collectez-vous chaque mois ?",options:[{value:"Don't know",label:"Ne sait pas"},{value:"< 1 GB",label:"< 1 Go"},{value:"1–10 GB",label:"1–10 Go"},{value:"10–100 GB",label:"10–100 Go"},{value:"> 100 GB",label:"> 100 Go"}]},D3:{text:"Dans quelle mesure votre gestion des données (structure, outils et traçabilité) est-elle mature ?",options:[{value:"No standards or visibility",label:"Pas de normes ni de visibilité"},{value:"Basic naming conventions and partial documentation",label:"Conventions de nommage basiques et documentation partielle"},{value:"Defined standards with manual processes",label:"Normes définies avec processus manuels"},{value:"Schema tooling and automated tracking for key systems",label:"Outils de schéma et suivi automatisé pour les systèmes clés"},{value:"Versioned models with full lineage and governance",label:"Modèles versionnés avec traçabilité et gouvernance complètes"}]},D4:{text:"Quel est votre niveau de confiance dans la qualité et l'actualité de vos données critiques ?",options:[{value:"Low: data often stale or unreliable",label:"Faible : données souvent obsolètes ou peu fiables"},{value:"Medium: manual quality checks",label:"Moyen : vérifications manuelles pour la qualité"},{value:"High: periodic data quality testing",label:"Élevé : tests périodiques de qualité des données"},{value:"Very high: automated anomaly alerts",label:"Très élevé : alertes automatisées pour anomalies"},{value:"Excellent: real-time monitoring and validation",label:"Excellent : surveillance et validation en temps réel"}]},D5:{text:"Quelles mesures de sécurité protègent votre infrastructure de données ?",helper:"Chiffrement, contrôle d'accès et surveillance",options:[{value:"Encryption at rest (AWS S3, Azure Blob)",label:"Chiffrement au repos (AWS S3, Azure Blob)"},{value:"TLS/HTTPS in transit",label:"TLS/HTTPS en transit"},{value:"Role-based access controls (IAM, RBAC)",label:"Contrôles d'accès par rôle (IAM, RBAC)"},{value:"Audit logs & monitoring",label:"Journaux d'audit et monitoring"},{value:"DLP (data loss prevention)",label:"DLP (prévention des pertes de données)"},{value:"Tokenization (Vault, etc.)",label:"Tokenisation (Vault, etc.)"},{value:"Differential privacy",label:"Confidentialité différentielle"},{value:"None",label:"Aucune"},{value:"I don't know",label:"Ne sait pas"},{value:"Other (please specify)",label:"Autre (à préciser)"}]},D6:{text:"Comment gérez-vous la gouvernance et le nettoyage des données ?",options:[{value:"No owner defined",label:"Pas de responsable défini"},{value:"Occasional clean-ups",label:"Nettoyages ponctuels"},{value:"Assigned owner with periodic review",label:"Responsable désigné avec révisions périodiques"},{value:"Dedicated steward with monthly routines",label:"Steward dédié avec routines mensuelles"},{value:"Continuous governance and monitoring",label:"Gouvernance continue et monitoring"}]},D7:{text:"Quel est votre niveau de préparation pour un audit RGPD ou loi IA européenne ?",helper:"Indiquez votre préparation aux audits externes ou internes",options:[{value:"None – no audit readiness",label:"Aucune préparation"},{value:"Basic logs only",label:"Journaux basiques uniquement"},{value:"Audit trail for critical systems",label:"Traçabilité pour systèmes critiques"},{value:"Explainability logs + scripts",label:"Journaux explicatifs et scripts"},{value:"Automated compliance checks",label:"Contrôles de conformité automatisés"},{value:"I don't know",label:"Ne sait pas"}]},D8:{text:"Quel est le niveau de maturité de votre processus d'étiquetage et d'annotation des données ?",options:[{value:"None",label:"Aucun"},{value:"Ad-hoc manual labeling",label:"Étiquetage manuel ponctuel"},{value:"Defined guidelines",label:"Directives définies"},{value:"Standardized taxonomy",label:"Taxonomie standardisée"},{value:"Automated labeling and ontology management",label:"Étiquetage automatisé et gestion d'ontologie"}]},D9:{text:"Utilisez-vous des données synthétiques ou tierces pour enrichir vos jeux de données ?",options:[{value:"No",label:"Non"},{value:"Exploring",label:"En phase d'exploration"},{value:"Limited pilot projects",label:"Projets pilotes limités"},{value:"Regular production use",label:"Usage régulier en production"},{value:"Advanced synthetic pipelines",label:"Pipelines synthétiques avancés"}]},D10:{text:"Quel est le niveau de maturité de vos politiques d'éthique IA et de confidentialité des données ?",helper:"Ex. : « Politiques + formation et contrôle » = guides documentés et ateliers",options:[{value:"No formal policies",label:"Pas de politique formelle"},{value:"High-level principles only",label:"Principes généraux uniquement"},{value:"Documented guidelines (but no training or oversight)",label:"Directives documentées sans formation"},{value:"Guidelines + training & oversight",label:"Directives avec formation et contrôle"},{value:"Audited & continuously improved",label:"Auditées et améliorées en continu"}]},T0_tools:{text:"Quels outils utilisez-vous activement avec votre équipe ?",helper:"Sélectionnez tous les outils pour personnaliser les recommandations d'automatisation"},T1:{text:"Dans quelle mesure vos outils et systèmes sont-ils connectés ?",options:[{value:"Isolated – no connections",label:"Isolés – aucune connexion"},{value:"Manual – CSV import/export",label:"Manuel – import/export CSV"},{value:"Batch – scheduled syncing",label:"Batch – synchronisations programmées"},{value:"API – platform integrations",label:"API – intégrations plateformes"},{value:"Real-time – event mesh",label:"Temps réel – maillage événementiel"}]},T2:{text:"À quelle fréquence vos connexions de données échouent-elles ou posent-elles problème ?",options:[{value:"Weekly – frequent breakages",label:"Hebdomadaire – pannes fréquentes"},{value:"Monthly – occasional errors",label:"Mensuelle – erreurs occasionnelles"},{value:"Quarterly – rare issues",label:"Trimestrielle – rares problèmes"},{value:"Almost never – very stable",label:"Quasiment jamais – très stable"},{value:"Never – completely reliable",label:"Jamais – totalement fiable"}]},T3:{text:"Qui est responsable de la gestion et de la maintenance de vos intégrations système ?",options:[{value:"No owner defined",label:"Pas de responsable défini"},{value:"External agency or freelancer",label:"Agence ou freelance externe"},{value:"Ops/Product team",label:"Équipe Ops/Produit"},{value:"Internal technical team",label:"Équipe technique interne"},{value:"Dedicated integrations team",label:"Équipe dédiée aux intégrations"}]},T4:{text:"Comment êtes-vous connectés aux services IA externes et aux LLM ?",helper:"Ex. : ChatGPT, Claude, Mistral, Copilot ou LLM interne",options:[{value:"Forbidden access to external LLMs",label:"Accès interdit aux LLM externes"},{value:"Exploratory testing only",label:"Tests exploratoires uniquement"},{value:"API pilots",label:"Pilotes API"},{value:"One API in production",label:"Une API en production"},{value:"Multiple APIs in production + internal LLM",label:"Plusieurs APIs en production + LLM interne"}]},T5:{text:"Quel accès avez-vous aux ressources GPU/TPU ?",options:[{value:"None",label:"Aucun"},{value:"Colab only",label:"Colab uniquement"},{value:"On-demand cloud GPU/TPU",label:"GPU/TPU cloud à la demande"},{value:"Dedicated GPU/TPU budget",label:"Budget GPU/TPU dédié"},{value:"Managed AI cluster",label:"Cluster IA managé"}]},T6:{text:"Dans quelle mesure votre architecture technique et data est-elle documentée ?",options:[{value:"None",label:"Aucune"},{value:"High-level diagrams",label:"Schémas sommaires"},{value:"Critical systems mapped",label:"Systèmes critiques cartographiés"},{value:"Comprehensive diagrams",label:"Diagrammes complets"},{value:"Auto-generated and maintained documentation",label:"Documentation auto-générée et maintenue"}]},T7:{text:"Quel niveau de plan de reprise d'activité avez-vous pour vos données et IA ?",options:[{value:"No plan",label:"Aucun plan"},{value:"Backups only",label:"Sauvegardes uniquement"},{value:"Manual failover",label:"Basculage manuel"},{value:"Automated failover",label:"Basculage automatisé"},{value:"AI-aware playbooks",label:"Playbook IA-aware"}]},T8:{text:"Quels outils low-code ou no-code utilisez-vous pour l'automatisation ?",helper:"Sélectionnez tous les outils ou choisissez « Aucun »",options:[{value:"None",label:"Aucun"},{value:"Zapier",label:"Zapier"},{value:"Make",label:"Make"},{value:"n8n",label:"n8n"},{value:"Power Automate",label:"Power Automate"},{value:"UiPath",label:"UiPath"},{value:"Workato",label:"Workato"},{value:"Airbyte",label:"Airbyte"},{value:"Fivetran",label:"Fivetran"},{value:"dbt",label:"dbt"}]},A1:{text:"Quelles trois tâches bénéficieraient le plus de l'automatisation ?",helper:"Classez vos priorités",options:[{value:"Reporting",label:"Reporting"},{value:"Scheduling",label:"Planification"},{value:"Data entry",label:"Saisie de données"},{value:"FAQ",label:"FAQ"},{value:"Ticket triage",label:"Tri des tickets"},{value:"Contract generation",label:"Génération de contrats"},{value:"Inventory management",label:"Gestion des stocks"},{value:"Compliance checks",label:"Vérifications de conformité"}]},A2:{text:"Quel est le niveau de maturité de vos efforts d'automatisation ?",helper:"De l'absence d'automatisation à l'autonomie complète",options:[{value:"0 – no automation",label:"0 – aucune automatisation"},{value:"1 – ad-hoc scripts",label:"1 – scripts ad hoc"},{value:"2 – basic tools with supervision",label:"2 – outils basiques avec supervision"},{value:"3 – integrated workflows",label:"3 – workflows intégrés"},{value:"4 – continuous automation",label:"4 – automatisation continue"},{value:"5 – fully autonomous processes",label:"5 – processus entièrement autonomes"}]},A3:{text:"Quel est le statut actuel des agents IA dans vos opérations ?",helper:"Permet d'orienter la formation dédiée",options:[{value:"No agents",label:"Aucun agent"},{value:"Prototype",label:"Prototype"},{value:"One agent in production",label:"Un agent en production"},{value:"Multiple agents in production",label:"Plusieurs agents en production"},{value:"Widespread deployment",label:"Déploiement généralisé"}]},A4:{text:"Pour quelles tâches envisagez-vous une automatisation par agents IA ?",helper:"Sélectionnez tout ce qui s'applique",options:[{value:"Customer support",label:"Support client"},{value:"Report generation",label:"Génération de rapports"},{value:"Email drafting",label:"Rédaction d'e-mails"},{value:"Lead scoring",label:"Scoring des prospects"},{value:"Meeting summaries",label:"Compte-rendu de réunions"},{value:"Market monitoring",label:"Veille marché"},{value:"Quality control",label:"Contrôle qualité"}]},A5:{text:"Quel niveau d'autonomie souhaitez-vous pour vos agents IA ?",options:[{value:"Suggestions only",label:"Suggestions uniquement"},{value:"Human approval required",label:"Approbation humaine requise"},{value:"Semi-automated",label:"Semi-automatisé"},{value:"Fully automated",label:"Entièrement automatisé"}]},A6:{text:"Comment surveillez-vous et alertez-vous vos processus automatisés ?",options:[{value:"No monitoring",label:"Pas de surveillance"},{value:"Manual checks",label:"Contrôles manuels"},{value:"KPI dashboards",label:"Tableaux de bord KPI"},{value:"Automated alerts",label:"Alertes automatisées"},{value:"Full observability and logging",label:"Observabilité et journalisation complètes"}]},A7:{text:"Quels sont les principaux freins à l'automatisation et au déploiement d'agents IA ?",helper:"Sélectionnez tout ce qui s'applique",options:[{value:"Data silos",label:"Silos de données"},{value:"Lack of technical resources",label:"Manque de ressources techniques"},{value:"Insufficient buy-in",label:"Adhésion insuffisante"},{value:"Compliance constraints",label:"Contraintes de conformité"},{value:"Uncertain ROI",label:"ROI incertain"},{value:"Limited budget",label:"Budget limité"},{value:"Integration complexity",label:"Complexité d'intégration"}]},A8:{text:"Quelle interface préférez-vous pour interagir avec vos agents IA ?",helper:"Permet de personnaliser l'interface",options:[{value:"Chatbot (Slack/Teams)",label:"Chatbot (Slack/Teams)"},{value:"Embedded widget",label:"Widget intégré"},{value:"Dashboard",label:"Tableau de bord"},{value:"Email assistant",label:"Assistant e-mail"},{value:"API/CLI",label:"API/CLI"},{value:"Voice assistant",label:"Assistant vocal"},{value:"Need guidance",label:"Besoin de conseils"}]},A9:{text:"Quels processus de gouvernance appliquez-vous à vos agents IA ?",options:[{value:"None",label:"Aucun"},{value:"Ad-hoc checks",label:"Vérifications ponctuelles"},{value:"Formal process",label:"Processus formel"},{value:"Logging with oversight",label:"Journalisation avec supervision"},{value:"Continuous audit",label:"Audit continu"}]},A10:{text:"Quelle stratégie de reprise existe en cas d'échec des automatisations ou agents IA ?",options:[{value:"No plan",label:"Aucun plan"},{value:"Manual rollback",label:"Rollback manuel"},{value:"Predefined fallback procedures",label:"Procédures de bascule prédéfinies"},{value:"Automated rollback",label:"Rollback automatisé"},{value:"Self-healing loops",label:"Boucles d'auto-réparation"}]},A11:{text:"Comment suivez-vous la qualité des résultats de vos agents IA ?",options:[{value:"No tracking",label:"Pas de suivi"},{value:"Manual spot checks",label:"Contrôles manuels ponctuels"},{value:"Pre-deployment testing",label:"Tests avant déploiement"},{value:"Continuous testing and spot checks",label:"Tests continus et contrôles ponctuels"},{value:"Continuous quality monitoring",label:"Surveillance qualité en continu"}]},C1:{text:"À quelle fréquence utilisez-vous des outils IA au quotidien ?",options:[{value:"Never",label:"Jamais"},{value:"Rarely",label:"Rarement"},{value:"Monthly",label:"Mensuel"},{value:"Weekly",label:"Hebdomadaire"},{value:"Daily",label:"Quotidien"}]},C2:{text:"Quel est votre niveau de confiance pour ces compétences en rédaction de prompts ?",options:[{value:"Basic prompt writing",label:"Rédaction de prompts basiques"},{value:"Using few-shot examples",label:"Utilisation d'exemples few-shot"},{value:"Structured prompt formatting",label:"Formatage de prompts structurés"},{value:"Prompt chain design",label:"Conception de chaînes de prompts"}]},C3:{text:"Comment partagez-vous vos apprentissages IA en interne ?",options:[{value:"No sharing",label:"Aucun partage"},{value:"Informal tips",label:"Astuces informelles"},{value:"Dedicated chat channel",label:"Canal de chat dédié"},{value:"Regular workshops",label:"Ateliers réguliers"},{value:"Active community of practice",label:"Communauté de pratique active"}]},C3a:{text:"Quels sujets de formation IA priorisez-vous ? (Classez top 3)",options:[{value:"Prompt engineering",label:"Ingénierie de prompt"},{value:"AI tool mastery",label:"Maîtrise des outils IA"},{value:"Data literacy",label:"Littératie des données"},{value:"Model fine-tuning",label:"Fine-tuning de modèles"},{value:"Retrieval-augmented generation",label:"Génération augmentée"},{value:"Agent orchestration",label:"Orchestration d'agents"},{value:"Ethics and governance",label:"Éthique et gouvernance"}]},C4:{text:"Quel budget annuel par personne allouez-vous à la montée en compétence IA ?",options:[{value:"€0",label:"0 €"},{value:"< €200",label:"< 200 €"},{value:"€200–500",label:"200–500 €"},{value:"€500–1,000",label:"500–1 000 €"},{value:"> €1,000",label:"> 1 000 €"}]},C5:{text:"Combien d'heures par mois pouvez-vous consacrer à la formation IA ?",options:[{value:"None",label:"Aucune"},{value:"< 1h",label:"< 1 h"},{value:"1–3h",label:"1–3 h"},{value:"3–5h",label:"3–5 h"},{value:"> 5h",label:"> 5 h"}]},C6:{text:"Quel format de formation IA préférez-vous ?",options:[{value:"Written guides",label:"Guides écrits"},{value:"Short videos",label:"Vidéos courtes"},{value:"Live workshops",label:"Ateliers en direct"},{value:"Self-paced courses",label:"Cours en autonomie"},{value:"Mixed formats",label:"Formats mixtes"}]},C7:{text:"À quelle fréquence faites-vous appel à des experts IA externes ?",options:[{value:"Never",label:"Jamais"},{value:"Ad-hoc advice",label:"Conseils ponctuels"},{value:"Regular sessions",label:"Séances régulières"},{value:"Expert network access",label:"Accès à un réseau d'experts"},{value:"Dedicated AI advisory board",label:"Comité conseil IA dédié"}]},C8:{text:"Qu'est-ce qui freine vos pilotes de projets IA ?",options:[{value:"Limited budget",label:"Budget limité"},{value:"Lack of skills",label:"Manque de compétences"},{value:"Data silos",label:"Silos de données"},{value:"Compliance constraints",label:"Contraintes de conformité"},{value:"Uncertain ROI",label:"ROI incertain"},{value:"Technical complexity",label:"Complexité technique"}]},C9:{text:"Quel est votre degré d'ouverture aux pilotes IA ?",options:[{value:"Resistant",label:"Résistant·e"},{value:"Cautious",label:"Prudent·e"},{value:"Interested",label:"Intéressé·e"},{value:"Proactive",label:"Proactif·ve"},{value:"Active pilots",label:"Pilotes actifs"}]},C10:{text:"À quelle fréquence collaborez-vous inter-fonctions sur l'IA ?",options:[{value:"Never",label:"Jamais"},{value:"Occasionally",label:"Occasionnellement"},{value:"Quarterly",label:"Trimestriellement"},{value:"Cross-functional squads",label:"En squads"},{value:"Embedded practice",label:"Pratique intégrée"}]},C11:{text:"Vous sentez-vous en sécurité pour expérimenter et échouer avec l'IA ?",helper:"Petites erreurs (bugs, sorties erronées) : quel niveau de confort ?",options:[{value:"Not comfortable at all",label:"Pas du tout à l'aise"},{value:"Slightly comfortable",label:"Peu à l'aise"},{value:"Moderately comfortable",label:"Modérément à l'aise"},{value:"Often comfortable",label:"Souvent à l'aise"},{value:"Always encouraged",label:"Toujours encouragé·e"}]},G1:{text:"Quel est le niveau de maturité de vos processus de gestion des risques et biais IA ?",options:[{value:"No process",label:"Aucun processus"},{value:"Reactive fixes",label:"Corrections réactives"},{value:"Pre-deployment testing",label:"Tests avant déploiement"},{value:"Formal framework defined",label:"Cadre formel défini"},{value:"EU AI Act compliant",label:"Conforme au règlement IA UE"}]},G2:{text:"Pouvez-vous expliquer et auditer les décisions de vos modèles IA ?",helper:"Traçabilité et journalisation pour audits",options:[{value:"No logging or explanations",label:"Pas de journalisation ni d'explications"},{value:"High-risk models only",label:"Modèles à haut risque uniquement"},{value:"Audit logs",label:"Journaux d'audit"},{value:"Explanations for all models",label:"Explications pour tous les modèles"},{value:"Audit-ready (tooling and docs)",label:"Prêt pour audit (outils et docs)"}]},G3:{text:"Dans quelle mesure êtes-vous transparent·e sur l'usage de l'IA auprès des parties prenantes ?",options:[{value:"No communication",label:"Aucune communication"},{value:"Mentioned in policies",label:"Mention dans les politiques"},{value:"Published docs and FAQs",label:"Docs et FAQ publiés"},{value:"Explanation button",label:"Bouton d'explication"},{value:"Proactive dashboards",label:"Tableaux de bord proactifs"}]},G4:{text:"Quel plan de réponse aux incidents IA appliquez-vous ?",options:[{value:"No plan",label:"Aucun plan"},{value:"General IT plan",label:"Plan IT général"},{value:"Manual rollback",label:"Rollback manuel"},{value:"Automated rollback",label:"Rollback automatisé"},{value:"Comprehensive playbook",label:"Playbook complet"}]},G5:{text:"Quel niveau de supervision humaine imposez-vous sur l'IA ?",options:[{value:"None",label:"Aucune"},{value:"Final review",label:"Revue finale"},{value:"Random audits",label:"Vérifications aléatoires"},{value:"Human-in-the-loop",label:"Humain-dans-la-boucle"},{value:"Automated escalation",label:"Escalade automatique"}]},G6:{text:"Quelle profondeur de confidentialité intégrez-vous dans vos process IA ?",options:[{value:"Basic compliance",label:"Conformité basique"},{value:"Enhanced controls",label:"Contrôles renforcés"},{value:"Privacy technologies",label:"Technologies de confidentialité"},{value:"Privacy by design",label:"Par conception"},{value:"CI/CD privacy checks",label:"Vérifications CI/CD"}]},G7:{text:"Quel est le statut des audits indépendants de vos systèmes IA ?",options:[{value:"No audit",label:"Aucun audit"},{value:"Audit planned",label:"Audit planifié"},{value:"Audit underway",label:"Audit en cours"},{value:"Initial audit completed",label:"Audit initial terminé"},{value:"Continuous audit cycle",label:"Cycle d'audit continu"}]},G8:{text:"Où en êtes-vous dans la cartographie des risques IA selon le règlement UE ?",helper:"Cartographie = registre des risques IA",options:[{value:"Not aware",label:"Pas conscient·e"},{value:"Aware but not mapped",label:"Conscient·e mais non cartographié"},{value:"Mapping underway",label:"Cartographie en cours"},{value:"Registry completed",label:"Registre terminé"},{value:"Results shared",label:"Résultats partagés"}]},G9:{text:"À quelle fréquence testez-vous l'équité de vos modèles IA ?",options:[{value:"Never",label:"Jamais"},{value:"Post-incident only",label:"Ponctuellement après incidents"},{value:"Before each deployment",label:"Avant chaque déploiement"},{value:"Quarterly review",label:"Revue trimestrielle"},{value:"Continuous monitoring",label:"Surveillance continue"}]},G10:{text:"Quel organe de gouvernance supervise l'éthique et la conformité IA ?",helper:"Comité, équipe conformité ou experts externes",options:[{value:"None",label:"Aucun"},{value:"Ad-hoc advice",label:"Conseil occasionnel"},{value:"Project-by-project review",label:"Revue projet-par-projet"},{value:"Regular meetings",label:"Réunions régulières"},{value:"External experts",label:"Experts externes"}]},P1:{text:"Quand prévoyez-vous de déployer vos initiatives IA ?",helper:"Détermine l'urgence et le calendrier",options:[{value:"Within 3 months",label:"D'ici 3 mois"},{value:"3–6 months",label:"3–6 mois"},{value:"6–12 months",label:"6–12 mois"},{value:"> 12 months",label:"> 12 mois"}]},P2:{text:"Quel niveau de risque acceptez-vous pour vos projets IA ?",helper:"Tolérance au risque pour nouvelles expérimentations",options:[{value:"Conservative – pilots first",label:"Conservateur – pilotes d'abord"},{value:"Cautious – small tests",label:"Prudent – petits tests"},{value:"Balanced – with oversight",label:"Équilibré – supervision"},{value:"Bold – broad experiments",label:"Audacieux – expérimentations larges"}]},P3:{text:"Quels indicateurs de succès sont prioritaires pour votre IA ? (Max 3)",helper:"Nous adaptons la formation à ces objectifs",options:[{value:"Return on investment",label:"Retour sur investissement"},{value:"Cost reduction",label:"Réduction des coûts"},{value:"Operational efficiency",label:"Efficacité opérationnelle"},{value:"Customer experience",label:"Expérience client"},{value:"Employee productivity",label:"Productivité employés"},{value:"Innovation",label:"Innovation"},{value:"Regulatory compliance",label:"Conformité réglementaire"},{value:"Sustainable impact",label:"Impact durable"}]},P4:{text:"Quelle stratégie de ressources privilégiez-vous pour vos projets IA ?",helper:"Interne vs externe",options:[{value:"Fully internal",label:"Entièrement interne"},{value:"Hybrid – internal and external",label:"Hybride – interne et externe"},{value:"Fully outsourced",label:"Entièrement externalisé"}]},P5:{text:"Quelles architectures techniques préférez-vous pour l'IA ?",helper:"Guide les ateliers techniques",options:[{value:"Cloud-native",label:"Cloud-native"},{value:"Hybrid/on-premise",label:"Hybride/on-premise"},{value:"API-first",label:"API-first"},{value:"Low-code/no-code",label:"Low-code/no-code"},{value:"Open source frameworks",label:"Frameworks open source"},{value:"Enterprise suites",label:"Suites d'entreprise"}]},P6:{text:"Quel niveau de support externe attendez-vous pour l'IA ?",options:[{value:"None",label:"Aucun"},{value:"Ad-hoc consulting",label:"Consulting ponctuel"},{value:"Ongoing advisory",label:"Conseil continu"},{value:"Managed services",label:"Services managés"},{value:"Full outsourcing",label:"Externalisation totale"}]},P7:{text:"Quel changement organisationnel êtes-vous prêt·e à engager pour l'IA ?",helper:"Adapte la formation gestion du changement",options:[{value:"Minimal changes",label:"Modifications minimales"},{value:"Minor adjustments",label:"Ajustements mineurs"},{value:"Moderate transformation",label:"Transformation modérée"},{value:"Major transformation",label:"Transformation majeure"},{value:"Continuous evolution",label:"Évolution continue"}]},T9:{text:"Comment déployez-vous et supervisez-vous vos modèles ML en production ?",helper:"Garantit fiabilité et détection rapide",options:[{value:"No deployment",label:"Pas de déploiement"},{value:"Manual scripts",label:"Scripts manuels"},{value:"CI/CD pipeline",label:"Pipeline CI/CD"},{value:"MLOps platform (Kubeflow, MLflow)",label:"Plateforme MLOps (Kubeflow, MLflow)"},{value:"Automated blue/green deployment",label:"Déploiement blue/green automatisé"}]},F8:{text:"Quels mécanismes utilisez-vous pour les transferts transfrontaliers de données ?",helper:"Le RGPD impose un encadrement légal",options:[{value:"No transfers",label:"Pas de transfert"},{value:"Ad-hoc contracts",label:"Contrats ad hoc"},{value:"Standard contractual clauses",label:"Clauses contractuelles types"},{value:"Binding corporate rules",label:"Règles d'entreprise contraignantes"},{value:"Adequacy decision and ongoing monitoring",label:"Décision d'adéquation et suivi continu"}]}};function xt(e,n,t="en"){if(t==="en")return"";if(t==="fr"){const r=Pi[e];if(r&&r[n])return r[n]}return""}function pf(e,n,t="en"){if(!n||t==="en")return n;if(t==="fr"){const r=Pi[e];if(r&&r.options)return r.options}return n}function Kn(e,n="en"){if(n==="en")return e;const t=xt(e.id,"text",n),r=xt(e.id,"helper",n),a=pf(e.id,e.options,n);return{...e,text:t||e.text,helper:r||e.helper,options:a||e.options}}function mf(e,n="en"){if(n==="en")return e;const t=xt(e.id,"purpose",n);return{...e,purpose:t||e.purpose,questions:e.questions.map(r=>Kn(r,n))}}function ff({question:e,value:n,onChange:t,detectedTrack:r="GEN"}){const{i18n:a,t:o}=Ue(),i=Kn(e,a.language),[s,l]=p.useState(n||"");p.useEffect(()=>l(n||""),[n]);const c=d=>{l(d),t(d)},m=()=>{var d,f,h,v,b;switch(i.type){case"text":case"email":return u.jsx(De,{type:i.type,value:s,onChange:g=>c(g.target.value),placeholder:o("form.enterText"),className:"mt-2",required:i.required});case"checkbox":return u.jsx(fn,{checked:!!n,onCheckedChange:g=>t(g),className:"mt-2"});case"single":case"dropdown":case"industry_dropdown":{const g=i.options||((d=i.groups)==null?void 0:d.flatMap(x=>x.options))||[];return i.type==="dropdown"||i.type==="industry_dropdown"||g.length>8||i.id==="M3"?u.jsxs(xn,{value:n,onValueChange:t,children:[u.jsx(Ye,{className:"mt-4 bg-background border border-border",children:u.jsx(yn,{placeholder:o("form.pleaseSelect")})}),u.jsx(Je,{className:"z-50 bg-background border border-border shadow-lg",children:g.map(x=>{const _=typeof x=="string"?x:x.value,A=typeof x=="string"?x:x.label;return u.jsx(Xe,{value:_,className:"cursor-pointer hover:bg-accent hover:text-accent-foreground",children:A},_)})})]}):u.jsx(Mn,{value:n||"",onValueChange:t,className:"mt-4 space-y-3",children:(f=i.groups)!=null&&f.length?i.groups.map(x=>u.jsxs("div",{className:"space-y-2",children:[u.jsx(Z,{className:"text-sm font-medium",children:x.label}),x.options.map(_=>u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(rn,{value:_.value,id:_.value}),u.jsx(Z,{htmlFor:_.value,className:"font-normal cursor-pointer",children:_.label})]},_.value))]},x.label)):g.map(x=>{const _=typeof x=="string"?x:x.value,A=typeof x=="string"?x:x.label;return u.jsxs("div",{className:"flex items-center space-x-2",children:[u.jsx(rn,{value:_,id:_}),u.jsx(Z,{htmlFor:_,className:"font-normal cursor-pointer",children:A})]},_)})})}case"multi":return u.jsx(Md,{options:i.options||[],value:n||[],onChange:t});case"multi_group":{const{groups:g=[]}=i;return u.jsx(df,{groups:g,value:n||[],onChange:t,detectedTrack:r})}case"rank":{const g=i.options||((h=i.groups)==null?void 0:h.flatMap(y=>y.options))||[];return u.jsx(Nd,{options:g,value:n||[],onChange:t,maxRank:i.maxRank||3})}case"matrix":return u.jsx(Rd,{rows:((v=i.rows)==null?void 0:v.map(g=>typeof g=="string"?{value:g,label:g}:g))||[],columns:((b=i.columns)==null?void 0:b.map(g=>typeof g=="string"?{value:g,label:g}:g))||[],value:n||{},onChange:t});default:return null}};return u.jsxs(xe,{className:"mb-6 p-4",children:[u.jsx(Z,{className:"font-semibold",children:i.text}),i.helper&&u.jsx("p",{className:"mt-2 mb-4 text-sm text-muted-foreground",children:i.helper}),m()]})}function vf({currentSectionIndex:e,completedSections:n,detectedTrack:t,showTrackInfo:r,responses:a={},globalComputed:o={}}){var h,v;const{t:i}=Ue(),s=()=>{if(!t)return null;let b=0,g=0;return X.forEach((y,x)=>{let _=0;y.questions.forEach(A=>{dn(A,a,t,_,o)&&(_++,b++,a[A.id]!==void 0&&a[A.id]!==null&&a[A.id]!==""&&g++)})}),$t.forEach(y=>{dn(y,a,t,b,o)&&(b++,a[y.id]!==void 0&&a[y.id]!==null&&a[y.id]!==""&&g++)}),{total:b,remaining:b-g,answered:g}},l=()=>{const b=a.M3&&a.M3!=="",g=e>=1;return b&&g&&t},c=s(),m=l(),d=X.length,f=Math.round(n/d*100);return u.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-sm border",children:[u.jsxs("div",{className:"flex items-center justify-between mb-6",children:[u.jsx("h1",{className:"text-xl font-semibold text-foreground",children:i("assessment.tagline")}),u.jsxs("div",{className:"text-right",children:[u.jsx("div",{className:"text-2xl font-bold text-primary tabular-nums",children:u.jsxs("span",{className:"inline-block min-w-[4ch] text-right",children:[f,"%"]})}),u.jsx("div",{className:"text-sm text-muted-foreground",children:i("assessment.progress.complete")})]})]}),u.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",children:[u.jsxs("div",{className:"bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3",children:[u.jsx(ms,{className:"h-5 w-5 text-green-600"}),u.jsxs("div",{children:[u.jsx("div",{className:"text-2xl font-bold text-green-600",children:n}),u.jsx("div",{className:"text-sm text-green-700",children:i("assessment.progress.sectionsComplete")})]})]}),u.jsxs("div",{className:"bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3",children:[u.jsx(vs,{className:"h-5 w-5 text-orange-600"}),u.jsxs("div",{children:[u.jsx("div",{className:"text-2xl font-bold text-orange-600",children:d-n}),u.jsx("div",{className:"text-sm text-orange-700",children:i("assessment.progress.sectionsRemaining")})]})]}),u.jsxs("div",{className:"bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3",children:[u.jsx(fs,{className:"h-5 w-5 text-gray-600"}),u.jsxs("div",{children:[u.jsx("div",{className:"text-2xl font-bold text-gray-600",children:m&&c?c.remaining:"?"}),u.jsx("div",{className:"text-sm text-gray-700",children:m&&t&&c?`${i("assessment.progress.questionsRemaining_plural")} (${i(`tracks.${t}`)})`:e===0?"Complete Profile First":"Select Role to See Count"})]})]})]}),u.jsxs("div",{className:"mb-4",children:[u.jsxs("div",{className:"text-sm text-muted-foreground mb-2",children:[i("assessment.progress.sectionOf",{current:e+1,total:d}),":"," ",i(`sections.${(h=X[e])==null?void 0:h.id}`)||((v=X[e])==null?void 0:v.title)]}),!m&&e===0&&u.jsx("div",{className:"text-sm text-muted-foreground",children:"Complete your profile to see personalized question count"}),!m&&e>0&&!a.M3&&u.jsx("div",{className:"text-sm text-muted-foreground",children:"Select your role to see remaining questions"})]}),u.jsx("div",{className:"flex items-center justify-between relative",children:X.map((b,g)=>{const y=g<n,x=g===e;return u.jsxs("div",{className:"flex flex-col items-center",children:[u.jsx("div",{className:`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold mb-2
                  ${x?"bg-primary text-primary-foreground":y?"bg-green-100 text-green-700 border-2 border-green-200":"bg-gray-100 text-gray-500"}
                `,children:g+1}),u.jsxs("div",{className:"text-center",children:[u.jsx("div",{className:"text-xs font-medium text-foreground",children:i(`sections.${b.id}`)||b.title}),u.jsx("div",{className:"text-xs text-muted-foreground",children:x?"Current":y?"Complete":"Pending"})]}),g<d-1&&u.jsx("div",{className:`
                    absolute h-0.5 w-16 mt-6 ml-12
                    ${g<e?"bg-green-300":"bg-gray-200"}
                  `,style:{zIndex:-1}})]},b.id)})})]})}function gf({id:e,text:n,required:t,accepted:r,onChange:a}){const{t:o,i18n:i}=Ue(),s=i.language==="fr"&&n.includes("By proceeding, you agree to process")?o("assessment.consent.dataProcessing"):n;return u.jsxs(la,{className:"flex items-start gap-2",children:[u.jsx(fn,{id:e,checked:r,onCheckedChange:l=>a(l===!0)}),u.jsxs(Z,{htmlFor:e,className:"text-sm font-normal leading-5",children:[s,t&&u.jsx("span",{className:"text-destructive ml-1",children:"*"})]})]})}function hf({questions:e,responses:n,onChange:t}){var g,y,x,_,A;const{t:r,i18n:a}=Ue(),o=w=>{const R=e.find(j=>j.id===w);return R?Kn(R,a.language):void 0},i=w=>u.jsxs(Z,{className:"text-sm font-medium",children:[w.text,w.required&&u.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),s=w=>w.helper&&u.jsx("p",{className:"text-xs text-muted-foreground mt-1",children:w.helper}),l=o("M0"),c=o("M1"),m=o("M2"),d=o("M3"),f=o("M4_industry"),h=o("M5_country"),v=o("M6_size"),b=o("M7_revenue");return u.jsxs("div",{className:"space-y-8",children:[u.jsxs(xe,{className:"p-6 border border-border/50",children:[u.jsx("h3",{className:"text-lg font-semibold mb-6 pb-2 border-b border-border/30",children:r("form.basicInformation")}),u.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[u.jsx("div",{className:"space-y-2",children:l&&u.jsxs(u.Fragment,{children:[i(l),u.jsx(De,{type:"text",value:n[l.id]||"",onChange:w=>t(l.id,w.target.value),placeholder:r("form.enterOrgName"),className:"focus-visible:ring-2 focus-visible:ring-primary/20"}),s(l)]})}),u.jsx("div",{className:"space-y-2",children:c&&u.jsxs(u.Fragment,{children:[i(c),u.jsx(De,{type:"text",value:n[c.id]||"",onChange:w=>t(c.id,w.target.value),placeholder:r("form.enterFullName"),className:"focus-visible:ring-2 focus-visible:ring-primary/20"}),s(c)]})}),u.jsx("div",{className:"space-y-2",children:m&&u.jsxs(u.Fragment,{children:[i(m),u.jsx(De,{type:"email",value:n[m.id]||"",onChange:w=>t(m.id,w.target.value),placeholder:r("form.enterEmail"),className:"focus-visible:ring-2 focus-visible:ring-primary/20"}),s(m)]})}),u.jsx("div",{className:"space-y-2",children:d&&u.jsxs(u.Fragment,{children:[i(d),u.jsxs(xn,{value:n[d.id]||"",onValueChange:w=>t(d.id,w),children:[u.jsx(Ye,{className:"focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border",children:u.jsx(yn,{placeholder:r("form.selectRole")})}),u.jsx(Je,{className:"z-50 bg-background border border-border shadow-lg max-h-60",children:(g=d.options)==null?void 0:g.map(w=>{const R=typeof w=="string"?w:w.value,j=typeof w=="string"?w:w.label;return u.jsx(Xe,{value:R,className:"cursor-pointer hover:bg-accent hover:text-accent-foreground",children:j},R)})})]}),s(d)]})}),u.jsx("div",{className:"space-y-2",children:f&&u.jsxs(u.Fragment,{children:[i(f),u.jsxs(xn,{value:n[f.id]||"",onValueChange:w=>t(f.id,w),children:[u.jsx(Ye,{className:"focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border",children:u.jsx(yn,{placeholder:r("form.selectIndustry")})}),u.jsx(Je,{className:"z-50 bg-background border border-border shadow-lg max-h-60",children:(y=f.options)==null?void 0:y.map(w=>{const R=typeof w=="string"?w:w.value,j=typeof w=="string"?w:w.label;return u.jsx(Xe,{value:R,className:"cursor-pointer hover:bg-accent hover:text-accent-foreground",children:j},R)})})]}),s(f)]})}),u.jsx("div",{className:"space-y-2",children:h&&u.jsxs(u.Fragment,{children:[i(h),u.jsxs(xn,{value:n[h.id]||"",onValueChange:w=>t(h.id,w),children:[u.jsx(Ye,{className:"focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border",children:u.jsx(yn,{placeholder:r("form.selectCountry")})}),u.jsx(Je,{className:"z-50 bg-background border border-border shadow-lg max-h-60",children:(x=h.options)==null?void 0:x.map(w=>{const R=typeof w=="string"?w:w.value,j=typeof w=="string"?w:w.label;return u.jsx(Xe,{value:R,className:"cursor-pointer hover:bg-accent hover:text-accent-foreground",children:j},R)})})]}),s(h)]})})]})]}),u.jsxs(xe,{className:"p-6 border border-border/50",children:[u.jsx("h3",{className:"text-lg font-semibold mb-6 pb-2 border-b border-border/30",children:r("form.organizationDetails")}),u.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[u.jsx("div",{className:"space-y-4",children:v&&u.jsxs(u.Fragment,{children:[i(v),u.jsx(Mn,{value:n[v.id]||"",onValueChange:w=>t(v.id,w),className:"space-y-3",children:(_=v.options)==null?void 0:_.map(w=>{const R=typeof w=="string"?w:w.value,j=typeof w=="string"?w:w.label;return u.jsxs("div",{className:"flex items-center space-x-3",children:[u.jsx(rn,{value:R,id:`size-${R}`,className:"mt-0.5"}),u.jsx(Z,{htmlFor:`size-${R}`,className:"font-normal cursor-pointer text-sm",children:j})]},R)})}),s(v)]})}),u.jsx("div",{className:"space-y-4",children:b&&u.jsxs(u.Fragment,{children:[i(b),u.jsx(Mn,{value:n[b.id]||"",onValueChange:w=>t(b.id,w),className:"space-y-3",children:(A=b.options)==null?void 0:A.map(w=>{const R=typeof w=="string"?w:w.value,j=typeof w=="string"?w:w.label;return u.jsxs("div",{className:"flex items-center space-x-3",children:[u.jsx(rn,{value:R,id:`revenue-${R}`,className:"mt-0.5"}),u.jsx(Z,{htmlFor:`revenue-${R}`,className:"font-normal cursor-pointer text-sm",children:j})]},R)})}),s(b)]})})]})]})]})}function bf(e,n){var t,r;if(e.required){if(n==null||n==="")return{valid:!1,error:"This field is required"};if(Array.isArray(n)&&n.length===0)return{valid:!1,error:"Please select at least one option"}}switch(e.type){case"email":if(n&&typeof n=="string"){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n))return{valid:!1,error:"Please enter a valid email address"};const o=["gmail.com","hotmail.com","yahoo.com","outlook.com"],i=(t=n.split("@")[1])==null?void 0:t.toLowerCase();if(o.includes(i))return{valid:!1,error:"Please use your business email address"}}break;case"rank":if(Array.isArray(n)){const a=e.maxRank||((r=e.options)==null?void 0:r.length)||5;if(n.length>a)return{valid:!1,error:`Please select at most ${a} items`}}break;case"multi":case"multi_group":if(Array.isArray(n)&&e.maxSelect&&n.length>e.maxSelect)return{valid:!1,error:`Please select at most ${e.maxSelect} options`};break;case"matrix":if(e.required&&e.rows&&typeof n=="object"&&n!==null&&!Array.isArray(n)){const a=n,o=e.rows.filter(i=>typeof i=="object"&&"required"in i?i.required:!0);for(const i of o){const s=typeof i=="string"?i:i.value;if(!(a!=null&&a[s]))return{valid:!1,error:"Please complete all required rows"}}}break}return{valid:!0}}function kr(e,n){const t={};for(const r of e){const a=bf(r,n[r.id]);a.valid||(t[r.id]=a.error||"Invalid response")}return{valid:Object.keys(t).length===0,errors:t}}function pv({onComplete:e}){const{t:n,i18n:t}=Ue(),{toast:r}=is();Gn();const[a,o]=p.useState(0),[i,s]=p.useState({}),[l,c]=p.useState("GEN"),[m,d]=p.useState(!1),[f,h]=p.useState(!1),b=(S=>{const C={};return Object.entries(Kt).forEach(([L,D])=>{if(D.logic&&typeof D.logic=="string"){const J=D.logic;if(L==="regulated"){const ae=J.match(/M4_industry\s+in\s+\[(.*?)\]/);if(ae){const Ae=ae[1].split(",").map(_e=>_e.trim().replace(/['"]/g,"")),Re=S.M4_industry;C[L]=Ae.includes(Re)}}else if(L==="track"){const ae=S.M3,Ae=["CIO / CTO","IT Lead","Data / AI Lead","ML Engineer","Data Engineer","DevOps Engineer","Security Architect","Infrastructure Manager"],Re=["Legal / Compliance Lead","Privacy Officer","Compliance Manager","Risk Manager","Audit Lead","Governance Officer"];Ae.includes(ae)?C[L]="TECH":C.regulated||Re.includes(ae)?C[L]="REG":C[L]="GEN"}}}),C})(i);p.useEffect(()=>{const S=cf(i,b);c(S)},[i,b]);const g=$t.filter(S=>dn(S,i,l,0,b)),y=a===X.length-1,x=g.length>0,_=a===X.length,A=_?null:mf(X[a],t.language),w=()=>window.scrollTo({top:0,behavior:"smooth"});p.useEffect(()=>{w()},[a]);const R=()=>{o(S=>Math.max(0,S-1)),w()},j=()=>{o(y&&x?X.length:S=>Math.min(X.length,S+1)),w()},M=async()=>{const S={M0:i.M0||"",M1:i.M1||"",M2:i.M2||"",M3:i.M3||"",M3_other:i.M3_other||"",M4_industry:i.M4_industry||"",M4_sub:i.M4_sub||"",M5_country:i.M5_country||"",M6_size:i.M6_size||"",M7_revenue:i.M7_revenue||"",track:l,regulated:!!b.regulated};h(!0);try{await e(i,S)}catch{r({title:"Error completing assessment",description:"Please try again or contact support.",variant:"destructive"})}finally{h(!1)}},F=(S,C)=>{s(L=>({...L,[S]:C})),(S==="M3"||S==="M4_industry")&&!m&&d(!0)},O=()=>_?g.map(S=>Kn(S,t.language)):A?A.questions.filter(S=>dn(S,i,l,0,b)):[],B=()=>{var L;const S=O();return(L=A==null?void 0:A.consentBanner)!=null&&L.required&&S.push({id:`consent_${A.id}`,text:"Consent",type:"checkbox",required:!0}),kr(S,i).valid},T=()=>{const S=O(),C=kr(S,i),L=Object.keys(C.errors)[0],D=document.getElementById(L);if(D){D.scrollIntoView({behavior:"smooth",block:"center"});const J=D.querySelector("input, select, textarea, button");J instanceof HTMLElement&&J.focus()}},re=async()=>{if(f)return;const S=_||y&&!x;if(!B()){T(),r({title:"Please complete all required questions",description:"Some questions still need your input.",variant:"destructive"});return}S?await M():j()},ee=O(),pe=_?n("assessment.additionalQuestions"):n(`sections.${A==null?void 0:A.id}`)||(A==null?void 0:A.title),U=_||A==null?void 0:A.purpose,we=Math.min(a,X.length-1);return u.jsxs("div",{className:"max-w-4xl mx-auto p-6 space-y-6",children:[u.jsxs("div",{className:"flex justify-between items-center mb-4",children:[u.jsx("h1",{className:"text-3xl font-bold",children:n("assessment.title")}),u.jsx(hd,{})]}),u.jsx(vf,{currentSectionIndex:we,completedSections:we,detectedTrack:l,showTrackInfo:m,responses:i,globalComputed:b}),!_&&(A==null?void 0:A.consentBanner)&&u.jsx(gf,{id:`consent_${A.id}`,text:A.consentBanner.text||"",required:A.consentBanner.required,accepted:!!i[`consent_${A.id}`],onChange:S=>F(`consent_${A.id}`,S)}),u.jsxs(xe,{className:"p-6 space-y-6",children:[u.jsxs("div",{children:[u.jsx("h2",{className:"text-2xl font-bold",children:pe}),U&&u.jsx("p",{className:"text-muted-foreground",children:U}),u.jsx(fa,{value:a/X.length*100,className:"w-full my-4"})]}),(A==null?void 0:A.id)==="section_0"?u.jsx(hf,{questions:ee,responses:i,onChange:F}):ee.map(S=>u.jsx("div",{id:S.id,"data-question-id":S.id,children:u.jsx(ff,{question:S,value:i[S.id],onChange:C=>F(S.id,C),detectedTrack:l})},S.id))]}),u.jsxs("div",{className:"flex justify-between",children:[u.jsxs(In,{onClick:R,variant:"outline",disabled:a===0||f,children:[u.jsx(cs,{className:"h-4 w-4"})," ",n("common.previous")]}),u.jsx(In,{onClick:()=>{re()},disabled:f,children:f?u.jsxs(u.Fragment,{children:[u.jsx(hs,{className:"h-4 w-4 animate-spin"})," ",n("common.submitting")]}):_||y&&!x?n("common.completeAssessment"):u.jsxs(u.Fragment,{children:[n("common.next")," ",u.jsx(ds,{className:"h-4 w-4"})]})})]})]})}export{Z as $,wf as A,In as B,vs as C,jf as D,yn as E,Tf as F,Je as G,Lf as H,De as I,Xe as J,Ef as K,Ff as L,Bf as M,rv as N,ev as O,fa as P,Kf as Q,zf as R,$f as S,Vf as T,Jf as U,fn as V,Yf as W,Xf as X,Gf as Y,Sf as Z,Pf as _,Ce as a,cn as a0,X as a1,Uf as a2,pv as a3,ke as a4,av as a5,Ue as a6,hd as a7,Hf as a8,_f as a9,Of as aa,qf as ab,If as ac,Yl as ad,cs as ae,gs as af,$t as ag,tv as ah,nv as ai,Fl as aj,sv as ak,dv as al,Df as b,P as c,kf as d,xe as e,eu as f,nu as g,ru as h,tu as i,Nf as j,Ln as k,is as l,Qf as m,hs as n,Zf as o,la as p,lu as q,Wf as r,Rf as s,Mf as t,Gn as u,Af as v,Cf as w,bs as x,xn as y,Ye as z};
