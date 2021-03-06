import { ObjectId } from 'mongodb'
import Book from '../../models/Book'
import {
  CreateBookRequest,
  UpdateBookRequest,
  GetBookRequest,
  DeleteBookRequest,
  ListBooksRequest,
} from '../../requests/book.requests'
import { books } from './../connections/mongodb.connection'

const listBooks = async (request: ListBooksRequest): Promise<Book[]> => {
  const { userId } = request
  const collection = await books()
  return collection.find({ userId }).toArray()
}

const createBook = async (request: CreateBookRequest): Promise<Book> => {
  const collection = await books()
  const result = await collection.insertOne(request)
  const item = result.ops[0] as Book
  return item
}

const updateBook = async (request: UpdateBookRequest): Promise<Book> => {
  const { _id, userId, ...fields } = request
  const collection = await books()
  await collection.updateOne(
    { _id: new ObjectId(_id), userId },
    { $set: { ...fields } },
  )
  return request
}

const getBook = async (request: GetBookRequest): Promise<Book> => {
  const { _id, userId } = request
  const collection = await books()
  const item = await collection.findOne({ _id: new ObjectId(_id), userId })
  return item
}

const deleteBook = async (request: DeleteBookRequest): Promise<void> => {
  const { _id, userId } = request
  const collection = await books()
  await collection.deleteOne({ _id: new ObjectId(_id), userId })
  return
}

const bookRepository = { createBook, listBooks, updateBook, getBook, deleteBook }
export default bookRepository
