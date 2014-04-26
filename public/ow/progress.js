OW.Progress = function(value, total) {
	OW.Progress._super.call(this);
	this.value = value;
	this.total = total;
};

JW.extend(OW.Progress, JW.UI.Component, {
	renderComplete: function(el) {
		var width = this.own(new JW.Functor([this.value, this.total], function(value, total) {
			return total ? (Math.round(100 * value / total) + "%") : 0;
		}, this)).target;
		this.own(new JW.UI.CssUpdater(el, "width", width));
	}
});
