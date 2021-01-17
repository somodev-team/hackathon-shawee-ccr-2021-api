import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { getJWTfromRequest } from '../../../../core/utils/get-jwt-from-request'
import { ICompanyProfileUpdateDTO } from './company-profile-update.dto'
import { CompanyProfileUpdateService } from './company-profile-update.service'

export class CompanyProfileUpdateController {
  constructor(
    private companyProfileUpdateService: CompanyProfileUpdateService
  ) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const jwtData = getJWTfromRequest(req)
    if (jwtData.user.type !== 'company') {
      return next(createHttpError(401, Error('user-type-not-authorized')))
    }
    try {
      await this.companyProfileUpdateService.execute({
        ...(req.body as ICompanyProfileUpdateDTO),
        userId: jwtData.user.id,
      })
    } catch (error) {
      return next(createHttpError(400, error))
    }

    return res.status(201).send()
  }
}
