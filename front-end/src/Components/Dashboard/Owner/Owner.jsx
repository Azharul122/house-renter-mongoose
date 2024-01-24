import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Hook/useAuthContext";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
const Owner = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const filterHouse = houses.filter((house) => house.owner_email == user.email);
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
  }, [houses]);

  const hamdleDelte = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `https://mongose-house-renter.vercel.app/api/houses/${id}`
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };
  return (
    <div className="ownerdashboard py-5">
      <div className="w-[96%] md:w-[90%] mx-auto">
        <div className="flex items-center justify-between">
          <p>House owner dashboard</p>
          <Link
            to={"/ower-dashboard/add-house"}
            className="cursor-pointer  flex items-center justify-center w-[50px] text-white h-[50px] rounded-full bg-[#001f3f]"
          >
            <IoAdd className="text-2xl hover:rotate-180 transition-all duration-500" />
          </Link>
        </div>
        <div className="table-container overflow-x-auto">
          <table className="table-auto overflow-y-auto">
            <thead>
              <tr className="bg-[rgb(0,31,63)] text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Bedrooms</th>
                <th className="px-4 py-2">Bathrooms</th>
                <th className="px-4 py-2">Room_size</th>
                <th className="px-4 py-2">Picture</th>
                <th className="px-4 py-2">Availability_date</th>
                <th className="px-4 py-2">Rent_per_month</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* name, owner_email, address, city, bedrooms, bathrooms, room_size, picture, availability_date, rent_per_month, phone, Description */}
              {filterHouse.map((fHouse) => (
                <tr key={fHouse._id} className="border">
                  <td className="px-4 py-2">{fHouse.name}</td>
                  <td className="px-4 py-2">{fHouse.address}</td>
                  <td className="px-4 py-2">{fHouse.city}</td>
                  <td className="px-4 py-2">{fHouse.bedrooms}</td>
                  <td className="px-4 py-2">{fHouse.bathrooms}</td>
                  <td className="px-4 py-2">{fHouse.room_size}</td>
                  <td className="px-4 py-2">
                    <img
                      className="w-50 h-50"
                      src={
                        fHouse.picture
                          ? fHouse.picture
                          : "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
                      }
                      alt=""
                    />
                  </td>

                  <td className="px-4 py-2">
                    {" "}
                    {new Date(fHouse.availability_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                  <td className="px-4 py-2">{fHouse.rent_per_month}</td>
                  <td className="px-4 py-2">{fHouse.phone}</td>
                  <td className="px-4 py-2">{fHouse.Description}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Link to={`/ower-dashboard/edit-house/${fHouse._id}`}>
                      <FiEdit className="text-green-300 text-xl cursor-pointer" />
                    </Link>
                    <Link>
                      <FaTrash
                        onClick={() => hamdleDelte(fHouse._id)}
                        className="text-red-400 text-xl cursor-pointer"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Owner;
