import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../config/firebase";
const cookies = new Cookies();

function Header({ Auth, setIsAuth }) {
  async function singout() {
    await signOut(auth);
    cookies.remove("isLoggin");
    cookies.remove("room");
    cookies.remove("username");
    cookies.remove("email");
    cookies.remove("photo");
    setIsAuth(false);
  }
  return (
    <nav className="p-3 flex justify-between bg-slate-800 text-cyan-200">
      <h1 className="text-lg">Chat App!</h1>
      <ul className="flex justify-between gap-6">
        <li>
          <Link to="/">Home</Link>
        </li>
        {Auth && (
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
        )}
        {Auth && (
          <li className="cursor-pointer" onClick={() => singout()}>
            Sing out
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
