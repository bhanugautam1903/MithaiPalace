const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DB_FILE = process.env.DB_FILE || path.join(__dirname, '..', 'data', 'db.sqlite');
const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

function ensureDataDir() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function open() {
  ensureDataDir();
  const db = new Database(DB_FILE);
  // ensure migrations table exists
  db.exec(`CREATE TABLE IF NOT EXISTS __migrations (name TEXT PRIMARY KEY, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP);`);
  return db;
}

function getPendingMigrations() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];
  const files = fs.readdirSync(MIGRATIONS_DIR).filter(f => f.endsWith('.sql')).sort();
  const db = open();
  const stmt = db.prepare('SELECT name FROM __migrations');
  const applied = new Set(stmt.all().map(r => r.name));
  db.close();
  return files.filter(f => !applied.has(f));
}

function applyMigration(file) {
  const db = open();
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
  db.exec('BEGIN');
  try {
    db.exec(sql);
    const insert = db.prepare('INSERT INTO __migrations (name) VALUES (?)');
    insert.run(file);
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    db.close();
    throw err;
  }
  db.close();
}

function migrate() {
  const pending = getPendingMigrations();
  pending.forEach(f => applyMigration(f));
  return pending;
}

module.exports = { open, migrate, DB_FILE };
