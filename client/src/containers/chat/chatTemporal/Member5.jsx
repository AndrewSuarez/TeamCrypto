import "./memberTemp.css"
import userIcon from "../../../assets/images/userIcon.png"
import FolderIcon from '@material-ui/icons/Folder';

export default function Member() {
    return (
        <div className="member">
            <div className="groupMember">
                <div className="groupMemberImgContainer">
                    <img className="groupMemberImage" src={userIcon} alt="" />
                    <div className="groupMemberOnlineBadge"></div>
                </div>
                <div className="groupMemberName">Rafael Correa</div>
                <div className="role">
                    SP
                </div>
                <div className="memberFileIcon">
                    <FolderIcon />
                </div>
            </div>
            
            
        </div>
    )
}
