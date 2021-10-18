import "./user.scss";
import Navbar from '../../components/navbar/Navbar'
import UserInfo from "../../components/userInfo/UserInfo";

const User = () => {
    return (
        <div className="user">
            <Navbar/>
            <UserInfo/>
        </div>
    )
}

export default User
