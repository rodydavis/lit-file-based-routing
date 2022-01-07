import{r as l,s as i,$ as c,n as u,e as f,t as M}from"./vendor.03706caa.js";const S=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}};S();var E=Object.defineProperty,L=Object.getOwnPropertyDescriptor,N=(o,t,s,r)=>{for(var e=r>1?void 0:r?L(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&E(t,s,e),e};let v=class extends i{render(){return c` <main>
      <header>404</header>
    </main>`}};v.styles=l``;v=N([u("unknown-route")],v);var T=Object.defineProperty,U=Object.getOwnPropertyDescriptor,I=(o,t,s,r)=>{for(var e=r>1?void 0:r?U(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&T(t,s,e),e};let _=class extends i{render(){return c` <main>
      <header>Custom</header>
    </main>`}};_.styles=l``;_=I([u("custom-route")],_);var F=Object.defineProperty,q=Object.getOwnPropertyDescriptor,j=(o,t,s,r)=>{for(var e=r>1?void 0:r?q(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&F(t,s,e),e};let h=class extends i{constructor(){super(...arguments);this.id=""}render(){return c`<section>User ID: ${this.id}</section>`}};h.styles=l``;j([f({type:String})],h.prototype,"id",2);h=j([u("account-details")],h);var z=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,B=(o,t,s,r)=>{for(var e=r>1?void 0:r?Z(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&z(t,s,e),e};let m=class extends i{render(){return c`Account Info`}};m.styles=l``;m=B([u("account-info")],m);var G=Object.defineProperty,H=Object.getOwnPropertyDescriptor,K=(o,t,s,r)=>{for(var e=r>1?void 0:r?H(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&G(t,s,e),e};let g=class extends i{render(){return c`<section><slot></slot></section>`}};g.styles=l``;g=K([u("account-module")],g);var W=Object.defineProperty,J=Object.getOwnPropertyDescriptor,Q=(o,t,s,r)=>{for(var e=r>1?void 0:r?J(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&W(t,s,e),e};let b=class extends i{render(){return c`<section>Default Dashboard</section>`}};b.styles=l``;b=Q([u("dashboard-default")],b);var V=Object.defineProperty,X=Object.getOwnPropertyDescriptor,Y=(o,t,s,r)=>{for(var e=r>1?void 0:r?X(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&V(t,s,e),e};let w=class extends i{render(){return c`<section>Overview</section>`}};w.styles=l``;w=Y([u("overview-module")],w);var k=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,te=(o,t,s,r)=>{for(var e=r>1?void 0:r?ee(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&k(t,s,e),e};let O=class extends i{render(){return c`<main>
      <header>
        <span class="title">Dashboard</span>
        <nav>
          <a href="#/dashboard/overview">Overview</a>
          <a href="#/dashboard/account/">Account</a>
        </nav>
      </header>
      <section><slot></slot></section>
    </main> `}};O.styles=l`
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
  `;O=te([u("dashboard-module")],O);var re=Object.defineProperty,se=Object.getOwnPropertyDescriptor,ne=(o,t,s,r)=>{for(var e=r>1?void 0:r?se(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&re(t,s,e),e};let P=class extends i{render(){return c` <main>
      <header>App Base</header>
      <slot></slot>
    </main>`}};P.styles=l`
    header {
      height: 40px;
      background-color: navy;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;P=ne([u("app-module")],P);var oe=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,le=(o,t,s,r)=>{for(var e=r>1?void 0:r?ae(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&oe(t,s,e),e};let $=class extends i{render(){return c`
      <main>
        <aside>
          <a href="#/">Home</a>
          <a href="#/dashboard/">Dashboard</a>
          <a href="#/settings/">Settings</a>
        </aside>
        <section><slot></slot></section>
      </main>
    `}};$.styles=l`
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
  `;$=le([u("root-module")],$);var ie=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,ue=(o,t,s,r)=>{for(var e=r>1?void 0:r?ce(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&ie(t,s,e),e};let y=class extends i{render(){return c`Admin Settings`}};y.styles=l``;y=ue([u("admin-settings")],y);var de=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,fe=(o,t,s,r)=>{for(var e=r>1?void 0:r?pe(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&de(t,s,e),e};let D=class extends i{render(){return c`<section>Default Settings</section>`}};D.styles=l``;D=fe([u("settings-default")],D);var he=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,_e=(o,t,s,r)=>{for(var e=r>1?void 0:r?ve(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&he(t,s,e),e};let x=class extends i{render(){return c` <main>
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
  `;x=_e([u("settings-module")],x);var me=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,p=(o,t,s,r)=>{for(var e=r>1?void 0:r?ge(t,s):t,n=o.length-1,a;n>=0;n--)(a=o[n])&&(e=(r?a(t,s,e):a(e))||e);return r&&e&&me(t,s,e),e};let d=class extends i{constructor(){super(...arguments);this.hash="true",this.base="/",this.route=this.getCurrentRoute(),this.child=document.createElement("main"),this.components=new Map([["/404","unknown-route"],["/custom/not/nested/route","custom-route"],["/dashboard/account/:id","account-details"],["/dashboard/account/","account-info"],["/dashboard/account","account-module"],["/dashboard/","dashboard-default"],["/dashboard/overview","overview-module"],["/dashboard","dashboard-module"],["/","app-module"],["","root-module"],["/settings/admin","admin-settings"],["/settings/","settings-default"],["/settings","settings-module"]])}firstUpdated(){window.addEventListener("hashchange",()=>{this.route=this.getCurrentRoute(),this.updateTree()}),this.updateTree()}render(){return c` ${this.child} `}async updateTree(){for(;this.child.firstChild;)this.child.removeChild(this.child.firstChild);const o=await this.renderTree();this.child.appendChild(o),this.requestUpdate()}async renderTree(){let o=document.createElement("div"),t=this.route;const s=this.getArgsForRoute(t);if(t!=="/")for(;t.length>0;){o=this.getComponent(t,o,s);const r=t.split("/");if(r.pop(),t=r.join("/"),t==="/")break}else t==="/"?o=this.getComponent("/",o,s):o=this.getComponent("/404",o,s);return o=this.getComponent("",o,s),o}getComponent(o,t,s){const r=(e,n=!0)=>{const a=document.createElement(e);if(a.appendChild(t),n&&(s==null?void 0:s.groups))for(const[A,R]of Object.entries(s.groups))a.setAttribute(A,R);return a};for(const[e,n]of Array.from(this.components.entries())){if(e===o)return r(n,!1);if(o.match(C(e))!==null)return r(n)}return t}getArgsForRoute(o){for(const t of Array.from(this.components.keys())){const s=o.match(C(t));if(s!==null)return s}return null}getCurrentRoute(){var t;let o="/";if(this.hash==="true"&&window.location.hash.length>0)o=window.location.hash.slice(1);else{const s=(t=this.getAttribute("base"))!=null?t:"";o=window.location.pathname.slice(s.length)}return o==""&&(o="/"),console.debug(`current route: ${o}`),o}};d.styles=l`
    main {
      width: 100%;
      height: 100%;
    }
  `;p([f()],d.prototype,"hash",2);p([f()],d.prototype,"base",2);p([f()],d.prototype,"route",2);p([M()],d.prototype,"child",2);d=p([u("generated-app")],d);function C(o){const t="[a-zA-Z0-9_-]+",s=o.replace(new RegExp(`:(${t})`),r=>`(?<${r.slice(1)}>[a-zA-Z0-9_\\-.,:;+*^%$@!]+)`);return new RegExp(`^${s}$`)}
