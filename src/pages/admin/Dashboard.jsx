import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtistWithEvents,
  getSoldTicketsData,
  getUsers,
} from "../../redux/dataSlice";
import { getEventsWithArtist } from "../../backend/events/events";

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
      <div className="box flex flex-row ">
        {soldTickets && (
          <div className="ml-6 text-4xl w-1/3">
            <div className="bg-white p-3  rounded-t-3xl flex flex-col items-center h-[100px] justify-center">
              <span className=" text-gray-800 rounded-t-3xl">Sold Tickets</span>
            </div>
            <div className="bg-gray-800 text-white rounded-b-3xl p-6  flex  justify-center h-[100px]">
              {soldTickets.soldCount}
            </div>
          </div>
        )}
        {users && (
          <div className="ml-6 text-4xl w-1/3">
            <div className="bg-white p-3  rounded-t-3xl flex flex-col items-center h-[100px] justify-center">
              <span className=" text-gray-800 rounded-t-3xl">
                Registered Users
              </span>
            </div>
            <div className="bg-gray-800 text-white rounded-b-3xl p-6  flex  justify-center h-[100px]">
              {users.length}
            </div>
          </div>
        )}
        {eventsWithArtists && (
          <div className="ml-6 text-4xl w-1/3">
            <div className="bg-white p-3  rounded-t-3xl flex flex-col items-center h-[100px] justify-center">
              <span className=" text-gray-800 rounded-t-3xl">
                Active Events
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
