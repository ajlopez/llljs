
var TokenType = { Name: 1, Integer: 2, String: 3 };

function Lexer(text) {
	var l = text.length;
	var p = 0;
	
	this.nextToken = function () {
		while (p < l && isWhiteSpace(text[p]))
			p++;
		
		if (p >= l)
			return null;
		
		var ch = text[p];
		
		if (ch === '"')
			return nextString();
		
		if (isDigit(ch))
			return nextInteger(ch);
		
		if (isLetter(ch))
			return nextName(ch);
	}
	
	function nextInteger(ch) {
		var value = ch;
		p++;
		
		while (p < l && isDigit(text[p]))
			value += text[p++];
		
		return { type: TokenType.Integer, value: value }
	}
	
	function nextString(ch) {
		var value = '';
		p++;
		
		while (p < l && text[p] != '"')
			value += text[p++];
		
		p++;
		
		return { type: TokenType.String, value: value }
	}
	
	function nextName(ch) {
		var value = ch;
		p++;
		
		while (p < l && !isWhiteSpace(text[p]))
			value += text[p++];
			
		return { type: TokenType.Name, value: value };
	}
	
	function isWhiteSpace(ch) {
		return ch <= ' ';
	}
	
	function isDigit(ch) {
		return ch >= '0' && ch <= '9';
	}
	
	function isLetter(ch) {
		return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
	}
}

function createLexer(text) {
	return new Lexer(text);
}

module.exports = {
	lexer: createLexer,
	TokenType: TokenType
};