import Knex from 'knex'
import { CompanyAffiliate, ICompanyAffiliate } from './company-affiliate.model'

export interface ICompaniesAffiliatesRepository {
  create(data: ICompanyAffiliate): Promise<CompanyAffiliate>
}

export class CompaniesAffiliatesRepository
  implements ICompaniesAffiliatesRepository {
  constructor(private database: Knex) {}

  async create(data: ICompanyAffiliate): Promise<CompanyAffiliate> {
    const companyAffiliate = new CompanyAffiliate(data)
    await this.database
      .insert({
        company_id: companyAffiliate.companyId,
        person_id: companyAffiliate.personId,
      })
      .into('companies_affiliates')
    return companyAffiliate
  }
}
