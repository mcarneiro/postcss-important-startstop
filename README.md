# postcss-important-startstop [![Build Status][ci-img]][ci]

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/psren/postcss-important-startstop.svg
[ci]:      https://travis-ci.org/psren/postcss-important-startstop

[PostCSS] plugin which adds !important based on an atRule

_There's an `annotation` branch with comment implementation version, useful for projects using SASS._

## Why should I use Important?

This plugin is useful for a Utility-based approach to CSS.
- https://css-tricks.com/when-using-important-is-the-right-choice/
- https://csswizardry.com/2016/05/the-importance-of-important/

You need some more Info about Utility-based CSS?
See these links. I can highly recommend the article by Adam.

- https://adamwathan.me/css-utility-classes-and-separation-of-concerns/
- http://davidtheclark.com/on-utility-classes/

## Examples

Input
```css
.a { color: red; }

@important {
    .b { color: red; }
}

.c {
    @important {
      color: red;
    }
    background-color: green;
}
```