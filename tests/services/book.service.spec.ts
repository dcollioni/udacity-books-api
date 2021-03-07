import bookService from './../../src/services/book.service'
import bookRepository from './../../src/data/repositories/book.repository'
import Book from '../../src/models/Book'

afterEach(() => {
  jest.clearAllMocks()
})

describe('book.service', () => {
  const userId = 'google|abc123'
  describe('listBooks', () => {
    const request = { userId }
    describe('given book repository returns books', () => {
      let spyBookRepository: jest.SpyInstance, books: Book[]
      const mockBooks: Book[] = [
        { _id: '1', title: 'a', author: 'c' },
        { _id: '2', title: 'b', author: 'd' },
      ]
      beforeEach(async () => {
        spyBookRepository = jest.spyOn(bookRepository, 'listBooks').mockResolvedValueOnce(mockBooks)
        books = await bookService.listBooks(request)
      })
      it('should call book repository to list books', async () => {
        expect(spyBookRepository).toHaveBeenCalledTimes(1)
      })
      it('should return books', async () => {
        expect(books).toEqual(mockBooks)
      })
    })
    describe('given book repository rejects with an error', () => {
      const mockError = new Error('failed to list books')
      beforeEach(async () => {
        jest.spyOn(bookRepository, 'listBooks').mockRejectedValueOnce(mockError)
      })
      it('should reject with the error', async () => {
        await expect(bookService.listBooks(request)).rejects.toBe(mockError)
      })
    })
  })

  describe('createBook', () => {
    const request = { title: 'a', author: 'b', userId }
    describe('given book repository creates book', () => {
      let spyBookRepository: jest.SpyInstance, book: Book
      const mockBook: Book = { _id: '1', title: 'a', author: 'c' }
      beforeEach(async () => {
        spyBookRepository = jest.spyOn(bookRepository, 'createBook').mockResolvedValueOnce(mockBook)
        book = await bookService.createBook(request)
      })
      it('should call book repository to create book', async () => {
        expect(spyBookRepository).toHaveBeenNthCalledWith(1, request)
      })
      it('should return book', async () => {
        expect(book).toEqual(mockBook)
      })
    })
    describe('given book repository rejects with an error', () => {
      const mockError = new Error('failed to create book')
      beforeEach(async () => {
        jest.spyOn(bookRepository, 'createBook').mockRejectedValueOnce(mockError)
      })
      it('should reject with the error', async () => {
        await expect(bookService.createBook(request)).rejects.toBe(mockError)
      })
    })
  })

  describe('updateBook', () => {
    const request = { _id: '1', title: 'a', author: 'b', userId }
    describe('given book repository updates book', () => {
      let spyBookRepository: jest.SpyInstance, book: Book
      beforeEach(async () => {
        spyBookRepository = jest.spyOn(bookRepository, 'updateBook').mockResolvedValueOnce(request)
        book = await bookService.updateBook(request)
      })
      it('should call book repository to update book', async () => {
        expect(spyBookRepository).toHaveBeenNthCalledWith(1, request)
      })
      it('should return book', async () => {
        expect(book).toEqual(request)
      })
    })
    describe('given book repository rejects with an error', () => {
      const mockError = new Error('failed to update book')
      beforeEach(async () => {
        jest.spyOn(bookRepository, 'updateBook').mockRejectedValueOnce(mockError)
      })
      it('should reject with the error', async () => {
        await expect(bookService.updateBook(request)).rejects.toBe(mockError)
      })
    })
  })

  describe('getBook', () => {
    const request = { _id: '1', userId }
    describe('given book repository gets book', () => {
      let spyBookRepository: jest.SpyInstance, book: Book
      const mockBook = { _id: '1', title: 'a', author: 'b' }
      beforeEach(async () => {
        spyBookRepository = jest.spyOn(bookRepository, 'getBook').mockResolvedValueOnce(mockBook)
        book = await bookService.getBook(request)
      })
      it('should call book repository to get book', async () => {
        expect(spyBookRepository).toHaveBeenNthCalledWith(1, request)
      })
      it('should return book', async () => {
        expect(book).toEqual(mockBook)
      })
    })
    describe('given book repository rejects with an error', () => {
      const mockError = new Error('failed to get book')
      beforeEach(async () => {
        jest.spyOn(bookRepository, 'getBook').mockRejectedValueOnce(mockError)
      })
      it('should reject with the error', async () => {
        await expect(bookService.getBook(request)).rejects.toBe(mockError)
      })
    })
  })

  describe('deleteBook', () => {
    const request = { _id: '1', userId }
    describe('given book repository deletes book', () => {
      let spyBookRepository: jest.SpyInstance
      beforeEach(async () => {
        spyBookRepository = jest.spyOn(bookRepository, 'deleteBook').mockResolvedValueOnce()
        await bookService.deleteBook(request)
      })
      it('should call book repository to delete book', async () => {
        expect(spyBookRepository).toHaveBeenNthCalledWith(1, request)
      })
    })
    describe('given book repository rejects with an error', () => {
      const mockError = new Error('failed to delete book')
      beforeEach(async () => {
        jest.spyOn(bookRepository, 'deleteBook').mockRejectedValueOnce(mockError)
      })
      it('should reject with the error', async () => {
        await expect(bookService.deleteBook(request)).rejects.toBe(mockError)
      })
    })
  })
})
