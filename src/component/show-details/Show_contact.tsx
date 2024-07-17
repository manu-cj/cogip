import Header from "./../pages/components/Header";
import Footer from "./../main/Footer";
import { useParams } from "react-router-dom";
import useAPI from "../../hook/useAPI";

function Show_contact() {

  const { id } = useParams()
  const { contacts, error, loading } = useAPI(`http://localhost:3000/api/contacts/${id}`)


  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>

  

  return (
    <>
      <Header />
      <main className="show-contact">
        <div className="show-contact__infos">
          <h2>{contacts.name}</h2>
          <div className="show-contact__details">
            <p>Contact: <span>{contacts.name}</span></p>
            <p>Phone: <span>{contacts.phoneNr}</span></p>
            <p>Mail: <span>{contacts.email}</span></p>
            <p>Company: <span>{contacts.companyId.name}</span></p>
          </div>
        </div>
          <img src={contacts.image.path} alt={contacts.name}/>
      </main>
      <Footer/>
    </>
  );
}

export default Show_contact;
