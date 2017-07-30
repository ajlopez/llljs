
var parsers = require('./parsers');

var context = {};

context['+'] = function (exprs, context) {
	var result = '';
	
	result = exprs[0].compile(context);
	result += exprs[1].compile(context);
	result += '01';
	
	for (var k = 2; k < exprs.length; k++)
		result += exprs[k].compile(context) + '01';
	
	return result;
};

function compile(text) {
	return parsers.parser(text).parse().compile(context);
}

module.exports = {
	compile: compile
};

