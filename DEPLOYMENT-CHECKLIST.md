# Deployment Checklist

## Pre-Deployment

### AWS Setup
- [ ] AWS account created
- [ ] IAM user configured
- [ ] EC2 key pair created: `_________________`
- [ ] S3 bucket created: `_________________`

### VPC Configuration
- [ ] VPC created (CIDR: 10.0.0.0/16)
- [ ] Internet Gateway attached
- [ ] 2+ Public subnets created
- [ ] 2+ Private subnets created
- [ ] NAT Gateway created
- [ ] Route tables configured

### Security Groups
- [ ] External ALB SG (80 from 0.0.0.0/0)
- [ ] Web-Tier SG (80 from External ALB)
- [ ] Internal ALB SG (80 from Web-Tier)
- [ ] App-Tier SG (4000 from Internal ALB)
- [ ] RDS SG (3306 from App-Tier)

### RDS Setup
- [ ] RDS MySQL created
- [ ] Endpoint: `_________________`
- [ ] Username: `_________________`
- [ ] Password saved securely
- [ ] Database `webappdb` created
- [ ] Table `users` created

## Configuration Updates

### Files to Update
- [ ] `nginx.conf` - Internal LB DNS
- [ ] `DbConfig.js` - RDS credentials
- [ ] `web-server-commands` - S3 bucket name
- [ ] `app-server-commands` - S3 bucket name

### Upload to S3
- [ ] web-tier uploaded
- [ ] app-tier uploaded
- [ ] nginx.conf uploaded

## Load Balancers

### Internal ALB
- [ ] Name: `_________________`
- [ ] DNS: `_________________`
- [ ] Target group created (Port 4000)
- [ ] Health check: /health

### External ALB
- [ ] Name: `_________________`
- [ ] DNS: `_________________`
- [ ] Target group created (Port 80)
- [ ] Health check: /health

## EC2 Deployment

### App-Tier Instance
- [ ] Launched in private subnet
- [ ] IAM role attached
- [ ] `app-server-commands` executed
- [ ] PM2 running
- [ ] Health check passing
- [ ] Registered with Internal ALB

### Web-Tier Instance
- [ ] Launched in public subnet
- [ ] IAM role attached
- [ ] `web-server-commands` executed
- [ ] Nginx running
- [ ] Health check passing
- [ ] Registered with External ALB

## Testing

### Application Testing
- [ ] Accessed External ALB URL
- [ ] Signup successful
- [ ] Login successful
- [ ] Dashboard displays correctly
- [ ] Logout works

### API Testing
- [ ] /api/health returns 200
- [ ] /api/signup works
- [ ] /api/login works
- [ ] Data persists in database

## Optional: Auto Scaling

### App-Tier ASG
- [ ] Launch template created
- [ ] ASG configured (Min: 2, Max: 4)
- [ ] Target group attached

### Web-Tier ASG
- [ ] Launch template created
- [ ] ASG configured (Min: 2, Max: 4)
- [ ] Target group attached

## Post-Deployment

- [ ] CloudWatch alarms configured
- [ ] Documentation updated
- [ ] Credentials stored securely
- [ ] Backup plan in place

## Final Verification

**Deployed by:** `_________________`  
**Date:** `_________________`  
**Application URL:** `_________________`  
**Status:** [ ] Success [ ] Failed

**Notes:**
_________________________________
_________________________________