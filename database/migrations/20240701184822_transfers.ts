import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('transfers', function(table) {
        table.increments('id');
        table.string('transfer_code');
        table.string('account_number_from');
        table.string('account_number_to');
        table.string('bank_code');
        table.string('transfer_type');
        table.string('amount');
        table.string('narration');
        table.string('status');
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('account_id').references('id').inTable('accounts');
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('transfers');
}

