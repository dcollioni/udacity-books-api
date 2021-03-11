export default interface Book {
  _id: string
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
