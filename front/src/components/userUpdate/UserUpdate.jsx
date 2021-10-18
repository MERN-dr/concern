import "./userUpdate.scss";
import Accessibility from '@material-ui/icons/Accessibility';
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { deleteUser } from "../../redux/apiCalls";
import storage from "../../firebase";
import { ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {updateUsers} from "../../redux/userRedux";


const UserUpdate = () => {
    {/* username comment */}
    const [profilePic, setprofilePic] = useState("");
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const user = useSelector((state) => state.user.currentUser);
    const fileRef = useRef(null)
    const dispatch = useDispatch();

    const handleDelete = (id) =>{
        deleteUser(dispatch, id);
    };
    const handleChange = (e) =>{
        setInputs((prev)=>{
            return {...prev, [e.target.name]:e.target.value};
        });
    };
    const handleFile = () =>{
        fileRef.current.click();
    }
    const handleClick = (e) =>{
        e.preventDefault();
        const userId = user._id;
        if(file){
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, `/items/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                    }
                },
                (error) =>{},
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const updateUser = { ...inputs, profilePic: downloadURL, userId};
                        dispatch(updateUsers(updateUser));
                    });
                }
            )
        }else{
            const updateUser = { ...inputs, userId};
            dispatch(updateUsers(updateUser));
        }

    }

    return (
        <>
        <div className="userUpdate">
            <div className="updateContainer">
                <button onClick={() =>{handleDelete(user._id)}}>Delete Account</button>
                <h3 className="updateTitle">Update your Account</h3>
                <div className="updateContents">
                    <form>
                        <div className="formIcon">
                            <Accessibility/>
                            <span>Change Your mind</span>
                        </div>
                        <div className="formItem">
                            <label htmlFor="">User Name</label>
                            <input type="text" name="username" className="formInput" placeholder={user.username} onChange={handleChange}/>
                        </div>
                        <div className="formItem">
                            <label htmlFor="">Comment</label>
                            <input type="text" name="comment" className="formInput" placeholder={user.comment} onChange={handleChange}/>
                        </div>
                        <div className="formItem">
                            <label htmlFor="">Profile Picture</label>
                            <input
                                type="file"
                                className="file"
                                ref={fileRef}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <input type="text" className="fileName" readOnly onClick={handleFile} placeholder={file? file.name : ""}/>
                        </div>
                        <button className="updateButtom" onClick={handleClick}> UPDATE </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserUpdate
