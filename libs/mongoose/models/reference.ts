import mongoose from 'mongoose'

export interface IReference {
  _id: string,
  uuid: string,
  filename: string,
  fields: object,
  values: any
}

const schema = new mongoose.Schema<IReference>({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  filename: {
    type: String,
    unique: true,
    required: true,
  },
  fields: {
    type: Object
  },
  values: {
    type: Array
  }
})

export const Reference = mongoose.model('Reference', schema)
