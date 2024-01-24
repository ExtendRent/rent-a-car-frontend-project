import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addBrand } from '../../store/slices/brandSlice';
import { AppDispatch } from '../../store/configureStore';

type Props = {}

const AddBrand = (props: Props) => {
  const dispatch =useDispatch<AppDispatch>();
  const [brandName, setBrandName] = useState("");

  const handleAddBrand = () => {
    if (brandName.trim() !== "") {
      dispatch(addBrand({ name: brandName }));
      setBrandName("");
    }
  };

  return (
    <div style={{marginTop:200}}>
      <input
        type="text"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <button onClick={handleAddBrand}>Add Brand</button>
    </div>
  )
}

export default AddBrand