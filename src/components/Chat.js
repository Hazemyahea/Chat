import { useEffect, useRef, useState } from "react";
import { db, auth } from "../config/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Header from "./Header";

function Chat({ room, isAuth, setIsAuth }) {
  const [newMessage, SetNewMessage] = useState("");
  const [Messages, Setmessages] = useState([]);
  const [isLoading, setIslodaing] = useState(true);
  const MessageRef = collection(db, "messages");
  const lastRef = useRef(null);

  useEffect(() => {
    const queryMessages = query(
      MessageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const clean = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      Setmessages(messages);
      setIslodaing(false);
    });

    return () => clean();
  }, []);

  useEffect(() => {
    lastRef.current.scrollIntoView();
    console.log(room);
  }, [Messages]);

  async function HandleSubmit(e) {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(MessageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    SetNewMessage("");
  }
  return (
    <div>
      <Header Auth={isAuth} setIsAuth={setIsAuth} />
      {isAuth ? (
        <>
          <h1 className="p-3 text-gray-300 text-lg font-light">
            Welcome you are in {room} room 🎈🎈
          </h1>
          <div className="p-5 gap-5 border border-slate-400 shadow-md">
            <div className=" overflow-scroll h-96">
              {Messages.map((message) => {
                return (
                  <div>
                    <span className="text-rose-50">{message.user}</span>
                    <p className="p-2 text-slate-300 bg-slate-600 m-3 rounded-lg">
                      {message.text}
                    </p>
                  </div>
                );
              })}
              <div ref={lastRef}></div>
            </div>
            <form className="p-3" onSubmit={HandleSubmit}>
              <input
                value={newMessage}
                className="p-2 mr-1 mt-1 w-2/3 h-16 rounded-lg"
                placeholder="Type Your Message"
                onChange={(e) => SetNewMessage(e.target.value)}
              />
              <button
                className=" h-16 transition ease-in-out duration-200 p-2 w-40 text-zinc-950 px-2 font-semibold bg-zinc-100 rounded-md hover:bg-black hover:text-slate-200"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <p className="p-10 text-slate-300 font-bold">
          You do not have permission to be on this page, please log in! 🧨
        </p>
      )}
    </div>
  );
}

export default Chat;
