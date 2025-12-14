const jwt = require('jsonwebtoken');
const { open } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

async function authRequired(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const db = open();
    const user = db.prepare('SELECT id, username, email, role FROM users WHERE id = ?').get(payload.id);
    db.close();
    if (!user) return res.status(401).json({ error: 'Invalid token user' });
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  return next();
}

module.exports = { authRequired, requireAdmin, JWT_SECRET };
