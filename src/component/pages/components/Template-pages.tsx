import Footer from "./../../main/Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useAPI from "../../../hook/useAPI";
import { Contact, Contacts } from "../../../types/contactsType";

function TemplatePages() {
  const location = useLocation();
  const ariane = location.pathname;
  const newPath: string = ariane.replace("/", "");
  let placeHolder: string = "";
  const {contacts, loading } = useAPI("http://localhost:3000/api/contacts")

  console.log(contacts);
  if (loading) return <p>Loading...</p>;

  const definePlaceHolder = () => {
    switch (newPath) {
      case "companies":
        placeHolder = "Search companie";
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

  const tableData = (newPath: string, contacts: Contact[]): JSX.Element => {
    switch (newPath) {
      case "companies":
        return (
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
              <tr>
                <td>Raviga</td>
                <td>US456 654 321</td>
                <td>United States</td>
                <td>Supplier</td>
                <td>25/09/2020</td>
              </tr>
            </tbody>
          </table>
        );
        case "contacts":
          return Array.isArray(contacts) ? (
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
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.phoneNr}</td>
                    <td>{contact.email}</td>
                    <td>{contact.companyId?.name}</td>
                    <td>{contact.createdAt}</td>
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
                <th>Dates due</th>
                <th>Company</th>
                <th>Created at</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>F20220915-001</td>
                <td>15/09/2022</td>
                <td>Jouet Jean-Michel</td>
                <td>25/09/2020</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return <h2>Oops, an error has occurred</h2>;
    }
  };

  return (
    <>
      <Header />
      <main>
        <h2> {newPath} </h2>
        <section className="searchBar-section">
          <input
            type="search"
            name={newPath}
            id={newPath}
            placeholder={placeHolder}
          />
        </section>
        <section className="main-content">{tableData(newPath, contacts)}</section>
        <section className="pagination">
          <a href=""><FontAwesomeIcon icon={faChevronLeft} /></a>
          <a href="">1</a>
          <a href="">2</a>
          <a href="">...</a>
          <a href="">9</a>
          <a href="">10</a>
          <a href=""><FontAwesomeIcon icon={faChevronRight} /></a>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TemplatePages;
