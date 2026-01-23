AWS 3-Tier Web Application: Production-Ready Login & Signup App
![537854027-ce8af5c0-77b3-4ec6-8fba-2dddaf2f8df1](https://github.com/user-attachments/assets/0e6690fa-d6ec-414c-9385-ee1a2b9c0f8b)
![537854066-d2c623f6-bd4d-4be6-be42-02b291e2feba](https://github.com/user-attachments/assets/bbb3fc46-f7ce-4723-b64f-39af2a0997b7)
![537854101-381c6c35-625c-4d42-8a6b-b05c2fb56908](https://github.com/user-attachments/assets/7844d6ac-46ab-45db-a77d-c0122f852381)
![537854130-f097e586-053b-4506-bc26-7faf560a17db](https://github.com/user-atta![537854180-4a48552c-70fd-4524-b789-f551964be953](https://github.com/user-attachments/assets/708046d5-24a5-45c6-b072-6997e793890a)
chments/assets/4c57426f-1b74-429b-850f-70e9748daa38)
![537854215-00eab09e-211f-4e6c-9478-e4457938a78c](https://github.com/user-attachments/assets/3c1c7abc-74b0-432e-8214-081484dc569b)

🚀 Project Overview
Complete production-ready 3-tier web application with React frontend, Node.js backend, and RDS MySQL deployed across 6 subnets (2 AZs). Features custom GoDaddy domain, dual ALBs, Auto Scaling Groups, 5 Security Groups, CloudFront CDN, and SNS email alerts.

Live Demo: https://yourapp.yourdomain.com (GoDaddy → Route53 → CloudFront)

🏗️ Architecture Overview
text
Internet → External ALB → Web Tier (React+Nginx) → Internal ALB → App Tier (Node.js) → RDS MySQL
     ↓
CloudFront → S3 Static Frontend (Alternative Access)
🏗️ Architecture Diagram
<img width="1382" height="721" alt="AWS Three Tier Web Architecture diagram" src="https://github.com/user-attachments/assets/85cb835c-1aec-41a6-8e4d-71cda8b6bc6f" />
📋 Infrastructure Architecture (6 Subnets - Dual AZ)
text
VPC: 10.0.0.0/16 (ap-south-1a, ap-south-1b)

Public Subnets (Web Tier + ALB):
├── AZ1: 10.0.1.0/24 (Public)
└── AZ2: 10.0.2.0/24 (Public)

Private App Subnets (App Tier):
├── AZ1: 10.0.3.0/24 (Private)
└── AZ2: 10.0.4.0/24 (Private)

Private DB Subnets (RDS):
├── AZ1: 10.0.5.0/24 (Private)
└── AZ2: 10.0.6.0/24 (Private)
📁 Complete Project Structure
text
AWS-3TIER-WEB-APP/
├── application-code/
│   ├── app-tier/                    # Backend Node.js API (Private Subnets)
│   │   ├── DbConfig.js             # RDS MySQL connection
│   │   ├── index.js                # Express server (Port 4000)
│   │   ├── package.json
│   │   ├── health.js               # /api/health endpoint
│   │   └── README.md
│   │
│   ├── web-tier/                   # Frontend React + Nginx (Public Subnets)
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
│   │   ├── nginx.conf              # Proxy to Internal ALB
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── s3-frontend/                # Static S3 + CloudFront files
│
├── deployment-scripts/
│   ├── app-server-commands.sh      # Backend EC2 UserData
│   ├── web-server-commands.sh      # Frontend EC2 UserData
│   └── database-setup.sql          # RDS initialization
│
├── docs/
│   ├── DEPLOYMENT-CHECKLIST.md
│   ├── SECURITY-GROUPS.md
│   └── COST-ANALYSIS.md
│
├── diagrams/
│   └── architecture.png
│
├── .gitignore
├── README.md
└── LICENSE
🛠️ Technology Stack
Layer	Technology	Purpose
Frontend	React 18.2.0 + Nginx	UI + Reverse Proxy
Backend	Node.js 16.x + Express 4.18.2	REST API + Auth
Database	RDS MySQL 8.0.35 (Multi-AZ)	User data storage
Infra	EC2 ASG + Dual ALB + VPC (6 subnets)	HA + Load Balancing
Full AWS Services: EC2 | ASG | ALB | RDS | S3 | CloudFront | Route53 | ACM | VPC | CloudWatch | SNS | IAM

🚀 Features
✅ User Authentication: bcrypt password hashing

✅ Responsive UI: Modern React design

✅ RESTful APIs: Complete CRUD operations

✅ High Availability: Dual AZ across all tiers

✅ Auto Scaling: CPU-based scaling policies

✅ Load Balancing: External + Internal ALBs

✅ Custom Domain: GoDaddy → Route53 → CloudFront

✅ HTTPS: ACM certificates end-to-end

✅ Monitoring: CloudWatch + SNS email alerts

📋 Prerequisites
AWS Account (ap-south-1 Mumbai)

EC2 Key Pair

GoDaddy Domain

IAM Role (S3/RDS access)

⚙️ Deployment Steps (AWS Console)
Phase 1: VPC & Networking (30 mins)
text
1. VPC (10.0.0.0/16) → 2 AZs
2. 2 Public Subnets (Web): 10.0.1.0/24, 10.0.2.0/24
3. 2 Private App Subnets: 10.0.3.0/24, 10.0.4.0/24
4. 2 Private DB Subnets: 10.0.5.0/24, 10.0.6.0/24
5. IGW + NAT Gateway + Route Tables
Phase 2: Frontend Deployment
text
1. S3 → Static Hosting + CloudFront + ACM
2. Route53 → GoDaddy domain routing
3. External ALB → Web Target Group (Port 80)
4. Web ASG (Public subnets) → Custom AMI
Phase 3: Backend Deployment
text
1. Internal ALB → App Target Group (Port 4000)
2. App ASG (Private subnets) → Custom AMI
3. RDS MySQL (Private DB subnets, Multi-AZ)
Phase 4: Security & Monitoring
text
1. 5 Security Groups (Least Privilege)
2. CloudWatch Alarms → SNS Email
3. IAM Roles + NACLs
🔒 Security Groups (5 Total)
Security Group	Inbound Rules	Subnet Type
External-ALB-SG	HTTPS:443 (0.0.0.0/0)	Public
Web-SG	HTTP:80 (ALB-SG only)	Public Subnets
App-SG	Port:4000 (Web-SG only)	Private App Subnets
Internal-ALB-SG	HTTP:80 (Web-SG)	Private
DB-SG	MySQL:3306 (App-SG only)	Private DB Subnets
📊 API Endpoints
bash
POST /api/signup      # Create account (bcrypt)
POST /api/login       # JWT Authentication
GET  /api/user/:id    # Profile dashboard
GET  /api/users       # Admin list
GET  /api/health      # Load balancer health
🔧 Quick Setup Scripts
Web Tier UserData (Public Subnets):

bash
#!/bin/bash
yum update -y
amazon-linux-extras install nginx1 -y
aws s3 cp s3://YOUR-BUCKET/web-tier/ /usr/share/nginx/html/ --recursive
aws s3 cp s3://YOUR-BUCKET/nginx.conf /etc/nginx/nginx.conf
systemctl start nginx
systemctl enable nginx
curl -f http://localhost/health || exit 1
App Tier UserData (Private Subnets):

bash
#!/bin/bash
curl -fsSL https://rpm.nodesource.com/setup_16.x | bash -
yum install -y nodejs gcc-c++ make
aws s3 cp s3://YOUR-BUCKET/app-tier/ /app/ --recursive
cd /app && npm install
pm2 start index.js --name "webapp-api"
pm2 save && pm2 startup
Database Setup:

sql
CREATE DATABASE webappdb;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🧪 Testing & Validation
bash
# Load Test
ab -n 500 -c 50 https://YOUR-ALB-DNS/

# Health Check
curl https://YOUR-ALB-DNS/api/health

# Failover Test
Terminate AZ1 instances → Verify AZ2 auto-scaling
💰 Cost Analysis
Component	Monthly Cost	Optimization
RDS Multi-AZ	$25	Single-AZ dev
EC2 ASG (t3.micro)	$8	Spot Instances
ALB + Data Transfer	$18	
Total	$51	Free Tier: $0
📈 Screenshots
🎯 Recruiter Highlights
✅ Production-Grade: 6 subnets, Dual AZ, Multi-ALB
✅ Security-First: 5 SGs + NACLs + IAM
✅ Complete Stack: Frontend → Backend → Database
✅ Cost Aware: $51/month optimized
