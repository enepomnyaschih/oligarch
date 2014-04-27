OW.ExplosionView = function(explosion) {
	OW.ExplosionView._super.call(this);
	this.explosion = explosion;
};

JW.extend(OW.ExplosionView, JW.UI.Component, {
	renderRoot: function(el) {
		OW.El.xy(el, OW.Vector.add(this.explosion.floatIj, [-this.explosion.size / 2, -this.explosion.size / 2]));
		el.addClass("ow-explosion");
		
		var opacity = this.own(new JW.Functor([this.explosion.time], function(time) {
			return time / OW.explosionTime;
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "opacity", opacity));
	}
});
