import React from "react";
import { useState, useEffect } from "react";
import Header from "./header/HeaderDashboard";
import NavBarLat from "./navigation/NavBarLat";
import { CompanyForm } from "../../types/types";
import Hamburger from "./navigation/Hamburger";
import Notification from "../pages/components/Notification";

function CompaniesDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const handleChangeImg = () => {
        setIsModal(!isModal);
    }

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const [companyType, setCompanyType] = useState("default");
  const [formData, setFormData] = useState<CompanyForm>({
    name: "",
    vat : "",
    country: "",
    typeId:""
  });
  const [formStyles, setFormStyles] = useState({
    name: { border: "none" },
    country: { border: "none" },
    vat: { border: "none" },
  });

  const validateName = (name: string) => {
    return name.length > 2;
  };

  const validateTVA = (vat: string) => {
    const regex = /^[A-Za-z]{2}\d{9}$/;
    return regex.test(vat);
  };

  const validateCountry = (country: string) => {
    return country.length > 2; //on pourrait éventuellement passer par une API qui récupère tous les pays qui existe et vérifier que le pays rentré existe dans la liste.
  };
  const [notification, setNotification] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validateName(formData.name) &&
      validateCountry(formData.country) &&
      validateTVA(formData.vat)
      
    ) {
      try {
        const response = await fetch("http://localhost:3000/api/companies", {
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
            vat: "",
            country: "",
            typeId: companyType
          });

          setFormStyles({
            name: { border: "none" },
            vat: { border: "none" },
            country: { border: "none" },
            
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
          name: { border: validateName(value) ? "1px lightGreen solid" : "none" },
        }));
        break;
      case "vat":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          vat: { border: validateTVA(value) ? "1px lightGreen solid" : "none" },
        }));
        break;
      case "country":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          country: {
            border: validateCountry(value) ? "1px lightGreen solid" : "none",
          },
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const selectElement = document.querySelector(
      "#company"
    ) as HTMLSelectElement;

    // Ne pas enlever le commentaire en dessous il permet juste de ne plus afficher la ligne suivante comme une erreur
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const handleChange = () => {
      if (selectElement.value === "default") {
        selectElement.classList.add("default");
      } else {
        selectElement.classList.remove("default");
      }

      selectElement.addEventListener("change", handleChange);

      return () => {
        selectElement.removeEventListener("change", handleChange);
      };
    };
  }, []);

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  

  return (
    <div className="dashBoard">
      <Hamburger
        className={`hamburger ${isOpen ? "" : "hidden"}`}
        toggle={handleClick}
      />
      <NavBarLat img={getCookie("imageName")} firstName={getCookie("firstName")}  lastName={getCookie("lastName")} className={`navBarLat ${isOpen ? 'hidden' : 'visible'}`} toggle={handleClick} changeImg={handleChangeImg}/>
      <div className="dashBoard__content">
      <Header firstName={getCookie("firstName")}/>
        <div className="dashBoard__companies">
          <h3>New company</h3>
          <hr />
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
              placeholder="William society"
              required
              onChange={handleChange}
              style={formStyles.name}
            />
            <input
              type="text"
              name="vat"
              id="tva"
              placeholder="	FR123456789"
              required
              onChange={handleChange}
              style={formStyles.vat}
            />
            <input
              type="text"
              name="country"
              id="country"
              placeholder="France"
              required
              onChange={handleChange}
              style={formStyles.country}
            />
            <select
              name="typeId"
              id="company"
              className={companyType === "default" ? "default" : ""}
              value={companyType}
              onChange={(e) => {
                setCompanyType(e.target.value);
                setFormData((prevData) => ({
                  ...prevData,
                  typeId: e.target.value,
                }));
              }}
            >
              <option
                value="default"
                className="defaultOption"
                disabled
                selected
              >
                Company type
              </option>
              <option value="Supplier">Supplier</option>
              <option value="Client">Client</option>
            </select>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompaniesDashboard;
