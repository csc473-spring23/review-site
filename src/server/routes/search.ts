import { Business } from "../model";
import knex from "../db";
import { Knex } from "knex";

export default async function search(query?: string): Promise<Array<Business>> {
  if (!query) {
    return Promise.reject("No query");
  }

  const rankedBusiness: Knex.QueryBuilder<Business> = knex.fromRaw(
    knex.raw(
      `
    (SELECT businesses.*
    FROM
        businesses,
        websearch_to_tsquery(?) query,
        NULLIF(ts_rank(businesses.name_vec, query), 0) rank_name,
        SIMILARITY(?, businesses.name) similarity
    WHERE query @@ businesses.name_vec OR similarity > 0
    ORDER BY rank_name, similarity DESC NULLS LAST) as rank
  `,
      [query, query]
    )
  );

  return rankedBusiness.limit(10);
}
