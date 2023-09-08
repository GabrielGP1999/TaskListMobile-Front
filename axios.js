import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { useNavigation } from "@react-navigation/native";

//TODO: COLOCAR BASE URL NO .ENV
const axiosClient = axios.create({
    baseURL: 'http://10.0.2.2:8000/api'
})

//const navigation = useNavigation();

axiosClient.interceptors.request.use((config)=> {
    config.headers.Authorization = `Bearer ${AsyncStorage.getItem('userToken')}`
    return config
})

axiosClient.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response && error.response.status === 401) {
        return error
    }
    throw error
})

export default axiosClient