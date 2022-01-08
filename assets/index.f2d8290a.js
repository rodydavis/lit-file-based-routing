import{s as n,$ as d,r as i,n as c}from"./vendor.03706caa.js";var f=Object.defineProperty,v=Object.getOwnPropertyDescriptor,h=(t,r,o,l)=>{for(var e=l>1?void 0:l?v(r,o):r,p=t.length-1,a;p>=0;p--)(a=t[p])&&(e=(l?a(r,o,e):a(e))||e);return l&&e&&f(r,o,e),e};let s=class extends n{render(){return d` <main>
      <header>App Base</header>
      <slot></slot>
    </main>`}};s.styles=i`
    header {
      height: 40px;
      background-color: navy;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;s=h([c("app-module")],s);export{s as AppModule};
