import { Router, Request, Response } from 'express'
import Book from './../models/Book'
import { celebrate, errors, Joi } from 'celebrate'
import { CreateBookRequest, GetBookRequest, UpdateBookRequest, DeleteBookRequest } from './../requests/book.requests'
import bookService from './../services/book.service'
import { createLogger } from '../utils/logger'
const logger = createLogger('book.router')

const router: Router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const books = await bookService.listBooks()
    return res.json(books)
  } catch (err) {
    logger.error('failed to list books', err)
    return res.status(500).send('failed to list books')
  }
})

router.post('/', celebrate({
  body: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required()
  }).unknown(),
}), async (req: Request, res: Response) => {
  const request: CreateBookRequest = req.body
  try {
    const book = await bookService.createBook(request)
    return res.status(201).json(book)
  } catch (err) {
    logger.error('failed to create book', err)
    return res.status(500).send('failed to create book')
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const request: GetBookRequest = { _id: id }

  try {
    const book = await bookService.getBook(request)
    if (book) {
      return res.status(200).json(book)
    } else {
      return res.sendStatus(404)
    }
  } catch (err) {
    logger.error('failed to get book', err)
    return res.status(500).send('failed to get book')
  }
})

router.put('/:id', celebrate({
  body: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required()
  }).unknown(),
}), async (req: Request, res: Response) => {
  const { id } = req.params
  const request: UpdateBookRequest = { _id: id, ...req.body }
  try {
    const book = await bookService.updateBook(request)
    return res.status(200).json(book)
  } catch (err) {
    logger.error('failed to update book', err)
    return res.status(500).send('failed to update book')
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const request: DeleteBookRequest = { _id: id }

  try {
    await bookService.deleteBook(request)
    return res.sendStatus(204)
  } catch (err) {
    logger.error('failed to delete book', err)
    return res.status(500).send('failed to delete book')
  }
})

router.use(errors())

export default router
