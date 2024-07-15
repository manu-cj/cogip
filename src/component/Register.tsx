

function Register() {
  return (
    <>
      <form method="post" action="ROUTE DES BACKENDS EN ATTENDE" className="register">
        <label htmlFor="lastName">LastName</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="firstName">FirstName</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="mail">Email</label>
        <input type="email" name="mail" id="mail" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password-repeat" id="password-repeat" />
      </form>
    </>
  );
}

export default Register
