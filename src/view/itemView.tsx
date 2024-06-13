import {CiCirclePlus, CiEdit, CiTrash} from "react-icons/ci";
// import Model from "../components/model/model.tsx";
import Alert from "../components/alert/alert.tsx";
import Combobox from "../components/combobox/combobox.tsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Model from "../components/model/model.tsx";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

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

function ItemView() {

    const [brand, setBrand] = useState<string>("All")
    const [category, setCategory] = useState<string>('All')
    const [brandList, setBrandList] = useState<BrandData[]>([])

    const [dataArray, setDataArray] = useState<ItemData[]>([]);

    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const [pageNumber, setPageNumber] = useState(1)
    const [recodeCount, setRecodeCount] = useState(10)
    const [totalPages, setTotalPages] = useState()
    const [totalRecodes, setTotalRecodes] = useState()
    const [nextBtn, setNextBtn] = useState<boolean>(false)
    const [backBtn, setBackBtn] = useState(true)

    const inputRef = useRef(null);

    const [alertOpen, setAlertOpen] = useState<boolean>(false)
    const [alertType, setAlertType] = useState<string>("")
    const [alertMsg, setAlertMsg] = useState<string>("")

    const [userIdAdmin, setUserIdAdmin] = useState<boolean>(false)

    let navigate = useNavigate();

    const list:any[]=[{text:"All"}]

    useEffect(() => {

        let user_string = Cookies.get('user');

        let user = null;
        if (user_string){
            user = JSON.parse(user_string)

            if (user.role == 'admin'){
                setUserIdAdmin(true)
            }
        }


        getAllItem()

        // @ts-ignore
        inputRef.current.value=pageNumber
    }, []);

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
        if (!alertOpen) {
            setAlertMsg("")
        }
    }, [alertOpen]);


    // Pagination controller -------------------------------------------------------------------------

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

    function selectRecodCount(e:any){
        setRecodeCount(e.target.value)
    }


    function getAllItem(){

        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        axios.get(
            `http://localhost:9000/item/get/all?size=${recodeCount}&page=${pageNumber}&category=${category}&brand=${brand}`,
            config)
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

    // Get data to combo box -------------------------------------------------------------------------
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



    function cmbBoxStates(value:string,id:string){

        switch (id){
            case 'brands':
                setBrand(value)
                break;
            case 'category':
                setCategory(value)
                // getFiltredBrands();
                break;
        }

    }

    // Delete item ------------------------------------------------------------------------------------------------
    function clickDeleteBtn(id:string){
        setDeleteId(id)
        setOpen(true)
    }


    async function handleDeleteItem(){
        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        await axios.delete(`http://localhost:9000/item/delete?id=${deleteId}`,config)
            .then(response => {
                alert(response.data.message)
                console.log(response.data)
                showAlert('success',response.data.message)
            })
            .catch(error => {
                alert(error)
                console.log(error)
                showAlert('error','Something went wrong!')
            })
        setOpen(false)
        setDeleteId("")
        getAllItem()
    }

    function showAlert(type:string,msg:string){
        setAlertType(type);
        setAlertMsg(msg);
        //Open alert
        setAlertOpen(true)
    }

    // function print(){
    //     console.log(brand+" : "+category)
    //
    //     setAlertOpen(value => !value)
    // }

    return(
        <section className={"w-full min-h-[100%] bg-white flex flex-col items-center rounded-md"}>

            <div className={" w-full h-max px-2 "}>
                <label className={"font-Euclid text-2xl"}>
                    Item
                </label>
            </div>

            {/*<Alert open={alertOpen}*/}
            {/*       type={alertType}*/}
            {/*       message={alertMsg}*/}
            {/*       onClose={() => setAlertOpen(false)}*/}
            {/*/>*/}

            {/*--------------------------------------------------------------------------------------*/}

            <div className={"w-full h-max flex flex-row justify-between items-center px-2"}>

                <div className={"flex flex-row px-3"}>
                    {/*<CiFilter size={20}/>*/}

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
                                  placeholder={"Select Option"}
                                  label={"Select Option"}
                                  callBack={cmbBoxStates}
                                  onlyIcon={false}
                                  item={[{text: "All"}, {text: "Laptop"}, {text: "Keyboard"}, {text: "Mouse"}]}/>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/admin/add-item')}
                    className={`${userIdAdmin ? "block":'hidden'}  px-3 py-2 bg-[#4455EF] hover:bg-[#2355FF] text-white font-Euclid
                     flex flex-row items-center cursor-pointer rounded-md`}>
                    <CiCirclePlus size={20} className={"mr-2"}/>

                    <span>Add Item</span>
                </button>

                <Alert open={alertOpen}
                       type={alertType}
                       message={alertMsg}
                       onClose={() => setAlertOpen(false)}
                />

                <Model open={open} onClose={() => setOpen(false)}>
                    <button key={'1'} className="btn btn-danger w-full" onClick={() => handleDeleteItem()}>Delete</button>
                    <button key={'2'} className="btn btn-light w-full" onClick={() => setOpen(false)}>Cancel</button>
                </Model>
            </div>

            {/*//Table container --------------------------------------------------------------------------------*/}

            <div className={"flex-1 w-full  px-3 pt-2 pb-2 h-[500px]"}>

                <div
                    className={"scroll-bar border-x border-gray-200 rounded-[5px]" +
                        " min-h-[450px] h-max max-h-[690px] min-w-[503px]" +
                        " overflow-auto z-[20000] transition duration-150 ease-linear"}>

                    <table id={"userTable"}
                           className={"w-full font-Euclid text-[12px] rounded-md bg-gray-100 border-collapse " +
                               "overflow-auto min-w-[503px]"}>

                        <thead className={"w-full bg-amber-200 rounded-t-md  min-h-5 sticky top-0 left-0"}>
                        <tr className={""}>
                            <th className={"py-2 pl-2 text-left uppercase "}>item</th>
                            {/*<th className={"py-2 pl-2 text-left w-[15%]"}>ID</th>*/}
                            <th className={"py-2 text-left "}>CODE</th>
                            <th className={"py-2 text-left uppercase "}>description</th>
                            <th className={"py-2 text-center uppercase "}>category</th>
                            <th className={"py-2 text-left uppercase"}>brand</th>
                            <th className={"py-2 text-left uppercase"}>price</th>
                            <th className={"py-2 text-left uppercase"}>qty</th>
                            <th className={"py-2 text-center uppercase"}>war</th>
                            <th className={`${userIdAdmin ? "block":'hidden'} py-2 text-center`}>ACTION</th>
                        </tr>
                        </thead>

                        <tbody className={"mt-3 "}>


                        {
                            dataArray.map((value,index) => {

                                return <tr key={index}
                                           className={`${value.qty === 0 ? "bg-red-100/50" : "bg-white"}`}>
                                    <td className={`flex flex-row items-center border-b `}>
                                        <div>
                                            <img
                                                src={"http://localhost:9000/images/" + value.itemPic}
                                                className={"w-32 h-32 object-fill bg-center bg-cover mr-3"}
                                                alt={"item"}
                                                title={"Item"}
                                            />
                                        </div>
                                    </td>

                                    {/*<td className={`font-medium text-[13px] border-b text-left`}>*/}
                                    {/*    {value._id}*/}
                                    {/*</td>*/}

                                    <td className={"font-medium text-[13px] border-b text-left"}>
                                        {value.code}
                                    </td>

                                    <td className={"font-medium text-[13px] border-b text-left max-w-[300px]"}>
                                        {value.name}
                                    </td>

                                    <td className={"font-medium text-[13px] border-b text-center"}>
                                        <span
                                            className={"text-[#7600bc] bg-purple-400/30 py-1 px-4 rounded-full"}>
                                            {value.category}
                                        </span>
                                    </td>

                                    <td className={"font-medium text-[13px] border-b text-center"}>
                                        {
                                            brandList.map((brand,index) => {
                                                if (brand.name == value.brand) {
                                                    return <img
                                                        key={index}
                                                        src={`http://localhost:9000/images/${brand.image}`}
                                                        title={brand.name}
                                                        className={`w-[100px]`}
                                                        alt={"brand_icon"}/>
                                                }
                                            })
                                        }
                                    </td>

                                    <td className={"font-medium text-[13px] border-b text-left"}>
                                        {value.salePrice}
                                    </td>

                                    <td className={`font-medium text-[13px] border-b text-left 
                                                    ${value.qty === 0 ? "text-red-600" : "text-black"}`}>
                                        {value.qty}
                                    </td>

                                    <td className={"font-medium text-[13px] border-b text-center"}>
                                        {value.warranty}
                                    </td>

                                    <td className={`${userIdAdmin ? "table-cell":'hidden'} w-[10%] border-b text-center`}>
                                        <button
                                            onClick={() => navigate('/admin/add-item', {state:{item:value, list:list}})}
                                            className={"p-1 border border-black rounded-[6px] group" +
                                                " hover:border-[#2355FF] mr-3"}>
                                            <CiEdit size={18} className={"group-hover:text-[#2355FF] "}/>
                                        </button>

                                        <button
                                            className={"p-1 border rounded-[6px] group border-red-600 hover:bg-[#F4EBEF]"}
                                            onClick={() => clickDeleteBtn(value._id)}
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

                    <div className={` flex flex-row items-center justify-center`}>
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
    )
}

export default ItemView;