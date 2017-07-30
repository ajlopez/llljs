
var TokenType = { Name: 1, Integer: 2, String: 3, Symbol: 4, Delimiter: 5 };

var delimiters = "()[]{}";

function Lexer(text) {
	var l = text.length;
	var p = 0;
	
	this.nextToken = function () {
		skipWhitespaces();
		
		if (p >= l)
			return null;
		
		var ch = text[p++];
		
		if (ch === '"')
			return nextString();
		
		if (delimiters.indexOf(ch) >= 0)
			return { type: TokenType.Delimiter, value: ch };
		
		if (isDigit(ch))
			return nextInteger(ch);
		
		if (isLetter(ch))
			return nextName(ch);
		
		return { type: TokenType.Symbol, value: ch };
	}
	
	function nextInteger(ch) {
		var value = ch;
		
		while (p < l && isDigit(text[p]))
			value += text[p++];
		
		return { type: TokenType.Integer, value: value }
	}
	
	function nextString(ch) {
		var value = '';
		
		while (p < l && text[p] != '"')
			value += text[p++];
		
		p++;
		
		return { type: TokenType.String, value: value }
	}
	
	function nextName(ch) {
		var value = ch;
		
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
	
	function skipWhitespaces() {
		while (true) {
			while (p < l && isWhiteSpace(text[p]))
				p++;
			
			if (p < l && text[p] === ';') {
				while (p++ < l && text[p] !== '\r' && text[p] !== '\n')
					;
				
				continue;
			}
			
			break;
		}
	}
}

function createLexer(text) {
	return new Lexer(text);
}

module.exports = {
	lexer: createLexer,
	TokenType: TokenType
};

