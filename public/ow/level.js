OW.Level = function(config) {
	OW.Level._super.call(this);
	this.id = config.id;
	this.name = config.name;
	this.theme = config.theme;
	this.countStone = config.countStone || 0;
	this.countOil = config.countOil || 0;
	this.countMetan = config.countMetan || 0;
	this.countSurface = config.countSurface || 0;
	this.countBeneath = config.countBeneath || 0;
	this.probPhoto = config.probPhoto || 0;
	this.probAuto = config.probAuto || 0;
	this.quests = config.quests;
	this.map = new OW.Matrix(OW.mapSize);
	for (var i = 0; i < this.map.size; ++i) {
		for (var j = 0; j < this.map.size; ++j) {
			this.map.setCell([i, j], (i < OW.surfaceI) ? OW.map.sky : OW.map.ground);
		}
	}
	for (var k = 0; k < this.countStone; ++k) {
		var ij = [
			Math.floor((this.map.size - OW.stoneI) * Math.random()) + OW.stoneI,
			Math.floor(this.map.size * Math.random())
		];
		var points = [ij];
		var taken = {};
		taken[ij.join()] = true;
		for (var m = 0; points.length && (m < OW.stoneAmount); ++m) {
			var index = Math.floor(points.length * Math.random());
			var point = points[index];
			points.splice(index, 1);
			this.map.setCell(point, OW.map.stone);
			for (var d = 0; d < OW.dir.length; ++d) {
				var adj = OW.Vector.add(point, OW.dir[d]);
				if (!this.map.inMatrix(adj) || (adj[0] <= OW.surfaceI) || taken[adj.join()]) {
					continue;
				}
				points.push(adj);
				taken[adj.join()] = true;
			}
		}
	}
	for (var k = 0; k < this.countMetan; ++k) {
		var ij = [
			Math.floor((this.map.size - OW.stoneI) * Math.random()) + OW.stoneI,
			Math.floor(this.map.size * Math.random())
		];
		this.map.setCell(ij, OW.map.metan);
	}
	for (var k = 0; k < this.countOil; ++k) {
		var ij = [
			Math.floor((this.map.size - OW.oilI) * Math.random()) + OW.oilI,
			Math.floor(this.map.size * Math.random())
		];
		if (this.map.getCell(ij) === OW.map.oil) {
			--k;
			continue;
		}
		var points = [ij];
		var taken = {};
		taken[ij.join()] = true;
		for (var m = 0; points.length && (m < OW.stoneAmount); ++m) {
			var index = Math.floor(points.length * Math.random());
			var point = points[index];
			points.splice(index, 1);
			this.map.setCell(point, OW.map.oil);
			for (var d = 0; d < OW.dir.length; ++d) {
				var adj = OW.Vector.add(point, OW.dir[d]);
				if (!this.map.inMatrix(adj) || (adj[0] < OW.oilI) || taken[adj.join()]) {
					continue;
				}
				var cell = this.map.getCell(adj);
				if (cell === OW.map.oil) {
					continue;
				}
				points.push(adj);
				taken[adj.join()] = true;
			}
		}
	}
	for (var i = 0; i < this.map.size; ++i) {
		for (var j = 0; j < this.map.size; ++j) {
			var ij = [i, j]
			if (this.map.getCell(ij) !== OW.map.oil) {
				continue;
			}
			for (var d = 0; d < OW.dir.length; ++d) {
				var adj = OW.Vector.add(ij, OW.dir[d]);
				if (!this.map.inMatrix(adj)) {
					continue;
				}
				var adjCell = this.map.getCell(adj);
				if ((adjCell === OW.map.ground) || (adjCell === OW.map.metan)) {
					this.map.setCell(adj, OW.map.stone);
				}
			}
		}
	}
};

JW.extend(OW.Level, JW.Class);

JW.makeRegistry(OW.Level);
