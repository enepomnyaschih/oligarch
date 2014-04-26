OW.Punk = function() {
	OW.Punk._super.call(this);
	this.dir = (Math.random() < .5) ? 1 : -1;
	this.x = this.own(new JW.Property((this.dir === 1) ? -20 : (OW.mapSize * OW.cellSize + 20)));
	this.speed = .5 + Math.random();
	this.anim = this.own(new JW.Property(0));
};

JW.extend(OW.Punk, JW.Class, {
	move: function() {
		this.x.set(this.x.get() + this.speed * this.dir);
		this.anim.set(this.anim.get() + this.speed);
	}
});
