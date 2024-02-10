import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import { deleteShiftType, fetchShiftTypes } from "../../store/slices/shiftTypeSlice";

type Props = {}

const DeleteShiftType = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const shiftTypeState = useSelector((state: any) => state.shiftType);
    const [selectedShiftType, setSelectedShiftType] = useState<number | null>(null);
    

    useEffect(() => {
        dispatch(fetchShiftTypes())
      }, [dispatch])

      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        setSelectedShiftType(parseInt(e.target.value, 10));
      };

     /*  const handleCancelUpdate = () => {
        setSelectedShiftType(null);
        dispatch(fetchShiftTypes());
      }; */

      const handleDeleteShiftType = async () => {
        if (selectedShiftType !== null) {
          await dispatch(deleteShiftType({ shiftTypeId: selectedShiftType }));
          setSelectedShiftType(null);
          //handleCancelUpdate();
        }
      };

    return (
        <div id='container-shiftType' className="container d-flex flex-column align-items-center">
    
        <div id='select-block' className="col-md-6">

          <div className="mb-2">
            <label htmlFor="selectShiftType">Vites Tipi Seç</label>
            <select className="form-select" id="shiftTypeSelect" value={selectedShiftType || ''} onChange={handleSelectChange}>
              <option value="" disabled>

              </option>
              {shiftTypeState.shiftTypes.map((shiftType: any) => (
          <option key={shiftType.id} value={shiftType.id}>
            {shiftType.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleDeleteShiftType} disabled={selectedShiftType === null}>
        Delete ShiftType
      </button>
      
          </div>
           
        </div>
    )
}

export default DeleteShiftType