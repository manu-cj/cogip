import Footer from "../main/Footer";
import Header from "../pages/components/Header";
import { useState } from 'react';
import Notification from "../pages/components/Notification";
import { useNavigate  } from 'react-router-dom';


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
        const response = await fetch('/api/users/login', {
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
        document.cookie = `roleId=${result.userObject.role._id}; expires=${now.toUTCString()}; path=/`;
        document.cookie = `roleName=${result.userObject.role.name}; expires=${now.toUTCString()}; path=/`;


        console.log(`Cookies set: ${document.cookie}`);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }; 

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  const navigate = useNavigate ();


  const isLoggin = async () => {
    try {
      const response = await fetch(`/api/users/${getCookie('id')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const result = await response.json();
      console.log(result);
      
      if (result.lastName === "") {
        navigate('/');
        
        return true
      }
    } catch (error) {
      console.error(error);
    }
  }
  isLoggin
  
  return (
    <>
      <Header/>
      
      <main>
      <Notification notification={notification} />
      <h2>Login</h2>
        <form action="/api/users/login" method="post" onSubmit={handleSubmit} className="logForm">
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
