import "./group.css"
import reactLogo from "../../assets/images/reactLogo.png"
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function Group() {
    return (
        <div className="group">
            <img className="groupImg" src={reactLogo} alt="" />
            <span className="groupName">Projecto Principal</span>
            <div className="groupSettingsIcon">
                <MoreVertIcon  />
            </div>
        </div>
    )
}
