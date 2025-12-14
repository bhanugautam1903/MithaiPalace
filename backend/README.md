# Backend (Sweet Shop)

This folder contains the backend API for the Sweet Shop Management System.

Quick start

1. Install dependencies

```powershell
cd backend
npm install
```

2. Run migrations and seed the database (creates a sqlite DB and inserts an admin user and sample sweets)

```powershell
npm run migrate
npm run seed
```

3. Start the server

```powershell
npm run start
```

Default admin credentials (from seed):
- username: admin
- password: adminpass

API endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/sweets
- GET /api/sweets/search
- POST /api/sweets (admin)
- PUT /api/sweets/:id (admin)
- DELETE /api/sweets/:id (admin)
- POST /api/sweets/:id/purchase (auth)
- POST /api/sweets/:id/restock (admin)

Environment variables

Create a `.env` file in `backend/` with at least:

```
JWT_SECRET=your_jwt_secret_here
PORT=4000
DB_FILE=./data/db.sqlite
```

Tests

```powershell
npm test
```

