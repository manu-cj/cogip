import NavBar from "../../main/navigation/NavBar";


function Header() {
    return (
        <>
        <header>
        <NavBar/>
        <div className="bottom-content-other-pages">
          <img
            src="./../public/assets/img/home/Rectangle 10.svg"
            alt="Rectangle 10.svg"
          />
        </div>
      </header></>
    );
}

export default Header;