import Knex from 'knex'
import { IRequest, Request } from './request.model'

export interface IRequestsRepository {
  find(requestData: IRequest): Promise<Request | undefined>
  create(requestData: IRequest): Promise<Request>
  delete(requestData: IRequest): Promise<void>
}

export class RequestsRepository implements IRequestsRepository {
  constructor(private database: Knex) {}

  async find(requestData: IRequest): Promise<Request | undefined> {
    const result = await this.database
      .select('*')
      .from('requests')
      .where('requester_id', requestData.requesterId)
      .andWhere('requested_id', requestData.requestedId)
      .first()

    if (!result) {
      return undefined
    }

    return {
      requesterId: result.requester_id,
      requestedId: result.requested_id,
    }
  }

  async create(requestData: IRequest): Promise<Request> {
    const request = new Request(requestData)
    await this.database
      .insert({
        requester_id: request.requesterId,
        requested_id: request.requestedId,
      })
      .into('requests')
    return request
  }

  async delete(requestData: IRequest): Promise<void> {
    const request = new Request(requestData)
    await this.database.from('requests').delete().where({
      requester_id: request.requesterId,
      requested_id: request.requestedId,
    })
  }
}
