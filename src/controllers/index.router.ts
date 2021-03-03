import { Router, Request, Response } from 'express'
import { name, version } from './../../package.json'
import bookRouter from './book.router'

const router: Router = Router()

router.use('/books', bookRouter)

router.get('/', async (_req: Request, res: Response) => {
  res.send(`${name} ${version}`)
})

export default router
