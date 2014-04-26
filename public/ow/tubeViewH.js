OW.TubeViewH = function(tube) {
	OW.TubeViewH._super.call(this);
	this.tube = tube;
};

JW.extend(OW.TubeViewH, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("ow-tube");
		el.addClass("o-h");
		this.own(new JW.Updater([this.tube.ij1, this.tube.ij2], function(ij1, ij2) {
			j1 = Math.min(ij1[1], ij2[1]);
			j2 = Math.max(ij1[1], ij2[1]);
			OW.El.xy(el, OW.Vector.mult([ij1[0], j1 + .5], OW.cellSize));
			OW.El.size(el, OW.Vector.mult([1, j2 - j1], OW.cellSize));
		}, this));
	}
});
