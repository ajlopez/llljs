
var utils = require('./utils');
var parsers = require('./parsers');

var context = {};

function makeBinaryOperator(bytecode) {
	return function (exprs, context, offset) {
		var result = '';
		
		result = exprs[0].compile(context, offset);
		result += exprs[1].compile(context, offset + result.length / 2);
		result += bytecode;
		
		for (var k = 2; k < exprs.length; k++)
			result += exprs[k].compile(context, offset + result.length / 2) + bytecode;
		
		return result;
	};
};

context['+'] = makeBinaryOperator('01');
context['*'] = makeBinaryOperator('02');
context['-'] = makeBinaryOperator('03');
context['/'] = makeBinaryOperator('04');

context['='] = makeBinaryOperator('14');
context['!='] = makeBinaryOperator('1415');
context['&'] = makeBinaryOperator('16');
context['|'] = makeBinaryOperator('17');
context['^'] = makeBinaryOperator('18');

context.seq = function (exprs, context, offset) {
	var result = '';
	
	for (var k = 0; k < exprs.length; k++)
		result += exprs[k].compile(context, offset + result.length / 2);
	
	return result;
};

function compileConditionalJump(newoffset) {
	var hexjump = utils.toHex(newoffset);
	
	if (hexjump.length < 4)
		return '60' + hexjump + '57';
	else
		return '61' + hexjump + '57';
}

context.when = function (exprs, context, offset) {
	var result = '';
	
	result = exprs[0].compile(context, offset);
	result += '15';
	
	offset += result.length / 2;
	
	var body = exprs[1].compile(context, offset);
	var endoffset = offset + 2 + 1 + body.length / 2;
    
	if (endoffset >= 256)
		endoffset += 2;
	
	result += compileConditionalJump(endoffset);	
	result += body;
	result += '5b';
	
	return result;
};

context.unless = function (exprs, context, offset) {
	var result = '';
	
	result = exprs[0].compile(context, offset);
	
	offset += result.length / 2;
	
	var body = exprs[1].compile(context, offset);
	var endoffset = offset + 2 + 1 + body.length / 2;
    
	if (endoffset >= 256)
		endoffset += 2;
	
	result += compileConditionalJump(endoffset);	
	result += body;
	result += '5b';
	
	return result;
};

context.if = function (exprs, context, offset) {
	var result = '';
	
	result = exprs[0].compile(context, offset + result.length / 2);
	result += '15';
	
	var thenbody = exprs[1].compile(context, offset + result.length / 2);
	var elseoffset = offset + result.length / 2 + 4 + thenbody.length / 2 + 4;
    
	var hexjump = utils.toHex(elseoffset);
	
	if (hexjump.length < 4)
		hexjump = '00' + hexjump;
	
	result += '61' + hexjump + '57';
	result += thenbody;

    var elsebody = exprs[2].compile(context, elseoffset);
    var thenoffset = offset + result.length / 2 + 5 + elsebody.length / 2;

    var hexjump = utils.toHex(thenoffset);

    if (hexjump.length < 4)
        hexjump = '00' + hexjump;
    
    result += '61' + hexjump + '565b';
    result += elsebody;
	
	result += '5b';
	
	return result;
};

function compile(text) {
	return parsers.parser(text).parse().compile(context, 0);
}

module.exports = {
	compile: compile
};

