
var lexers = require('./lexers');
var TokenType = lexers.TokenType;

function toHex(value) {
	var hex = value.toString(16);
	
	if (hex.length % 2)
		hex = '0' + hex;
		
	return hex;
}

function IntegerExpression(value) {
	this.toString = function () { return value.toString(); };
	this.compile = function () { return toHex(value); };
}

function Parser(text) {
	var lexer = lexers.lexer(text);
	
	this.parse = function () {
		var token = lexer.nextToken();
		
		if (token && token.type == TokenType.Integer)
			return new IntegerExpression(parseInt(token.value));
	};
}

function createParser(text) {
	return new Parser(text);
}

module.exports = {
	parser: createParser
};

