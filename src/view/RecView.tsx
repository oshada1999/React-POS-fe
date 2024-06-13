import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import SidebarContext from "../context/contexts.ts";
import Sidebar from "../components/sidebar/sidebar.tsx";
import SidebarItem from "../components/sidebarItems/sidebarItem.tsx";
import {CiAlignBottom, CiGrid42, CiMicrochip, CiPenpot, CiShop} from "react-icons/ci";
import Header from "../components/header/header.tsx";
import {Outlet} from "react-router-dom";

const RecView: React.FC = () => {

    const [expanded, setExpanded] = useState(true)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [proPic, setProPic] = useState("")

    useEffect(() => {
        //@ts-ignore
        let user: string = Cookies.get('user');
        setUsername(JSON.parse(user).username)
        setEmail(JSON.parse(user).email)
        setProPic(JSON.parse(user).proPic)
    }, []);

    function handleSidebar(){
        setExpanded(value => !value)
    }

    return(

        <>

            <section className={"flex flex-row"}>

                <SidebarContext.Provider value={expanded}>

                    <aside className={"w-max"}>
                        <Sidebar children={
                            [
                                <SidebarItem
                                    key={'1'}
                                    text={"Dashboard"}
                                    // icon={<BiSolidDashboard size={20}/>}
                                    icon={<CiGrid42 size={20}/>}
                                    navigate={"admin-dash"}
                                />,

                                <SidebarItem
                                    key={'3'}
                                    icon={<CiMicrochip size={20}/>}
                                    text={"Manage Items"}
                                    navigate={"item"}
                                />,

                                <SidebarItem
                                    key={'7'}
                                    icon={<CiShop size={23}/>}
                                    text={"Place Order"}
                                    navigate={"cart"}
                                />,

                                <SidebarItem
                                    key={'8'}
                                    icon={<CiPenpot size={22}/>}
                                    text={"Manage Orders"}
                                    navigate={"order"}
                                />
                            ]
                        }/>
                    </aside>

                </SidebarContext.Provider>


                <main id={"main-content"} className={"flex-1 flex flex-col"}>

                    <Header
                        username={`${username}`}
                        email={`${email}`}
                        proPic={`${proPic}`}
                        callBack={handleSidebar}
                    />

                    {/*------------------------------- Content here ----------------------------------*/}

                    {/*#EDEFEE*/}
                    <section className={"p-3 flex-1 flex justify-center items-center bg-[#F6F8FC]"}>

                        <Outlet/>

                    </section>


                </main>

            </section>

        </>

    )

}

export default RecView;