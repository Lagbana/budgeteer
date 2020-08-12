import request from 'supertest'
import { app } from '../../src/app'


describe('POST /transactions', () => {
  it('should return 200 OK', done => {
    // const response = await request(app).post('/transactions')
    // expect(response.status).toBe(200)
    // done()
    request(app)
      .post('/transactions')
      .expect(200, done)
  })
})

describe('GET /transactions', () => {
  it('should return 200 OK', done => {
    // const response = await request(app).get('/transactions')
    // expect(response.status).toBe(200)
    // done()
    request(app)
      .get('/transactions')
      .expect(200, done)
  })
})
