import axios from "axios";
//import config from '../config/config.json'

export let axiosClient = axios.create({
    //baseURL: config["base-url"],
    timeout: 1000,
})

