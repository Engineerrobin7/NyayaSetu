const API_URL = 'http://localhost:5000/api';

// Admin Login
const adminLoginForm = document.getElementById('admin-login-form');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;
        
        try {
            const response = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                window.location.href = 'admin-dashboard.html';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed');
        }
    });
}

// Check if on admin dashboard
if (window.location.pathname.includes('admin-dashboard')) {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
        window.location.href = 'admin-login.html';
    } else {
        loadDashboardStats();
        setupNavigation();
    }
}

async function loadDashboardStats() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const stats = await response.json();
        
        document.getElementById('total-users').textContent = stats.totalUsers;
        document.getElementById('total-lawyers').textContent = stats.totalLawyers;
        document.getElementById('total-bookings').textContent = stats.totalBookings;
        document.getElementById('total-revenue').textContent = `₹${stats.totalRevenue}`;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

function setupNavigation() {
    const links = document.querySelectorAll('.admin-sidebar a');
    
    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (link.id === 'logout') {
                localStorage.removeItem('adminToken');
                window.location.href = 'admin-login.html';
                return;
            }
            
            const target = link.getAttribute('href').substring(1);
            
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            
            document.querySelectorAll('.admin-sidebar a').forEach(l => {
                l.classList.remove('active');
            });
            
            document.getElementById(target).classList.add('active');
            link.classList.add('active');
            
            if (target === 'users') await loadUsers();
            if (target === 'lawyers') await loadLawyers();
            if (target === 'bookings') await loadBookings();
        });
    });
}

async function loadUsers() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/admin/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const users = await response.json();
        const tbody = document.querySelector('#users-table tbody');
        tbody.innerHTML = '';
        
        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone || 'N/A'}</td>
                    <td>${new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                        <button onclick="deleteUser('${user.id}')">Delete</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

async function loadLawyers() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/admin/lawyers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const lawyers = await response.json();
        const tbody = document.querySelector('#lawyers-table tbody');
        tbody.innerHTML = '';
        
        lawyers.forEach(lawyer => {
            const row = `
                <tr>
                    <td>${lawyer.name}</td>
                    <td>${lawyer.email}</td>
                    <td>${lawyer.specialization}</td>
                    <td>${lawyer.isActive ? 'Active' : 'Inactive'}</td>
                    <td>${lawyer.isVerified ? 'Verified' : 'Pending'}</td>
                    <td>
                        ${!lawyer.isVerified ? `<button onclick="verifyLawyer('${lawyer.id}')">Verify</button>` : ''}
                        <button onclick="toggleLawyerStatus('${lawyer.id}')">${lawyer.isActive ? 'Deactivate' : 'Activate'}</button>
                        <button onclick="deleteLawyer('${lawyer.id}')">Delete</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error loading lawyers:', error);
    }
}

async function loadBookings() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/admin/bookings`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const bookings = await response.json();
        const tbody = document.querySelector('#bookings-table tbody');
        tbody.innerHTML = '';
        
        bookings.forEach(booking => {
            const row = `
                <tr>
                    <td>${booking.User?.name || 'N/A'}</td>
                    <td>${booking.Lawyer?.name || 'N/A'}</td>
                    <td>${new Date(booking.date).toLocaleDateString()}</td>
                    <td>${booking.status}</td>
                    <td>₹${booking.amount}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

async function verifyLawyer(id) {
    const token = localStorage.getItem('adminToken');
    
    try {
        await fetch(`${API_URL}/admin/lawyers/${id}/verify`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        alert('Lawyer verified successfully');
        loadLawyers();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function toggleLawyerStatus(id) {
    const token = localStorage.getItem('adminToken');
    
    try {
        await fetch(`${API_URL}/admin/lawyers/${id}/toggle-status`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        alert('Lawyer status updated');
        loadLawyers();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    const token = localStorage.getItem('adminToken');
    
    try {
        await fetch(`${API_URL}/admin/users/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        alert('User deleted');
        loadUsers();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteLawyer(id) {
    if (!confirm('Are you sure you want to delete this lawyer?')) return;
    
    const token = localStorage.getItem('adminToken');
    
    try {
        await fetch(`${API_URL}/admin/lawyers/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        alert('Lawyer deleted');
        loadLawyers();
    } catch (error) {
        console.error('Error:', error);
    }
}
