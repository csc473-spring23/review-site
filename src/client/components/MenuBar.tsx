import { User } from "../types";

interface MenuBarProps {
  user?: User;
}

export default function MenuBar(props: MenuBarProps) {
  // show's the username if logged in, else show a link to the login screen
  const text = props.user ? props.user.username : "log in";
  return <div className="background-blue">{text}</div>;
}
