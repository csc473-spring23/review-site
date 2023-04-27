import express from "express";
import ViteExpress from "vite-express";
import * as dotenv from "dotenv";

import {
  getBusinessHandler,
  getBusinessReviewHandler,
} from "./routes/business";
import { LoginPayload, loginHandler } from "./routes/login";
import { ApplicationError } from "./errors";
import { getUserByUsername, setPassword } from "./model";
import { Request } from "express";

// first things first, load the environment variables
dotenv.config();

const app = express();

app.use(express.json());

app.post("/login", (req: Request<object, unknown, LoginPayload>, resp) => {
  console.log("got a login");
  // extract the username and password from the body of the request
  const { username, password } = req.body;
  loginHandler(username, password)
    .then((respData) => {
      resp.send(respData);
    })
    .catch((err) => {
      if (err === ApplicationError.LOGIN_FAILED) {
        resp.status(401).send("login failed");
      } else {
        resp.status(500).send(`unknown error`);
      }
    });
});

app.post(
  "/setPassword",
  (req: Request<object, unknown, LoginPayload>, resp) => {
    const { username, password } = req.body;

    // find the user id
    getUserByUsername(username)
      .then((user) => {
        if (user) {
          return setPassword(user?.id, password);
        } else {
          return Promise.reject("unknown user");
        }
      })
      .then(() => {
        resp.send("OK");
      })
      .catch((reason) => {
        resp.status(500).send(reason);
      });
  }
);

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

app.get("/api/search", (req, resp) => {
  resp.send();
});

app.post("/api/business/:business_id/review", (req, resp) => {
  // I should be able to post a review for a business
  // this also needs some auth/jwt middleware to check that I'm logged in
  resp.send();
});

ViteExpress.listen(app, 3000, () => {
  console.log("Server is listening on port 3000...");
});
