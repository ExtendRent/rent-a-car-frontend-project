import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { fetchBrands, updateBrand } from "../../store/slices/brandSlice";
import SideBar from "../../components/Sidebar/SideBar";
import AddBrand from './AddBrand';
import './Brand.css';
import MyMUIDataTable from "./BrandTable";

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
        <div className="full-screen">
          <MyMUIDataTable />
        </div>
      </SideBar>
       
    </div>
  );
};

export default Brands;
