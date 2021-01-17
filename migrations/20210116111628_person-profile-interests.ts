import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('person_profile', table => {
    table.json('areas_of_interest')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('person_profile', table => {
    table.dropColumn('areas_of_interest')
  })
}
