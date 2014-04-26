OW.Jail = function(config) {
	OW.Jail._super.call(this, config);
};

JW.extend(OW.Jail, OW.Quest, {
	createData: function(levelData) {
		return new OW.JailData(levelData, this);
	}
});
