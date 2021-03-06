OW.FaxPanel = function(faxData) {
	OW.FaxPanel._super.call(this);
	this.faxData = faxData;
};

JW.extend(OW.FaxPanel, JW.UI.Component, {
	renderPrinter: function(el) {
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
	
	renderHtml: function(el) {
		el.html(this.faxData.config.html);
	},
	
	renderForm: function(el) {
		el.submit(JW.inScope(function() {
			this.faxData.submit(JW.String.trim(this.getElement("input").val()));
			return false;
		}, this));
	}
});
