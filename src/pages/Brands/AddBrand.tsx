import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBrand } from "../../store/slices/brandSlice";
import { AppDispatch } from "../../store/configureStore";
import SideBar from "../../components/Sidebar/SideBar";

type Props = {};

const AddBrand = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [brandName, setBrandName] = useState("");
  const [logoImagePath, setLogoImagePath] = useState("");

 const handleAddBrand = () => {
    if (brandName.trim() !== "") {
      dispatch(addBrand({ name: brandName, logoImagePath: logoImagePath}));
      setBrandName("");
      setLogoImagePath("");
    }
  };
  

  return (
    <div>
      <SideBar>
        <div style={{ marginTop: 200 }}>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <input
            type="text"
            value={logoImagePath}
            onChange={(e) => setLogoImagePath(e.target.value)}
          />
          <button onClick={handleAddBrand}>Add Brand</button>
        </div>
      </SideBar>
    </div>
  );
};

export default AddBrand;
