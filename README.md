# ⚛️ Protomodule | Instruments
**for browser based JavaScript applications**

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

*Protomodule* is a set of common practices which span from coding over CI/CD to production deployments. Every utility within Protomodule is able to provide core functionality as a standalone tool. All Protomodule utilities are interoperable to get the most out of your DevOps pipeline with minimum effort.

*Instruments* is the JavaScript module to integrate Protomodules principles into browser based applications.

**🚨 This library is under heavy development.** Be sure to check back for breaking changes in future releases.

## Quick start guide

Install *Protomodule | Instruments* by running:

```console
$ npm install --save @protomodule/instruments
```

## Features

### Type-safe environment variables

To access environment variables in a type-safe way create a singleton module with your specific environment schema:

`./config.ts`
```js
import { fromWeb, requiredStr } from "@protomodule/instruments"

export const config = fromWeb({
  REACT_APP_API_URL: requiredStr(),
})
```

In any other part of your application when you need to access an environment variable use:

```js
import { config } from "./config.ts"

console.log(config.REACT_APP_API_URL)
```

In addition to providing a typed configuration object *Protomodule | Instruments* also check the variables at runtime and will show an alert and ultimatly throw an error when trying to access an invalid configuration.

### 🖥  Setting environment variables locally

During development this is meant to be used in conjunction with `react-script`. Therefore you have direct access to your local environment variables.

### 🌍  Setting environment variables in production

This library follows the *Protomodule* practice of loading environment variables into `window.env` in the browser.

This can be achieved by adding a snippet to your HTML's head section:

```html
<!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="utf-8" />
      <script src="%PUBLIC_URL%/env.js"></script>
 ...
```

`env.js` file should serve to following content:
```js
window.env = {
  REACT_APP_API_URL: "https://...",
};
```

If you use the *Protomodule* related build tools, this file may be generated automatically when configured.

## Credits

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file.

> This project is in no way affiliated with Apple Inc or Google Inc. This project is open source under the MIT license, which means you have full access to the source code and can modify it to fit your own needs.

[npm-downloads-image]: https://badgen.net/npm/dm/@protomodule/instruments
[npm-downloads-url]: https://npmcharts.com/compare/@protomodule/instruments?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/@protomodule/instruments
[npm-install-size-url]: https://packagephobia.com/result?p=@protomodule/instruments
[npm-url]: https://npmjs.org/package/@protomodule/instruments
[npm-version-image]: https://badgen.net/npm/v/@protomodule/instruments
