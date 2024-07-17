import NavBar from "../main/navigation/NavBar";
import Footer from "../main/Footer";
import { useState } from 'react';

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
    lastname: { borderColor: "black" },
    firstname: { borderColor: "black" },
    email: { borderColor: "black" },
    password: { borderColor: "black" },
    passwordRepeat: { borderColor: "black" },
  });

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
      case "lastname":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          lastname: {
            borderColor: validateLastname(value) ? "lightGreen" : "red",
          },
        }));
        break;
      case "firstname":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          firstname: {
            borderColor: validateFirstname(value) ? "lightGreen" : "red",
          },
        }));
        break;
      case "email":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          email: { borderColor: validateEmail(value) ? "lightGreen" : "red" },
        }));
        break;
      case "password":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          password: {
            borderColor: validatePassword(value) ? "lightGreen" : "red",
          },
        }));
        break;
      case "passwordRepeat":
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          passwordRepeat: {
            borderColor: validatePasswordRepeat(formData.password, value)
              ? "lightGreen"
              : "red",
          },
        }));
        break;
      default:
        break;
    }
  };

  // const useLocalStorage = <T,>(storageKey: string, fallbackState: T): [T, Dispatch<SetStateAction<T>>] => {
  //   const [value, setValue] = useState<T>(
  //     () => {
  //       const storedValue = localStorage.getItem(storageKey);
  //       return storedValue ? JSON.parse(storedValue) as T : fallbackState;
  //     }
  //   );
  
  //   useEffect(() => {
  //     localStorage.setItem(storageKey, JSON.stringify(value));
  //   }, [value, storageKey]);
  
  //   return [value, setValue];
  // };

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
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        result.message === "Email already in use" ?
          localStorage.setItem("errors", JSON.stringify(result))
          :
        localStorage.setItem("notification", JSON.stringify(result));
        
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <form
          method="post"
          action="http://localhost:3000/api/users"
          className="register"
          onSubmit={handleSubmit}
        >
          <h2>Sign up</h2>
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
      <Footer/> 
    </>
  );
};

export default Register;
