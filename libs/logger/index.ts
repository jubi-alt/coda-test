import { createLogger, transports, format } from 'winston'

export const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, rrn, level, message, service }) => {
      return `[${timestamp}] [${rrn}] ${service} ${level}: ${message}`;
    })
  ),
  defaultMeta: {
    service: 'BackendTest'
  }
})
