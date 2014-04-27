OW.JailPanel = function(jailData) {
	OW.JailPanel._super.call(this);
	this.jailData = jailData;
};

JW.extend(OW.JailPanel, JW.UI.Component, {
	renderPhone: function(el) {
		el.click(JW.inScope(function() {
			this.el.addClass("o-open");
			return false;
		}, this));
		var soundCounter = 0;
		this.own(new JW.Interval(function() {
			if (this.el.hasClass("o-open")) {
				return;
			}
			el.toggleClass("o-blink");
			if (soundCounter % 20 < 7) {
				OW.sound("fax");
			}
			++soundCounter;
		}, this, 150));
	},
	
	renderCount: function(el) {
		el.text(this.jailData.count);
	},
	
	renderAccept: function(el) {
		el.click(JW.inScope(function() {
			this.jailData.levelData.jailCount.set(this.jailData.count);
			this.jailData.levelData.winQuest();
		}, this));
	}
});
