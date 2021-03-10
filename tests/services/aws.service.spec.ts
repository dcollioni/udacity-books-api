import awsService from './../../src/services/aws.service'
import AWS from 'aws-sdk'
import config from './../../src/config'

afterEach(() => {
  jest.clearAllMocks()
})

describe('aws.service', () => {
  describe('getGetSignedUrl', () => {
    const key = 'file.png'
    describe('given s3 returns a signed url', () => {
      const mockSignedUrl = 'signedUrl'
      let spyS3: jest.SpyInstance, actual: string
      beforeEach(() => {
        spyS3 = jest.spyOn(AWS.S3.prototype, 'getSignedUrl').mockReturnValueOnce(mockSignedUrl)
        actual = awsService.getGetSignedUrl(key)
      })
      it('should call aws service to get signed url', async () => {
        expect(spyS3).toHaveBeenNthCalledWith(1, 'getObject', { Bucket: config.aws.mediaBucket, Expires: 300, Key: key })
      })
      it('should return books', async () => {
        expect(actual).toEqual(mockSignedUrl)
      })
    })
  })

  describe('getPutSignedUrl', () => {
    const key = 'file.png'
    describe('given s3 returns a signed url', () => {
      const mockSignedUrl = 'signedUrl'
      let spyS3: jest.SpyInstance, actual: string
      beforeEach(() => {
        spyS3 = jest.spyOn(AWS.S3.prototype, 'getSignedUrl').mockReturnValueOnce(mockSignedUrl)
        actual = awsService.getPutSignedUrl(key)
      })
      it('should call aws service to get signed url', async () => {
        expect(spyS3).toHaveBeenNthCalledWith(1, 'putObject', { Bucket: config.aws.mediaBucket, Expires: 300, Key: key })
      })
      it('should return books', async () => {
        expect(actual).toEqual(mockSignedUrl)
      })
    })
  })
})
