export interface ListBooksRequest {
  userId: string
}

export interface CreateBookRequest {
  userId: string
  title: string
  author: string
  subject: string
  publisher?: string
  isbn?: string
  additionalInfo?: string
  length?: number
  publicationYear?: number
  coverUrl?: string
}

export interface UpdateBookRequest {
  _id: string
  userId: string
  title: string
  author: string
  subject: string
  publisher?: string
  isbn?: string
  additionalInfo?: string
  length?: number
  publicationYear?: number
  coverUrl?: string
}

export interface GetBookRequest {
  _id: string
  userId: string
}

export interface DeleteBookRequest {
  _id: string
  userId: string
}
