import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getUserSession, getUserSessionDatabase } from "../../redux/dataSlice";

function ProtectedRouteAdmin({ children }) {
  const navigate = useNavigate();
  const { user, userData } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu için state

  useEffect(() => {
    dispatch(getUserSession());
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0 && user !== undefined) {
      dispatch(getUserSessionDatabase(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (
      userData &&
      Object.keys(userData).length > 0 &&
      userData !== undefined
    ) {
      if (userData.authenticated_role !== "admin") {
        navigate("/");
      } else {
        setIsLoading(false); // Kullanıcı verileri geldiğinde yükleme durumunu kapat
      }
    }
  }, [userData, navigate]);

  // Yükleme durumu kontrolü
  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-gray-50 h-screen">
        <HashLoader size={100} color="#404529" />
      </div>
    );
  }

  // Kullanıcı varsa uygulamayı render et
  return children;
}

export default ProtectedRouteAdmin;
