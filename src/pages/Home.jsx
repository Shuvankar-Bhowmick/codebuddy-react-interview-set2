import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import GetSeats from "../Components/GetSeats";

const Home = () => {
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-4 flex items-center text-4xl font-bold">
        <Icon icon="mdi:home" className="mr-2" />
        Home
      </h1>

      <h2 className="mb-3 text-2xl">Welcome to the home page!</h2>

      <div className="mb-7">
        <GetSeats />
      </div>
    </div>
  );
};

export default Home;
