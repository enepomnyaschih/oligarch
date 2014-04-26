OW.LevelView = function(levelData) {
	OW.LevelView._super.call(this);
	this.levelData = levelData;
};

JW.extend(OW.LevelView, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("o-" + this.levelData.level.theme);
		jQuery(window).keydown(JW.inScope(this._onKeyDown, this));
	},
	
	renderMonitor: function() {
		return this.own(new OW.Monitor(this.levelData));
	},
	
	renderArrest: function(el) {
		this.own(new JW.UI.ClassUpdater(el, "o-enabled", this.levelData.jailCount));
	},
	
	renderOilRemaining: function(el) {
		this.own(new JW.UI.TextUpdater(el, this.levelData.oilRemaining));
	},
	
	renderQuest: function(el) {
		this.own(new JW.UI.VisibleUpdater(el, this.levelData.questData));
	},
	
	renderQuestTime: function() {
		return this.own(new JW.Mapper([this.levelData.questData], {
			createValue: function(questData) {
				return new OW.Progress(this.levelData.questTime, new JW.Property(questData.quest.duration));
			},
			destroyValue: JW.destroy,
			scope: this
		})).target;
	},
	
	renderQuestPanel: function() {
		return this.own(new JW.Mapper([this.levelData.questData], {
			createValue: function(questData) {
				return questData.createPanel()
			},
			destroyValue: JW.destroy,
			scope: this
		})).target;
	},
	
	_onKeyDown: function(e) {
		switch (e.keyCode) {
			case 40: this.levelData.selectedDir = 0; break;
			case 39: this.levelData.selectedDir = 1; break;
			case 38: this.levelData.selectedDir = 2; break;
			case 37: this.levelData.selectedDir = 3; break;
		}
	}
});
