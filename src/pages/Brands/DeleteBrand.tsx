import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteBrand, fetchBrands } from '../../store/slices/brandSlice';

type Props = {}

const DeleteBrand = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchBrands());
  })

  const handleBrandChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);
    setSelectedBrand(brandId);
  }

  
  const handleDeleteBrand = async () => {
    if (selectedBrand !== null) {
      await dispatch(deleteBrand({ brandId: selectedBrand }));
      setSelectedBrand(null);
    }
  }

  return (
    <div id='container-brand' className="container d-flex flex-column align-items-center">

      <div id='select-block' className="col-md-6">

        <div className="mb-2">
          <label htmlFor="selectBrand">Marka Seç</label>
          <select className="form-select" id="brandSelect" value={selectedBrand || ''} onChange={handleBrandChange}>
            <option value="" disabled>

            </option>
            {brandState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id} >
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleDeleteBrand} disabled={selectedBrand === null}>
          Delete Brand
        </button>
      </div>

    </div>
  )
}

export default DeleteBrand