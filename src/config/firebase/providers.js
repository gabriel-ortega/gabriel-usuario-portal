import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;
        const {isNewUser} = result._tokenResponse
        return {
            ok: true,
            isNewUser,
            // User info
            displayName, email, photoURL, uid         
        }

    }catch (error){
        console.log(error)
        return{
            ok: false
        }
    }
}

export const signInWithFacebook = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, facebookProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;
        const {isNewUser} = result._tokenResponse
        return {
            ok: true,
            isNewUser,
            // User info
            displayName, email, photoURL, uid            
        }

    }catch (error){
        console.log(error)
        return{
            ok: false
        }
    }
}

export const createuserWithEmail = async({email, password, displayName}) =>{

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        await updateProfile(FirebaseAuth.currentUser,{displayName});
        return{
            ok:true,
            uid, photoURL, email,displayName
        }


    }catch (error){
        return{
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginUserwithEmailAndPassword = async ({email, password}) =>{
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL, displayName} = resp.user;
        // console.log(resp)
        return{
            ok:true,
            uid, displayName,photoURL
        }
    }catch (error){
        return {
            ok: false,
            errorMessage:error.message
        }
    }

}

export const resetPassword = async(email) =>{
    try{
       await sendPasswordResetEmail(FirebaseAuth, email);
       return {
        ok:true
       }
    }catch (error) {
        return{
            ok:false,
            errorMessage:error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}
