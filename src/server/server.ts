import express from "express";
import ViteExpress from "vite-express";
import * as dotenv from "dotenv";

import {
  getBusinessHandler,
  getBusinessReviewHandler,
} from "./routes/business";
import { ApplicationError } from "./errors";

// first things first, load the environment variables
dotenv.config();

const app = express();

app.get("/api", (req, resp) => {
  resp.send({ foo: "bar" });
});

app.get("/api/business/:business_id", (req, resp) => {
  // step 1: extract the business id
  // we shouldn't have to worry that the business id doesn't exist because we matched the route
  const { business_id } = req.params;
  void getBusinessHandler(business_id)
    .then((respData) => {
      resp.send(respData);
    })
    .catch((err) => {
      if (err === ApplicationError.UNKNOWN_BUSINESS) {
        resp.status(404).send("unknown business");
      } else {
        // we got some other error that we weren't expecting
        resp.status(500).send(`unknown error`);
      }
    });
});

app.get("/api/business/:business_id/review/", (req, resp) => {
  const { business_id } = req.params;

  void getBusinessReviewHandler(business_id)
    .then((reviews) => {
      resp.send(reviews);
    })
    .catch((err) => {
      if (err === ApplicationError.UNKNOWN_BUSINESS) {
        resp.status(404).send("unknown business");
      } else {
        resp.status(500).send(`unknown error`);
      }
    });
});

ViteExpress.listen(app, 3000, () => {
  console.log("Server is listening on port 3000...");
});
