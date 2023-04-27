import { useAuth } from "../auth/auth_context";

export default function MenuBar() {
  const auth = useAuth();
  // show's the username if logged in, else show a link to the login screen
  const text = auth.user ? auth.user.username : "log in";
  return (
    <div className="bg-sky-300 fixed top-0 left-0 right-0 p-4">{text}</div>
  );
}
