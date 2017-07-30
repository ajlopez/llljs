
var parsers = require('../lib/parsers');

exports['parse integer'] = function (test) {
	var parser = parsers.parser('42');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), '42');
	test.equal(expr.compile(), '2a');
	
	test.equal(parser.parse(), null);
};

exports['parse one digit integer'] = function (test) {
	var parser = parsers.parser('3');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), '3');
	test.equal(expr.compile(), '03');
	
	test.equal(parser.parse(), null);
};

exports['parse atom'] = function (test) {
	var parser = parsers.parser('foo');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.toString(), 'foo');
	
	test.equal(parser.parse(), null);
};

