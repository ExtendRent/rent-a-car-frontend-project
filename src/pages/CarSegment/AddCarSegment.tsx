import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addCarSegment } from '../../store/slices/carSegmentSlice';

type Props = {}

const AddCarSegment = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
  
    const handleAddCarSegment= () => {
      if (name.trim() !== "") {
        dispatch(addCarSegment({ name: name }));
        setName("");
      }
    };

  return (
    <div style={{marginTop:200}}>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
     <button onClick={handleAddCarSegment}>Add Car Segment</button> 
  </div>
  )
}

export default AddCarSegment