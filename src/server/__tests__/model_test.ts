import { describe, expect, test } from "@jest/globals";

// IMPORTANT: I'm about to interact with the database.
// This isn't a unit test!
import { getBusinessById } from "../model";

describe("business table integration tests", () => {
  test("we fetch a business that exists", async () => {
    await getBusinessById("FvzSJKFwhTYkpOh0TZD_nA").then((res) => {
      expect(res).toBe({ business_id: "FvzSJKFwhTYkpOh0TZD_nA" });
    });
  });
});
