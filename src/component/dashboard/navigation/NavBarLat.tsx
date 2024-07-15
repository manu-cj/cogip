import { Link } from 'react-router-dom';
import Icon_Companies from '../../../../public/assets/icon/Icon_Companies.svg';
import Icon_Invoices from '../../../../public/assets/icon/Icon_Invoices.svg';
import Icon_contact from '../../../../public/assets/icon/Icon_contact.svg';
import Icon_dashboard from '../../../../public/assets/icon/Icon_dashboard.svg';
import { NavBarLatProps } from './../../../types/type';

function NavBarLat({img, firstName, lastName}: NavBarLatProps) {


    return (
        <aside className='navBarLat'>
            <div className='navBarLat__logo'>
                <img src={img} alt={firstName + " " + lastName} />
                <p>{firstName}</p>
                <p>{lastName}</p>
            </div>
            <div className='navBarLat__menu'>
                <ul>
                    <Link to={"/dashboard"}><li><img src={Icon_dashboard} alt="Dashboard" /> Dashboard</li></Link>
                    <Link to={"/dashboard/invoices"}><li><img src={Icon_Invoices} alt="Invoices" /> Invoices</li></Link>
                    <Link to={"/dashboard/companies"}><li><img src={Icon_Companies} alt="Companies" /> Companies</li></Link>
                    <Link to={"/dashboard/contact"}><li><img src={Icon_contact} alt="Contact" /> Contact</li></Link>
                </ul>
            </div>
            <div className='navBarLat__logout'>
                <img src={img} alt={firstName + " " + lastName} />
                <p>Logout</p>
            </div>
        </aside>
    );
}

export default NavBarLat;