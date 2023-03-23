import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("reviews", (table) => {
    table.smallint("stars").checkBetween([1, 5], "star_range");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("reviews", (table) =>
    table.dropColumn("stars")
  );
}
