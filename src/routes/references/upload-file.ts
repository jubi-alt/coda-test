import errcode from 'err-code'
import { Request, Response, NextFunction } from 'express'
import { uploadFileToS3 } from '../../services/reference'

export const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // @ts-ignore
  const { requestReferenceNumber, file } = req

  try {

    const filename = await uploadFileToS3(file)

    res.status(200).json({
      requestReferenceNumber,
      filename,
    })

  } catch (err) {

    console.log(err)
    next(err)

  }
}
