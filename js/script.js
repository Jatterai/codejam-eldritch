
let antients = document.querySelector('.antients__row');

antients.addEventListener('click', (e) => {
	let targ = e.target.closest('.antients__item');
	if (!targ) return;
	let selected = antients.querySelector('.selected');
	if (selected) selected.classList.remove('selected')

	targ.classList.add('selected')
})