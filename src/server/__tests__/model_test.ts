import { describe, expect, test, beforeAll } from "@jest/globals";
import * as dotenv from "dotenv";

// IMPORTANT: I'm about to interact with the database.
// This isn't a unit test!
import { getBusinessById } from "../model";

beforeAll(() => {
  return Promise.resolve(dotenv.config());
});

describe("business table integration tests", () => {
  test("we fetch a business that exists", async () => {
    expect(await getBusinessById("FvzSJKFwhTYkpOh0TZD_nA")).toStrictEqual({
      business_id: "FvzSJKFwhTYkpOh0TZD_nA",
      city: "Meridian",
      id: 21979,
      is_open: true,
      latitude: 43.635062561,
      longitude: -116.3535226509,
      name: "Crumbl Cookies - Meridian",
      postcode: "83646",
      state: "ID",
      street: "3340 N Eagle Rd",
    });
  });

  test("we return undefined when the business doesn't exist", async () => {
    void expect(getBusinessById("123")).resolves.toEqual(undefined);
  });
});
