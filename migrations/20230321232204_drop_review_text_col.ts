import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("reviews", (tbl) => {
    tbl.dropColumn("text");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("reviews", (tbl) => {
    tbl.string("text").notNullable();
  });
}
