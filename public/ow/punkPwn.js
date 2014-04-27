OW.PunkPwn = function(punk, cls) {
	OW.PunkPwn._super.call(this);
	this.cls = cls;
	this.dir = punk.dir;
	this.x = this.own(new JW.Property(punk.x.get()));
	this.y = this.own(new JW.Property(OW.cellSize * OW.surfaceI - 8));
	this.dx = -this.dir * (4 * Math.random() + 1);
	this.dy = -5 * Math.random() - 3;
};

JW.extend(OW.PunkPwn, JW.Class, {
	move: function() {
		this.x.set(this.x.get() + this.dx);
		this.y.set(this.y.get() + this.dy);
		++this.dy;
	},
	
	isOut: function() {
		return (this.x.get() < -16) ||
				(this.x.get() > 16 + OW.cellSize * OW.mapSize) ||
				(this.y.get() > 16 + OW.cellSize * OW.mapSize);
	}
});
