import "./css/App.css";
import NavBar from "./component/main/navigation/NavBar";
import Footer from "./component/main/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';
import useAPI from "./hook/useAPI";

import {Link} from "react-router-dom";


library.add(fas);
library.add(fab);


function App() {

  const { contactLatest } = useAPI(`http://localhost:3000/api/contacts/latest`);
  const { invoiceLatest } = useAPI(`http://localhost:3000/api/invoices/latest`);
  const { companiesLatest } = useAPI(`http://localhost:3000/api/companies/latest`);

  return (
    <>
      <header>
        <NavBar />
        <div className="top-content">
          <h2>MANAGE YOUR CUSTOMERS AND INVOICES EASLY</h2>
          <img
            src="./assets/img/home/DrawKit Vector Illustration Project Manager (4) 1.svg"
            alt="DrawKit Vector Illustration Project Manager"
          />
        </div>
        <div className="bottom-content">
          <img
            src="./assets/img/home/Rectangle 10.svg"
            alt="Rectangle 10.svg"
          />
        </div>
      </header>
      <main>
        <section className="main-content">
          <h2>Last invoices</h2>
          <table>
            <thead>
              <tr>
                <th>Invoice number</th>
                <th>Dates due</th>
                <th>Company</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {invoiceLatest.map((invoice) => (
                <tr key={invoice._id}>
                  <td>{invoice.reference}</td>
                  <td>{invoice.dueDate.slice(0,10)}</td>
                  <td><Link to={`/show_companies/${invoice.companyId?._id}`}>{invoice.companyId?.name}</Link></td>
                  <td>{invoice.createdAt.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <img src="./assets/img/home/DrawKit Vector Illustration Project Manager (16) 1.svg" alt="DrawKit Vector Illustration Project Manager" className="invoice-img" />
        </section>
        <section className="main-content">
          <h2>Last contacts</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Mail</th>
                <th>Company</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {contactLatest.map((contact) => (
                <tr key={contact._id}>
                  <td><Link to={`/show_contact/${contact._id}`}>{contact.name}</Link></td>
                  <td>{contact.phoneNr}</td>
                  <td>{contact.email}</td>
                  <td><Link to={`/show_companies/${contact.companyId?._id}`}>{contact.companyId?.name}</Link></td>
                  <td>{contact.createdAt.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <img src="./assets/img/home/DrawKit Vector Illustration Project Manager (15) 1.svg" alt="DrawKit Vector Illustration Project Manager" className="contact-img" />
        </section>
        <section className="main-content">
          <h2>Last companies</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>TVA</th>
                <th>Country</th>
                <th>Type</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {companiesLatest.map((company) => (
                <tr key={company._id}>
                  <td><Link to={`/show_companies/${company._id}`}>{company.name}</Link></td>
                  <td>{company.vat}</td>
                  <td>{company.country}</td>
                  <td>{company.typeId?.name}</td>
                  <td>{company.createdAt.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="bottom-content">
          <div className="slogan">
            <h2>WORK BETTER </h2>
            <h2>IN YOUR COMPANY</h2>
          </div>
          <div className="bottom-content-picture-div">
            <img
              src="./assets/img/home/Rectangle 17.svg"
              alt="Rectangle 17"
              className="picture1"
            />
            <img
              src="./assets/img/home/DrawKit Vector Illustration Project Manager (19) 1.svg"
              alt="DrawKit Vector Illustration Project Manager"
              className="picture2"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
