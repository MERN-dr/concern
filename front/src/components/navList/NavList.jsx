import "./navList.scss";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import { Link } from "react-router-dom";
import FooFoo from "../FooFoo/FooFoo";

const NavList = () => {
    return (
        <div className="navList">
            <ul className="navListUl">
                <li>
                    <SearchOutlinedIcon className="search"/>
                    <input type="text" placeholder="Search.."/>
                    <span className="tooltip">Search</span>
                </li>
                <li>
                    <Link to="/" className="link">
                        {/* <FooFoo sound="sounds/yeah.wav" title="FooFoo"/> */}
                        {/* </FooFoo> */}
                        <PlayArrowOutlinedIcon className="play" />
                        <span className="linkName">only Sound</span>
                    </Link>
                    <span className="tooltip">Drop the BALL</span>
                </li>
            </ul>
        </div>
    )
}

export default NavList
