import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token") !== "null" ? localStorage.getItem("token") : null)

  return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={<Home token={token} />}/>
        <Route path="/register" element={<Register setToken={setToken} />}/>
        <Route path="/login" element={<Login token={token} setToken={setToken} />}/>
      </Routes>
    </>
  )
}

export default App
