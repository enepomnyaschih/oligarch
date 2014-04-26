OW.TubeViewV = function(tube) {
	OW.TubeViewV._super.call(this);
	this.tube = tube;
};

JW.extend(OW.TubeViewV, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("ow-tube");
		el.addClass("o-v");
		this.own(new JW.Updater([this.tube.ij1, this.tube.ij2], function(ij1, ij2) {
			i1 = Math.min(ij1[0], ij2[0]);
			i2 = Math.max(ij1[0], ij2[0]);
			OW.El.xy(el, OW.Vector.mult([i1 + .5, ij1[1]], OW.cellSize));
			OW.El.size(el, OW.Vector.mult([i2 - i1, 1], OW.cellSize));
		}, this));
	}
});
