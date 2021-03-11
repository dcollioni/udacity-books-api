import { Router, Request, Response } from 'express'
import { celebrate, errors, Joi } from 'celebrate'
import { CustomHelpers } from 'joi'
import { CreateBookRequest, GetBookRequest, UpdateBookRequest, DeleteBookRequest, ListBooksRequest } from './../requests/book.requests'
import bookService from './../services/book.service'
import { createLogger } from '../utils/logger'
import { ObjectId } from 'mongodb'
const logger = createLogger('book.router')

const isObjectId = (value: string, helpers: CustomHelpers) => {
  return ObjectId.isValid(value) ? value : helpers.error("any.invalid")
}

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  const { userId } = req
  try {
    const request: ListBooksRequest = { userId }
    const books = await bookService.listBooks(request)
    return res.json(books)
  } catch (err) {
    logger.error('failed to list books', err)
    return res.status(500).send('failed to list books')
  }
})

router.post('/', celebrate({
  body: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    subject: Joi.string().required(),
    additionalInfo: Joi.string().allow(''),
    isbn: Joi.string().allow(''),
    publisher: Joi.string().allow(''),
    length: Joi.number().allow(''),
    publicationYear: Joi.number().allow(''),
    coverUrl: Joi.string().allow(''),
  }),
}), async (req: Request, res: Response) => {
  const { userId } = req
  const request: CreateBookRequest = { userId, ...req.body }
  try {
    const book = await bookService.createBook(request)
    return res.status(201).json(book)
  } catch (err) {
    logger.error('failed to create book', err)
    return res.status(500).send('failed to create book')
  }
})

router.get('/:id', celebrate({
  params: Joi.object({
    id: Joi.string().custom(isObjectId),
  })
}), async (req: Request, res: Response) => {
  const { userId } = req
  const { id } = req.params
  const request: GetBookRequest = { _id: id, userId }

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
  params: Joi.object({
    id: Joi.string().custom(isObjectId),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    subject: Joi.string().required(),
    additionalInfo: Joi.string().allow(''),
    isbn: Joi.string().allow(''),
    publisher: Joi.string().allow(''),
    length: Joi.number().allow(''),
    publicationYear: Joi.number().allow(''),
    coverUrl: Joi.string().allow(''),
  }),
}), async (req: Request, res: Response) => {
  const { userId } = req
  const { id } = req.params
  const request: UpdateBookRequest = { _id: id, userId, ...req.body }
  try {
    const book = await bookService.updateBook(request)
    return res.status(200).json(book)
  } catch (err) {
    logger.error('failed to update book', err)
    return res.status(500).send('failed to update book')
  }
})

router.delete('/:id', celebrate({
  params: Joi.object({
    id: Joi.string().custom(isObjectId),
  })
}), async (req: Request, res: Response) => {
  const { userId } = req
  const { id } = req.params
  const request: DeleteBookRequest = { _id: id, userId }

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
