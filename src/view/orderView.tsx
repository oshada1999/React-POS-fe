import React, {useEffect, useRef, useState} from "react";
import Input from "../components/input/input.tsx";
import {CiSearch, CiTrash, CiShare1 } from "react-icons/ci";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import Model from "../components/model/model.tsx";
import Alert from "../components/alert/alert.tsx";
import ItemPopUp from "../components/ItemPopUp/ItemPopUp.tsx";

export interface OrderDetailsInterface{
    itemId:string,
    qty:number,
    unitPrice:number
    amount:number
}

export interface OrderInterface {
    _id:string,
    date:string,
    totalQty:number,
    totalAmount:number,
    customerId:string,
    orderDetails:OrderDetailsInterface[]
}

const OrderView: React.FC = () => {

    const [dataArray, setDataArray] = useState<OrderInterface[]>([]);

    const [searchText, setSearchText] = useState("")

    const [pageNumber, setPageNumber] = useState(1)
    const [recodeCount, setRecodeCount] = useState(10)
    const [totalPages, setTotalPages] = useState()
    const [totalRecodes, setTotalRecodes] = useState()
    const [nextBtn, setNextBtn] = useState<boolean>(false)
    const [backBtn, setBackBtn] = useState(true)
    const inputRef = useRef(null);

    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const [alertOpen, setAlertOpen] = useState<boolean>(false)
    const [alertType, setAlertType] = useState<string>("")
    const [alertMsg, setAlertMsg] = useState<string>("")


    const [openItemPopUp, setOpenItemPopUp] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState('')
    const [itemList, setItemList] = useState<OrderDetailsInterface[]>([])

    ///////////// Pagination actions ///////////////////


    useEffect(() => {

        getAllRecodes()

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

        // @ts-ignore
        inputRef.current.value=pageNumber
    }, [pageNumber, recodeCount]);

    function selectRecodCount(e:any){
        setRecodeCount(e.target.value)
    }

    ///////////// Search actions ///////////////////

    useEffect(() => {


        if (searchText.length<=0){
            getAllRecodes()
        }else {
            getSearchItem()
        }

    }, [searchText]);

    function handleInput(e:any,name:string){

        let search = e.target.value;
        console.log(name+" : "+search)
        setSearchText(e.target.value)

    }

    async function getSearchItem(){

        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        await axios.get(`http://localhost:9000/order/get/order/${searchText}?size=${recodeCount}&page=${pageNumber}`,config)
            .then(response => {

                console.log(response.data.data)
                setDataArray(response.data.data)
                setTotalPages(response.data.totalPages)
                setTotalRecodes(response.data.totalRecodes)

            })
            .catch(error => {
                console.log(error)
            })
    }

    /////////////// Get All Order Details from database ///////////////////
    function getAllRecodes(){

        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        axios.get(`http://localhost:9000/order/get/all?size=${recodeCount}&page=${pageNumber}`,config)
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

    /////////////// Delete order from database ///////////////////

    const clickDeleteBtn = (id:string) => {

        setDeleteId(id)
        setOpen(true)

    }

    const handleDeleteItem = async () => {
      // alert(deleteId);

        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        await axios.delete(`http://localhost:9000/order/delete?id=${deleteId}`,config)
            .then(response => {
                console.log(response.data)
                showAlert('success',response.data.message)
            })
            .catch(error => {
                console.log(error)
                showAlert('error','')
            })
        setOpen(false)
        setDeleteId("")
        getAllRecodes();
    }

    /////////////// Handle showing alerts ///////////////////

    function showAlert(type:string,msg:string){
        setAlertType(type);
        setAlertMsg(msg);
        //Open alert
        setAlertOpen(true)
    }

    /////////////// Handle showing order details ///////////////////

    const showOrderDetails = (orderId:string, itenList:OrderDetailsInterface[]) => {
        setSelectedOrderId(orderId)
        setItemList(itenList)
        setOpenItemPopUp(true)
    }

    return(
        <>
            <section className={"w-full min-h-[100%] bg-white flex flex-col items-center rounded-md"}>

                {/*///////////////////// set pop up model ///////////////////*/}

                <Model open={open} onClose={() => setOpen(false)}>
                    <button key={'1'} className="btn btn-danger w-full" onClick={() => handleDeleteItem()}>Delete</button>
                    <button key={'2'} className="btn btn-light w-full" onClick={() => setOpen(false)}>Cancel</button>
                </Model>

                {/*///////////////////// set alert model ///////////////////*/}

                <Alert open={alertOpen}
                       type={alertType}
                       message={alertMsg}
                       onClose={() => setAlertOpen(false)}
                />

                {/*///////////////////// set order details model ///////////////////*/}

                <ItemPopUp
                    open={openItemPopUp}
                    onClose={() => setOpenItemPopUp(false)}
                    orderId={selectedOrderId}
                    itemList={itemList}
                />

                {/*///////////////// Page title /////////////////////////*/}
                <div className={" w-full h-max px-2 "}>
                    <label className={"font-Euclid text-2xl"}>
                        Manage Orders
                    </label>
                </div>



                {/*///////////////// Page Option /////////////////////////*/}
                <div className={"w-full h-max flex flex-row justify-between items-center px-2 mt-2"}>

                    <div className={""}>
                        {/*<CiFilter size={20}/>*/}



                        {/*//////////////  Search Box ///////////////////////*/}
                        <div
                            className={"bg-white w-[25rem] h-[48px] border-2 border-blue-500 rounded-md " +
                                "flex flex-row items-center justify-between"}>

                            <div className={"w-[90%]"}>
                                <Input
                                    id={"search"}
                                    value={searchText}
                                    type={"text"}
                                    placeholder={"Search order id here..."}
                                    required={false}
                                    callBack={handleInput}
                                    validate={true}
                                    borderColor={"5561F5"}
                                    borderRequired={false}
                                />
                            </div>

                            <div className={"flex-1 flex items-center justify-center"}>
                                <CiSearch string={40}/>
                            </div>
                        </div>
                    </div>
                </div>


                {/*-----------------------------Table container -----------------*/}

                <div className={"flex-1 w-full mt-1  px-3 pt-2 pb-2 min-h-[480px] "}>

                    <div
                        className={"scroll-bar border-x border-gray-200 rounded-[5px]" +
                            " min-h-[450px] h-max max-h-[690px] min-w-[503px]" +
                            " overflow-auto z-[20000] transition duration-150 ease-linear"}>

                        <table id={"userTable"}
                               className={"w-full font-Euclid text-[12px] rounded-md bg-gray-100 border-collapse " +
                                   "overflow-auto min-w-[503px]"}>

                            <thead className={"w-full bg-amber-200 rounded-t-md  min-h-5 sticky top-0 left-0"}>
                            <tr className={""}>
                                <th className={"py-2 text-left uppercase "}>order id</th>
                                <th className={"py-2 text-left uppercase "}>order date</th>
                                <th className={"py-2 text-left uppercase "}>total qty</th>
                                <th className={"py-2 text-left uppercase"}>total amount</th>
                                <th className={"py-2 text-left uppercase"}>customer id</th>
                                <th className={"py-2 text-center uppercase"}>action</th>
                            </tr>
                            </thead>

                            <tbody className={"mt-3 "}>


                            {
                                dataArray.map((value,index) => {


                                    return <tr key={index} className={`bg-white`}>

                                        <td className={"font-medium text-[13px] border-b text-left py-2.5"}>
                                            {value._id}
                                        </td>

                                        <td className={"font-medium text-[13px] border-b text-left max-w-[300px] py-2.5"}>
                                            {value.date}
                                        </td>

                                        <td className={"font-medium text-[13px] border-b text-left max-w-[300px] py-2.5"}>
                                            {value.totalQty}
                                        </td>

                                        <td className={"font-medium text-[13px] border-b text-left py-2.5"}>
                                            {value.totalAmount}
                                        </td>

                                        <td className={"font-medium text-[13px] border-b text-left py-2.5"}>
                                            {value.customerId}
                                        </td>

                                        <td className={" w-[10%] border-b text-center py-2.5"}>
                                            <button
                                                onClick={() => showOrderDetails(value._id,value.orderDetails)}
                                                // onClick={() => navigate('/admin/add-item', {
                                                //     state: {
                                                //         item: value,
                                                //         list: list
                                                //     }
                                                // })}
                                                className={"p-1 border border-black rounded-[6px] group" +
                                                    " hover:border-[#2355FF] mr-3"}>
                                                <CiShare1  size={18} className={"group-hover:text-[#2355FF] "}/>
                                            </button>

                                            <button
                                                className={"p-1 border rounded-[6px] group border-red-600 hover:bg-[#F4EBEF]"}
                                                // onClick={() => clickDeleteBtn(value._id)}
                                                onClick={() => clickDeleteBtn("5464867879")}
                                            >
                                                {/*<CiTrash size={18} className={"group-hover:text-red-600"}/>*/}
                                                <CiTrash size={18} className={"text-red-600"}/>
                                            </button>
                                        </td>

                                    </tr>

                                })
                            }


                            </tbody>

                        </table>

                    </div>


                    {/*// pagination container --------------------------------------------------*/}

                    <div
                        className={"font-Euclid text-sm w-full flex flex-row justify-between items-center bg-[#F9F9F9] p-3 rounded-b"}>

                        <div>
                            <label className={"mr-2"}>Show</label>
                            <select id="recodeLimit"
                                    className={"p-1 w-60px] h-[30px] text-center border border-gray-600 rounded outline-none"}
                                    onChange={(event) => selectRecodCount(event)}>
                                <option key={'1'} value={10} selected>10</option>
                                <option key={'2'} value={20}>20</option>
                                <option key={'3'} value={30}>30</option>
                                <option key={'4'} value={50}>50</option>
                                <option key={'5'} value={100}>100</option>
                            </select>
                            <label className={"ml-2"}>from <strong>{totalRecodes}</strong> recodes</label>
                        </div>


                        <label>Showing <strong>1</strong> of <strong> {totalPages} </strong> results </label>

                        <div className={" flex flex-row items-center justify-center"}>
                            <button id={"previewBtn"}
                                    className={`p-1 w-[30px] h-[30px] mr-3 rounded-[50%] flex-center hover:bg-gray-200 
                                ${pageNumber === 1 ? "cursor-not-allowed opacity-35" : "cursor-pointer opacity-100"}`}
                                    onClick={() => setPageNumber(value => value - 1)}
                                    disabled={backBtn}>
                                <IoIosArrowBack/>
                            </button>

                            <input ref={inputRef} id={"pageNumTxt"} type={"text"}
                                   className={"p-1 w-[30px] h-[30px] rounded-md border border-gray-600 text-center outline-none"}/>

                            <button id={"nextBtn"}
                                    className={`p-1 w-[30px] h-[30px] ml-3 rounded-[50%] flex-center hover:bg-gray-200 
                                ${pageNumber === totalPages ? "cursor-not-allowed opacity-35" : "cursor-pointer opacity-100"}`}
                                    onClick={() => setPageNumber(value => value+1)}
                                    disabled={nextBtn}>
                                <IoIosArrowForward/>
                            </button>
                        </div>
                    </div>
                </div>


            </section>

        </>
    )

}

export default OrderView;