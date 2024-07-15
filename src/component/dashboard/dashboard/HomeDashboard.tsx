import Stat from './Stat';
import LastInvoice from './LastInvoice';
import LastContact from './LastContact';
import LastCompanies from './LastCompanies';

function HomeDashboard() {
    return (
        <div>
            <Stat />
            <LastInvoice invoice={[]}/>
            <LastContact contact={[]}/>
            <LastCompanies companies={[]}/>
        </div>
    );
}

export default HomeDashboard;