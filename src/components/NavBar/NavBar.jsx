import React from "react";
import '../NavBar/Navbar.css'
import logoImg from '../../assets/logo.png'

export default function NavBar() {
    return (
        <header className="header">
            <a href="/" className="logo" >
                <img src={logoImg} />
            </a>
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
                <a href="/logout">Logout</a>
            </nav>
        </header>
    )
}