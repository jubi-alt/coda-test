import { Credentials, S3 } from 'aws-sdk'

export interface CreateS3ClientOptions {
  region: string,
  accessKeyId: string,
  secretAccessKey: string,
}

export const createS3Client = (
  options: CreateS3ClientOptions,
): any => new S3({
  region: options.region,
  credentials: new Credentials({
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey,
  }),
})
