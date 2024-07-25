import useAPI from "./../../../hook/useAPI";


function LastContact() {
    const { contactLatest } = useAPI(`https://cogip-e9omy844n-manu-cjs-projects.vercel.app/api/contacts/latest`);

    return (
        <div className='lastContact'>
            <h3>Last contact</h3>
            <hr />
            <table className='lastContact__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {contactLatest.slice(0,4).map((contact) => (
                        <tr key={contact._id}>
                            <td>{contact.name}</td>
                            <td>{contact.phoneNr}</td>
                            <td>{contact.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LastContact;