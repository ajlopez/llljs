
var utils = require('./utils');
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
context['-'] = makeBinaryOperator('03');
context['/'] = makeBinaryOperator('04');

context.seq = function (exprs, context) {
	var result = '';
	
	for (var k = 0; k < exprs.length; k++)
		result += exprs[k].compile(context);
	
	return result;
};

context.if = function (exprs, context) {
	var result = '';
	
	result = exprs[0].compile(context);
	result += '15';
	
	var thenbody = exprs[1].compile(context);
	var elseoffset = result.length / 2 + thenbody.length / 2 + 4;
	
	var hexjump = utils.toHex(elseoffset);
	
	if (hexjump.length < 4)
		hexjump = '00' + hexjump;
	
	result += '61' + hexjump + '57';
	result += thenbody;
	result += '5b';
	
	return result;
};

function compile(text) {
	return parsers.parser(text).parse().compile(context);
}

module.exports = {
	compile: compile
};

