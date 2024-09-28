import { message } from "antd";

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

window.isEmail = email => emailRegex.test(email)

window.toastify=(msg="",type)=>{
    switch (type) {
        case "success": return message.success(msg)
        case "info": return message.info(msg)
        case "error": return message.error(msg)
        case "warning": return message.warning(msg)
        
        default:
             return message.warning(msg)
           
    }
}