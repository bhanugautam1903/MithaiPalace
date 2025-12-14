const express = require('express');
const { open } = require('../db');
const { authRequired, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/sweets - list all sweets
router.get('/', (req, res) => {
  const db = open();
  try {
    const rows = db.prepare('SELECT * FROM sweets ORDER BY id').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

// GET /api/sweets/search?q=&category=&minPrice=&maxPrice=
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

// POST /api/sweets - create (admin only)
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

// PUT /api/sweets/:id - update (admin only)
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

// DELETE /api/sweets/:id - delete (admin only)
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

// POST /api/sweets/:id/purchase - purchase (authenticated users)
router.post('/:id/purchase', authRequired, (req, res) => {
  const id = Number(req.params.id);
  const qty = Number(req.body && req.body.quantity != null ? req.body.quantity : 1);
  const db = open();
  try {
    // Try to atomically decrement when sufficient stock exists
    const info = db.prepare('UPDATE sweets SET quantity = quantity - ? WHERE id = ? AND quantity >= ?').run(qty, id, qty);
    if (!info || info.changes === 0) {
      // check whether the sweet exists
      const exists = db.prepare('SELECT 1 as ok FROM sweets WHERE id = ?').get(id);
      if (!exists) return res.status(404).json({ error: 'Not found' });
      return res.status(400).json({ error: 'Insufficient stock' });
    }
  const updated = db.prepare('SELECT * FROM sweets WHERE id = ?').get(id);
  // return the updated sweet object (tests expect the sweet at top-level)
  res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

// POST /api/sweets/:id/restock - restock (admin only)
router.post('/:id/restock', authRequired, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const qty = Number(req.body && req.body.quantity != null ? req.body.quantity : 1);
  const db = open();
  try {
    const sweet = db.prepare('SELECT * FROM sweets WHERE id = ?').get(id);
    if (!sweet) return res.status(404).json({ error: 'Not found' });
    db.prepare('UPDATE sweets SET quantity = quantity + ? WHERE id = ?').run(qty, id);
    const updated = db.prepare('SELECT * FROM sweets WHERE id = ?').get(id);
    res.json({ success: true, sweet: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally { db.close(); }
});

module.exports = router;
