import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getUserSession, getUserSessionDatabase } from "../../redux/dataSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { user, userData } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSession());
    dispatch(getUserSessionDatabase(user ? user.id : "1234"));
  }, [dispatch, user]);

  console.log("userdataaa", userData);

  useEffect(
    function () {
      if (!userData) window.location.href = "/login";
    },
    [userData, navigate]
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
