import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import loginBg from "../assets/dual_city_bg_image.jpg";

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
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-paper rounded-2xl p-8 w-full max-w-sm">
                <h1 className="text-rosewood font-logo text-5xl text-center mb-6">Vouched</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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