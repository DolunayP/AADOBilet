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

  if (eventPhotos && eventPhotos.length > 0) {
    eventPhotos.forEach((eventPhoto) => {
      const eventId = eventPhoto.events?.id;
      const eventName = eventPhoto.events?.eventName;
      const foundEvent = uniqueEvents.find(
        (event) => event.eventId === eventId
      );

      if (!foundEvent && eventId && eventName) {
        uniqueEvents.push({ eventId, eventName });
      }
    });
  }

  // const uniqueEventNames = [
  //   ...new Set(ticketCategories.map((item) => item.events.eventName)),
  // ];

  return (
    <div className="flex h-full items-center  flex-col p-2 overflow-x-scroll min-w-[75%] ">
      <h1 className="text-4xl mb-6 mt-32">EVENT PHOTOS</h1>
      <div className="w-full md:w-64 text-black rounded-lg p-3 mb-4 ">
        <select
          name=""
          className="w-full md:w-64 rounded-lg p-4 border-4 outline-none"
          id=""
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];

            setSelectedEvent(
              selectedOption.value !== "chooseOne" ? selectedOption.value : ""
            );
            setSelectedEventName(selectedOption.text);
          }}
        >
          <option value="chooseOne">Choose event</option>
          {uniqueEvents?.map((event) => (
            <option value={event.eventId}>{event.eventName}</option>
          ))}
        </select>
      </div>

      <div className="bg-white text-black rounded-lg p-1  mx-auto ">
        {selectedEvent ? (
          <table className="min-w-[75%] mx-auto">
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

      <div className="">
        {!selectedEvent && (
          <button
            className="bg-color-primary p-2 rounded-lg hover:bg-opacity-30 transition-all duration-200 mt-2 w-64"
            onClick={() => {
              navigate("/admin/addEventPhoto", {
                state: {
                  selectedEventObj,
                  isNew: true,
                },
              });
            }}
          >
            Add New Photo
          </button>
        )}
      </div>

      {selectedEvent && (
        <div className="mt-4">
          <button
            className="bg-gray-800 p-4 rounded-lg hover:bg-opacity-75 transition-all duration-200 w-64"
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
  );
}

export default EventPhotos;
