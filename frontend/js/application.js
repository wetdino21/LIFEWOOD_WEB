document.addEventListener('DOMContentLoaded', function () {
    const applyForm = document.getElementById('applyForm');
    const applyModal = $('#applyModal');
    const successModal = $('#successModal');

    applyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const formElements = applyForm.elements;
        let isValid = true;

        for (let element of formElements) {
            if (element.id !== 'country_code') { // Exclude country code select element
                if (element.checkValidity() === false) {
                    element.classList.add('is-invalid');
                    element.classList.remove('is-valid');
                    isValid = false;
                } else {
                    element.classList.remove('is-invalid');
                    element.classList.add('is-valid');
                }
            }
        }

        if (isValid) {
            const formData = new FormData(applyForm);

            fetch('/api/apply', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        applyModal.modal('hide');
                        successModal.modal('show');
                    } else {
                        alert('Application submission failed: ' + data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });
});