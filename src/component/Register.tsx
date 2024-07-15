import { useState } from 'react';

interface IRegister {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<IRegister>({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const [formStyles, setFormStyles] = useState({
    lastname: { borderColor: 'black' },
    firstname: { borderColor: 'black' },
    email: { borderColor: 'black' },
    password: { borderColor: 'black' },
    passwordRepeat: { borderColor: 'black' },
  });

  const validateLastname = (lastname: string) => {
    return lastname.length > 2;
  };

  const validateFirstname = (firstname: string) => {
    return firstname.length > 2;
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
      case 'lastname':
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          lastname: { borderColor: validateLastname(value) ? 'lightGreen' : 'red' },
        }));
        break;
      case 'firstname':
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          firstname: { borderColor: validateFirstname(value) ? 'lightGreen' : 'red' },
        }));
        break;
      case 'email':
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          email: { borderColor: validateEmail(value) ? 'lightGreen' : 'red' },
        }));
        break;
      case 'password':
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          password: { borderColor: validatePassword(value) ? 'lightGreen' : 'red' },
        }));
        break;
      case 'passwordRepeat':
        setFormStyles((prevStyles) => ({
          ...prevStyles,
          passwordRepeat: { borderColor: validatePasswordRepeat(formData.password, value) ? 'lightGreen' : 'red' },
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validateLastname(formData.lastname) &&
      validateFirstname(formData.firstname) &&
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validatePasswordRepeat(formData.password, formData.passwordRepeat)
    ) {
      // Implement form submission logic here
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form method="post" action="ROUTE DES BACKENDS EN ATTENTE" className="register" onSubmit={handleSubmit}>
        <label htmlFor="lastname">LastName</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Enter your lastname"
          value={formData.lastname}
          onChange={handleChange}
          style={formStyles.lastname}
          required
        />
        <label htmlFor="firstname">FirstName</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Enter your firstname"
          value={formData.firstname}
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
    </>
  );
};

export default Register;
