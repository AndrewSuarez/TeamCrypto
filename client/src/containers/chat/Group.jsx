import "./group.css"
import reactLogo from "../../assets/images/reactLogo.png"

export default function Group() {
    return (
        <div className="group">
            <img className="groupImg" src={reactLogo} alt="" />
            <span className="groupName">Grupo Prueba</span>
        </div>
    )
}
