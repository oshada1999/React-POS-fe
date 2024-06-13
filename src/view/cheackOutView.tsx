import Card from "../components/card/card.tsx";
import Input from "../components/input/input.tsx";
import BillsItem from "../components/billsItem/billsItem.tsx";
import { CiSearch } from "react-icons/ci";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Combobox from "../components/combobox/combobox.tsx";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {IoCard} from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import {ScanTable} from '@styled-icons/fluentui-system-filled/ScanTable'
import {OrderDto} from "../dto/orderDto.ts";
import {ItemDetailsDto} from "../dto/itemDetails.dto.ts";
import Cookies from "js-cookie";
// import { BsQrCodeScan } from "react-icons/bs";


interface BrandData {
    _id:string
    name:string,
    category:string
    image:string
}

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

interface BillItem {
    item:ItemData,
    qty:number,
    total:number
}

function CheackOutView(){

    const [brand, setBrand] = useState<string>("All")
    const [category, setCategory] = useState<string>('All')
    const [brandList, setBrandList] = useState<BrandData[]>([])

    const [dataArray, setDataArray] = useState<ItemData[]>([]);

    const [pageNumber, setPageNumber] = useState(1)
    const [recodeCount, setRecodeCount] = useState(5)
    const [totalPages, setTotalPages] = useState()
    const [totalRecodes, setTotalRecodes] = useState()
    const [nextBtn, setNextBtn] = useState<boolean>(false)
    const [backBtn, setBackBtn] = useState(true)

    const inputRef = useRef(null);

    const container1 = useRef(null);
    const container2 = useRef(null);

    const bill_container_1 = useRef(null);

    const [itemContainerHeight, setItemContainerHeight] = useState(0)
    const [billContainerHeight, setBillContainerHeight] = useState(0)

    const [bill_items, setBill_items] = useState<BillItem[]>([])
    const [total, setTotal] = useState(0)
    const [total_qty, setTotal_qty] = useState(0)

    const [searchText, setSearchText] = useState("")

    const list:any[]=[{text:"All"}]

    useEffect(() => {

        // @ts-ignore
        setItemContainerHeight((container1.current.offsetHeight - container2.current.offsetHeight))

        // @ts-ignore
        setBillContainerHeight((bill_container_1.current.offsetHeight - 285))
        // @ts-ignore
        console.log((bill_container_1.current.offsetHeight - 285))

        getAllItem()

        // @ts-ignore
        inputRef.current.value=pageNumber



    }, []);

    useEffect(() => {
        console.log(billContainerHeight + "  bill2")
    }, [billContainerHeight]);

    useEffect(() => {
        brandList.map((value: BrandData) => {
            list.push({text:value.name, icon:`http://localhost:9000/images/${value.image}`})
        })
    }, [brandList,list]);

    useEffect(() => {
        getFiltredBrands();
        getAllItem()
    }, [category,brand]);

    useEffect(() => {

        if(pageNumber === totalPages){
            setNextBtn(true)
        }else {
            setNextBtn(false)
        }

        if (pageNumber != 1){
            setBackBtn(false)
        }else {
            setBackBtn(true)
        }

        getAllItem()

        // @ts-ignore
        inputRef.current.value=pageNumber
    }, [pageNumber, recodeCount]);

    async function getFiltredBrands(){
        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        await axios.get(`http://localhost:9000/brand/get/all?size=-1&page=0&category=${category}`,config)
            .then(response => {

                console.log(response.data.data)

                setBrandList(response.data.data)

            })
            .catch(error => {
                alert(error)
            })
    }

    async function getAllItem(){

        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        await axios.get(`http://localhost:9000/item/get/all?size=${recodeCount}&page=${pageNumber}&category=${category}&brand=${brand}`,config)
            .then(response => {

                console.log(response.data.data)

                setDataArray(response.data.data)
                setTotalPages(response.data.totalPages)
                setTotalRecodes(response.data.totalRecodes)

            })
            .catch(error => {
                alert(error)
            })

    }

    function handleInput(e:any,name:string){

        let search = e.target.value;
        console.log(name+" : "+search)
        setSearchText(e.target.value)

    }

    useEffect(() => {


        if (searchText.length<=0){
            getAllItem()
        }else {
            getSearchItem()
        }

    }, [searchText]);

    async function getSearchItem(){

        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        await axios.get(`http://localhost:9000/item/get/search?name=${searchText}`,config)
            .then(response => {

                console.log(response.data.data)
                setDataArray(response.data.data)

            })
            .catch(error => {
                console.log(error)
            })
    }

    function cmbBoxStates(value:string,id:string){

        switch (id){
            case 'brands':
                setBrand(value)
                break;
            case 'category':
                setCategory(value)
                break;
            case 'recodes':
                setRecodeCount(parseInt(value))
        }

    }

    function setItemToArray(item:ItemData, qty:number){

        let temp_array=bill_items.slice();

        console.log(temp_array)

        if (temp_array.length===0){
            temp_array.push({item:item, qty:qty, total:(qty * item.salePrice)})
        }else {

            let index = findItemInArray(temp_array,item);

            if (index == -1){
                temp_array.push({item:item, qty:qty, total:(qty * item.salePrice)})
            }else {
                temp_array[index].qty += qty;
                temp_array[index].total = temp_array[index].qty * item.salePrice
            }
        }

        setBill_items(temp_array);

        countTotal(temp_array);
    }

    function countTotal(temp_array:BillItem[]){

        let temp_total=0;
        let temp_qty=0;
        temp_array.map(value => {
            temp_total = temp_total + value.total;
            temp_qty = temp_qty + value.qty;
        })

        setTotal(temp_total)
        setTotal_qty(temp_qty)
    }

    function findItemInArray(array:BillItem[], item:ItemData): number{

        for (let index in array){
            if (array[index].item._id == item._id) {
                return parseInt(index);
            }
        }

        return -1;
    }

    function removeFromCart(id:string){

        alert('delete : '+id)

        let delete_index= -1;

        let temp_array=bill_items.slice();

        for (let index in bill_items){
            if (bill_items[index].item._id == id) {
                delete_index=parseInt(index);
            }
        }

        if (delete_index != -1){
            temp_array.splice(delete_index,1)

            setBill_items(temp_array);
            countTotal(temp_array);
        }

    }

    function sentOrder(){

        let item_array: ItemDetailsDto[] = [];


        bill_items.map(value => {
            item_array.push(
                new ItemDetailsDto(
                    value.item._id,
                    value.qty,
                    value.item.salePrice,
                    value.total
                )
            )
        })

        let orderDetails =
            new OrderDto(
                new Date().toJSON().slice(0, 10),
                total_qty,
                total,
                "90771162V",
                item_array
            )

        console.log(orderDetails)

        alert("clear")
        clearForm()

    }

    function clearForm(){
        setBill_items([])
        setTotal(0)
        setTotal_qty(0)
        getAllItem()
    }


    return (
        <section className={"relative w-full h-[100%] flex flex-row items-center rounded-md"}>

            <div ref={container1} className={`w-[75%] h-[100%] bg-[#F9F8FB] px-3 flex flex-col items-center`}>

                <div ref={container2} className={"h-[167px] w-full flex flex-col"}>

                    <div className={"w-full h-max flex flex-row font-Poppins justify-between items-center"}>

                        {/*//////////////  Page Title ///////////////////////*/}

                        <strong className={"text-3xl font-[500]"}>Choose Products</strong>


                        {/*//////////////  Search Box ///////////////////////*/}
                        <div
                            className={"bg-white w-[25rem] h-[48px] rounded-md flex flex-row items-center justify-between"}>

                            <div className={"w-[90%]"}>
                                <Input
                                    id={"search"}
                                    value={searchText}
                                    type={"text"}
                                    placeholder={"Search products here..."}
                                    required={false}
                                    callBack={handleInput}
                                    validate={true}
                                    borderColor={"F76F2B"}
                                    borderRequired={false}

                                />
                            </div>

                            <div className={"flex-1 flex items-center justify-center"}>
                                <CiSearch string={40}/>
                            </div>

                        </div>

                    </div>

                    {/*//////////////  Filter Options ///////////////////////*/}

                    <div className={"w-max flex flex-row justify-center items-center"}>

                        <div className={"mr-3"}>
                            <Combobox id={'brands'}
                                      value={brand}
                                      placeholder={"Select brand"}
                                      label={"Select Brand"}
                                      callBack={cmbBoxStates}
                                      onlyIcon={true}
                                      item={list}/>
                        </div>

                        <div className={"mr-3"}>
                            <Combobox id={'category'}
                                      value={category}
                                      placeholder={"Select Category"}
                                      label={"Select Category"}
                                      callBack={cmbBoxStates}
                                      onlyIcon={false}
                                      item={[{text: "All"}, {text: "Laptop"}, {text: "Keyboard"}, {text: "Mouse"}]}/>
                        </div>

                        <div className={"mr-3"}>
                            <Combobox id={'recodes'}
                                      value={""}
                                      placeholder={"Select Recodes"}
                                      label={"Show Result"}
                                      callBack={cmbBoxStates}
                                      onlyIcon={false}
                                      item={[{text: "5"}, {text: "10"}, {text: "15"}, {text: "100"}]}/>
                        </div>
                    </div>

                    {/*//////////////  Pagination Options ///////////////////////*/}

                    <div className={"mt-3 font-Poppins flex flex-row w-full justify-between items-end"}>

                        <strong className={"text-lg font-[500]"}>All Items</strong>

                        <div className={"flex flex-row items-center justify-center"}>

                            <button id={"previewBtn"}
                                    className={`p-1 w-[30px] h-[30px] mr-3 rounded-[50%] flex-center hover:bg-gray-200 
                                ${pageNumber === 1 ? "cursor-not-allowed opacity-35" : "cursor-pointer opacity-100"}`}
                                    onClick={() => setPageNumber(value => value - 1)}
                                    disabled={backBtn}>
                                <IoIosArrowBack/>
                            </button>

                            <input ref={inputRef} id={"pageNumTxt"} type={"text"}
                                   className={"p-1 w-[30px] h-[30px] rounded-md border border-gray-300 text-center outline-none"}/>

                            <button id={"nextBtn"}
                                    className={`p-1 w-[30px] h-[30px] ml-3 rounded-[50%] flex-center hover:bg-gray-200 
                                ${pageNumber === totalPages ? "cursor-not-allowed opacity-35" : "cursor-pointer opacity-100"}`}
                                    onClick={() => setPageNumber(value => value + 1)}
                                    disabled={nextBtn}>
                                <IoIosArrowForward/>
                            </button>
                        </div>

                        <strong className={"text-sm font-[400] text-gray-400/70"}>{totalRecodes} {category} Results</strong>
                    </div>

                </div>

                {/*//////////////  Items Container ///////////////////////*/}

                <div
                    className={`w-full h-[445px] max-h-[${itemContainerHeight}px] mt-1 ` +
                        "  scroll-bar overflow-auto"}>


                    <div className={"flex flex-row justify-between flex-wrap gap-5 h-max"}>


                        {
                            dataArray.map((value,index) => {

                                let pic='';

                                brandList.map(brand => {
                                    if (brand.name == value.brand) {
                                        pic=`http://localhost:9000/images/${brand.image}`
                                    }
                                })

                                return <Card
                                    key={index}
                                    id={value._id}
                                    item={value}
                                    brandPic={pic}
                                    addFunction={setItemToArray}
                                />
                            })
                        }
                        {/*<Card/>*/}
                        {/*<Card/>*/}
                        {/*<Card/>*/}

                    </div>


                </div>

            </div>

            {/*//////////////  Cart/Bill Container ///////////////////////*/}

            <div ref={bill_container_1} className={`flex-1 h-[100%] bg-white sticky top-0 right-0 p-3 flex flex-col justify-between font-Poppins`}>

                <div className={"w-full text-3xl bg-teal-00 flex-1"}>
                    <h1 className={"font-[500] mb-1"}>Bills</h1>

                    <div
                        className={`w-full ${bill_items.length < 1 ? 'bg-[url(../src/assets/images/icon/empty_cart.png)]' : null} 
                        object-fill bg-center bg-cover overflow-auto scroll-bar`}
                        style={{maxHeight:`${billContainerHeight}px`, height:`${billContainerHeight}px`}}>

                        <div className={"w-full "}>
                            {

                                bill_items.map((value,index) => {
                                    return <BillsItem
                                        key={index}
                                        item={value.item}
                                        id={value.item._id}
                                        qty={value.qty}
                                        brandPic={value.item.itemPic}
                                        removeFunction={removeFromCart}
                                    />
                                })
                            }
                        </div>

                    </div>

                </div>
                <div className={"bg-red-00 w-full h-[220px] flex flex-col justify-between font-Poppins"}>

                    <div className={'w-full'}>

                        <div className={"w-full border-b border-dashed border-gray-500 mb-2"}>

                            <div className={"flex flex-row items-center justify-between text-[12px] font-[600] mb-1"}>

                                <p>Sub Total</p>
                                <p>{total}</p>

                            </div>

                            <div className={"flex flex-row items-center justify-between text-[#989898] text-[12px] font-[600] mb-1"}>

                                <p>Discount</p>
                                <p>00</p>

                            </div>

                        </div>

                        <div className={"w-full flex flex-row items-center justify-between text-[14px] font-[600]"}>
                            <p>Total</p>
                            <p>{total}</p>
                        </div>

                    </div>


                    <div className={"w-full"}>

                        <label className={"font-[500] text-sm"}>Payment Method</label>

                        <div className={"w-full flex flex-row items-center justify-between mt-2"}>

                            <div
                                className={"cursor-pointer bg-blue-100 border border-blue-500 rounded-xl w-1/4 min-h-[50px] text-blue-600 flex flex-col items-center justify-center"}>
                                <FaMoneyBill1Wave size={20}/>
                                <p className={"text-[10px]"}>Cash</p>
                            </div>
                            <div
                                className={"cursor-pointer bg-blue-100 border border-blue-500 rounded-xl w-1/4 min-h-[50px] text-blue-600 flex flex-col items-center justify-center"}>
                                <IoCard size={20}/>
                                <p className={"text-[10px]"}>Card</p>
                            </div>
                            <div
                                className={"cursor-pointer bg-blue-100 border border-blue-500 rounded-xl w-1/4 min-h-[50px] text-blue-600 flex flex-col items-center justify-center"}>
                                <ScanTable size={20}/>
                                <p className={"text-[10px]"}>E-Wallet</p>
                            </div>
                        </div>

                        <div className={"w-full h-max mt-3"}>
                            <button
                                onClick={sentOrder}
                                className={"shimmering-button shimmering-button-anime text-white bg-blue-600 text-sm h-10 w-full"}>Make
                                Payment
                            </button>
                        </div>

                    </div>

                </div>


            </div>

        </section>
    )

}

export default CheackOutView;