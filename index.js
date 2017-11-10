const postcss = require('postcss');

const isStartTag = node => node.type === 'comment' && node.toString().includes('@important(start)');
const isStopTag = node => node.type === 'comment' && node.toString().includes('@important(stop)');

module.exports = postcss.plugin('postcss-important-startstop', function (exclude = {}) {

	exclude.decls = (exclude.decls || []).concat([
		'animation',
		'animation-name',
		'animation-duration',
		'animation-timing-function',
		'animation-delay',
		'animation-iteration-count',
		'animation-direction',
		'animation-fill-mode',
		'animation-play-state'
	]);

	exclude.atrules = (exclude.atrules || []).concat([
		'keyframes', 'font-face'
	]);

	const excludeAtRules = new Set(exclude.atrules);
	const excludeDecls = new Set(exclude.decls);

	// Work with options here
	return (root, result) => {
		let amountOfStartTags = 0;
		let amountOfStopTags = 0;

		const stripPrefix = name => name.replace(/^(-\w+?-)/i, '');

		root.walk(node => {

			if (isStartTag(node)) {
				amountOfStartTags += 1;
				node.remove();
			}

			if (isStopTag(node)) {
				amountOfStopTags += 1;
				node.remove();
			}

			if (node.type === 'decl' && excludeDecls.has(stripPrefix(node.prop))) {
				return;
			}

			if (node.type === 'decl' && node.parent.type === 'atrule' && excludeAtRules.has(node.parent.name)) {
				return;
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
