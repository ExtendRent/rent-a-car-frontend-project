import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addCarModel } from '../../store/slices/carModelSlice';
import { fetchBrands } from '../../store/slices/brandSlice';

type Props = {}

const AddCarModel = (props: Props) => {

  const dispatch =useDispatch<AppDispatch>();
  const brandState =useSelector((state: any) => state.brand);
  console.log(brandState);
  

  const [carModelName, setCarModelName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<number>(0)

  useEffect(()=>{
    dispatch(fetchBrands())
  },[dispatch])

  const handleAddCarModel = () => {
    if (carModelName.trim() !== "" && selectedBrand !== undefined) {
      dispatch(addCarModel({ brandEntityId: selectedBrand, carModelEntityName: carModelName }));
      setCarModelName("");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(parseInt(e.target.value, 10));
  };


  return (
    <div style={{marginTop:200}}>
        <select value={selectedBrand} onChange={handleSelectChange}>
            <option value="" disabled>
              Select a brand
            </option>
            {brandState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          value={carModelName}
          onChange={(e) => setCarModelName(e.target.value)}
        />
        <button onClick={handleAddCarModel}>Add Car Model</button>
    </div>
  )
}

export default AddCarModel