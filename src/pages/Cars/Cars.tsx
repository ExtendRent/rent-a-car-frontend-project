import React, { useEffect, useState } from "react";
import "./Car.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { fetchCars, updateCar } from "../../store/slices/carSlice";
import {
  fetchCarModels,
  getByBrandIdCarModels,
} from "../../store/slices/carModelSlice";
import { fetchBrands } from "../../store/slices/brandSlice";
import { fetchCarBodyTypes } from "../../store/slices/carBodyTypeSlice";
import { fetchColors } from "../../store/slices/colorSlice";
import { fetchVehicleStatus } from "../../store/slices/vehicleStatusSlice";
import { fetchShiftTypes } from "../../store/slices/shiftTypeSlice";
import { fetchFuelType } from "../../store/slices/fuelTypeSlice";
import { fetchDrivingLicenseTypes } from "../../store/slices/drivingLicenseTypeSlice";
import { CarModel } from "../../models/Responses/Car/CarModel";
import SideBar from "../../components/Sidebar/SideBar";
import '../Brands/Brand.css';
import MyMUIDataTable from "./CarTable";

type Props = {};

const Cars = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const colorState = useSelector((state: any) => state.color);
  const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);
  const shiftTypeState = useSelector((state: any) => state.shiftType);
  const fuelTypeState = useSelector((state: any) => state.fuelType);
  const carState = useSelector((state: any) => state.car);
  const expectedMinDrivingLicenseTypeState = useSelector(
    (state: any) => state.drivingLicenseType
  );

  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>(
    undefined
  );
  const [selectedCarModel, setSelectedCarModel] = useState<number>(0);
  const [selectedCarBodyType, setSelectedCarBodyType] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedVehicleStatus, setSelectedVehicleStatus] = useState<number>(0);
  const [selectedShiftType, setSelectedShiftType] = useState<number>(0);
  const [selectedFuelType, setSelectedFuelType] = useState<number>(0);
  const [
    selectedExpectedMinDrivingLicenseType,
    setselectedExpectedMinDrivingLicenseType,
  ] = useState<number>(0);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [details, setDetails] = useState("");
  const [rentalPrice, setRentalPrice] = useState<number>(0);
  const [licensePlate, setLicensePlate] = useState("");
  const [kilometer, setKilometer] = useState<number>(0);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [seat, setSeat] = useState<number>(0);
  const [luggage, setLuggage] = useState<number>(0);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedCarProperties, setSelectedCarProperties] =
    useState<CarModel | null>(null);






  return (
    <div >
    <SideBar>
    <div className="container-card">
    <div className="container-card-table">
          <h2 className="h2-card">ARAÇLAR</h2>
      <div className="full-screen">
        <MyMUIDataTable />
  </div>
      </div>
      </div>
    </SideBar>
     
  </div>
  );
};

export default Cars;
