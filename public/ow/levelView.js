OW.LevelView = function(levelData) {
	OW.LevelView._super.call(this);
	this.levelData = levelData;
};

JW.extend(OW.LevelView, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("o-" + this.levelData.level.theme);
	},
	
	renderMonitor: function() {
		return this.own(new OW.Monitor(this.levelData));
	}
});
