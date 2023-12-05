import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";
import LogOut from "views/auth/hooks/logOut";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState("");
  const history = useHistory();
  const token = Cookies.get("token");

  const me = () => {
    axios
      .get("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      });
  };

  console.log(user);

  useEffect(() => {
    me();
  }, []);

  const handleClick = () => {
    history.push("/search-article/" + searchTerm);
  };

  return (
    <nav className=" ">
      <div className="bg-gray-500  p-2">
        {/* Left side - Title` */}
        <div className=" w-full flex items-center justify-between max-w-screen-lg mx-auto">
          <div className="text-white  flex font-sans ">
            <span className="mr-2">No : 085157538999 </span> ||
            <span className="ml-2"> Email : BudiBerita@Gmail.com</span>
          </div>

          {/* Right side - Navigation Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/category" className="text-white hover:text-gray-300">
              Kategori
            </Link>
            <p className="font-bold text-white">||</p>
            {!user ? (
              <>
                <Link to="/auth/register" className="text-white hover:text-gray-300">
                  Register
                </Link>

                <Link to="/auth/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </>
            ) : (
              <LogOut />
            )}
          </div>
        </div>
      </div>
      <div className="p-8 w-full flex items-center justify-between max-w-screen-lg mx-auto  ">
        <p className=" text-4xl">Budi Berita</p>
        {user && <p>Selamat Datang {user.name}</p>}
      </div>
      <div className="bg-gray-200">
        <div className="w-full flex items-center justify-between max-w-screen-lg mx-auto p-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-black hover:text-gray-500">
              Home
            </Link>
            <Link to="/category" className="text-black hover:text-gray-500">
              Kategori
            </Link>
          </div>
          <div className="flex">
            <input type="text" placeholder="Cari Artikel di sini" className="mr-2 rounded" onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="rounded items-center bg-white px-3 py-2 flex" onClick={handleClick}>
              <span className="pr-1">Cari </span>
              <BsSearch />{" "}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
