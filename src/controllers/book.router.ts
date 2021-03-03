import { Router, Request, Response } from 'express'
import Book from './../models/Book'
import { celebrate, errors, Joi } from 'celebrate'

const router: Router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const items: Book[] = []
  res.json(items)
})

router.post('/', celebrate({
  body: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required()
  }).unknown(),
}), async (req: Request, res: Response) => {
  const { title, author } = req.body
  const item = { title, author }
  res.status(201).json(item)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const item: Book = { id, title: 'a', author: 'b' }
  res.json(item)
})

router.put('/:id', celebrate({
  body: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required()
  }).unknown(),
}), async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, author } = req.body
  const item: Book = { id, title, author }
  res.json(item)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)
  res.sendStatus(204)
})

router.use(errors())

export default router
