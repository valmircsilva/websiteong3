// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('nav ul li a');
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');

    // Dummy project data for templating
    const projectsData = [
        {
            image: 'images/0002.jpg',
            title: 'Projeto Alpha',
            description: 'Espaço para listar e descrever sobre o projetos da ONG.'
        },
        {
            image: 'images/0003.jpg',
            title: 'Seja um Voluntário',
            description: 'Informações sobre como se tornar um voluntário.'
        },
        {
            image: '', // No image for this one
            title: 'Faça uma Doação',
            description: 'Instruções e informações sobre como fazer uma doação.'
        }
    ];

    // Simple templating function for project cards
    const createProjectCard = (project) => {
        return `
            <div class="card">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            </div>
        `;
    };

    // Function to load content dynamically
    const loadContent = async (url, pushState = true) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();

            // Create a temporary div to parse the fetched HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Extract the content within the <main> tag from the fetched HTML
            const newMainContent = tempDiv.querySelector('main').innerHTML;
            appContent.innerHTML = newMainContent;

            // If projects.html is loaded, render project cards
            if (url === 'projetos.html') {
                const gridContainer = appContent.querySelector('.grid-container');
                if (gridContainer) {
                    gridContainer.innerHTML = projectsData.map(createProjectCard).join('');
                }
            }

            // Update browser history
            if (pushState) {
                history.pushState({ path: url }, '', url);
            }

            // Re-attach event listeners for forms or other dynamic elements if needed
            if (url === 'cadastro.html') {
                initializeCadastroForm();
            }

        } catch (error) {
            console.error('Error loading content:', error);
            appContent.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        }
    };

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            loadContent(href);
            // Close hamburger menu if open
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.path) {
            loadContent(e.state.path, false); // Load content without pushing new state
        } else {
            // If no state, load the initial page content (inicio.html)
            loadContent('inicio.html', false);
        }
    });

    // Initial content load based on current URL or default to inicio.html
    const initialPath = window.location.pathname.split('/').pop();
    if (initialPath && initialPath !== 'index.html' && initialPath !== '') {
        loadContent(initialPath, false);
    } else {
        // Load the original content of index.html's main section
        loadContent('inicio.html', false);
        history.replaceState({ path: 'inicio.html' }, '', 'inicio.html');
    }


    // Hamburger Menu Logic (moved from validation.js)
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }

    // Placeholder for initializeCadastroForm - will be implemented in Phase 3
    const initializeCadastroForm = () => {
        const cpfInput = document.getElementById('cpf');
        const telefoneInput = document.getElementById('telefone');
        const cepInput = document.getElementById('cep');
        const cadastroForm = document.querySelector('form');
        const modal = document.getElementById('success-modal');
        const closeButton = document.querySelector('.close-button');

        // Helper function to show error messages
        const showError = (inputElement, message) => {
            inputElement.classList.add('invalid');
            const errorSpan = document.getElementById(`${inputElement.id}-error`);
            if (errorSpan) {
                errorSpan.textContent = message;
                errorSpan.style.display = 'block';
            }
        };

        // Helper function to hide error messages
        const hideError = (inputElement) => {
            inputElement.classList.remove('invalid');
            const errorSpan = document.getElementById(`${inputElement.id}-error`);
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }
        };

        // CPF validation function (more robust)
        const validateCPF = (cpf) => {
            cpf = cpf.replace(/[^\d]+/g, ''); // Remove non-digits
            if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
                return false;
            }
            let sum = 0;
            let remainder;
            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
            remainder = (sum * 10) % 11;
            if ((remainder === 10) || (remainder === 11)) {
                remainder = 0;
            }
            if (remainder !== parseInt(cpf.substring(9, 10))) {
                return false;
            }
            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            remainder = (sum * 10) % 11;
            if ((remainder === 10) || (remainder === 11)) {
                remainder = 0;
            }
            if (remainder !== parseInt(cpf.substring(10, 11))) {
                return false;
            }
            return true;
        };


        if (cpfInput) {
            cpfInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;

                if (e.target.value.length === 14 && !validateCPF(e.target.value)) {
                    showError(e.target, 'CPF inválido.');
                } else if (e.target.value.length === 14 && validateCPF(e.target.value)) {
                    hideError(e.target);
                } else if (e.target.value.length < 14 && e.target.value.length > 0) {
                    showError(e.target, 'CPF incompleto.');
                } else {
                    hideError(e.target);
                }
            });
            cpfInput.addEventListener('blur', function(e) {
                if (e.target.value.length > 0 && !validateCPF(e.target.value)) {
                    showError(e.target, 'CPF inválido.');
                } else {
                    hideError(e.target);
                }
            });
        }

        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;

                if (e.target.value.length > 0 && !e.target.checkValidity()) {
                    showError(e.target, 'Telefone inválido. Formato: (00) 00000-0000.');
                } else {
                    hideError(e.target);
                }
            });
            telefoneInput.addEventListener('blur', function(e) {
                if (e.target.value.length > 0 && !e.target.checkValidity()) {
                    showError(e.target, 'Telefone inválido. Formato: (00) 00000-0000.');
                } else {
                    hideError(e.target);
                }
            });
        }

        if (cepInput) {
            cepInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/^(\d{5})(\d)/, '$1-$2');
                e.target.value = value;

                if (e.target.value.length > 0 && !e.target.checkValidity()) {
                    showError(e.target, 'CEP inválido. Formato: 00000-000.');
                } else {
                    hideError(e.target);
                }
            });
            cepInput.addEventListener('blur', function(e) {
                if (e.target.value.length > 0 && !e.target.checkValidity()) {
                    showError(e.target, 'CEP inválido. Formato: 00000-000.');
                } else {
                    hideError(e.target);
                }
            });
        }

        // General validation for required fields on blur
        const requiredInputs = cadastroForm ? cadastroForm.querySelectorAll('input[required], select[required]') : [];
        requiredInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (!input.checkValidity()) {
                    showError(input, 'Este campo é obrigatório.');
                } else {
                    hideError(input);
                }
            });
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    hideError(input);
                }
            });
        });


        if (cadastroForm) {
            cadastroForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevent default form submission

                let formIsValid = true;

                // Validate all required fields
                requiredInputs.forEach(input => {
                    if (!input.checkValidity()) {
                        showError(input, 'Este campo é obrigatório.');
                        formIsValid = false;
                    } else {
                        hideError(input);
                    }
                });

                // Specific validations
                if (cpfInput && (cpfInput.value.length > 0 && !validateCPF(cpfInput.value))) {
                    showError(cpfInput, 'CPF inválido.');
                    formIsValid = false;
                }
                if (telefoneInput && (telefoneInput.value.length > 0 && !telefoneInput.checkValidity())) {
                    showError(telefoneInput, 'Telefone inválido. Formato: (00) 00000-0000.');
                    formIsValid = false;
                }
                if (cepInput && (cepInput.value.length > 0 && !cepInput.checkValidity())) {
                    showError(cepInput, 'CEP inválido. Formato: 00000-000.');
                    formIsValid = false;
                }

                if (!formIsValid) {
                    return; // Stop submission if form is invalid
                }

                const formData = new FormData(cadastroForm);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }

                // Get existing data or initialize an empty array
                let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
                registrations.push(data);
                localStorage.setItem('registrations', JSON.stringify(registrations));

                if(modal) modal.style.display = 'flex'; // Show the modal
                cadastroForm.reset(); // Clear the form
                // Hide all error messages after successful submission
                requiredInputs.forEach(input => hideError(input));
            });
        }

        // Modal closing logic
        if (modal) {
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }
            window.addEventListener('click', (e) => {
                if (e.target == modal) {
                    modal.style.display = 'none';
                }
            });
        }
    };
});