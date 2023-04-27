import { FormEvent } from "react";
import { useAuth } from "../auth/auth_context";

export default function Auth(): JSX.Element {
  const auth = useAuth();

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { username, password } = Object.fromEntries(formData);
    // in reality, I'd call /login on the backed to log in the user,
    // but let's pretend it just works
    console.log(username as string, password as string);

    if (username != null) {
      auth.login(username as string, password as string, () => {
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
