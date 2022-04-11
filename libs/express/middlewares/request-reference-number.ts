import { v4 } from 'uuid'
import { Request, Response, NextFunction } from 'express'

export const requestReferenceNumber = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const id = req.get('Request-Reference-Number') || v4()
  // @ts-ignore
  req.requestReferenceNumber = id
  res.setHeader('Request-Reference-Number', id)
  next()
}
