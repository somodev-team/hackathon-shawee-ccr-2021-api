import createHttpError from 'http-errors'
import { Request, Response } from 'express'
import { getJWTfromRequest } from '../../../../core/utils/get-jwt-from-request'
import { getPaginationParamsFromRequest } from '../../../../utils/pagination-functions'
import { CompanyProfileListService } from './company-profile-list.service'

export class DomainsListController {
  constructor(private companyProfileList: CompanyProfileListService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const params = getPaginationParamsFromRequest(req)
    const filter = req.query.filter as string
    const jwtData = getJWTfromRequest(req)
    try {
      const result = await this.companyProfileList.execute(params, filter)
      return res.json(result)
    } catch (error) {
      return next(createHttpError(400, error))
    }
  }
}
