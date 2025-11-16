// Additional user features for NyayaSetu
const API_URL = "http://localhost:5000/api";

// Load Notifications
async function loadNotifications() {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
        const response = await fetch(`${API_URL}/notifications/unread`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const notifications = await response.json();
        
        const bell = document.querySelector('.notification-bell');
        if (notifications.length > 0) {
            bell.innerHTML = `<i class="fa-solid fa-bell fa-xl" style="color: #FFD43B;"></i><span class="badge">${notifications.length}</span>`;
        }
        
        // Show notifications dropdown
        bell.addEventListener('click', () => {
            showNotificationsDropdown(notifications);
        });
    } catch (error) {
        console.error('Error loading notifications:', error);
    }
}

function showNotificationsDropdown(notifications) {
    const dropdown = document.createElement('div');
    dropdown.className = 'notifications-dropdown';
    dropdown.innerHTML = '<h3>Notifications</h3>';
    
    if (notifications.length === 0) {
        dropdown.innerHTML += '<p>No new notifications</p>';
    } else {
        notifications.forEach(notif => {
            const item = document.createElement('div');
            item.className = 'notification-item';
            item.innerHTML = `
                <h4>${notif.title}</h4>
                <p>${notif.message}</p>
                <small>${new Date(notif.created_at).toLocaleString()}</small>
            `;
            item.addEventListener('click', () => markNotificationRead(notif.id));
            dropdown.appendChild(item);
        });
    }
    
    document.body.appendChild(dropdown);
    
    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }, 100);
}

async function markNotificationRead(id) {
    const token = localStorage.getItem('token');
    
    try {
        await fetch(`${API_URL}/notifications/${id}/read`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        loadNotifications();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Enhanced Lawyer Search with Filters
async function searchLawyers() {
    const specialization = document.getElementById('specialization')?.value;
    const location = document.getElementById('location')?.value;
    const keywords = document.getElementById('keywords')?.value;
    
    let url = `${API_URL}/lawyers?`;
    if (specialization) url += `specialization=${specialization}&`;
    if (location) url += `location=${location}&`;
    if (keywords) url += `search=${keywords}&`;
    
    try {
        const response = await fetch(url);
        const lawyers = await response.json();
        displayLawyers(lawyers);
    } catch (error) {
        console.error('Error searching lawyers:', error);
    }
}

function displayLawyers(lawyers) {
    const container = document.querySelector('.lawyer-container');
    container.innerHTML = '';
    
    if (lawyers.length === 0) {
        container.innerHTML = '<p>No lawyers found</p>';
        return;
    }
    
    lawyers.forEach(lawyer => {
        const card = document.createElement('div');
        card.className = 'lawyer-card';
        card.innerHTML = `
            <img src="${lawyer.profileImage || 'default-avatar.png'}" alt="${lawyer.name}">
            <h3>${lawyer.name}</h3>
            <p class="specialization">${lawyer.specialization}</p>
            <p class="rating">⭐ ${lawyer.rating} (${lawyer.totalReviews} reviews)</p>
            <p class="experience">${lawyer.experience} years experience</p>
            <p class="location">📍 ${lawyer.location}</p>
            <p class="fees">₹${lawyer.fees}/consultation</p>
            ${lawyer.isVerified ? '<span class="verified">✓ Verified</span>' : ''}
            <button onclick="viewLawyerProfile('${lawyer.id}')">View Profile</button>
            <button onclick="bookLawyer('${lawyer.id}')">Book Now</button>
        `;
        container.appendChild(card);
    });
}

async function viewLawyerProfile(lawyerId) {
    try {
        const response = await fetch(`${API_URL}/lawyers/${lawyerId}`);
        const lawyer = await response.json();
        
        // Show modal with lawyer details
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${lawyer.name}</h2>
                <p>${lawyer.bio}</p>
                <p><strong>Specialization:</strong> ${lawyer.specialization}</p>
                <p><strong>Experience:</strong> ${lawyer.experience} years</p>
                <p><strong>Location:</strong> ${lawyer.location}</p>
                <p><strong>Fees:</strong> ₹${lawyer.fees}</p>
                <p><strong>Rating:</strong> ⭐ ${lawyer.rating} (${lawyer.totalReviews} reviews)</p>
                
                <h3>Reviews</h3>
                <div id="lawyer-reviews"></div>
                
                <h3>Availability</h3>
                <div id="lawyer-availability"></div>
                
                <button onclick="bookLawyer('${lawyer.id}')">Book Consultation</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Display reviews
        const reviewsContainer = modal.querySelector('#lawyer-reviews');
        if (lawyer.Reviews && lawyer.Reviews.length > 0) {
            lawyer.Reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.className = 'review';
                reviewDiv.innerHTML = `
                    <p><strong>${review.User?.name || 'Anonymous'}</strong> - ${'⭐'.repeat(review.rating)}</p>
                    <p>${review.comment}</p>
                `;
                reviewsContainer.appendChild(reviewDiv);
            });
        } else {
            reviewsContainer.innerHTML = '<p>No reviews yet</p>';
        }
        
        // Display availability
        const availabilityContainer = modal.querySelector('#lawyer-availability');
        if (lawyer.Availabilities && lawyer.Availabilities.length > 0) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            lawyer.Availabilities.forEach(slot => {
                const slotDiv = document.createElement('div');
                slotDiv.innerHTML = `<p>${days[slot.dayOfWeek]}: ${slot.startTime} - ${slot.endTime}</p>`;
                availabilityContainer.appendChild(slotDiv);
            });
        } else {
            availabilityContainer.innerHTML = '<p>No availability set</p>';
        }
        
        // Close modal
        modal.querySelector('.close').addEventListener('click', () => {
            modal.remove();
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function bookLawyer(lawyerId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Book Consultation</h2>
            <form id="booking-form">
                <input type="date" id="booking-date" required>
                <input type="time" id="booking-start-time" required>
                <input type="time" id="booking-end-time" required>
                <select id="consultation-type" required>
                    <option value="">Select Type</option>
                    <option value="chat">Chat</option>
                    <option value="call">Phone Call</option>
                    <option value="video">Video Call</option>
                </select>
                <textarea id="booking-notes" placeholder="Additional notes"></textarea>
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('#booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login first');
            window.location.href = 'index.html';
            return;
        }
        
        const data = {
            lawyerId,
            date: document.getElementById('booking-date').value,
            startTime: document.getElementById('booking-start-time').value,
            endTime: document.getElementById('booking-end-time').value,
            consultationType: document.getElementById('consultation-type').value,
            notes: document.getElementById('booking-notes').value,
            amount: 1000 // This should come from lawyer's fees
        };
        
        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Booking created successfully!');
                modal.remove();
                loadUserBookings();
            } else {
                alert('Booking failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Booking failed');
        }
    });
    
    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });
}

