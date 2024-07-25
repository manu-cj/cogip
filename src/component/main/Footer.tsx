import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faFax,
  faRss,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Hamburger from "../dashboard/navigation/Hamburger";
import croix from '../../../public/assets/icon/croix.svg';


const Footer = () => {
  const [isOpenBot, setIsOpenBot] = useState(true);


  const handleClickBottom = () =>{
    setIsOpenBot(!isOpenBot);
  }

  return (
    <>
      <footer>
        <section className="footer-content">
          <div className="title-footer">
          <h2>Cogip</h2>
          </div>
          <section className="about-section">
            <div className="about">
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Square des Martyrs, 6000 Charleroi
              </p>
              <p>
                <FontAwesomeIcon icon={faPhoneAlt} /> (123) 456-7890
              </p>
              <p>
                <FontAwesomeIcon icon={faFax} />
                (123) 456-7890
              </p>
            </div>
            <div className="social-links">
              <a href="">
                <FontAwesomeIcon icon={["fab", "facebook-square"]}  className="social-icons" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "x-twitter"]}  className="social-icons" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "linkedin-in"]}  className="social-icons" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "youtube"]}  className="social-icons" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "instagram"]}  className="social-icons" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "google-plus"]}  className="social-icons" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "pinterest"]} className="social-icons" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={faRss} className="social-icons" />
              </a>
            </div>
          </section>
        </section>
        <section className="footer-bottom">
          <nav>
            <ul className={isOpenBot ? 'hidden':'visible'}>
              <Link to={"/"}>
                <li>HOME</li>
              </Link>
              <Link to={"/invoices"}>
                <li>INVOICES</li>
              </Link>
              <Link to={"/companies"}>
                <li>COMPANIES</li>
              </Link>
              <Link to={"/contacts"}>
                <li>CONTACT</li>
              </Link>
              <Link to={"/privacy-policy"}>
                <li>PRIVACY POLICY</li>
              </Link>
            </ul>
            <img src={croix} alt="Close" className={`close ${isOpenBot ? 'hidden': ''}`} onClick={handleClickBottom} />
          </nav>
          <div className="copyright">
            <p>Copyright © 2024 • COGIP Inc.</p>
          </div>
          <Hamburger className={`hamburger hamburgerBottom ${isOpenBot? '':'hidden'}`} toggle={handleClickBottom} /> 
          </section>
      </footer>
    </>
  );
};

export default Footer;
