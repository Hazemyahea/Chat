import { useState, useRef, useEffect } from "react";
import { auth } from "../config/firebase";
import { Auth } from "./Auth";
import Cookies from "universal-cookie";
import Header from "./Header";

const cookies = new Cookies();

function Home({ isAuth, setIsAuth }) {
  const [cst, setCst] = useState([]);
  const RoomInputRef = useRef();
  useEffect(() => {
    setCst(auth);
  }, [cst]);
  if (!isAuth) {
    return (
      <div className="App">
        <Header Auth={isAuth} />
        <Auth isAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div className="App relative">
      <Header Auth={isAuth} setIsAuth={setIsAuth} />
      <div className="flex justify-center flex-col gap-5 items-center mt-10">
        <h1 className="p-2 text-lg  text-sky-50 font-semibold">
          Welcome {cookies.get("username")}
        </h1>
        <img
          className=" object-cover w-20 rounded-full "
          src={cookies.get("photo")}
        ></img>
        <p className="p-1 font-light text-stone-50">
          Your Email : {cookies.get("email")}
        </p>
        <p className="p-3 font-light text-stone-50">
          You have accesee to all Chat Rooms , go To The Rooms Above and have
          Fun ✨🎉
        </p>
      </div>
    </div>
  );
}

export default Home;
