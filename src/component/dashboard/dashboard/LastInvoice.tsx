
import useAPI from "./../../../hook/useAPI";


function LastInvoice () {
 // Ajouter l'API
 const { invoiceLatest } = useAPI(`/api/invoices/latest`);

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
                    {invoiceLatest.slice(0,4).map((invoice) => (
                        <tr key={invoice._id}>
                            <td>{invoice.reference}</td>
                            <td>{invoice.dueDate.slice(0,10)}</td>
                            <td>{invoice.companyId?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LastInvoice;