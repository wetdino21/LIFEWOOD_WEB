document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');

    // Toggle password visibility
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Custom email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    emailInput.addEventListener('input', function () {
        if (isValidEmail(emailInput.value)) {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid'); // Optional for green check mark
        } else {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        }
    });

    // Form validation and submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (loginForm.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Handle form submission
            const formData = new FormData(loginForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        Swal.fire({
                            title: "Login Successful!",
                            icon: "success",
                            confirmButtonColor: "#045940"
                        }).then(() => {
                            // Save the token and redirect to the admin dashboard
                            localStorage.setItem('token', data.token);
                            window.location.href = '/admin_dashboard.html';
                        });
                    } else {
                        Swal.fire({
                            title: "Login Failed",
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
        loginForm.classList.add('was-validated');
    });
});