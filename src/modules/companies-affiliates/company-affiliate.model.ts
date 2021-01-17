import { IsUUID } from 'class-validator'

export interface ICompanyAffiliate {
  companyId: string
  personId: string
}

export class CompanyAffiliate implements ICompanyAffiliate {
  @IsUUID('4')
  companyId: string

  @IsUUID('4')
  personId: string

  constructor(props: ICompanyAffiliate) {
    this.companyId = props.companyId
    this.personId = props.personId
  }
}
