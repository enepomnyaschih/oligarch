OW.PunkView = function(punk) {
	OW.PunkView._super.call(this);
	this.punk = punk;
};

JW.extend(OW.PunkView, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("ow-punk");
		el.addClass("o-" + ((this.punk.dir === 1) ? "right" : "left"));
		el.css("top", (OW.cellSize * OW.surfaceI - 24) + "px");
		
		var left = this.own(new JW.Functor([this.punk.x], function(x) {
			return (x - 8) + "px";
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "left", left));
		
		var bgx = this.own(new JW.Functor([this.punk.anim], function(anim) {
			return -16 * (Math.floor(anim / 8) % 4) + "px 0";
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "background-position", bgx));
	}
});
