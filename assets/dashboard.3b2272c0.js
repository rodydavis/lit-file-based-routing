import{s as i,$ as c,r as l,n as p}from"./vendor.03706caa.js";import"./menu-button.fa75c998.js";var h=Object.defineProperty,u=Object.getOwnPropertyDescriptor,f=(d,r,t,a)=>{for(var e=a>1?void 0:a?u(r,t):r,n=d.length-1,o;n>=0;n--)(o=d[n])&&(e=(a?o(r,t,e):o(e))||e);return a&&e&&h(r,t,e),e};let s=class extends i{render(){return c`<main>
      <header>
        <menu-button></menu-button>
        <span class="title">Dashboard</span>
        <nav>
          <a href="#/dashboard/overview">Overview</a>
          <a href="#/dashboard/account/">Account</a>
        </nav>
      </header>
      <section><slot></slot></section>
    </main> `}};s.styles=l`
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
  `;s=f([p("dashboard-module")],s);export{s as DashboardModule};
