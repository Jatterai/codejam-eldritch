import { Game } from './tryOne.js'


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
	const button = e.target.closest('button.button');
	if (!button) return;
	[chosenAntient, chosenLevel] = [document.querySelector('.antient.checked').getAttribute('id'), document.querySelector('.level__item.checked').getAttribute('id')];


	game = new Game(chosenAntient, chosenLevel);
}

function fadeOut(e) {
	const button = e.target.closest('button.button');
	if (!button) return;
	const current = button.closest('section');
	const next = current.nextElementSibling;
	current.classList.add('off');
	setTimeout(() => {
		current.hidden = true;

		if (next && next.className.includes('level off')) {
			next.hidden = '';
			next.classList.remove('off');
		};
	}, 700);
}


[antientsButton, startButton].forEach(i => {
	i.addEventListener('click', fadeOut)
})

startButton.addEventListener('click', start)