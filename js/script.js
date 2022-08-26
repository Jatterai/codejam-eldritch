import { Game } from './tryOne.js'
import * as myEvents from './events.js'

let chosenAntient, chosenLevel, game;

const antientsList = document.querySelector('.antients__row');
const antientsButton = document.getElementById('anitents-submit');
const levelList = document.querySelector('.level__list');
const startButton = document.querySelector('.level__button')


function chooser(e) {
	const li = e.target.closest('li');
	if (!li) return;

	const checked = e.currentTarget.querySelector('.checked');
	if (checked) checked.classList.remove('checked');
	li.classList.add('checked');
}

[antientsList, levelList].forEach(
	i => i.addEventListener('click', chooser)
);

function start(e) {
	[chosenAntient, chosenLevel] = [document.querySelector('.antient.checked').getAttribute('id'), document.querySelector('.level__item.checked').getAttribute('id')];
	game = new Game(chosenAntient, chosenLevel);

	//!!!
	const ancPic = document.getElementById('ancient-pic');
	ancPic.append(game.ancientCard());

	game.generateStages();
	const cardBack = document.querySelector('.game__cardBack');
	let currentStage = 0;
	let currentCard = 0;
	cardBack.addEventListener('click', (e) => {

		if (!game.deck[currentStage][currentCard]) {
			currentCard = 0;
			currentStage++;
		}

		if (!game.deck[currentStage]) {
			e.currentTarget.remove();
			return;
		}

		const cardContainer = document.getElementById('current-card');
		cardContainer.style.backgroundImage = `url('${game.deck[currentStage][currentCard]['cardFace']}')`;
		currentCard++;
	});

}

function fadeOut(e) {
	const button = e.target.closest('button.button');
	if (!button) return;
	const current = button.closest('section');
	const next = current.nextElementSibling;
	current.classList.add('off');
	setTimeout(() => {
		current.hidden = true;

		if (next && next.className.includes('off')) {
			next.hidden = '';
			next.classList.remove('off');
		};
	}, 700);
}


[antientsButton, startButton].forEach(i => {
	i.addEventListener('click', fadeOut)
})

startButton.addEventListener('click', start)