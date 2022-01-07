import{r as a,s as i,$ as c,n as u,e as p}from"./vendor.f4edd1c2.js";const M=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}};M();var R=Object.defineProperty,S=Object.getOwnPropertyDescriptor,E=(o,t,s,r)=>{for(var e=r>1?void 0:r?S(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&R(t,s,e),e};let v=class extends i{render(){return c` <main>
      <header>404</header>
    </main>`}};v.styles=a``;v=E([u("unknown-route")],v);var L=Object.defineProperty,N=Object.getOwnPropertyDescriptor,D=(o,t,s,r)=>{for(var e=r>1?void 0:r?N(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&L(t,s,e),e};let f=class extends i{constructor(){super(...arguments);this.id=""}render(){return c`<section>User ID: ${this.id}</section>`}};f.styles=a``;D([p({type:String})],f.prototype,"id",2);f=D([u("account-details")],f);var T=Object.defineProperty,U=Object.getOwnPropertyDescriptor,I=(o,t,s,r)=>{for(var e=r>1?void 0:r?U(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&T(t,s,e),e};let _=class extends i{render(){return c`Account Info`}};_.styles=a``;_=I([u("account-info")],_);var F=Object.defineProperty,q=Object.getOwnPropertyDescriptor,z=(o,t,s,r)=>{for(var e=r>1?void 0:r?q(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&F(t,s,e),e};let g=class extends i{render(){return c`<section><slot></slot></section>`}};g.styles=a``;g=z([u("account-module")],g);var Z=Object.defineProperty,B=Object.getOwnPropertyDescriptor,G=(o,t,s,r)=>{for(var e=r>1?void 0:r?B(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&Z(t,s,e),e};let m=class extends i{render(){return c`<section>Default Dashboard</section>`}};m.styles=a``;m=G([u("dashboard-default")],m);var H=Object.defineProperty,K=Object.getOwnPropertyDescriptor,W=(o,t,s,r)=>{for(var e=r>1?void 0:r?K(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&H(t,s,e),e};let b=class extends i{render(){return c`<section>Overview</section>`}};b.styles=a``;b=W([u("overview-module")],b);var J=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,V=(o,t,s,r)=>{for(var e=r>1?void 0:r?Q(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&J(t,s,e),e};let w=class extends i{render(){return c`<main>
      <header>
        <span class="title">Dashboard</span>
        <nav>
          <a href="#/dashboard/overview">Overview</a>
          <a href="#/dashboard/account/">Account</a>
        </nav>
      </header>
      <section><slot></slot></section>
    </main> `}};w.styles=a`
    header {
      height: 40px;
      background-color: orange;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      justify-content: space-between;
    }
  `;w=V([u("dashboard-module")],w);var X=Object.defineProperty,Y=Object.getOwnPropertyDescriptor,k=(o,t,s,r)=>{for(var e=r>1?void 0:r?Y(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&X(t,s,e),e};let O=class extends i{render(){return c` <main>
      <header>App Base</header>
      <slot></slot>
    </main>`}};O.styles=a`
    header {
      height: 40px;
      background-color: navy;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;O=k([u("app-module")],O);var ee=Object.defineProperty,te=Object.getOwnPropertyDescriptor,re=(o,t,s,r)=>{for(var e=r>1?void 0:r?te(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&ee(t,s,e),e};let P=class extends i{render(){return c`
      <main>
        <aside>
          <a href="#/">Home</a>
          <a href="#/dashboard/">Dashboard</a>
          <a href="#/settings/">Settings</a>
        </aside>
        <section><slot></slot></section>
      </main>
    `}};P.styles=a`
    main {
      display: flex;
      flex-direction: row;
      height: 100vh;
      width: 100%;
    }
    aside {
      display: flex;
      flex-direction: column;
      background-color: whitesmoke;
      padding: 8px;
    }
    section {
      flex: 1;
    }
  `;P=re([u("root-module")],P);var se=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,oe=(o,t,s,r)=>{for(var e=r>1?void 0:r?ne(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&se(t,s,e),e};let $=class extends i{render(){return c`Admin Settings`}};$.styles=a``;$=oe([u("admin-settings")],$);var le=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,ie=(o,t,s,r)=>{for(var e=r>1?void 0:r?ae(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&le(t,s,e),e};let y=class extends i{render(){return c`<section>Default Settings</section>`}};y.styles=a``;y=ie([u("settings-default")],y);var ce=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,de=(o,t,s,r)=>{for(var e=r>1?void 0:r?ue(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&ce(t,s,e),e};let x=class extends i{render(){return c` <main>
      <header>Settings</header>
      <slot></slot>
    </main>`}};x.styles=a`
    header {
      height: 40px;
      background-color: black;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;x=de([u("settings-module")],x);var pe=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,h=(o,t,s,r)=>{for(var e=r>1?void 0:r?fe(t,s):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(e=(r?l(t,s,e):l(e))||e);return r&&e&&pe(t,s,e),e};let d=class extends i{constructor(){super(...arguments);this.hash="true",this.base="/",this.route=this.getCurrentRoute(),this.components=new Map([["/404","unknown-route"],["/dashboard/account/:id","account-details"],["/dashboard/account/","account-info"],["/dashboard/account","account-module"],["/dashboard/","dashboard-default"],["/dashboard/overview","overview-module"],["/dashboard","dashboard-module"],["/","app-module"],["","root-module"],["/settings/admin","admin-settings"],["/settings/","settings-default"],["/settings","settings-module"]])}firstUpdated(){window.addEventListener("hashchange",()=>{this.route=this.getCurrentRoute(),this.updateTree()}),this.updateTree()}render(){return c` ${this.child} `}async updateTree(){for(;this.child.firstChild;)this.child.removeChild(this.child.firstChild);const o=await this.renderTree();this.child.appendChild(o),this.requestUpdate()}async renderTree(){let o=document.createElement("div"),t=this.route;const s=this.getArgsForRoute(t);if(t!=="/")for(;t.length>0;){o=this.getComponent(t,o,s);const r=t.split("/");if(r.pop(),t=r.join("/"),t==="/")break}else t==="/"?o=this.getComponent("/",o,s):o=this.getComponent("/404",o,s);return o=this.getComponent("",o,s),o}getComponent(o,t,s){const r=(e,n=!0)=>{const l=document.createElement(e);if(l.appendChild(t),n&&(s==null?void 0:s.groups))for(const[C,A]of Object.entries(s.groups))l.setAttribute(C,A);return l};for(const[e,n]of Array.from(this.components.entries())){if(e===o)return r(n,!1);if(o.match(j(e))!==null)return r(n)}return t}getArgsForRoute(o){for(const t of Array.from(this.components.keys())){const s=o.match(j(t));if(s!==null)return s}return null}getCurrentRoute(){var t;let o="/";if(this.hash==="true"&&window.location.hash.length>0)o=window.location.hash.slice(1);else{const s=(t=this.getAttribute("base"))!=null?t:"";o=window.location.pathname.slice(s.length)}return o==""&&(o="/"),console.debug(`current route: ${o}`),o}};d.styles=a`
    main {
      width: 100%;
      height: 100%;
    }
  `;h([p()],d.prototype,"hash",2);h([p()],d.prototype,"base",2);h([p()],d.prototype,"route",2);d=h([u("generated-app")],d);function j(o){const t="[a-zA-Z0-9_-]+",s=o.replace(new RegExp(`:(${t})`),r=>`(?<${r.slice(1)}>[a-zA-Z0-9_\\-.,:;+*^%$@!]+)`);return new RegExp(`^${s}$`)}
