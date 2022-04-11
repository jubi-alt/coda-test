import fs from 'fs'
import path from 'path'
import csv from 'csvtojson'
import errcode from 'err-code'
import { v4 as uuidv4 } from 'uuid'
import { Reference } from '../../libs/mongoose'
import { s3, config } from '../shared'
import { getDataType } from '../helpers'

export const uploadFile = async (file: any) => {
  if (!file) {
    throw errcode(new Error('Invalid file'), 'BadRequest')
  }

  const { filename } = file
  const existingReference = await getReference(filename)
  if (existingReference) {
    throw errcode(new Error('This reference already exists'), 'Unprocessable')
  }

  const fileDirectory = path.join(__dirname, '..', '..', 'tmp', filename)

  await s3.putObject({
    Bucket: config('AWS_S3_BUCKET'),
    Key: `coda/input/${filename}`,
    Body: fs.createReadStream(fileDirectory),
  }).promise()

  await Reference.create({
    uuid: uuidv4(),
    filename,
  })

  await fs.promises.unlink(fileDirectory)

  return filename
}

export const processFile = async (filename: string) => {
  const existingReference = await getReference(filename)
  if (!existingReference) {
    throw errcode(new Error('This reference does not exist'), 'Unprocessable')
  }

  const stream = s3.getObject({
    Bucket: config('AWS_S3_BUCKET'),
    Key: `coda/input/${filename}`,
  }).createReadStream()

  const results = await csv().fromStream(stream)
  if (!results.length) {
    await Reference.deleteOne({ uuid: existingReference.uuid })
    return {
      results,
      fields: null,
    }
  }

  const fields = Object.keys(results[0]).reduce((obj, key) => ({
    ...obj, [key]: getDataType(results[0][key]),
  }), {})

  const outputFilename = `${filename.split('.')[0]}.json`
  await s3.putObject({
    Bucket: config('AWS_S3_BUCKET'),
    Key: `coda/output/${outputFilename}`,
    Body: JSON.stringify(results),
    ContentType: 'application/json; charset=utf-8',
  }).promise()

  await existingReference.updateOne({
    fields,
    value: results,
  })

  return {
    fields,
    results,
    outputFilename,
  }
}

const getReference = (filename: string) => Reference.findOne({ filename })
