const request = require('supertest');
const app = require('../src/index');

describe('Auth', () => {
  test('admin can login and receive token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin@mithaipalace.com', password: 'admin123' })
      .expect(200);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user).toBeTruthy();
    expect(res.body.user.role).toBe('admin');
  });
});
