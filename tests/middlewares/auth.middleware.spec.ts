import request from 'supertest'
import app from './../../src/app'
import bookService from './../../src/services/book.service'

afterEach(() => {
  jest.clearAllMocks()
})

describe('auth.middleware', () => {
  describe('given a request with user-id on header', () => {
    const userId = 'google|abc123'
    const path = '/books'
    const listBooksRequest = { userId }
    let spyBookService: jest.SpyInstance
    beforeEach(async () => {
      spyBookService = jest.spyOn(bookService, 'listBooks').mockResolvedValueOnce([])
      await request(app()).get(path).set('user-id', userId)
    })
    it('should list books using book service passing userId', async () => {
      expect(spyBookService).toHaveBeenNthCalledWith(1, listBooksRequest)
    })
  })

  describe('given a request without user-id on header', () => {
    const path = '/books'
    let response: request.Response
    beforeEach(async () => {
      jest.spyOn(bookService, 'listBooks').mockResolvedValueOnce([])
      response = await request(app()).get(path)
    })
    it('should return status 401', async () => {
      expect(response.status).toBe(401)
    })
  })
})
