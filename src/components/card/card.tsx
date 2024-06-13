import { FaCartArrowDown } from "react-icons/fa";
import {useEffect, useState} from "react";

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
    brandPic:string,
    addFunction: Function
}

function Card(props:Prop){

    const [qty, setQty] = useState(1)

    // const [bgPic, setBgPic] = useState<string>("")

    useEffect(() => {
        // console.log("brand : "+props.brandPic)
        // console.log("brand : "+props.item.brand)
        // setBgPic("src/assets/images/logo/brand/rog_logo.png")
    }, []);

    return(
        <>
            {/*bg-amber-200*/}
         <div
             id={props.id}
             className={"w-[230px] h-[300px] bg-white rounded-xl overflow-hidden cursor-pointer border p-1 group "}>

             {/*src/assets/images/MSI-SWD17-A12UCX-I5-WHT-550x550.jpg*/}
             {/*bg-[url(src/assets/product/5a472cccbc31e5fa6025a3533cbb1577.jpg)]*/}
             <div
                 className={"relative w-full h-[70%] bg-red-300 transition-all overflow-hidden " +
                 "rounded-md group-hover:rounded-br-[0] bg-gradient object-fill bg-center bg-cover"}>

                 <img src={`http://localhost:9000/images/${props.item.itemPic}`}
                      // width={220} height={168}
                      title={"product"} alt={"photo"}
                      className={" transition-all rounded-md w-full h-full"}
                 />

                 <div className={`w-[70px] absolute bg-white/40 backdrop-blur-sm rounded-tl-md
                        object-fill bg-center bg-cover h-[34px] max-h-[34px] overflow-hidden top-0 rounded-br-lg`}
                      style={{ backgroundImage: `url(${props.brandPic})` }}
                 >

                     {/*<img src={`${props.brandPic ? `${props.brandPic}` : "src/assets/images/logo/brand/rog_logo.png"}`}*/}
                     {/*     width={70} alt={"icon"}*/}
                     {/*     className={""}/>*/}
                     {/*<div className={`relative w-full h-full bg-[url(${props.brandPic})]`}>*/}

                     {/*</div>*/}
                 </div>

                 <div className={"w-[0] h-[0] group-hover:h-[50px] group-hover:w-[50px] hover:text-teal-500 transition-all bg-white " +
                     "absolute bottom-0 right-0 rounded-tl-2xl flex items-center justify-center"}
                    onClick={() => props.addFunction(props.item , qty)}>
                     <FaCartArrowDown size={30} className={" transition-colors"}/>
                 </div>
             </div>

             <div className={"w-full h-[30%] bg-white flex flex-col justify-evenly "}>

                 <label className={"font-Poppins text-[12px] font-[500]"}>{props.item.name}</label>

                 <strong className={"font-Poppins text-[#9D2666] text-md font-[600] "}>Rs {props.item.salePrice}</strong>
             </div>
         </div>
        </>
    )

}

export default Card;