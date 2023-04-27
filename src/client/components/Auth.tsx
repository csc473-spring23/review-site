import { FormEvent } from "react";
import { useAuth } from "../auth/auth_context";
import { To, useLocation, useNavigate } from "react-router";

export default function Auth(): JSX.Element {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // because we're going to redirect after login, we need to know where the user came from
  const from = location.state?.from?.pathname || "/";

  console.log("Previous location: ", from);

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { username, password } = Object.fromEntries(formData);

    if (username != null) {
      auth.login(username as string, password as string, () => {
        // assume we logged in successfully, so go back where we came from
        // replace: true means we alter the history so that we don't back button to the login page
        navigate(from as To, { replace: true });
        console.log("Logged in successfully");
      });
    } else {
      // handle login failure
      alert("Invalid login!");
    }
  };

  return (
    <div className="container mx-auto grid h-screen place-items-center">
      <form className="max-w-sm bg-white shadow-lg p-8" onSubmit={loginHandler}>
        <div className="mb-4">
          <label>
            Username:{" "}
            <input className="border" name="username" id="username"></input>
          </label>
        </div>
        <div>
          <label>
            Password:{" "}
            <input
              className="border"
              id="password"
              name="password"
              type="password"
            ></input>
          </label>
        </div>
        <div className="flex place-items-center align-center">
          <button
            className="bg-blue-500 p-2 mt-4 rounded self-center"
            type="submit"
          >
            Login!
          </button>
        </div>
      </form>
    </div>
  );
}
