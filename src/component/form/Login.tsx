import Footer from "../main/Footer";
import NavBar from "../main/navigation/NavBar";

function Login() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <form action="http://localhost:3000/api/users/login" method="post">
            <h2>Login</h2>
          <label htmlFor="mail">Email</label>
          <input type="email" name="email" id="mail" />
          <label htmlFor="mail">Email</label>
          <input type="password" name="password" id="mail" />
          <input type="submit" value="Connect" />
        </form>
      </main>
      <Footer/>
    </>
  );
}

export default Login;
