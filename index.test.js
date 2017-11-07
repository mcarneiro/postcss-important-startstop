const postcss = require('postcss');
const plugin = require('./');

function run(input) {
    return postcss()
        .use(plugin())
        .process(input);
}

it('adds important to all declarations between annotations', () => {
    const input = `
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
    `;

    const expected = `
      .a { color: red; }
      .b { color: red !important; }
      .c {
          color: red !important;
        background-color: green;
      }
    `;

    return run(input)
        .then(result => {
            expect(result.css).toBe(expected);
            expect(result.warnings().length).toBe(0);
        });
});
