OW.LevelData = function(data, level) {
	OW.LevelData._super.call(this);
	this.data = data;
	this.level = level;
	this.map = new OW.Matrix(level.map.size);
	var oilCount = 0;
	for (var i = 0; i < level.map.size; ++i) {
		for (var j = 0; j < level.map.size; ++j) {
			var ij = [i, j];
			var cell = level.map.getCell(ij);
			this.map.setCell(ij, cell);
			if (cell === OW.map.oil) {
				++oilCount;
			}
		}
	}
	this.diggedCells = {};
	this.diggerIj = [OW.surfaceI, Math.floor(level.map.size / 2)];
	this.diggerDir = 0;
	this.selectedDir = 0;
	this.diggerOffset = 0;
	this.oilRemaining = this.own(new JW.Property(oilCount));
	this.tubes = this.own(new JW.ObservableArray()).ownItems();
	var tube = this._createTube();
	tube.ij1.set(OW.Vector.add(tube.ij1.get(), [-.5, 0]));
	this.punks = this.own(new JW.ObservableArray()).ownItems();
	this.punkWins = this.own(new JW.ObservableArray()).ownItems();
	this.explosions = this.own(new JW.ObservableArray()).ownItems();
	this.punkPwns = this.own(new JW.ObservableArray()).ownItems();
	this.blinding = this.own(new JW.Property(0));
	this.questData = this.own(new JW.Property()).ownValue();
	this.questTime = this.own(new JW.Property());
	this.levelQuestIndex = 0;
	this.jailCount = this.own(new JW.Property());
	this.jailCurrent = 0;
	this.arrestCursor = this.own(new JW.Property(false));
	this.turn = 0;
	this.turnEvent = this.own(new JW.Event());
	this.cellChangeEvent = this.own(new JW.Event());
	this.interval = this.own(new JW.Interval(this.nextTurn, this, 40));
};

