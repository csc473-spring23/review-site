import "./App.css";
import Auth from "./components/Auth";
import MenuBar from "./components/MenuBar";
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    // AuthProvider will take care of managing the auth context for us
    // as well as the user state
    <AuthProvider>
      {/* Menu bar basically persists on every "page" of our application */}
      <MenuBar></MenuBar>
      <div className="App">
        {/* the real changing part is here*/}
        <Auth></Auth>
      </div>
    </AuthProvider>
  );
}

export default App;
