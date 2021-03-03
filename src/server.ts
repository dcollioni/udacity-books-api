import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import indexRouter from './controllers/index.router'

dotenv.config();

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
