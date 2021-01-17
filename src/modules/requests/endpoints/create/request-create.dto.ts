import { IRequest } from '../../request.model'

export interface IRequestCreateDTO extends Pick<IRequest, 'requestedId'> {}
