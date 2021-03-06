import { Collection, Db, MongoClient } from 'mongodb'

const url = process.env.MONGODB_URL
const dbName = 'udacity-books'

let _client: MongoClient
const client = async (): Promise<Db> => {
  if (!_client) {
    _client = await MongoClient.connect(url, { useUnifiedTopology: true })
  }

  return _client.db(dbName)
}

export const books = async (): Promise<Collection> => {
  return (await client()).collection('books')
}
