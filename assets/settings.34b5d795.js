import{s as i,$ as p,r as c,n as u}from"./vendor.03706caa.js";import"./menu-button.fa75c998.js";var d=Object.defineProperty,f=Object.getOwnPropertyDescriptor,m=(a,t,n,r)=>{for(var e=r>1?void 0:r?f(t,n):t,s=a.length-1,o;s>=0;s--)(o=a[s])&&(e=(r?o(t,n,e):o(e))||e);return r&&e&&d(t,n,e),e};let l=class extends i{render(){return p` <main>
      <header>
        <menu-button></menu-button>
        <span class="title">Settings</span>
      </header>
      <slot></slot>
    </main>`}};l.styles=c`
    header {
      height: 40px;
      background-color: black;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;l=m([u("settings-module")],l);export{l as SettingsModule};
