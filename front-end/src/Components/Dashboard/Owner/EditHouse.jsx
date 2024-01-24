import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditHouse = () => {
  const { id } = useParams();
  // const { fHouseData } = location.state;
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const singleHouse = houses.filter((house) => house?._id == id);

  const {
    name,
    owner_email,
    address,
    city,
    bedrooms,
    bathrooms,
    room_size,
    picture,
    availability_date,
    rent_per_month,
    phone,
    Description,
  } = singleHouse;
  console.log(name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mongose-house-renter.vercel.app/api/houses"
        );
        setHouses(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      .patch(
        `https://mongose-house-renter.vercel.app/api/houses/${id}`,
        houseData
      )
      .then((res) => {
        // name, owner_email, address, city, bedrooms, bathrooms, room_size, picture, availability_date, rent_per_month, phone, Description
        if (res) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update success",
            showConfirmButton: true,
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
            showConfirmButton: true,
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
              {singleHouse.map((sh) => (
                <div className="" key={sh._id}>
                  <div className="full_name flex flex-col gap-2">
                    <p>House Name</p>
                    <input
                      className="w-full text-white"
                      {...register("name", { required: true })}
                      defaultValue={sh.name}
                    />
                    {errors.name && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="address flex flex-col gap-2">
                    <p>Address</p>
                    <input
                      className="w-full"
                      {...register("address", { required: true })}
                      defaultValue={sh.address}
                    />
                    {errors.address && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="city flex flex-col gap-2">
                    <p>City</p>
                    <input
                      type=""
                      className="w-full"
                      {...register("city", { required: true })}
                      defaultValue={sh.city}
                    />
                    {errors.city && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="bedrooms flex flex-col gap-2">
                    <p>Bedrooms</p>
                    <input
                      type=""
                      className="w-full"
                      {...register("bedrooms", { required: true })}
                      defaultValue={sh.bedrooms}
                    />
                    {errors.bedrooms && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="bathrooms flex flex-col gap-2">
                    <p>Bathrooms</p>
                    <input
                      type=""
                      className="w-full"
                      {...register("bathrooms", { required: true })}
                      defaultValue={sh.bathrooms}
                    />
                    {errors.bathrooms && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="room_size flex flex-col gap-2">
                    <p>Room Size</p>
                    <input
                      type=""
                      className="w-full"
                      {...register("room_size", { required: true })}
                      defaultValue={sh.room_size}
                    />
                    {errors.room_size && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="picture flex flex-col gap-2">
                    <p>Photo Link</p>
                    <input
                      type=""
                      className="w-full"
                      {...register("picture", { required: true })}
                      defaultValue={sh.picture}
                    />
                    {errors.picture && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="availability_date flex flex-col gap-2">
                    <p>Photo Link</p>
                    <input
                      type="date"
                      className="w-full"
                      {...register("availability_date", { required: true })}
                      defaultValue={
                        new Date(sh.availability_date)
                          .toISOString()
                          .split("T")[0]
                      }
                    />
                    {errors.availability_date && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="rent_per_month flex flex-col gap-2">
                    <p>Rent per month</p>
                    <input
                      type="number"
                      className="w-full"
                      {...register("rent_per_month", { required: true })}
                      defaultValue={sh.rent_per_month}
                    />
                    {errors.rent_per_month && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="phone flex flex-col gap-2">
                    <p>Phone number</p>
                    <input
                      type=""
                      className="w-full"
                      {...register("phone", { required: true })}
                      defaultValue={sh.phone}
                    />
                    {errors.phone && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="Description flex flex-col gap-2">
                    <p>Description</p>
                    <input
                      type=""
                      className="w-full"
                      {...register("Description", { required: true })}
                      defaultValue={sh.Description}
                    />
                    {errors.Description && (
                      <span className="text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>

                  <button
                    className="py-2 px-1 w-full bg-gradient-to-r my-2 from-[#001f3f] to-[#fff]"
                    type="submit"
                  >
                    Update House
                  </button>
                </div>
              ))}
              {/* <p>name, owner_email, address, city, bedrooms, bathrooms, room_size, picture, availability_date, rent_per_month, phone, Description</p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHouse;
