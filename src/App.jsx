import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import "./styles/App.css"

const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token") !== "null" ? localStorage.getItem("token") : null)

  return (
    <>
      <NavBar setToken={setToken} token={token} />
      <Routes>
        <Route path="/" element={<Home token={token} />}/>
        <Route path="/register" element={<Register setToken={setToken} />}/>
      </Routes>
    </>
  )
}

export default App
