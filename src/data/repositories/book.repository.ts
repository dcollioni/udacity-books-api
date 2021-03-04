import Book from '../../models/Book'
import { CreateBook } from '../../requests/book.requests'
import { books } from './../connections/mongodb.connection'

const createBook = async (request: CreateBook): Promise<Book> => {
  const collection = await books()
  const result = await collection.insertOne(request)
  const item = result.ops[0] as Book
  return item
}

export default { createBook }
