import Footer from "./../../main/Footer";
import Header from "./Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useAPI from "../../../hook/useAPI";
import React, { useState, useEffect } from "react";
import tri from "../../../../public/assets/icon/tri.svg"


function TemplatePages() {
  const location = useLocation();
  const navigate = useNavigate();
  const ariane = location.pathname;
  const newPath: string = ariane.replace("/", "");
  let placeHolder: string = "";
  const pathSegments = ariane.split("/");
  const nbrContactFromURL = parseInt(pathSegments[2], 10) || 10;
  const pageFromURL = parseInt(pathSegments[3], 10) || 1;

  const [nbrContact, setNbrContact] = useState(nbrContactFromURL);
  const [page, setPage] = useState(pageFromURL);

  const [URLContacts, setURLContacts]= useState(`http://localhost:3000/api/contacts/pagination/${nbrContact}/${page}`)
  const [isSortedContactsName, setIsSortedContactsName] = useState(false)
  const [isSortedContactsDate, setIsSortedContactsDate] = useState(false)
  const { contacts, loading, nbrPageContact } = useAPI(URLContacts);

  const [URLInvoices, setURLInvoices] = useState(`http://localhost:3000/api/invoices/pagination/${nbrContact}/${page}`)
  const [isSortedInvoices, setIsSortedInvoices] = useState(false)
  const { invoices, nbrPageInvoice } = useAPI(URLInvoices);

  const [URLCompanies, setURLCompanies] = useState(`http://localhost:3000/api/companies/pagination/${nbrContact}/${page}`)
  const [isSortedCompaniesName, setIsSortedCompaniesName] = useState(false)
  const [isSortedCompaniesDate, setIsSortedCompaniesDate] = useState(false)
  const { companies, nbrPageCompanies } = useAPI(URLCompanies);


  const definePath = () => {
    if (newPath.includes("contacts")) {
      return "contacts";
    } else if (newPath.includes("companies")) {
      return "companies";
    } else if (newPath.includes("invoices")) {
      return "invoices";
    } else {
      throw new Error("Invalid URL format");
    }
  }
  useEffect(() => {
    setNbrContact(parseInt(pathSegments[2], 10) || 10)
    setURLContacts(`http://localhost:3000/api/contacts/pagination/${nbrContact}/${page}`)
    setURLCompanies(`http://localhost:3000/api/companies/pagination/${nbrContact}/${page}`)
    setURLInvoices(`http://localhost:3000/api/invoices/pagination/${nbrContact}/${page}`)
    navigate(`/${definePath()}/${nbrContact}/${page}`);
  }, [page, nbrContact, navigate]);
  
  if (loading) return <p>Loading...</p>;
  const definePlaceHolder = () => {
    const path = definePath();
    switch (path) {
      case "companies":
        placeHolder = "Search company";
        break;
      case "contacts":
        placeHolder = "Search contact";
        break;
      case "invoices":
        placeHolder = "Search invoice";
        break;
    }
  };
  definePlaceHolder();
  const defineTitre = () => {
    const path = definePath();
    switch (path) {
      case "companies":
        return "Companies";
      case "contacts":
        return "Contacts";
      case "invoices":
        return "Invoices";
    }
  };

  const handleSortInvoices = () => {
    setURLInvoices(`http://localhost:3000/api/invoices/pagination/${nbrContact}/${page}/?order=DESC`)
    setIsSortedInvoices(!isSortedInvoices)
    if(isSortedInvoices) setURLInvoices(`http://localhost:3000/api/invoices/pagination/${nbrContact}/${page}/?order=ASC`)
  }

  const handleSortContactsName = () => {
    setURLContacts(`http://localhost:3000/api/contacts/pagination/${nbrContact}/${page}/?order=DESC&sortColumn=name`)
    setIsSortedContactsName(!isSortedContactsName)
    if(isSortedContactsName) setURLContacts(`http://localhost:3000/api/contacts/pagination/${nbrContact}/${page}/?order=ASC&sortColumn=name`)
  }

  const handleSortContactsDate = () => {
    setURLContacts(`http://localhost:3000/api/contacts/pagination/${nbrContact}/${page}/?order=DESC&sortColumn=createdAt`)
    setIsSortedContactsDate(!isSortedContactsDate)
    if(isSortedContactsDate) setURLContacts(`http://localhost:3000/api/contacts/pagination/${nbrContact}/${page}/?order=ASC&sortColumn=createdAt`)
  }

  const handleSortCompaniesName = () => {
    setURLCompanies(`http://localhost:3000/api/companies/pagination/${nbrContact}/${page}/?order=DESC&sortColumn=name`)
    setIsSortedCompaniesName(!isSortedCompaniesName)
    if(isSortedCompaniesName) setURLCompanies(`http://localhost:3000/api/companies/pagination/${nbrContact}/${page}/?order=ASC&sortColumn=name`)
  }

  const handleSortCompaniesDate = () => {
    setURLCompanies(`http://localhost:3000/api/companies/pagination/${nbrContact}/${page}/?order=DESC&sortColumn=createdAt`)
    setIsSortedCompaniesDate(!isSortedCompaniesDate)
    if(isSortedCompaniesDate) setURLCompanies(`http://localhost:3000/api/companies/pagination/${nbrContact}/${page}/?order=ASC&sortColumn=createdAt`)
  }



  const tableData = (path: string): JSX.Element => {
    path = definePath();
    switch (path) {
      case "companies":
        return (
          <table>
            <thead>
              <tr>
              <th onClick={handleSortCompaniesName} className="withArrow">Name<img src={tri} alt="sorted" className={isSortedCompaniesName? 'sorted' : ''}/></th>
                <th>TVA</th>
                <th>Country</th>
                <th>Type</th>
                <th onClick={handleSortCompaniesDate} className="withArrow">Created At <img src={tri} alt="sorted" className={isSortedCompaniesDate? 'sorted' : ''}/></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td><Link to={`/show_companies/${company._id}`}>{company.name}</Link></td>
                  <td><Link to={`/show_companies/${company._id}`}>{company.vat}</Link></td>
                  <td>{company.country}</td>
                  <td>{company.typeId?.name}</td>
                  <td>{company.createdAt.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "contacts":
        return Array.isArray(contacts) ? (
          <table>
            <thead>
              <tr>
              <th onClick={handleSortContactsName} className="withArrow">Name<img src={tri} alt="sorted" className={isSortedContactsName? 'sorted' : ''}/></th>
                <th>Phone</th>
                <th>Mail</th>
                <th>Company</th>
                <th onClick={handleSortContactsDate} className="withArrow">Created At <img src={tri} alt="sorted" className={isSortedContactsDate? 'sorted' : ''}/></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td><Link to={`/show_contact/${contact._id}`} key={contact._id}>{contact.name}</Link></td>
                  <td>{contact.phoneNr}</td>
                  <td>{contact.email}</td>
                  <td><Link to={`/show_companies/${contact.companyId?._id}`} key={contact.companyId?._id}>{contact.companyId?.name}</Link></td>
                  <td>{contact.createdAt.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No contacts available</p>
        );
      case "invoices":
        return (
          <table>
            <thead>
              <tr>
                <th>Invoice number</th>
                <th onClick={handleSortInvoices} className="withArrow">Dates due <img src={tri} alt="sorted" className={isSortedInvoices? 'sorted' : ''}/></th>
                <th>Company</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td>{invoice.reference}</td>
                  <td>{invoice.dueDate.slice(0,10)}</td>
                  <td>{invoice.companyId?.name}</td>
                  <td>{invoice.createdAt.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return <h2>Oops, an error has occurred</h2>;
    }
  };
  const handleNextPage = (event: React.MouseEvent) => {
    if (page < defineNbrPage()) {
      event.preventDefault();
      const nextPage = page + 1;
      setPage(nextPage);
    }
  }
  const handlePreviousPage = (event :React.MouseEvent ) => {
    event.preventDefault();
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const textContent = event.currentTarget.textContent;
    if (textContent !== null) {
        const pageNumber = parseInt(textContent, 10);
        if (pageNumber >= 1 && pageNumber <= defineNbrPage()) {
            setPage(pageNumber);
        }
    }
};


  const defineNbrPage = () => {
    const path = definePath();
    switch (path) {
      case "companies":
        return nbrPageCompanies;
      case "contacts":
        return nbrPageContact;
      case "invoices":
        return nbrPageInvoice;
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const path = definePath()
    switch (path) {
      case "companies":
        setURLCompanies(`http://localhost:3000/api/companies/pagination/${nbrContact}/${page}/?filter=${e.target.value}`)
        break;
      case "contacts":
        setURLContacts(`http://localhost:3000/api/contacts/pagination/${nbrContact}/${page}/?filter=${e.target.value}`)
        break;
      case "invoices":
        setURLInvoices(`http://localhost:3000/api/invoices/pagination/${nbrContact}/${page}/?filter=${e.target.value}`)
        break;
    }
  }

  return (
    <>
      <Header />
      <main>
        <h2 className="main__title"> All {defineTitre()}</h2>
        <section className="searchBar-section">
          <input
            type="search"
            name={newPath}
            id={newPath}
            placeholder={placeHolder}
            onChange={handleChange}
          />
        </section>
        <section className="main-content">{tableData(newPath)}</section>
        <section className="pagination">
          <button onClick={handlePreviousPage} className="btnPagination"><FontAwesomeIcon icon={faChevronLeft} /></button>
          <span onClick={handleClick} className={`btnPagination ${page === 1 ? "hide" : ""}`}>{page === 1 ? "" : page-1}</span>
          <span onClick={handleClick} className="btnPagination pageActive">{page}</span>
          <span onClick={handleClick} className={`btnPagination ${page === defineNbrPage() ? "hide" : ""}`}>{page>(defineNbrPage())-1 ? "" : page+1}</span>
          <button onClick={handleNextPage} className="btnPagination"><FontAwesomeIcon icon={faChevronRight} /></button>
        </section>
      </main>
      <Footer />      
    </>
  );
}
export default TemplatePages;