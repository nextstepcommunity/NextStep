document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.help-links-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var target = document.getElementById(button.dataset.target);
      if (!target) return;

      var isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      target.hidden = isOpen;
      button.textContent = isOpen ? 'Not working?' : 'Hide links';
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {

        navToggle.addEventListener('click', () => {

            const isOpen =
                navToggle.getAttribute('aria-expanded') === 'true';

            navToggle.setAttribute(
                'aria-expanded',
                String(!isOpen)
            );

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

            const target =
                document.getElementById(button.dataset.target);

            if (!target) return;

            const isOpen =
                button.getAttribute('aria-expanded') === 'true';

            button.setAttribute(
                'aria-expanded',
                String(!isOpen)
            );

            target.hidden = isOpen;

            button.textContent =
                isOpen ? 'Not working?' : 'Hide links';
        });
    });
});