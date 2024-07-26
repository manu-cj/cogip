import Header from './header/HeaderDashboard';
import NavBarLat from './navigation/NavBarLat';
import Stat from './dashboard/Stat';
import LastContact from './dashboard/LastContact';
import LastCompanies from './dashboard/LastCompanies';
import LastInvoice from './dashboard/LastInvoice';
import Hamburger from './navigation/Hamburger';
import ModalImg from './dashboard/ModalImg';
import { useState, useEffect } from 'react';
import { getCookie } from '../../service/getCookies';
import useAPI from '../../hook/useAPI';

function DashBoard() {
    const [isOpen, setIsOpen] = useState(true);
    const [isModal, setIsModal] = useState(false);
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

    const handleChangeImg = () => {
        setIsModal(!isModal);
        
    }

    const handleImageUploadSuccess = async () => {
            try {
              const response = await fetch(`http://localhost:3000/api/users/${getCookie('id')}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
              });
        
              const result = await response.json();
              console.log(result);
              setImgUsers(result.image.filename);
              console.log(imgUsers);
             
            } catch (error) {
              console.error(error);
            }
        setIsModal(false);
    }

    return (
        <div className='dashBoard'>
            <ModalImg 
                className={`modalImg ${isModal ? 'modalvisible' : 'modalhidden'}`} 
                toggleImg={handleChangeImg} 
                userId={getCookie("id")}
                onSuccess={handleImageUploadSuccess} 
            />
            <Hamburger 
                className={`hamburger ${isOpen ? '' : 'hidden'}`} 
                toggle={handleClick} 
            />
            <NavBarLat 
                img={imgUsers} 
                firstName={getCookie("firstName")} 
                lastName={getCookie("lastName")} 
                className={`navBarLat ${isOpen ? 'hidden' : 'visible'}`} 
                toggle={handleClick} 
                changeImg={handleChangeImg} 
            />
            <div className='dashBoard__content'>
                <Header firstName={getCookie("firstName")} />
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
