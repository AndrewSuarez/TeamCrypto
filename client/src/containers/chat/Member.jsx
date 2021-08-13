import "./member.css"
import userIcon from "../../assets/images/userIcon.png"

import FolderIcon from '@material-ui/icons/Folder';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Member({member}) {
    const [currentUser, setCurrentUser] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const res = await axios.get('/api/users/' + member.userId)
                setCurrentUser(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchUser()
    }, [member.userId])

    return (
        <div className="member">
            <div className="groupMember">
                <div className="groupMemberImgContainer">
                    <img className="groupMemberImage" src={userIcon} alt="" />
                    <div className="groupMemberOnlineBadge"></div>
                </div>
                <div className="groupMemberName">{`${currentUser?.nombre} ${currentUser?.apellido}`}</div>
                <div className="role">
                    PM
                </div>
                <div className="memberFileIcon">
                    <FolderIcon />
                </div>
            </div>
            
            
        </div>
    )
}
