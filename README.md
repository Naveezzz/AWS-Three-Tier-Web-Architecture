# 3-Tier Web Application on AWS

Complete implementation of a 3-tier architecture with React frontend, Node.js backend, and MySQL database on AWS.

## 🏗️ Architecture

```
Internet → External ALB → Web Tier (React + Nginx) → Internal ALB → App Tier (Node.js) → RDS MySQL
```

## 🏗️ Architecture Diagram

```
![AWS Architecture - DrawIO](https://github.com/pandacloud1/AWS_Project1/assets/134182273/3e46931f-0802-48a7-b044-22cd2afde467)
```

## 📁 Project Structure

```
AWS_PROJECT-MAIN/
├── application-code/
│   ├── app-tier/              # Backend Node.js API
│   │   ├── DbConfig.js        # Database configuration
│   │   ├── index.js           # Express server
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── web-tier/              # Frontend React App
│   │   ├── public/
│   │   │   └── index.html
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── App.jsx
│   │   │   ├── App.css
│   │   │   └── index.js
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── nginx.conf             # Nginx configuration
│
├── app-server-commands         # Backend setup script
├── web-server-commands         # Frontend setup script
├── database-setup.sql          # Database initialization
├── .gitignore
├── DEPLOYMENT-CHECKLIST.md
└── README.md
```

## 🚀 Features

- User signup with bcrypt password hashing
- User login with authentication
- User dashboard with profile display
- Responsive modern UI design
- RESTful API architecture
- Load balancing across multiple tiers
- Auto-scaling capability
- Health monitoring

## 🛠️ Technology Stack

**Frontend (Web Tier)**
- React 18.2.0
- Create React App
- Nginx Web Server
- CSS3

**Backend (App Tier)**
- Node.js 16.x
- Express.js 4.18.2
- bcrypt 5.1.1
- MySQL2 3.6.0
- PM2 Process Manager

**Database (Data Tier)**
- Amazon RDS MySQL 8.0

**Infrastructure**
- AWS EC2 (Web & App tiers)
- AWS RDS (Database)
- Application Load Balancers
- Auto Scaling Groups
- VPC with public/private subnets
- Security Groups

## 📋 Prerequisites

1. AWS Account
2. S3 Bucket for code storage
3. VPC with public and private subnets
4. RDS MySQL instance
5. EC2 key pair
6. IAM role with S3 read permissions

## 🔧 Quick Setup

### 1. Update Configuration Files

**nginx.conf**
```nginx
proxy_pass http://YOUR-INTERNAL-LB-DNS.elb.amazonaws.com:80/;
```

**DbConfig.js**
```javascript
module.exports = {
  host: 'your-rds-endpoint.region.rds.amazonaws.com',
  user: 'admin',
  password: 'your-password',
  database: 'webappdb'
};
```

**Command Scripts**
- Update S3 bucket name in `web-server-commands`
- Update S3 bucket name in `app-server-commands`

### 2. Upload to S3

```bash
aws s3 cp application-code/web-tier s3://YOUR-BUCKET/application-code/web-tier --recursive
aws s3 cp application-code/app-tier s3://YOUR-BUCKET/application-code/app-tier --recursive
aws s3 cp application-code/nginx.conf s3://YOUR-BUCKET/application-code/nginx.conf
```

### 3. Setup Database

```bash
mysql -h YOUR-RDS-ENDPOINT -u admin -p < database-setup.sql
```

### 4. Deploy Backend

Launch EC2 in private subnet and run:
```bash
bash app-server-commands
```

### 5. Deploy Frontend

Launch EC2 in public subnet and run:
```bash
bash web-server-commands
```

### 6. Test Application

Access your External ALB DNS in browser and test signup/login.

## 🔒 Security Groups

**Web Tier**: Allow 80 from External ALB  
**App Tier**: Allow 4000 from Web Tier  
**RDS**: Allow 3306 from App Tier  
**External ALB**: Allow 80 from Internet  
**Internal ALB**: Allow 80 from Web Tier

## 📊 API Endpoints

- `POST /api/signup` - Create account
- `POST /api/login` - User login
- `GET /api/user/:id` - Get user profile
- `GET /api/users` - Get all users
- `GET /api/health` - Health check

## 🐛 Troubleshooting

**Web Tier**
```bash
sudo service nginx status
sudo tail -f /var/log/nginx/error.log
```

**App Tier**
```bash
pm2 logs
pm2 list
curl http://localhost:4000/health
```

**Database**
```bash
mysql -h RDS-ENDPOINT -u admin -p
SHOW DATABASES;
USE webappdb;
SHOW TABLES;
```

## 💰 Cost Optimization

- Use t2.micro/t3.micro instances
- Single-AZ RDS for dev
- Stop instances when not in use
- Enable Auto Scaling
- Use Reserved Instances for production

## 📝 License

Open source for educational purposes.

## 🤝 Contributing

Issues and feature requests welcome!

---

**Built with AWS 3-Tier Architecture Best Practices**
