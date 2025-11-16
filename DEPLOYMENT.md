# Deployment Guide for NyayaSetu

## Prerequisites

- Node.js v14+ installed
- PostgreSQL database
- AWS account (for S3)
- Gmail account (for emails)
- Domain name (optional)
- SSL certificate (for production)

---

## Local Development

1. **Clone and Install**
```bash
git clone <repository-url>
cd NyayaSetu
npm install
```

2. **Setup Database**
```bash
createdb nyayasetu
```

3. **Configure Environment**
Copy `.env.example` to `.env` and fill in your credentials

4. **Create Admin**
```bash
npm run create-admin
```

5. **Start Server**
```bash
npm run dev
```

---

## Production Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create nyayasetu
```

4. **Add PostgreSQL**
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

5. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your_secret
heroku config:set RAZORPAY_KEY_ID=your_key
heroku config:set RAZORPAY_KEY_SECRET=your_secret
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASS=your_password
heroku config:set AWS_ACCESS_KEY_ID=your_key
heroku config:set AWS_SECRET_ACCESS_KEY=your_secret
heroku config:set AWS_REGION=us-east-1
heroku config:set AWS_BUCKET_NAME=your_bucket
```

6. **Deploy**
```bash
git push heroku main
```

7. **Create Admin**
```bash
heroku run npm run create-admin
```

8. **Open App**
```bash
heroku open
```

---

### Option 2: AWS EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - t2.micro or larger
   - Configure security groups (ports 22, 80, 443, 5000)

2. **Connect to Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Dependencies**
```bash
sudo apt update
sudo apt install -y nodejs npm postgresql nginx
```

4. **Setup PostgreSQL**
```bash
sudo -u postgres psql
CREATE DATABASE nyayasetu;
CREATE USER nyayasetu_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE nyayasetu TO nyayasetu_user;
\q
```

5. **Clone Repository**
```bash
git clone <repository-url>
cd NyayaSetu
npm install
```

6. **Configure Environment**
```bash
nano .env
# Fill in your credentials
```

7. **Install PM2**
```bash
sudo npm install -g pm2
```

8. **Start Application**
```bash
pm2 start src/server.js --name nyayasetu
pm2 save
pm2 startup
```

9. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/nyayasetu
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

10. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/nyayasetu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

11. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option 3: DigitalOcean

1. **Create Droplet**
   - Choose Ubuntu 20.04
   - Select plan (Basic $5/month or higher)
   - Add SSH key

2. **Follow AWS EC2 steps 2-11**

3. **Setup Managed Database (Optional)**
   - Create PostgreSQL database in DigitalOcean
   - Update connection string in `.env`

---

### Option 4: Vercel (Frontend) + Railway (Backend)

**Backend on Railway:**

1. **Create Railway Account**
   - Go to railway.app
   - Connect GitHub

2. **Deploy Backend**
   - New Project → Deploy from GitHub
   - Select repository
   - Add PostgreSQL plugin
   - Set environment variables
   - Deploy

**Frontend on Vercel:**

1. **Create Vercel Account**
   - Go to vercel.com
   - Connect GitHub

2. **Deploy Frontend**
   - New Project → Import repository
   - Set root directory to `frontend`
   - Deploy

3. **Update API URL**
   - Update `API_URL` in frontend JS files to Railway backend URL

---

## AWS S3 Setup

1. **Create S3 Bucket**
```bash
aws s3 mb s3://nyayasetu-documents
```

2. **Set Bucket Policy**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nyayasetu-documents/*"
    }
  ]
}
```

3. **Enable CORS**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

4. **Create IAM User**
   - Create user with S3 access
   - Save access key and secret
   - Add to `.env`

---

## Email Setup (Gmail)

1. **Enable 2FA**
   - Go to Google Account Settings
   - Security → 2-Step Verification

2. **Generate App Password**
   - Security → App Passwords
   - Select "Mail" and "Other"
   - Copy password

3. **Update .env**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=generated-app-password
```

---

## Database Migrations

For production, use migrations instead of `sync()`:

1. **Install Sequelize CLI**
```bash
npm install -g sequelize-cli
```

2. **Initialize**
```bash
sequelize init
```

3. **Create Migration**
```bash
sequelize migration:generate --name create-users
```

4. **Run Migrations**
```bash
sequelize db:migrate
```

---

## Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs nyayasetu
```

### Setup Log Rotation
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Error Tracking (Sentry)
```bash
npm install @sentry/node
```

Add to `server.js`:
```javascript
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "your-sentry-dsn" });
```

---

## Performance Optimization

1. **Enable Compression**
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add Rate Limiting**
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

3. **Enable Caching**
```bash
npm install redis
```

4. **Use CDN for Static Assets**
   - Upload images to Cloudinary or AWS CloudFront
   - Update URLs in frontend

---

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure environment variables
- [ ] Enable CORS properly
- [ ] Use helmet.js for security headers
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Use prepared statements (Sequelize does this)
- [ ] Keep dependencies updated
- [ ] Enable database backups
- [ ] Use strong JWT secrets
- [ ] Implement CSRF protection
- [ ] Set secure cookie flags

---

## Backup Strategy

### Database Backups

**Automated Daily Backups:**
```bash
# Create backup script
nano /home/ubuntu/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump nyayasetu > /backups/nyayasetu_$DATE.sql
aws s3 cp /backups/nyayasetu_$DATE.sql s3://nyayasetu-backups/
find /backups -mtime +7 -delete
```

```bash
chmod +x /home/ubuntu/backup.sh
crontab -e
# Add: 0 2 * * * /home/ubuntu/backup.sh
```

---

## Scaling

### Horizontal Scaling
- Use load balancer (AWS ELB, Nginx)
- Deploy multiple instances
- Use Redis for session storage
- Implement database read replicas

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Add database indexes
- Use connection pooling

---

## Troubleshooting

### Server Won't Start
```bash
# Check logs
pm2 logs nyayasetu

# Check port
sudo lsof -i :5000

# Check environment
printenv | grep DB_
```

### Database Connection Issues
```bash
# Test connection
psql -h localhost -U nyayasetu_user -d nyayasetu

# Check PostgreSQL status
sudo systemctl status postgresql
```

### Email Not Sending
- Verify Gmail app password
- Check firewall rules
- Test with nodemailer test account

---

## Maintenance

### Update Application
```bash
git pull origin main
npm install
pm2 restart nyayasetu
```

### Update Dependencies
```bash
npm update
npm audit fix
```

### Monitor Disk Space
```bash
df -h
du -sh /var/log/*
```

---

## Support

For deployment issues:
- Check logs: `pm2 logs`
- Review documentation
- Contact: info@nyayasetu.com
