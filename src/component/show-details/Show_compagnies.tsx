import Footer from "../main/Footer";
import Header from "../pages/components/Header";
import { Link, useParams } from "react-router-dom";
import useAPI from "../../hook/useAPI";
import { useEffect, useRef } from 'react';

function Show_compagnies() {

  const { id } = useParams();
  const { company } = useAPI(`http://localhost:3000/api/companies/${id}`);
  const { contactCompany} = useAPI(`http://localhost:3000/api/contacts/company/${id}`);
  const { invoiceCompany } = useAPI(`http://localhost:3000/api/invoices/company/${id}`);

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
              <p>Phone: <span>{company.vat}</span></p>
              <p>Mail: <span>{company.country}</span></p>
              <p>Type: <span>{company.type}</span></p>
            </div>
          </div>
          <hr />
          <div className="show-companies__contact">
            <h2>Contact people</h2>
            <div className="show-companies__contacts" ref={scrollContainerRef}>
              <img src="./../../../public/assets/img/home/handwithnote.svg" alt="petite img" className="hand"/>
              {contactCompany.map((contact) => (
                <div key={contact._id} className="show-companies__contact-card">
                  <Link to={`/show_contact/${contact._id}`} key={contact._id}><img src={contact.image.path} alt={contact.name} /></Link>
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
                        <td>{invoice.createdAt}</td>
                        <td>{invoice.companyId?.name}</td>
                        <td>{invoice.createdAt}</td>
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
