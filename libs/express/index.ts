// @ts-nocheck
import * as express from 'express'
import * as dotenv from 'dotenv'
import * as path from 'path'
import healthcheck from 'express-healthcheck'
import { Router } from 'express'
import { errorHandler } from './middlewares/error-handler'
import { requestReferenceNumber } from './middlewares/request-reference-number'

dotenv.config({ path: path.join(__dirname, `../../${process.env.DOTENV ?? '.env'}`) })

export interface CreateAppOptions {
  setupRoutes: (router: Router) => void
  swaggerFile: string
}

export const createApp = async (
  options: CreateAppOptions,
): Promise<express.Express> => {
  const app = express.default()
  app.set('trust proxy', true)
  app.use(express.json())
  app.use('/healthcheck', healthcheck())

  const router = express.Router()
  app.use(requestReferenceNumber)

  options.setupRoutes(router)
  app.use(router)
  app.use(errorHandler)

  return app
}
