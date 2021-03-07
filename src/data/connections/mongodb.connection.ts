import { Collection, Db, MongoClient } from 'mongodb'
import config from './../../config'

const uri = config.mongoUri
const dbName = 'udacity-books'

let _client: MongoClient
const client = async (): Promise<Db> => {
  if (!_client) {
    _client = await MongoClient.connect(uri, { useUnifiedTopology: true })
  }

  return _client.db(dbName)
}

export const books = async (): Promise<Collection> => {
  return (await client()).collection('books')
}
