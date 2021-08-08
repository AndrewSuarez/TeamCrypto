import "./message.css"
import userIcon from "../../assets/images/userIcon.png"
import fileMessageIcon from "../../assets/images/fileMessageIcon.png"
import AttachFileIcon from '@material-ui/icons/AttachFile';

export default function Message({own, file}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className={!own && "messageImg"} src={!own && userIcon} alt="" />
                <div className="messageBubble">
                    <img className={file && "fileMessageImage"} src={file && fileMessageIcon} alt="" />
                    <span className="messageText">
                        Hola Byron! Ya tienes el archivo listo? Lo necesito para hoy antes de las 4 de la tarde
                    </span>
                </div>
            </div>
            <div className="messageBottom">45 min ago</div>
        </div>
    )
}
