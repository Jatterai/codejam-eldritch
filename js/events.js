function trackerStart(anc) {

	const circles = document.querySelectorAll('.stage__circle');

	circles.forEach(i => {
		i.textContent = anc[i.dataset.stage][`${i.dataset.color}Cards`];
		if (i.textContent === '0') {
			i.classList.add('disabled')
		}
	})
}

export { trackerStart };