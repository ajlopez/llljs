
var lexers = require('../lib/lexers');
var TokenType = lexers.TokenType;

exports['get name'] = function (test) {
	var lexer = lexers.lexer('foo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
};

exports['get name skip comment'] = function (test) {
	var lexer = lexers.lexer('; this is a comment\nfoo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
};

exports['get name skip comment with carriage return'] = function (test) {
	var lexer = lexers.lexer('; this is a comment\rfoo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
};

exports['get two names'] = function (test) {
	var lexer = lexers.lexer('foo bar');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'bar');
	
	test.equal(lexer.nextToken(), null);
};

exports['get name with spaces'] = function (test) {
	var lexer = lexers.lexer('  foo   ');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
};

exports['get integer'] = function (test) {
	var lexer = lexers.lexer('42');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Integer);
	test.equal(result.value, '42');
	
	test.equal(lexer.nextToken(), null);
};

exports['get integer with spaces'] = function (test) {
	var lexer = lexers.lexer('  42\n\r\t ');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Integer);
	test.equal(result.value, '42');
	
	test.equal(lexer.nextToken(), null);
};

exports['get string'] = function (test) {
	var lexer = lexers.lexer('"foo"');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.String);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
};

exports['get symbols'] = function (test) {
	var lexer = lexers.lexer("'+-*/");
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Symbol);
	test.equal(result.value, "'");
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Symbol);
	test.equal(result.value, '+');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Symbol);
	test.equal(result.value, '-');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Symbol);
	test.equal(result.value, '*');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Symbol);
	test.equal(result.value, "/");
	
	test.equal(lexer.nextToken(), null);
};

exports['get delimiters'] = function (test) {
	var lexer = lexers.lexer("()[]{}");
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '(');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, ')');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '[');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, ']');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '{');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '}');
	
	test.equal(lexer.nextToken(), null);
};
