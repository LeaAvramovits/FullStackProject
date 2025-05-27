import { useDispatch, useSelector } from "react-redux";
import { addPoint, deletePoint, resetPoint } from "../redux/pointsSlice";

const Points = () => {

    const dispatch = useDispatch();

    const points = useSelector((state) => state.points.pointsValue);

    return (
        <div>
            <h3>User points:</h3>
            <p>{points}</p>
            <button onClick={() => dispatch(addPoint())}>Add point</button>
            <button onClick={() => dispatch(deletePoint())} >Remove point</button>
            <button onClick={() => dispatch(resetPoint())}>Reset point</button>
        </div>
    );
};

export default Points;
