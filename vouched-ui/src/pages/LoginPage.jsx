import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

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
        <div className="min-h-screen flex items-center justify-center bg-paper-light">
            <div className="bg-paper rounded-2xl p-8 w-full max-w-sm">
                <h1 className="font-logo text-4xl text-center mb-6">Vouched</h1>

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
                </form>
                <button type="submit" className="font-display bg-rosewood text-paper-light rounded-lg py-2">
                    Login
                </button>
                <a href="/register">Not a user? Register now.</a>
            </div>
        </div>
    )

}

export default LoginPage;