import { CgChevronDown } from "react-icons/cg";
import {useEffect, useState} from "react";

interface Item{
    text:string,
    icon?:any
}

interface Props {
    id:string,
    value:string,
    placeholder:string,
    label?:string,
    item:Item[],
    onlyIcon:boolean,
    callBack: Function;
}

function Combobox(props:Props) {

    const [isDown, setIsDown] = useState<boolean>(true)

    const [placeholder, setPlaceholder] = useState<string>(props.item[0].text)
    const [icon, setIcon] = useState("")

    // const [selectValue, setSelectValue] = useState<Item>(null)

    useEffect(() => {
        props.label ?
            setPlaceholder(props.item[0].text) : setPlaceholder(props.placeholder)

        props.item.map(value => {
            if(value.text===props.value){
                console.log(value)
                clickFun(value.text, value.icon)
            }
        })

        if (props.value){
            setPlaceholder(props.value)
        }


    }, []);

    // notify parent component about new value
    useEffect(() => {
        console.log(placeholder)

        props.callBack(placeholder,props.id)
    }, [placeholder]);


    function clickFun(text:string, icon:string){
        setPlaceholder(text)
        setIcon(icon)
        setIsDown(true)
    }

    return(
        <div
            id={props.id}
            className={" font-Euclid cursor-pointer my-1 relative mr-0"}>
            <label className={`flex flex-col w-full font-Euclid mb-[2px] flex-wrap 
            text-[12px] font-medium text-[#2e2e2e]
            ${props.label ? "block" : "hidden"}`}>
                {props.label}
            </label>

            {/*-------------------------------------------------------------------------*/}

            <div
                onClick={() => setIsDown(value => !value)}
                className={"min-w-[230px] border rounded-md shadow drop-shadow-4 overflow-hidden" +
                    " flex flex-row items-center justify-between h-[45px] p-5 font-[400]"}>
                <img src={icon}
                     className={`w-[100px] ${props.onlyIcon ? "mr-0" : "mr-5"} 
                     ${icon ? "block" : "hidden"}`}
                     alt={'icon'}
                     title={placeholder}/>
                <span className={`${icon ? "hidden" : "block"}`}>{placeholder}</span>
                <CgChevronDown
                    className={`${isDown ? null : "rotate-180"} transition-all`}/>
            </div>

            <ul
                className={`absolute w-full max-h-[200px] bg-white shadow rounded-md mt-3 overflow-y-auto scroll-bar
                            ${isDown ? "h-0" : "h-fit p-4 "} transition-all z-50`}>

                {/*<li*/}
                {/*    // id={value.text}*/}
                {/*    onClick={() => clickFun('msi')}*/}
                {/*    onClickCapture={() => props.callBack('msi', 'msi')}*/}
                {/*    className={`relative flex flex-row items-center justify-center h-[45px] cursor-pointer overflow-hidden */}
                {/*                        bg-white rounded-md px-2 hover:bg-[#F2F2F2] ${isDown ? "hidden" : "block"}`}>*/}
                {/*    /!*<div*!/*/}
                {/*    /!*    className={"bg-[url(src/assets/images/logo/brand/MSI.png)] object-fill bg-center bg-cover" +*!/*/}
                {/*    /!*        " w-[100px] h-[80%] mr-5"}></div>*!/*/}
                {/*    <img src={'src/assets/images/logo/brand/MSI.png'} className={"w-[100px]"}/>*/}
                {/*    <span className={`text-[14px]`}>{props.label}</span>*/}
                {/*</li>*/}


                {
                    props.item.map((value,index) => {

                        return <li
                            key={index}
                            id={value.text}
                            onClick={() => clickFun(value.text, value.icon)}
                            // onClickCapture={() => props.callBack(value.text, props.id)}
                            className={`relative flex flex-row items-center h-[45px] cursor-pointer  
                                        bg-white rounded-md px-2 hover:bg-[#F2F2F2]  overflow-hidden
                                        ${value.icon ? "justify-center" : null}
                                        ${isDown ? "hidden" : "block"}`}>
                            <img src={value.icon}
                                 className={`w-[100px] 
                                 ${props.onlyIcon ? "mr-0" : "mr-5"} 
                                 ${value.icon ? "block" : "hidden"}`}
                                 alt={'icon'}
                                 title={value.text}/>
                            <span className={`text-[14px] ${value.icon ? "hidden" : "block"}`}>{value.text}</span>
                        </li>

                    })
                }
            </ul>

        </div>
    )
}

export default Combobox;