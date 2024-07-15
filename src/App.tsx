import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./component/dashboard/DashBoard";
import NavBar from "./component/main/navigation/NavBar";
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
          <img src="./../public/assets/img/home/DrawKit Vector Illustration Project Manager (4) 1.svg" alt="DrawKit Vector Illustration Project Manager" />
        </div>
        <div className="bottom-content">
        <img src="./../public/assets/img/home/Rectangle 10.svg" alt="" />
        </div>
      </header>
      <main>
        <section className="home-content">
          <h2>Last invoices</h2>
        </section>
        <section className="home-content">
              <h2>Last contacts</h2>
        </section>
        <section className="home-content">
              <h2>Last compagnies</h2>
        </section>
      </main>
    </>
  );
}

export default App;
