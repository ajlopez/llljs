
var lll = require('..');

exports['compile integer as push'] = function (test) {
	var result = lll.compile('42');
	
	test.equal(result, '602a');
};

exports['compile integer as push with two bytes'] = function (test) {
	var result = lll.compile('256');
	
	test.equal(result, '610100');
};

exports['compile add two integers'] = function (test) {
	var result = lll.compile('(+ 1 42)');
	
	test.equal(result, '6001602a01');
};

exports['compile add three integers'] = function (test) {
	var result = lll.compile('(+ 1 2 3)');
	
	test.equal(result, '6001600201600301');
};

exports['compile multiply two integers'] = function (test) {
	var result = lll.compile('(* 1 42)');
	
	test.equal(result, '6001602a02');
};

exports['compile multiply three integers'] = function (test) {
	var result = lll.compile('(* 1 2 3)');
	
	test.equal(result, '6001600202600302');
};

exports['compile subtract two integers'] = function (test) {
	var result = lll.compile('(- 1 42)');
	
	test.equal(result, '6001602a03');
};

exports['compile subtract three integers'] = function (test) {
	var result = lll.compile('(- 1 2 3)');
	
	test.equal(result, '6001600203600303');
};

exports['compile divide two integers'] = function (test) {
	var result = lll.compile('(/ 42 2)');
	
	test.equal(result, '602a600204');
};

exports['compile subtract three integers'] = function (test) {
	var result = lll.compile('(/ 42 2 7)');
	
	test.equal(result, '602a600204600704');
};
