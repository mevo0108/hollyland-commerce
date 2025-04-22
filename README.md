# HollyLand E-commerce

A modern, full-stack e-commerce application built with React, Express, and PostgreSQL.

## Features

- **Product Catalog**: Browse products by categories
- **Shopping Cart**: Add and manage items
- **Checkout System**: Complete order with customer information
- **Admin Dashboard**: Manage products, categories, and orders (for authenticated users)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React 18
- TailwindCSS
- Shadcn UI Components (Radix UI)
- React Hook Form with Zod validation
- React Query for data fetching
- Wouter for routing

### Backend
- Express.js
- PostgreSQL database
- Drizzle ORM
- Passport.js for authentication
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (local or remote)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/hollyland-commerce.git
   cd hollyland-commerce
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL="postgres://username:password@hostname:port/database"
   ```

4. Set up the database
   ```bash
   # Push schema to database
   npm run db:push
   
   # Seed the database with initial data
   npm run seed
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `/client` - Frontend React application
- `/server` - Express backend API
- `/shared` - Shared code between client and server (schemas, types)
- `/migrations` - Database migration files (generated)

## Database Schema

The application uses the following data models:
- Products
- Categories
- Cart Items
- Orders
- Users

## License

This project is licensed under the MIT License - see the LICENSE file for details.