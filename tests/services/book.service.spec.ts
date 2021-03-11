import bookService from './../../src/services/book.service'
import bookRepository from './../../src/data/repositories/book.repository'
import awsService from './../../src/services/aws.service'
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
        { _id: '1', title: 'a', author: 'c', subject: 's' },
        { _id: '2', title: 'b', author: 'd', subject: 's' },
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
    describe('given book repository returns books with covers', () => {
      let spyBookRepository: jest.SpyInstance
      const mockBooks: Book[] = [
        { _id: '1', title: 'a', author: 'c', subject: 's', coverUrl: 'url1' },
        { _id: '2', title: 'b', author: 'd', subject: 's', coverUrl: 'url2' },
      ]
      beforeEach(() => {
        spyBookRepository = jest.spyOn(bookRepository, 'listBooks').mockResolvedValueOnce(mockBooks)
      })
      describe('given aws service returns signed urls for the covers', () => {
        let spyAwsService: jest.SpyInstance, books: Book[]
        const mockSignedUrls = ['signedUrl1', 'signedUrl2']
        beforeEach(async () => {
          spyAwsService = jest.spyOn(awsService, 'getGetSignedUrl')
            .mockReturnValueOnce(mockSignedUrls[0] as never)
            .mockReturnValueOnce(mockSignedUrls[1] as never)

          books = await bookService.listBooks(request)
        })
        it('should call book repository to list books', async () => {
          expect(spyBookRepository).toHaveBeenCalledTimes(1)
        })
        it('should call aws service to get signed urls', async () => {
          expect(spyAwsService).toHaveBeenNthCalledWith(1, { fileName: mockBooks[0].coverUrl })
          expect(spyAwsService).toHaveBeenNthCalledWith(2, { fileName: mockBooks[1].coverUrl })
        })
        it('should return books', async () => {
          const expected = mockBooks.map((mockBook, i) => ({
            _id: mockBook._id,
            title: mockBook.title,
            author: mockBook.author,
            subject:
            mockBook.subject,
            coverUrl: mockSignedUrls[i]
          }))
          expect(books).toEqual(expected)
        })
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
    const request = { title: 'a', author: 'b', subject: 's', userId }
    describe('given book repository creates book', () => {
      let spyBookRepository: jest.SpyInstance, book: Book
      const mockBook: Book = { _id: '1', title: 'a', author: 'c', subject: 's' }
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
    const request = { _id: '1', title: 'a', author: 'b', subject: 's', userId }
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
      const mockBook = { _id: '1', title: 'a', author: 'b', subject: 's' }
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
    describe('given book repository gets book with cover', () => {
      let spyBookRepository: jest.SpyInstance
      const mockBook = { _id: '1', title: 'a', author: 'b', subject: 's', coverUrl: 'url' }
      beforeEach(() => {
        spyBookRepository = jest.spyOn(bookRepository, 'getBook').mockResolvedValueOnce(mockBook)
      })
      describe('given aws service returns signed url for the cover', () => {
        let spyAwsService: jest.SpyInstance, book: Book
        const mockSignedUrl = 'signedUrl'
        beforeEach(async () => {
          spyAwsService = jest.spyOn(awsService, 'getGetSignedUrl').mockReturnValueOnce(mockSignedUrl as never)
          book = await bookService.getBook(request)
        })
        it('should call book repository to get book', async () => {
          expect(spyBookRepository).toHaveBeenNthCalledWith(1, request)
        })
        it('should call aws service to get signed urls', async () => {
          expect(spyAwsService).toHaveBeenNthCalledWith(1, { fileName: mockBook.coverUrl })
        })
        it('should return book', async () => {
          const expected = { ...mockBook }
          expected.coverUrl = mockSignedUrl
          expect(book).toEqual(expected)
        })
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
