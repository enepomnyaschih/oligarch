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
		this.own(new JW.Interval(function() {
			el.toggleClass("o-blink");
		}, this, 300));
	},
	
	renderHtml: function(el) {
		el.html(this.faxData.quest.html);
	},
	
	renderForm: function(el) {
		el.submit(JW.inScope(function() {
			this.faxData.submit(JW.String.trim(this.getElement("input").val()));
			return false;
		}, this));
	}
});
