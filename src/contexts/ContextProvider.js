import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => { },
    setUserToken: () => { }
});

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(null);

    const setUserToken = async(token) => {
        if(token) {
            await AsyncStorage.setItem('userToken', token.accessToken);
        } else {
            await AsyncStorage.removeItem('userToken');
        }

        _setUserToken(token);
    }

    return (
        <StateContext.Provider value={{ 
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken
         }}>
            {children}
        </StateContext.Provider>
    )
} 

export const useStateContext = () => useContext(StateContext)