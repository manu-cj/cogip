import { LastInvoiceProps } from '../../../types/types';

function LastInvoice ({invoice}: LastInvoiceProps) {
 // Ajouter l'API
    return (
        <div className='lastInvoice'>
            <h3>Last invoices</h3>
            <hr />
            <table className='lastInvoice__table'>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Dates</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.slice(0,4).map((invoice) => (
                        <tr key={invoice.number}>
                            <td>{invoice.number}</td>
                            <td>{invoice.date}</td>
                            <td>{invoice.company}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LastInvoice;