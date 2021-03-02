import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import { name, version } from './../package.json'

dotenv.config();

(async () => {
  const app = express()
  const port = process.env.PORT || 8080

  app.use(bodyParser.json())
  app.use(cors())

  app.get('/', async (_req, res) => {
    res.send(`${name} ${version}`)
  })

  app.listen(port, () => {
    console.log(`server running`)
  })
})()
