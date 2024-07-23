import Header from './header/HeaderDashboard';
import NavBarLat from './navigation/NavBarLat';
import Stat from './dashboard/Stat';
import LastContact from './dashboard/LastContact';
import LastCompanies from './dashboard/LastCompanies';
import LastInvoice from './dashboard/LastInvoice';
import Hamburger from './navigation/Hamburger';
import { useState } from 'react';

function DashBoard() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return parts.pop()?.split(';').shift() || null;
        }
        return null;
      };


    return (
        <div className='dashBoard'>
            <Hamburger className={`hamburger ${isOpen ? '' : 'hidden'}`} toggle={handleClick}/>
            <NavBarLat img={getCookie("imageName")} firstName={getCookie("firstName")}  lastName={getCookie("lastName")} className={`navBarLat ${isOpen ? 'hidden' : 'visible'}`} toggle={handleClick}/>
            <div className='dashBoard__content'>
                <Header firstName={getCookie("firstName")}/>
                <div className='dashBoard__content__body'>
                    <div className="dashBoard__content__body--left">
                        <Stat />
                        <LastContact />
                    </div>
                    <div className="dashBoard__content__body--right">
                        <LastInvoice />
                        <LastCompanies />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;