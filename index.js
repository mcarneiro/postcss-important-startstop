const postcss = require('postcss');
const _ = require('lodash');

module.exports = postcss.plugin('postcss-important-startstop', function () {
    return function (root) {
        root.walkAtRules('important', atRule => {
            atRule.walkDecls(decl => {
                decl.important = true;
            });

            let clonedNodes = _.map(atRule.nodes, node => node.clone());

            atRule.before(clonedNodes);
            atRule.remove();
        });
    };
});
