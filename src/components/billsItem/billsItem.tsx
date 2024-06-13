import { BsCartXFill } from "react-icons/bs";

interface ItemData{
    _id:string,
    code: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    regularPrice: number,
    salePrice: number,
    qty: number;
    warranty: string,
    stockStatus: boolean,
    itemPic: string
}

interface Prop {
    id:string,
    item:ItemData,
    qty:number,
    brandPic:string,
    removeFunction: Function
}

function BillsItem(props:Prop) {

    return (

        <div className={"w-full h-[75px] relative rounded-md bg-white p-1 mb-2 flex flex-row items-center justify-between group"}>
            {/*http://localhost:9000/images/*/}
            {/*src/assets/images/5a472cccbc31e5fa6025a3533cbb1577.jpg*/}
            <div className={"h-full mr-2"}>
                <img src={`http://localhost:9000/images/${props.brandPic}`}
                    // width={220} height={168}
                     title={"product"} alt={"photo"}
                     className={" transition-all rounded-xl w-full h-full max-w-[67px]"}
                />
            </div>

            <div className={"h-full flex-1 flex flex-col justify-around font-Poppins"}>

                <h1 className={"text-[12px] text-left font-[500]"}>{props.item.name}</h1>

                <div className={" w-full h-max flex flex-row justify-between items-center "}>

                    <span className={"text-[13px] max-h-max "}>x{props.qty}</span>

                    <div className={"text-[12px] "}>
                        <span className={"text-blue-900 bg-blue-100 border border-blue-500 px-2 py-[2px]  rounded-md"}>{props.item.salePrice}</span>
                    </div>

                    <span className={"text-[13px] max-h-max text-gray-500"}>{props.item.salePrice * props.qty}</span>

                </div>

            </div>

            <div className={"absolute top-2 right-2 hidden group-hover:block"} onClick={() => props.removeFunction(props.id)}>
                <BsCartXFill  size={15} className={"hover:text-red-600 cursor-pointer z-50 drop-shadow-3"}/>
            </div>

        </div>
    )

}

export default BillsItem;