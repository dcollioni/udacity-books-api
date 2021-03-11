import request from 'supertest'
import { GetSignedUrlRequest } from '../../src/requests/aws.requests'
import app from './../../src/app'
import awsService from './../../src/services/aws.service'

afterEach(() => {
  jest.clearAllMocks()
})

describe('routes', () => {
  describe('GET /aws/signedUrl/:fileName', () => {
    describe('given a valid file name', () => {
      const fileName = '60435f3cb9acc28819accc24.png'
      const path = `/aws/signedUrl/${fileName}`
      const getRequest: GetSignedUrlRequest = { fileName }
      describe('given aws service returns a signed url', () => {
        const mockUrl = 'url'
        let spyAwsService: jest.SpyInstance, response: request.Response
        beforeEach(async () => {
          spyAwsService = jest.spyOn(awsService, 'getPutSignedUrl').mockReturnValueOnce(mockUrl)
          response = await request(app()).get(path)
        })
        it('should delete book using book service', async () => {
          expect(spyAwsService).toHaveBeenNthCalledWith(1, getRequest)
        })
        it('should return the signed url and status 201', async () => {
          expect(response.body).toEqual({ url: mockUrl })
          expect(response.status).toEqual(201)
        })
      })
      describe('given aws service rejects with an error', () => {
        let response: request.Response
        const mockError = new Error('failed to get signed url')
        beforeEach(async () => {
          jest.spyOn(awsService, 'getPutSignedUrl').mockImplementation(() => { throw mockError })
          response = await request(app()).get(path)
        })
        it('should return status 500', async () => {
          expect(response.status).toEqual(500)
        })
      })
    })
  })
})
