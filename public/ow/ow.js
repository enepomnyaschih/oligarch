var OW = {
	mapSize: 32,
	cellSize: 16,
	surfaceI: 5,
	stoneI: 8,
	oilI: 12,
	diggerSpeed: 0.1,
	stoneAmount: 10,
	oilAmount: 10,
	maxPunksAllowed: 5,
	blindingTime: 100,
	explosionTime: 25,
	dir: [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1]
	],
	map: {
		sky: 1,
		ground: 2,
		stone: 3,
		oil: 4,
		digged: 5,
		metan: 6
	}
};
