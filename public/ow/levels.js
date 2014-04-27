OW.Level.registerItem(new OW.Level({
	id: "round1",
	theme: "siberia",
	countStone: 2,
	countOil: 1
}));

OW.Level.registerItem(new OW.Level({
	id: "round2",
	theme: "siberia",
	countStone: 3,
	countOil: 2,
	countSurface: 3
}));

OW.Level.registerItem(new OW.Level({
	id: "round3",
	theme: "siberia",
	countStone: 5,
	countOil: 2,
	countSurface: 5,
	allowPhoto: true
}));

OW.Level.registerItem(new OW.Level({
	id: "round4",
	theme: "siberia",
	countStone: 6,
	countOil: 4,
	countSurface: 3,
	allowPhoto: true,
	quests: [
		new OW.Fax({
			turn: 300,
			duration: 1000,
			html:
				'<p>Please sign this document up. Sara, secretary</p>' +
				'<h3>Statement of a crime</h3>' +
				'<p>We found a bandit in our Arctic oil platform who was trying to gather information about ' +
				'the penguins who were killed during platform construction. Issue an order to book this guy into ' +
				'Zamoskvoretsky courthouse in Moscow city.</p>' +
				'<p style="color: gray;">Hint: Sign as "Oligarenko".</p>' +
				'<p style="color: gray;">Hint: Leave blank if this is not something you want to sign up.</p>',
			answer: "Oligarenko",
			wrongMessage: "Russia won't rise from its knees if you won't sign this up correctly!"
		}),
		new OW.Fax({
			turn: 1300,
			duration: 700,
			html:
				'<p>Please sign this document up. Sara, secretary</p>' +
				'<h3>Secret scouting order</h3>' +
				'<p>Assign Anna Chapman to a spy operation against Greenpeace to discover their in-house ' +
				'situation and gather some compomising documents.</p>' +
				'<p style="color: gray;">Hint: Sign as "Oligarenko".</p>' +
				'<p style="color: gray;">Hint: Leave blank if this is not something you want to sign up.</p>',
			answer: "Oligarenko",
			wrongMessage: "Russia won't rise from its knees if you won't sign this up correctly!"
		}),
		new OW.Fax({
			turn: 2000,
			duration: 500,
			html:
				'<p>Please sign this document up. Sara, secretary</p>' +
				'<h3>Testimony</h3>' +
				'<p>I bequeath my corporation, all my money and all my property to Sara, my current secretary.</p>' +
				'<p style="color: gray;">Hint: Sign as "Oligarenko".</p>' +
				'<p style="color: gray;">Hint: Leave blank if this is not something you want to sign up.</p>',
			answer: "",
			wrongMessage: "Did you read this? I bet you didn't! ;-)"
		})
	]
}));

OW.Level.registerItem(new OW.Level({
	id: "round5",
	theme: "siberia",
	countStone: 8,
	countOil: 2,
	countSurface: 5,
	allowPhoto: true,
	quests: [
		new OW.Jail({
			turn: 300,
			duration: 400
		})
	]
}));

OW.Level.registerItem(new OW.Level({
	id: "round6",
	theme: "siberia",
	countStone: 8,
	countOil: 3,
	countMetan: 3,
	countSurface: 5,
	allowPhoto: true,
	quests: [
		/*new OW.RandomFax({
			turn: 800,
			duration: 700
		})*/
	]
}));
/*
	countMetan: 0,
	countSurface: 5,
	countBeneath: 0,
	allowPhoto: true,
	allowAuto: true,
	quests: [
		new OW.Jail({
			turn: 100,
			duration: 250
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
*/