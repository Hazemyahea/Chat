import Header from "./Header";
import { db, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
const cookies = new Cookies();
function Rooms({ isAuth, setIsAuth, room, setRoom }) {
  const [Rooms, setRooms] = useState([]);
  const [isLoading, setIslodaing] = useState(true);
  const RoomRef = collection(db, "rooms");
  useEffect(() => {
    const queryRooms = query(RoomRef);
    const clean = onSnapshot(queryRooms, (snapshot) => {
      let rooms = [];
      snapshot.forEach((doc) => {
        rooms.push({ ...doc.data(), id: doc.id });
      });
      setRooms(rooms);
      setIslodaing(false);
    });

    return () => clean();
  }, []);
  const navigate = useNavigate();
  function GoToChat(room) {
    setRoom(room);
    cookies.set("room", room);
    navigate("/chat");
  }
  return (
    <>
      <Header Auth={isAuth} setIsAuth={setIsAuth} />
      {isAuth ? (
        <div className="mx-4">
          <h1 className="p-5 text-4xl text-rose-50">Rooms</h1>
          {isLoading ? (
            <div class="300 shadow rounded-md p-4">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 bg-slate-700 rounded"></div>
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex p-2 flex-col gap-5">
              {Rooms.map((room) => {
                return (
                  <div
                    onClick={() => GoToChat(room.name)}
                    className="p-7 rounded-lg cursor-pointer bg-slate-300 transition ease-in-out  hover:border-l-4 hover:border-red-600"
                  >
                    <p className=" text-slate-900 font-semibold text-lg">
                      {room.name}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <p className="p-10 text-slate-300 font-bold">
          You do not have permission to be on this page, please log in! 🧨
        </p>
      )}
    </>
  );
}

export default Rooms;
