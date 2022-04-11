import errcode from 'err-code'
import { Request, Response, NextFunction } from 'express'
import { logger } from '../../shared'
import { processFile } from '../../services/csv'

export const process = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // @ts-ignore
  const { requestReferenceNumber, body: { filename } } = req
  if (!filename) {
    throw errcode(new Error('Invalid filename'), 'BadRequest')
  }

  try {
    const { results, fields, outputFilename } = await processFile(filename)

    logger.info(`Successfully processed ${filename}`, { rrn: requestReferenceNumber })
    res.status(200).json({
      requestReferenceNumber,
      filename,
      outputFilename,
      fields,
      results,
    })
  } catch (err: any) {
    logger.error('Encountered an error when trying to process file', {
      rrn: requestReferenceNumber,
      message: err.message,
    })
    next(err)
  }
}
