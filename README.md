Apple Note JXA
===================

Simple module to read, edit, and manage Apple Notes throught JXA (offline)

## Using this module in other modules

Here is a quick example of how this module can be used in other modules. The [TypeScript Module Resolution Logic](https://www.typescriptlang.org/docs/handbook/module-resolution.html) makes it quite easy. The file `src/index.ts` acts as an aggregator of all the functionality in this module. It imports from other files and re-exports to provide a unified interface for this module. The _package.json_ file contains `main` attribute that points to the generated `lib/index.js` file and `typings` attribute that points to the generated `lib/index.d.ts` file.



- To use in TypeScript file -

```ts
import * as Notes from "apple-notes-jxa";

Notes.accounts()
  .then((accounts) => console.log(accounts));
```

- To use in a JavaScript file -

```js
const Notes = require('apple-notes-jxa');

Notes.accounts()
  .then((accounts) => console.log(accounts));
```
