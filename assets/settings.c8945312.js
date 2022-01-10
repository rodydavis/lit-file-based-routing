import{s as i,$ as p,r as c,n as d}from"./vendor.03706caa.js";import"./menu-button.fa75c998.js";var u=Object.defineProperty,f=Object.getOwnPropertyDescriptor,m=(a,t,r,n)=>{for(var e=n>1?void 0:n?f(t,r):t,s=a.length-1,o;s>=0;s--)(o=a[s])&&(e=(n?o(t,r,e):o(e))||e);return n&&e&&u(t,r,e),e};let l=class extends i{render(){return p` <main>
      <header>
        <menu-button></menu-button>
        <span class="title">Settings</span>
        <div></div>
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
      justify-content: space-between;
    }
  `;l=m([d("settings-module")],l);export{l as SettingsModule};
