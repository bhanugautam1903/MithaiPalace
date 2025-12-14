const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { migrate } = require('./db');

dotenv.config();

const authRoutes = require('./routes/auth');
// canonical sweets route implementation
const sweetsRoutes = require('./routes/sweets_impl');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Backend running' }));
app.get('/health', (req, res) => res.send('OK'));

// API
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

// centralized error handler
// any route can call next(err) to reach this
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  const status = err && err.status ? err.status : 500;
  res.status(status).json({ error: err && err.message ? err.message : 'Internal Server Error' });
});

// try to run migrations on startup (no-op if already applied)
try {
  const applied = migrate();
  if (applied && applied.length) console.log('Applied migrations on startup:', applied.join(', '));
} catch (err) {
  console.error('Migration error on startup', err && err.message);
}

// Ensure a seeded admin exists (helpful for tests and local dev)
try {
  const bcrypt = require('bcryptjs');
  const { open } = require('./db');
  const adminUser = process.env.ADMIN_USER || 'admin@mithaipalace.com';
  const adminPass = process.env.ADMIN_PASS || 'admin123';
  const db = open();
  const existing = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(adminUser, adminUser);
  if (!existing) {
    const hash = bcrypt.hashSync(adminPass, 8);
    db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)')
      .run(adminUser, adminUser, hash, 'admin');
    console.log('Seeded admin user ->', adminUser);
  }
  db.close();
} catch (err) {
  console.warn('Auto-seed admin skipped:', err && err.message);
}

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
