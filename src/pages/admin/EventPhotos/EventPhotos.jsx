import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventPhotosById,
  fetchAllEventPhotos,
  getEventPhotosWithEvent,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

function EventPhotos() {
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const { eventPhotos, eventPhotosAdmin } = useSelector((state) => state.data);
  const navigate = useNavigate();

  //const eventId = ticketCategories[0].events.id;

  useEffect(() => {
    dispatch(fetchAllEventPhotos());

    if (
      eventPhotos &&
      Object.keys(eventPhotos).length > 0 &&
      eventPhotos !== undefined
    ) {
      if (selectedEvent) {
        dispatch(getEventPhotosWithEvent(selectedEvent));
      }
    }
  }, [dispatch, selectedEvent]);

  const selectedEventObj = {
    eventId: selectedEvent,
    eventName: selectedEventName,
  };
  const uniqueEvents = [];

  if (eventPhotos) {
    eventPhotos.forEach((eventPhoto) => {
      const eventId = eventPhoto.events?.id;
      const eventName = eventPhoto.events?.eventName;

      const foundEvent = uniqueEvents.find(
        (event) => event.eventId === eventId
      );

      if (!foundEvent) {
        uniqueEvents.push({ eventId, eventName });
      }
    });
  }

  console.log("selectedEventObj", selectedEventObj);

  // const uniqueEventNames = [
  //   ...new Set(ticketCategories.map((item) => item.events.eventName)),
  // ];

  return (
    <div className="min-h-[600px]  flex justify-center">
      <div className="grid place-items-center h-10 mt-32">
        <div className="bg-white text-black rounded-lg p-3 mb-4">
          <select
            name=""
            id=""
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              setSelectedEvent(selectedOption.value);
              setSelectedEventName(selectedOption.text);
            }}
          >
            {uniqueEvents.map((event) => (
              <option value={event.eventId}>{event.eventName}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center flex-col ">
          <div
            className=" bg-white text-black rounded-lg p-1"
            style={{ minWidth: "800px", overflowX: "auto" }}
          >
            {selectedEvent ? (
              <table className="w-full">
                <thead className="bg-color-primary text-white">
                  <tr>
                    <th className="p-4">Photo</th>

                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {eventPhotosAdmin.map((eventPhoto, i) => (
                    <tr
                      key={eventPhoto.id}
                      className={`${i % 2 === 0 && "bg-gray-300"} `}
                    >
                      <td className="p-4">{eventPhoto?.eventPhoto}</td>

                      <td className="w-[300px]">
                        <div className="flex justify-evenly space-x-2">
                          <button
                            className="text-zinc-300 bg-red-800 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px] flex justify-center items-center space-x-2"
                            onClick={() => {
                              dispatch(deleteEventPhotosById(eventPhoto.id));
                            }}
                          >
                            <span> Delete</span>
                            <RiDeleteBin2Fill />
                          </button>
                          <button
                            className="text-zinc-300 bg-green-900 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px] flex justify-center items-center space-x-2"
                            onClick={() => {
                              navigate(`/admin/EventPhoto/${eventPhoto.id}`, {
                                state: {
                                  eventPhoto,
                                  selectedEventObj,
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
              <div>You didn't select event! </div>
            )}
          </div>

          {selectedEvent && (
            <div className="self-end mt-4">
              <button
                className="bg-gray-800 p-4 rounded-lg hover:bg-opacity-75 transition-all duration-200"
                onClick={() =>
                  navigate("/admin/addEventPhoto", {
                    state: {
                      selectedEventObj,
                    },
                  })
                }
              >
                Add Photo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventPhotos;
