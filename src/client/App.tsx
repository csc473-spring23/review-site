import { useState } from "react";
import "./App.css";
import Auth from "./components/Auth";

type User = {
  username: string;
  loggedIn: boolean;
};

function App() {
  const [user, setUser] = useState<User>();

  const login = (username: string, password: string) => {
    setUser({ username: username, loggedIn: true });
  };

  return (
    <div className="App">
      <Auth login={login}></Auth>
    </div>
  );
}

export default App;
