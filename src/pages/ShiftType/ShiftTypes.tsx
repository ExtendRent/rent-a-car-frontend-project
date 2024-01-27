import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteShiftType, fetchShiftTypes, updateShiftType } from '../../store/slices/shiftTypeSlice';

export default function ShiftTypes() {

    const dispatch = useDispatch<AppDispatch>();
    const shiftTypeState = useSelector((state: any) => state.shiftType);

    const [selectedShiftType, setSelectedShiftType] = useState<number | null>(null);
    const [shiftTypeName, setShiftTypeName] = useState("");

    useEffect(() => {
        dispatch(fetchShiftTypes())
      }, [dispatch])
    
      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        setSelectedShiftType(parseInt(e.target.value, 10));
      };

      const handleShiftTypeUpdateSuccess = () => {
        if(shiftTypeName.trim() !== "" && selectedShiftType !== null){
          dispatch(updateShiftType({id:selectedShiftType, name: shiftTypeName}));
          handleCancelUpdate();
        }
        
      };

      const handleCancelUpdate = () => {
        setSelectedShiftType(null);
        setShiftTypeName("");
        dispatch(fetchShiftTypes());
      };

      const handleDeleteShiftType = async () => {
        if (selectedShiftType !== null) {
          await dispatch(deleteShiftType({ shiftTypeId: selectedShiftType }));
          handleShiftTypeUpdateSuccess();
        }
      };
    

  return (
    <div style={{ marginTop: 200 }}>
      <h2>ShiftType List</h2>

      <select value={selectedShiftType || ''} onChange={handleSelectChange}>
        <option value="" disabled>
          Select a ShiftType
        </option>
        {shiftTypeState.shiftTypes.map((shiftType: any) => (
          <option key={shiftType.id} value={shiftType.id}>
            {shiftType.name}
          </option>
        ))}
      </select>

      {selectedShiftType !== null && (
        <div>
           <input
            type="text"
            value={shiftTypeName}
            onChange={(e) => setShiftTypeName(e.target.value)}
          />
          <button onClick={handleShiftTypeUpdateSuccess}>Update ShiftType</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}

<button onClick={handleDeleteShiftType} disabled={selectedShiftType === null}>
        Delete ShiftType
      </button>


    </div>
  )
}
