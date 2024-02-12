import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { fetchBrands, updateBrand } from "../../store/slices/brandSlice";
import SideBar from "../../components/Sidebar/SideBar";
/* import UpdateBrand from './UpdateBrand'; */

const Brands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);

  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(parseInt(e.target.value, 10));
  };

  const handleBrandUpdateSuccess = () => {
    if (brand.trim() !== "" && selectedBrand !== null) {
      dispatch(updateBrand({ id: selectedBrand, name: brand }));
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setSelectedBrand(null);
    setBrand("");
    dispatch(fetchBrands());
  };

  return (
    <div>
      <SideBar>
        <div style={{ marginTop: 200 }}>
          <h2>Brand List</h2>

          <select value={selectedBrand || ""} onChange={handleSelectChange}>
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
            <div>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <button onClick={handleBrandUpdateSuccess}>Update Brand</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
            </div>
          )}
        </div>
      </SideBar>
    </div>
  );
};

export default Brands;
