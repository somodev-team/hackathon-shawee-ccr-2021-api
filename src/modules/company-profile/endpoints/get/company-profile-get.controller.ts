import createHttpError from 'http-errors'
import { Request, Response } from 'express'
import { CompanyProfileGetService } from './company-profile-get.service'

export class CompanyProfileGetController {
  constructor(private companyProfileGetService: CompanyProfileGetService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const result = await this.companyProfileGetService.execute(
        req.params.userId
      )
      if (!result) {
        return res.status(404).send()
      }
      return res.json(result)
    } catch (error) {
      return next(createHttpError(400, error))
    }
  }
}
