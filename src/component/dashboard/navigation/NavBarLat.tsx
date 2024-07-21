import { Link } from 'react-router-dom';
import Icon_Companies from '../../../../public/assets/icon/Icon_Companies.svg';
import Icon_Invoices from '../../../../public/assets/icon/Icon_Invoices.svg';
import Icon_contact from '../../../../public/assets/icon/Icon_contact.svg';
import Icon_dashboard from '../../../../public/assets/icon/Icon_dashboard.svg';
import croix from '../../../../public/assets/icon/croix.svg';
import { NavBarLatProps } from '../../../types/types';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
} from "@fortawesome/free-solid-svg-icons";


function NavBarLat({img, firstName, lastName, className, toggle}: NavBarLatProps) {

    const location = useLocation();
    const ariane = location.pathname

        return (
            
            <aside className={className}>
                <img src={croix} alt="Close" className='close' onClick={toggle}/>
                <div className='navBarLat__logo'>
                    <img src={img} alt={firstName + " " + lastName} />
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                </div>
                <div className='navBarLat__menu'>
                    <ul>
                        <Link to={"/"}><li><FontAwesomeIcon icon={faHome} />Home</li></Link>
                        <Link to={"/dashboard"}><li className={(ariane === "/dashboard")? "isActive" : ""}><img src={Icon_dashboard} alt="Dashboard" /> Dashboard</li></Link>
                        <Link to={"/dashboard/invoices"}><li className={(ariane === "/dashboard/invoices")? "isActive" : ""}><img src={Icon_Invoices} alt="Invoices" /> Invoices</li></Link>
                        <Link to={"/dashboard/companies"}><li className={(ariane === "/dashboard/companies")? "isActive" : ""}><img src={Icon_Companies} alt="Companies" /> Companies</li></Link>
                        <Link to={"/dashboard/contact"}><li className={(ariane === "/dashboard/contact")? "isActive" : ""}><img src={Icon_contact} alt="Contact" /> Contact</li></Link>
                    </ul>
                </div>
                <div className='navBarLat__logout'>
                    <img src={img} alt={firstName + " " + lastName} />
                    <Link to={"/logout"}>Logout</Link>
                </div>
            </aside>
        );
}

export default NavBarLat;