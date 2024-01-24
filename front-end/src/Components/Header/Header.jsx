import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hook/useAuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const handleLogout = () => {
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    navigate("/signup");
  };
  const { user } = useAuthContext();
  return (
    <div className="headerContainer py-7">
      <div className="w-[96%] md:w-[90%] mx-auto">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <img
              className="h-[40px]"
              src="https://png.pngtree.com/png-vector/20190224/ourmid/pngtree-vector-house-icon-png-image_701136.jpg"
              alt=""
            />
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <p>{user.email}</p>
              <button
                onClick={handleLogout}
                className="px-3 py-1  rounded text-black"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={"login"}
                className="cursor-pointer px-3 py-1  rounded text-black"
              >
                Login
              </Link>
              <Link
                to={"signup"}
                className="cursor-pointer px-3 py-1 bg-[#001331] rounded text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
