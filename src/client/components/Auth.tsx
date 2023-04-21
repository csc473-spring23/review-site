type AuthProps = {
  login: (username: string, password: string) => void;
};

export default function Auth({ login }: AuthProps): JSX.Element {
  const loginHandler = () => {
    const username = document.getElementById("username");
    const password = document.getElementById("pass");

    // in reality, I'd call /login on the backed to log in the user,
    // but let's pretend it just works
    console.log(username?.value, password?.value);

    if (password?.value === "password") {
      if (username?.value != null) {
        login(username?.value, password?.value);
      }
    } else {
      // handle login failure
      alert("Invalid login!");
    }
  };

  return (
    <div className="border p-4 border-indigo-200 border-solid">
      <div>
        <label>
          Username: <input className="border m-4" id="username"></input>
        </label>
      </div>
      <div>
        <label>
          Password: <input className="border" id="pass" type="password"></input>
        </label>
      </div>
      <button className="border" onClick={loginHandler}>
        Login!
      </button>
    </div>
  );
}
