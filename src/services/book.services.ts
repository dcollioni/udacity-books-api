import Book from "../models/Book";
import { CreateBook } from "../requests/book.requests";
import bookRepo from './../data/repositories/book.repository'

const createBook = (request: CreateBook): Promise<Book> => {
  return bookRepo.createBook(request)
}

export { createBook }
