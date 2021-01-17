import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { getJWTfromRequest } from '../../../../core/utils/get-jwt-from-request'
import { IRequestCreateDTO } from './request-create.dto'
import { RequestCreateService } from './request-create.service'

export class RequestCreateController {
  constructor(private requestCreateService: RequestCreateService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const jwtData = getJWTfromRequest(req)
    const { requestedId } = req.body as IRequestCreateDTO
    try {
      await this.requestCreateService.execute({
        requesterId: jwtData.user.id,
        requestedId,
      })
    } catch (error) {
      return next(createHttpError(400, error))
    }

    return res.status(201).send()
  }
}
