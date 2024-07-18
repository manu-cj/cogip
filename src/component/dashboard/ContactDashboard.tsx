import React from "react";
import { useState } from "react";
import Header from "./header/HeaderDashboard";
import NavBarLat from "./navigation/NavBarLat";
import { ContactForm } from "../../types/types";
import Hamburger from "./navigation/Hamburger";
import Notification from "../pages/components/Notification";

function ContactDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  // const [companyValue, setCompanyValue] = useState("default"); //Jamais utilisé
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    companyId: "",
    phoneNr: "",
    email: "",
  });
  const [formStyles, setFormStyles] = useState({
    name: { borderColor: "black" },
    companyId: { borderColor: "black" },
    phone: { borderColor: "black" },
    email: { borderColor: "black" },
  });

  const [notification, setNotification] = useState<string>("");

  const validateLastname = (name: string) => {
    return name.length > 2;
  };

  const validateFirstname = (companyId: string) => {
    return companyId.length > 2;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const validatePhone = (phoneNr: string) => {
  //   const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  //   return regex.test(phoneNr);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    switch (name) {
      case "name":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          name: {
            borderColor: validateFirstname(value) ? "lightGreen" : "red",
          },
        }));
        break;
      case "companyId":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          companyId: {
            borderColor: validateLastname(value) ? "lightGreen" : "red",
          },
        }));
        break;
      case "email":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          email: { borderColor: validateEmail(value) ? "lightGreen" : "red" },
        }));
        break;
      case "phoneNr":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          phoneNr: { borderColor: validateEmail(value) ? "lightGreen" : "red" },
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validateFirstname(formData.name) &&
      validateLastname(formData.companyId) &&
      validateEmail(formData.email) 
      
    ) {
      try {
        const response = await fetch('http://localhost:3000/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        result.message === "Email already in use" ?
          setNotification(result.message)
          :
          setNotification(result.message)
        
        console.log(result);
      } catch (error) {
        console.error(error);
      }
      console.log("Form submitted:", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashBoard">
      <Hamburger
        className={`hamburger ${isOpen ? "" : "hidden"}`}
        toggle={handleClick}
      />
      <NavBarLat
        img="./../../../public/assets/img/unbgcommeunautre.jpg"
        firstName="Dylan"
        lastName="Feys"
        className={`navBarLat ${isOpen ? "hidden" : "visible"}`}
        toggle={handleClick}
      />
      <div className="dashBoard__content">
        <Header firstName="Dylan" />
        <div className="dashBoard__contact">
          <h3>New contact</h3>
          <Notification notification={notification} />
          <form
            action="LA ROUTE DES BACKENDS"
            method="post"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              required
              onChange={handleChange}
              style={formStyles.name}
            />
            <input
              type="text"
              name="companyId"
              id="companyId"
              placeholder="companyId"
              required
              onChange={handleChange}
              style={formStyles.companyId}
            />
            <input
              type="phone"
              name="phoneNr"
              id="phoneNr"
              placeholder="phoneNr"
              required
              onChange={handleChange}
              style={formStyles.phone}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
              onChange={handleChange}
              style={formStyles.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactDashboard;
