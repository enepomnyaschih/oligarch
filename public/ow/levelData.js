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
		if (speed) {
			// если в центре и задано направление
			if ((this.diggerOffset === 0) && (Math.abs(this.diggerDir - this.selectedDir) !== OW.dir.length / 2)) {
				this.setCell(this.diggerIj, OW.map.digged);
				this.diggerDir = this.selectedDir;
			}
			var digIj = this.getDigIj();
			if (this.map.inMatrix(digIj)) {
				var digCell = this.map.getCell(digIj);
				if (digCell === OW.map.digged) {
					alert("You digged to yourself!");
					var index = this.data.levelIndex.get();
					this.data.levelIndex.set(null);
					this.data.levelIndex.set(index);
					return;
				}
				if ((digCell === OW.map.ground) && (digIj[0] > OW.surfaceI)) {
					this.diggerOffset += speed;
					if (this.diggerOffset > .5) {
						this.diggerOffset -= 1;
						this.diggerIj = digIj;
					}
				}
			}
		}
		this.turn++;
		this.turnEvent.trigger();
	},
	
	getDigIj: function() {
		return OW.Vector.add(this.diggerIj, OW.dir[this.diggerDir]);
	}
});
