import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator'

export interface ICompanyProfile {
  userId: string
  name: string
  bio: string
  phone: string
  addressState: string
  addressCity: string
  areasOfActuation: string[]
}

export class CompanyProfile implements ICompanyProfile {
  @IsUUID('4')
  userId: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  bio: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  phone: string

  @IsString()
  @IsNotEmpty()
  @Length(2)
  addressState: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  addressCity: string

  @IsArray()
  @IsString({
    each: true,
  })
  @IsNotEmpty({
    each: true,
  })
  areasOfActuation: string[]

  constructor(props: ICompanyProfile) {
    this.userId = props.userId
    this.name = props.name
    this.bio = props.bio
    this.phone = props.phone
    this.addressState = props.addressState
    this.addressCity = props.addressCity
    this.areasOfActuation = props.areasOfActuation
  }
}
