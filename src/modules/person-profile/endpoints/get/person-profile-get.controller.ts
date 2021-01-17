import createHttpError from 'http-errors'
import { Request, Response } from 'express'
import { PersonProfileGetService } from './person-profile-get.service'

export class PersonProfileGetController {
  constructor(private personProfileGetService: PersonProfileGetService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const result = await this.personProfileGetService.execute(
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
