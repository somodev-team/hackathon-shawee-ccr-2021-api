import { validadeObject } from '../../../../utils/validation-functions'
import { IRequestsRepository } from '../../requests.repository'
import { IRequest, Request } from '../../request.model'
import { ICompaniesAffiliatesRepository } from '../../../companies-affiliates/companies-affiliates.repository'
import { CompanyAffiliate } from '../../../companies-affiliates/company-affiliate.model'
import { IUsersRepository } from '../../../users/users.repository'

export class RequestAcceptService {
  constructor(
    private requestsRepository: IRequestsRepository,
    private companiesAffiliatesRepository: ICompaniesAffiliatesRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    // Validate Data
    const request = new Request(data)
    await validadeObject(request)

    const requestRow = await this.requestsRepository.find(request)
    if (!requestRow) {
      throw Error('requests.error')
    }

    const requesterUser = await this.usersRepository.findById(
      requestRow.requesterId
    )
    const requestedUser = await this.usersRepository.findById(
      requestRow.requestedId
    )
    if (!requesterUser || !requestedUser) {
      throw Error('requests.error')
    }
    const companyAffiliate = new CompanyAffiliate({
      companyId:
        requestedUser?.type === 'company' ? requestedUser.id : requesterUser.id,
      personId:
        requestedUser?.type === 'person' ? requestedUser.id : requesterUser.id,
    })
    await validadeObject(companyAffiliate)

    try {
      await this.companiesAffiliatesRepository.create(companyAffiliate)
      await this.requestsRepository.delete(request)
    } catch (error) {
      throw error
    }
  }
}
