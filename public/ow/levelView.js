OW.LevelView = function(levelData) {
	OW.LevelView._super.call(this);
	this.levelData = levelData;
};

JW.extend(OW.LevelView, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("o-" + this.levelData.level.theme);
		jQuery(window).keydown(JW.inScope(this._onKeyDown, this));
	},
	
	renderMonitor: function() {
		return this.own(new OW.Monitor(this.levelData));
	},
	
	_onKeyDown: function(e) {
		switch (e.keyCode) {
			case 40: this.levelData.selectedDir = 0; break;
			case 39: this.levelData.selectedDir = 1; break;
			case 38: this.levelData.selectedDir = 2; break;
			case 37: this.levelData.selectedDir = 3; break;
		}
	}
});
