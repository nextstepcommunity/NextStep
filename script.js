document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isOpen));
            navMenu.classList.toggle('active');
        });

        // Close menu after clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Help link toggles
    document.querySelectorAll('.help-links-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const target = document.getElementById(button.dataset.target);
            if (!target) return;

            const isOpen = !target.hidden;
            target.hidden = isOpen;
            button.setAttribute('aria-expanded', String(!isOpen));
            button.textContent = isOpen ? 'Not working?' : 'Hide alternatives';
        });
    });

    // Contact form selection and submission handling
    const contactTypeSelect = document.getElementById('contact-type');
    const contactForm = document.getElementById('contact-form');
    const contactHint = document.getElementById('contact-hint');
    const contactSuccess = document.getElementById('contact-success');

    if (contactTypeSelect && contactForm && contactHint) {
        const typeLabels = {
            appeal: 'Appeal',
            report: 'Report',
            apply: 'Application',
            feedback: 'Feedback'
        };

        const queryType = new URLSearchParams(window.location.search).get('type') || window.location.hash.replace(/^#/, '');
        const validTypes = Object.keys(typeLabels);
        const initialType = validTypes.includes(queryType) ? queryType : 'appeal';

        function updateContactContext(type) {
            contactTypeSelect.value = type;
            contactHint.textContent = `You are filling out the ${typeLabels[type].toLowerCase()} form.`;
            contactSuccess.hidden = true;
            contactTypeSelect.closest('.contact-controls').querySelector('label').textContent = type === 'apply' ? 'I want to apply for' : 'I need help with';
        }

        updateContactContext(initialType);

        contactTypeSelect.addEventListener('change', event => {
            const selectedType = event.target.value;
            if (!validTypes.includes(selectedType)) return;
            updateContactContext(selectedType);
            const url = new URL(window.location.href);
            url.searchParams.set('type', selectedType);
            history.replaceState(null, '', url.toString());
        });

        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            contactSuccess.hidden = false;
            contactSuccess.textContent = `${typeLabels[contactTypeSelect.value]} selected. This template page does not send data yet.`;
        });
    }
});
