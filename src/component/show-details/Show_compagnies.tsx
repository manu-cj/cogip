import Footer from "../main/Footer";
import Header from "../pages/components/Header";
import { Link, useParams } from "react-router-dom";
import useAPI from "../../hook/useAPI";
import { useEffect, useRef } from 'react';

function Show_compagnies() {

  const { id } = useParams();
  const { company } = useAPI(`https://cogip-h7w7n35kc-manu-cjs-projects.vercel.app/api/companies/${id}`);
  const { contactCompany} = useAPI(`https://cogip-h7w7n35kc-manu-cjs-projects.vercel.app/api/contacts/company/${id}`);
  const { invoiceCompany } = useAPI(`https://cogip-h7w7n35kc-manu-cjs-projects.vercel.app/api/invoices/company/${id}`);

  const scrollContainerRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (scrollContainer && event.deltaY !== 0) {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);


  return (
    <>
      <Header/>
      <main className="show-companies">
        <div className="show-companies__infos">
            <h2>{company.name}</h2>
            <div className="show-companies__details">
              <p>Company: <span>{company.name}</span></p>
              <p>TVA: <span>{company.vat}</span></p>
              <p>Country: <span>{company.country}</span></p>
              <p>Type: <span>{company.typeId?.name}</span></p>
            </div>
          </div>
          <hr />
          <div className="show-companies__contact">
            <h2>Contact people</h2>
            <div className="show-companies__contacts" ref={scrollContainerRef}>
              <img src="./assets/img/home/handwithnote.svg" alt="petite img" className="hand"/>
              {contactCompany.map((contact) => (
                <div key={contact._id} className="show-companies__contact-card">
                  <Link to={`/show_contact/${contact._id}`} key={contact._id}><img src={`./assets/img/people/${contact.image.filename}`} alt={contact.name} /></Link>
                  <p><Link to={`/show_contact/${contact._id}`} key={contact._id}>{contact.name}</Link></p>
                </div>
              ))}
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
                    {invoiceCompany.map((invoice) => (
                      <tr key={invoice._id}>
                        <td>{invoice.reference}</td>
                        <td>{invoice.createdAt.slice(0,10)}</td>
                        <td>{invoice.companyId?.name}</td>
                        <td>{invoice.createdAt.slice(0,10)}</td>
                      </tr>
                    ))}
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
