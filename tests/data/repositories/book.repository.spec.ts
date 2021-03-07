import bookRepository from './../../../src/data/repositories/book.repository'
import { books } from './../../../src/data/connections/mongodb.connection'
import Book from '../../../src/models/Book'
import { Collection, ObjectId } from 'mongodb'

let collection: Collection
beforeEach(async () => {
  collection = await books()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('book.repository', () => {
  const userId = 'google|abc123'
  describe('listBooks', () => {
    const request = { userId }
    describe('given mongodb books collection returns items', () => {
      let spyBookCollection: jest.SpyInstance, spyBookCollectionFind: jest.SpyInstance, items: Book[]
      const mockBooks: Book[] = [
        { _id: '1', title: 'a', author: 'c' },
        { _id: '2', title: 'b', author: 'd' },
      ]
      beforeEach(async () => {
        spyBookCollectionFind = jest.spyOn(collection, 'find')
        spyBookCollection = jest.spyOn(collection.find(), 'toArray').mockResolvedValueOnce(mockBooks as never)
        items = await bookRepository.listBooks(request)
      })
      it('should call mongodb book collection to list books', async () => {
        expect(spyBookCollectionFind).toHaveBeenNthCalledWith(2, { userId })
        expect(spyBookCollection).toHaveBeenCalledTimes(1)
      })
      it('should return books', async () => {
        expect(items).toEqual(mockBooks)
      })
    })
    describe('given mongodb book collection rejects with an error', () => {
      const mockError = new Error('failed to find books')
      beforeEach(async () => {
        jest.spyOn(collection.find(), 'toArray').mockRejectedValueOnce(mockError as never)
      })
      it('should reject with the error', async () => {
        await expect(bookRepository.listBooks(request)).rejects.toBe(mockError)
      })
    })
  })

  describe('createBook', () => {
    const request = { title: 'a', author: 'b', userId }
    describe('given mongodb book collection creates item', () => {
      let spyBookCollection: jest.SpyInstance, item: Book
      const mockItem: Book = { _id: '1', title: 'a', author: 'c' }
      beforeEach(async () => {
        spyBookCollection = jest.spyOn(collection, 'insertOne').mockResolvedValueOnce({ ops: [mockItem as never] } as never)
        item = await bookRepository.createBook(request)
      })
      it('should call mongodb book collection to create book', async () => {
        expect(spyBookCollection).toHaveBeenNthCalledWith(1, request)
      })
      it('should return item', async () => {
        expect(item).toEqual(mockItem)
      })
    })
    describe('given mongodb book collection rejects with an error', () => {
      const mockError = new Error('failed to insert book')
      beforeEach(async () => {
        jest.spyOn(collection, 'insertOne').mockRejectedValueOnce(mockError as never)
      })
      it('should reject with the error', async () => {
        await expect(bookRepository.createBook(request)).rejects.toBe(mockError)
      })
    })
  })

  describe('updateBook', () => {
    const request = { _id: '60435f3cb9acc28819accc24', title: 'a', author: 'b', userId }
    describe('given mongodb book collection updates the item', () => {
      let spyBookCollection: jest.SpyInstance, item: Book
      beforeEach(async () => {
        spyBookCollection = jest.spyOn(collection, 'updateOne').mockResolvedValueOnce({} as never)
        item = await bookRepository.updateBook(request)
      })
      it('should call mongodb book collection to update book', async () => {
        expect(spyBookCollection).toHaveBeenNthCalledWith(1, { _id: new ObjectId(request._id), userId: request.userId }, { $set: { title: request.title, author: request.author } })
      })
      it('should return item', async () => {
        expect(item).toEqual(request)
      })
    })
    describe('given mongodb book collection rejects with an error', () => {
      const mockError = new Error('failed to update book')
      beforeEach(async () => {
        jest.spyOn(collection, 'updateOne').mockRejectedValueOnce(mockError as never)
      })
      it('should reject with the error', async () => {
        await expect(bookRepository.updateBook(request)).rejects.toBe(mockError)
      })
    })
  })

  describe('getBook', () => {
    const request = { _id: '60435f3cb9acc28819accc24', userId }
    describe('given mongodb books collection returns item', () => {
      let spyBookCollection: jest.SpyInstance, item: Book
      const mockBook: Book = { _id: '1', title: 'a', author: 'c' }
      beforeEach(async () => {
        spyBookCollection = jest.spyOn(collection, 'findOne').mockResolvedValueOnce(mockBook as never)
        item = await bookRepository.getBook(request)
      })
      it('should call mongodb book collection to get book', async () => {
        expect(spyBookCollection).toHaveBeenNthCalledWith(1, { _id: new ObjectId(request._id), userId: request.userId })
      })
      it('should return book', async () => {
        expect(item).toEqual(mockBook)
      })
    })
    describe('given mongodb book collection rejects with an error', () => {
      const mockError = new Error('failed to find book')
      beforeEach(async () => {
        jest.spyOn(collection, 'findOne').mockRejectedValueOnce(mockError as never)
      })
      it('should reject with the error', async () => {
        await expect(bookRepository.getBook(request)).rejects.toBe(mockError)
      })
    })
  })

  describe('deleteBook', () => {
    const request = { _id: '60435f3cb9acc28819accc24', userId }
    describe('given mongodb book collection deletes the item', () => {
      let spyBookCollection: jest.SpyInstance
      beforeEach(async () => {
        spyBookCollection = jest.spyOn(collection, 'deleteOne').mockResolvedValueOnce({} as never)
        await bookRepository.deleteBook(request)
      })
      it('should call mongodb book collection to delete book', async () => {
        expect(spyBookCollection).toHaveBeenNthCalledWith(1, { _id: new ObjectId(request._id), userId: request.userId })
      })
    })
    describe('given mongodb book collection rejects with an error', () => {
      const mockError = new Error('failed to delete book')
      beforeEach(async () => {
        jest.spyOn(collection, 'deleteOne').mockRejectedValueOnce(mockError as never)
      })
      it('should reject with the error', async () => {
        await expect(bookRepository.deleteBook(request)).rejects.toBe(mockError)
      })
    })
  })
})
