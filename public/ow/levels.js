OW.Level.registerItem(new OW.Level({
	id: "round1",
	theme: "siberia",
	countStone: 5,
	countOil: 2,
	countSurface: 5,
	countBeneath: 0,
	allowPhoto: true,
	quests: [
		new OW.Fax({
			turn: 300,
			duration: 1000,
			html:
				'<p>Please sign this document up. Sara, secretary</p>' +
				'<h3>Statement of a crime</h3>' +
				'<p>We found a bandit in our Arctic oil platform who was trying to gather information about ' +
				'the penguins who were killed during platform construction. Order booking of this guy into ' +
				'Zamoskvoretsky tribunal in Moscow city.</p>' +
				'<p style="color: gray;">Hint: Sign as "Oligarenko".</p>' +
				'<p style="color: gray;">Hint: Leave blank if this is not something you want to sign up.</p>',
			answer: "Oligarenko",
			wrongMessage: "Russia won't rise from its knees if you won't sign this up correctly!"
		})
	]
}));

OW.Level.registerItem(new OW.Level({
	id: "round2",
	theme: "siberia",
	countStone: 8,
	countOil: 3,
	countSurface: 5,
	countBeneath: 0,
	allowPhoto: true
}));
