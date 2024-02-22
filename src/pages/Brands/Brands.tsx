import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { fetchBrands, updateBrand } from "../../store/slices/brandSlice";
import SideBar from "../../components/Sidebar/SideBar";
import AddBrand from './AddBrand';
import './Brand.css';
import MyMUIDataTable from "./BrandTable";

const Brands = () => {
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
