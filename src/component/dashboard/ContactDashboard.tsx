import React from "react";
import { useState } from "react";
import Header from "./header/HeaderDashboard";
import NavBarLat from "./navigation/NavBarLat";
import { ContactForm } from "../../types/types";
import Hamburger from "./navigation/Hamburger";
import Notification from "../pages/components/Notification";
import ListCompanyApi from "./ListCompanyApi";
import { getCookie } from "../../service/getCookies";
import useAPI from "../../hook/useAPI";
import { useEffect } from "react";

function ContactDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const { users } = useAPI(`http://localhost:3000/api/users/${getCookie('id')}`);
    const [imgUsers, setImgUsers] = useState("default.jpg");

    useEffect(() => {
        if (users && users.image) {
            setImgUsers(users.image.filename);
        }
    }, [users]);

  const handleChangeImg = () => {
        setIsModal(!isModal);
    }
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    companyId: "",
    phoneNr: "",
    email: "",
  });
  const [formStyles, setFormStyles] = useState({
    name: { border: "none" },
    companyId: { border: "none" },
    phoneNr: { border: "none" },
    email: { border: "none" },
  });

  const [notification, setNotification] = useState<string>("");

  const validateName = (name: string) => {
    return name.length > 2;
  };

  const validateCompany = (companyId: string) => {
    return companyId.length > 2;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phoneNr: string): boolean => {
    const regexes = [
      /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/,  // +1 (344) 947-9959
      /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/,      // +1-344-947-9959
      /^\(\d{3}\) \d{3}-\d{4}$/,            // (344) 947-9959
      /^\d{3}-\d{3}-\d{4}$/                 // 344-947-9959
      // Ajoutez d'autres formats de numéros ici si nécessaire
    ];
  
    const isValid = regexes.some((regex) => {
      const isMatch = regex.test(phoneNr);
      console.log(`Testing ${phoneNr} with regex ${regex}: ${isMatch}`);
      return isMatch;
    });
  
    console.log(`Phone validation result: ${isValid}`);
    return isValid;
  };

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
            border: validateName(value) ? "1px lightGreen solid" : "none",
          },
        }));
        break;
      case "companyId":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          companyId: {
            border: validateCompany(value) ? "1px lightGreen solid" : "none",
          },
        }));
        break;
      case "email":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          email: {
            border: validateEmail(value) ? "1px lightGreen solid" : "none",
          },
        }));
        break;
      case "phoneNr":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          phoneNr: {
            border: validatePhone(value) ? "1px lightGreen solid" : "none",
          },
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validateName(formData.name) &&
      validateCompany(formData.companyId) &&
      validateEmail(formData.email) &&
      validatePhone(formData.phoneNr) === true
    ) {
      try {
        const response = await fetch("http://localhost:3000/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();

        setNotification(result.message);

        if (result.message == "Contact successfully created") {
          // Réinitialisation du formulaire après succès
          setFormData({
            name: "",
            companyId: "",
            phoneNr: "",
            email: "",
          });

          setFormStyles({
            name: { border: "none" },
            companyId: { border: "none" },
            phoneNr: { border: "none" },
            email: { border: "none" },
          });
        }

        setTimeout(() => {
          setNotification("");
        }, 10000);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
      console.log("Form submitted:", formData);
    } else {
      console.log("Form validation failed", formData);
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const [companyValue, setCompanyValue] = useState('default')
  const [companyClassName, setCompanyClassName] = useState('default');
    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompanyValue(e.target.value);
        setFormData((prevData) => ({
          ...prevData,
          companyId: e.target.value,
        }));
        setCompanyClassName(e.target.value === 'default' ? 'default' : '');
      };


  return (
    <div className="dashBoard">
      <Hamburger
        className={`hamburger ${isOpen ? "" : "hidden"}`}
        toggle={handleClick}
      />
      <NavBarLat img={imgUsers || "default.jpg"} firstName={getCookie("firstName")}  lastName={getCookie("lastName")} className={`navBarLat ${isOpen ? 'hidden' : 'visible'}`} toggle={handleClick} changeImg={handleChangeImg}/>
      <div className="dashBoard__content">
        <Header firstName={getCookie("firstName")}/>
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
              placeholder="William"
              required
              onChange={handleChange}
              style={formStyles.name}
              value={formData.name}
            />
            
            <select name="companyId" id="companyId" style={formStyles.companyId} className={companyClassName} value={companyValue} onChange={handleCompanyChange}>
                <option value="default" className="defaultOption" disabled>Company name</option>
                <ListCompanyApi/>
            </select>
            <input
              type="phone"
              name="phoneNr"
              id="phoneNr"
              placeholder="+1 (837) 207-6163"
              required
              onChange={handleChange}
              style={formStyles.phoneNr}
              value={formData.phoneNr}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="William@example.com"
              required
              onChange={handleChange}
              style={formStyles.email}
              value={formData.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactDashboard;
