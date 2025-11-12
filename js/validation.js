document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const cadastroForm = document.querySelector('form');

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

            const formData = new FormData(cadastroForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Get existing data or initialize an empty array
            let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
            registrations.push(data);
            localStorage.setItem('registrations', JSON.stringify(registrations));

            alert('Dados cadastrados com sucesso no armazenamento local!');
            cadastroForm.reset(); // Clear the form
        });
    }
});
