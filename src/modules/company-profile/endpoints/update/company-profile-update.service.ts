import { validadeObject } from '../../../../utils/validation-functions'
import { ICompanyProfile, CompanyProfile } from '../../company-profile.model'
import { ICompanyProfileRepository } from '../../company-profile.repository'
import { ICompanyProfileUpdateDTO } from './company-profile-update.dto'

export class CompanyProfileUpdateService {
  constructor(private companyProfileRepository: ICompanyProfileRepository) {}

  async execute(data: ICompanyProfileUpdateDTO): Promise<ICompanyProfile> {
    try {
      // Validate Data
      const companyProfile = new CompanyProfile(data)
      await validadeObject(companyProfile)

      // Update if exists
      const existingProfile = await this.companyProfileRepository.findByUserId(
        data.userId
      )
      if (existingProfile) {
        const updatedCompanyProfile = await this.companyProfileRepository.update(
          companyProfile
        )
        return updatedCompanyProfile
      } else {
        const createdCompanyProfile = await this.companyProfileRepository.insert(
          companyProfile
        )
        return createdCompanyProfile
      }
    } catch (error) {
      throw error
    }
  }
}
