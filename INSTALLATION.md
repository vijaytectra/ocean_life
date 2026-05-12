# Ocean Lifespaces CMS Installation Guide

Follow these steps to set up the website and Admin CMS on your local machine or server.

## 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

## 2. Installation Steps

### Step 1: Install Dependencies
Open your terminal in the project root directory and run:
```bash
npm install
```

### Step 2: Database Setup
This project uses **SQLite** for easy setup. You need to sync the database schema and generate the Prisma Client:
```bash
npx prisma db push
npx prisma generate
```

### Step 3: Seed Initial Data
Create the default admin user, roles, and initial content (including your logos):
```bash
node prisma/seed.js
```

### Step 4: Start the Application
Run the development server:
```bash
npm run dev
```
The website will be available at: **http://localhost:3000**
The Admin Panel will be available at: **http://localhost:3000/admin**

---

## 3. Admin Credentials (Initial)
- **Username:** `admin`
- **Password:** `password123`

> [!IMPORTANT]
> For security, please change your password immediately after logging in via the **User Management** section in the Admin Panel.

## 4. Troubleshooting
- **Port Conflict:** If port 3000 is in use, run `PORT=3001 npm run dev`.
- **Database Error:** If you see "prisma client not found", run `npx prisma generate` again.
- **Missing Logos:** If logos don't appear after first setup, run `node prisma/seed.js` again to ensure they are in the database.
