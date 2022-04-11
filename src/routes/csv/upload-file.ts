import { Request, Response, NextFunction } from 'express'
import { uploadFile } from '../../services/csv'
import { logger } from '../../shared'

export const upload = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // @ts-ignore
  const { requestReferenceNumber, file } = req

  try {
    const filename = await uploadFile(file)

    logger.info(`Successfully uploaded and saved ${filename}`, { rrn: requestReferenceNumber })
    res.status(200).json({
      requestReferenceNumber,
      filename,
    })
  } catch (err: any) {
    logger.error('Encountered an error when trying to upload file', {
      rrn: requestReferenceNumber,
      message: err.message,
    })
    next(err)
  }
}
