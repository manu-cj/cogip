import React from 'react';
import { useState, useEffect } from 'react';
import Header from './header/HeaderDashboard';
import NavBarLat from './navigation/NavBarLat';
import { CompanyData } from '../../types/types';

function CompaniesDashboard() {
    const [companyType, setCompanyType] = useState('default')
    const [formData, setFormData] = useState<CompanyData>({
        name:'',
        tva:'',
        country: '',
        type:''
    })
    const [formStyles, setFormStyles] = useState({
        reference: { borderColor: 'black' },
        price: { borderColor: 'black' },
        company: { borderColor: 'black' },
      });

    const validateName = (name: string) => {
        return name.length > 2;
    }

    const validateTVA = (tva: string) => {
        const regex = /^[A-Za-z]{2}\d{9}$/ 
        return regex.test(tva)
    }

    const validateCountry = (country: string) => {
        return country.length > 2; //on pourrait éventuellement passer par une API qui récupère tous les pays qui existe et vérifier que le pays rentré existe dans la liste. 
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validateName(formData.name) && validateTVA(formData.tva) && validateCountry(formData.country)) {
                console.log('Form submitted:', formData);
            } else {
                console.log('Form validation failed');
            }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    
        switch (name) {
          case 'name':
            setFormStyles((prevStyles) => ({
              ...prevStyles,
              name: { borderColor: validateName(value) ? 'lightGreen' : 'red' },
            }));
            break;
          case 'tva':
            setFormStyles((prevStyles) => ({
              ...prevStyles,
              tva: { borderColor: validateTVA(value) ? 'lightGreen' : 'red' },
            }));
            break;
            case 'country':
                setFormStyles((prevStyles)=> ({
                    ...prevStyles,
                    country: { borderColor: validateCountry(value) ? 'lightGreen' : 'red' },
                }));
                break;
          default:
            break;
        }
      };

      useEffect(() => {
        const selectElement = document.querySelector("#company") as HTMLSelectElement

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

    return (
        
        <div className='dashBoard'>
            <NavBarLat img="./../../../public/assets/img/unbgcommeunautre.jpg" firstName="Dylan"  lastName="Feys"/>
            <div className='dashBoard__content'>
                <Header firstName="Dylan"/>
                <div className='dashBoard__companies'>
                    <h3>New company</h3>
                    <hr />
                    <form action="LA ROUTE DES BACKENDS" method="post" onSubmit={handleSubmit}>
                        <input type="text" name='name' id='name' placeholder='Name' required onChange={handleChange} />
                        <input type="text" name='tva' id='tva' placeholder='TVA' required onChange={handleChange}/>
                        <input type="text" name='country' id='country' placeholder='Country' required onChange={handleChange}/>
                        <select name="company" id="company" className={companyType === 'default' ? 'default' : ''} value={companyType} onChange={(e) => setCompanyType(e.target.value)}>
                            <option value="default" className='defaultOption' disabled selected>Company type</option>
                            <option value="supplier">Supplier</option>
                            <option value="client">Client</option>
                        </select>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompaniesDashboard;