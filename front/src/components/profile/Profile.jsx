import "./profile.scss";
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import X6XZ from "../../resources/images/D5ur.gif"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  logout } from "../../redux/userRedux";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);

    return (
        <div className="profile">
            <Link to="/user" className="link" >
                <div className="profileDetails">
                    <img src={user.profilePic ? user.profilePic : X6XZ } alt="profileImg" />
                    <div className="name_msg">
                        <div className="name">
                        {user.username}
                        </div>
                        <div className="msg">
                            <span className="msg_details">{user.comment ? user.comment : "나는 누구인가"}</span>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="logoutCon" >
                <MeetingRoomOutlinedIcon className="logout" onClick={()=> dispatch(logout())}/>
            </div>
        </div>
    )
}

export default Profile
