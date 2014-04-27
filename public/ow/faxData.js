OW.FaxData = function(levelData, fax, config) {
	OW.FaxData._super.call(this);
	this.levelData = levelData;
	this.quest = fax;
	this.config = config;
};

JW.extend(OW.FaxData, JW.Class, {
	createPanel: function() {
		return new OW.FaxPanel(this);
	},
	
	submit: function(value) {
		if (value === this.config.answer) {
			this.levelData.winQuest();
		} else {
			alert(this.config.wrongMessage);
			this.levelData.restart();
		}
	}
});
