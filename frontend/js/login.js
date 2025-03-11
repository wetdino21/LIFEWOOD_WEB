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
                    alert('Login successful!');
                    // Save the token and redirect to the admin dashboard
                    localStorage.setItem('token', data.token);
                    window.location.href = '/admin_dashboard.html';
                } else {
                    alert('Login failed: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        loginForm.classList.add('was-validated');
    });
});