import knex from 'knex'
import { attachPaginate } from 'knex-paginate'

const config = require('../../../knexfile')

export const database = knex(config)
attachPaginate()
