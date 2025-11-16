# NyayaSetu API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "john@example.com"
  }
}
```

### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Lawyer Endpoints

### Register Lawyer
```http
POST /lawyers/register
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "specialization": "Criminal Law",
  "experience": 5,
  "location": "New York",
  "fees": 1000,
  "bio": "Experienced criminal lawyer",
  "barCouncilId": "BAR123456"
}
```

### Login Lawyer
```http
POST /lawyers/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "password123"
}
```

### Get All Lawyers (with filters)
```http
GET /lawyers?specialization=Criminal&location=New York&minRating=4&maxFees=2000&search=jane
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Jane Smith",
    "specialization": "Criminal Law",
    "experience": 5,
    "location": "New York",
    "fees": 1000,
    "rating": 4.5,
    "totalReviews": 10,
    "isVerified": true,
    "isActive": true
  }
]
```

### Get Lawyer by ID
```http
GET /lawyers/:id
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "specialization": "Criminal Law",
  "experience": 5,
  "location": "New York",
  "fees": 1000,
  "bio": "Experienced criminal lawyer",
  "rating": 4.5,
  "totalReviews": 10,
  "Reviews": [...],
  "Availabilities": [...]
}
```

### Update Lawyer Profile
```http
PUT /lawyers/profile
Authorization: Bearer <lawyer_token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "phone": "+1234567890",
  "bio": "Updated bio",
  "fees": 1200,
  "location": "New York"
}
```

---

## Booking Endpoints

### Create Booking
```http
POST /bookings
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "lawyerId": "uuid",
  "date": "2024-12-25",
  "startTime": "10:00",
  "endTime": "11:00",
  "consultationType": "video",
  "notes": "Need consultation about property dispute",
  "amount": 1000
}
```

### Get User Bookings
```http
GET /bookings/user
Authorization: Bearer <user_token>
```

### Get Lawyer Bookings
```http
GET /bookings/lawyer
Authorization: Bearer <lawyer_token>
```

### Update Booking Status
```http
PUT /bookings/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

### Cancel Booking
```http
PUT /bookings/:id/cancel
Authorization: Bearer <user_token>
```

---

## Review Endpoints

### Create Review
```http
POST /reviews
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "lawyerId": "uuid",
  "bookingId": "uuid",
  "rating": 5,
  "comment": "Excellent service!"
}
```

### Get Lawyer Reviews
```http
GET /reviews/lawyer/:lawyerId
```

### Get User Reviews
```http
GET /reviews/user
Authorization: Bearer <user_token>
```

---

## Notification Endpoints

### Get All Notifications
```http
GET /notifications
Authorization: Bearer <user_token>
```

### Get Unread Notifications
```http
GET /notifications/unread
Authorization: Bearer <user_token>
```

### Mark Notification as Read
```http
PUT /notifications/:id/read
Authorization: Bearer <user_token>
```

### Mark All as Read
```http
PUT /notifications/read-all
Authorization: Bearer <user_token>
```

---

## Document Endpoints

### Upload Document
```http
POST /documents/upload
Authorization: Bearer <user_token>
Content-Type: multipart/form-data

document: <file>
bookingId: "uuid" (optional)
documentType: "case_document"
```

### Get User Documents
```http
GET /documents/user
Authorization: Bearer <user_token>
```

### Get Booking Documents
```http
GET /documents/booking/:bookingId
Authorization: Bearer <user_token>
```

### Delete Document
```http
DELETE /documents/:id
Authorization: Bearer <user_token>
```

### Generate Document (AI)
```http
POST /documents/generate
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "documentType": "lease_agreement",
  "details": {
    "landlord": "John Doe",
    "tenant": "Jane Smith",
    "property": "123 Main St"
  }
}
```

---

## Availability Endpoints

### Set Availability
```http
POST /availability
Authorization: Bearer <lawyer_token>
Content-Type: application/json

{
  "dayOfWeek": 1,
  "startTime": "09:00",
  "endTime": "17:00",
  "isAvailable": true
}
```

### Get Lawyer Availability
```http
GET /availability/lawyer/:lawyerId
```

### Update Availability
```http
PUT /availability/:id
Authorization: Bearer <lawyer_token>
Content-Type: application/json

{
  "startTime": "10:00",
  "endTime": "18:00",
  "isAvailable": true
}
```

### Delete Availability
```http
DELETE /availability/:id
Authorization: Bearer <lawyer_token>
```

---

## Admin Endpoints

### Admin Login
```http
POST /admin/login
Content-Type: application/json

{
  "email": "admin@nyayasetu.com",
  "password": "admin123"
}
```

### Get Dashboard Stats
```http
GET /admin/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "totalUsers": 100,
  "totalLawyers": 50,
  "totalBookings": 200,
  "pendingBookings": 20,
  "completedBookings": 150,
  "totalRevenue": 150000
}
```

### Get All Users
```http
GET /admin/users
Authorization: Bearer <admin_token>
```

### Get All Lawyers
```http
GET /admin/lawyers
Authorization: Bearer <admin_token>
```

### Verify Lawyer
```http
PUT /admin/lawyers/:id/verify
Authorization: Bearer <admin_token>
```

### Toggle Lawyer Status
```http
PUT /admin/lawyers/:id/toggle-status
Authorization: Bearer <admin_token>
```

### Get All Bookings
```http
GET /admin/bookings
Authorization: Bearer <admin_token>
```

### Delete User
```http
DELETE /admin/users/:id
Authorization: Bearer <admin_token>
```

### Delete Lawyer
```http
DELETE /admin/lawyers/:id
Authorization: Bearer <admin_token>
```

---

## Payment Endpoints

### Create Razorpay Order
```http
POST /payments/create-order
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "amount": 1000,
  "bookingId": "uuid"
}
```

### Verify Payment
```http
POST /payments/verify
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature",
  "bookingId": "uuid"
}
```

---

## Chat Endpoints

### Get Chat Messages
```http
GET /chat/:userId/:lawyerId
Authorization: Bearer <token>
```

### Send Message
```http
POST /chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "uuid",
  "lawyerId": "uuid",
  "message": "Hello, I need legal advice",
  "sender": "user"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Missing required fields",
  "error": "Validation error"
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication failed",
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Notes

1. All timestamps are in ISO 8601 format
2. UUIDs are used for all IDs
3. Dates should be in YYYY-MM-DD format
4. Times should be in HH:MM format (24-hour)
5. File uploads have a 10MB size limit
6. Supported file types for documents: PDF, DOC, DOCX, JPG, PNG
