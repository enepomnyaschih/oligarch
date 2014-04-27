OW.RandomFax = function(config) {
	OW.RandomFax._super.call(this, config);
};

JW.extend(OW.RandomFax, OW.Quest, {
	createData: function(levelData) {
		var gens = OW.RandomFax.gens;
		return new OW.FaxData(levelData, this, gens[Math.floor(gens.length * Math.random())]());
	}
});

OW.RandomFax.gens = [/*
	function() {
		var a = Math.floor(8 * Math.random()) + 2;
		var b = Math.floor(8 * Math.random()) + 2;
		var c = Math.floor(8 * Math.random()) + 2;
		var mr = String.fromCharCode(('A').charCodeAt(0) + Math.floor(26 * Math.random()));
		return {
			html:
				'<h3>Question from chief accountant</h3>' +
				'<p>Boss, we have a trouble calculating salary for Mr.' + mr + '! Only you can help us. We need to ' +
				'count how much is this:</p>' +
				'<p>' + a + ' x ' + b + ' + ' + c + '</p>',
			answer: String(a * b + c),
			wrongMessage: "Mr." + mr + " hasn't got correct salary! Now, as he left, your corporation is paralized."
		};
	},*/
	function() {
		var word = '';
		var answer = '';
		var n = Math.floor(3 * Math.random()) + 4;
		for (var i = 0; i < 14; ++i) {
			var c = String.fromCharCode(('a').charCodeAt(0) + Math.floor(26 * Math.random()));
			word += c;
			if ((i + 1) % n === 0) {
				answer += c;
			}
		}
		return {
			html:
				'<h3>Question from decryption team</h3>' +
				'<p>Boss, we have a trouble decrypting Anna Chapman\'s message about Greenpeace! Only you can help us. ' +
				'Please write down each ' + n + '\'th letter in the next word:</p>' +
				'<pre>' + word + '</pre>',
			answer: answer,
			wrongMessage: "Decryption team has got wrong results and now Anna Chapman is caught by Greenpeace!"
		};
	}
];
