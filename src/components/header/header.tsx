import {
    // BiCalendar,
    BiMenu,
    BiSolidChevronDown
    // BiTimeFive
} from "react-icons/bi";
import {useEffect, useState} from "react";
// import {FiCalendar} from "react-icons/fi";
import {CiCalendarDate, CiClock2} from "react-icons/ci";
// import SidebarContext from "./context/contexts"

interface Props {
    username:string,
    email:string,
    proPic:string,
    callBack:Function
}

function Header(props:Props){

    // const [expanded, setExpanded] = useState(true)

    const [time, setTime] = useState("")
    const [date, setDate] = useState("")

    function setLiveTime() {
        // var d = new Date();
        // var s = d.getSeconds();
        // var m = d.getMinutes();
        // var h = d.getHours();
        // setTime(("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2));
        setTime(new Date().toLocaleTimeString())
    }

    function displayClock(){
        setDate(new Date().toDateString())
    }

    useEffect(() => {
        setInterval(setLiveTime,1000)
        setInterval(displayClock, 1000);
    }, []);

    return (
        // sticky top-0 z-50 backdrop-blur-sm bg-white/50

        <header className={"h-[8.3%] sticky top-0 z-50 backdrop-blur-sm bg-white/50  py-1 px-4 border-b flex flex-row items-center"}>

            <div className={"flex-1 font-Euclid flex flex-row items-center"}>

                <div className={"flex-1"}>
                    <button
                        className={"cursor-pointer p-1 rounded-lg bg-gray-100 hover:bg-gray-200"}
                        // onClick={() => setExpanded(value => !value)}>
                        onClick={() => props.callBack()}>
                        <BiMenu size={22}/>
                    </button>
                </div>


                <div className={"flex flex-row"}>
                    <div className={"flex flex-row cursor-pointer p-1 rounded-lg bg-gray-100 mr-3 text-sm"}>
                        <CiCalendarDate size={22} className={"mr-1"}/>
                        {date}
                    </div>

                    <div className={"flex flex-row cursor-pointer p-1 rounded-lg bg-gray-100 mr-3 text-sm"}>
                        <CiClock2 size={22} className={"mr-1"}/>
                        {time}
                    </div>
                </div>


            </div>


            <div className={"relative h-full w-max flex flex-row items-center justify-between"}>

                <img
                    src={`http://localhost:9000/images/${props.proPic}`}
                    className={"w-11 h-11 object-fill bg-center bg-cover rounded-[100%] mr-3"}
                    alt={"user"}
                    title={"profile photo"}
                />

                <div className="leading-4 mr-3 font-Euclid sm:block hidden">
                    <h4 className="font-[600]">{props.username}</h4>
                    <span className="text-xs text-gray-600">{props.email}</span>
                </div>

                <BiSolidChevronDown className={"cursor-pointer"} size={22}/>

                {/*<div className={"h-full w-12 bg-[url(src/assets/images/people/1.jpg)] object-fill bg-center bg-cover rounded-[100%]"}>*/}

                {/*</div>*/}
            </div>

        </header>

    )

}

export default Header