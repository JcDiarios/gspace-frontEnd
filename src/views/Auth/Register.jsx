import { useState } from "react";
import "./Auth.css";
import http from "../../http/http";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();

    try {
      const api = http();
      const { data } = await api.post("/register", { name, email, password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="auth min-h-screen flex justify-center items-center bg-[url('./src/assets/Images/bg-feat.jpg')] bg-reapet-none bg-no-repeat	">
    <div className="p-10 border-2 border-gray rounded-lg border-l-8 border-l-green bg-white">
        <h3 className="text-center font-Bruno text-green text-4xl drop-shadow-lg mb-6">GSPACE</h3>
        <form className="flex-col justify-center" onSubmit={register}>
                <label htmlFor="text" className="font-Titilium">Username</label>
                <input type="text" className="w-full border-[1px] rounded-md border-gray mb-6" onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="email" className="font-Titilium">Email</label>
                <input type="email" className="w-full border-[1px] rounded-md border-gray mb-6" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password" className="font-Titilium" >Password</label>
                <input type="password" className="w-full border-[1px] rounded-md border-gray mb-6" onChange={(e) => setPassword(e.target.value)}/>
                
                <input type="submit" className="w-full py-2 bg-green rounded-lg hover:cursor-pointer hover:scale-105 transition-transform" />
        </form>
        <div className="mt-6">
            <span>Already have an account? <Link to="/login" className="text-green hover:border-b-[1px] border-green">Log In</Link></span>
        </div>
    </div>
</div>
  );
};

export default Register;