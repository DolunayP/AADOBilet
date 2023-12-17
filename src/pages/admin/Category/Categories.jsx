import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryById, getCategoryTest } from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

function Categories() {
  const dispatch = useDispatch();
  const { categoriesTest } = useSelector((state) => state.data);
  const navigate = useNavigate();

  console.log(categoriesTest);

  useEffect(() => {
    dispatch(getCategoryTest());
  }, [dispatch]);

  return (
    <div className="flex justify-center h-full items-center flex-col ">
      <div className="bg-white text-black rounded-lg p-1">
        {Object.keys(categoriesTest).length > 0 ? (
          <table className="  w-0">
            <thead className="bg-color-primary text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category Photo</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {categoriesTest.map((category, i) => (
                <tr
                  key={category.id}
                  className={`${i % 2 === 0 && "bg-gray-300"} `}
                >
                  <td className="p-4">{category.name}</td>
                  <td>{category.image}</td>
                  <td className="w-[300px]">
                    <div className="flex space-x-2">
                      <button
                        className="text-zinc-300 bg-red-800 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px] flex justify-center items-center space-x-2"
                        onClick={() => {
                          dispatch(deleteCategoryById(category.id));
                        }}
                      >
                        <span> Delete</span>
                        <RiDeleteBin2Fill />
                      </button>
                      <button
                        className="text-zinc-300 bg-green-900 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px] flex justify-center items-center space-x-2"
                        onClick={() => {
                          navigate(`/admin/Categories/${category.id}`, {
                            state: {
                              name: category.name,
                              photo: category.image,
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
          <div className="flex justify-center p-8">
            <HashLoader size={100} color="#404529" />
          </div>
        )}
      </div>

      <div className="self-end mr-[11.7rem] mt-8">
        {Object.keys(categoriesTest).length > 0 && (
          <button
            className="bg-color-primary p-4 rounded-lg hover:bg-opacity-30 transition-all duration-200 w-24"
            onClick={() => navigate("/admin/addCategory")}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default Categories;
