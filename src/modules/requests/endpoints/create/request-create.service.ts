import { validadeObject } from '../../../../utils/validation-functions'
import { IRequestsRepository } from '../../requests.repository'
import { IRequest, Request } from '../../request.model'

export class RequestCreateService {
  constructor(private requestsRepository: IRequestsRepository) {}

  async execute(data: IRequest): Promise<Request> {
    // Validate Data
    const request = new Request(data)
    await validadeObject(request)

    try {
      const createdRequest = await this.requestsRepository.create(request)
      return createdRequest
    } catch (error) {
      throw error
    }
  }
}
