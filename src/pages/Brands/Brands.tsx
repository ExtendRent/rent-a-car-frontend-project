import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteBrand, fetchBrands } from '../../store/slices/brandSlice';
import UpdateBrand from './UpdateBrand';

const Brands = () => {

  const dispatch =useDispatch<AppDispatch>();
  const brandState =useSelector((state: any) => state.brand);

  
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
 
  useEffect(()=>{
    dispatch(fetchBrands())
    console.log(brandState);
    
  },[dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(parseInt(e.target.value, 10));    
  };
  
  const handleBrandUpdateSuccess = () => {
    setSelectedBrand(null);
    // Markaları tekrar getir
    dispatch(fetchBrands());
  };

  const handleCancelUpdate = () => {
    setSelectedBrand(null);
    // Markaları tekrar getir
    dispatch(fetchBrands());
  };

  const handleDeleteBrand = async () => {
    if (selectedBrand !== null) {
      await dispatch(deleteBrand({ brandId: selectedBrand }));
      // Silme işlemi tamamlandığında tetiklenir
      handleBrandUpdateSuccess();
    }
  };

  return (
    <div style={{ marginTop: 200 }}>
      <h2>Brand List</h2>

    

      <select value={selectedBrand || ''} onChange={handleSelectChange}>
        <option value="" disabled>
          Select a brand
        </option>
        {brandState.brands.map((brand: any) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      {selectedBrand !== null && (
        <UpdateBrand
          brandId={selectedBrand}
          onCancelUpdate={handleCancelUpdate}
          onUpdateSuccess={handleBrandUpdateSuccess}
        />
      )}

      <button onClick={handleDeleteBrand} disabled={selectedBrand === null}>
        Delete Brand
      </button>
    </div>
  )
}

export default Brands