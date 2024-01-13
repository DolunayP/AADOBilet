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
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };
  return (
    <div className=" text-white h-screen flex relative">
      <div
        onClick={toggleMenu}
        className="text-3xl absolute left-8 top-5 cursor-pointer xl:hidden z-[9999] h-12 bg-gray-800 p-4 rounded flex justify-center items-center"
      >
        <ion-icon
          name={open ? "menu" : "close"}
          style={{ color: "white" }}
        ></ion-icon>
      </div>
      <div
        className={`sm:flex-[0.25] absolute xl:top-0 xl:left-0 ${
          open ? "left-[-500px]" : "left-0"
        }  xl:relative bg-gray-800 h-full transition-all duration-500 `}
      >
        <div className="mt-6 text-2xl">ADMIN PANEL</div>
        <ul className="m-10">
          <li
            className={`m-6 text-lg ${
              activeMenu === "Dashboard"
                ? "bg-green-700 text-white"
                : "bg-white"
            }  text-gray-700 p-3 rounded-lg font-bold  w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
            onClick={() => handleMenuClick("Dashboard")}
          >
            <Link
              to="/admin/Dashboard"
              className="flex justify-center items-center  gap-3"
            >
              <IoIosHome />
              <span className="w-14 transition-all ">Dashboard</span>
            </Link>
          </li>

          <li
            className={`m-6 text-lg ${
              activeMenu === "Events" ? "bg-green-700 text-white" : "bg-white"
            }  text-gray-700 p-3 rounded-lg font-bold w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
            onClick={() => handleMenuClick("Events")}
          >
            <Link
              to="/admin/Events"
              className="flex justify-center items-center gap-3 "
            >
              <SiEventstore />
              <span className="w-14"> Events</span>
            </Link>
          </li>

          <li
            className={`m-6 text-lg ${
              activeMenu === "Artists" ? "bg-green-700 text-white" : "bg-white"
            }  text-gray-700 p-3 rounded-lg font-bold w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
            onClick={() => handleMenuClick("Artists")}
          >
            <Link
              to="/admin/Artists"
              className=" flex justify-center items-center gap-3 "
            >
              <GiRomanToga />
              <span className="w-14"> Artists</span>
            </Link>
          </li>

          <li
            className={`m-6 text-lg ${
              activeMenu === "Seats" ? "bg-green-700 text-white" : "bg-white"
            }  text-gray-700 p-3 rounded-lg font-bold w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
            onClick={() => handleMenuClick("Seats")}
          >
            <Link
              to="/admin/Seats"
              className="flex justify-center items-center gap-3 "
            >
              <MdEventSeat />
              <span className="w-14"> Seats</span>
            </Link>
          </li>

          <li
            className={`m-6 text-lg ${
              activeMenu === "Users" ? "bg-green-700 text-white" : "bg-white"
            }  text-gray-700 p-3 rounded-lg font-bold w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
            onClick={() => handleMenuClick("Users")}
          >
            <Link
              to="/admin/Users"
              className="flex justify-center items-center gap-3 "
            >
              <FaUsersLine />
              <span className="w-14"> Users</span>
            </Link>
          </li>

          <li
            className={`m-6 text-lg ${
              activeMenu === "Categories"
                ? "bg-green-700 text-white"
                : "bg-white"
            }  text-gray-700 p-3 rounded-lg font-bold w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
            onClick={() => handleMenuClick("Categories")}
          >
            <Link
              to="/admin/Categories"
              className="flex justify-center items-center gap-3 "
            >
              <BiSolidCategory />
              <span className="w-14"> Categories</span>
            </Link>
          </li>

          <li
            className={`m-6 text-lg ${
              activeMenu === "EventPhotos"
                ? "bg-green-700 text-white"
                : "bg-white"
            }  text-gray-700 p-3 rounded-lg font-bold w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
            onClick={() => handleMenuClick("EventPhotos")}
          >
            <Link
              to="/admin/EventPhotos"
              className="flex justify-center items-center gap-3 "
            >
              <MdAddAPhoto />
              <span className="w-14"> Photo</span>
            </Link>
          </li>

          <li
            className={`m-6 text-lg ${
              activeMenu === "TicketCategories"
                ? "bg-green-700 text-white"
                : "bg-white"
            }  text-gray-700 p-3 rounded-lg font-bold w-64 hover:w-full   duration-200 hover:overflow-hidden ease-in `}
            onClick={() => handleMenuClick("TicketCategories")}
          >
            <Link
              to="/admin/TicketCategories"
              className="flex justify-center items-center gap-3 "
            >
              <FaTicket />
              <span className="w-14"> Ticket</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-2xl bg-gray-700 flex-[1] text-[16px] xl:flex-[0.75] min-w-[75%]">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
