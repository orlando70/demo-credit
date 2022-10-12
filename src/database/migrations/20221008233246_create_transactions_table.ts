import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('transactions', table => {
    table.increments('id').primary();
    table.integer('userId');
    table.foreign('userId');
    table.enu('type', ['deposit', 'withdrawal', 'transfer']);
    table.float('amount');
    table.string('reference');
    table.string('description');
    table.integer('source');
    table.integer('destination');
    table.enu('status', ['success', 'fail', 'pending']);
    table.float('openingBalance').defaultTo(0);
    table.float('closingBalance').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('transactions');
}
