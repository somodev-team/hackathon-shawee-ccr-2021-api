import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('company_profile', table => {
    table.string('user_id', 36).primary().notNullable().unique()
    table.string('name', 255).notNullable()
    table.text('bio')
    table.string('phone', 40).notNullable()
    table.string('address_state', 2).notNullable()
    table.string('address_city', 40).notNullable()
    table.json('areas_of_actuation')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('company_profile')
}
