import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSeatById,
  fetchAllSeats,
  getSeatsAdminByEvent,
  getSeatsByEvent,
  getTickets,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

function Seats() {
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const { allSeats, seatsAdmin } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllSeats());

    if (
      allSeats &&
      Object.keys(allSeats).length > 0 &&
      allSeats !== undefined
    ) {
      if (selectedEvent) {
        dispatch(getSeatsAdminByEvent(selectedEvent));
      }
    }
  }, [dispatch, selectedEvent]);

  const selectedEventObj = {
    eventId: selectedEvent,
    eventName: selectedEventName,
  };
  const uniqueEvents = [];

  if (allSeats) {
    allSeats.forEach((seat) => {
      const eventId = seat.events?.id;
      const eventName = seat.events?.eventName;

      const foundEvent = uniqueEvents.find(
        (event) => event.eventId === eventId
      );

      if (!foundEvent) {
        uniqueEvents.push({ eventId, eventName });
      }
    });
  }

  return (
    <div className="min-h-[600px]  flex justify-center overflow-y-auto">
      <div className="grid place-items-center h-10 mt-32 ">
        <h1 className="text-4xl mb-6">SEATS</h1>
        <div className="bg-white text-black rounded-lg p-3 mb-4 ">
          <select
            name=""
            id=""
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              setSelectedEvent(
                selectedOption.value !== "chooseOne" ? selectedOption.value : ""
              );
              setSelectedEventName(selectedOption.text);
            }}
          >
            <option value="chooseOne">Choose One</option>
            {uniqueEvents.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                {event.eventName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center flex-col ">
          <div
            className=" bg-white text-black rounded-lg p-1 "
            style={{ minWidth: "800px", overflowX: "auto" }}
          >
            {selectedEvent ? (
              <table className="w-full">
                <thead className="bg-color-primary text-white">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4">Seat State</th>

                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {seatsAdmin.map((seat, i) => (
                    <tr
                      key={seat.id}
                      className={`${i % 2 === 0 && "bg-gray-300"} `}
                    >
                      <td className="p-4">{seat.seatName}</td>
                      <td>{seat.availability ? "Empty" : "Full"}</td>
                      <td>
                        {seat.status === "ASSIGNED"
                          ? "Assigned"
                          : seat.status === "SOLD"
                          ? "Sold"
                          : "Not Assigned"}
                      </td>

                      <td className="w-[300px]">
                        <div className="flex justify-end space-x-2">
                          {seat.status !== "ASSIGNED" &&
                            seat.status !== "SOLD" && (
                              <button
                                className="text-zinc-300 bg-gray-700 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[100px] flex justify-center items-center space-x-2"
                                onClick={() => {
                                  console.log("seatid", seat.id);
                                  navigate(`/admin/AssignTicket/${seat.id}`, {
                                    state: {
                                      seat,
                                      selectedEventObj,
                                    },
                                  });
                                }}
                              >
                                <span>Assign</span>
                                <MdOutlineAssignmentTurnedIn />
                              </button>
                            )}
                          <button
                            className="text-zinc-300 bg-red-800 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[100px] flex justify-center items-center space-x-2"
                            onClick={() => {
                              console.log("seatid", seat.id);
                              dispatch(deleteSeatById(seat.id));
                            }}
                          >
                            <span> Delete</span>
                            <RiDeleteBin2Fill />
                          </button>
                          <button
                            className="text-zinc-300 bg-green-900 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[100px] flex justify-center items-center space-x-2"
                            onClick={() => {
                              navigate(`/admin/Seats/${seat.id}`, {
                                state: {
                                  seat,
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
          <div className="self-end">
            {!selectedEvent && (
              <button
                className="bg-color-primary p-2 rounded-lg hover:bg-opacity-30 transition-all duration-200 mt-2"
                onClick={() => {
                  navigate("/admin/addSeat", {
                    state: {
                      selectedEventObj,
                      isNew: true,
                    },
                  });
                }}
              >
                Add New Seat
              </button>
            )}
          </div>

          {selectedEvent && (
            <div className="self-end mt-4">
              <button
                className="bg-gray-800 p-4 rounded-lg hover:bg-opacity-75 transition-all duration-200"
                onClick={() =>
                  navigate("/admin/addSeat", {
                    state: {
                      selectedEventObj,
                    },
                  })
                }
              >
                Add Seat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Seats;
