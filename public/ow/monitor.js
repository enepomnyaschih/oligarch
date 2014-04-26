OW.Monitor = function(levelData) {
	OW.Monitor._super.call(this);
	this.levelData = levelData;
};

JW.extend(OW.Monitor, JW.UI.Component, {
	renderMap: function(el) {
		el.addClass("ow-monitor");
		el.on("mousedown", ".ow-monitor-cell[ow-cell=c3]", JW.inScope(this._onStoneClick, this));
		var map = this.levelData.map;
		for (var i = 0; i < map.size; ++i) {
			var rowEl = jQuery('<div class="ow-monitor-row"></div>');
			for (var j = 0; j < map.size; ++j) {
				var cell = map.getCell([i, j]);
				var cellEl = jQuery('<div class="ow-monitor-cell"></div>');
				cellEl.attr("ow-cell", "c" + cell);
				cellEl.attr("ow-i", "n" + i);
				cellEl.attr("ow-j", "n" + j);
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
		this.own(this.levelData.cellChangeEvent.bind(this._onCellChange, this));
	},
	
	renderTubes: function() {
		return this.own(this.levelData.tubes.createMapper({
			createItem: function(tube) {
				return (tube.dir % 2 === 0) ? new OW.TubeViewV(tube) : new OW.TubeViewH(tube);
			},
			destroyItem: JW.destroy,
			scope: this
		})).target;
	},
	
	renderPunks: function() {
		return this.own(this.levelData.punks.createMapper({
			createItem: function(punk) {
				return new OW.PunkView(punk);
			},
			destroyItem: JW.destroy,
			scope: this
		})).target;
	},
	
	renderPunkWins: function() {
		return this.own(this.levelData.punkWins.createMapper({
			createItem: function(punkWin) {
				return new OW.PunkWinView(punkWin);
			},
			destroyItem: JW.destroy,
			scope: this
		})).target;
	},
	
	_updateDigger: function() {
		var el = this.getElement("digger");
		var ij = OW.Vector.mult(this.levelData.getFloatIj(), OW.cellSize);
		OW.El.xy(el, ij);
		el.css("transform", "rotate(-" + (90 * this.levelData.diggerDir) + "deg)");
	},
	
	_getCell: function(ij) {
		return this.getElement("map").find(".ow-monitor-cell[ow-i=n" + ij[0] + "][ow-j=n" + ij[1] + "]");
	},
	
	_onStoneClick: function(e) {
		var target = jQuery(e.currentTarget);
		var ij = [+target.attr("ow-i").substr(1), +target.attr("ow-j").substr(1)];
		if ((this.levelData.diggerOffset === 0) && OW.Vector.equal(ij, this.levelData.getDigIj()) && (Math.random() < .2)) {
			this.levelData.setCell(ij, OW.map.digged);
		}
	},
	
	_onCellChange: function(ij) {
		this._getCell(ij).attr("ow-cell", "c" + this.levelData.map.getCell(ij));
	}
});
