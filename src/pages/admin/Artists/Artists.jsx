import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteArtistById, getArtistTest } from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

function Artists() {
  const dispatch = useDispatch();
  const { artists } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArtistTest());
  }, [dispatch]);

  return (
    <div className="flex h-full items-center flex-col p-2 overflow-x-scroll min-w-[75%] ">
      <div className="bg-white text-black rounded-lg p-1 min-w-[75%] mx-auto  mt-20">
        {Object.keys(artists).length > 0 ? (
          <table className="min-w-[75%] mx-auto">
            <thead className="bg-color-primary text-white">
              <tr>
                <th className="p-4 w-[250px]">Name</th>
                <th className="p-4 w-[300px]">Photo</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, i) => (
                <tr
                  key={artist.id}
                  className={`${i % 2 === 0 && "bg-gray-300"} `}
                >
                  <td className="p-4 w-[350px]">{artist.artistName}</td>
                  <td className="p-4 w-[300px]">
                    {artist?.artistPhoto?.slice(0, 45) + "..."}
                  </td>
                  <td className="w-[300px]">
                    <div className="flex gap-6 ml-6">
                      <button
                        className="text-zinc-300 bg-red-600 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px] flex justify-center items-center space-x-2"
                        onClick={() => {
                          dispatch(deleteArtistById(artist.id));
                        }}
                      >
                        <span> Delete</span>
                        <RiDeleteBin2Fill />
                      </button>
                      <button
                        className="text-zinc-300 bg-green-900 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px] flex justify-center items-center space-x-2"
                        onClick={() => {
                          navigate(`/admin/Artist/${artist.id}`, {
                            state: {
                              artistName: artist.artistName,
                              artistPhoto: artist.artistPhoto,
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

      <div className="self-end mr-10 mt-8 mb-8">
        <button
          className="bg-color-primary p-4 rounded-lg hover:bg-opacity-30 transition-all duration-200 w-24"
          onClick={() => navigate("/admin/addArtist")}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Artists;
