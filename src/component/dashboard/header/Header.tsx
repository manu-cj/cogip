import img_dashboard from '../../../../public/assets/img/img_dashboard.svg';
import { useLocation } from 'react-router-dom';

function Header({firstName}: {firstName: string}) {
    const location = useLocation()
    const ariane = location.pathname

    return (
        <div>
            <div>
            <h1>DashBoard</h1>
            <p>{ariane}</p>
            </div>
            <div>
                <div>
                    <h2>Welcome back {firstName}!</h2>
                    <p>You can here add an invoice, a company and some contacts.</p>
                </div>
                <img src={img_dashboard} alt="Un bg qui bosse sur un pc" />
            </div>
        </div>
    );
}

export default Header;