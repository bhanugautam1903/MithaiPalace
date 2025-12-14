const request = require('supertest');
const app = require('../src/index');

let token;

beforeAll(async () => {
  const res = await request(app).post('/api/auth/login').send({ username: 'admin@mithaipalace.com', password: 'admin123' });
  token = res.body.token;
});

describe('Sweets', () => {
  test('GET /api/sweets returns array', async () => {
    const res = await request(app).get('/api/sweets').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('purchase reduces quantity', async () => {
    // get a sweet id
    const list = await request(app).get('/api/sweets').expect(200);
    const sweet = list.body[0];
    const before = sweet.quantity;
    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/purchase`)
      .set('Authorization', `Bearer ${token}`)
      .expect(before > 0 ? 200 : 400);
    if (before > 0) {
      expect(res.body.quantity).toBe(before - 1);
    }
  });
});
