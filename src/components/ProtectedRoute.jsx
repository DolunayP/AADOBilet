import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getUserSession } from "../../redux/dataSlice";
import { getUserFromDatabase } from "../backend/user/user";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, userData } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSession());
    dispatch(getUserFromDatabase(user.id));
  }, [dispatch]);

  useEffect(
    function () {
      if (!user) window.location.href = "/login";
    },
    [user, navigate]
  );

  // 3. While loading, show a spinner
  //   if (isLoading)
  //     return (
  //       <div className="flex justify-center items-center bg-gray-50 h-screen">
  //         <HashLoader size={100} color="#404529" />
  //       </div>
  //     );

  // 4. If there IS a user, render the app

  return children;
}

export default ProtectedRoute;
