OW.Tube = function(ij, dir) {
	OW.Tube._super.call(this);
	this.dir = dir;
	this.ij1 = this.own(new JW.Property(ij));
	this.ij2 = this.own(new JW.Property(ij));
};

JW.extend(OW.Tube, JW.Class);
