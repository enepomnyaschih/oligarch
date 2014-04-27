OW.LevelBadge = function(data, level) {
	OW.LevelBadge._super.call(this);
	this.data = data;
	this.level = level;
};

JW.extend(OW.LevelBadge, JW.UI.Component, {
	renderRoot: function(el) {
		el.text(this.level.name);
		el.click(JW.inScope(function() {
			this.data.levelIndex.set(OW.Level.itemArray.indexOf(this.level));
			return false;
		}, this));
	}
});
