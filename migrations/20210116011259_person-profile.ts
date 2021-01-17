import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('person_profile', (table) => {
    table.string('user_id', 36).primary().notNullable().unique();
    table.string('name', 255).notNullable();
    table.dateTime('born_date').notNullable();
    table.string('phone', 40).notNullable();
    table.string('address_state', 2).notNullable();
    table.string('address_city', 40).notNullable();
    table.boolean('pwd').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('person_profile');
}
