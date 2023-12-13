import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryTest } from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";

function Categories() {
  const dispatch = useDispatch();
  const { categoriesTest } = useSelector((state) => state.data);
  const navigate = useNavigate();

  console.log(categoriesTest);

  useEffect(() => {
    dispatch(getCategoryTest());
  }, [dispatch]);

  return (
    <div className="flex justify-center h-full items-center flex-col">
      <div className="bg-white text-black rounded-lg ">
        <table>
          <thead className="bg-color-primary text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category Photo</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="self-end mr-16 mt-8">
        <button
          className="bg-color-primary p-4 rounded-lg hover:bg-opacity-30 transition-all duration-200"
          onClick={() => navigate("/admin/addCategory")}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Categories;
