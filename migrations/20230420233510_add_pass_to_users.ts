import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (tbl) => {
    tbl.text("password");
    tbl.text("username").unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (tbl) => {
    tbl.dropColumns("password", "username");
  });
}
