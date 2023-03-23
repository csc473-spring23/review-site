/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from "fs";
import * as readline from "readline";
import * as dotenv from "dotenv";
import { Business, Review, User } from "../src/server/model";
import { knex as knx } from "knex";
import { DateTime } from "luxon";
import { exit } from "process";

dotenv.config();
console.log(process.env);

const ignored_review_ids = new Set([
  "HS2Og8fu_9lzl-AlQ1L8Gw",
  "TZMTtzsG7hIy_1usL83moQ",
  "rrXJ9Eux82kl7xm5YEUf2w",
  "iyoDkW-8aneKfvPi7KZMQQ",
  "XuqkOMPkmKsKFzFQg7F82A",
  "JVuwa9WSsFe52HDmK4wD2g",
  "GZmjLeVfDktqx7xZvAHBSg",
  "ebQaTudrnT1wE8SZkzzYGQ",
  "EZ0mbYE2xvG7g9rpn1_zmg",
  "1pcF0fYcXZ2V9QUgtFF8Lw",
  "NVgvU3QYl28YJ-GcMjfhlA",
  "G8n21nKcVNR-noZJqz3sEw",
  "WOYA_0Wj5aq9sM5UfPCbRQ",
  "d34uBmQ8ubYcL_yFpNatOw",
  "-i2qcWQ36WdYx-9e2ophAg",
  "NrZq0ndDHpHEXXCN6UJrKw",
  "wctH1ygJiMX98mCH5MHuKA",
  "rO8vZiS3PGZpKhLaReI0gg",
  "p8XkoJPBsBo6gYIXc5EyfQ",
  "ojv1NeMghN0rYviQ7pgbFg",
  "wIW-gvYpTWsLMRix-8oPBQ",
  "someGXycB0i0aPca8vCg5w",
  "DZOcpl3hAhnoBbDE1_BL7w",
  "4dkoWxrVQwYdIqNtjb18uw",
  "qXREs--20x_QtMFZjl0zsg",
  "_yuju4d10FffosLJOJ4mgg",
  "HfTRDbOXNVIhE7zp78awNA",
  "aiqDd7oFKug-tS4lv9-B8g",
  "an39xQvirUGSlrzmOnEHuw",
  "iOsa_6F8Ivfa4igfu_9DPg",
  "IRV6NzLKFLBvG_Ty1KhfKg",
  "BdN64fWg9lST1fE1S5hZVQ",
  "cR2TwKnfGp_ZSEofHfr7Mw",
]);

const knex = knx({
  client: "pg",
  connection: {
    database: "default",
  },
  debug: process.env.NODE_ENV == "development",
});

async function processLineByLine(
  path: string,
  processLine: (path: string) => Promise<unknown>
) {
  // see https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
  const filestream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    await processLine(line);
  }
}

async function loadBusinesses() {
  const loadBusiness = async (line: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rawBusiness = JSON.parse(line);
    const businesData: Omit<Business, "id"> = {
      business_id: rawBusiness.business_id,
      name: rawBusiness.name,
      street: rawBusiness.address,
      city: rawBusiness.city,
      state: rawBusiness.state,
      postcode: rawBusiness.postal_code,
      is_open: rawBusiness.is_open,
      latitude: rawBusiness.latitude,
      longitude: rawBusiness.longitude,
    };

    await knex.insert(businesData).into("businesses");
  };

  await processLineByLine(
    "../yelp_academic_dataset_business.json",
    loadBusiness
  );
}

async function loadUsers() {
  const trx = await knex.transaction();

  const loadUser = async (line: string) => {
    const rawUser = JSON.parse(line);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const joinDate: DateTime = DateTime.fromSQL(rawUser.yelping_since);

    const user: Omit<User, "id"> = {
      user_id: rawUser.user_id,
      name: rawUser.name,
      join_date: joinDate,
    };

    await trx.insert(user).into("users");
  };

  await processLineByLine("../yelp_academic_dataset_user.json", loadUser)
    .then(() => trx.commit())
    .catch((err) => {
      console.log(err);
      return trx.rollback();
    });
}

async function loadReviews() {
  const trx = await knex.transaction();

  const loadReview = async (line: string) => {
    const rawReview = JSON.parse(line);
    const review: Omit<Review, "id"> = {
      review_id: rawReview.review_id,
      user_id: rawReview.user_id,
      business_id: rawReview.business_id,
      text: rawReview.text,
      useful_count: rawReview.useful,
    };

    if (ignored_review_ids.has(review.review_id)) {
      return Promise.resolve();
    } else {
      await trx.insert(review).into("reviews");
    }
  };

  await processLineByLine("../yelp_academic_dataset_review.json", loadReview)
    .then(() => trx.commit())
    .catch((err) => {
      console.log(err);
      return trx.rollback();
    });
}

loadReviews()
  .then(() => {
    console.log("success!");
    exit(0);
  })
  .catch((err) => {
    console.log("failure!", err);
    exit(1);
  });
