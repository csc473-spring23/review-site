import { useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import MenuBar from "./components/MenuBar";
import { User } from "./types";
import * as axios from "axios";

function App() {
  const [user, setUser] = useState<User>();

  const login = (username: string, password: string) => {
    const authResponse = axios.default.post("/login", {
      username: username,
      password: password,
    });
    authResponse
      .then((resp) => {
        if (resp.status === 200) {
          // we should get a token back
          setUser({
            username: username,
            loggedIn: true,
            token: resp.data.token,
          });
        }
      })
      .catch((reason) => {
        console.log(reason);
        // login failed;
      });
  };

  return (
    <>
      <MenuBar user={user}></MenuBar>
      <div className="App">
        <Auth login={login}></Auth>
      </div>
    </>
  );
}

export default App;
