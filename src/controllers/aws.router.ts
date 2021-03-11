import { Router, Request, Response } from 'express'
import { celebrate, errors, Joi } from 'celebrate'
import { GetSignedUrlRequest } from './../requests/aws.requests'
import awsService from './../services/aws.service'
import { createLogger } from '../utils/logger'
const logger = createLogger('aws.router')

const router: Router = Router()

router.get('/signedUrl/:fileName', celebrate({
  params: Joi.object({
    fileName: Joi.string().required(),
  })
}), async (req: Request, res: Response) => {
  const { fileName } = req.params
  const request: GetSignedUrlRequest = { fileName }

  try {
    const url = await awsService.getPutSignedUrl(request)
    return res.status(201).json({ url })
  } catch (err) {
    logger.error('failed to get signed url', err)
    return res.status(500).send('failed to get signed url')
  }
})

router.use(errors())

export default router
