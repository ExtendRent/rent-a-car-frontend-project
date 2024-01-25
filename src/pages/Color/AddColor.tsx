import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/configureStore'
import { addColor } from '../../store/slices/colorSlice'

type Props = {}

const AddColor = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [colorEntityName, setColorEntityName] = useState("");

  const handleAddColor= () => {
    if (colorEntityName.trim() !== "") {
      dispatch(addColor({ colorEntityName: colorEntityName }));
      setColorEntityName("");
    }
  };
  return (
    <div style={{marginTop:200}}>
    <input
      type="text"
      value={colorEntityName}
      onChange={(e) => setColorEntityName(e.target.value)}
    />
     <button onClick={handleAddColor}>Add Color</button> 
  </div>
  )
}

export default AddColor





