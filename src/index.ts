import * as path from 'path'
import { Express } from 'express'
import { createApp } from '../libs/express'
import { logger } from '../libs/logger'
import { setupRoutes } from './routes'
import { config } from './shared'
import { createDBConnection } from '../libs/mongoose'

export const setupApp = async (): Promise<Express> => {
  await createDBConnection({
    host: config('DB_HOST'),
    dbName: config('DB_NAME'),
    user: config('DB_USER'),
    pass: config('DB_PASS'),
  })
  return createApp({
    setupRoutes,
    swaggerFile: path.join(__dirname, 'swagger.yaml'),
  })
}

Promise.all([
  setupApp(),
]).then(([app]) => {
  const server = app.listen(config('PORT'))
  logger.info(`Express server running at ::${config('PORT')}.`)

  process.on('SIGTERM', () => {
    server.close(() => {
      logger.info('Gracefully shutdown express server.')
    })
  })
}).catch((err) => {
  logger.error(err)
  process.exit(1)
})
