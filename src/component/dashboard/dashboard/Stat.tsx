

function Stat() {

    

    return (
        <div>
            <h3>Statistics</h3>
            <div>
                {/* Ajouter les statistiques lorsqu'on aura l'API */}
                <p className='statistics__bulle statistics__bulle--invoice'>Invoices</p>
                <p className='statistics__bulle statistics__bulle--contact'>Contacts</p>
                <p className='statistics__bulle statistics__bulle--companie'>Companies</p>
            </div>
        </div>
    );
}

export default Stat;