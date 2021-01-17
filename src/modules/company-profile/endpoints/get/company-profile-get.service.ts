import { ICompanyProfile } from '../../company-profile.model'
import { ICompanyProfileRepository } from '../../company-profile.repository'
import { ICompanyProfileGetDTO } from './company-profile-get.dto'

export class CompanyProfileGetService {
  constructor(private companyProfileRepository: ICompanyProfileRepository) {}

  async execute(userId: string): Promise<ICompanyProfileGetDTO | undefined> {
    const profile = await this.companyProfileRepository.findByUserId(userId)

    return {
      ...(profile as ICompanyProfile),
      godChildrens: 10 + Math.floor(Math.random() * 40),
      // Para fins de demonstração esse número está sendo gerado aleatoriamente
      // Mas basta pegar a quantidade de vinculos da tabela companies_affiliates para ter o numero real
    }
  }
}
