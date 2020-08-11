import { TransactionsDao } from '../../src/dao'
import { Transactions } from '../../src/models/transactions'

Transactions.create = jest.fn()
// Transactions.findOneAndUpdate = jest.fn()
// Transactions.deleteMany = jest.fn()

describe(`TransactionsDAO CRUD testing`, () => {
  let tDao: any

  beforeAll(() => {
    tDao = new TransactionsDao()
  })

  it('should have a createTranctions method', () => {
    expect(typeof tDao.createTransaction).toBe('function')
  })

  it('should internally call Transactions.create', () => {
    tDao.createTransaction({})
    expect(Transactions.create).toBeCalled() 
  })
})

// const random = []

// random.forEach(r => {
//  describe(`Method paramater ${r} should throw err`, () => {
//   it('should have a createTranctions methods', () => {
//     const tDao = new TransactionsDao()
//     expect(typeof tDao.createTransaction).toBe('function')
//   })
// })

// })
