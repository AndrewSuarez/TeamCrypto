import "./group.css"
import reactLogo from "../../assets/images/reactLogo.png"
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function Group({group}) {
    return (
        <div className="group">
            <img className="groupImg" src={reactLogo} alt="" />
            <span className="groupName">{group?.name}</span>
            <div className="groupSettingsIcon">
                <MoreVertIcon  />
            </div>
        </div>
    )
}
