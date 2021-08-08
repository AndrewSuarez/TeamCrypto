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
                <div className="groupMemberName">Stefanny Lugo</div>
                <div className="role">
                    Admin
                </div>
                <div className="memberFileIcon">
                    <FolderIcon />
                </div>
            </div>
            
            
        </div>
    )
}
