import Header from "./../pages/components/Header";
import Footer from "./../main/Footer";

function Show_contact() {

  // const { id } = useParams()
  // const { contact } = useApi() // rajouter l'url de l'api


  return (
    <>
      <Header />
      <main className="show-contact">
        <div className="show-contact__infos">
          {/* <h2>{contact.firstName + " " + contact.lastName}</h2> */}
          <h2>Dylan Feys</h2>
          <div className="show-contact__details">
            {/* <p>Contact: <span>{contact.firstName + " " + contact.lastName}</span></p> */}
            {/* <p>Phone: <span>{contact.phone}</span></p> */}
            {/* <p>Mail: <span>{contact.mail}</span></p> */}
            {/* <p>Company: <span>{contact.company}</span></p> */}
            <p>Contact: <span>Dylan Feys</span></p> 
            <p>Phone: <span>0476/588358</span></p>
            <p>Mail: <span>feys.dylan.dev@gmail.com</span></p> 
            <p>Company: <span>BeCode</span></p>
          </div>
        </div>
          {/* <img src={contact.img} alt={contact.lastName}/> */}
        <img src="./../../../public/assets/img/unbgcommeunautre.jpg" alt="Dylan Feys" className="show-contact__img"/>
      </main>
      <Footer/>
    </>
  );
}

export default Show_contact;
