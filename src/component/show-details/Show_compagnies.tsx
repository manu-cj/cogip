import Footer from "../main/Footer";
import Header from "../pages/components/Header";

function Show_compagnies() {

  // const { id } = useParams();
  // const { companies } = useApi(); // rajouter l'url de l'api


  return (
    <>
      <Header/>
      <main className="show-companies">
        <div className="show-companies__infos">
            {/* <h2>{companies.name</h2> */}
            <h2>Becode</h2>
            <div className="show-companies__details">
              {/* <p>companies: <span>{companies.name}</span></p> */}
              {/* <p>Phone: <span>{companies.tva}</span></p> */}
              {/* <p>Mail: <span>{companies.country}</span></p> */}
              {/* <p>Company: <span>{companies.type}</span></  p> */}
              <p>Contact: <span>Dylan Feys</span></p> 
              <p>Phone: <span>0476/588358</span></p>
              <p>Mail: <span>feys.dylan.dev@gmail.com</span></  p> 
              <p>Company: <span>BeCode</span></p>
            </div>
          </div>
          <hr />
          <div className="show-companies__contact">
            <h2>Contact people</h2>
            <div className="show-companies__contacts">
              <img src="./../../../public/assets/img/home/handwithnote.svg" alt="petite img" className="hand"/>
              {/* {companies.contact.map((contact) => (
                <div key={contact.name} className="show-companies__contact-card">
                  <img src={contact.img} alt={contact.name} />
                  <p>{contact.firstName + " " + contact.lastName}</p>
                </div>
              ))} */}
              <div className="show-companies__contact-card">
                <img src="./../../../public/assets/img/unbgcommeunautre.jpg" alt="Dylan Feys" />
                <p>Dylan Feys</p>
              </div>
              <div className="show-companies__contact-card">
                <img src="./../../../public/assets/img/unbgcommeunautre.jpg" alt="Dylan Feys" />
                <p>Dylan Feys</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="show-companies__invoice">
            <h2>Last invoices</h2>
            <div>

              <table className="show-companies__invoices">
                  <thead>
                    <tr>
                      <th>Invoice number</th>
                      <th>Dates</th>
                      <th>Company</th>
                      <th>Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {companies.invoices.map((invoice) => (
                      <tr key={invoice.number}>
                        <td>{invoice.number}</td>
                        <td>{invoice.date}</td>
                        <td>{invoice.company}</td>
                        <td>{invoice.createdAt}</td>
                      </tr>
                    ))} */}
                    <tr>
                      <td>1</td>
                      <td>01/01/2022</td>
                      <td>Becode</td>
                      <td>01/01/2022</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>01/01/2022</td>
                      <td>Becode</td>
                      <td>01/01/2022</td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
      </main>
      <Footer/>
    </>
  );
}

export default Show_compagnies;
