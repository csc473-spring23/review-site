import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("reviews", (tbl) => {
    tbl.text("text").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("reviews", (tbl) => {
    tbl.dropColumn("text");
  });
}
