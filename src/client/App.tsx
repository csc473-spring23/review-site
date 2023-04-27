import "./App.css";
import Auth from "./components/Auth";
import AuthProvider from "./auth/AuthProvider";
import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import { RouterProvider } from "react-router";
import Business from "./components/business/Business";
import businessLoader from "./components/business/loader";

const router: Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Auth />,
      },
      {
        path: "/business/:id",
        element: <Business />,
        loader: businessLoader,
      },
    ],
  },
]);

function App() {
  return (
    // AuthProvider will take care of managing the auth context for us
    // as well as the user state
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
