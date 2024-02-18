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

  useEffect(() => {
    dispatch(fetchCars());
    dispatch(fetchBrands());
    dispatch(fetchCarModels());
    dispatch(fetchCarBodyTypes());
    dispatch(fetchColors());
    dispatch(fetchVehicleStatus());
    dispatch(fetchShiftTypes());
    dispatch(fetchFuelType());
    dispatch(fetchDrivingLicenseTypes());
  }, [dispatch]);

  const handleSelectCarChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const carId = parseInt(e.target.value, 10);
    setSelectedCar(carId);
    const selectedCar = carState.cars.find((car: CarModel) => car.id === carId);
    if (selectedCar) {
      setSelectedCarProperties(selectedCar);
    }
  };

  const handleCarChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = parseInt(e.target.value, 10);
    setSelectedCar(carId);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);
    setSelectedBrand(brandId);

    if (!isNaN(brandId)) {
      dispatch(getByBrandIdCarModels({ brandId }));
    }
  };

  const handleCarModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carModelId = parseInt(e.target.value, 10);
    setSelectedCarModel(carModelId);
  };

  const handleCarBodyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarBodyType(parseInt(e.target.value, 10));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(parseInt(e.target.value, 10));
  };

  const handleVehicleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVehicleStatus(parseInt(e.target.value, 10));
  };

  const handleShiftTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShiftType(parseInt(e.target.value, 10));
  };

  const handleFuelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFuelType(parseInt(e.target.value, 10));
  };

  const handleDrivingLicenseTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setselectedExpectedMinDrivingLicenseType(parseInt(e.target.value, 10));
  };

  const handleCarUpdateSuccess = () => {
    if (
      selectedCar !== null &&
      year !== undefined &&
      details.trim() !== "" &&
      rentalPrice !== undefined &&
      licensePlate.trim() !== "" &&
      kilometer !== undefined &&
      seat !== undefined &&
      luggage !== undefined &&
      imagePaths.length !== 0 &&
      selectedExpectedMinDrivingLicenseType !== undefined &&
      selectedBrand !== undefined &&
      selectedCarModel !== undefined &&
      selectedCarBodyType !== undefined &&
      selectedColor !== undefined &&
      selectedVehicleStatus !== undefined &&
      selectedShiftType !== undefined &&
      selectedFuelType !== undefined
    ) {
      dispatch(
        updateCar({
          id: selectedCar,
          brandEntityId: selectedBrand,
          carModelEntityId: selectedCarModel,
          carBodyTypeEntityId: selectedCarBodyType,
          colorEntityId: selectedColor,
          vehicleStatusEntityId: selectedVehicleStatus,
          shiftTypeEntityId: selectedShiftType,
          fuelTypeEntityId: selectedFuelType,
          expectedMinDrivingLicenseTypeId:
            selectedExpectedMinDrivingLicenseType,
          year: year,
          details: details,
          rentalPrice: rentalPrice,
          licensePlate: licensePlate,
          kilometer: kilometer,
          seat: seat,
          luggage: luggage,
          imagePaths: imagePaths,
          isAvailable: isAvailable,
        })
      );
      setYear(undefined);
      setDetails("");
      setRentalPrice(0);
      setLicensePlate("");
      setKilometer(0);
      setImagePaths([]);
      setSeat(0);
      setLuggage(0);
      setIsAvailable(false);
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setSelectedCar(0);
    setSelectedBrand(0);
    setSelectedCarModel(0);
    setSelectedCarBodyType(0);
    setSelectedColor(0);
    setSelectedFuelType(0);
    setSelectedShiftType(0);
    setSelectedVehicleStatus(0);
    setYear(0);
    setDetails("");
    setRentalPrice(0);
    setLicensePlate("");
    setKilometer(0);
    setImagePaths([]);
    setSeat(0);
    setLuggage(0);
    setIsAvailable(false);
    dispatch(fetchCars());
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

export default Cars;
