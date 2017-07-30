
var parsers = require('./parsers');

var context = {};

function makeBinaryOperator(bytecode) {
	return function (exprs, context) {
		var result = '';
		
		result = exprs[0].compile(context);
		result += exprs[1].compile(context);
		result += bytecode;
		
		for (var k = 2; k < exprs.length; k++)
			result += exprs[k].compile(context) + bytecode;
		
		return result;
	};
};

context['+'] = makeBinaryOperator('01');
context['*'] = makeBinaryOperator('02');

function compile(text) {
	return parsers.parser(text).parse().compile(context);
}

module.exports = {
	compile: compile
};