JW.extend(OW.LevelData, JW.Class, {
	setCell: function(ij, value) {
		var oldValue = this.map.getCell(ij);
		if (oldValue === value) {
			return;
		}
		this.map.setCell(ij, value);
		if (oldValue === OW.map.oil) {
			this.oilRemaining.set(this.oilRemaining.get() - 1);
		}
		if (value === OW.map.oil) {
			this.oilRemaining.set(this.oilRemaining.get() + 1);
		}
		this.cellChangeEvent.trigger(ij);
	},
	
	nextTurn: function() {
		if (!this.explosions.isEmpty()) {
			alert("Metan has exploded!");
			this.restart();
			return;
		}
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
			this._updateTube();
		}
		// отгребаем из центра
		if (speed) {
			if (this.diggerOffset === 0) {
				this.setCell(this.diggerIj, OW.map.digged);
				this.diggedCells[this.diggerIj.join()] = true;
				for (var d = 0; d < OW.dir.length; ++d) {
					var adj = OW.Vector.add(this.diggerIj, OW.dir[d]);
					if (this.map.getCell(adj) === OW.map.metan) {
						this.explosions.add(new OW.Explosion(OW.Vector.mult(OW.Vector.add(adj, [.5, .5]), OW.cellSize)));
					}
				}
				if (this.diggerDir % 2 !== this.selectedDir % 2) {
					this.diggerDir = this.selectedDir;
					this._createTube();
				}
			}
			if ((this.diggerOffset !== 0) || (this.diggerDir === this.selectedDir)) {
				var digIj = this.getDigIj();
				if (this.map.inMatrix(digIj)) {
					if (this.diggedCells[digIj.join()]) {
						alert("You digged to yourself!");
						this.restart();
						return;
					}
					if ((this.map.getCell(digIj) !== OW.map.stone) && (digIj[0] > OW.surfaceI)) {
						this.diggerOffset += speed;
						if (this.diggerOffset > .5) {
							this.diggerOffset -= 1;
							this.diggerIj = digIj;
						}
						this._updateTube();
					}
				}
			}
		}
		// собираем нефть
		if (this.map.getCell(this.diggerIj) === OW.map.oil) {
			this.setCell(this.diggerIj, OW.map.digged);
		}
		// нефть ползет
		if (this.turn % 6 === 0) {
			var s = (this.turn % 12 === 0);
			for (var i = this.map.size - 1; i >= 0; --i) {
				for (var j = 0; j < this.map.size; ++j) {
					var ij = [i, s ? j : (this.map.size - j - 1)];
					var cell = this.map.getCell(ij);
					if (cell === OW.map.oil) {
						if (this._tryOilCrawl(ij, [1, 0])) {
							continue;
						}
						var add = [0, s ? -1 : 1];
						var adj = OW.Vector.add(ij, add);
						var underCell = this.map.getCell(OW.Vector.add(adj, [1, 0]));
						if (underCell === OW.map.digged) {
							this._tryOilCrawl(ij, add);
						}
					}
				}
			}
		}
		this.punks.each(JW.byMethod("move"));
		this.punkWins.each(JW.byMethod("move"));
		this.punkPwns.each(JW.byMethod("move"));
		var punkWins = this.punks.$filter(JW.byMethod("isWin"));
		punkWins.each(function(punk) {
			this.punkWins.add(new OW.PunkWin());
			this.punks.removeItem(punk);
		}, this);
		if (!punkWins.isEmpty()) {
			this.punkWins.sort(JW.byField("y"));
		}
		if (Math.random() < this.level.countSurface / 200) {
			this.punks.add(new OW.Punk(this));
		}
		this.punkPwns.removeItems(this.punkPwns.filter(JW.byMethod("isOut")));
		if (this.oilRemaining.get() === 0) {
			alert("You win!");
			this.data.nextLevel();
		}
		if (this.punkWins.length.get() >= OW.maxPunksAllowed) {
			alert("Too much Greenpeace got onto the platform!");
			this.restart();
			return;
		}
		this.blinding.set(Math.max(0, this.blinding.get() - 1));
		var quest = JW.get(this.level, ["quests", this.levelQuestIndex]);
		if (quest && (quest.turn === this.turn)) {
			this.questTime.set(quest.duration);
			this.questData.set(quest.createData(this));
			++this.levelQuestIndex;
		}
		if (JW.isSet(this.questTime.get())) {
			this.questTime.set(this.questTime.get() - 1);
			if (this.questTime.get() === 0) {
				alert("You couldn't deal with the quest in time!");
				this.restart();
				return;
			}
		}
		this.turn++;
		this.turnEvent.trigger();
	},
	
	getFloatIj: function() {
		return OW.Vector.add(this.diggerIj, OW.Vector.mult(OW.dir[this.diggerDir], this.diggerOffset));
	},
	
	getDigIj: function() {
		return OW.Vector.add(this.diggerIj, OW.dir[this.diggerDir]);
	},
	
	restart: function() {
		var index = this.data.levelIndex.get();
		this.data.levelIndex.set(null);
		this.data.levelIndex.set(index);
	},
	
	winQuest: function() {
		this.questData.set(null);
		this.questTime.set(null);
	},
	
	pwn: function(punk) {
		var jailCount = this.jailCount.get();
		if (JW.isSet(jailCount)) {
			if (!this.arrestCursor.get() && (this.jailCurrent === jailCount - 1)) {
				alert("You repelled a Greenpeace member that you must've arrested!");
				this.restart();
				return;
			}
			if (this.arrestCursor.get() && (this.jailCurrent !== jailCount - 1)) {
				alert("You arrested a Greenpeace member that you must've repelled!");
				this.restart();
				return;
			}
		}
		if (this.arrestCursor.get()) {
			this.pwnNow(punk);
		} else if (punk.auto) {
			this.punkPwns.add(new OW.PunkPwn(punk, "o-auto"));
			var survivor = new OW.Punk(this);
			survivor.dir = punk.dir;
			survivor.x.set(punk.x.get());
			survivor.speed = punk.speed / 2;
			survivor.photo = false;
			survivor.auto = false;
			this.punks.add(survivor);
			this.punks.removeItem(punk);
		} else {
			this.pwnNow(punk);
		}
	},
	
	pwnNow: function(punk) {
		this.punkPwns.add(new OW.PunkPwn(punk, this.arrestCursor.get() ? "o-arrest" : null));
		this.punks.removeItem(punk);
		if (JW.isSet(this.jailCount.get())) {
			if (this.arrestCursor.get()) {
				this.jailCurrent = 0;
			} else {
				++this.jailCurrent;
			}
		}
	},
	
	_createTube: function() {
		var tube = new OW.Tube(this.diggerIj, this.diggerDir);
		this.tubes.add(tube);
		return tube;
	},
	
	_updateTube: function() {
		var tube = this.tubes.getLast();
		tube.ij2.set(this.getFloatIj());
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
