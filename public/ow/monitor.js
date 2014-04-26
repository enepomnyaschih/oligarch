OW.Monitor = function(levelData) {
	OW.Monitor._super.call(this);
	this.levelData = levelData;
};

JW.extend(OW.Monitor, JW.UI.Component, {
	renderMap: function(el) {
		el.addClass("ow-monitor");
		var map = this.levelData.map;
		for (var i = 0; i < map.size; ++i) {
			var rowEl = jQuery('<div class="ow-monitor-row"></div>');
			for (var j = 0; j < map.size; ++j) {
				var cell = map.getCell([i, j]);
				var cellEl = jQuery('<div class="ow-monitor-cell"></div>');
				cellEl.attr("ow-cell", "c" + cell);
				if (i === OW.surfaceI) {
					cellEl.addClass("o-surface");
				}
				rowEl.append(cellEl);
			}
			rowEl.append('<div class="ow-clear"></div>');
			el.append(rowEl);
		}
		this._updateDigger();
		this.own(this.levelData.turnEvent.bind(this._updateDigger, this));
	},
	
	_updateDigger: function() {
		var el = this.getElement("digger");
		var ij = this.levelData.diggerIj;
		ij = OW.Vector.mult(ij, OW.cellSize);
		ij = OW.Vector.add(ij, OW.Vector.mult(OW.dir[this.levelData.diggerDir], OW.cellSize * this.levelData.diggerOffset));
		OW.El.xy(el, ij);
		el.css("transform", "rotate(-" + (90 * this.levelData.diggerDir) + "deg)");
	}
});
