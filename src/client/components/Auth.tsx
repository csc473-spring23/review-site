type AuthProps = {
  login: (username: string, password: string) => void;
};

export default function Auth({ login }: AuthProps): JSX.Element {
  const loginHandler = () => {
    const username = document.getElementById("username");
    const password = document.getElementById("pass");

    // in reality, I'd call /login on the backed to log in the user,
    // but let's pretend it just works
    console.log(username, password);

    if (password?.textContent === "password") {
      if (username?.textContent != null) {
        login(username?.textContent, password?.textContent);
      }
    } else {
      // handle login failure
    }
  };

  return (
    <div>
      <div>
        <label>
          Username: <input id="username"></input>
        </label>
      </div>
      <div>
        <label>
          Password: <input id="pass" type="password"></input>
        </label>
      </div>
      <button onClick={loginHandler}>Login!</button>
    </div>
  );
}
