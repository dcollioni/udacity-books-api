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

const ObjectId = class {
  private _id: string
  constructor(id: string) {
    this._id = id
  }
}

const mongodb = {
  MongoClient: {
    connect: jest.fn().mockResolvedValue(connection)
  },
  ObjectId
}

export = mongodb
