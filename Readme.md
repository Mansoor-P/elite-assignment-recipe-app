# Elite Tech Park E-commerce

## Description
Elite Tech Park is a modern e-commerce platform that allows users to browse, purchase products, and manage their accounts. The project is split into **backend** and **frontend** sections.

---

### **Tech Stack:**
| **Category**  | **Technology**  |
|--------------|----------------|
| **Frontend**  | React (Vite), Tailwind CSS, Axios, React Router  |
| **Backend**   | Node.js, Express.js, JWT, bcrypt, express-validator  |
| **Database**  | MySQL (with Sequelize ORM)  |
| **Security**  | JWT authentication, bcrypt hashing, Role-based Access Control (RBAC)  |
| **Tools**     | Postman, Git, VS Code, MySQL Workbench  |
---

## Project Structure
The project is organized into two main folders:
- **backend/**: Contains the API server and business logic.
- **frontend/**: Contains the React app and UI components.

## Features
- User authentication (signup, login)
- Role-based authentication
- CRUD operations for products

## Getting Started
To get started with both the frontend and backend:

### Backend Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/Mansoor-P/elite-tech-park.git

### **Key Features:**

#### **Backend (Node.js, Express, MySQL)**
- **User Authentication & Role-Based Access:**  
  - Secure authentication with JWT.  
  - Role-based permissions for different actions.  
  - Passwords are securely hashed using bcrypt.  

- **User Management:**  
  - Buyers and Vendors can sign up and log in.  
  - Staff can only be created by Admins.  
  - A default **Super-Admin** exists with full system control.  

- **Product Management:**  
  - CRUD operations for products based on user roles.  
  - Products include **name, description, category, images, price (old & new), discount, and expiry date**.  
  - Vendors and Staff can add products, but **Admin has full control**.  
  - Products expire **7 days after their scheduled start date**.  
  - Unique **SEO-friendly product URLs**.  

- **Search & Filtering:**  
  - **Server-side pagination** for optimized performance.  
  - Search products by **name, category, price range, vendor, and expiry date**.  

- **Security & Data Handling:**  
  - Authentication middleware to protect routes.  
  - Input validation using `express-validator`.  
  - Secure database queries using parameterized SQL.  

- **API Documentation & Testing:**  
  - All endpoints are documented in **Postman Collection**.  
  - Database schema provided as a **SQL dump file**.  

---

#### **Frontend (React, Vite, Tailwind CSS)**
- **User-Friendly UI:**  
  - Clean, modern, and responsive UI using **Tailwind CSS**.  
  - Dynamic routing with **React Router**.  

- **Role-Specific Dashboards:**  
  - **Admin Panel**: Manage users, staff, vendors, and products.  
  - **Vendor Panel**: Add, edit, and view own products.  
  - **Staff Panel**: Manage products for assigned vendors.  
  - **Buyer (User) Page**: Browse and search for products.  

- **Authentication & Authorization:**  
  - Login and Signup pages with form validation.  
  - Role-based redirection after login.  

- **Product Listing & Details:**  
  - Display **all available products** with pagination.  
  - Show vendor details, expiry time, and discounts dynamically.  
  - **Filter & search** options for buyers.  

- **Optimized API Calls:**  
  - Efficient state management using **React hooks**.  
  - API requests handled with **Axios**.  

---

### **Tech Stack:**
| **Category**  | **Technology**  |
|--------------|----------------|
| **Frontend**  | React (Vite), Tailwind CSS, Axios, React Router  |
| **Backend**   | Node.js, Express.js, JWT, bcrypt, express-validator  |
| **Database**  | MySQL (with Sequelize ORM)  |
| **Security**  | JWT authentication, bcrypt hashing, Role-based Access Control (RBAC)  |
| **Tools**     | Postman, Git, VS Code, MySQL Workbench  |

---

### **Deployment & Usage:**
1. **Clone the Repository**  
   ```sh
   git clone <repo_url>
   cd project-folder
   ```

2. **Backend Setup**
   ```sh
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Database Setup**
   - Import the **provided SQL dump** into MySQL.  
   - Update the `.env` file with database credentials.  

# REST API Endpoints

## **Authentication Endpoints**

### **User Authentication**
- **Register User** → `POST /api/auth/signup`
- **Login User** → `POST /api/auth/login`


## **Product Management**

### **Products (Public)**
- **Get All Products** → `GET /api/products/list`
- **Get Single Product** → `GET /api/products/:id`

