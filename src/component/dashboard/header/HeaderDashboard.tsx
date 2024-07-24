import img_dashboard from '../../../../public/assets/img/img_dashboard.svg';
import { useLocation, useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';


function Header({firstName}: {firstName: string | null}) {
    const navigate = useNavigate ();

    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
      }
      return null;
    };

const cookies = {
  id : getCookie('roleId'),
}
console.log(JSON.stringify(cookies));


    const getPermissions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cookie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cookies)
        });
        console.log(response.headers.get('Content-Type'))
        const result = await response.json();
    
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

    getPermissions();
  
    useEffect(() => {
        if (!getCookie('lastName')) {
          navigate('/');
        }
      },);

    const location = useLocation()
    const ariane = location.pathname
    const newPath = ariane.replace("/", "");

    
      

    return (
        <div className='dashboard-header'>
            <div className='header__title'>
                <h1>DashBoard</h1>
                <p>{newPath}</p>
            </div>
            <div className='header__content'>
                <h2>Welcome back {firstName}!</h2>
                <p>You can here add an invoice, a company and some contacts.</p>
            </div>
            <img src={img_dashboard} alt="Un bg qui bosse sur un pc" />
        </div>
    );
}

export default Header;