import { useEffect, useState } from "react";
import { useAuthContext } from "../Hook/useAuthContext";
import axios from "axios";

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

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
  return (
    <div>
      <div className="AddHouseContainer py-7">
        <div className="w-[96%] md:w-[90%] mx-auto">
          <div className="filterData"></div>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {houses.map((house) => (
              <div className="card border shadow-2xl" key={house._id}>
                <img className="w-full h-[250px]" src={house.picture} alt="" />

                <div className="flex flex-col gap-2 p-3">
                  <div className="flex items-center gap-2">
                    <p>{house.name.slice(0, 30)}...</p>
                    {/* name, owner_email, address, city, bedrooms, bathrooms, room_size, picture, availability_date, rent_per_month, phone, Description */}
                  </div>
                  <p>
                    {house.address},{house.city}
                  </p>
                  <div className="flex items-center justify-between">
                    <p>Bedrooms: {house.bedrooms}</p>
                    <p>Bathrooms: {house.bathrooms}</p>
                  </div>
                  <div className="flex items-center">
                    <p>Rome Size: {house.room_size}</p>
                  </div>

                  <p>
                    Availability date:{" "}
                    {new Date(house.availability_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                  <p>Rent per month: {house.rent_per_month}</p>
                  <p>Phone: {house.phone}</p>
                  <p>Description: {house.Description.slice(0, 40)}</p>
                  {user?.role == "renter" && (
                    <button className="px-4 py-2 bg-[#001f3f] border border-white text-white">
                      Rent Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
