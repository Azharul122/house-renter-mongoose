import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../Hook/useAuthContext";

const Register = () => {
  const { dispatch } = useAuthContext();
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
      .post("https://mongose-house-renter.vercel.app/api/user/signup", data)
      .then((res) => {
        const json = res?.data;
        localStorage.setItem("user", JSON.stringify(json));
        if (res) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registrion success",
            showConfirmButton: false,
            timer: 2500,
          });
          console.log(data);
          dispatch({ type: "LOGIN", payload: res.data });
          if (data.role == "owner") {
            nevigate("/ower-dashboard");
          } else if (data.role == "renter") {
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
            <div className="full_name flex flex-col gap-2">
              <p>Full Name</p>
              <input
                className="w-full"
                {...register("full_name", { required: true })}
              />
              {errors.full_name && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="phone flex flex-col gap-2">
              <p>Phone</p>
              <input
                className="w-full"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
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
            <div className="phone flex flex-col gap-2">
              <p>Role</p>
              <select
                {...register("role", { required: true })}
                name="role"
                className="py-3 border px-2 border-[#001331] bg-[#001f3f] text-[#fff]"
                id=""
              >
                <option value="">Select role</option>
                <option value="owner">Owner</option>
                <option value="renter">Renter</option>
              </select>

              {errors.role && (
                <span className="text-red-400">This role is required</span>
              )}
            </div>

            <button
              className="py-2 px-1 w-full bg-gradient-to-r my-2 from-[#001f3f] to-[#fff]"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
