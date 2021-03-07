export interface ListBooksRequest {
  userId: string
}

export interface CreateBookRequest {
  title: string
  author: string
  userId: string
}

export interface UpdateBookRequest {
  _id: string
  title: string
  author: string
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
