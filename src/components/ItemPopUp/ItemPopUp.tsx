import React from "react";
import DetailsCard from "../DetailsCard/DetailsCard.tsx";


interface ItemList{
    itemId:string,
    qty:number,
    unitPrice:number
    amount:number
}

interface Props{
    open:boolean,
    onClose:any,
    // children:React.ReactNode,
    orderId:string,
    itemList: ItemList[],
    handleFunction?:Function
}

const ItemPopUp:React.FC<Props> = (props) => {

    return(
        <>

            {/*///////////// BackDrop /////////////////////*/}
            <div  onClick={props.onClose} className={`fixed inset-0 flex justify-center items-center " +
            "transition-colors ${props.open ? "visible bg-black/20" : "invisible"} z-50`}>

                {/*///////////// Model /////////////*/}

                <div
                    onClick={e => e.stopPropagation()}
                    className={`bg-white rounded-xl shadow p-6 transition-all
                            ${props.open ? "saturate-100 opacity-100" : "scale-125 opacity-0"}`}>

                    <button className={"absolute top-1 right-3 p-1 rounded-lg " +
                        "text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 font-Euclid"}
                            onClick={props.onClose}>
                        x
                    </button>

                    {/*///////////// Display order id /////////////////////*/}
                    <div className={"w-full h-max text-xl font-medium text-center font-Poppins"}>
                        Order Id - {props.orderId}
                    </div>

                    <div className={"bg-yellow-300/0 max-w-[700px] w-[700px] max-h-[500px] h-[500px] overflow-auto pt-3"}>

                        {
                            props.itemList.map((value,index) => {

                                return <DetailsCard key={index}
                                                    itemId={value.itemId}
                                                    amount={value.amount}
                                                    unitPrice={value.unitPrice}
                                                    qty={value.qty}
                                />

                            })
                        }

                    </div>

                </div>

            </div>

        </>
    )

}

export default ItemPopUp;