const fs = require('fs');
const postcss = require('postcss');

const plugin = require('./');

function equals(input, output, opts = {}, expectedWarnings = 0) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(expectedWarnings);
        });
}

function expectWarning(input, opts = {}) {
    return equals(input, input, opts, 1);
}

it('must have the same amount of start tags and end tags', () => {
    expectWarning('/* @important(start) */');
});

it('add important to all declaration between annotations', () => {
    let given = fs.readFileSync('test/given.css', 'utf-8');
    let expected = fs.readFileSync('test/expected.css', 'utf-8');

    return equals(given, expected, {});
});
