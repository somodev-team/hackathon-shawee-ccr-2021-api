import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('companies_affiliates', table => {
    table.string('person_id', 36).notNullable()
    table.foreign('person_id').references('id').inTable('users')

    table.string('company_id', 36).notNullable()
    table.foreign('company_id').references('id').inTable('users')

    table.unique(['person_id', 'company_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('companies_affiliates')
}
