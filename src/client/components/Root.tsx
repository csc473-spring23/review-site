import { Outlet } from "react-router";
import MenuBar from "./MenuBar";

export default function Root() {
  return (
    <>
      <MenuBar></MenuBar>
      <div className="App container p-10">
        {/* the real changing part is here*/}
        <Outlet />
      </div>
    </>
  );
}
