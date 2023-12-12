import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div>
      <div className="bg-gray-600 text-white h-screen flex">
        <div className="w-1/4">
          <div>
            <ul className="m-10">
              <Link to="/admin/Dashboard">
                <li className="p-4 text-lg">Dashboard</li>
              </Link>
              <Link to="/admin/Events">
                <li className="p-4 text-lg">Events</li>
              </Link>
              <Link to="/admin/Artists">
                <li className="p-4 text-lg">Artists</li>
              </Link>
              <Link to="/admin/Seats">
                <li className="p-4 text-lg">Seats</li>
              </Link>
              <Link to="/admin/Users">
                <li className="p-4 text-lg">Users</li>
              </Link>
              <Link to="/admin/Categories">
                <li className="p-4 text-lg">Categories</li>
              </Link>
              <Link to="/admin/EventPhotos">
                <li className="p-4 text-lg">Event Photos</li>
              </Link>
              <Link to="/admin/TicketCategories">
                <li className="p-4 text-lg">Ticket Categories</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="text-2xl bg-neutral-500 w-3/4">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
