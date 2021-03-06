import request from 'supertest'
import Book from '../../src/models/Book'
import { CreateBookRequest, UpdateBookRequest } from '../../src/requests/book.requests'
import app from './../../src/app'
import bookService from './../../src/services/book.service'

afterEach(() => {
  jest.clearAllMocks()
})

describe('routes', () => {
  const userId = 'google|abc123'
  describe('GET /books', () => {
    const path = '/books'
    const listRequest = { userId }
    describe('given book service returns books', () => {
      let spyBookService: jest.SpyInstance, response: request.Response
      const mockBooks: Book[] = [
        { _id: '1', title: 'a', author: 'c', subject: 's' },
        { _id: '2', title: 'b', author: 'd', subject: 's' },
      ]
      beforeEach(async () => {
        spyBookService = jest.spyOn(bookService, 'listBooks').mockResolvedValueOnce(mockBooks)
        response = await request(app()).get(path).set('user-id', userId)
      })
      it('should list books using book service', async () => {
        expect(spyBookService).toHaveBeenNthCalledWith(1, listRequest)
      })
      it('should return books and status 200', async () => {
        expect(response.body).toEqual(mockBooks)
        expect(response.status).toEqual(200)
      })
    })
    describe('given book service rejects with an error', () => {
      let response: request.Response
      const mockError = new Error('failed to list books')
      beforeEach(async () => {
        jest.spyOn(bookService, 'listBooks').mockRejectedValueOnce(mockError)
        response = await request(app()).get(path).set('user-id', userId)
      })
      it('should return status 500', async () => {
        expect(response.status).toEqual(500)
      })
    })
  })

  describe('POST /books', () => {
    const path = '/books'
    describe('given a valid payload', () => {
      const payload = {
        title: 'a',
        author: 'b',
        subject: 'c',
        additionalInfo: 'd',
        isbn: 'e',
        publisher: 'p',
        length: '200',
        publicationYear: '1999',
        coverUrl: 'c'
      }
      const createRequest: CreateBookRequest = {
        userId,
        title: payload.title,
        author: payload.author,
        subject: payload.subject,
        additionalInfo: payload.additionalInfo,
        isbn: payload.isbn,
        publisher: payload.publisher,
        length: parseInt(payload.length),
        publicationYear: parseInt(payload.publicationYear),
        coverUrl: payload.coverUrl,
      }
      describe('given book service creates book', () => {
        let spyBookService: jest.SpyInstance, response: request.Response
        const mockBook: Book = { _id: '1', title: 'a', author: 'b', subject: 'c' }
        beforeEach(async () => {
          spyBookService = jest.spyOn(bookService, 'createBook').mockResolvedValueOnce(mockBook)
          response = await request(app()).post(path).send(payload).set('user-id', userId)
        })
        it('should create book using book service', async () => {
          expect(spyBookService).toHaveBeenNthCalledWith(1, createRequest)
        })
        it('should return book and status 201', async () => {
          expect(response.body).toEqual(mockBook)
          expect(response.status).toEqual(201)
        })
      })
      describe('given book service rejects with an error', () => {
        let response: request.Response
        const mockError = new Error('failed to create book')
        beforeEach(async () => {
          jest.spyOn(bookService, 'createBook').mockRejectedValueOnce(mockError)
          response = await request(app()).post(path).send(payload).set('user-id', userId)
        })
        it('should return status 500', async () => {
          expect(response.status).toEqual(500)
        })
      })
    })
    describe('given a payload without title', () => {
      const payload = { author: 'a', subject: 's' }
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).post(path).send(payload).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
    describe('given a payload without author', () => {
      const payload = { title: 'a', subject: 's' }
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).post(path).send(payload).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
    describe('given a payload without subject', () => {
      const payload = { title: 'a', author: 'b' }
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).post(path).send(payload).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
    describe('given a payload without non numeric length', () => {
      const payload = { title: 'a', author: 'b', subject: 'c', length: 'z' }
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).post(path).send(payload).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
    describe('given a payload without non numeric publication year', () => {
      const payload = { title: 'a', author: 'b', subject: 'c', publicationYear: 'z' }
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).post(path).send(payload).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
    describe('given a payload with an unknown property', () => {
      const payload = { title: 'a', author: 'b', subject: 'c', other: 'z' }
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).post(path).send(payload).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
  })

  describe('PUT /books/:bookId', () => {
    describe('given a valid bookId', () => {
      const bookId = '60435f3cb9acc28819accc24'
      const path = `/books/${bookId}`
      describe('given a valid payload', () => {
        const payload = {
          title: 'a',
          author: 'b',
          subject: 'c',
          additionalInfo: 'd',
          isbn: 'e',
          publisher: 'p',
          length: '200',
          publicationYear: '1999',
          coverUrl: '1999'
        }
        const updateRequest: UpdateBookRequest = {
          _id: bookId,
          userId,
          title: payload.title,
          author: payload.author,
          subject: payload.subject,
          additionalInfo: payload.additionalInfo,
          isbn: payload.isbn,
          publisher: payload.publisher,
          length: parseInt(payload.length),
          publicationYear: parseInt(payload.publicationYear),
          coverUrl: payload.coverUrl
        }
        describe('given book service updates book', () => {
          let spyBookService: jest.SpyInstance, response: request.Response
          const mockBook: Book = { _id: '1', title: 'a', author: 'c', subject: 's' }
          beforeEach(async () => {
            spyBookService = jest.spyOn(bookService, 'updateBook').mockResolvedValueOnce(mockBook)
            response = await request(app()).put(path).send(payload).set('user-id', userId)
          })
          it('should update book using book service', async () => {
            expect(spyBookService).toHaveBeenNthCalledWith(1, updateRequest)
          })
          it('should return book and status 200', async () => {
            expect(response.body).toEqual(mockBook)
            expect(response.status).toEqual(200)
          })
        })
        describe('given book service rejects with an error', () => {
          let response: request.Response
          const mockError = new Error('failed to update book')
          beforeEach(async () => {
            jest.spyOn(bookService, 'updateBook').mockRejectedValueOnce(mockError)
            response = await request(app()).put(path).send(payload).set('user-id', userId)
          })
          it('should return status 500', async () => {
            expect(response.status).toEqual(500)
          })
        })
      })
      describe('given a payload without title', () => {
        const payload = { author: 'a', subject: 's' }
        let response: request.Response
        beforeEach(async () => {
          response = await request(app()).put(path).send(payload).set('user-id', userId)
        })
        it('should return status 400', async () => {
          expect(response.status).toEqual(400)
        })
      })
      describe('given a payload without author', () => {
        const payload = { title: 'a', subject: 's' }
        let response: request.Response
        beforeEach(async () => {
          response = await request(app()).put(path).send(payload).set('user-id', userId)
        })
        it('should return status 400', async () => {
          expect(response.status).toEqual(400)
        })
      })
      describe('given a payload without subject', () => {
        const payload = { title: 'a', author: 'b' }
        let response: request.Response
        beforeEach(async () => {
          response = await request(app()).put(path).send(payload).set('user-id', userId)
        })
        it('should return status 400', async () => {
          expect(response.status).toEqual(400)
        })
      })
      describe('given a payload with a non numeric length', () => {
        const payload = { title: 'a', author: 'b', subject: 's', length: 'z' }
        let response: request.Response
        beforeEach(async () => {
          response = await request(app()).put(path).send(payload).set('user-id', userId)
        })
        it('should return status 400', async () => {
          expect(response.status).toEqual(400)
        })
      })
      describe('given a payload with a non numeric publication year', () => {
        const payload = { title: 'a', author: 'b', subject: 's', publicationYear: 'z' }
        let response: request.Response
        beforeEach(async () => {
          response = await request(app()).put(path).send(payload).set('user-id', userId)
        })
        it('should return status 400', async () => {
          expect(response.status).toEqual(400)
        })
      })
      describe('given a payload with an unknown property', () => {
        const payload = { title: 'a', author: 'b', subject: 's', other: 'z' }
        let response: request.Response
        beforeEach(async () => {
          response = await request(app()).put(path).send(payload).set('user-id', userId)
        })
        it('should return status 400', async () => {
          expect(response.status).toEqual(400)
        })
      })
    })
    describe('given an invalid bookId', () => {
      const bookId = '1'
      const path = `/books/${bookId}`
      const payload = { title: 'a', author: 'a' }
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).put(path).send(payload).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
  })

  describe('GET /books/:bookId', () => {
    describe('given a valid bookId', () => {
      const bookId = '60435f3cb9acc28819accc24'
      const path = `/books/${bookId}`
      const getRequest = { _id: bookId, userId }
      describe('given book service gets book', () => {
        let spyBookService: jest.SpyInstance, response: request.Response
        const mockBook: Book = { _id: '1', title: 'a', author: 'c', subject: 's' }
        beforeEach(async () => {
          spyBookService = jest.spyOn(bookService, 'getBook').mockResolvedValueOnce(mockBook)
          response = await request(app()).get(path).set('user-id', userId)
        })
        it('should get book using book service', async () => {
          expect(spyBookService).toHaveBeenNthCalledWith(1, getRequest)
        })
        it('should return book and status 200', async () => {
          expect(response.body).toEqual(mockBook)
          expect(response.status).toEqual(200)
        })
      })
      describe('given book service does not find book', () => {
        let response: request.Response
        const mockBook: Book = null
        beforeEach(async () => {
          jest.spyOn(bookService, 'getBook').mockResolvedValueOnce(mockBook)
          response = await request(app()).get(path).set('user-id', userId)
        })
        it('should return status 404', async () => {
          expect(response.status).toEqual(404)
        })
      })
      describe('given book service rejects with an error', () => {
        let response: request.Response
        const mockError = new Error('failed to update book')
        beforeEach(async () => {
          jest.spyOn(bookService, 'getBook').mockRejectedValueOnce(mockError)
          response = await request(app()).get(path).set('user-id', userId)
        })
        it('should return status 500', async () => {
          expect(response.status).toEqual(500)
        })
      })
    })
    describe('given an invalid bookId', () => {
      const bookId = '1'
      const path = `/books/${bookId}`
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).get(path).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
  })

  describe('DELETE /books/:bookId', () => {
    describe('given a valid bookId', () => {
      const bookId = '60435f3cb9acc28819accc24'
      const path = `/books/${bookId}`
      const deleteRequest = { _id: bookId, userId }
      describe('given book service deletes book', () => {
        let spyBookService: jest.SpyInstance, response: request.Response
        beforeEach(async () => {
          spyBookService = jest.spyOn(bookService, 'deleteBook').mockResolvedValueOnce()
          response = await request(app()).delete(path).set('user-id', userId)
        })
        it('should delete book using book service', async () => {
          expect(spyBookService).toHaveBeenNthCalledWith(1, deleteRequest)
        })
        it('should return status 204', async () => {
          expect(response.status).toEqual(204)
        })
      })
      describe('given book service rejects with an error', () => {
        let response: request.Response
        const mockError = new Error('failed to delete book')
        beforeEach(async () => {
          jest.spyOn(bookService, 'deleteBook').mockRejectedValueOnce(mockError)
          response = await request(app()).delete(path).set('user-id', userId)
        })
        it('should return status 500', async () => {
          expect(response.status).toEqual(500)
        })
      })
    })
    describe('given an invalid bookId', () => {
      const bookId = '1'
      const path = `/books/${bookId}`
      let response: request.Response
      beforeEach(async () => {
        response = await request(app()).delete(path).set('user-id', userId)
      })
      it('should return status 400', async () => {
        expect(response.status).toEqual(400)
      })
    })
  })
})
