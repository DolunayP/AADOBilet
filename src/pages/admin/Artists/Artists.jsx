import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteArtistById, getArtistTest } from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Artists() {
  const dispatch = useDispatch();
  const { artists } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArtistTest());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center flex-col min-h-screen max-h-[750px]">
      <div className="bg-white text-black rounded-lg p-1 overflow-y-auto">
        {Object.keys(artists).length > 0 ? (
          <table className="w-[950px] flex flex-col ">
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
                    {artist.artistPhoto.slice(0, 45) + "..."}
                  </td>
                  <td className="w-[300px]">
                    <div className="flex gap-6 ml-6">
                      <button
                        className="text-zinc-300 bg-red-600 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px]"
                        onClick={() => {
                          dispatch(deleteArtistById(artist.id));
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="text-zinc-300 bg-green-900 p-2 rounded-lg text-[16px] hover:bg-opacity-75 transition-all duration-200 w-[150px]"
                        onClick={() => {
                          navigate(`/admin/Artist/${artist.id}`, {
                            state: {
                              artistName: artist.artistName,
                              artistPhoto: artist.artistPhoto,
                            },
                          });
                        }}
                      >
                        Update
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
