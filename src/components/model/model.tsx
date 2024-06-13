import React from "react";
import { FaTrashAlt } from "react-icons/fa";

interface Props{
    open:boolean,
    onClose:any,
    children:React.ReactNode,
    icon?:any,
    handleFunction?:Function
}

function Model(props:Props){
    return(
        //backDrop
        <div  onClick={props.onClose} className={`fixed inset-0 flex justify-center items-center " +
            "transition-colors ${props.open ? "visible bg-black/20" : "invisible"} z-50`}>


            {/*model*/}

            <div
                onClick={e => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all
                            ${props.open ? "saturate-100 opacity-100" : "scale-125 opacity-0"}`}>

                <button className={"absolute top-1 right-3 p-1 rounded-lg " +
                    "text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 font-Euclid"}
                        onClick={props.onClose}>
                    x
                </button>


                <div className={"text-center w-56"}>


                    <div className={"mx-auto bg-red-200 rounded-[100%] w-max h-max p-4"}>
                        <FaTrashAlt size={40} className={"text-red-600"}/>
                    </div>

                    <div className={"mx-auto my-4 w-48 font-Euclid"}>
                        <h3 className={"text-lg font-black text-gray-800"}> Conform Delete</h3>
                        <p className={"text-sm text-gray-500"}>
                            Are you sure you want to delete this user?
                        </p>
                        <div className="flex gap-4 mt-4">
                            {/*<button className="btn btn-danger w-full">Delete</button>*/}
                            {/*<button className="btn btn-light w-full" onClick={() => setOpen(false)}>Cancel</button>*/}
                            {
                                props.children
                            }
                        </div>

                    </div>


                </div>


            </div>


        </div>
    )
}

export default Model;