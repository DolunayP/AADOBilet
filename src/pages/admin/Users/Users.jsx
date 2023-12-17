import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="flex justify-center h-full items-center flex-col ">
      <div className="bg-white text-black rounded-lg p-1 overflow-y-auto">
        {Object.keys(users).length > 0 ? (
          <table className="w-0">
            <thead className="bg-color-primary text-white">
              <tr>
                <th className="p-4">Username</th>
                <th className="p-4">Password</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user.id}
                  className={`${i % 2 === 0 && "bg-gray-300"} `}
                >
                  <td className="p-4">{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.email}</td>
                  <td>{user.authenticated_role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center p-8">
            <HashLoader size={100} color="#404529" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
