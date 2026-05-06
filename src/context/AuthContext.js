import { createContext, useContext, useState } from "react";
import api from "../api/axiosConfig";


const AuthContext = createContext();

export const useAuth = ()=> useContext(AuthContext);

export const AuthProvider = ({children})=> {
    const [user,setUser] = useState(
        JSON.parse(localStorage.getItem('user')) ||null
    );

    const register = async (name,email, password)=>{
        try{
            const response = await api.post('/auth/register', {
                name,
                email,
                password
            });
            const {token, ...userData} =response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            setUser(userData);
            return {success : true};
        }
        catch(error){
            return{
                success: false,
                message: error.response?.data?.message 
                || 'Registration failed'
            };
        }
    };

    const login = async(email ,password) =>{
        try{
            const response = await api.post ('/auth/login', {
                email,password
            });
            const {token, ...userData} =response.data;


            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            setUser(userData);

            return { success :true};
        }
        catch(error){
            return{
                success:false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value ={
        user,
        login,
        register,
        logout,
        isLoggedIn :!!user

    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};