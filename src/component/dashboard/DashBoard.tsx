import React from 'react';
import Header from './header/Header';
import NavBarLat from './navigation/NavBarLat';
import Stat from './dashboard/Stat';
import LastContact from './dashboard/LastContact';
import LastCompanies from './dashboard/LastCompanies';
import LastInvoice from './dashboard/LastInvoice';

function DashBoard() {
    return (
        <div className='dashBoard'>
            <NavBarLat img="./../../../public/assets/img/unbgcommeunautre.jpg" firstName="Dylan"  lastName="Feys"/>
            <div className='dashBoard__content'>
                <Header firstName="Dylan"/>
                <div className='dashBoard__content__body'>
                    <Stat />
                    <LastInvoice invoice={[]}/>
                    <LastContact contact={[]}/>
                    <LastCompanies companies={[]}/>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;