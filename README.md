# Lit File Based Routing

Lit router for nested layouts and file based routing.

[Demo](https://rodydavis.github.io/lit-file-based-routing/)

[Package](/lit-file-router/)

## Features

- File based routing
- Nested layout

## Defining a root layout

To layout navigation once you will want to define a root layout that all pages can inherit from.

```js
import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("root-module")
export class RootModule extends LitElement {
  static styles = css`
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
  `;

  render() {
    return html`
      <main>
        <aside>
          <a href="#/">Home</a>
          <a href="#/dashboard/">Dashboard</a>
          <a href="#/settings/">Settings</a>
        </aside>
        <section><slot></slot></section>
      </main>
    `;
  }
}

```

## Defining a base layout

You can define a base layout with the root name. For example: `dashboard.ts`

```ts
import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dashboard-module")
export class DashboardModule extends LitElement {
  static styles = css`
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
  `;

  render() {
    return html`<main>
      <header>
        <span class="title">Dashboard</span>
        <nav>
          <a href="#/dashboard/overview">Overview</a>
          <a href="#/dashboard/account/">Account</a>
        </nav>
      </header>
      <section><slot></slot></section>
    </main> `;
  }
}

```

If you notice the `<slot>` is used for the nested layout. 

## Defining the index route

You can define the index route for when there are no args needed. For example: `dashboard/index.ts`

```ts
import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dashboard-default")
export class DashboardDefault extends LitElement {
  static styles = css``;

  render() {
    return html`<section>Default Dashboard</section>`;
  }
}

```

Since this is a nested layout all you need to do is provide the component and it will inherit from the parent layout (dashboard.ts).

## Defining a named arg

You can define a named arg for a route if there is something that does not need data fetched for. For example: `/dashboard/overview.ts`

```ts
import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("overview-module")
export class OverviewModule extends LitElement {
  static styles = css``;

  render() {
    return html`<section>Overview</section>`;
  }
}

```

This is also just a component.

## Defining a dynamic arg

Sometimes the arg is generated at runtime or needs to be pulled from a database. For example: `dashboard/account/:id.ts`

```ts
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("account-details")
export class AccountDetails extends LitElement {
  static styles = css``;

  @property({ type: String }) id = "";

  render() {
    return html`<section>User ID: ${this.id}</section>`;
  }
}

```

You can see we set the file name with a prefix of `:` to define an arg to look for and match against. This will be provided in a map.
