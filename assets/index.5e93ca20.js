import{r as l,s as i,$ as c,n as u,e as p}from"./vendor.f4edd1c2.js";const C=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}};C();var A=Object.defineProperty,M=Object.getOwnPropertyDescriptor,R=(o,t,n,r)=>{for(var e=r>1?void 0:r?M(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&A(t,n,e),e};let v=class extends i{render(){return c` <main>
      <header>404</header>
    </main>`}};v.styles=l``;v=R([u("unknown-route")],v);var S=Object.defineProperty,E=Object.getOwnPropertyDescriptor,D=(o,t,n,r)=>{for(var e=r>1?void 0:r?E(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&S(t,n,e),e};let f=class extends i{constructor(){super(...arguments);this.id=""}render(){return c`<section>User ID: ${this.id}</section>`}};f.styles=l``;D([p({type:String})],f.prototype,"id",2);f=D([u("account-details")],f);var U=Object.defineProperty,L=Object.getOwnPropertyDescriptor,N=(o,t,n,r)=>{for(var e=r>1?void 0:r?L(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&U(t,n,e),e};let _=class extends i{render(){return c`Account Info`}};_.styles=l``;_=N([u("account-info")],_);var I=Object.defineProperty,q=Object.getOwnPropertyDescriptor,z=(o,t,n,r)=>{for(var e=r>1?void 0:r?q(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&I(t,n,e),e};let m=class extends i{render(){return c`<section><slot></slot></section>`}};m.styles=l``;m=z([u("account-module")],m);var Z=Object.defineProperty,B=Object.getOwnPropertyDescriptor,F=(o,t,n,r)=>{for(var e=r>1?void 0:r?B(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&Z(t,n,e),e};let g=class extends i{render(){return c`<section>Default Dashboard</section>`}};g.styles=l``;g=F([u("dashboard-default")],g);var G=Object.defineProperty,H=Object.getOwnPropertyDescriptor,K=(o,t,n,r)=>{for(var e=r>1?void 0:r?H(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&G(t,n,e),e};let b=class extends i{render(){return c`<section>Overview</section>`}};b.styles=l``;b=K([u("overview-module")],b);var W=Object.defineProperty,J=Object.getOwnPropertyDescriptor,Q=(o,t,n,r)=>{for(var e=r>1?void 0:r?J(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&W(t,n,e),e};let w=class extends i{render(){return c`<main>
      <header>
        <span class="title">Dashboard</span>
        <nav>
          <a href="#/dashboard/overview">Overview</a>
          <a href="#/dashboard/account/">Account</a>
        </nav>
      </header>
      <section><slot></slot></section>
    </main> `}};w.styles=l`
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
  `;w=Q([u("dashboard-module")],w);var T=Object.defineProperty,V=Object.getOwnPropertyDescriptor,X=(o,t,n,r)=>{for(var e=r>1?void 0:r?V(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&T(t,n,e),e};let O=class extends i{render(){return c` <main>
      <header>App Base</header>
      <slot></slot>
    </main>`}};O.styles=l`
    header {
      height: 40px;
      background-color: navy;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;O=X([u("app-module")],O);var Y=Object.defineProperty,k=Object.getOwnPropertyDescriptor,ee=(o,t,n,r)=>{for(var e=r>1?void 0:r?k(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&Y(t,n,e),e};let P=class extends i{render(){return c`
      <main>
        <aside>
          <a href="#/">Home</a>
          <a href="#/dashboard/">Dashboard</a>
          <a href="#/settings/">Settings</a>
        </aside>
        <section><slot></slot></section>
      </main>
    `}};P.styles=l`
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
  `;P=ee([u("root-module")],P);var te=Object.defineProperty,re=Object.getOwnPropertyDescriptor,se=(o,t,n,r)=>{for(var e=r>1?void 0:r?re(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&te(t,n,e),e};let $=class extends i{render(){return c`Admin Settings`}};$.styles=l``;$=se([u("admin-settings")],$);var ne=Object.defineProperty,oe=Object.getOwnPropertyDescriptor,ae=(o,t,n,r)=>{for(var e=r>1?void 0:r?oe(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&ne(t,n,e),e};let y=class extends i{render(){return c`<section>Default Settings</section>`}};y.styles=l``;y=ae([u("settings-default")],y);var le=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,ce=(o,t,n,r)=>{for(var e=r>1?void 0:r?ie(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&le(t,n,e),e};let x=class extends i{render(){return c` <main>
      <header>Settings</header>
      <slot></slot>
    </main>`}};x.styles=l`
    header {
      height: 40px;
      background-color: black;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;x=ce([u("settings-module")],x);var ue=Object.defineProperty,de=Object.getOwnPropertyDescriptor,h=(o,t,n,r)=>{for(var e=r>1?void 0:r?de(t,n):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(r?a(t,n,e):a(e))||e);return r&&e&&ue(t,n,e),e};let d=class extends i{constructor(){super(...arguments);this.hash="true",this.baseUrl="/",this.route=this.getCurrentRoute(),this.components=new Map([["/404","unknown-route"],["/dashboard/account/:id","account-details"],["/dashboard/account/","account-info"],["/dashboard/account","account-module"],["/dashboard/","dashboard-default"],["/dashboard/overview","overview-module"],["/dashboard","dashboard-module"],["/","app-module"],["","root-module"],["/settings/admin","admin-settings"],["/settings/","settings-default"],["/settings","settings-module"]])}firstUpdated(){window.addEventListener("hashchange",()=>{this.route=this.getCurrentRoute(),this.requestUpdate()})}render(){let o=document.createElement("div"),t=this.route;if(t!=="/")for(;t.length>0;){o=this.getComponent(t,o);const n=t.split("/");if(n.pop(),t=n.join("/"),t==="/")break}else t==="/"?o=this.getComponent("/",o):o=this.getComponent("/404",o);return o=this.getComponent("",o),c` <main>${o}</main>`}getComponent(o,t){for(const[n,r]of Array.from(this.components.entries())){if(n===o){const s=document.createElement(r);return s.appendChild(t),s}const e=o.match(pe(n));if(e){const s=document.createElement(r.name);if(e.groups)for(const[a,j]of Object.entries(e.groups))s.setAttribute(a,j);return s.appendChild(t),s}}return t}getCurrentRoute(){var t;let o="/";if(this.hash==="true"&&window.location.hash.length>0)o=window.location.hash.slice(1);else{const n=(t=this.getAttribute("base"))!=null?t:"";o=window.location.pathname.slice(n.length)}return o==""&&(o="/"),console.debug(`current route: ${o}`),o}};d.styles=l`
    main {
      width: 100%;
      height: 100%;
    }
  `;h([p()],d.prototype,"hash",2);h([p({attribute:"base-url"})],d.prototype,"baseUrl",2);h([p()],d.prototype,"route",2);d=h([u("generated-app")],d);function pe(o){const t="[a-zA-Z0-9_-]+",n=o.replace(new RegExp(`:(${t})`),r=>`(?<${r.slice(1)}>[a-zA-Z0-9_\\-.,:;+*^%$@!]+)`);return new RegExp(`^${n}$`)}
