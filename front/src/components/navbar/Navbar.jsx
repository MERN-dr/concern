import { useState } from "react";
import LogoDetails from "../logoDetails/LogoDetails";
import NavList from "../navList/NavList";
import Profile from "../profile/Profile";
import "./navbar.scss";

const Navbar = () => {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    return (
        <div className={hovered ? 'navbar open' : 'navbar'}>
            {/* <div className="logoDetails"></div>
            <div className="navList"></div>
            <div className="profile"></div> */}
            <div onClick={toggleHover} className="logo">
                <LogoDetails/>
            </div>
            <NavList/>
            <Profile/>
        </div>
    )
}

export default Navbar
