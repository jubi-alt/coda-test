import { Request, Response, NextFunction } from 'express'

export interface Err {
  code: string | null | undefined
  message: string | null | undefined
  details: any[] | null | undefined
  errors?: any
}

export const errorHandler = (
  err: Err,
  _req: Request,
  res: Response,
  _next: NextFunction,
): any => {
  const { code, message, details } = err

  if (message === 'Input validation error') {
    return res.status(400).json(createError({ code: 'BadRequest', message, details: err.errors }))
  }

  if (!code) {
    return res.status(500).json(createError({ code: 'InternalServerError', message, details }))
  }

  if (code.includes('AlreadyExists')) {
    return res.status(422).json(createError(err))
  }

  if (code.includes('BadRequest')) {
    return res.status(400).json(createError(err))
  }

  if (code.includes('NotFound')) {
    return res.status(404).json(createError(err))
  }

  res.status(500).json(createError({ code: 'InternalServerError', message, details }))
}

const createError = ({ code, message, details }: Err) => ({
  error: {
    code,
    message,
    details: details ?? [],
  },
})
