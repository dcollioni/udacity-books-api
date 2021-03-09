export interface ListBooksRequest {
  userId: string
}

export interface CreateBookRequest {
  title: string
  author: string
  subject: string
  publisher?: string
  isbn?: string
  additionalInfo?: string
  length?: number
  publicationYear?: number
  userId: string
}

export interface UpdateBookRequest {
  _id: string
  title: string
  author: string
  subject: string
  publisher?: string
  isbn?: string
  additionalInfo?: string
  length?: number
  publicationYear?: number
  userId: string
}

export interface GetBookRequest {
  _id: string
  userId: string
}

export interface DeleteBookRequest {
  _id: string
  userId: string
}
