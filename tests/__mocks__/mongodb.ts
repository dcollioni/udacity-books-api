import { ObjectId } from 'mongodb'

const collection = {
  find: jest.fn().mockReturnValue({ toArray: jest.fn() }),
  insertOne: jest.fn(),
  updateOne: jest.fn(),
  findOne: jest.fn(),
  deleteOne: jest.fn()
}

const db = {
  collection: jest.fn().mockReturnValue(collection)
}

const connection = {
  db: jest.fn().mockReturnValue(db)
}

const mongodb = {
  MongoClient: {
    connect: jest.fn().mockResolvedValue(connection)
  },
  ObjectId
}

export = mongodb
