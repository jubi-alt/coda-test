import fs from 'fs'
import path from 'path'
import errcode from 'err-code'
import { s3, config } from '../shared'

export const uploadFileToS3 = async (file: any) => {
  if (!file) {
    throw errcode(new Error('Invalid file'), 'BadRequest')
  }

  const { filename } = file
  const fileDirectory = path.join(__dirname, '..', '..', 'tmp', filename)

  await s3.putObject({
    Bucket: config('AWS_S3_BUCKET'),
    Key: `coda/input/${filename}`,
    Body: fs.createReadStream(fileDirectory),
  }).promise()

  await fs.promises.unlink(fileDirectory)

  return filename
}
