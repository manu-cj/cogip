import NavBar from "../../main/navigation/NavBar";
import rectangle from "./../../../../public/assets/img/home/Rectangle 10.svg"


function Header() {
    return (
        <>
        <header>
        <NavBar/>
        <div className="bottom-content-other-pages">
          <img
            src={rectangle}
            alt="Rectangle 10.svg"
          />
        </div>
      </header></>
    );
}

export default Header;
