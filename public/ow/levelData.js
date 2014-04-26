OW.LevelData = function(data, level) {
	OW.LevelData._super.call(this);
	this.data = data;
	this.level = level;
	this.map = new OW.Matrix(level.map.size);
	for (var i = 0; i < level.map.size; ++i) {
		for (var j = 0; j < level.map.size; ++j) {
			this.map.setCell([i, j], level.map.getCell([i, j]));
		}
	}
	this.diggerIj = [OW.surfaceI, Math.floor(level.map.size / 2)];
	this.diggerDir = 0;
	this.selectedDir = 0;
	this.diggerOffset = 0;
	this.turn = 0;
	this.turnEvent = this.own(new JW.Event());
	this.cellChangeEvent = this.own(new JW.Event());
	this.own(new JW.Interval(this.nextTurn, this, 40));
};

JW.extend(OW.LevelData, JW.Class, {
	setCell: function(ij, value) {
		var oldValue = this.map.getCell(ij);
		if (oldValue === value) {
			return;
		}
		this.map.setCell(ij, value);
		this.cellChangeEvent.trigger(ij);
	},
	
	nextTurn: function() {
		var speed = OW.diggerSpeed;
		// догребаем к центру
		if (this.diggerOffset < 0) {
			this.diggerOffset += speed;
			if (this.diggerOffset > 0) {
				speed = this.diggerOffset;
				this.diggerOffset = 0;
			} else {
				speed = 0;
			}
		}
		// отгребаем из центра
		if (speed) {
			if (this.diggerOffset === 0) {
				this.setCell(this.diggerIj, OW.map.digged);
				if (Math.abs(this.diggerDir - this.selectedDir) !== OW.dir.length / 2) {
					this.diggerDir = this.selectedDir;
				}
			}
			var digIj = this.getDigIj();
			if (this.map.inMatrix(digIj)) {
				var digCell = this.map.getCell(digIj);
				/*if (digCell === OW.map.digged) {
					alert("You digged to yourself!");
					var index = this.data.levelIndex.get();
					this.data.levelIndex.set(null);
					this.data.levelIndex.set(index);
					return;
				}*/
				if ((digCell !== OW.map.stone) && (digIj[0] > OW.surfaceI)) {
					this.diggerOffset += speed;
					if (this.diggerOffset > .5) {
						this.diggerOffset -= 1;
						this.diggerIj = digIj;
					}
				}
			}
		}
		// собираем нефть
		if (this.map.getCell(this.diggerIj) === OW.map.oil) {
			this.setCell(this.diggerIj, OW.map.digged);
		}
		// нефть ползет
		if (this.turn % 20 === 0) {
			var s = (this.turn % 40 === 0);
			for (var i = this.map.size - 1; i >= 0; --i) {
				for (var j = 0; j < this.map.size; ++j) {
					var ij = [i, s ? j : (this.map.size - j - 1)];
					var cell = this.map.getCell(ij);
					if (cell === OW.map.oil) {
						this._tryOilCrawl(ij, [1, 0]) ||
						this._tryOilCrawl(ij, [0, s ? -1 : 1]);
					}
				}
			}
		}
		this.turn++;
		this.turnEvent.trigger();
	},
	
	getDigIj: function() {
		return OW.Vector.add(this.diggerIj, OW.dir[this.diggerDir]);
	},
	
	_tryOilCrawl: function(from, offset) {
		var to = OW.Vector.add(from, offset);
		if (this.map.getCell(to) === OW.map.digged) {
			this.setCell(to, OW.map.oil);
			this.setCell(from, OW.map.digged);
			return true;
		}
		return false;
	}
});
