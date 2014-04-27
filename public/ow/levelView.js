OW.LevelView = function(levelData) {
	this._onKeyDown = JW.inScope(this._onKeyDown, this);
	this._onMouseMove = JW.inScope(this._onMouseMove, this);
	this._onMouseDown = JW.inScope(this._onMouseDown, this);
	OW.LevelView._super.call(this);
	this.levelData = levelData;
};

JW.extend(OW.LevelView, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("o-" + this.levelData.level.theme);
		jQuery(window).bind("keydown", this._onKeyDown);
		jQuery(window).bind("mousemove", this._onMouseMove);
		jQuery(window).bind("mousedown", this._onMouseDown);
	},
	
	renderStartScreen: function(el) {
		el.attr("ow-level", "o" + this.levelData.levelIndex);
		var visible = this.own(new JW.Functor([this.levelData.interval], function(interval) {
			return !interval;
		}, this)).target;
		this.own(new JW.UI.VisibleUpdater(el, visible));
	},
	
	renderStart: function(el) {
		el.click(JW.inScope(function() {
			this.levelData.start();
			return false;
		}, this));
	},
	
	renderPlayScreen: function(el) {
		this.own(new JW.UI.VisibleUpdater(el, this.levelData.interval));
	},
	
	renderMonitor: function() {
		return this.own(new OW.Monitor(this.levelData));
	},
	
	renderArrest: function(el) {
		this.own(new JW.UI.ClassUpdater(el, "o-enabled", this.levelData.jailCount));
		el.click(JW.inScope(function() {
			this.levelData.arrestCursor.set(true);
		}, this));
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
	
	renderArrestCursor: function(el) {
		this.own(new JW.UI.VisibleUpdater(el, this.levelData.arrestCursor));
	},
	
	destroyComponent: function() {
		jQuery(window).unbind("keydown", this._onKeyDown);
		jQuery(window).unbind("mousemove", this._onMouseMove);
		jQuery(window).unbind("mousedown", this._onMouseDown);
		this._super();
	},
	
	_onKeyDown: function(e) {
		if (jQuery(e.target).is("input[type=text]")) {
			return;
		}
		switch (e.keyCode) {
			case 40: this.levelData.selectedDir = 0; break;
			case 39: this.levelData.selectedDir = 1; break;
			case 38: this.levelData.selectedDir = 2; break;
			case 37: this.levelData.selectedDir = 3; break;
			case 32: this.levelData.toggleStart(); break;
		}
	},
	
	_onMouseMove: function(e) {
		var offset = this.el.position();
		this.getElement("arrest-cursor").css({
			left: (Math.min(jQuery(window).width () - 56, e.pageX) - offset.left + 20) + "px",
			top : (Math.min(jQuery(window).height() - 56, e.pageY) - offset.top  + 20) + "px"
		});
	},
	
	_onMouseDown: function() {
		this.levelData.arrestCursor.set(false);
	}
});
