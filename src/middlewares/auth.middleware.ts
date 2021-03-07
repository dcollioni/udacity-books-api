import { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction): void  => {
  const userId = req.header('user-id')

  if (userId) {
    req.userId = userId
    next()
  } else {
    res.sendStatus(401)
  }
}

export default authMiddleware
