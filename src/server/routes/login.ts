import * as argon2 from "argon2";
import { getUserByUsername } from "../model";
import { ApplicationError } from "../errors";
import * as jwtoken from "jsonwebtoken";

// const hash = await argon2.hash(..);

type LoginToken = {
  token: string;
};

const jwtSecret = process.env["JWT_SECRET"];

export async function loginHandler(
  username: string,
  password: string
): Promise<LoginToken> {
  // first, we need to look for our user in the db
  // then hash the password and compare
  const user = await getUserByUsername(username);
  if (user === undefined) {
    console.log("user not found");
    return Promise.reject(ApplicationError.LOGIN_FAILED);
  } else {
    const hashedInput = await argon2.hash(password);
    if (user.password === hashedInput) {
      console.log("wrong password");
      if (jwtSecret) {
        // we should login the user, so we need to generate them a token
        const token = jwtoken.sign({ username: username }, jwtSecret, {
          expiresIn: "1h",
        });
        console.log("generated token");
        return { token: token };
      } else {
        console.log("no secret");
        return Promise.reject("no secret!");
      }
    }
    return Promise.reject(ApplicationError.LOGIN_FAILED);
  }
}
