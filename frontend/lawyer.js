const API_URL = 'http://localhost:5000/api';

// Lawyer Registration
const lawyerRegisterForm = document.getElementById('lawyer-register-form');
if (lawyerRegisterForm) {
    lawyerRegisterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value,
            specialization: document.getElementById('specialization').value,
            experience: parseInt(document.getElementById('experience').value),
            location: document.getElementById('location').value,
            fees: parseInt(document.getElementById('fees').value),
            barCouncilId: document.getElementById('bar-council-id').value,
            bio: document.getElementById('bio').value
        };
        
        try {
            const response = await fetch(`${API_URL}/lawyers/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('Registration successful! Awaiting admin verification.');
                window.location.href = 'lawyer-login.html';
            } else {
                alert(result.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed');
        }
    });
}

// Check if on lawyer dashboard
if (window.location.pathname.includes('lawyer-dashboard')) {
    const token = localStorage.getItem('lawyerToken');
    
    if (!token) {
        window.location.href = 'lawyer-login.html';
    } else {
        loadLawyerDashboard();
    }
}

async function loadLawyerDashboard() {
    const token = localStorage.getItem('lawyerToken');
    
    // Load bookings
    try {
        const response = await fetch(`${API_URL}/bookings/lawyer`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        displayBookings(data.bookings);
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
    
    // Setup tab navigation
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            
            document.querySelectorAll('.tab-content').forEach(section => {
                section.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-link').forEach(l => {
                l.classList.remove('active');
            });
            
            document.getElementById(target).classList.add('active');
            link.classList.add('active');
            
            if (target === 'reviews') loadReviews();
            if (target === 'availability') loadAvailability();
        });
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('lawyerToken');
        window.location.href = 'lawyer-login.html';
    });
}

function displayBookings(bookings) {
    const container = document.getElementById('bookings-list');
    container.innerHTML = '';
    
    if (!bookings || bookings.length === 0) {
        container.innerHTML = '<p>No bookings yet</p>';
        return;
    }
    
    bookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <h3>${booking.User?.name || 'N/A'}</h3>
            <p>Date: ${new Date(booking.date).toLocaleDateString()}</p>
            <p>Time: ${booking.startTime || 'N/A'}</p>
            <p>Type: ${booking.consultationType || 'N/A'}</p>
            <p>Status: ${booking.status}</p>
            <p>Amount: ₹${booking.amount}</p>
            ${booking.notes ? `<p>Notes: ${booking.notes}</p>` : ''}
        `;
        container.appendChild(card);
    });
}

async function loadReviews() {
    const token = localStorage.getItem('lawyerToken');
    const lawyerId = JSON.parse(atob(token.split('.')[1])).id;
    
    try {
        const response = await fetch(`${API_URL}/reviews/lawyer/${lawyerId}`);
        const reviews = await response.json();
        
        const container = document.getElementById('reviews-list');
        container.innerHTML = '';
        
        if (reviews.length === 0) {
            container.innerHTML = '<p>No reviews yet</p>';
            return;
        }
        
        reviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <h4>${review.User?.name || 'Anonymous'}</h4>
                <p>Rating: ${'⭐'.repeat(review.rating)}</p>
                <p>${review.comment}</p>
                <small>${new Date(review.created_at).toLocaleDateString()}</small>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

async function loadAvailability() {
    const token = localStorage.getItem('lawyerToken');
    const lawyerId = JSON.parse(atob(token.split('.')[1])).id;
    
    try {
        const response = await fetch(`${API_URL}/availability/lawyer/${lawyerId}`);
        const availability = await response.json();
        
        const container = document.getElementById('availability-list');
        container.innerHTML = '<h3>Current Availability</h3>';
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        availability.forEach(slot => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${days[slot.dayOfWeek]}: ${slot.startTime} - ${slot.endTime}</p>
                <button onclick="deleteAvailability('${slot.id}')">Delete</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading availability:', error);
    }
}

// Availability form
const availabilityForm = document.getElementById('availability-form');
if (availabilityForm) {
    availabilityForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('lawyerToken');
        const data = {
            dayOfWeek: parseInt(document.getElementById('day-of-week').value),
            startTime: document.getElementById('start-time').value,
            endTime: document.getElementById('end-time').value,
            isAvailable: true
        };
        
        try {
            const response = await fetch(`${API_URL}/availability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Availability added');
                loadAvailability();
                availabilityForm.reset();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

async function deleteAvailability(id) {
    const token = localStorage.getItem('lawyerToken');
    
    try {
        await fetch(`${API_URL}/availability/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        loadAvailability();
    } catch (error) {
        console.error('Error:', error);
    }
}
