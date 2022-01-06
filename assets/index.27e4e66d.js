import{r as l,s as i,$ as c,n as p,e as $}from"./vendor.f4edd1c2.js";const C=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}};C();var A=Object.defineProperty,M=Object.getOwnPropertyDescriptor,R=(n,t,o,r)=>{for(var e=r>1?void 0:r?M(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&A(t,o,e),e};let d=class extends i{render(){return c` <main>
      <header>404</header>
    </main>`}};d.styles=l``;d=R([p("unknown-route")],d);var S=Object.defineProperty,E=Object.getOwnPropertyDescriptor,x=(n,t,o,r)=>{for(var e=r>1?void 0:r?E(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&S(t,o,e),e};let u=class extends i{constructor(){super(...arguments);this.id=""}render(){return c`<section>User ID: ${this.id}</section>`}};u.styles=l``;x([$({type:String})],u.prototype,"id",2);u=x([p("account-details")],u);var L=Object.defineProperty,N=Object.getOwnPropertyDescriptor,H=(n,t,o,r)=>{for(var e=r>1?void 0:r?N(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&L(t,o,e),e};let f=class extends i{render(){return c`Account Info`}};f.styles=l``;f=H([p("account-info")],f);var I=Object.defineProperty,U=Object.getOwnPropertyDescriptor,q=(n,t,o,r)=>{for(var e=r>1?void 0:r?U(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&I(t,o,e),e};let h=class extends i{render(){return c`<section><slot></slot></section>`}};h.styles=l``;h=q([p("account-module")],h);var z=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,B=(n,t,o,r)=>{for(var e=r>1?void 0:r?Z(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&z(t,o,e),e};let v=class extends i{render(){return c`<section>Default Dashboard</section>`}};v.styles=l``;v=B([p("dashboard-default")],v);var F=Object.defineProperty,G=Object.getOwnPropertyDescriptor,K=(n,t,o,r)=>{for(var e=r>1?void 0:r?G(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&F(t,o,e),e};let m=class extends i{render(){return c`<section>Overview</section>`}};m.styles=l``;m=K([p("overview-module")],m);var W=Object.defineProperty,J=Object.getOwnPropertyDescriptor,Q=(n,t,o,r)=>{for(var e=r>1?void 0:r?J(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&W(t,o,e),e};let _=class extends i{render(){return c`<main>
      <header>
        <span class="title">Dashboard</span>
        <nav>
          <a href="#/dashboard/overview">Overview</a>
          <a href="#/dashboard/account/">Account</a>
        </nav>
      </header>
      <section><slot></slot></section>
    </main> `}};_.styles=l`
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
  `;_=Q([p("dashboard-module")],_);var T=Object.defineProperty,V=Object.getOwnPropertyDescriptor,X=(n,t,o,r)=>{for(var e=r>1?void 0:r?V(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&T(t,o,e),e};let g=class extends i{render(){return c` <main>
      <header>App Base</header>
      <slot></slot>
    </main>`}};g.styles=l`
    header {
      height: 40px;
      background-color: navy;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;g=X([p("app-module")],g);var Y=Object.defineProperty,k=Object.getOwnPropertyDescriptor,ee=(n,t,o,r)=>{for(var e=r>1?void 0:r?k(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&Y(t,o,e),e};let b=class extends i{render(){return c`
      <main>
        <aside>
          <a href="#/">Home</a>
          <a href="#/dashboard/">Dashboard</a>
          <a href="#/settings/">Settings</a>
        </aside>
        <section><slot></slot></section>
      </main>
    `}};b.styles=l`
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
  `;b=ee([p("root-module")],b);var te=Object.defineProperty,re=Object.getOwnPropertyDescriptor,se=(n,t,o,r)=>{for(var e=r>1?void 0:r?re(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&te(t,o,e),e};let O=class extends i{render(){return c`Admin Settings`}};O.styles=l``;O=se([p("admin-settings")],O);var ne=Object.defineProperty,oe=Object.getOwnPropertyDescriptor,ae=(n,t,o,r)=>{for(var e=r>1?void 0:r?oe(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&ne(t,o,e),e};let w=class extends i{render(){return c`<section>Default Settings</section>`}};w.styles=l``;w=ae([p("settings-default")],w);var le=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,ce=(n,t,o,r)=>{for(var e=r>1?void 0:r?ie(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&le(t,o,e),e};let P=class extends i{render(){return c` <main>
      <header>Settings</header>
      <slot></slot>
    </main>`}};P.styles=l`
    header {
      height: 40px;
      background-color: black;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;P=ce([p("settings-module")],P);var pe=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,D=(n,t,o,r)=>{for(var e=r>1?void 0:r?ue(t,o):t,s=n.length-1,a;s>=0;s--)(a=n[s])&&(e=(r?a(t,o,e):a(e))||e);return r&&e&&pe(t,o,e),e};let y=class extends i{constructor(){super(...arguments);this.route=this.getHashRoute(),this.components=new Map([["/404",{name:"unknown-route",type:d}],["/dashboard/account/:id",{name:"account-details",type:u}],["/dashboard/account/",{name:"account-info",type:f}],["/dashboard/account",{name:"account-module",type:h}],["/dashboard/",{name:"dashboard-default",type:v}],["/dashboard/overview",{name:"overview-module",type:m}],["/dashboard",{name:"dashboard-module",type:_}],["/",{name:"app-module",type:g}],["",{name:"root-module",type:b}],["/settings/admin",{name:"admin-settings",type:O}],["/settings/",{name:"settings-default",type:w}],["/settings",{name:"settings-module",type:P}]])}firstUpdated(){window.addEventListener("hashchange",()=>{this.route=this.getHashRoute(),this.requestUpdate()})}render(){let n=document.createElement("div"),t=this.route;if(t!=="/"){for(;t.length>0;){n=this.getComponent(t,n);const o=t.split("/");if(o.pop(),t=o.join("/"),t==="/")break}n=this.getComponent("",n)}else t==="/"?(n=this.getComponent("/",n),n=this.getComponent("",n)):n=this.getComponent("/404",n);return c` <main>${n}</main>`}getComponent(n,t){for(const[o,r]of Array.from(this.components.entries())){const e=n.match(de(o));if(e){const s=document.createElement(r.name);if(e.groups)for(const[a,j]of Object.entries(e.groups))s.setAttribute(a,j);return s.appendChild(t),s}}return t}getHashRoute(){let n="/";return window.location.hash.length>0&&(n=window.location.hash.slice(1),n==""&&(n="/")),console.debug(`current route: ${n}`),n}};y.styles=l`
    main {
      width: 100%;
      height: 100%;
    }
  `;D([$()],y.prototype,"route",2);y=D([p("generated-app")],y);function de(n){const t="[a-zA-Z0-9_-]+",o=n.replace(new RegExp(`:(${t})`),r=>`(?<${r.slice(1)}>[a-zA-Z0-9_\\-.,:;+*^%$@!]+)`);return new RegExp(`^${o}$`)}
