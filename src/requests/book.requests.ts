export interface CreateBookRequest {
  title: string
  author: string
}

export interface UpdateBookRequest {
  _id: string
  title: string
  author: string
}

export interface GetBookRequest {
  _id: string
}

export interface DeleteBookRequest {
  _id: string
}
