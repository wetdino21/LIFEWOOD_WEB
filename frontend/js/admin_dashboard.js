$(document).ready(function () {
    $('#applicationsTable').DataTable({
        ajax: {
            url: '/api/fetch_applications',
            dataSrc: ''
        },
        columns: [
            { data: 'first_name' },
            { data: 'last_name' },
            { data: 'email' },
            { data: 'phone_number' },
            { data: 'address' },
            { data: 'position' },
            {
                data: 'created_at',
                render: function (data, type, row) {
                    return formatDate(data);
                }
            },
            {
                data: 'resume',
                render: function (data, type, row) {
                    return `<a href="/api/fetch_applications/${row.id}/resume" target="_blank" class="btn">
                                <i class="fa-solid fa-file-pdf" style="color: #f00000;"></i> View
                            </a>`;
                }
            }
        ]
    });

    // Logout button functionality
    $('#logoutButton').click(function () {
        localStorage.removeItem('token');
        window.location.href = 'login_admin.html';
    });
});

// Function to format the date
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Manila' // Set the appropriate time zone
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
}

// Check authentication on every page load
if (!localStorage.getItem('token')) {
    window.location.href = 'login_admin.html';
}

// Logout button functionality
$('#logoutButton').click(function () {
    localStorage.removeItem('token');
    window.location.href = 'login_admin.html';
});

// Prevent going back to the dashboard after logout
window.addEventListener('pageshow', function (event) {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login_admin.html';
    }
});

$('#logoutButton').click(function () {
    localStorage.removeItem('token');
    history.replaceState(null, null, 'login_admin.html'); // Replace dashboard with login in history
    window.location.href = 'login_admin.html';
});
