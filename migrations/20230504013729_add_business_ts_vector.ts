import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    ALTER TABLE businesses
    ADD COLUMN name_vec tsvector
    GENERATED ALWAYS AS (to_tsvector('english', name)) STORED;
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("businesses", (tbl) => {
    tbl.dropColumn("name_vec");
  });
}
