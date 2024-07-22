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

        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 48 * 60 * 60 * 1000; // 48 heures en millisecondes
        now.setTime(expireTime);
        
        document.cookie = `id=${result.userObject._id}; expires=${now.toUTCString()}; path=/`;
        document.cookie = `lastName=${result.userObject.lastName}; expires=${now.toUTCString()}; path=/`;
        document.cookie = `firstName=${result.userObject.firstName}; expires=${now.toUTCString()}; path=/`;
        document.cookie = `email=${result.userObject.email}; expires=${now.toUTCString()}; path=/`;
        document.cookie = `createdAt=${result.userObject.createdAt}; expires=${now.toUTCString()}; path=/`;
        document.cookie = `updateOn=${result.userObject.updatedOn}; expires=${now.toUTCString()}; path=/`;
        document.cookie = `imageName=${result.userObject.image.filename}; expires=${now.toUTCString()}; path=/`;


        console.log(`Cookies set: ${document.cookie}`);

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
