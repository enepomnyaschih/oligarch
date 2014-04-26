OW.PunkPwnView = function(punkPwn) {
	OW.PunkPwnView._super.call(this);
	this.punkPwn = punkPwn;
};

JW.extend(OW.PunkPwnView, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("ow-punk-pwn");
		el.addClass("o-" + ((this.punkPwn.dir === 1) ? "right" : "left"));
		
		var left = this.own(new JW.Functor([this.punkPwn.x], function(x) {
			return (x - 8) + "px";
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "left", left));
		
		var top = this.own(new JW.Functor([this.punkPwn.y], function(y) {
			return (y - 8) + "px";
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "top", top));
	}
});
