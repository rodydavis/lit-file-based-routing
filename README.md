[![Demo](https://github.com/rodydavis/lit-file-based-routing/actions/workflows/ci.yml/badge.svg)](https://github.com/rodydavis/lit-file-based-routing/actions/workflows/ci.yml)

# Lit File Based Routing

Lit router for nested layouts and file based routing. Similar to https://remix.run/ but at client side.

[Demo](https://rodydavis.github.io/lit-file-based-routing/#/dashboard/)

[Package](/lit-file-router/)

Archived in favor of: https://github.com/rodydavis/vscode-router-generator

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

## Usage

If you install the package locally you can run `node lit-file-router` to have `src/generated-app.ts` added as a file when it analyzes the `src/pages/` directory.

```html
<body>
    <generated-app> </generated-app>
    <script type="module" src="/src/generated-app.ts"></script>
</body>
```

### Dynamic Imports

You can have the components load async with dynamic imports using the following command:

`node lit-file-router --dynamic-imports=true`

By default it will use static imports and have everything loaded at runtime.

### Data caching and loader function

You can export a loader function that will be used to set data on the component:

```js
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export async function loader(
  route: string,
  args: { [key: string]: any }
): Promise<AccountData> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const id = args["id"]!;
  return {
    id,
    name: "Name: " + id,
    email: route,
  };
}

@customElement("account-details")
export class AccountDetails extends LitElement {
  static styles = css``;

  @property({ type: String }) id = "";
  @property({ type: Object }) data!: AccountData;

  render() {
    return html`<section>User ID: ${this.data.id}</section>`;
  }
}

interface AccountData {
  id: string;
  name: string;
  email: string;
}

```

This will call the function to load the data before rendering starts.

If you want to enable caching you can add the following command:

`node lit-file-router --cache-all`

It is off by default but it will cache the data from the loader function for the component and route and will pass the cached data from memory to the component.

## Loading state

You can pass show a progress indicator at the bottom by passing a loading arg:

`node lit-file-router --show-loading=true`

It is off by default, but this is useful for heavy requests that would hang the UI.
