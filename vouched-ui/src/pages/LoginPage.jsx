import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import loginBg from "../assets/gla_image.jpg";

function LoginPage(){
    const navigate = useNavigate();
    const { login } = useAuth();

    //formData state
    const [formData, setFormData] = useState({email:'', password:''})

    //error state
    const [error, setError] = useState('')

    //handlechange
    function handleChange(e){
        setFormData(prev=>({...prev, [e.target.name]:e.target.value}))
    }

    //handle submit
    async function handleSubmit(e){
        e.preventDefault();

        try{
            const response = await loginUser(formData);
            login(response.data);
            navigate('/');
        }catch (err){
            setError(err.response?.data?.message || "Login failed")
        }
    }

    return(
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${loginBg})`}}>
        <div className="absolute inset-0 bg-rosewood/60"/>
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-paper/80 rounded-2xl p-15 w-full max-w-lg z-50">
                <h1 className="text-rosewood text-7xl">Vouched</h1>

                <form onSubmit={handleSubmit} className="flex text-lg flex-col gap-4">
                    <input 
                        name="email"
                        type="email"
                        placeholder="Email"
                        //value and onChange here
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        //value and onChange here
                        value={formData.password}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2"
                    />
                    {error && <p className="text-brick text-sm">{error}</p>}
                    <button type="submit" className="font-display bg-rosewood text-paper-light rounded-lg py-2">
                        Login
                    </button>
                    <a href="/register" className="text-center">Not a user? Register now.</a>
                </form>
                
            </div>
        </div>
    </div>
    )

}

export default LoginPage;