import "./secMain.scss";
import loader from "../../resources/images/6XZ.gif"
const SecMain = () => {
    return (
        <div className="secMain">
            <img src={loader} className="loader" alt="loading" />
            <div className="container">
                <span>새로운 컨텐츠로 찾아 뵙겠습니다.</span>
            </div>
        </div>
    )
}

export default SecMain
