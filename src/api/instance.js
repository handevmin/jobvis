import axios from "axios";

const instance = axios.create({
    baseURL : 'https://jobvis.herokuapp.com',
    headers:{
        "Content-Type" : "application/json"
    }
})

export default instance;