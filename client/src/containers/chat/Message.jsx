import "./message.css"
import userIcon from "../../assets/images/userIcon.png"

export default function Message({own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className={!own && "messageImg"} src={!own && userIcon} alt="" />
                <p className="messageText">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum deserunt ipsam 
                    quasi? Laudantium, voluptatibus delectus a odit temporibus 
                </p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}
