document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Mobile menu
    // ==========================================

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


        document.querySelectorAll('.nav-link').forEach(link => {

            link.addEventListener('click', () => {

                navMenu.classList.remove('active');

                navToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

            });

        });

    }


    // ==========================================
    // Help link toggles
    // ==========================================

    document
        .querySelectorAll('.help-links-toggle')
        .forEach(button => {

            button.addEventListener('click', () => {

                const target =
                    document.getElementById(
                        button.dataset.target
                    );

                if (!target) return;

                const isOpen = !target.hidden;

                target.hidden = isOpen;

                button.setAttribute(
                    'aria-expanded',
                    String(!isOpen)
                );

                button.textContent =
                    isOpen
                        ? 'Not working?'
                        : 'Hide links';

            });

        });


    // ==========================================
    // Form tabs
    // ==========================================

    const tabs =
        document.querySelectorAll('.form-tab');

    const panels =
        document.querySelectorAll('.form-panel');

    // This script is also used on pages without forms.
    // If there are no forms, stop here.
    if (!tabs.length || !panels.length) {
        return;
    }


    const validForms = [
        'apply',
        'report',
        'appeal',
        'feedback'
    ];


    // ==========================================
    // Forms section
    // ==========================================

    const formsSection =
        document.getElementById('forms');


    // ==========================================
    // Scroll to Forms
    // ==========================================

    function scrollToForms() {

        if (!formsSection) return;

        setTimeout(() => {

            const header =
                document.querySelector('header');

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const sectionTop =
                formsSection.getBoundingClientRect().top +
                window.scrollY;

            window.scrollTo({
                top: Math.max(
                    0,
                    sectionTop - headerHeight
                ),
                behavior: 'smooth'
            });

        }, 100);

    }


    // ==========================================
    // Switch form
    // ==========================================

    function switchForm(formName, updateUrl = true) {

        if (!validForms.includes(formName)) {
            formName = 'apply';
        }


        // ------------------------------
        // Update tabs
        // ------------------------------

        tabs.forEach(tab => {

            const isActive =
                tab.dataset.form === formName;

            tab.classList.toggle(
                'active',
                isActive
            );

            tab.setAttribute(
                'aria-selected',
                String(isActive)
            );

        });


        // ------------------------------
        // Update panels
        // ------------------------------

        panels.forEach(panel => {

            const isActive =
                panel.dataset.panel === formName;

            panel.classList.toggle(
                'active',
                isActive
            );

            panel.hidden = !isActive;

        });


        // ------------------------------
        // Update URL
        // ------------------------------

        if (updateUrl) {

            const url =
                new URL(window.location.href);

            url.searchParams.delete('type');

            url.hash = formName;

            history.replaceState(
                null,
                '',
                url.toString()
            );

        }

    }


    // ==========================================
    // Clean URL routes
    // ==========================================

    const cleanRoutes = {
        '/apply': 'apply',
        '/report': 'report',
        '/appeal': 'appeal',
        '/feedback': 'feedback'
    };


    const pathname =
        window.location.pathname
            .replace(/\/+$/, '')
            .toLowerCase();


    const routeForm =
        cleanRoutes[pathname];


    // ==========================================
    // Read URL
    // ==========================================

    const url =
        new URL(window.location.href);


    const queryForm =
        url.searchParams.get('type');


    const hashForm =
        url.hash.substring(1).toLowerCase();


    // ==========================================
    // Determine initial form
    // ==========================================

    let initialForm = 'apply';


    if (routeForm) {

        initialForm = routeForm;

    } else if (validForms.includes(queryForm)) {

        initialForm = queryForm;

    } else if (validForms.includes(hashForm)) {

        initialForm = hashForm;

    }


    // ==========================================
    // Open selected form
    // ==========================================

    switchForm(
        initialForm,
        false
    );


    // ==========================================
    // Determine whether we should scroll
    // ==========================================

    const cameFromFormLink =
        Boolean(
            routeForm ||
            validForms.includes(queryForm) ||
            validForms.includes(hashForm)
        );


    // ==========================================
    // Scroll when opening a form link
    // ==========================================

    if (cameFromFormLink) {

        scrollToForms();

    }


    // ==========================================
    // Tab clicks
    // ==========================================

    tabs.forEach(tab => {

        tab.addEventListener('click', () => {

            const formName =
                tab.dataset.form;

            switchForm(formName);

            scrollToForms();

        });

    });


    // ==========================================
    // Hash changes
    // ==========================================

    window.addEventListener(
        'hashchange',
        () => {

            const hash =
                window.location.hash
                    .substring(1)
                    .toLowerCase();

            if (validForms.includes(hash)) {

                switchForm(
                    hash,
                    false
                );

                scrollToForms();

            }

        }
    );


    // ==========================================
    // Browser back / forward
    // ==========================================

    window.addEventListener(
        'popstate',
        () => {

            const currentUrl =
                new URL(window.location.href);


            const currentQueryForm =
                currentUrl.searchParams.get('type');


            const currentHash =
                currentUrl.hash
                    .substring(1)
                    .toLowerCase();


            let form = 'apply';


            if (
                validForms.includes(
                    currentQueryForm
                )
            ) {

                form = currentQueryForm;

            } else if (
                validForms.includes(
                    currentHash
                )
            ) {

                form = currentHash;

            }


            switchForm(
                form,
                false
            );

        }
    );


    // ==========================================
    // Keyboard navigation
    // ==========================================

    tabs.forEach((tab, index) => {

        tab.addEventListener(
            'keydown',
            event => {

                let newIndex = index;


                if (event.key === 'ArrowRight') {

                    newIndex =
                        (index + 1) % tabs.length;

                }


                if (event.key === 'ArrowLeft') {

                    newIndex =
                        (index - 1 + tabs.length) %
                        tabs.length;

                }


                if (event.key === 'Home') {

                    newIndex = 0;

                }


                if (event.key === 'End') {

                    newIndex =
                        tabs.length - 1;

                }


                if (newIndex !== index) {

                    event.preventDefault();


                    tabs[newIndex].focus();


                    switchForm(
                        tabs[newIndex].dataset.form
                    );


                    scrollToForms();

                }

            }
        );

    });

});
