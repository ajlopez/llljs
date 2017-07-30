
var parsers = require('../lib/parsers');

exports['parse integer'] = function (test) {
	var parser = parsers.parser('42');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), '42');
	test.equal(expr.toHex(), '2a');
	
	test.equal(parser.parse(), null);
};

exports['parse one digit integer'] = function (test) {
	var parser = parsers.parser('3');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), '3');
	test.equal(expr.toHex(), '03');
	
	test.equal(parser.parse(), null);
};

exports['parse name as atom'] = function (test) {
	var parser = parsers.parser('foo');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), 'foo');
	
	test.equal(parser.parse(), null);
};

exports['parse symbol as atom'] = function (test) {
	var parser = parsers.parser('&&');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), '&&');
	
	test.equal(parser.parse(), null);
};

exports['parse string'] = function (test) {
	var parser = parsers.parser('"foo"');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), '"foo"');
	
	test.equal(parser.parse(), null);
};

exports['parse list'] = function (test) {
	var parser = parsers.parser('(add 1 2)');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), '(add 1 2)');
	
	test.equal(parser.parse(), null);
};
