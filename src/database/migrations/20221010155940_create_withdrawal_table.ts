import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('withdrawal', table => {
    table.increments('id').primary();
    table.integer('userId');
    table.foreign('userId');
    table.integer('transactionId');
    table.foreign('transactionId');
    table.integer('amount');
    table.enu('status', ['success', 'fail', 'pending']);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('withdrawal');
}
