import React from 'react';
import { useState, useEffect } from 'react';
import Header from './header/Header';
import NavBarLat from './navigation/NavBarLat';
import { ContactData } from '../../types/types';

function ContactDashboard() {
    const [companyValue, setCompanyValue] = useState('default')
    const [formData, setFormData] = useState<ContactData>({
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        company: ''
    })
    const [formStyles, setFormStyles] = useState({
        reference: { borderColor: 'black' },
        price: { borderColor: 'black' },
        company: { borderColor: 'black' },
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

      const validatePhone = (phone:string) => {
        const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        return regex.test(phone);
      }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    
        switch (name) {
          case 'firstName':
            setFormStyles((prevStyles) => ({
              ...prevStyles,
              firstName: { borderColor: validateFirstname(value) ? 'lightGreen' : 'red' },
            }));
            break;
          case 'lastName':
            setFormStyles((prevStyles) => ({
              ...prevStyles,
              lastName: { borderColor: validateLastname(value) ? 'lightGreen' : 'red' },
            }));
            break;
          case 'email':
            setFormStyles((prevStyles) => ({
              ...prevStyles,
              email: { borderColor: validateEmail(value) ? 'lightGreen' : 'red' },
            }));
            break;
          case 'phone':
            setFormStyles((prevStyles) => ({
              ...prevStyles,
              phone: { borderColor: validateEmail(value) ? 'lightGreen' : 'red' },
            }));
            break;
          default:
            break;
        }
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validateFirstname(formData.firstName) && validateLastname(formData.lastName) && validateEmail(formData.email) && validatePhone(formData.phone)){
                console.log('Form submitted:', formData);
            } else {
                console.log('Form validation failed');
            }
    }

    return (
        <div className='dashBoard'>
            <NavBarLat img="./../../../public/assets/img/unbgcommeunautre.jpg" firstName="Dylan"  lastName="Feys"/>
            <div className='dashBoard__content'>
                <Header firstName="Dylan"/>
                <div className='dashBoard__contact'>
                    <h3>New contact</h3>
                    <hr />
                    <form action="LA ROUTE DES BACKENDS" method="post" onSubmit={handleSubmit}>
                        <input type="text" name='firstName' id='firstName' placeholder='Firstname' required onChange={handleChange} />
                        <input type="text" name='lastName' id='lastName' placeholder='Lastname' required onChange={handleChange}/>
                        <input type="text" name='phone' id='phone' placeholder='Phone' required onChange={handleChange}/>
                        <input type="text" name='email' id='email' placeholder='Email' required onChange={handleChange}/>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactDashboard;