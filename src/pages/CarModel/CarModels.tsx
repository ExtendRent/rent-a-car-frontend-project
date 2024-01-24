import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchBrands } from '../../store/slices/brandSlice';
import { deleteCarModel, fetchCarModels, getByBrandIdCarModels, updateCarModel } from '../../store/slices/carModelSlice';

type Props = {}

const CarModels = (props: Props) => {

  const dispatch =useDispatch<AppDispatch>();
  const brandState =useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);

  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCarModel, setSelectedCarModel] = useState<number | null>(null);

  const [carModelName, setCarModelName] = useState('');
 
  useEffect(()=>{
    dispatch(fetchBrands())
  },[dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);

      setSelectedBrand(brandId);

      if (!isNaN(brandId)) {
        dispatch(getByBrandIdCarModels({brandId}));
      }
  };

  const handleCarModelSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carModelId = parseInt(e.target.value, 10);
    setSelectedCarModel(carModelId);
  };

  const handleUpdateCarModel = () => {
    if (carModelName.trim() !== '' && selectedBrand !== null && selectedCarModel !== null) {
      dispatch(updateCarModel({ brandEntityId: selectedBrand, carModelEntityName: carModelName ,carModelEntityId:selectedCarModel})).then(() => {
        // Güncelleme işlemi tamamlandığında tetiklenir
        handleCancelUpdate();
      });
    }
  };
  const handleCancelUpdate = () => {
    setSelectedBrand(null);
    setSelectedCarModel(null); 
    setCarModelName(''); 
    // Markaları tekrar getir
    dispatch(fetchCarModels());
  };

  const handleDeleteCarModel = async () => {
    if (selectedCarModel !== null) {
      await dispatch(deleteCarModel({ id: selectedCarModel }));
      // Silme işlemi tamamlandığında tetiklenir
      handleCancelUpdate();
    }
  };

  return (
    <div style={{ marginTop: 200 }}>
      <h2>Car Model List</h2>
      <label>Select a Brand:</label>
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
    
      {selectedBrand && (
        <div>
          <label>Select a Car Model:</label>
          <select value={selectedCarModel || ''} onChange={handleCarModelSelectChange}>
            <option value="" disabled>
              Select a car model
            </option>
            {carModelState.carModel.map((carModel: any) => (
              <option key={carModel.id} value={carModel.id}>
                {carModel.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCarModel !== null && (
          <div>
            <input
              type="text"
              value={carModelName}
              onChange={(e) => setCarModelName(e.target.value)}
              />
              <button onClick={handleUpdateCarModel}>Update Brand</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
          </div>
        )}

        <button onClick={handleDeleteCarModel} disabled={selectedCarModel === null}>
          Delete Car Model
        </button>
    </div>
  )
}

export default CarModels