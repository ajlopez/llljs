
var lll = require('..');

exports['compile integer as push'] = function (test) {
	var result = lll.compile('42');
	
	test.equal(result, '602a');
};

