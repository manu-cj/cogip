import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <Link to={"/"}><h1>COGIP</h1></Link>
            <ul>
                <Link to={"/"}><li>Home</li></Link>
                <Link to={"/invoices"}><li>Invoices</li></Link>
                <Link to={"/companies"}><li>Companies</li></Link>
                <Link to={"/contacts"}><li>Contact</li></Link>
            </ul>
            <div className='loginNav'>
                <Link to={"/signup"} className='sign-up'>Sign up</Link>
                <Link to={"/login"}>Login</Link>
            </div>
        </nav>
    );
}

export default NavBar;