import{s as l,$ as d,r as f,n as c}from"./vendor.03706caa.js";var h=Object.defineProperty,p=Object.getOwnPropertyDescriptor,m=(n,r,s,o)=>{for(var e=o>1?void 0:o?p(r,s):r,a=n.length-1,t;a>=0;a--)(t=n[a])&&(e=(o?t(r,s,e):t(e))||e);return o&&e&&h(r,s,e),e};let i=class extends l{render(){return d`
      <main>
        <aside>
          <a href="#/">Home</a>
          <a href="#/dashboard">Dashboard</a>
          <a href="#/settings">Settings</a>
        </aside>
        <section><slot></slot></section>
      </main>
    `}};i.styles=f`
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
  `;i=m([c("root-module")],i);export{i as RootModule};
