OW.JailData = function(levelData, quest) {
	OW.JailData._super.call(this);
	this.levelData = levelData;
	this.quest = quest;
	this.count = Math.floor(7 * Math.random()) + 4;
};

JW.extend(OW.JailData, JW.Class, {
	createPanel: function() {
		return new OW.JailPanel(this);
	}
});
