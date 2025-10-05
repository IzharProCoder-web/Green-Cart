/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  const onSubmitHandler = async (event) => {
    try{
    event.preventDefault();
    const {data} = await axios.post('/api/seller/login', {email, password},{withCredentials:true});
    if(data.success){
      setIsSeller(true)
      navigate('/seller')
    }else{
      toast.error(data.message)
    }

    }catch (err){
        toast.error(err.message)
    }
  };

  return (
    !isSeller && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-600">
            <span className="text-primary">Seller</span> Login
          </h2>
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
          >
            Login
          </button>
          <p className="text-xs text-center text-gray-500">
            Forgot your password?{" "}
            <a href="#" className="text-primary hover:underline">
              Reset it
            </a>
          </p>
        </form>
      </div>
    )
  );
};

export default SellerLogin;