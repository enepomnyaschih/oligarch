OW.Matrix = function(size) {
	OW.Matrix._super.call(this);
	this.size = size;
	this.cells = new Array(size);
	for (var i = 0; i < size; ++i) {
		this.cells[i] = new Array(size);
	}
};

JW.extend(OW.Matrix, JW.Class, {
	getCell: function(ij) {
		return JW.get(this.cells, ij);
	},
	
	setCell: function(ij, value) {
		this.cells[ij[0]][ij[1]] = value;
	},
	
	inMatrix: function(ij) {
		return (ij[0] >= 0) && (ij[0] < this.size) && (ij[1] >= 0) && (ij[1] < this.size);
	}
});
