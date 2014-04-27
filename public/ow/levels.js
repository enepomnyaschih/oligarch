OW.Level.registerItem(new OW.Level({
	id: "round1",
	name: "Drill",
	theme: "siberia",
	countStone: 4,
	countOil: 1
}));

OW.Level.registerItem(new OW.Level({
	id: "round2",
	name: "Greenpeace",
	theme: "siberia",
	countStone: 6,
	countOil: 2,
	countSurface: 3
}));

OW.Level.registerItem(new OW.Level({
	id: "round3",
	name: "Paparazzi",
	theme: "siberia",
	countStone: 5,
	countOil: 2,
	countSurface: 5,
	probPhoto: .4
}));

OW.Level.registerItem(new OW.Level({
	id: "round4",
	name: "Bequest",
	theme: "siberia",
	countStone: 6,
	countOil: 4,
	countSurface: 3,
	probPhoto: .2,
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
				'<p>Assign Anna Shoutman to a spy operation against Greenpeace to discover their in-house ' +
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
				'<h3>Bequest</h3>' +
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
	name: "Judo buddy",
	theme: "siberia",
	countStone: 8,
	countOil: 4,
	countSurface: 5,
	probPhoto: .2,
	quests: [
		new OW.Jail({
			turn: 200,
			duration: 400
		})
	]
}));

OW.Level.registerItem(new OW.Level({
	id: "round6",
	name: "Big bang",
	theme: "siberia",
	countStone: 8,
	countOil: 3,
	countMetan: 8,
	countSurface: 6,
	probPhoto: .2,
	quests: [
		new OW.RandomFax({
			turn: 500,
			duration: 800
		}),
		new OW.RandomFax({
			turn: 1400,
			duration: 750
		}),
		new OW.RandomFax({
			turn: 2500,
			duration: 700
		})
	]
}));

OW.Level.registerItem(new OW.Level({
	id: "round7",
	name: "Formula 1",
	theme: "siberia",
	countStone: 8,
	countOil: 4,
	countMetan: 5,
	countSurface: 5,
	probAuto: 1,
	quests: [
		new OW.Jail({
			turn: 1000,
			duration: 350
		})
	]
}));

OW.Level.registerItem(new OW.Level({
	id: "round8",
	name: "Like Ceasar",
	theme: "siberia",
	countStone: 10,
	countOil: 4,
	countMetan: 8,
	countSurface: 5,
	probPhoto: .2,
	probAuto: .4,
	quests: [
		new OW.RandomFax({
			turn: 300,
			duration: 700
		}),
		new OW.Jail({
			turn: 1100,
			duration: 300
		}),
		new OW.RandomFax({
			turn: 1500,
			duration: 900
		}),
		new OW.RandomFax({
			turn: 2500,
			duration: 850
		}),
		new OW.RandomFax({
			turn: 3500,
			duration: 800
		})
	]
}));

OW.Level.registerItem(new OW.Level({
	id: "round9",
	name: "Bitterness",
	theme: "siberia",
	countStone: 15,
	countOil: 8,
	countMetan: 8,
	countSurface: 10,
	probPhoto: .2,
	probAuto: .3,
	quests: [
		new OW.RandomFax({
			turn: 1000,
			duration: 900
		}),
		new OW.RandomFax({
			turn: 2000,
			duration: 800
		}),
		new OW.RandomFax({
			turn: 3000,
			duration: 700
		}),
		new OW.RandomFax({
			turn: 4000,
			duration: 700
		}),
		new OW.RandomFax({
			turn: 5000,
			duration: 700
		}),
		new OW.RandomFax({
			turn: 6000,
			duration: 700
		})
	]
}));
