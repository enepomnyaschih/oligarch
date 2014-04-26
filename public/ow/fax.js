OW.Fax = function(config) {
	OW.Fax._super.call(this, config);
	this.html = config.html;
	this.answer = config.answer;
	this.wrongMessage = config.wrongMessage;
};

JW.extend(OW.Fax, OW.Quest, {
	createData: function(levelData) {
		return new OW.FaxData(levelData, this);
	}
});
