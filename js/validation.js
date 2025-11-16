document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const cadastroForm = document.querySelector('form');
    const modal = document.getElementById('success-modal');
    const closeButton = document.querySelector('.close-button');

    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        });
    }

    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Validate CPF, Telefone, and CEP using their pattern attributes
            if (cpfInput && !cpfInput.checkValidity()) {
                alert('Por favor, insira um CPF válido no formato 000.000.000-00.');
                return;
            }
            if (telefoneInput && !telefoneInput.checkValidity()) {
                alert('Por favor, insira um telefone válido no formato (00) 00000-0000.');
                return;
            }
            if (cepInput && !cepInput.checkValidity()) {
                alert('Por favor, insira um CEP válido no formato 00000-000.');
                return;
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

    /* Hamburger Menu Logic */
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }
});
