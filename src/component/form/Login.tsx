import NavBar from "../main/navigation/NavBar";


function Login() {
    return (
        <>
        <NavBar/>
        <form action="LA ROUTE DES BACKENDS" method="post">
            <label htmlFor="mail">Email</label>
            <input type="email" name="mail" id="mail" />
            <label htmlFor="mail">Email</label>
            <input type="email" name="mail" id="mail" />
            <input type="submit" value="Connect" />
        </form>
        </>
    );
}

export default Login;