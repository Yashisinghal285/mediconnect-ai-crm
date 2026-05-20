import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (
      email === "admin@gmail.com" &&
      password === "123456"
    ) {

      localStorage.setItem("isLoggedIn", "true");

      navigate("/");

    } else {

      alert("Invalid Credentials");

    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-3xl font-bold mb-6 text-center">
          CRM Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;