import { Company } from '../../types/companiesType';
import { useState, useEffect } from 'react';

function ListCompanyApi() {
    const BASE_URL = 'http://localhost:3000/api';
    const [companyData, setCompanyData] = useState<Company[]>([]);

      const getCompanies = async () => {
        try {
          const response = await fetch(`${BASE_URL}/companies`);
    
          if (!response.ok) {
            throw new Error(`Error fetching companies: ${response.status} ${response.statusText}`);
          }
    
          const data = await response.json();
          
          setCompanyData(data.companies);
        } catch (error) {
          console.error('Error fetching companies:', error);
          throw error;
        }
      };
    
      useEffect(() => {
        getCompanies();
      }, []);
    
    return (
      <>
        {companyData.map((company, index) => (
          <option key={index} value={company._id}>{company.name}</option>
        ))}
      </>
    );
}

export default ListCompanyApi;