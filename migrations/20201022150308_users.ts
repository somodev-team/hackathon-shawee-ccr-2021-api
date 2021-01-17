import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.string('id', 36).primary().notNullable().unique()
    table.string('type', 255).notNullable()
    table.string('username', 20).notNullable()
    table.string('password', 255).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
