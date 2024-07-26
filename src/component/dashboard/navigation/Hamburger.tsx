import { HamburgerProps } from "../../../types/types";

function Hamburger({className, toggle}: HamburgerProps ) {
    
    return (
        <div className={className} onClick={toggle}>
            <div className="hamburgerElement"></div>
            <div className="hamburgerElement"></div>
            <div className="hamburgerElement"></div>
        </div>
    );
}

export default Hamburger;