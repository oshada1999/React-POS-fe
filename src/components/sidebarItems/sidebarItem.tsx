import {useContext} from "react";
import SidebarContext from "../../context/contexts"
import {Link} from "react-router-dom";

interface Props{
    icon:any,
    text:string,
    active?:any,
    alert?:any,
    navigate:string
}

function SidebarItem(props:Props){

    const expanded = useContext(SidebarContext)

    return(
        <Link to={props.navigate} >
            <li id={props.text}
                className={` min-h-[42px]
                relative flex items-center py-2 px-3 my-3 " +
                "font-medium rounded-md cursor-pointer" +
                "transition-colors group font-Euclid
                
                ${props.active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" 
                : "hover:bg-indigo-50 text-gray-600"} 
                
                ${!expanded ? "w-max" : "w-full"} my-[5px] cursor-pointer`}>
                {props.icon}

                <span className={`overflow-hidden transition-all text-[14px] 
                ${expanded ? "w-42 ml-3 " : "w-0"}`}>

                    {props.text}
                </span>

                {
                    !expanded &&
                    <div
                        className={`absolute left-[110%] rounded-md px-2 py-1 ml-6
                        bg-indigo-100 text-indigo-800 text-sm font-medium
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                        {props.text}
                    </div>
                }
            </li>
        </Link>
    )

}

export default SidebarItem;