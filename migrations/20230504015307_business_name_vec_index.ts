import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("businesses", (tbl) => {
    tbl.index(["name_vec"], "name_vec_idx", {
      indexType: "gin",
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("businesses", (tbl) => {
    tbl.dropIndex(["name_vec", "name_vec_idx"]);
  });
}
