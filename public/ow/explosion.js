OW.Explosion = function(floatIj, size) {
	OW.Explosion._super.call(this);
	this.floatIj = floatIj;
	this.size = size || 48;
	this.time = this.own(new JW.Property(OW.explosionTime));
};

JW.extend(OW.Explosion, JW.Class, {
	// not used
	move: function() {
		//--this.time;
	},
	
	isOut: function() {
		//return this.time <= 0;
	}
});
