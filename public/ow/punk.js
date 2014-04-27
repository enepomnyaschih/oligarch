OW.Punk = function(levelData) {
	OW.Punk._super.call(this);
	this.levelData = levelData;
	this.dir = (Math.random() < .5) ? 1 : -1;
	this.x = this.own(new JW.Property((this.dir === 1) ? -20 : (OW.mapSize * OW.cellSize + 20)));
	this.speed = .5 + Math.random();
	this.anim = this.own(new JW.Property(0));
	this.photo = levelData.level.allowPhoto && (Math.random() < .2);
	this.auto = !this.photo && levelData.level.allowAuto && (Math.random() < .55);
	if (this.auto) {
		this.speed = 1 + Math.random();
	}
	this.photed = false;
	this.photoAnim = this.own(new JW.Property(0));
};

JW.extend(OW.Punk, JW.Class, {
	move: function() {
		if (this.photoAnim.get()) {
			this.photoAnim.set(this.photoAnim.get() - 1);
			if (!this.photoAnim.get()) {
				this.levelData.blinding.set(OW.blindingTime + 25);
			}
			return;
		}
		if (this.photo && !this.photed && (Math.abs(this.x.get() - OW.mapSize * OW.cellSize / 2) < 200) && (Math.random() < .1)) {
			this.photed = true;
			this.photoAnim.set(50);
			return;
		}
		this.x.set(this.x.get() + this.speed * this.dir);
		this.anim.set(this.anim.get() + this.speed);
	},
	
	isWin: function() {
		return Math.abs(this.x.get() - OW.mapSize * OW.cellSize / 2) < 30;
	}
});
