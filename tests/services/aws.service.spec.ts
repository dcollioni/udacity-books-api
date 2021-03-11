import awsService from './../../src/services/aws.service'
import AWS from 'aws-sdk'
import config from './../../src/config'
import { GetSignedUrlRequest } from '../../src/requests/aws.requests'

afterEach(() => {
  jest.clearAllMocks()
})

describe('aws.service', () => {
  describe('getGetSignedUrl', () => {
    const request: GetSignedUrlRequest = { fileName: 'file.png' }
    describe('given s3 returns a signed url', () => {
      const mockSignedUrl = 'signedUrl'
      let spyS3: jest.SpyInstance, actual: string
      beforeEach(() => {
        spyS3 = jest.spyOn(AWS.S3.prototype, 'getSignedUrl').mockReturnValueOnce(mockSignedUrl)
        actual = awsService.getGetSignedUrl(request)
      })
      it('should call aws service to get signed url', async () => {
        expect(spyS3).toHaveBeenNthCalledWith(1, 'getObject', { Bucket: config.aws.mediaBucket, Expires: 300, Key: request.fileName })
      })
      it('should return books', async () => {
        expect(actual).toEqual(mockSignedUrl)
      })
    })
  })

  describe('getPutSignedUrl', () => {
    const request: GetSignedUrlRequest = { fileName: 'file.png' }
    describe('given s3 returns a signed url', () => {
      const mockSignedUrl = 'signedUrl'
      let spyS3: jest.SpyInstance, actual: string
      beforeEach(() => {
        spyS3 = jest.spyOn(AWS.S3.prototype, 'getSignedUrl').mockReturnValueOnce(mockSignedUrl)
        actual = awsService.getPutSignedUrl(request)
      })
      it('should call aws service to get signed url', async () => {
        expect(spyS3).toHaveBeenNthCalledWith(1, 'putObject', { Bucket: config.aws.mediaBucket, Expires: 300, Key: request.fileName })
      })
      it('should return books', async () => {
        expect(actual).toEqual(mockSignedUrl)
      })
    })
  })
})
