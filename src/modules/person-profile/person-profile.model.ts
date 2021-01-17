import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator'

export interface IPersonProfile {
  userId: string
  name: string
  bornDate: Date
  phone: string
  addressState: string
  addressCity: string
  pwd: string
  areasOfInterest: string[]
}

export class PersonProfile implements IPersonProfile {
  @IsUUID('4')
  userId: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsDate()
  bornDate: Date

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

  @IsBoolean()
  pwd: string

  @IsArray()
  @IsString({
    each: true,
  })
  @IsNotEmpty({
    each: true,
  })
  areasOfInterest: string[]

  constructor(props: IPersonProfile) {
    this.userId = props.userId
    this.name = props.name
    this.bornDate = new Date(props.bornDate)
    this.phone = props.phone
    this.addressState = props.addressState
    this.addressCity = props.addressCity
    this.pwd = props.pwd
    this.areasOfInterest = props.areasOfInterest
  }
}
