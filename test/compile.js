
var lll = require('..');

exports['compile integer as push'] = function (test) {
	var result = lll.compile('42');
	
	test.equal(result, '602a');
};

exports['compile integer as push with two bytes'] = function (test) {
	var result = lll.compile('256');
	
	test.equal(result, '610100');
};

