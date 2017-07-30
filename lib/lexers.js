
var TokenType = { Name: 1, Integer: 2 };

function Lexer(text) {
	var l = text.length;
	var p = 0;
	
	this.nextToken = function () {
		while (p < l && isWhiteSpace(text[p]))
			p++;
		
		if (p >= l)
			return null;
		
		var value = '';
		
		while (p < l && !isWhiteSpace(text[p]))
			value += text[p++];
			
		return { type: TokenType.Name, value: value };
	}
	
	function isWhiteSpace(ch) {
		return ch <= ' ';
	}
}

function createLexer(text) {
	return new Lexer(text);
}

module.exports = {
	lexer: createLexer,
	TokenType: TokenType
};