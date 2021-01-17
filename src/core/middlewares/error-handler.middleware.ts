import { HttpError } from 'http-errors'

export function getErrorHandler() {
  return (error: HttpError, req: any, res: any, next: any) => {
    if (!error.status || error.status === 500) {
      throw error
    }

    const errorObject: {
      error: HttpError
      message: string
    } = {
      message: error.message,
      error,
    }

    return res.status(error.status).json(errorObject)
  }
}
