
var TokenType = { Name: 1 };

function Lexer(text) {
	var l = text.length;
	var p = 0;
	
	this.nextToken = function () {
		if (p >= l)
			return null;
			
		p = l;
			
		return { type: TokenType.Name, value: text };
	}
}

function createLexer(text) {
	return new Lexer(text);
}

module.exports = {
	lexer: createLexer,
	TokenType: TokenType
};