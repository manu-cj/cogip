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

    return (
        <div className='dashBoard'>
            <Hamburger className={`hamburger ${isOpen ? '' : 'hidden'}`} toggle={handleClick}/>
            <NavBarLat img="./../../../public/assets/img/unbgcommeunautre.jpg" firstName="Dylan"  lastName="Feys" className={`navBarLat ${isOpen ? 'hidden' : 'visible'}`} toggle={handleClick}/>
            <div className='dashBoard__content'>
                <Header firstName="Dylan"/>
                <div className='dashBoard__content__body'>
                    <div className="dashBoard__content__body--left">
                        <Stat />
                        <LastContact contact={[{name: "Dylan", phone: "06 12 34 56 78", email: "pFQw5@example.com"}]}/>
                    </div>
                    <div className="dashBoard__content__body--right">
                        <LastInvoice invoice={[{number: "0001", date: "01/01/2021", company: "Company 1"}]}/>
                        <LastCompanies companies={[{tva: "FR123456789", name: "Company 1", country: "France"}, {tva: "FR123456789", name: "Company 2", country: "France"}, {tva: "FR123456789", name: "Company 3", country: "France"}, {tva: "FR123456789", name: "Company 4", country: "France"}]}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;