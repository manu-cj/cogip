import { LastContactProps } from '../../../types/types';

function LastContact({contact}: LastContactProps) {
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
                    {contact.slice(0,4).map((contact) => (
                        <tr key={contact.name + contact.phone}>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LastContact;