import { User } from "../types";

interface MenuBarProps {
  user?: User;
}

export default function MenuBar(props: MenuBarProps) {
  // show's the username if logged in, else show a link to the login screen
  const text = props.user ? props.user.username : "log in";
  return (
    <div className="bg-sky-300 fixed top-0 left-0 right-0 p-4">{text}</div>
  );
}
