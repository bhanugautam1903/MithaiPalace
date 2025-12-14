const express = require('express');
const { open } = require('../db');
const { authRequired, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// List all sweets
router.get('/', async (req, res) => {
  const db = open();
  try {
    const rows = db.prepare('SELECT * FROM sweets ORDER BY id').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

// Search
router.get('/search', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query || {};
  const db = open();
  try {
    let sql = 'SELECT * FROM sweets WHERE 1=1';
    const params = [];
    if (q) { sql += ' AND name LIKE ?'; params.push(`%${q}%`); }
    if (category) { sql += ' AND category = ?'; params.push(category); }
    if (minPrice) { sql += ' AND price >= ?'; params.push(Number(minPrice)); }
    if (maxPrice) { sql += ' AND price <= ?'; params.push(Number(maxPrice)); }
    const rows = db.prepare(sql).all(...params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

// Add new sweet (admin)
router.post('/', authRequired, requireAdmin, (req, res) => {
  const { name, category, price, quantity } = req.body || {};
  if (!name || price == null) return res.status(400).json({ error: 'name and price required' });
  const db = open();
  try {
    const info = db.prepare('INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)')
      .run(name, category || null, Number(price), Number(quantity || 0));
    const sweet = db.prepare('SELECT * FROM sweets WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

// Update sweet (admin)
router.put('/:id', authRequired, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const { name, category, price, quantity } = req.body || {};
  const db = open();
  try {
    const existing = db.prepare('SELECT * FROM sweets WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    db.prepare('UPDATE sweets SET name = ?, category = ?, price = ?, quantity = ? WHERE id = ?')
      .run(name || existing.name, category || existing.category, price != null ? Number(price) : existing.price, quantity != null ? Number(quantity) : existing.quantity, id);
    const sweet = db.prepare('SELECT * FROM sweets WHERE id = ?').get(id);
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

// Delete sweet (admin)
router.delete('/:id', authRequired, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const db = open();
  try {
    const info = db.prepare('DELETE FROM sweets WHERE id = ?').run(id);
    if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

// Purchase sweet (decrement quantity)
router.post('/:id/purchase', authRequired, (req, res) => {
  const id = Number(req.params.id);
  const db = open();
  try {
    const row = db.prepare('SELECT quantity FROM sweets WHERE id = ?').get(id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    if (row.quantity <= 0) return res.status(400).json({ error: 'Out of stock' });
    db.exec('BEGIN');
    db.prepare('UPDATE sweets SET quantity = quantity - 1 WHERE id = ?').run(id);
    const updated = db.prepare('SELECT * FROM sweets WHERE id = ?').get(id);
    db.exec('COMMIT');
    res.json(updated);
  } catch (err) {
    try { db.exec('ROLLBACK'); } catch (e) {}
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

// Restock (admin)
router.post('/:id/restock', authRequired, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const { amount } = req.body || {};
  const delta = amount != null ? Number(amount) : 1;
  if (delta <= 0) return res.status(400).json({ error: 'amount must be positive' });
  const db = open();
  try {
    const row = db.prepare('SELECT * FROM sweets WHERE id = ?').get(id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    db.prepare('UPDATE sweets SET quantity = quantity + ? WHERE id = ?').run(delta, id);
    const updated = db.prepare('SELECT * FROM sweets WHERE id = ?').get(id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

module.exports = router;
