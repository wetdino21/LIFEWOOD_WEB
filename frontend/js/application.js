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
                        Swal.fire({
                            title: "Application Submitted!",
                            text: "You're one step closer! Your application has been successfully submitted.",
                            icon: "success",
                            confirmButtonColor: "#045940"
                        }).then(() => {
                            // Clear the form data and reset the form states
                            applyForm.reset();
                            const formElements = applyForm.elements;
                            for (let element of formElements) {
                                element.classList.remove('is-valid');
                                element.classList.remove('is-invalid');
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "Submission Failed",
                            text: data.error,
                            icon: "error",
                            confirmButtonColor: "#d33"
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: "Database Error",
                        text: "An error occurred while processing your request. Please try again later.",
                        icon: "error",
                        confirmButtonColor: "#d33"
                    });
                });
        }
    });
});