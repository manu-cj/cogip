import Footer from "../main/Footer";
import Header from "../pages/components/Header";
import { useState } from 'react';
import Notification from "../pages/components/Notification";


interface ILogin {
  email:string,
  password:string
}

function Login() {


  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }



  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();{
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        
        
        setNotification(result.message);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <>
      <Header/>
      <main>
      <Notification notification={notification} />
        <form action="http://localhost:3000/api/users/login" method="post" onSubmit={handleSubmit}>
            <h2>Login</h2>
          <label htmlFor="mail">Email</label>
          <input type="email" name="email" id="mail" onChange={handleChange} />
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" onChange={handleChange} />
          <input type="submit" value="Connect" />
        </form>
      </main>
      <Footer/>
    </>
  );
}

export default Login;
