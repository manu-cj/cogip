import React from 'react';
import { useState, useEffect } from 'react';
import Header from './header/HeaderDashboard';
import NavBarLat from './navigation/NavBarLat';
import { InvoiceForm } from '../../types/types';
import Hamburger from './navigation/Hamburger';
import ListCompanyApi from './ListCompanyApi';
import Notification from '../pages/components/Notification';

function InvoicesDashboard() {
    const [isOpen, setIsOpen] = useState(true);
    const [isModal, setIsModal] = useState(false);
    const handleChangeImg = () => {
        setIsModal(!isModal);
    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    }
    const [companyValue, setCompanyValue] = useState('default')
    const [formData, setFormData] = useState<InvoiceForm>({
        reference:'',
        dueDate: '',
        companyId: ''
    })
    const [formStyles, setFormStyles] = useState({
        reference: { border: 'none' },
        dueDate: { border: 'none' },
        company: { border: 'none' },
      });

    const validateReference = (reference:string) => {
        const regex = /^[A-Za-z]\d+-\d{3}$/;
        return regex.test(reference);
    }

    // const validatePrice = (price:string) => {
    //     const regex = /^\d+$/;
    //     return regex.test(price);
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    
        switch (name) {
          case 'reference':
            setFormStyles((prevStyles) => ({
              ...prevStyles,
              reference: { border: validateReference(value) ? "1px lightGreen solid" : "none" },
            }));
            break;
          // case 'price':
          //   setFormStyles((prevStyles) => ({
          //     ...prevStyles,
          //     price: { borderColor: validatePrice(value) ? 'lightGreen' : 'red' },
          //   }));
          //   break;
          default:
            break;
        }
      };


    useEffect(() => {
        const selectElement = document.querySelector("#company") as HTMLSelectElement
// Ne pas enlever le commentaire en dessous il permet juste de ne plus afficher la ligne suivante comme une erreur
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
        const handleChange = () => {
            if(selectElement.value==="default"){
                selectElement.classList.add("default")
            } else {
                selectElement.classList.remove("default")
            }

            selectElement.addEventListener("change", handleChange)

            return () => {
                selectElement.removeEventListener("change", handleChange)
            }
        }
    }, [])
    const [companyClassName, setCompanyClassName] = useState('default');
    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompanyValue(e.target.value);
        setFormData((prevData) => ({
          ...prevData,
          companyId: e.target.value,
        }));
        console.log(formData.companyId);
        
        setCompanyClassName(e.target.value === 'default' ? 'default' : '');
      };

      const [notification, setNotification] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        validateReference(formData.reference)
        
      ) {
        try {
          const response = await fetch("http://localhost:3000/api/invoices", {
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
              reference: "",
              dueDate: "",
              companyId : ""
            });
  
            setFormStyles({
              reference: { border: "none" },
              dueDate: { border: 'none' },
              company: { border: "none"}
            });
          }
  
          setTimeout(() => {
            setNotification("");
          }, 10000);
  
          console.log(result);
          console.log("Form submitted:", formData);
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
        return parts.pop()?.split(';').shift() || null;
      }
      return null;
    };

    return (
        
        <div className='dashBoard'>
            <Hamburger className={`hamburger ${isOpen ? '' : 'hidden'}`} toggle={handleClick}/>
            <NavBarLat img={getCookie("imageName")} firstName={getCookie("firstName")}  lastName={getCookie("lastName")} className={`navBarLat ${isOpen ? 'hidden' : 'visible'}`} toggle={handleClick} changeImg={handleChangeImg}/>
            <div className='dashBoard__content'>
            <Header firstName={getCookie("firstName")}/>
            <div className='dashBoard__invoices'>
                    <h3>New invoice</h3>
                    <hr />
                    <Notification notification={notification} />
                    <form action="LA ROUTE DES BACKENDS" method="post" onSubmit={handleSubmit}>
                        <input type="text" name='reference' id='reference' placeholder='F20220815-003' required onChange={handleChange} style={formStyles.reference}/>
                        <input type="date" name='dueDate' id='dueDate' placeholder='due date' required onChange={handleChange} style={formStyles.dueDate}/>
                        {/* <input type="text" name='price' id='price' placeholder='Price' required onChange={handleChange} style={formStyles.price}/> */}
                        <select name="companyId" id="companyId" style={formStyles.company} className={companyClassName} value={companyValue} onChange={handleCompanyChange}>
                            <option value="default" className="defaultOption" disabled>Company name</option>
                            <ListCompanyApi/>
                        </select>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InvoicesDashboard;