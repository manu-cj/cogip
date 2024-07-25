import Header from "./../pages/components/Header";
import Footer from "./../main/Footer";
import { Link, useParams } from "react-router-dom";
import useAPI from "../../hook/useAPI";

function Show_contact() {

  const { id } = useParams()
  const { contact, error, loading } = useAPI(`https://cogip-plum.vercel.app/api/contacts/${id}`)


  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>

  

  return (
    <>
      <Header />
      <main className="show-contact">
        <div className="show-contact__infos">
          <h2>{contact.name}</h2>
          <div className="show-contact__details">
            <p>Contact: <span>{contact.name}</span></p>
            <p>Phone: <span>{contact.phoneNr}</span></p>
            <p>Mail: <span>{contact.email}</span></p>
            <p>Company: <span><Link to={`/show_companies/${contact.companyId._id}`}>{contact.companyId.name}</Link></span></p>
          </div>
        </div>
          <img src={`./assets/img/people/${contact.image.filename}`} alt={contact.name}/>
      </main>
      <Footer/>
    </>
  );
}

export default Show_contact;