// Load User Bookings
async function loadUserBookings() {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
        const response = await fetch(`${API_URL}/bookings/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        displayUserBookings(data.bookings);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayUserBookings(bookings) {
    const container = document.getElementById('user-bookings');
    if (!container) return;
    
    container.innerHTML = '<h2>My Bookings</h2>';
    
    if (!bookings || bookings.length === 0) {
        container.innerHTML += '<p>No bookings yet</p>';
        return;
    }
    
    bookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <h3>${booking.Lawyer?.name}</h3>
            <p>Date: ${new Date(booking.date).toLocaleDateString()}</p>
            <p>Time: ${booking.startTime}</p>
            <p>Type: ${booking.consultationType}</p>
            <p>Status: <span class="status-${booking.status}">${booking.status}</span></p>
            <p>Amount: ₹${booking.amount}</p>
            ${booking.status === 'pending' ? `<button onclick="cancelBooking('${booking.id}')">Cancel</button>` : ''}
            ${booking.status === 'completed' && !booking.Review ? `<button onclick="leaveReview('${booking.id}', '${booking.lawyerId}')">Leave Review</button>` : ''}
        `;
        container.appendChild(card);
    });
}

async function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            alert('Booking cancelled');
            loadUserBookings();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function leaveReview(bookingId, lawyerId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Leave a Review</h2>
            <form id="review-form">
                <div class="rating-input">
                    <label>Rating:</label>
                    <select id="rating" required>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                    </select>
                </div>
                <textarea id="review-comment" placeholder="Write your review..." required></textarea>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('#review-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        const data = {
            lawyerId,
            bookingId,
            rating: parseInt(document.getElementById('rating').value),
            comment: document.getElementById('review-comment').value
        };
        
        try {
            const response = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Review submitted successfully!');
                modal.remove();
                loadUserBookings();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });
}

// Document Upload
async function uploadDocument(file, bookingId = null) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('document', file);
    if (bookingId) formData.append('bookingId', bookingId);
    formData.append('documentType', 'case_document');
    
    try {
        const response = await fetch(`${API_URL}/documents/upload`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        
        if (response.ok) {
            alert('Document uploaded successfully');
            loadUserDocuments();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadUserDocuments() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_URL}/documents/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const documents = await response.json();
        displayDocuments(documents);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayDocuments(documents) {
    const container = document.getElementById('user-documents');
    if (!container) return;
    
    container.innerHTML = '<h2>My Documents</h2>';
    
    documents.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'document-item';
        item.innerHTML = `
            <p>${doc.fileName}</p>
            <a href="${doc.fileUrl}" target="_blank">View</a>
            <button onclick="deleteDocument('${doc.id}')">Delete</button>
        `;
        container.appendChild(item);
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    loadNotifications();
    loadUserBookings();
    
    // Setup search form
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            searchLawyers();
        });
    }
}
