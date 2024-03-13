import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import CarService from "../../services/carService";
import { CarModel } from "../../models/Responses/Car/CarModel";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import "./CarCart.css";
import { CardOverflow, Grid } from "@mui/joy";
import Icon from "@mdi/react";
import { mdiCarBrakeAbs, mdiMargin } from "@mdi/js";
import { mdiAccountGroup } from "@mdi/js";
import { mdiBagSuitcase } from "@mdi/js";
import { mdiGasStationOutline } from "@mdi/js";
import { mdiCarShiftPattern } from "@mdi/js";
import { mdiCalendarAccountOutline } from "@mdi/js";
import { mdiCarChildSeat } from "@mdi/js";
import { mdiCreditCardMultipleOutline } from "@mdi/js";
import { fetchCars, getByAllFilteredCars } from "../../store/slices/carSlice";
import { AppDispatch, RootState } from "../../store/configureStore";
import { GetByDateCarResponse } from "../../models/Responses/Car/GetByDateCarResponse";
import { AllGetByDateCarResponse } from "../../models/Responses/Car/AllGetByDateCarResponse";
import { fetchBrands } from "../../store/slices/brandSlice";
import { getByBrandIdCarModels } from "../../store/slices/carModelSlice";
import { GetAllFilteredResponse } from "../../models/Responses/Car/GetAllFilteredResponse";
import { fetchColors } from "../../store/slices/colorSlice";
import { fetchFuelType } from "../../store/slices/fuelTypeSlice";
import { fetchShiftTypes } from "../../store/slices/shiftTypeSlice";
import RentalButton from "../Button/RentalButton";
import { Alert } from "@mui/material";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import { getByIdCustomer } from "../../store/slices/customerSlice";
import useToken from "../../utils/useToken";
interface CarCartProps {
  onButtonClick: (carEntityId: number,startDateFilter:string,endDateFilter:string) => void;
  startDate: string; // formattedStartDate ve formattedEndDate'yi props olarak ekleyin
  endDate: string;
}
export default function CarCart({
  onButtonClick,
  startDate,
  endDate,
}: CarCartProps) {
  /*  const CarCart: React.FC<{ searchCarResponse: AllGetByDateCarResponse | undefined }> = ({ searchCarResponse }) => { */
  const carsState = useAppSelector((state: any) => state.car.cars);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCarModel, setSelectedCarModel] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<number | null>(null);
  const [selectedShiftType, setSelectedShiftType] = useState<number | null>(
    null
  );

  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();


  const brandState = useAppSelector((state: any) => state.brand);
  const carModelState = useAppSelector((state: any) => state.carModel);
  const colorState = useAppSelector((state: any) => state.color);
  const fuelTypeState = useAppSelector((state: any) => state.fuelType);
  const shiftTypeState = useAppSelector((state: any) => state.shiftType);
  const [startDateFilter, setStartDate] = useState<string>(startDate);
  const [endDateFilter, setEndDate] = useState<string>(endDate);
  const [isLicenseTypeSuitableChecked, setIsLicenseTypeSuitableChecked] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.car.error);
  const { token, decodedToken, updateToken, clearToken } = useToken();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchColors());
    dispatch(fetchFuelType());
    dispatch(fetchShiftTypes());
    /* decodedToken?.id */
  }, [dispatch]);

  const changeModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carModelId = parseInt(e.target.value, 10);
    setSelectedCarModel(carModelId);
  };
  const changeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);
    setSelectedBrand(isNaN(brandId) ? null : brandId);
    if (isNaN(brandId)) {
      // Eğer brandId NaN ise, selectedCarModel'ı temizle
      setSelectedCarModel(null);
    } else {
      // NaN değilse, car modeli getir
      dispatch(getByBrandIdCarModels({ brandId }));
    }
  };
  const changeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorId = parseInt(e.target.value, 10);
    setSelectedColor(isNaN(colorId) ? null : colorId);
  };
  const changeFuelType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fuelTypeId = parseInt(e.target.value, 10);
    setSelectedFuelType(isNaN(fuelTypeId) ? null : fuelTypeId);
  };
  const changeShiftType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shiftTypeId = parseInt(e.target.value, 10);
    setSelectedShiftType(isNaN(shiftTypeId) ? null : shiftTypeId);
  };
  const handleLicenseTypeSuitableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLicenseTypeSuitableChecked(e.target.checked);
  };
  
  const handleFiltred = () => {
    const filterData: GetAllFilteredResponse = {};

    if (selectedBrand !== null) {
      filterData.brandId = selectedBrand;
    }
    if (selectedCarModel !== null) {
      filterData.modelId = selectedCarModel;
    }
    if (selectedColor !== null) {
      filterData.colorId = selectedColor;
    }
    if (selectedFuelType !== null) {
      filterData.fuelTypeId = selectedFuelType;
    }
    if (selectedShiftType !== null) {
      filterData.shiftTypeId = selectedShiftType;
    }
    if (startDate !== null) {
      filterData.startDate = startDateFilter;
    }
    if (endDate !== null) {
      filterData.endDate = endDateFilter;
    }
    if (isLicenseTypeSuitableChecked == true) {
      filterData.customerId = decodedToken?.id;
      filterData.licenseSuitable = true;
    }
    if (isLicenseTypeSuitableChecked == false) {
      filterData.licenseSuitable = false;
    }
    
    
    try {
      dispatch(getByAllFilteredCars(filterData));
    } catch (error) {
      console.error("Redux action dispatch hatası:", error);
      setErrorMessage("İşlem başarısız. Lütfen tekrar deneyin.");
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
   
    <div className="row">
      <div className="col-md-3">
        <div className="mb-3">
          <label
            htmlFor="startDate"
            className="form-label"
          >
            Başlama Tarihi
          </label>
          <input
            type="date"
            className="select-filter"
            id="startDate"
            name="startDate"
            value={startDateFilter}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="endDate"
            className="form-label"
          >
            Dönüş Tarihi
          </label>
          <input
            type="date"
            className="select-filter"
            id="endDate"
            name="endDate"
            value={endDateFilter}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brandSelect" className="form-label">
            Marka Seçiniz
          </label>
          <select
            className="select-filter"
            id="brandSelect"
            value={selectedBrand || ""}
            onChange={changeBrand}
          >
            <option value="">Marka seçiniz</option>
            {brandState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {selectedBrand !== null && carModelState.carModel.length > 0 && (
          <div className="mb-3">
            <label htmlFor="carModelSelect" className="form-label">
              Araba Modeli Seçiniz
            </label>
            <select
              className="select-filter"
              id="carModelSelect"
              value={selectedCarModel || ""}
              onChange={changeModel}
            >
              <option value="">Model seçiniz</option>
              {carModelState.carModel.map((carModel: any) => (
                <option key={carModel.id} value={carModel.id}>
                  {carModel.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="colorSelect" className="form-label">
            Renk Seçiniz
          </label>
          <select
            className="select-filter"
            id="colorSelect"
            value={selectedColor || ""}
            onChange={changeColor}
          >
            <option value="">Renk seçiniz</option>
            {colorState.colors.map((color: any) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="fuelTypeSelect" className="form-label">
            Yakıt Tipi Seçiniz
          </label>
          <select
            className="select-filter"
            id="fuelTypeSelect"
            value={selectedFuelType || ""}
            onChange={changeFuelType}
          >
            <option value="">Yakıt Tipi Seçiniz</option>
            {fuelTypeState.fuelTypes.map((fuelType: any) => (
              <option key={fuelType.id} value={fuelType.id}>
                {fuelType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="shiftTypeSelect" className="form-label">
            Vites Tipi Seçiniz
          </label>
          <select
            className="select-filter"
            id="shiftTypeSelect"
            value={selectedShiftType || ""}
            onChange={changeShiftType}
          >
            <option value="">Vites Tipi Seçiniz</option>
            {shiftTypeState.shiftTypes.map((shiftType: any) => (
              <option key={shiftType.id} value={shiftType.id}>
                {shiftType.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="licenseTypeSuitableCheckbox" className="form-label">
            Ehliyetime uygun olanları göster
          </label>
          <input
            type="checkbox"
            className="checkbox-filter"
            id="licenseTypeSuitableCheckbox"
            checked={isLicenseTypeSuitableChecked}
            onChange={handleLicenseTypeSuitableChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFiltred}
        >
          Filtrele
        </button>
      </div>
      {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
        {!errorCustom && successMessage && (
          <Alert severity="success">{successMessage}</Alert>
      )}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <div className="col-md-9">
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          sx={{ flexGrow: 1, maxWidth: 1500, marginRight: 4 }}
        >
          {carsState.map((car: any) => (
            <Grid xs={1} sm={4} md={4}>
              <Card sx={{ height: 500, marginTop: 2, bgcolor: '#6a6a6a59;', color:'white' ,borderColor:'#6a6a6a59'}} key={car.id}>
                <Typography level="title-lg" sx={{color:'white'}}>
                  {car.carModelEntityBrandEntityName} {car.carModelEntityName}{" "}
                  {car.rentalPrice} TL
                 
                </Typography> 
                <Typography level="title-md" sx={{color:'red'}}>
    
                {car.isLicenseTypeSuitable? "dd":"sss"}
                </Typography>
                <AspectRatio
                  minHeight="140px"
                  maxHeight="260px"
                  sx={{
                    marginBottom: 1.6,
                    transition: "transform 0.3s ease",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={car.imageEntityImageUrl}
                    loading="lazy"
                    alt=""
                    style={{
                      maxWidth: "100%",
                      height: "-webkit-fill-available;",
                      background:'#ffffff00'
                    }}
                  />
                </AspectRatio>

                <CardContent orientation="horizontal">
                  <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid
                      xs={6}
                      sx={{
                        borderRightStyle: "solid",
                        borderWidth: 1.5,
                        borderColor: "#E1DED9",
                        paddingLeft: 2,
                        color:'white'
                      }}
                    >
                      <Typography level="title-lg" sx={{ marginBottom: 1.6 ,color:'white'}}>
                        Araç Özellikleri
                      </Typography>
                      <div className="mid-column">
                        <Icon
                          path={mdiAccountGroup}
                          size={1}
                          className="iconClass"
                        />
                        <Typography level="body-sm" sx={{ color:' #c1c0c0;'}}>{car.seat} Kişi</Typography>
                      </div>
                      <div className="mid-column">
                        <Icon
                          path={mdiBagSuitcase}
                          size={1}
                          className="iconClass"
                        />
                        <Typography level="body-sm"  sx={{ color:' #c1c0c0;'}}>
                          {car.luggage} Büyük Bavul
                        </Typography>
                      </div>
                      {/* <div className="mid-column">
                          <Icon path={mdiCarBrakeAbs} size={1} className="iconClass"/>
                          <Typography level="body-sm">ABS</Typography>
                        </div> */}
                      <div className="mid-column">
                        <Icon
                          path={mdiGasStationOutline}
                          size={1}
                          className="iconClass"
                        />
                        <Typography level="body-sm"  sx={{ color:' #c1c0c0;'}}>
                          {car.fuelTypeEntityName}
                        </Typography>
                      </div>
                      <div className="mid-column">
                        <Icon
                          path={mdiCarShiftPattern}
                          size={1}
                          className="iconClass"
                        />
                        <Typography level="body-sm"  sx={{ color:' #c1c0c0;'}}>
                          {car.shiftTypeEntityName}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid xs={6} sx={{ paddingLeft: 3 }}>
                      <Typography level="title-lg" sx={{ marginBottom: 1.6,color:'white' }}>
                        Kiralama Koşulları
                      </Typography>
                      <div className="mid-column">
                        <Icon
                          path={mdiCalendarAccountOutline}
                          size={1}
                          className="iconClass"
                        />
                        <Typography level="body-sm"  sx={{ color:' #c1c0c0;'}}>21 Yaş Ve Üstü</Typography>
                      </div>
                      <div className="mid-column">
                        <Icon
                          path={mdiCarChildSeat}
                          size={1}
                          className="iconClass"
                        />
                        <Typography level="body-sm"  sx={{ color:' #c1c0c0;'}}>
                          Ehliyet Yaşı 1 ve Üzeri
                        </Typography>
                      </div>
                      <div className="mid-column">
                        <Icon
                          path={mdiCreditCardMultipleOutline}
                          size={1}
                          className="iconClass"
                        />
                        <Typography level="body-sm"  sx={{ color:' #c1c0c0;'}}>1 Kredi Kartı</Typography>
                      </div>
                      <div className="mid-column"></div>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardOverflow>
                  <Button
                    variant="solid"
                    color="danger"
                    size="lg"
                    onClick={() => onButtonClick(car.id,startDateFilter, endDateFilter)}
                  >
                    Hemen Kirala
                  </Button>
                </CardOverflow>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
   
  );
}
