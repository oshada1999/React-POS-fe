// import React from "react";

import {useEffect} from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface Props{
    open:boolean,
    onClose:any,
    type:string,
    message?:string
    // children:React.ReactNode,
    // icon?:any,
    // handleFunction?:Function
}

function Alert(props:Props) {

    let time=setTimeout(props.onClose,4000)

    useEffect(() => {

    }, []);


    // function close() {
    //     // props.onClose
    //     // timeOut=setTimeout(props.onClose,3000)
    //     clearTimeout(time)
    // }

    return(
        <section className={` top-1 right-0 z-[100] bg-transparent transition-all fixed
         ${props.open ? "fixed translate-x-0" : `translate-x-[100%] ${clearTimeout(time)}`}`}>
            <img src={
                `${props.type=='success' ? "../src/assets/images/alert/success-4.png" :
                    props.type=='error' ? "../src/assets/images/alert/error-2.png" : 
                    props.type=='error_2' ? "../src/assets/images/alert/error-1.png" : 
                        props.type=='warring' ? "../src/assets/images/alert/warring-1.png" : 
                            props.type=="info" ? "../src/assets/images/alert/info-2.png" : "" 
                }`
            }
                 width={300} height={120}/>
            <div className={"text-white font-Poppins font-[500] absolute bottom-8 right-6 cursor-pointer"} onClick={props.onClose}>
                <RiCloseCircleFill className={"hover:text-red-600 text-whitelk"} size={20}/>
            </div>

            <label className={`w-[60%] h-[10px] absolute bottom-8 ${props.type!='warring' ? "right-8":"right-9" } 
            font-Poppins text-[10px] font-[300] text-white`}>
                {/*Something went wrong! Check details and try again*/}
                {props.message}
            </label>
        </section>
    )

}

export default Alert;