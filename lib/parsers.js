
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
	this.toHex = function () { return toHex(value); };
	this.compile = function () {
		return '60' + this.toHex();
	}
}

function StringExpression(value) {
	this.toString = function () { return JSON.stringify(value); };
}

function AtomExpression(name) {
	this.toString = function () { return name; };
}

function ListExpression(exprs) {
	this.toString = function () { 
		var result = '(';
		
		exprs.forEach(function (expr) {
			if (result.length > 1)
				result += " ";
			
			result += expr.toString();
		});
		
		return result += ')';
	};
}

function Parser(text) {
	var lexer = lexers.lexer(text);
	var self = this;
	
	this.parse = function () {
		var token = lexer.nextToken();
		
		if (!token)
			return null;
		
		if (token.type === TokenType.Integer)
			return new IntegerExpression(parseInt(token.value));
		
		if (token.type === TokenType.String)
			return new StringExpression(token.value);
		
		if (token.type === TokenType.Name)
			return new AtomExpression(token.value);
		
		if (token.type === TokenType.Delimiter && token.value === '(')
			return new ListExpression(parseList());
	};
	
	function parseList() {
		var exprs = [];
		
		var token = lexer.nextToken();
		
		while (token && (token.type !== TokenType.Delimiter || token.value !== ')')) {
			lexer.pushToken(token);
			exprs.push(self.parse());
			token = lexer.nextToken();
		}
		
		return exprs;
	}
}

function createParser(text) {
	return new Parser(text);
}

module.exports = {
	parser: createParser
};


