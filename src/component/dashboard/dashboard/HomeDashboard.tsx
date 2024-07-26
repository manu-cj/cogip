import Stat from './Stat';
import LastInvoice from './LastInvoice';
import LastContact from './LastContact';
import LastCompanies from './LastCompanies';



function HomeDashboard() {
    return (
        <div>
            <Stat />
            <LastInvoice/>
            <LastContact/>
            <LastCompanies/>
        </div>
    );
}

export default HomeDashboard;