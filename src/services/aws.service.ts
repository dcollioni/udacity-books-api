import AWS from 'aws-sdk'
import { GetSignedUrlRequest } from '../requests/aws.requests'
import config from './../config'

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws.region,
  params: { Bucket: config.aws.mediaBucket },
})

// Generates an AWS signed URL for retrieving objects
const getGetSignedUrl = (request: GetSignedUrlRequest): string => {
  const signedUrlExpireSeconds = 60 * 5

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws.mediaBucket,
    Key: request.fileName,
    Expires: signedUrlExpireSeconds,
  })
}

// Generates an AWS signed URL for uploading objects
const getPutSignedUrl = (request: GetSignedUrlRequest): string => {
  const signedUrlExpireSeconds = 60 * 5

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws.mediaBucket,
    Key: request.fileName,
    Expires: signedUrlExpireSeconds,
  })
}

const awsService = { getGetSignedUrl, getPutSignedUrl }
export default awsService
