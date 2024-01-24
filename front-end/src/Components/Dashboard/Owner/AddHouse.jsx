import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../../Hook/useAuthContext";

const AddHouse = () => {
  const { user } = useAuthContext();
  const nevigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, event) => {
    event.preventDefault();
    const houseData = {
      name: data.name,
      owner_email: user.email,
      address: data.address,
      city: data.city,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      room_size: data.room_size,
      picture: data.picture,
      availability_date: new Date(data.availability_date),
      rent_per_month: data.rent_per_month,
      phone: data.phone,
      Description: data.Description,
    };
    axios
      .post("https://mongose-house-renter.vercel.app/api/houses", houseData)
      .then((res) => {
        // name, owner_email, address, city, bedrooms, bathrooms, room_size, picture, availability_date, rent_per_month, phone, Description
        if (res) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registrion success",
            showConfirmButton: false,
            timer: 2500,
          });
          console.log(data);
          nevigate("/ower-dashboard");
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
    <div>
      <div className="AddHouseContainer py-7">
        <div className="w-[96%] md:w-[90%] mx-auto">
          <div className="flex justify-center items-center w-full  ">
            <form
              className="w-[500px] border p-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              {}
              {/* <p>name, owner_email, address, city, bedrooms, bathrooms, room_size, picture, availability_date, rent_per_month, phone, Description</p> */}
              <div className="full_name flex flex-col gap-2">
                <p>House Name</p>
                <input
                  className="w-full"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="address flex flex-col gap-2">
                <p>Address</p>
                <input
                  className="w-full"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="city flex flex-col gap-2">
                <p>City</p>
                <input
                  type=""
                  className="w-full"
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="bedrooms flex flex-col gap-2">
                <p>Bedrooms</p>
                <input
                  type=""
                  className="w-full"
                  {...register("bedrooms", { required: true })}
                />
                {errors.bedrooms && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="bathrooms flex flex-col gap-2">
                <p>Bathrooms</p>
                <input
                  type=""
                  className="w-full"
                  {...register("bathrooms", { required: true })}
                />
                {errors.bathrooms && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="room_size flex flex-col gap-2">
                <p>Room Size</p>
                <input
                  type=""
                  className="w-full"
                  {...register("room_size", { required: true })}
                />
                {errors.room_size && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="picture flex flex-col gap-2">
                <p>Photo Link</p>
                <input
                  type=""
                  className="w-full"
                  {...register("picture", { required: true })}
                />
                {errors.picture && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="availability_date flex flex-col gap-2">
                <p>Photo Link</p>
                <input
                  type="date"
                  className="w-full"
                  {...register("availability_date", { required: true })}
                />
                {errors.availability_date && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="rent_per_month flex flex-col gap-2">
                <p>Rent per month</p>
                <input
                  type="number"
                  className="w-full"
                  {...register("rent_per_month", { required: true })}
                />
                {errors.rent_per_month && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="phone flex flex-col gap-2">
                <p>Phone number</p>
                <input
                  type=""
                  className="w-full"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="Description flex flex-col gap-2">
                <p>Description</p>
                <input
                  type=""
                  className="w-full"
                  {...register("Description", { required: true })}
                />
                {errors.Description && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <button
                className="py-2 px-1 w-full bg-gradient-to-r my-2 from-[#001f3f] to-[#fff]"
                type="submit"
              >
                Add House
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHouse;
