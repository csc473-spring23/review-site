import express from "express";
import ViteExpress from "vite-express";
import * as dotenv from "dotenv";

import {
  Pagination,
  addReviewHandler,
  getBusinessHandler,
  getBusinessReviewHandler,
} from "./routes/business";
import { LoginPayload, loginHandler, jwtSecret } from "./routes/login";
import { ApplicationError } from "./errors";
import { getUserByUsername, setPassword } from "./model";
import { Request } from "express";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { Secret } from "jsonwebtoken";
import search from "./routes/search";

// first things first, load the environment variables
dotenv.config();

console.log(process.env.DB_HOST);

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

  // check on our query params
  const { nextPageRaw } = req.query;
  const nextPage = nextPageRaw ? parseInt(nextPageRaw as string) : undefined;

  const pagination: Pagination | undefined = nextPage
    ? { offset: nextPage }
    : undefined;

  void getBusinessReviewHandler(business_id, pagination)
    .then((reviews) => {
      resp.send(reviews);
    })
    .catch((err) => {
      if (err === ApplicationError.UNKNOWN_BUSINESS) {
        resp.status(404).send("unknown business");
      } else {
        console.log(err);
        resp.status(500).send(`unknown error`);
      }
    });
});

app.get("/api/search", (req, resp) => {
  const query: string = req.query.q as string;
  search(query)
    .then((result) => resp.send({ results: result }))
    .catch((err) => {
      console.error("Search failed", err);
      resp.status(500).send();
    });
});

app.post(
  "/api/business/:business_id/review",
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-non-null-assertion
  expressjwt({ secret: jwtSecret()! as Secret, algorithms: ["HS256"] }),
  (req: JWTRequest, resp) => {
    const token = req.auth;
    const data = req.body as { business_id: string; text: string };
    if (!token) {
      // not logged in (we'll assume the token hasn't expired -- need to check if the middleware rejects)
      resp.status(401).send();
    } else {
      addReviewHandler(token.user as string, data)
        .then(() => resp.send())
        .catch((err) => {
          if (err == ApplicationError.UNKNOWN_USER) {
            // the request was bad, but let's not actually say the user doesn't exist to hide that information
            resp.status(400).send();
          }
          console.error("Review addition failed", err);
          resp.status(500).send();
        });
    }
  }
);

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

ViteExpress.listen(app, 3000, () => {
  console.log("Server is listening on port 3000...");
});
