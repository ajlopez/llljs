
var parsers = require('./parsers');

function compile(text) {
	return parsers.parser(text).parse().compile();
}

module.exports = {
	compile: compile
};

