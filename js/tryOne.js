import { ancientsData } from './data/ancients.js';
import { levels } from './data/levels.js'
import {
	brownCards,
	blueCards,
	greenCards,
} from './data/mythicCards/index.js';

class Game {
	constructor(ancient, level) {
		this.ancient = ancientsData.find(i => i['name'] === ancient);
		this.level = levels[level];
		this.requared = {
			greenCards: this.ancient.firstStage.greenCards + this.ancient.secondStage.greenCards + this.ancient.thirdStage.greenCards,
			blueCards: this.ancient.firstStage.blueCards + this.ancient.secondStage.blueCards + this.ancient.thirdStage.blueCards,
			brownCards: this.ancient.firstStage.brownCards + this.ancient.secondStage.brownCards + this.ancient.thirdStage.brownCards,
		}

		this.deck = this.generateStages();
	}

	ancientCard() {

		let img = document.createElement('img');
		img.setAttribute('alt', '');
		img.setAttribute('src', `${this.ancient['cardFace']}`);

		return img;
	}

	randomiser(max, min = 0) {
		return Math.floor((Math.random() * (max - min + 1)) + min)
	}

	generateDeck() {
		const gameDeck = {
			greenCards: greenCards.filter(i => this.level.includes(i['difficulty'])),
			blueCards: blueCards.filter(i => this.level.includes(i['difficulty'])),
			brownCards: brownCards.filter(i => this.level.includes(i['difficulty'])),
		};

		for (let color in gameDeck) {
			if (gameDeck[color].length < this.requared[color]) {
				let addDeck = (color === 'greenCards' ? greenCards :
					color === 'blueCards' ? blueCards : brownCards)
					.filter(i => i['difficulty'] === 'normal')
					.sort(i => Math.random() - 0.5);

				while (gameDeck[color].length < this.requared[color]) {
					gameDeck[color].push(
						addDeck.pop()
					)
				}
				addDeck = null;
			}
		}

		for (let c in gameDeck) {
			gameDeck[c].sort(i => Math.random() - 0.5).sort(i => Math.random() - 0.5)
		}

		return gameDeck;
	}

	generateStages() {
		const allCards = this.generateDeck();

		const deck = []

		for (let stage in this.ancient) {
			if (!stage.includes('Stage')) continue;

			const arr = [];
			for (let color in this.ancient[stage]) {
				const count = this.ancient[stage][color];

				for (let i = 1; i <= count; i++) {
					arr.push(allCards[color].pop());
				}
			}

			arr.sort(i => Math.random() > 0.5 ? 1 : -1);
			deck.push(arr);
		}

		return deck;
	}


}

export { Game };