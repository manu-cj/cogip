

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

  window.location.href = '/';

  return null;
}

export default Logout;
