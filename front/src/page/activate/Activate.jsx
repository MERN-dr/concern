import { useParams } from "react-router-dom"
import { useHistory } from "react-router"
import { publicRequest } from "../../requestMethods";
import { useEffect } from "react";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const Activate = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    useEffect(() => {
        showLoader();
        const activeCheck = async () =>{
            try{
                const response = await publicRequest.get(`auth/activate/${id}`);
                if(response.status >= 400){
                    alert("error cannot validate an User");
                    history.push("/");
                }else{
                    history.push("/activated");
                }
            }catch(err){
            }
        }
        if(!id){
            alert("error cannot validate an User");
            history.push("/"); 
        }
        activeCheck();
        
    }, [])

    return (
        <div>
            {/* <span>{id}</span> */}
            {loader}
        </div>
    )
}

export default Activate
