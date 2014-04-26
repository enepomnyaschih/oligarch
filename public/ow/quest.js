OW.Quest = function(config) {
	OW.Quest._super.call(this);
	this.turn = config.turn;
	this.duration = config.duration;
};

JW.extend(OW.Quest, JW.Class, {
	createData: function(levelData) {}
});
