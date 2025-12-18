# 🐾 ConectaPet - Backend

[![pt-BR](https://img.shields.io/badge/lang-pt--BR-green.svg)](README.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](README.en.md)

## 📋 Overview

**ConectaPet** is a RESTful API developed as the final project for the **Geração Tech 2.0** course. This application provides all the necessary backend infrastructure for a complete pet adoption system, including:

- 🔐 Authentication and authorization system with JWT
- 👥 Complete user management (guardians and adopters)
- 🐕 Registration and management of pets available for adoption
- 📝 Adoption process control
- 📧 Verification emails and notifications
- 📸 Image upload and management
- 📚 Interactive documentation with Swagger

The project was developed following best development practices, with a focus on clean architecture, security, and frontend integration.

---

## 🚀 Technologies Used

### Core

- **Node.js** – JavaScript runtime environment
- **Express** – Web framework for building REST APIs
- **MySQL** – Relational database
- **Sequelize** – ORM for database modeling and manipulation

### Security and Authentication

- **Bcrypt** – Password encryption
- **JSON Web Token (JWT)** – Token-based authentication
- **CORS** – Cross-origin access control
- **Joi** – Backend data validation

### Features

- **Multer** – File upload handling
- **Nodemailer** – SMTP email sending

### Development and Documentation

- **Dotenv** – Environment variables management
- **Nodemon** – Automatic server restart during development
- **Jest** – Unit and integration testing
- **Swagger JS Docs and UI Express** – Interactive API documentation

---

## 📦 How to Run Locally

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- Git

### Step by Step

1. **Clone the repository**

   ```bash
   git clone https://github.com/flaviare1s/conectapet-back.git
   cd conectapet-back
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   - Copy the `.env.example` file to `.env`
   - Configure the following variables:
     ```env
     DB_HOST=localhost
     DB_USER=your_user
     DB_PASSWORD=your_password
     DB_NAME=conectapet_db
     JWT_SECRET=your_secret_key
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_email_password
     ```

4. **Create the database**

   ```sql
   CREATE DATABASE conectapet_db;
   ```

5. **Start the server**

   ```bash
   npm start
   ```

6. **Populate the database with sample data (optional)**

   ```bash
   npm run seed
   ```

7. **Access Swagger documentation**
   ```bash
   npm run swagger
   ```
   Open your browser at: `http://localhost:3000/api-docs`

---

## 🧪 Testing

Run unit and integration tests with Jest:

```bash
npm run test
```

Test branch: `tests`

---

## 🌐 Deployment

- **Frontend**: Hosted on Vercel
- **Backend**: Hosted on Render
- **Database**: TiDB Cloud

**🔗 Production Application**: [https://conectapet-front.vercel.app/](https://conectapet-front.vercel.app/)

---

## 📡 API Routes

### Authentication

```
POST   /request-verification   - Request email verification for new user
POST   /verify-email           - Verify email and create account
POST   /auth                   - User login
POST   /auth/refresh-token     - Refresh JWT token
```

### Users

```
GET    /users                  - List all users
GET    /users/:id              - Get user by ID
PUT    /users/:id              - Update user data
DELETE /users/:id              - Remove user
```

### Pets

```
POST   /pets                   - Register new pet
GET    /pets                   - List all pets
GET    /pets/:id               - Get pet by ID
PUT    /pets/:id               - Update pet data
DELETE /pets/:id               - Remove pet
```

### Adoptions

```
POST   /adoptions              - Request pet adoption
GET    /adoptions              - List adoption requests (guardian)
GET    /adoptions/:id          - Get request by ID
PUT    /adoptions/:id          - Update adoption status (guardian)
DELETE /adoptions/:id          - Cancel adoption request
```

For complete endpoint details, access the Swagger documentation at `/api-docs`

---

## 🗄️ Database Diagram

![Database Diagram](https://github.com/user-attachments/assets/049daf57-1278-4f07-9358-ff71f1253384)

---

## 🔗 Frontend Integration

For the complete application functionality, you also need to run the frontend:

**Frontend Repository**: [conectapet-front](https://github.com/flaviare1s/conectapet-front)

> ⚠️ **Note**: The default expected port for the backend is **3000**.

---

## 📂 Project Structure

```
conectapet-back/
├── src/
│   ├── config/           # Configurations (database, etc)
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Middlewares (authentication, errors, etc)
│   ├── models/           # Sequelize models
│   ├── repositories/     # Data access layer
│   ├── routes/           # Route definitions
│   ├── seeders/          # Seeds to populate the database
│   ├── services/         # Business logic
│   └── utils/            # Utility functions
├── uploads/              # Uploaded files (images)
├── .env.example          # Environment variables example
└── package.json          # Project dependencies
```

---

## 👥 Development Team

| Developer | GitHub                                             |
| --------- | -------------------------------------------------- |
| André     | [@AndreFMoura11](https://github.com/AndreFMoura11) |
| Flávia    | [@flaviare1s](https://github.com/flaviare1s)       |
| Lucas     | [@1uc-dev](https://github.com/1uc-dev)             |
| Olavo     | [@olavoVieira](https://github.com/olavoVieira)     |
| Palloma   | [@pallomadvm](https://github.com/pallomadvm)       |

---

## 📄 License

This project was developed for educational purposes as part of the Geração Tech 2.0 course.

---

<div align="center">
  Developed the ConectaPet team
</div>
