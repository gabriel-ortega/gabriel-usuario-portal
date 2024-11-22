import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../LoginPage"
import { RegisterPage } from "../RegisterPage"
import { ResetPassword } from "../ResetPassword"

export const LoginRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
            <Route path="accountrestore" element={<ResetPassword/>}/>

            
            <Route path="/*" element={<Navigate to= "/auth/login"/>}/>
        </Routes>
    )
} 
