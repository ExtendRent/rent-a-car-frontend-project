import React, { useEffect, useState } from 'react'
import '../AdminPanel/AdminPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteColor, fetchColors, updateColor } from '../../store/slices/colorSlice';
import UpdateColor from './UpdateColor';



type Props = {}

const Colors = () => {

  const dispatch = useDispatch<AppDispatch>();
  const colorState = useSelector((state: any) => state.color);

  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    dispatch(fetchColors())
  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(typeof e.target.value);
    
    setSelectedColor(parseInt(e.target.value, 10));
  };

  const handleColorUpdateSuccess = () => {
    if(colorName.trim() !== "" && selectedColor !== null){
      dispatch(updateColor({id:selectedColor, name: colorName}));
      handleCancelUpdate();
    }
    
  };

  const handleCancelUpdate = () => {
    setSelectedColor(null);
    setColorName("");
    dispatch(fetchColors());
  };


  const handleDeleteColor = async () => {
    if (selectedColor !== null) {
      await dispatch(deleteColor({ colorId: selectedColor }));
      handleColorUpdateSuccess();
    }
  };


  return (
    <div className="container d-flex flex-column align-items-center">
      <h2>Color List</h2>
<form>
  <div className="mb-2">
      <select className="form-select" id="colorSelect" value={selectedColor || ''} onChange={handleSelectChange}>
        <option value="" disabled> Select a color </option>
        {colorState.colors.map((color: any) => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </select>
      </div>
  
      {selectedColor !== null && (
        <div className="mb-2">
           <input style= {{ appearance: 'none', 
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: 'none',
                paddingRight: '10px' }}  className="form-select"
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={handleColorUpdateSuccess}>Update Color</button>
          <button type="button" className="btn btn-primary" onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}


      <button type="button" className="btn btn-primary" onClick={handleDeleteColor} disabled={selectedColor === null}>
        Delete Color
      </button>
      </form>
    </div>


  )
}

export default Colors