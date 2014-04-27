OW.App = function(data) {
	OW.App._super.call(this);
	this.data = data;
	this.levels = this.own(new JW.ObservableArray()).ownItems();
};

JW.extend(OW.App, JW.UI.Component, {
	renderLevelList: function() {
		this.own(new JW.Updater([this.data.lsLevelIndex], function(index) {
			for (var i = this.levels.getLength(); i < Math.min(index + 1, OW.Level.itemArray.length); ++i) {
				this.levels.add(new OW.LevelBadge(this.data, OW.Level.itemArray[i]));
			}
		}, this));
		return this.levels;
	},
	
	renderLevel: function() {
		return this.own(new JW.Mapper([this.data.levelData], {
			createValue: function(levelData) {
				return new OW.LevelView(levelData);
			},
			destroyValue: JW.destroy,
			scope: this
		})).target;
	}
});
