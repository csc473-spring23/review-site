import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", (tbl) => {
    tbl.increments("id");
    tbl.string("username");
    tbl.text("password");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
