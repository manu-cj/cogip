import React from 'react';
import { useState, useEffect } from 'react';
import Header from './header/HeaderDashboard';
import NavBarLat from './navigation/NavBarLat';
import { InvoiceData } from '../../types/types';
import Hamburger from './navigation/Hamburger';

function InvoicesDashboard() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }
    const [companyValue, setCompanyValue] = useState('default')
    const [formData, setFormData] = useState<InvoiceData>({
        reference:'',
        price:'',
        company: ''
    })
    const [formStyles, setFormStyles] = useState({
        reference: { borderColor: 'black' },
        price: { borderColor: 'black' },
        company: { borderColor: 'black' },
      });

    const validateReference = (reference:string) => {
        const regex = /^[A-Za-z]\d+-\d{3}$/;
        return regex.test(reference);
    }

    const validatePrice = (price:string) => {
        const regex = /^\d+$/;
        return regex.test(price);
    }

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
              reference: { borderColor: validateReference(value) ? 'lightGreen' : 'red' },
            }));
            break;
          case 'price':
            setFormStyles((prevStyles) => ({
              ...prevStyles,
              price: { borderColor: validatePrice(value) ? 'lightGreen' : 'red' },
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validateReference(formData.reference) && validatePrice(formData.price)){
                console.log('Form submitted:', formData);
            } else {
                console.log('Form validation failed');
            }
    }

    return (
        <div className='dashBoard'>
            <Hamburger className={`hamburger ${isOpen ? '' : 'hidden'}`} toggle={handleClick}/>
            <NavBarLat img="./../../../public/assets/img/unbgcommeunautre.jpg" firstName="Dylan"  lastName="Feys" className={`navBarLat ${isOpen ? 'hidden' : 'visible'}`} toggle={handleClick}/>
            <div className='dashBoard__content'>
                <Header firstName="Dylan"/>
                <div className='dashBoard__invoices'>
                    <h3>New invoice</h3>
                    <hr />
                    <form action="LA ROUTE DES BACKENDS" method="post" onSubmit={handleSubmit}>
                        <input type="text" name='reference' id='reference' placeholder='Reference' required onChange={handleChange} />
                        <input type="text" name='price' id='price' placeholder='Price' required onChange={handleChange}/>
                        <select name="company" id="company" className={companyValue === 'default' ? 'default' : ''} value={companyValue} onChange={(e) => setCompanyValue(e.target.value)}>
                            <option value="default" className='defaultOption' disabled selected>Company name</option>
                            <option value="ss">sfrez</option>
                            <option value="ss">sfrez</option>
                            <option value="ss">sfrez</option>
                            {/* {companies.map((company)=>{
                                <option value={company.tva}>{company.name}</option>
                            })} */}
                        </select>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InvoicesDashboard;