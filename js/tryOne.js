import { ancientsData } from './data/ancients.js';
import {
	brownCards,
	blueCards,
	greenCards,
} from './data/mythicCards/index.js';


class Game {
	constructor(ancient, level) {
		this.ancient = ancientsData.find(i => i.name = ancient);
		this.level = level;
		this.requared = {
			greenCards: this.ancient.firstStage.greenCards + this.ancient.secondStage.greenCards + this.ancient.thirdStage.greenCards,
			blueCards: this.ancient.firstStage.blueCards + this.ancient.secondStage.blueCards + this.ancient.thirdStage.blueCards,
			brownCards: this.ancient.firstStage.brownCards + this.ancient.secondStage.brownCards + this.ancient.thirdStage.brownCards,
		}
	}

	generateCardDeck() {

	}
}

export { Game };