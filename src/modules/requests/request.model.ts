import { IsUUID } from 'class-validator'

export interface IRequest {
  requesterId: string
  requestedId: string
}

export class Request implements IRequest {
  @IsUUID('4')
  requesterId: string

  @IsUUID('4')
  requestedId: string

  constructor(props: IRequest) {
    this.requesterId = props.requesterId
    this.requestedId = props.requestedId
  }
}
