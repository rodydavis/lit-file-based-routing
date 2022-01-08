import{s as i,$ as d,r as p,n as c}from"./vendor.03706caa.js";var f=Object.defineProperty,g=Object.getOwnPropertyDescriptor,h=(a,r,s,t)=>{for(var e=t>1?void 0:t?g(r,s):r,l=a.length-1,n;l>=0;l--)(n=a[l])&&(e=(t?n(r,s,e):n(e))||e);return t&&e&&f(r,s,e),e};let o=class extends i{render(){return d` <main>
      <header>Settings</header>
      <slot></slot>
    </main>`}};o.styles=p`
    header {
      height: 40px;
      background-color: black;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;o=h([c("settings-module")],o);export{o as SettingsModule};
