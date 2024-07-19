import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

function NavBar() {
    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return parts.pop()?.split(';').shift() || null;
        }
        return null;
      };

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
                    src={`./../../../public/assets/img/people/users/${getCookie(
                      "imageName"
                    )}`}
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
            <Link to={"/"}><h1>COGIP</h1></Link>
            <ul>
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