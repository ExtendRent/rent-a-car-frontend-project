import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addCarBodyType } from '../../store/slices/carBodyTypeSlice';

type Props = {}

const AddCarBodyType = (props: Props) => {

  const dispatch =useDispatch<AppDispatch>();
  const [carBodyTypeName, setCarBodyTypeName] = useState("");

  const handleAddCarBodyType = () => {
    if (carBodyTypeName.trim() !== "") {
      dispatch(addCarBodyType({ carBodyTypeEntityName: carBodyTypeName }));     
      setCarBodyTypeName("");                                                  
    }
  };

  return (
    <div style={{marginTop:200}}>
      <input
        type="text"
        value={carBodyTypeName}
        onChange={(e) => setCarBodyTypeName(e.target.value)}
      />
      <button onClick={handleAddCarBodyType}>Add Car Body Type</button>
    </div>
  )
}

export default AddCarBodyType