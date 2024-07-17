import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./component/dashboard/DashBoard";
import NavBar from "./component/main/navigation/NavBar";
import Footer from "./component/main/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas);
library.add(fab);


function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />}></Route>
      </Routes>
      <header>
        <NavBar />
        <div className="top-content">
          <h2>MANAGE YOUR CUSTOMERS AND INVOICES EASLY</h2>
          <img
            src="./../public/assets/img/home/DrawKit Vector Illustration Project Manager (4) 1.svg"
            alt="DrawKit Vector Illustration Project Manager"
          />
        </div>
        <div className="bottom-content">
          <img
            src="./../public/assets/img/home/Rectangle 10.svg"
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
              <tr>
                <td>Peter Gregory</td>
                <td>555-4567</td>
                <td>peter.gregory@raviga.com</td>
                <td>Raviga</td>
                <td>25/09/2020</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="main-content">
          <h2>Last compagnies</h2>
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
        </section>
        <div className="bottom-content">
          <div className="slogan">
            <h2>WORK BETTER </h2>
            <h2>IN YOUR COMPANY</h2>
          </div>
          <div className="bottom-content-picture-div">
            <img
              src="./../public/assets/img/home/Rectangle 17.svg"
              alt="Rectangle 17"
              className="picture1"
            />
            <img
              src="./../public/assets/img/home/DrawKit Vector Illustration Project Manager (19) 1.svg"
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
