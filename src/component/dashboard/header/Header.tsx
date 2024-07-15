import img_dashboard from '../../../../public/assets/img/img_dashboard.svg';
import { useLocation } from 'react-router-dom';

function Header({firstName}: {firstName: string}) {
    const location = useLocation()
    const ariane = location.pathname

    return (
        <header className='dashboard-header'>
            <div className='header__title'>
                <h1>DashBoard</h1>
                <p>{ariane}</p>
            </div>
            <div className='header__content'>
                <h2>Welcome back {firstName}!</h2>
                <p>You can here add an invoice, a company and some contacts.</p>
            </div>
            <img src={img_dashboard} alt="Un bg qui bosse sur un pc" />
        </header>
    );
}

export default Header;