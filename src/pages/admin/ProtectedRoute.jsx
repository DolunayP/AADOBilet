import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  //const { isAuthenticated, isLoading } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  //   useEffect(
  //     function () {
  //       if (!isAuthenticated && !isLoading) navigate("/login");
  //     },
  //     [isAuthenticated, isLoading, navigate]
  //   );

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
