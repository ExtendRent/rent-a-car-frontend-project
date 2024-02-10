import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteColor, fetchColors } from '../../store/slices/colorSlice';

type Props = {}

const DeleteColor = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const colorState = useSelector((state: any) => state.color);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
  
    useEffect(() => {
      dispatch(fetchColors());
    })
  
    const handleColorChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const colorId = parseInt(e.target.value, 10);
      setSelectedColor(colorId);
    }
  
    const handleCancelUpdate = () => {
      setSelectedColor(null);
      dispatch(fetchColors());
    }
  
    const handleDeleteColor = async () => {
      if (selectedColor !== null) {
        await dispatch(deleteColor({ colorId: selectedColor }));
        // Silme işlemi tamamlandığında tetiklenir
        handleCancelUpdate();
      }
    }
  
    return (
      <div id='container-color' className="container d-flex flex-column align-items-center">
  
        <div id='select-block' className="col-md-6">
  
          <div className="mb-2">
            <label htmlFor="selectColor">Renk Seç</label>
            <select className="form-select" id="brandSelect" value={selectedColor || ''} onChange={handleColorChange}>
              <option value="" disabled>
  
              </option>
              {colorState.colors.map((color: any) => (
                <option key={color.id} value={color.id} >
                  {color.name}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleDeleteColor} disabled={selectedColor === null}>
            Delete Color
          </button>
        </div>
  
      </div>
    )
}

export default DeleteColor