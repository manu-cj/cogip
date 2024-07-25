import Footer from "../main/Footer";
import { useState, useEffect } from "react";
import Header from "../pages/components/Header";
import Notification from "../pages/components/Notification";
import { useNavigate } from "react-router-dom";

interface IRegister {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<IRegister>({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [formStyles, setFormStyles] = useState({
    lastname: { border: "1px black solid" },
    firstname: { border: "1px black solid" },
    email: { border: "1px black solid" },
    password: { border: "1px black solid" },
    passwordRepeat: { border: "1px black solid" },
  });

  const [notification, setNotification] = useState<string>("");

  const validateLastname = (lastName: string) => {
    return lastName.length > 2;
  };

  const validateFirstname = (firstName: string) => {
    return firstName.length > 2;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validatePasswordRepeat = (password: string, passwordRepeat: string) => {
    return password === passwordRepeat;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    switch (name) {
      case "lastName":
      setFormStyles((prevStyles) => ({
        ...prevStyles,
        lastname: {
          border: validateLastname(value) ? "2px solid lightgreen" : "1px solid black",
        },
      }));
      break;
      case "firstName":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          firstname: {
            border: validateFirstname(value) ? "2px lightGreen solid" : "1px black solid",
          },
        }));
        break;
      case "email":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          email: { border: validateEmail(value) ? "2px lightGreen solid" : "1px black solid" },
        }));
        break;
      case "password":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          password: {
            border: validatePassword(value) ? "2px lightGreen solid" : "1px black solid",
          },
        }));
        break;
      case "passwordRepeat":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          passwordRepeat: {
            border: validatePasswordRepeat(formData.password, value)
              ? "2px lightGreen solid" : "1px black solid",
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
      validateLastname(formData.lastName) &&
      validateFirstname(formData.firstName) &&
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validatePasswordRepeat(formData.password, formData.passwordRepeat)
    ) {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        result.message === "Email already in use"
          ? setNotification(result.message)
          : setNotification(result.message);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("lastName")) {
      navigate("/");
    }
  });

  return (
    <>
      <Header />
      <main>
        <Notification notification={notification} />
        <h2>Sign up</h2>
          <form
            method="post"
            action="/api/users"
            className="register logForm"
            onSubmit={handleSubmit}
          >
            
            <label htmlFor="lastname">LastName</label>
            <input
              type="text"
              name="lastName"
              id="lastname"
              placeholder="Enter your lastname"
              value={formData.lastName}
              onChange={handleChange}
              style={formStyles.lastname}
              required
            />
            <label htmlFor="firstname">FirstName</label>
            <input
              type="text"
              name="firstName"
              id="firstname"
              placeholder="Enter your firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={formStyles.firstname}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              style={formStyles.email}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password ex: un mot de passe de 8 lettres"
              value={formData.password}
              onChange={handleChange}
              style={formStyles.password}
              required
            />
            <label htmlFor="passwordRepeat">Repeat Password</label>
            <input
              type="password"
              name="passwordRepeat"
              id="passwordRepeat"
              placeholder="Repeat your password"
              value={formData.passwordRepeat}
              onChange={handleChange}
              style={formStyles.passwordRepeat}
              required
            />
            <input type="submit" value="Register" />
          </form>
      </main>
      <Footer />
    </>
  );
};

export default Register;
