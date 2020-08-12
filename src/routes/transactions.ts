import { Response, Request } from 'express'

/**
 * @constructor CompanyRoute
 * Connects to the company service to get access to CRUD (create, read, upodate, delete)
 * operations on companies object
 */
class TransactionsRoute {
  options: any
  router: any

  constructor (options: any = {}) {
    this.options = options
    this.router = options.expressRouter
  }

  /**
   * initializes and registers the transactions route to the application
   * @param {Object} - express application object
   * @returns void
   * @throws - throws error if something goes wrong
   *
   */
  initialize (): void {
    this.router.post('/transactions', (req: Request, res: Response) =>
      this.createTransaction(req, res)
    )
    this.router.get('/transactions', (req: Request, res: Response) =>
      this.getTransactions(req, res)
    )
  }

  /**
   * retrieves all transactions
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns any
   * @throws - throws error if something goes wrong
   *
   */
  async getTransactions (req: Request, res: Response) {
    try {
      res.json('hello, it got here')
    } catch (err) {
      throw err
    }
  }

  /**
   * creates a new transaction and saves it to the database
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns any
   * @throws - throws error if something goes wrong
   *
   */
  async createTransaction (req: Request, res: Response) {
    try {
      res.json('hello, it got here')
    } catch (err) {
      throw err
    }
  }
}

export { TransactionsRoute }
