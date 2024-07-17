import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faFax,
  faRss,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
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
                <span>
                  <FontAwesomeIcon icon={faPhoneAlt} /> (123) 456-7890
                </span>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faFax} />
                  (123) 456-7890
                </span>
              </p>
            </div>
            <div className="social-links">
              <p>Social Media</p>
              <a href="">
                <FontAwesomeIcon icon={["fab", "facebook-square"]} size="2x" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "x-twitter"]} size="2x" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "linkedin-in"]} size="2x" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "youtube"]} size="2x" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "google-plus"]} size="2x" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={["fab", "pinterest"]} size="2x" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={faRss} size="2x" />
              </a>
            </div>
          </section>
        </section>
        <section className="footer-bottom">
          <nav>
            <ul>
              <Link to={"/"}>
                <li>HOME</li>
              </Link>
              <Link to={"/invoices"}>
                <li>INVOICES</li>
              </Link>
              <Link to={"/companies"}>
                <li>COMPAGNIES</li>
              </Link>
              <Link to={"/contacts"}>
                <li>CONTACT</li>
              </Link>
              <Link to={"/privacy-policy"}>
                <li>PRIVACY POLICY</li>
              </Link>
            </ul>
          </nav>
          <div className="copyright">
            <p>Copyright © 2024 • COGIP Inc.</p>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
