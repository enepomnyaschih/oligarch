OW.PunkView = function(levelData, punk) {
	OW.PunkView._super.call(this);
	this.levelData = levelData;
	this.punk = punk;
};

JW.extend(OW.PunkView, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("ow-punk");
		el.addClass("o-" + ((this.punk.dir === 1) ? "right" : "left"));
		if (this.punk.photo) {
			el.addClass("o-photo");
		}
		if (this.punk.auto) {
			el.addClass("o-auto");
		}
		el.css("top", (OW.cellSize * OW.surfaceI - 24) + "px");
		
		var left = this.own(new JW.Functor([this.punk.x], function(x) {
			return (x - (this.punk.auto ? 16 : 8)) + "px";
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "left", left));
		
		this.own(new JW.UI.ClassUpdater(el, "o-photing", this.punk.photoAnim));
		
		var bgx = this.own(new JW.Functor([this.punk.anim, this.punk.photoAnim], function(anim, photoAnim) {
			return photoAnim ? "0 0" : (-(this.punk.auto ? 32 : 16) * (Math.floor(anim / 8) % 4) + "px 0");
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "background-position", bgx));
		
		el.mousedown(JW.inScope(this._onMouseDown, this));
	},
	
	_onMouseDown: function() {
		this.levelData.pwn(this.punk);
	}
});
