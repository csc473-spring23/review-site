import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id", { primaryKey: true });
      table.string("user_id").notNullable().unique();
      table.string("name").notNullable();
      table.datetime("join_date");
    })
    .createTable("reviews", (table) => {
      table.increments("id", { primaryKey: true });
      table.string("review_id").notNullable().unique();
      table.string("user_id").notNullable();
      table.string("business_id").notNullable();
      table.string("text").notNullable();
      table.smallint("useful_count").defaultTo(0);
      // building the foreign key constraints that user_id and business_id
      // exist
      table.foreign("user_id").references("user_id").inTable("users");
      table
        .foreign("business_id")
        .references("business_id")
        .inTable("businesses");
    });
}

// This isn't the best-designed migration because we need to be sure to
// drop reviews before we drop users because of the foregin key.
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("reviews").dropTable("users");
}
