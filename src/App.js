import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Cookies from "universal-cookie";
import Home from "./components/Home";
import Rooms from "./components/Rooms";
import { useState } from "react";
import Chat from "./components/Chat";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("isLoggin"));
  const [room, setRoom] = useState(cookies.get("room"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />}
        ></Route>
        <Route
          path="/rooms"
          element={
            <Rooms
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              room={room}
              setRoom={setRoom}
            />
          }
        ></Route>
        <Route
          path="/chat"
          element={<Chat room={room} isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
