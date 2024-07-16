

function Stat() {

    

    return (
        <div className='statistics'>
            <h3>Statistics</h3>
            <div className='statistics__bulle__container'>
                {/* Ajouter les statistiques lorsqu'on aura l'API */}
                <p className='statistics__bulle--invoice'>Invoices</p>
                <p className='statistics__bulle--contact'>Contacts</p>
                <p className='statistics__bulle--companie'>Companies</p>
            </div>
        </div>
    );
}

export default Stat;