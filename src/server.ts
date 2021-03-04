// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import indexRouter from './controllers/index.router'

(async () => {
  const app = express()
  const port = process.env.PORT || 8080

  app.use(bodyParser.json())
  app.use(cors())
  app.use('/', indexRouter)

  app.listen(port, () => {
    console.log(`server running`)
  })
})()
