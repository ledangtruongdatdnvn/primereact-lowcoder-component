/** @type {import('prettier').Config} */
const config = {
  printWidth: 120, // max 120 chars in line, code is easy to read
  tabWidth: 2, // "visual width" of of the "tab"
  trailingComma: 'es5', // add trailing commas in objects, arrays, etc.
  semi: true, // add ; when needed
  singleQuote: true, // '' for stings instead of ""
  bracketSpacing: true, // import { some } ... instead of import {some} ...
  arrowParens: 'always', // braces even for single param in arrow functions (a) => { }
  jsxSingleQuote: false, // "" for react props, like in html
  bracketSameLine: false, // pretty JSX
  endOfLine: 'lf', // 'lf' for linux, 'crlf' for windows, we need to use 'lf' for git
};

export default config;
