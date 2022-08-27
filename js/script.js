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
	const img = game.ancientCard();
	img.onload = () => ancPic.append(img);

	const tracker = document.querySelector('.game__tracker');
	myEvents.trackerStart(game.ancient);

	const cardBack = document.querySelector('.game__cardBack');
	let currentStage = 0;
	let currentCard = 0;

	cardBack.addEventListener('click', function nextCard(e) {
		const cardContainer = document.getElementById('current-card');
		const cardImage = document.createElement('img');
		cardImage.src = game.deck[currentStage][currentCard]['cardFace'];
		cardImage.onload = () => {
			cardContainer.style.background = `url('${cardImage.src}')`
		}
		const circlesContainers = document.querySelectorAll('.stage__circles');
		let currentCircle = circlesContainers[currentStage]
			.querySelector(`[data-color=${game.deck[currentStage][currentCard]['color']}]`);

		currentCircle.textContent = `${+currentCircle.textContent - 1}`;
		if (currentCircle.textContent === '0') {
			currentCircle.classList.add('disabled')
		}

		currentCard++;

		if (!game.deck[currentStage][currentCard]) {
			currentCard = 0;
			currentStage++;
		}

		if (!game.deck[currentStage]) {
			e.currentTarget.classList.add('closed')
			e.currentTarget.removeEventListener('click', nextCard);
			return;
		}
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

startButton.addEventListener('click', start);

