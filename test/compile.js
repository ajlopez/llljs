
var lll = require('..');

exports['compile integer as push'] = function (test) {
	var result = lll.compile('42');
	
	test.equal(result, '602a');
};

exports['compile integer as push with two bytes'] = function (test) {
	var result = lll.compile('256');
	
	test.equal(result, '610100');
};

exports['compile binary and two integers'] = function (test) {
	var result = lll.compile('(& 1 42)');
	
	test.equal(result, '6001602a16');
};

exports['compile binary and three integers'] = function (test) {
	var result = lll.compile('(& 1 2 3)');
	
	test.equal(result, '6001600216600316');
};

exports['compile binary or two integers'] = function (test) {
	var result = lll.compile('(| 1 42)');
	
	test.equal(result, '6001602a17');
};

exports['compile binary or three integers'] = function (test) {
var result = lll.compile('(| 1 2 3)');
	
	test.equal(result, '6001600217600317');
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

exports['compile nested arithmetic expressions'] = function (test) {
	var result = lll.compile('(+ (* 21 2) (- 12 2))');
	
	test.equal(result, '6015600202600c60020301');
};

exports['compile seq of integers'] = function (test) {
	var result = lll.compile('(seq 1 2 3)');
	
	test.equal(result, '600160026003');
};

exports['compile when'] = function (test) {
	var result = lll.compile('(when 1 (+ 3 4))');
	
	test.equal(result, '60011561000c5760036004015b');
};

exports['compile if with then and else'] = function (test) {
	var result = lll.compile('(if 1 (+ 3 4) (+ 5 6)');
	
	test.equal(result, '600115610010576003600401610016565b60056006015b');
};

exports['compile unless'] = function (test) {
	var result = lll.compile('(unless 1 (+ 3 4))');
	
	test.equal(result, '60011561000b57610011565b60036004015b');
};

