const postcss = require('postcss');

function isStartTag(node) {
    if (node.type !== 'comment') {
        return false;
    }
    return node.toString().includes('@important(start)');
}

function isStopTag(node) {
    if (node.type !== 'comment') {
        return false;
    }
    return node.toString().includes('@important(stop)');
}

module.exports = postcss.plugin('postcss-important-startstop', function () {

    // Work with options here
    return function (root, result) {
        let amountOfStartTags = 0;
        let amountOfStopTags = 0;

        root.walk(node => {
            if (isStartTag(node)) {
                amountOfStartTags += 1;
            }

            if (isStopTag(node)) {
                amountOfStopTags += 1;
            }

            if (amountOfStartTags > amountOfStopTags && node.type === 'decl') {
                // important should be added to this declaration
                node.important = true;
            }
        });

        if (amountOfStartTags !== amountOfStopTags) {
            result.warn(
                '@important(start) must be closed with a @important(stop).' +
                'The amount of start and stop tags must be the same.' +
                'Given @important(start) tags: ' + amountOfStartTags +
                'Given @important(stop) tags: ' + amountOfStopTags
            );
        }
    };
});
