OW.App = function(data) {
	OW.App._super.call(this);
	this.data = data;
};

JW.extend(OW.App, JW.UI.Component, {
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
