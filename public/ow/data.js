OW.Data = function() {
	OW.Data._super.call(this);
	this.levelIndex = this.own(new JW.Property(0));
	this.level = this.own(new JW.Functor([this.levelIndex], function(index) {
		return OW.Level.itemArray[index];
	})).target;
	this.levelData = this.own(new JW.Mapper([this.level], {
		createValue: function(level) {
			return new OW.LevelData(this, level);
		},
		destroyValue: JW.destroy,
		scope: this
	})).target;
};

JW.extend(OW.Data, JW.Class, {
	nextLevel: function() {
		this.levelIndex.set(this.levelIndex.get() + 1);
	}
});
