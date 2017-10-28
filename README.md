# PostCSS Important Startstop [![Build Status][ci-img]][ci]

[PostCSS] plugin which adds !important based on simple start/stop annotations.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/psren/postcss-important-startstop.svg
[ci]:      https://travis-ci.org/psren/postcss-important-startstop

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-important-startstop') ])
```

See [PostCSS] docs for examples for your environment.
