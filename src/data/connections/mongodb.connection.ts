import { Collection, Db, MongoClient } from 'mongodb'

const url = process.env.MONGODB_URL
const dbName = 'udagram-books'

let _client: MongoClient
const client = async (): Promise<Db> => {
  if (!_client) {
    _client = await MongoClient.connect(url, { useUnifiedTopology: true })
  }

  return _client.db(dbName)
}

const books = async (): Promise<Collection> => {
  return (await client()).collection('books')
}

export { books }
