import spinner from "../../resources/images/unscreen.gif"
import "./fullPageLoader.scss";
const FullPageLoader = () => {
    return (
        <div className="fp_container">
            <img src={spinner} className="fp_loader" alt="loading" />
        </div>
    )
}

export default FullPageLoader
