import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


import NavBar from "./components/NavBar/NavBar"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Regitser from "./components/Register/Register"
import Logout from "./components/Logout/Logout"

function App() {


  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Regitser />} />
        <Route path='/logout' element={<Logout />} />

      </Routes>
    </Router>
  )
}

export default App
