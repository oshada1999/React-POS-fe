import {BiCaretLeft,  BiDotsVerticalRounded} from "react-icons/bi";
import React, {useContext, useEffect, useState} from "react";
import SidebarContext from "../../context/contexts"

interface Props{
    children:React.ReactNode
}

function Sidebar(props:Props) {

    const expanded = useContext(SidebarContext)
    const [expandedSide, setExpandedSide] = useState(true)

    useEffect(() => {
        setExpandedSide(expanded)
    }, [expanded]);

    return(
        <aside className={"h-screen w-max sticky top-0 left-0"}>
            <nav className={"h-full flex flex-col  border-r shadow-sm "}>

                <div className={`h-[8.3%]  p-4 pb-2 flex justify-between items-center ${expanded ? "w-full" : "w-max"}`}>

                    <img
                        src={"../src/assets/images/logo/NextGen_Logo.png"}
                        className={` overflow-hidden transition-all 
                                    ${expanded ? "w-[158px]" : "w-0" }`} alt={'icon'}/>

                    <button
                        onClick={() => setExpandedSide(value => !value)}
                        className={"p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"}>
                        {/*{!expanded ? <BiCaretRight /> : <BiCaretLeft/> }*/}
                        {!expanded ? <img src={"../src/assets/images/logo/logo-2.png"}
                                          width={35} height={24.9} alt={'icon'}/> : <BiCaretLeft/> }
                    </button>

                </div>

                {/*---------------------------------------------------*/}

                <SidebarContext.Provider value={expandedSide}>

                    <ul className={"flex-1 px-3"}>
                        {props.children}
                    </ul>

                </SidebarContext.Provider>

                {/*---------------------------------------------------*/}

                <div className={`border-t flex p-3`}>

                <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        // src="src/assets/images/people/1.jpg"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />

                    <div className={`flex justify-between items-center ml-3 
                    overflow-hidden transition-all ${expanded ? "w-[158px] ml-3" : "w-0" }`}>

                        <div className="leading-4 font-Euclid">
                            <h4 className="font-semibold">John Doe</h4>
                            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                        <BiDotsVerticalRounded size={20} className={"hover:cursor-pointer"}/>

                    </div>
                </div>


            </nav>
        </aside>
    )
}

export default Sidebar