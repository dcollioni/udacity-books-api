class S3 {
  signatureVersion: string
  region: string
  constructor(signatureVersion: string, region: string) {
    this.signatureVersion = signatureVersion
    this.region = region
  }
  getSignedUrl(): string { return '' }
}

const AWS = {
  S3
}

export = AWS
