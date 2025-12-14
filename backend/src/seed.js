const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { open, migrate, DB_FILE } = require('./db');

async function run() {
  console.log('DB file:', DB_FILE);
  const pending = migrate();
  if (pending.length) console.log('Applied migrations:', pending.join(', '));
  else console.log('No pending migrations');

  const db = open();

  // ensure admin exists
  // default seeded admin matches frontend demo credentials
  const adminUsername = process.env.ADMIN_USER || 'admin@mithaipalace.com';
  const adminPassword = process.env.ADMIN_PASS || 'admin123';
  const hashed = bcrypt.hashSync(adminPassword, 8);

  const exists = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(adminUsername, adminUsername);
  if (!exists) {
    db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)')
      .run(adminUsername, adminUsername, hashed, 'admin');
    console.log('Inserted admin user ->', adminUsername);
  } else {
    console.log('Admin user already exists');
  }

  // insert sample sweets if none exist
  const sweetCount = db.prepare('SELECT COUNT(1) as c FROM sweets').get().c;
  if (!sweetCount) {
    const insert = db.prepare('INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)');
    insert.run('Chocolate Truffle', 'Chocolate', 2.5, 20);
    insert.run('Strawberry Candy', 'Fruity', 1.25, 50);
    insert.run('Caramel Bite', 'Caramel', 1.75, 30);
    console.log('Inserted sample sweets');
  } else {
    console.log('Sweets already seeded');
  }

  db.close();
  console.log('Seeding complete');
}

run().catch(err => {
  console.error('Seed error', err && err.message);
  process.exit(1);
});
