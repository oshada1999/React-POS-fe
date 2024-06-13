import Input from "../components/input/input.tsx";
import {FcPrivacy, FcReddit} from "react-icons/fc";
import { HiArrowNarrowRight } from "react-icons/hi";
import {useState} from "react";
import axios, {AxiosResponse} from "axios";
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";

let elementById :HTMLElement = document.getElementById('password') as HTMLElement;

function Login() {

    const[isVisible ,setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const handleSetVisibleBtn = () => {
        if (isVisible){
            elementById.setAttribute("type", "password");
            setVisible(false)
        }else {
            // @ts-ignore
            document.getElementById('password').setAttribute("type", "text");
            setVisible(true)
        }
    }

    const handleInput = (e:any, type:string):void => {
        switch (type){
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    }

    const loginAction = () => {

        const headers={"content-type" : 'application/json'}

        let data = {
            username : username,
            password : password
        }


        axios.post('http://localhost:9000/user/auth',data,{headers:headers}).then(res => {

            // alert(res.data.message)

            console.log(res.data.data)
            Cookies.set('user', JSON.stringify(res.data.data.user), { expires: 7 })
            Cookies.set('tk',res.data.data.accessToken, { expires: 7 })

            //redirect to page
            if (res.data.data.user.role==='admin'){
                navigate('/admin/admin-dash')
            }else {
                navigate('/rec/cart')
            }

            addLoginRecode(res)

        }).catch(error => {
            // console.log(error)
            alert(error.response.data.message)
        })

    }

    const addLoginRecode =  (res:AxiosResponse) => {

        const today = new Date()

        const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': res.data.data.accessToken }
        };
        fetch(`http://localhost:9000/login/save?time=${date}`, requestOptions)
            .then(response => {
                console.log(response)
                alert('hari')
            })
            .catch(error => {
                console.log(error)
                navigate('/')
                alert("Something went wrong! Please login again.")
            })
    }

    return (
        <>
            <section className={"h-screen bg-white flex items-center justify-center "}>
                <div className={"w-[70%] h-[80%] bg-amber-50 rounded-xl flex flex-row drop-shadow-2xl"}>

                    <div
                        className={"w-[70%] h-full bg-amber-200 rounded-l-xl flex flex-col justify-center items-center"}>

                        <div
                            className={"bg-[url(assets/images/logo/NextGen_Logo.png)] w-[530px] h-[80px] bg-cover bg-center"}>
                        </div>


                    </div>

                    <div id={"login-form"}
                         className={"w-[30%] h-full bg-white rounded-r-xl flex flex-col justify-center items-center p-[20px]"}>

                        <div className={"flex flex-col justify-center items-center mt-5 mb-10"}>
                            <div
                                className={"bg-[url(assets/images/logo/logo-2.png)] w-[130px] h-[80px] bg-cover bg-center"}>
                            </div>

                            {/*<img src="assets/images/logo-2.png" className={"w-[300px] h-[70px]"} alt={'logo'}/>*/}

                            <h1 className={"font-Zet text-2xl font-bold text-fuchsia-900 mt-2"}>Welcome Back</h1>
                        </div>

                        <p className={"font-Poppins font-medium text-[13px] mt-2"}>Enter Your Login Details Here</p>

                        <div className={"mt-5 w-full px-2 "}>

                            <Input
                                id={"username"}
                                value={username}
                                type={"text"}
                                label={"Username"}
                                placeholder={"Enter Username"}
                                required={false}
                                callBack={handleInput}
                                borderRequired={true}
                                icon={<FcReddit/>}
                                validate={true}
                            />


                            <Input
                                id={"password"}
                                value={password}
                                type={"password"}
                                label={"Password"}
                                placeholder={"Enter Password"}
                                required={false}
                                callBack={handleInput}
                                icon={<FcPrivacy/>}
                                borderRequired={true}
                                validate={true}
                            />

                            <div className={"w-full flex items-center"}>
                                <input type={"checkbox"} className={"mr-3 "} onClick={handleSetVisibleBtn}/>
                                <label className={"text-[12px] font-medium text-[#2e2e2e]"}>Show Password</label>
                            </div>


                        </div>

                        <div className={"mt-5 w-full px-2 mb-auto"}>
                            <button
                                className={"w-full h-[40px] bg-gradient-to-r from-indigo-500 to-sky-500 text-white hover:bg-gradient-to-l from-[#3264F5] to-[#3297F5] rounded flex flex-row justify-center items-center"}
                                onClick={loginAction}>
                                Log in <span className={"ml-2 mt-1"}> <HiArrowNarrowRight/></span></button>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;