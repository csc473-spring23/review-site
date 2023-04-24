import * as argon2 from "argon2";
import { getUserByUsername } from "../model";
import { ApplicationError } from "../errors";
import { sign } from "jsonwebtoken";

export type LoginPayload = {
  username: string;
  password: string;
};

type LoginToken = {
  token: string;
};

// make this a function so that we know nodenv.config has been called before the const is assigned
const jwtSecret = () => process.env.JWT_SECRET;

export async function loginHandler(
  username: string,
  password: string
): Promise<LoginToken> {
  // first, we need to look for our user in the db
  // then hash the password and compare
  const user = await getUserByUsername(username);
  if (user === undefined) {
    return Promise.reject(ApplicationError.LOGIN_FAILED);
  } else {
    const passwordOk = await argon2.verify(user.password, password);
    if (passwordOk) {
      const secret = jwtSecret();
      if (secret) {
        // we should login the user, so we need to generate them a token
        const token = sign({ username: username }, secret, {
          expiresIn: "1h",
        });
        return { token: token };
      } else {
        return Promise.reject("no secret!");
      }
    }
    return Promise.reject(ApplicationError.LOGIN_FAILED);
  }
}
