import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
        table.string('email').unique();
        // table.string('bvn').unique();
        table.string('password');
        table.string('phone_number');
        // table.string('user_type');
        table.integer('user_status').defaultTo(1);
        table.string('otp').nullable();
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('users');
}

