import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../config/firebase/config";
import { getUserData } from "../store/userData";



export const useCheckAuth = () => {
 
    const {status} = useSelector(state =>state.auth);
    const dispatch = useDispatch();

    useEffect(() =>{
        onAuthStateChanged(FirebaseAuth, async(user)=>{
         if (!user) return dispatch(logout());
        const {uid, email, displayName, photoURl} =user;
         dispatch ( login({uid, email, displayName, photoURl}))
         dispatch(getUserData(uid))
        })

    }, []);
    return{
        status
    }
}
