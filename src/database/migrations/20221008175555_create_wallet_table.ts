import { Knex } from "knex";


export async function up(knex: Knex) {
    return knex.schema
        .createTable('wallet', function (table) {
            table.increments('id').primary();
            table.float('balance').defaultTo(0.0);
            table.increments('userId').primary();
            table.foreign('userId');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        })
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable('wallet');
}

