OW.PunkWinView = function(punkWin) {
	OW.PunkWinView._super.call(this);
	this.punkWin = punkWin;
};

JW.extend(OW.PunkWinView, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("ow-punk-win");
		el.addClass("o-" + ((this.punkWin.dir === 1) ? "right" : "left"));
		el.css("left", (OW.mapSize * OW.cellSize / 2 + 40 * Math.random() - 25) + "px");
		el.css("top", (OW.cellSize * OW.surfaceI + 10 * Math.random() - 60) + "px");
		
		var bgx = this.own(new JW.Functor([this.punkWin.anim], function(anim) {
			return -24 * (Math.floor(anim / 8) % 4) + "px 0";
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "background-position", bgx));
	}
});
