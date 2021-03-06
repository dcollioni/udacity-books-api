import Book from "../models/Book";
import { CreateBookRequest, DeleteBookRequest, GetBookRequest, UpdateBookRequest } from "../requests/book.requests";
import bookRepository from './../data/repositories/book.repository'

const createBook = (request: CreateBookRequest): Promise<Book> => {
  return bookRepository.createBook(request)
}

const listBooks = (): Promise<Book[]> => {
  return bookRepository.listBooks()
}

const updateBook = (request: UpdateBookRequest): Promise<Book> => {
  return bookRepository.updateBook(request)
}

const getBook = (request: GetBookRequest): Promise<Book> => {
  return bookRepository.getBook(request)
}

const deleteBook = (request: DeleteBookRequest): Promise<void> => {
  return bookRepository.deleteBook(request)
}

const bookService = { createBook, listBooks, updateBook, getBook, deleteBook }
export default bookService
