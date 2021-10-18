import "./logoDetails.scss";
import SportsTennisOutlinedIcon from '@material-ui/icons/SportsTennisOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const LogoDetails = () => {
    return (
        <div className="logoDetails">
            <SportsTennisOutlinedIcon className="icon"/>
            <div className="logoName">Concern TEAM</div>
            <MenuOutlinedIcon className="btn"/>
            <MenuOpenIcon className="btnClose"/>
        </div>
    )
}

export default LogoDetails
