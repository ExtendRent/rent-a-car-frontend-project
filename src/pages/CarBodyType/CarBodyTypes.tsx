import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteCarBodyType, fetchCarBodyTypes, updateCarBodyType } from '../../store/slices/carBodyTypeSlice';


type Props = {}

const CarBodyTypes = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);

  const [selectedCarBodyType, setSelectedCarBodyType] = useState<number | null>(null);

  const [carBodyTypeName, setCarBodyTypeName] = useState('');

  useEffect(() => {
    dispatch(fetchCarBodyTypes())
  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarBodyType(parseInt(e.target.value, 10));
  };

  const handleCarBodyTypeUpdateSuccess = () => {
    if (carBodyTypeName.trim() !== "" && selectedCarBodyType !== null) {
      dispatch(updateCarBodyType({ id: selectedCarBodyType, name: carBodyTypeName }))
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setSelectedCarBodyType(null);
    setCarBodyTypeName("");
    dispatch(fetchCarBodyTypes());
  };

  const handleDeleteCarBodyType = async () => {
    if (selectedCarBodyType !== null) {
      await dispatch(deleteCarBodyType({ carBodyTypeId: selectedCarBodyType }))
      handleCarBodyTypeUpdateSuccess();
    }
  };

  return (
    <div style={{ marginTop: 200 }}>
      <h2>Car Body Type List</h2>

      <select value={selectedCarBodyType || ''} onChange={handleSelectChange}>
        <option value="" disabled>
          Select a car body type
        </option>
        {carBodyTypeState.carBodyTypes.map((carBodyType: any) => (
          <option key={carBodyType.id} value={carBodyType.id}>
            {carBodyType.name}
          </option>
        ))}
      </select>

      {selectedCarBodyType !== null && (
        <div>
          <input
            type="text"
            value={carBodyTypeName}
            onChange={(e) => setCarBodyTypeName(e.target.value)}
          />
          <button onClick={handleCarBodyTypeUpdateSuccess}>Update Car Body Type</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}

      <button onClick={handleDeleteCarBodyType} disabled={selectedCarBodyType === null}>
        Delete Car Body Type
      </button>
    </div>
  )
}

export default CarBodyTypes