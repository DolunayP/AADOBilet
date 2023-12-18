import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventById,
  getArtistWithEvents,
  getEvents,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

function EventsAdmin() {
  const dispatch = useDispatch();
  const { eventsWithArtists } = useSelector((state) => state.data);

  const navigate = useNavigate();

  console.log(eventsWithArtists);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  return (
    <div className="flex h-full items-center flex-col p-2 overflow-y-auto">
      <div className="bg-white text-black rounded-lg p-1">
        {Object.keys(eventsWithArtists).length > 0 ? (
          <table className="">
            <thead className="bg-color-primary text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Hour</th>
                <th className="p-4">Finish Hour</th>
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Category</th>
                <th className="p-4">Artists</th>
                <th className="p-4">IsFree</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(eventsWithArtists).length > 0 &&
                eventsWithArtists?.map((event, i) => (
                  <tr
                    key={event.id}
                    className={`${i % 2 === 0 && "bg-gray-300"} `}
                  >
                    <td>{event.eventName}</td>
                    <td>{event.eventHour}</td>
                    <td>{event.eventFinishHour}</td>
                    <td>{event.eventDate}</td>
                    <td>{event.eventLocation}</td>
                    <td>{event.category?.name}</td>
                    <td>
                      <select
                        name=""
                        id=""
                        className="rounded-lg p-2 bg-gray-500 text-white"
                      >
                        {event.artists &&
                          event.artists?.map((artist) => (
                            <option key={artist.eventId} value={artist.eventId}>
                              {artist.artistName}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td>{event.isFree ? "Free" : "Not Free"}</td>
                    <td className="w-[200px]">
                      <div className="flex gap-4 ml-4">
                        <button
                          className="text-zinc-300 bg-red-800 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[100px] flex justify-center items-center space-x-2"
                          onClick={() => {
                            dispatch(deleteEventById(event.id));
                          }}
                        >
                          <span> Delete</span>
                          <RiDeleteBin2Fill />
                        </button>
                        <button
                          className="text-zinc-300 bg-green-900 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[100px] flex justify-center items-center space-x-2"
                          onClick={() => {
                            navigate(`/admin/Event/${event.id}`, {
                              state: {
                                eventName: event.eventName,
                                eventHour: event.eventHour,
                                eventFinishHour: event.eventFinishHour,
                                eventDate: event.eventDate,
                                eventLocation: event.eventLocation,
                                categoryId: event.category.id,
                                isFree: event.isFree,
                              },
                            });
                          }}
                        >
                          <span>Update</span>
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-[600px] w-[1125px]">
            <HashLoader size={75} color="#1F2937" />
          </div>
        )}
      </div>
      {Object.keys(eventsWithArtists).length > 0 ? (
        <div className="self-end mt-4">
          <button
            className="bg-color-primary p-4 rounded-lg hover:bg-opacity-30 transition-all duration-200 w-[100px]"
            onClick={() => navigate("/admin/addEvent")}
          >
            Add
          </button>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}

export default EventsAdmin;
