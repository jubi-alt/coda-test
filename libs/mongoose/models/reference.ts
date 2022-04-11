import mongoose from 'mongoose'

export interface IReference {
  _id: string,
  uuid: string,
  fileName: string,
  fields: object,
  values: any
}

const schema = new mongoose.Schema<IReference>({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  fileName: {
    type: String,
    unique: true,
    required: true,
  },
  fields: {
    type: Object
  },
  values: {
    type: mongoose.Schema.Types.Mixed
  }
})

export const Reference = mongoose.model('Reference', schema)
