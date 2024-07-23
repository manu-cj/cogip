import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';


function Logout() {
  function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

  deleteCookie('id');
  deleteCookie('lastName');
  deleteCookie('firstName');
  deleteCookie('email');
  deleteCookie('createdAt');
  deleteCookie('updateOn');
  deleteCookie('imageName');

  const navigate = useNavigate ();

  useEffect(() => {
      navigate('/');
  },);

  return null;
}

export default Logout;
