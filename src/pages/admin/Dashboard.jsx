import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtistWithEvents,
  getSoldTicketsData,
  getUsers,
} from "../../redux/dataSlice";

import { FaEdit } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

function Dashboard() {
  const dispatch = useDispatch();
  const { soldTickets, users, eventsWithArtists } = useSelector(
    (state) => state.data
  );
  useEffect(() => {
    dispatch(getSoldTicketsData());
    dispatch(getUsers());
    dispatch(getArtistWithEvents());
  }, [dispatch]);
  return (
    <div>
      <h1 className="text-4xl my-6">DASHBOARD</h1>
      <div className="flex flex-col xl:flex-row gap-y-4">
        {soldTickets && (
          <div className="ml-6 text-4xl  xl:w-1/3">
            <div className="bg-white p-3  rounded-t-3xl flex flex-col items-center h-[100px] justify-center">
              <span className=" text-gray-800 rounded-t-3xl flex flex-col-reverse  items-center ">
                <span> Sold Tickets</span> <AiFillDollarCircle size={50} />
              </span>
            </div>
            <div className="bg-gray-800 text-white rounded-b-3xl p-6  flex  justify-center h-[100px]">
              {soldTickets.soldCount}
            </div>
          </div>
        )}
        {users && (
          <div className="ml-6 text-4xl xl:w-1/3">
            <div className="bg-white p-3  rounded-t-3xl flex flex-col items-center h-[100px] justify-center">
              <span className=" text-gray-800 rounded-t-3xl flex flex-col-reverse  items-center ">
                <span>Registered Users</span> <FaUsers size={50} />
              </span>
            </div>
            <div className="bg-gray-800 text-white rounded-b-3xl p-6  flex  justify-center h-[100px]">
              {users.length}
            </div>
          </div>
        )}
        {eventsWithArtists && (
          <div className="ml-6 text-4xl xl:w-1/3">
            <div className="bg-white p-3  rounded-t-3xl flex flex-col items-center h-[100px] justify-center">
              <span className=" text-gray-800 rounded-t-3xl flex flex-col-reverse  items-center ">
                <span> Active Events</span> <MdEventAvailable size={50} />
              </span>
            </div>
            <div className="bg-gray-800 text-white rounded-b-3xl p-6  flex  justify-center h-[100px]">
              {eventsWithArtists.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
