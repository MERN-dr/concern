import { 
    loginFailure,
    loginStart,
    loginSuccess,
    deleteAccountStart,
    deleteAccountSuccess,
    deleteAccountFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
};
export const deleteUser = async (dispatch, id) => {
    dispatch(deleteAccountStart());
    try{
        const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteAccountSuccess(id));
    }catch(err){
        dispatch(deleteAccountFailure());
    }
};
