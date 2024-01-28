import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useState } from "react";
import { addShiftType } from "../../store/slices/shiftTypeSlice";


type Props = {}

const AddShiftType = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [shiftTypeName, setShiftTypeName] = useState("");

    const handleAddShiftType = () => {
        if ((shiftTypeName.trim() !== "")) {
          dispatch(addShiftType({ name: shiftTypeName}));
          setShiftTypeName("");
        }
      };

    return (

        <div>
            <div style={{ marginTop: 200 }}>
                <input
                    type="text"
                    value={shiftTypeName}
                    onChange={(e) => setShiftTypeName(e.target.value)}
                />
                <button style={{marginTop:10}} onClick={handleAddShiftType}>Add Shifttype</button>
            </div>
         </div>


    )
}

export default AddShiftType
