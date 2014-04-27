OW.Data = function() {
	OW.Data._super.call(this);
	this.lsLevelIndex = this.own(new JW.Property(this._getLsLevelIndex()));
	this.levelIndex = this.own(new JW.Property(this.lsLevelIndex.get()));
	this.level = this.own(new JW.Functor([this.levelIndex], function(index) {
		var lsLevelIndex = Math.max(index, this.lsLevelIndex.get());
		localStorage["owLevelIndex"] = lsLevelIndex;
		this.lsLevelIndex.set(lsLevelIndex);
		return OW.Level.itemArray[index];
	}, this)).target;
	this.levelData = this.own(new JW.Mapper([this.level], {
		createValue: function(level) {
			return new OW.LevelData(this, level, this.levelIndex.get());
		},
		destroyValue: JW.destroy,
		scope: this
	})).target;
};

JW.extend(OW.Data, JW.Class, {
	nextLevel: function() {
		this.levelIndex.set(this.levelIndex.get() + 1);
	},
	
	_getLsLevelIndex: function() {
		return +(localStorage["owLevelIndex"] || 0);
	}
});
