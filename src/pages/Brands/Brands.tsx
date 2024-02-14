import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { fetchBrands, updateBrand } from "../../store/slices/brandSlice";
import SideBar from "../../components/Sidebar/SideBar";
import AddBrand from './AddBrand';
import './Brand.css';

const Brands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);

  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [brand, setBrand] = useState("");
  const [logoImagePath, setLogoImagePath] = useState("");

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(parseInt(e.target.value, 10));
  };

  const handleBrandUpdateSuccess = () => {
    if (brand.trim() !== "" && selectedBrand !== null) {
      dispatch(updateBrand({ id: selectedBrand, name: brand, logoImagePath: logoImagePath}));
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setSelectedBrand(null);
    setBrand("");
    setLogoImagePath("");
    dispatch(fetchBrands());
  };

  return (
    <div >
      <SideBar>
        <div style={{ textAlign: 'center',border: '2 solid red'}} className="denemeBrand">
          <h2>Brand List</h2>
          <div className="table-container">
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="baslik">
                <th className="sutun" >ID</th>
                <th className="sutun" id="name">Name</th>
                <th className="sutun" >Logo Image Path</th>
                <th className="sutun" id="action">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brandState.brands.map((brand: any) => (
                <tr key={brand.id} className="baslik">
                  <td className="sutun">{brand.id}</td>
                  <td className="sutun" id="nameObje">{brand.name}</td>
                  <td className="sutun">{brand.logoImagePath}</td>
                  <td className="sutun" id="actionObje">
                    <button style={{ marginRight: '21px', padding: '6px' }}>Sil</button>
                    <button style={{ marginRight: '2px', padding: '6px' }} onClick={handleBrandUpdateSuccess}>Güncelle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {selectedBrand !== null && (
            <div>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <input
                type="text"
                value={logoImagePath}
                onChange={(e) => setLogoImagePath(e.target.value)}
              />
              {/* <button onClick={handleBrandUpdateSuccess}>Update Brand</button>
              <button onClick={handleCancelUpdate}>Cancel</button> */}
            </div>
          )}
        </div>
      </SideBar>
    </div>
  );
};

export default Brands;
