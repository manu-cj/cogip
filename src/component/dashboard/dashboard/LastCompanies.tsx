import useAPI from "./../../../hook/useAPI";

function LastCompanies() {
    const { companiesLatest } = useAPI(`/api/companies/latest`);

    return (
        <div className='lastCompanies'>
            <h3>Last companies</h3>
            <hr />
            <table className='lastCompanies__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>TVA</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {companiesLatest.slice(0,4).map((companies) => (
                        <tr key={companies._id}>
                            <td>{companies.name}</td>
                            <td>{companies.vat}</td>
                            <td>{companies.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LastCompanies;