import {CiEdit, CiSearch, CiTrash} from "react-icons/ci";
import Input from "../components/input/input.tsx";
import Cookies from "js-cookie";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
// import Model from "../components/model/model.tsx";

interface LogInDetailInterface {
    username:string,
    role:string,
    logInDate:string,
    logOutDate:string
}

function LoginDetailsView() {

    const [dataArray, setDataArray] = useState<LogInDetailInterface[]>([]);

    const [searchText, setSearchText] = useState("")

    const [pageNumber, setPageNumber] = useState(1)
    const [recodeCount, setRecodeCount] = useState(10)
    const [totalPages, setTotalPages] = useState()
    const [totalRecodes, setTotalRecodes] = useState()
    const [nextBtn, setNextBtn] = useState<boolean>(false)
    const [backBtn, setBackBtn] = useState(true)

    const inputRef = useRef(null);

    useEffect(() => {


        if (searchText.length<=0){
            getAllRecodes()
        }else {
            getSearchItem()
        }

    }, [searchText]);


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

        await axios.get(`http://localhost:9000/login/get/all/${searchText}?size=${recodeCount}&page=${pageNumber}`,config)
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

    /////////////// Get All Login Details from database ///////////////////
    function getAllRecodes(){

        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        axios.get(`http://localhost:9000/login/get/all?size=${recodeCount}&page=${pageNumber}`,config)
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

    return (
        <>

            <section className={"w-full min-h-[100%] bg-white flex flex-col items-center rounded-md"}>

                {/*///////////////// Page title /////////////////////////*/}
                <div className={" w-full h-max px-2 "}>
                    <label className={"font-Euclid text-2xl"}>
                        Login Details
                    </label>
                </div>


                {/*///////////////// Page Option /////////////////////////*/}
                <div className={"w-full h-max flex flex-row justify-between items-center px-2 mt-2"}>

                    <div className={""}>
                        {/*<CiFilter size={20}/>*/}



                        {/*//////////////  Search Box ///////////////////////*/}
                        <div
                            className={"bg-white w-[25rem] h-[48px] border-2 border-blue-500 rounded-md flex flex-row items-center justify-between"}>

                            <div className={"w-[90%]"}>
                                <Input
                                    id={"search"}
                                    value={searchText}
                                    type={"text"}
                                    placeholder={"Search username here..."}
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

                    {/*<button onClick={() => alert("111")}*/}
                    {/*        className={"px-3 py-2 bg-[#4455EF] hover:bg-[#2355FF] text-white font-Euclid" +*/}
                    {/*            " flex flex-row items-center cursor-pointer rounded-md"}>*/}
                    {/*    <CiCirclePlus size={20} className={"mr-2"}/>*/}

                    {/*    <span>Add User</span>*/}
                    {/*</button>*/}

                </div>

                {/*-----------------------------Table container -----------------*/}

                <div className={"flex-1 w-full mt-2  px-3 pt-2 pb-2 min-h-[480px] "}>

                    <div
                        className={"scroll-bar border-x border-gray-200 rounded-[5px]" +
                            " min-h-[450px] h-max max-h-[690px] min-w-[503px]" +
                            " overflow-auto z-[20000] transition duration-150 ease-linear"}>

                        <table id={"userTable"}
                               className={"w-full font-Euclid text-[12px] rounded-md bg-gray-100 border-collapse " +
                                   "overflow-auto min-w-[503px]"}>

                            <thead className={"w-full bg-amber-200 rounded-t-md  min-h-5 sticky top-0 left-0"}>
                            <tr className={""}>
                                <th className={"py-2 text-left uppercase "}>username</th>
                                <th className={"py-2 text-left uppercase "}>role</th>
                                <th className={"py-2 text-left uppercase "}>login date</th>
                                <th className={"py-2 text-left uppercase"}>logout date</th>
                                <th className={"py-2 text-center uppercase"}>action</th>
                            </tr>
                            </thead>

                            <tbody className={"mt-3 "}>


                            {
                                dataArray.map((value,index) => {


                                    return <tr key={index} className={`bg-white hover:bg-blue-100`}>

                                        <td className={"font-medium text-[13px] border-b text-left py-2.5"}>
                                            {value.username}
                                        </td>

                                        <td className={"font-medium text-[13px] border-b text-left py-2.5"}>
                                            {value.role}
                                        </td>

                                        <td className={"font-medium text-[13px] border-b text-left py-2.5"}>
                                            {value.logInDate}
                                        </td>

                                        <td className={"font-medium text-[13px] border-b text-left py-2.5"}>
                                            {value.logOutDate}
                                        </td>

                                        <td className={" w-[10%] border-b text-center py-2.5"}>
                                            <button
                                                // onClick={() => navigate('/admin/add-item', {
                                                //     state: {
                                                //         item: value,
                                                //         list: list
                                                //     }
                                                // })}
                                                className={"p-1 border border-black rounded-[6px] group" +
                                                    " hover:border-[#2355FF] mr-3"}>
                                                <CiEdit size={18} className={"group-hover:text-[#2355FF] "}/>
                                            </button>

                                            <button
                                                className={"p-1 border rounded-[6px] group border-red-600 hover:bg-[#F4EBEF]"}
                                                // onClick={() => clickDeleteBtn(value._id)}
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

export default LoginDetailsView;