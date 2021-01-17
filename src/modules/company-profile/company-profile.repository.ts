import Knex from 'knex'
import { IPaginateParams, IWithPagination } from 'knex-paginate'
import { validadeObject } from '../../utils/validation-functions'
import { ICompanyProfile, CompanyProfile } from './company-profile.model'
import { ICompanyProfileListDTO } from './endpoints/list/company-profile-list.dto'

export interface ICompanyProfileRepository {
  findByUserId(userId: string): Promise<CompanyProfile | undefined>
  insert(companyProfileData: ICompanyProfile): Promise<CompanyProfile>
  update(companyProfileData: ICompanyProfile): Promise<CompanyProfile>
  list(
    paginationParams: IPaginateParams,
    filter?: string
  ): Promise<IWithPagination<ICompanyProfileListDTO[]>>
}

export class CompanyProfileRepository implements ICompanyProfileRepository {
  constructor(private database: Knex) {}

  companyProfileToTableObject(companyProfile: CompanyProfile) {
    return {
      user_id: companyProfile.userId,
      name: companyProfile.name,
      bio: companyProfile.bio,
      phone: companyProfile.phone,
      address_state: companyProfile.addressState,
      address_city: companyProfile.addressCity,
      areas_of_actuation: JSON.stringify(companyProfile.areasOfActuation),
    }
  }

  async findByUserId(userId: string): Promise<CompanyProfile | undefined> {
    const result = await this.database
      .select('*')
      .from<CompanyProfile>('company_profile')
      .where('user_id', userId)
      .first()
    return result
  }

  async insert(companyProfileData: ICompanyProfile): Promise<CompanyProfile> {
    const companyProfile = new CompanyProfile(companyProfileData)

    await validadeObject(companyProfile)

    await this.database
      .insert(this.companyProfileToTableObject(companyProfile))
      .into('company_profile')

    return companyProfile
  }

  async update(companyProfileData: ICompanyProfile): Promise<CompanyProfile> {
    const companyProfile = new CompanyProfile(companyProfileData)

    await validadeObject(companyProfile)

    await this.database('company_profile')
      .update(this.companyProfileToTableObject(companyProfile))
      .where({
        user_id: companyProfile.userId,
      })

    return companyProfile
  }

  async list(
    paginationParams: IPaginateParams,
    filter?: string
  ): Promise<IWithPagination<ICompanyProfileListDTO[]>> {
    const result = await this.database
      .select()
      .column(
        'company_profile.user_id',
        'company_profile.name',
        'users.username'
      )
      .from('company_profile')
      .join('users', 'company_profile.user_id', '=', 'users.id')
      .modify(queryBuilder => {
        if (filter !== undefined) {
          queryBuilder
            .where('company_profile.name', 'like', `%${filter}%`)
            .orWhere('users.username', 'like', `%${filter}%`)
        }
      })
      .paginate(paginationParams)

    result.data = result.data.map((data: any) => ({
      userId: data.user_id,
      name: data.name,
      username: data.username,
      godChildrens: 10 + Math.floor(Math.random() * 40),
      // Para fins de demonstração esse número está sendo gerado aleatoriamente
      // Mas basta pegar a quantidade de vinculos da tabela companies_affiliates para ter o numero real
    }))

    return result
  }
}
