import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { SiEventstore } from "react-icons/si";
import { GiRomanToga } from "react-icons/gi";
import { MdEventSeat } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { MdAddAPhoto } from "react-icons/md";
import { FaTicket } from "react-icons/fa6";
import { useState } from "react";

function AdminLayout({ children }) {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };
  return (
    <div>
      <div className="bg-gray-800 text-white h-screen flex">
        <div className="w-1/4">
          <div>
            <div className="mt-6 text-2xl">ADMIN PANEL</div>
            <ul className="m-10">
              <Link to="/admin/Dashboard">
                <li
                  className={`m-6 text-lg ${
                    activeMenu === "Dashboard"
                      ? "bg-green-700 text-white"
                      : "bg-white"
                  }  text-gray-700 p-3 rounded-lg font-bold flex justify-center items-center gap-3 w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
                  onClick={() => handleMenuClick("Dashboard")}
                >
                  <IoIosHome />
                  <span className="w-14 transition-all ">Dashboard</span>
                </li>
              </Link>
              <Link to="/admin/Events">
                <li
                  className={`m-6 text-lg ${
                    activeMenu === "Events"
                      ? "bg-green-700 text-white"
                      : "bg-white"
                  }  text-gray-700 p-3 rounded-lg font-bold flex justify-center items-center gap-3 w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
                  onClick={() => handleMenuClick("Events")}
                >
                  <SiEventstore />
                  <span className="w-14"> Events</span>
                </li>
              </Link>
              <Link to="/admin/Artists">
                <li
                  className={`m-6 text-lg ${
                    activeMenu === "Artists"
                      ? "bg-green-700 text-white"
                      : "bg-white"
                  }  text-gray-700 p-3 rounded-lg font-bold flex justify-center items-center gap-3 w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
                  onClick={() => handleMenuClick("Artists")}
                >
                  <GiRomanToga />
                  <span className="w-14"> Artists</span>
                </li>
              </Link>
              <Link to="/admin/Seats">
                <li
                  className={`m-6 text-lg ${
                    activeMenu === "Seats"
                      ? "bg-green-700 text-white"
                      : "bg-white"
                  }  text-gray-700 p-3 rounded-lg font-bold flex justify-center items-center gap-3 w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
                  onClick={() => handleMenuClick("Seats")}
                >
                  <MdEventSeat />
                  <span className="w-14"> Seats</span>
                </li>
              </Link>
              <Link to="/admin/Users">
                <li
                  className={`m-6 text-lg ${
                    activeMenu === "Users"
                      ? "bg-green-700 text-white"
                      : "bg-white"
                  }  text-gray-700 p-3 rounded-lg font-bold flex justify-center items-center gap-3 w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
                  onClick={() => handleMenuClick("Users")}
                >
                  <FaUsersLine />
                  <span className="w-14"> Users</span>
                </li>
              </Link>
              <Link to="/admin/Categories">
                <li
                  className={`m-6 text-lg ${
                    activeMenu === "Categories"
                      ? "bg-green-700 text-white"
                      : "bg-white"
                  }  text-gray-700 p-3 rounded-lg font-bold flex justify-center items-center gap-3 w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
                  onClick={() => handleMenuClick("Categories")}
                >
                  <BiSolidCategory />
                  <span className="w-14"> Categories</span>
                </li>
              </Link>
              <Link to="/admin/EventPhotos">
                <li
                  className={`m-6 text-lg ${
                    activeMenu === "EventPhotos"
                      ? "bg-green-700 text-white"
                      : "bg-white"
                  }  text-gray-700 p-3 rounded-lg font-bold flex justify-center items-center gap-3 w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
                  onClick={() => handleMenuClick("EventPhotos")}
                >
                  <MdAddAPhoto />
                  <span className="w-14"> Photo</span>
                </li>
              </Link>
              <Link to="/admin/TicketCategories">
                <li
                  className={`m-6 text-lg ${
                    activeMenu === "TicketCategories"
                      ? "bg-green-700 text-white"
                      : "bg-white"
                  }  text-gray-700 p-3 rounded-lg font-bold flex justify-center items-center gap-3 w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
                  onClick={() => handleMenuClick("TicketCategories")}
                >
                  <FaTicket />
                  <span className="w-14"> Ticket</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="text-2xl bg-gray-700 w-3/4 text-[16px]">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
