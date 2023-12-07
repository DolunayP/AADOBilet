import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtistTest,
  getArtistWithEvents,
  getArtists,
  getCategoryTest,
  getEventSingle,
} from "../redux/dataSlice";

function TestComponent() {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.data);
  useEffect(() => {
    // dispatch(getCategoryTest());
    //dispatch(getArtistTest());
    dispatch(getEventSingle("3"));
  }, [dispatch]);

  console.log("component", event);

  return <div>merhaba</div>;
}

export default TestComponent;
