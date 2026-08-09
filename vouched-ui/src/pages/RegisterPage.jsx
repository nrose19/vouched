import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function RegisterPage(){
    const navigate = useNavigate();
    const { login } = useAuth();

    //form state
    const [formData, setFormData] = useState({ displayName: '', email: '', password: '' })

    //error state
    const [error, setError] = useState('');

    //loading state
        //maybe work on this later...with a loading animation?

    //handleChange
    function handleChange(e){
        setFormData(prev =>({...prev, [e.target.name]: e.target.value}))
    }

    //handleSubmit
   async function handleSubmit(e){
        e.preventDefault();
        
        try{
            const response = await registerUser(formData);
            login(response.data);
            navigate('/');
        } catch (err){
            setError(err.response?.data?.message || "Registration failed")
        }
    
    }


    return(
        <div className="min-h-screen flex items-center justify-center bg-paper-light">
            <div className="bg-paper rounded-2xl p-8 w-full max-w-sm">
                <h1 className="font-logo text-4xl text-center mb-6">Vouched</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="displayName"
                        type="text"
                        placeholder="Display name"
                        //value and onChange here
                        value={formData.displayName}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2"
                    />
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
                        Sign up!
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;