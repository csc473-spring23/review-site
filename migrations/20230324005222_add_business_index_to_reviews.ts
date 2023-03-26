import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("reviews", (tbl) => {
    tbl.index(["business_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("reviews", (tbl) => {
    tbl.dropIndex(["business_id"]);
  });
}
