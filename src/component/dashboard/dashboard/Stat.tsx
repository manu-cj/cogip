import useAPI from "../../../hook/useAPI";

function Stat() {
    const { stats } = useAPI("http://localhost:3000/api/stats");

    return (
        <div className='statistics'>
            <h3>Statistics</h3>
            <div className='statistics__bulle__container'>
                <p className='statistics__bulle--invoice'><span>{stats.totalInvoices}</span> Invoice{stats.totalInvoices > 1 ? 's' : ''}</p>
                <p className='statistics__bulle--contact'><span>{stats.totalContacts}</span> Contact{stats.totalContacts > 1 ? 's' : ''}</p>
                <p className='statistics__bulle--companie'><span>{stats.totalCompanies}</span> Companie{stats.totalCompanies > 1 ? 's' : ''}</p>
            </div>
        </div>
    );
}

export default Stat;