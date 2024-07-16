import { useRouteError } from "react-router-dom";
import NavBar from "../main/navigation/NavBar";


interface RouteError {
    statusText?: string;
    message?: string;
  }
export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <>
    <header>
        <NavBar/>
    </header>
    <main>
    <div id="error-page">
        
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <img src="./../../public/assets/img/home/DrawKit Vector Illustration Project Manager (4) 1.svg" alt="DrawKit Vector Illustration Project Manager" />
  
      </div>
    </main>
    </>
  );
}