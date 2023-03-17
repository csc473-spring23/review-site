import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("businesses", (table) => {
    table.increments("id");
    table.string("business_id").notNullable().unique();
    table.string("name").notNullable();
    table.string("street");
    table.string("city");
    table.string("state");
    table.string("postcode");
    table.boolean("is_open");
    table.double("latitude");
    table.double("longitude");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("businesses");
}
