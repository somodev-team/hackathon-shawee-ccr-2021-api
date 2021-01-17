import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('requests', table => {
    table.string('requester_id', 36).notNullable()
    table.foreign('requester_id').references('id').inTable('users')

    table.string('requested_id', 36).notNullable()
    table.foreign('requested_id').references('id').inTable('users')

    table.unique(['requester_id', 'requested_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('requests')
}
