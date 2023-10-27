import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function Auth({ isAuth }) {
  const signInWithgoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("isLoggin", true);
      isAuth(cookies.get("isLoggin"));
      cookies.set("username", auth.currentUser.displayName);
      cookies.set("email", auth.currentUser.email);
      cookies.set("photo", auth.currentUser.photoURL);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login rounded-md text-rose-50">
      <p className="">Alot of Chat Rooms Waitng you!</p>
      <p>Chat in Any topic, Tech,politics event Music 🎼</p>
      <p>Just Create the Room With your Friends and FUN ✨🎉</p>
      <button
        className="p-3 mt-2 bg-gray-800 text-blue-200 rounded-md transition duration-200 ease-in-out hover:translate-x-1"
        onClick={() => signInWithgoogle()}
      >
        Sign it With Google
      </button>
    </div>
  );
}
