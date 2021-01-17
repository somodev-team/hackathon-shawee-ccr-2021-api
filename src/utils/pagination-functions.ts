import { IPaginateParams } from 'knex-paginate'

const DEFAULT_PAGE_SIZE = 50
const MAX_PAGE_SIZE = 100

export function getPaginationParamsFromRequest(req: any): IPaginateParams {
  const currentPage = req.query.currentPage || 1
  const perPage = Math.min(
    req.query.perPage || DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE
  )
  return {
    currentPage,
    perPage,
  }
}
