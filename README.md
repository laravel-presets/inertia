<p align="center">
  <h1 align="center">Laravel Inertia</h1>
  <p align="center">
    <a href="https://github.com/use-preset/use-preset/releases">
      <img alt="npx use-preset laravel-inertia" src="https://img.shields.io/badge/use--preset-laravel--inertia-blue?style=flat-square">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/package/use-preset">
      <img alt="use-preset version" src="https://img.shields.io/npm/v/use-preset?color=32c854&style=flat-square&label=use-preset">
    </a>
  </p>
  <br />
  <p align="center">
    <code>use-preset</code> is a scaffolding tool for developers. <a href="https://docs.usepreset.dev/">Read the documentation</a> for more information.
  </p>
  <br />
  <pre align="center">npx use-preset laravel-inertia</pre>
  &nbsp;
<p>

# About

This Laravel preset scaffolds an application using the **LIT** stack, jumpstarting your application's development. If you are not familiar with the name, it is an acronym that describes the main technologies involved in the stack:

| [Laravel](https://laravel.com/) | [Inertia](https://inertiajs.com) | [Tailwind CSS](https://tailwindcss.com/) |
| ------------------------------- | -------------------------------- | ---------------------------------------- |
| PHP framework                   | Modern monolith                  | Utility-first CSS framework              |

The **LIT** stack becomes the **VITL** stack if [Vue](https://vuejs.org) is added, or the **LITR** stack with [React](https://reactjs.org) instead.

# Installation

This preset is intended to be installed into a fresh Laravel application. Follow the [Laravel installation instructions](https://laravel.com/docs/7.x/installation) to ensure you have a working environment before continuing.

**Then, run the following command**:

```bash
npx use-preset laravel-inertia --vue
```

> Currently, only the VITL stack is available. If you don't want to use Vue, use the `--no-vue` flag instead.

# Code-splitting

Code-splitting should be enabled if you have a large application. When code-splitting is used, it requires that the user download new assets as they navigate from one page to the next, which adds latency. When it is not, the first page load may take longer. This is a trade-off.

To enable code-splitting, uncomment the line in your `app.js` that makes `resolveComponent` use `import`, and remove the previous line. For more information, check out the [instructions](https://inertiajs.com/client-side-setup#code-splitting) on the Inertia documentation.

# To-do

- Add a React scaffolding
- Add an authentication scaffolding with tests
