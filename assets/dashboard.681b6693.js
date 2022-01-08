import{s as i,$ as l,r as c,n as p}from"./vendor.03706caa.js";var h=Object.defineProperty,v=Object.getOwnPropertyDescriptor,f=(d,r,o,a)=>{for(var e=a>1?void 0:a?v(r,o):r,s=d.length-1,n;s>=0;s--)(n=d[s])&&(e=(a?n(r,o,e):n(e))||e);return a&&e&&h(r,o,e),e};let t=class extends i{render(){return l`<main>
      <header>
        <span class="title">Dashboard</span>
        <nav>
          <a href="#/dashboard/overview">Overview</a>
          <a href="#/dashboard/account/">Account</a>
        </nav>
      </header>
      <section><slot></slot></section>
    </main> `}};t.styles=c`
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
  `;t=f([p("dashboard-module")],t);export{t as DashboardModule};
