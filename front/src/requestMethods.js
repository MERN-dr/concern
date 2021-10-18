import axios from "axios";
let TOKEN = '';
let parser_first = JSON.parse(localStorage.getItem("persist:root"));

if(parser_first){
    let parser_second = JSON.parse(parser_first.user).currentUser
    if(parser_second){
        TOKEN = parser_second.accessToken;
    }
}

export const publicRequest = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export const userRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { token: `Bearer ${TOKEN}` },
});