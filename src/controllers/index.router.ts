import { Router, Request, Response } from 'express'
import { name, version } from './../../package.json'
import bookRouter from './book.router'
import authMiddleware from './../middlewares/auth.middleware'

const router: Router = Router()

router.use('/books', authMiddleware, bookRouter)

router.get('/', async (_req: Request, res: Response) => {
  res.send(`${name} ${version}`)
})

export default router
