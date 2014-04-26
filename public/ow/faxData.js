OW.FaxData = function(levelData, fax) {
	OW.FaxData._super.call(this);
	this.levelData = levelData;
	this.quest = fax;
};

JW.extend(OW.FaxData, JW.Class, {
	createPanel: function() {
		return new OW.FaxPanel(this);
	},
	
	submit: function(value) {
		if (value === this.quest.answer) {
			this.levelData.winQuest();
		} else {
			alert(this.quest.wrongMessage);
			this.levelData.restart();
		}
	}
});
