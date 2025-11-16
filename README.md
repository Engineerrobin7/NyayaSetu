# NyayaSetu - Legal Consultation Platform

A comprehensive legal consultation platform connecting users with lawyers for online consultations, bookings, and legal assistance.

## Features

### User Features
- ✅ User Registration & Authentication
- ✅ Search & Filter Lawyers (by specialization, location, rating, fees)
- ✅ View Lawyer Profiles with Reviews & Ratings
- ✅ Book Consultations (Chat, Call, Video)
- ✅ Real-time Notifications
- ✅ Document Upload & Management
- ✅ Leave Reviews & Ratings
- ✅ View Booking History
- ✅ Cancel Bookings

### Lawyer Features
- ✅ Lawyer Registration & Profile Management
- ✅ Set Availability Schedule
- ✅ View & Manage Bookings
- ✅ View Reviews & Ratings
- ✅ Update Profile & Fees

### Admin Features
- ✅ Admin Dashboard with Statistics
- ✅ Manage Users & Lawyers
- ✅ Verify Lawyers
- ✅ Activate/Deactivate Lawyers
- ✅ View All Bookings
- ✅ Delete Users/Lawyers

### Additional Features
- ✅ Email Notifications (Booking confirmations, reminders)
- ✅ Payment Integration (Razorpay)
- ✅ Real-time Chat (Socket.io)
- ✅ Document Storage (AWS S3)
- ✅ Advanced Search & Filters
- ✅ Rating & Review System
- ✅ Availability Management

## Tech Stack

### Backend
- Node.js & Express.js
- PostgreSQL with Sequelize ORM
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for emails
- AWS S3 for file storage
- Socket.io for real-time chat
- Razorpay for payments

### Frontend
- HTML5, CSS3, JavaScript
- Responsive Design
- Real-time Updates

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- AWS Account (for S3)
- Gmail Account (for email notifications)

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd NyayaSetu
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Environment Variables**

Edit the `.env` file with your credentials:

```env
# Database
DB_NAME=nyayasetu
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_BUCKET_NAME=nyayasetu-documents

# Server
PORT=5000
```

4. **Setup Database**

Create PostgreSQL database:
```bash
createdb nyayasetu
```

5. **Create Admin User**
```bash
node src/scripts/createAdmin.js
```

Default admin credentials:
- Email: admin@nyayasetu.com
- Password: admin123

6. **Start the Server**
```bash
npm start
```

The server will run on `http://localhost:5000`

7. **Open Frontend**

Open `frontend/index.html` in your browser or use a local server:
```bash
cd frontend
python -m http.server 3000
```

Then visit `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Lawyers
- `GET /api/lawyers` - Get all lawyers (with filters)
- `GET /api/lawyers/:id` - Get lawyer by ID
- `POST /api/lawyers/register` - Lawyer registration
- `POST /api/lawyers/login` - Lawyer login
- `PUT /api/lawyers/profile` - Update lawyer profile

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/lawyer` - Get lawyer bookings
- `PUT /api/bookings/:id/status` - Update booking status
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/lawyer/:lawyerId` - Get lawyer reviews
- `GET /api/reviews/user` - Get user reviews

### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread` - Get unread notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/user` - Get user documents
- `GET /api/documents/booking/:bookingId` - Get booking documents
- `DELETE /api/documents/:id` - Delete document

### Availability
- `POST /api/availability` - Set availability
- `GET /api/availability/lawyer/:lawyerId` - Get lawyer availability
- `PUT /api/availability/:id` - Update availability
- `DELETE /api/availability/:id` - Delete availability

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/lawyers` - Get all lawyers
- `PUT /api/admin/lawyers/:id/verify` - Verify lawyer
- `PUT /api/admin/lawyers/:id/toggle-status` - Toggle lawyer status
- `GET /api/admin/bookings` - Get all bookings
- `DELETE /api/admin/users/:id` - Delete user
- `DELETE /api/admin/lawyers/:id` - Delete lawyer

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

### Chat
- `GET /api/chat/:userId/:lawyerId` - Get chat messages
- `POST /api/chat` - Send message

## Project Structure

```
NyayaSetu/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── availabilityController.js
│   │   ├── bookingController.js
│   │   ├── chatController.js
│   │   ├── documentController.js
│   │   ├── lawyerController.js
│   │   ├── notificationController.js
│   │   ├── paymentController.js
│   │   └── reviewController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Availability.js
│   │   ├── Booking.js
│   │   ├── Chat.js
│   │   ├── Document.js
│   │   ├── Lawyer.js
│   │   ├── Notification.js
│   │   ├── Review.js
│   │   ├── User.js
│   │   └── index.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── availability.js
│   │   ├── bookings.js
│   │   ├── chat.js
│   │   ├── documents.js
│   │   ├── lawyers.js
│   │   ├── notifications.js
│   │   ├── payments.js
│   │   └── reviews.js
│   ├── scripts/
│   │   └── createAdmin.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── notificationService.js
│   └── server.js
├── frontend/
│   ├── admin-dashboard.html
│   ├── admin-login.html
│   ├── admin-style.css
│   ├── admin.js
│   ├── dashboard.html
│   ├── index.html
│   ├── lawyer-dashboard.html
│   ├── lawyer-register.html
│   ├── lawyer.js
│   ├── login.css
│   ├── script.js
│   ├── style.css
│   └── user-features.js
├── .env
├── package.json
└── README.md
```

## Usage

### For Users
1. Register/Login at `index.html`
2. Browse lawyers on the dashboard
3. Filter by specialization, location, rating
4. View lawyer profiles and reviews
5. Book consultations
6. Upload case documents
7. Leave reviews after consultations

### For Lawyers
1. Register at `lawyer-register.html`
2. Wait for admin verification
3. Login and access lawyer dashboard
4. Set your availability schedule
5. View and manage bookings
6. Update your profile and fees

### For Admins
1. Login at `admin-login.html`
2. View dashboard statistics
3. Verify new lawyer registrations
4. Manage users and lawyers
5. Monitor all bookings

## Email Configuration

To enable email notifications:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
3. Use this password in `EMAIL_PASS` in `.env`

## AWS S3 Configuration

1. Create an AWS account
2. Create an S3 bucket
3. Create IAM user with S3 access
4. Add credentials to `.env`

## Future Enhancements

- [ ] Video consultation integration (WebRTC/Twilio)
- [ ] AI Legal Assistant chatbot
- [ ] Document generation with AI
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Automated appointment reminders
- [ ] Payment refund system
- [ ] Case tracking system
- [ ] Pro bono lawyer network

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For support, email info@nyayasetu.com or call +91-8448445049

## Disclaimer

NyayaSetu is a platform connecting users with lawyers and does not provide legal advice directly.
