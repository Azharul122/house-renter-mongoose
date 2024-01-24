import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../Hook/useAuthContext";
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { dispatch, user } = useAuthContext();

  const nevigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, event) => {
    event.preventDefault();

    axios
      .post("https://mongose-house-renter.vercel.app/api/user/login", data)
      .then((res) => {
        if (res) {
          localStorage.setItem("user", JSON.stringify(res.data));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login success",
            showConfirmButton: false,
            timer: 2500,
          });
          dispatch({ type: "LOGIN", payload: res.data });
          if (user.role == "owner") {
            nevigate("/ower-dashboard");
          } else if (user.role == "renter") {
            nevigate("/renter-dashboard");
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data.error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.response.data.error}`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
        console.log(error);
      });

    reset();
  };
  return (
    <div className="SignUpContainer py-7">
      <div className="w-[96%] md:w-[90%] mx-auto">
        <div className="flex justify-center items-center w-full h-[70vh] ">
          <form
            className="w-[500px] border p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {}

            <div className="phone flex flex-col gap-2">
              <p>Email</p>
              <input
                type="email"
                className="w-full"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="phone flex flex-col gap-2">
              <p>Password</p>
              <input
                type="password"
                className="w-full"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>

            <button
              className="py-2 px-1 w-full bg-gradient-to-r my-2 from-[#001f3f] to-[#fff]"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
