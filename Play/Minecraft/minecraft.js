document.addEventListener('DOMContentLoaded', function () {
	// current year
	const yearElement = document.querySelector('.current-year');
	if (yearElement) yearElement.textContent = new Date().getFullYear();

	// nav toggle for small screens
	const navToggle = document.querySelector('.nav-toggle');
	const navMenu = document.getElementById('primary-navigation');
	if (navToggle && navMenu) {
		navToggle.addEventListener('click', function () {
			const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!isOpen));
			navMenu.style.display = isOpen ? '' : 'flex';
		});

		// Close menu when a link is clicked
		const navLinks = navMenu.querySelectorAll('.nav-link');
		navLinks.forEach(link => {
			link.addEventListener('click', function () {
				navToggle.setAttribute('aria-expanded', 'false');
				navMenu.style.display = '';
			});
		});
	}

	// help links toggle (if present)
	document.querySelectorAll('.help-links-toggle').forEach(function (button) {
		button.addEventListener('click', function () {
			const target = document.getElementById(button.dataset.target);
			if (!target) return;
			const isOpen = button.getAttribute('aria-expanded') === 'true';
			button.setAttribute('aria-expanded', String(!isOpen));
			target.hidden = isOpen;
			button.textContent = isOpen ? 'Not working?' : 'Hide links';
		});
	});
});


