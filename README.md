# postcss-important-startstop [![Build Status][ci-img]][ci]

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/psren/postcss-important-startstop.svg
[ci]:      https://travis-ci.org/psren/postcss-important-startstop

[PostCSS] plugin which adds !important based on simple start/stop annotations.
The scope of this plugin is very limited. It does only add ```!important``` to everty declaration between to annotations.

Nothing more.

## What it *not* does for you

It does not check **not** check if important is allowed for that particular declaration.
- Maybe use https://github.com/crimx/postcss-safe-important

It does **not** allow adding ```!important``` to just some declarations
- Maybe use https://yarnpkg.com/en/package/postcss-important

It does **not** remove the comments you had to add
- Use an other plugin for that

## Why should I use Important?

This plugin is useful for a Utility-based approach to CSS.
- https://css-tricks.com/when-using-important-is-the-right-choice/
- https://csswizardry.com/2016/05/the-importance-of-important/

You need some more Info about Utility-based CSS?
See these links. I can highly recommend the article by Adam.

- https://adamwathan.me/css-utility-classes-and-separation-of-concerns/
- http://davidtheclark.com/on-utility-classes/

## Examples

### Plain

#### Input
```css
/* @important(start) */
.john { display: block; }
/* @important(stop) */
```

#### Result
```css
.john { display: block !important; }
```

### With import

**highly recommended for Utilities**

```css
/* @important(start) */
@import "myutilities.css";
/* @important(stop) */
```

## Usage

```js
postcss([ require('postcss-important-startstop') ])
```

See [PostCSS] docs for examples for your environment.
