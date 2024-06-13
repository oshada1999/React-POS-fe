import {MdDeleteForever} from "react-icons/md";
import React from "react";

interface ItemDetails{
    itemId:string,
    qty:number,
    unitPrice:number
    amount:number
}

const DetailsCard :React.FC<ItemDetails> = (props) => {

    return(

        <>
            <li
                key={"5465465"}
                className={"w-[75%] border p-2 flex flex-row gap-1 mx-auto mb-2"}>

                {/*//////////////////// Image container ////////////////////*/}

                <div className={"h-[100px] mr-2"}>
                    {/*<img src={`http://localhost:8083/${props.brandPic}`}*/}
                    <img src={`http://localhost:9000/images/Savii99-1705561841014-297211223.jpg`}
                         title={"product"}
                         alt={"photo"}
                         className={" transition-all rounded-xl h-full w-[100px]"}
                    />
                </div>

                {/*//////////////////// Details container ////////////////////*/}

                <div className={"flex-1 h-[100px] bg-white font-Poppins flex flex-wrap"}>

                    <div className={"flex flex-col font-medium text-[13px] w-[100%]"}>
                        <label>Item</label>
                        <label>{props.itemId}</label>
                    </div>

                    <div className={"flex flex-col font-medium text-[13px] w-[40%]"}>
                        <label>Amount (Rs)</label>
                        <label className={"text-purple-500"}>{props.amount}</label>
                    </div>

                    {/*<div className={"flex flex-col font-medium text-[13px] w-[50%]"}>*/}
                    {/*    <label>Status</label>*/}
                    {/*    <label*/}
                    {/*        className={`${props.status === "active" ? "bg-green-200 text-green-500" : "bg-red-200 text-red-600"} px-2 rounded-md w-max`}>{props.status}</label>*/}
                    {/*</div>*/}

                    <div className={"flex flex-col font-medium text-[13px] w-[30%]"}>
                        <label>Unit Price</label>
                        <label>{props.unitPrice}</label>
                    </div>

                    <div className={"flex flex-col font-medium text-[13px] w-[15%]"}>
                        <label>Qty</label>
                        <label>{props.qty}</label>
                    </div>

                </div>

                {/*//////////////////// Options container ////////////////////*/}

                <div className={"h-[100px] w-[70px] flex flex-col gap-2 items-center justify-center"}>

                    {/*<button*/}

                    {/*    className={"flex items-center justify-center gap-1 text-green-600 text-[12px] font-Poppins font-[500] px-2 py-1 hover:bg-green-200/50 rounded-[10px]"}>*/}
                    {/*    <IoMdAdd size={15}/> Save*/}
                    {/*</button>*/}

                    <button
                        // onClick={deleteCallBackFun}
                        className={"flex items-center justify-center gap-1 text-red-600 text-[12px] " +
                            "font-Poppins font-[500] px-2 py-1 hover:bg-red-300/20 rounded-[10px]"}>
                        <MdDeleteForever string={18}/> Delete
                    </button>

                    {/*<button*/}
                    {/*    onClick={updateCallBackFun}*/}
                    {/*    className={"flex items-center justify-center gap-1 text-purple-900 text-[12px] font-Poppins font-[500] px-2 py-1 hover:bg-purple-300/50 rounded-[10px]"}>*/}
                    {/*    <RxUpdate string={15}/> Update*/}
                    {/*</button>*/}

                </div>

            </li>
        </>

    )

}

export default DetailsCard;