import request from 'supertest'
import { app } from '../../src/app'


describe('POST /transactions', () => {
    it('should return 200 OK', (done) => {
    //   return  request('http://localhost:5555')
    return request(app)
      .post('/transactions')
      .expect(200, done)
  })
})
