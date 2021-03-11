import Book from '../models/Book'
import { GetSignedUrlRequest } from '../requests/aws.requests'
import {
  ListBooksRequest,
  CreateBookRequest,
  DeleteBookRequest,
  GetBookRequest,
  UpdateBookRequest,
} from '../requests/book.requests'
import bookRepository from './../data/repositories/book.repository'
import awsService from './../services/aws.service'

const createBook = (request: CreateBookRequest): Promise<Book> => {
  return bookRepository.createBook(request)
}

const listBooks = async (request: ListBooksRequest): Promise<Book[]> => {
  const books = await bookRepository.listBooks(request)
  return books.map(book => {
    const mappedBook = { ...book }

    if (book.coverUrl) {
      const request: GetSignedUrlRequest = { fileName: book.coverUrl }
      mappedBook.coverUrl = awsService.getGetSignedUrl(request)
    }

    return mappedBook
  })
}

const updateBook = (request: UpdateBookRequest): Promise<Book> => {
  return bookRepository.updateBook(request)
}

const getBook = async (request: GetBookRequest): Promise<Book> => {
  const book = await bookRepository.getBook(request)
  if (book && book.coverUrl) {
    const request: GetSignedUrlRequest = { fileName: book.coverUrl }
    book.coverUrl = awsService.getGetSignedUrl(request)
  }
  return book
}

const deleteBook = (request: DeleteBookRequest): Promise<void> => {
  return bookRepository.deleteBook(request)
}

const bookService = { createBook, listBooks, updateBook, getBook, deleteBook }
export default bookService
