import { createConfig } from '../libs/config'
import { createS3Client } from '../libs/s3'

export const config = createConfig({
  PORT: {
    env: 'PORT',
    format: '*',
    default: 3000,
  },
  DB_HOST: {
    env: 'DB_HOST',
    format: '*',
    default: null,
  },
  DB_USER: {
    env: 'DB_USER',
    format: '*',
    default: null,
  },
  DB_PASS: {
    env: 'DB_PASS',
    format: '*',
    default: null,
  },
  DB_NAME: {
    env: 'DB_NAME',
    format: '*',
    default: null,
  },
  LOG_LEVEL: {
    env: 'LOG_LEVEL',
    format: '*',
    default: 'info',
  },
  AWS_REGION: {
    env: 'AWS_REGION',
    format: '*',
    default: null,
  },
  AWS_ACCESS_KEY_ID: {
    env: 'AWS_ACCESS_KEY_ID',
    format: '*',
    default: null,
  },
  AWS_SECRET_ACCESS_KEY: {
    env: 'AWS_SECRET_ACCESS_KEY',
    format: '*',
    default: null,
  },
  AWS_S3_BUCKET: {
    env: 'AWS_S3_BUCKET',
    format: '*',
    default: null,
  },
})

export { logger } from '../libs/logger'

export const s3 = createS3Client({
  region: config('AWS_REGION'),
  accessKeyId: config('AWS_ACCESS_KEY_ID'),
  secretAccessKey: config('AWS_SECRET_ACCESS_KEY'),
})
