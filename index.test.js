const fs = require('fs');
const postcss = require('postcss');
const plugin = require('./');

function equals(input, output, expectedWarnings = 0) {
    return postcss()
        .use(plugin())
        .process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(expectedWarnings);
        });
}

function expectWarning(input, output) {
    return equals(input, output, 1);
}

it('must have the same amount of start tags and end tags', () => {
    return expectWarning('/* @important(start) */', '');
});

it('add important to all declarations between annotations', () => {
    let given = fs.readFileSync('test/given.css', 'utf-8');
    let expected = fs.readFileSync('test/expected.css', 'utf-8');

    return equals(given, expected);
});
