import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { getJWTfromRequest } from '../../../../core/utils/get-jwt-from-request'
import { IPersonProfileUpdateDTO } from './person-profile-update.dto'
import { PersonProfileUpdateService } from './person-profile-update.service'

export class PersonProfileUpdateController {
  constructor(private personProfileUpdateService: PersonProfileUpdateService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const jwtData = getJWTfromRequest(req)
    if (jwtData.user.type !== 'person') {
      return next(createHttpError(401, Error('user-type-not-authorized')))
    }
    try {
      await this.personProfileUpdateService.execute({
        ...(req.body as IPersonProfileUpdateDTO),
        userId: jwtData.user.id,
      })
    } catch (error) {
      return next(createHttpError(400, error))
    }

    return res.status(201).send()
  }
}
