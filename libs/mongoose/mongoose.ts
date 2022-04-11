import mongoose from 'mongoose'

interface CreateDbConnectionOptions {
  host: string,
  user: string,
  pass: string,
  dbName: string,
}

export const createDBConnection = async (
  options: CreateDbConnectionOptions,
): Promise<mongoose.Mongoose> => mongoose.connect(options.host, {
  user: options.user,
  pass: options.pass,
  dbName: options.dbName,
})
