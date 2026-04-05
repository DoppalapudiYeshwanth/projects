# Finance Dashboard Backend System

A scalable backend system designed to manage financial records with role-based access control and analytics.

## Features

- User authentication using JWT
- Role-based access (Admin, Analyst, Viewer)
- Financial records CRUD operations
- Filtering by category and type
- Dashboard analytics (income, expense, balance)
- Category-wise breakdown
- Input validation using Joi

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## API Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Records
POST /api/records  
GET /api/records  
PUT /api/records/:id  
DELETE /api/records/:id  

### Dashboard
GET /api/dashboard/summary  

## Setup

1. Clone repo
2. Install dependencies