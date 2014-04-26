OW.PunkWin = function() {
	OW.PunkWin._super.call(this);
	this.dir = (Math.random() < .5) ? 1 : -1;
	this.speed = .5 + Math.random();
	this.anim = this.own(new JW.Property(0));
};

JW.extend(OW.PunkWin, JW.Class, {
	move: function() {
		this.anim.set(this.anim.get() + this.speed);
	}
});
