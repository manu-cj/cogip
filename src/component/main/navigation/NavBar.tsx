import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <Link to={"/"}><h1>COGIP</h1></Link>
            <ul>
                <Link to={"/"}><li>Home</li></Link>
                <Link to={"/invoice"}><li>Invoices</li></Link>
                <Link to={"/companies"}><li>Companies</li></Link>
                <Link to={"/contact"}><li>Contact</li></Link>
            </ul>
            <div>
                <Link to={"/signup"}>Sign up</Link>
                <Link to={"/login"}>Login</Link>
            </div>
        </nav>
    );
}

export default NavBar;