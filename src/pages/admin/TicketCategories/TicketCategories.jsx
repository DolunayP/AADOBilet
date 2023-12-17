import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTicketCategoryById,
  getAllTicketCategories,
  getTicketCategoriesWithEventId,
  getTicketOfEventById,
  getTickets,
} from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

function TicketCategories() {
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const {
    ticketCategories,
    ticketCategoriesByEvent,

    eventTicketsAdmin,
  } = useSelector((state) => state.data);
  const navigate = useNavigate();

  //const eventId = ticketCategories[0].events.id;

  console.log("eventTicketsAdmin", eventTicketsAdmin);

  useEffect(() => {
    dispatch(getAllTicketCategories());

    if (
      ticketCategories &&
      Object.keys(ticketCategories).length > 0 &&
      ticketCategories !== undefined
    ) {
      if (selectedEvent) {
        dispatch(getTicketCategoriesWithEventId(selectedEvent));
        dispatch(getTicketOfEventById(selectedEvent));
      }
    }
  }, [dispatch, selectedEvent]);

  const selectedEventObj = {
    eventId: selectedEvent,
    eventName: selectedEventName,
  };
  const uniqueEvents = [];

  if (ticketCategories) {
    ticketCategories.forEach((category) => {
      const eventId = category.events?.id;
      const eventName = category.events?.eventName;

      const foundEvent = uniqueEvents.find(
        (event) => event.eventId === eventId
      );

      if (!foundEvent) {
        uniqueEvents.push({ eventId, eventName });
      }
    });
  }

  // const uniqueEventNames = [
  //   ...new Set(ticketCategories.map((item) => item.events.eventName)),
  // ];

  return (
    <div className="min-h-[600px]  flex justify-center overflow-y-auto">
      <div className="grid place-items-center h-10 mt-32">
        <h1 className="text-4xl mb-6">TICKET CATEGORIES</h1>
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
                    <th className="p-4">Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {ticketCategoriesByEvent.map((ticketCategory, i) => (
                    <tr
                      key={ticketCategory.id}
                      className={`${i % 2 === 0 && "bg-gray-300"} `}
                    >
                      <td className="p-4">{ticketCategory.categoryName}</td>
                      <td>{ticketCategory.price}</td>
                      <td className="w-[300px]">
                        <div className="flex justify-evenly space-x-2">
                          <button
                            className="text-zinc-300 bg-red-800 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px] flex justify-center items-center space-x-2"
                            onClick={() => {
                              dispatch(
                                deleteTicketCategoryById(ticketCategory.id)
                              );
                            }}
                          >
                            <span> Delete</span>
                            <RiDeleteBin2Fill />
                          </button>
                          <button
                            className="text-zinc-300 bg-green-900 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px] flex justify-center items-center space-x-2"
                            onClick={() => {
                              navigate(
                                `/admin/TicketCategories/${ticketCategory.id}`,
                                {
                                  state: {
                                    ticketCategory,
                                    selectedEventObj,
                                  },
                                }
                              );
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
                  navigate("/admin/addTicketCategories", {
                    state: {
                      selectedEventObj,
                      isNew: true,
                    },
                  });
                }}
              >
                Add New Ticket Category
              </button>
            )}
          </div>

          {selectedEvent && (
            <div className="self-end mt-4">
              <button
                className="bg-gray-800 p-4 rounded-lg hover:bg-opacity-75 transition-all duration-200"
                onClick={() =>
                  navigate("/admin/addTicketCategories", {
                    state: {
                      selectedEventObj,
                    },
                  })
                }
              >
                Add Category
              </button>
            </div>
          )}

          {/* TICKETS */}

          <div className="flex justify-center items-center flex-col ">
            <h1 className="text-4xl mb-6">TICKETS</h1>
            {eventTicketsAdmin && (
              <div className=" bg-white text-black rounded-lg p-1">
                {Object.keys(eventTicketsAdmin).length > 0 ? (
                  <table className="w-full ">
                    <thead className="bg-color-primary text-white">
                      <tr>
                        <th className="p-4">Id</th>
                        <th className="p-4">Category Name</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">isAssign</th>
                        <th className="p-4">isSold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(eventTicketsAdmin).length > 0 &&
                        eventTicketsAdmin?.map((ticket, i) => (
                          <tr
                            key={ticket?.id}
                            className={`${
                              i % 2 === 0 ? "bg-gray-300" : "bg-white"
                            } text-black`}
                          >
                            <td>{ticket?.id}</td>

                            <td>{ticket?.ticketCategories.categoryName}</td>
                            <td>{ticket?.ticketCategories.price}</td>
                            <td>
                              {ticket?.isAssign ? "ASSIGNED" : "NOT ASSIGNED"}
                            </td>
                            <td>{ticket?.isSold ? "SOLD" : "FREE"}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div> There are no tickets on this event. </div>
                )}
              </div>
            )}
            {selectedEvent && (
              <div className="self-end mt-4">
                <button
                  className="bg-gray-800 p-2 rounded-lg hover:bg-opacity-75 transition-all duration-200"
                  onClick={() =>
                    navigate("/admin/addTicketPrice", {
                      state: {
                        selectedEventObj,
                        ticketCategoriesByEvent,
                      },
                    })
                  }
                >
                  Add Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCategories;
