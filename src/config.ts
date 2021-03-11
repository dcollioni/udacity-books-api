process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.PORT = process.env.PORT || '8080'

const config = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  mongoUri: process.env.MONGODB_URI,
  aws: {
    region: process.env.AWS_REGION,
    mediaBucket: process.env.AWS_BUCKET
  }
}

export default config
