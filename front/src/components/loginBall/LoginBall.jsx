import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./loginBall.scss";
import EmailIcon from '@material-ui/icons/Email';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BackspaceIcon from '@material-ui/icons/Backspace';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useDispatch, useSelector, useStore } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import useFullPageLoader from "../../hooks/useFullPageLoader";


const LoginBall = () => {
    const [ballAction, setBallAction] = useState(["ball"]);
    const [container, setContainer] = useState("unvisible");
    const [pngwing, setPngwing] = useState(["pngwing bounce"]);
    const [input, setInput] = useState("input");

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const emailRef = useRef();
    const [err, setErr] = useState(false);
    const [formInput, setformInput] = useState("input inval");
    const [validationErr, setValidationErr] = useState(false);
    const [message, setMessage] = useState("");
    const history = useHistory()
    
    const [loginInput, setLoginInput] = useState("input inval");
    // const [loginPw, setloginPw] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);   

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const claschg = () => {
        let newArray 
        newArray = [...ballAction];
        newArray[0] = "foot";
        setBallAction(newArray);
        newArray = [...pngwing];
        newArray[0] = "pngwing imgbigger";
        setPngwing(newArray);
        setContainer("visible");
        
    };

    const handleStart = () =>{
        const validation = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        const emailValidation = validation.test(emailRef.current.value);
        if(emailValidation){
            setEmail(emailRef.current.value);
            setValidationErr(false);
        }else{
            setValidationErr(true);
        }

    };
    const signupStart = () =>{
        if(email !== emailRef.current.value){
            alert("your address has changed");
            setEmail(emailRef.current.value);
        }else{
            setformInput("input");
            setInput("input inval");
        }
    };
    const backLogin = () =>{
        history.push("/");
    }

    const handleFinish = async (e) =>{
        e.preventDefault();
        showLoader();
        if(password !== ""){
            try{
                await publicRequest.post("auth/register", {email,password},
                // {headers: {"Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials':true}}
                );
                hideLoader();
                history.push("/");
            }catch(err){
                console.log(err);
            }
        }
    };
    const loginFinish = (e) =>{
        showLoader();
        e.preventDefault();
        login(dispatch, { email, password });
    };
    useEffect(() => {
        showLoader();
        const emailCheck = async () =>{
            try {
                const res = await publicRequest.get("/auth/find/"+email);
                if(res.data.message){
                    setMessage(res.data.message);
                }else{
                    setInput("input inval");
                    setLoginInput("input");
                }

            }catch(err){
                console.log(err);
                setInput("input clickEvent");
                setErr(true);
            }
        }
        if(email){
            emailCheck();
        }
        setInput("input");
        setErr(false);
        setValidationErr(false);
        setMessage("");
        hideLoader();
    }, [email])

    return (
        <>
        <div className="login">
            <div className={ballAction}>
                <img src="/ball_bit.png" alt="pngwing" className={pngwing} onClick={claschg}/>
            
                <div className={container}>
                    <div className="inputGroup">

                    <div className={input}>
                        <EmailIcon className="icon"/>
                        <input type="email" placeholder="email address" ref={emailRef} />
                        {message && <span className="errCourse">{message}</span>}
                        {validationErr && <span className="errCourse"> You have entered invalid email address,<br/> please try again </span>}
                        {!err ? <PlayForWorkIcon className="button" onClick={handleStart}/> : <PersonAddIcon className="personAdd" onClick={signupStart}/>}
                        
                        {err && <div className="errCourse">
                            <BackspaceIcon className="backLogin"onClick={backLogin}/>
                            <span className="errEmail" >This is an unregistered email...<br/>if you want to sign up, please keep up</span>
                        </div>}
                    </div>

                    <div className={formInput}>
                        <VpnKeyIcon className="icon"/>
                        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} />
                        <PlayForWorkIcon className="button" onClick={handleFinish} />
                    </div>
                    
                    <div className={loginInput}>
                        <VpnKeyIcon className="icon"/>
                        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <PlayForWorkIcon className="button" onClick={loginFinish} disabled={isFetching} />
                    </div>

                    </div>
                </div>

            </div>
        </div>
        {loader}
        </>
    )
}

export default LoginBall
