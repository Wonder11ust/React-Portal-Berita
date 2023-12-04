import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SetCookie from "./hooks/setCookie";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      Swal.fire({
        title: "Berhasil Login",
        text: response.data.message,
        icon: "success"
      })
      SetCookie("token",response.data.token)
      axios.get("http://localhost:8000/api/me", {
        headers: {
          'Authorization': `Bearer ${response.data.token} `,
        }}).then(res=>{
          console.log(res.data.user);
          if(res.data.user.role_id === 1){
            history.push('/admin');
          }else if(res.data.user.role_id === 2 ){
            history.push('/writter');
          }if(res.data.user.role_id === 3 ){
            history.push('/');
          }
        })

      // Redirect to another page if needed
    } catch (error) {
      // Handle login error here\
      Swal.fire({
        title: "Gagal",
        text: error.response.data.message,
        icon: "error"
      })
      console.error("Login failed:", error.response.data.message);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  {/* <div>
                    <Link to="/auth/forgot-password">
                      <small className="text-blueGray-200">
                        Forgot password?
                      </small>
                    </Link>
                  </div> */}

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                {/* <Link to="/auth/forgot-password">
                  <small className="text-blueGray-200">Forgot password?</small>
                </Link> */}
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
