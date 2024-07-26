import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import Hamburger from '../../dashboard/navigation/Hamburger';
import { useState, useEffect } from 'react';
import croix from '../../../../public/assets/icon/croix.svg';
import useAPI from './../../../hook/useAPI';

function NavBar() {
  const [isOpen, setIsOpen] = useState(true);

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };
  const { users } = useAPI(`http://localhost:3000/api/users/${getCookie('id')}`);
    const [imgUsers, setImgUsers] = useState("default.jpg");

    useEffect(() => {
        if (users && users.image) {
            setImgUsers(users.image.filename);
        }
    }, [users]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

      const loginNav = (): ReactNode => {
        const isLoggedIn = getCookie('id') !== null && getCookie('id') !== "";
      
        return (
          <div className="loginNav">
            {isLoggedIn ? (
              <>
                <Link to={"/logout"}>Logout</Link>
                <div className="dashboardLinkDiv">
                  <Link to={"/dashboard"} className='dashboardLink'> Dashboard </Link>
                  <a href="/dashboard"><img
                    src={`./assets/img/people/users/${imgUsers}`}
                    alt="profil-picture"
                    className="pictureNav"
                  /></a>
                  
                </div>
              </>
            ) : (
              <>
                <Link to={"/signup"} className="sign-up">
                  Sign up
                </Link>
                <Link to={"/login"}>Login</Link>
              </>
            )}
          </div>
        );
    };

    return (
        <nav>
            <Hamburger className={`hamburger ${isOpen ? '': 'hidden'}`} toggle={handleClick} />
            <Link to={"/"}><h1>COGIP</h1></Link>
            <img src={croix} alt="Close" className={`close ${isOpen ? 'hidden': ''}`} onClick={handleClick} />
            <ul className={isOpen ? 'hidden' : 'visible'}>
                <Link to={"/"}><li>Home</li></Link>
                <Link to={"/invoices/10/1"}><li>Invoices</li></Link>
                <Link to={"/companies/10/1"}><li>Companies</li></Link>
                <Link to={"/contacts/10/1"}><li>Contact</li></Link>
            </ul>
            {loginNav()}
        </nav>
    );
}

export default NavBar;