import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('accounts', function(table) {
        table.increments('id');
        // table.string('account_number');
        table.string('account_ref');
        // table.string('account_name');
        table.string('account_type');
        table.integer('account_status').defaultTo(1);
        table.string('account_balance');
        table.foreign('user_id').references('id').inTable('users');
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('accounts');
}

