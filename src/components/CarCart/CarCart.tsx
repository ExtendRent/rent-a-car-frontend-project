import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import CarService from "../../services/carService";
import { CarModel } from "../../models/Responses/CarModel";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import "./CarCart.css";
import { CardOverflow, Grid } from "@mui/joy";
import Icon from '@mdi/react';
import { mdiCarBrakeAbs, mdiMargin } from '@mdi/js';
import { mdiAccountGroup } from '@mdi/js';
import { mdiBagSuitcase } from '@mdi/js';
import { mdiGasStationOutline } from '@mdi/js';
import { mdiCarShiftPattern } from '@mdi/js';
import { mdiCalendarAccountOutline } from '@mdi/js';
import { mdiCarChildSeat } from '@mdi/js';
import { mdiCreditCardMultipleOutline } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, getByAllFilteredCars } from "../../store/slices/carSlice";
import { AppDispatch } from "../../store/configureStore";
import { GetByDateCarResponse } from "../../models/Responses/GetByDateCarResponse";
import { AllGetByDateCarResponse } from "../../models/Responses/AllGetByDateCarResponse";
import { fetchBrands } from "../../store/slices/brandSlice";
import { getByBrandIdCarModels } from "../../store/slices/carModelSlice";
import { GetAllFilteredResponse } from "../../models/Responses/Car/GetAllFilteredResponse";
interface CarCartProps {
  onButtonClick: (carEntityId: number) => void;
}
export default function CarCart({ onButtonClick }: CarCartProps) { 
 
 /*  const CarCart: React.FC<{ searchCarResponse: AllGetByDateCarResponse | undefined }> = ({ searchCarResponse }) => { */
    const carsState = useSelector((state: any) => state.car.cars);
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedCarModel, setSelectedCarModel] = useState<number | null>(null);

    const dispatch =useDispatch<AppDispatch>();

    const brandState =useSelector((state: any) => state.brand);
    const carModelState = useSelector((state: any) => state.carModel);

    useEffect(()=>{
      dispatch(fetchBrands())
    },[dispatch])
   
    const handleCarModelSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const carModelId = parseInt(e.target.value, 10);
      setSelectedCarModel(carModelId);
    
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

    const handleFiltred = () => {
    
      const filterData: GetAllFilteredResponse = {};
  
      if (selectedBrand !== null) {
        filterData.brandId = selectedBrand;
      }

      if (selectedCarModel !== null) {
        filterData.modelId = selectedCarModel;
      }
      dispatch(getByAllFilteredCars(filterData));
      
    
    }
  return (
      <div className="row">
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="brandSelect" className="form-label">
              Marka Seçiniz
            </label>
            <select
              className="form-select"
              id="brandSelect"
              value={selectedBrand || ''}
              onChange={handleSelectChange}
            >
              <option value='' >
                Marka seçiniz
              </option>
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
                  className="form-select"
                  id="carModelSelect"
                  value={selectedCarModel || ''}
                  onChange={handleCarModelSelectChange}
                >
                  <option value="" >
                    Model seçiniz
                  </option>
                  {carModelState.carModel.map((carModel: any) => (
                    <option key={carModel.id} value={carModel.id}>
                      {carModel.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
         
     

          <button type="button" className="btn btn-primary" onClick={handleFiltred}>
            Filtrele
          </button>
        </div>
    <div className="col-md-9">
    <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 ,maxWidth:1500,marginLeft:4,marginRight:4}}
      >
          {carsState.map((car: any) => (
            <Grid  xs={1} sm={4} md={4}>
              <Card sx={{ height:600, marginTop: 12 }} key={car.id}>
                <Typography level="title-lg">{car.carModelEntityBrandEntityName} {car.carModelEntityName} {car.rentalPrice} TL</Typography>
                <AspectRatio minHeight="140px" maxHeight="260px" sx={{marginBottom:1.6}}>
                  <img
                    src={car.imagesEntityImagePaths}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                
                <CardContent orientation="horizontal">
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid xs={6} sx={{borderRightStyle: "solid",borderWidth:1.5,borderColor: "#E1DED9",paddingLeft:2}}>
                          <Typography level="title-lg" sx={{ marginBottom: 1.6 }}>Araç Özellikleri</Typography>
                        <div className="mid-column">
                          <Icon path={mdiAccountGroup} size={1} className="iconClass"/>
                          <Typography level="body-sm">{car.seat} Kişi</Typography>
                        </div>
                        <div className="mid-column">
                          <Icon path={mdiBagSuitcase} size={1} className="iconClass"/>
                          <Typography level="body-sm">{car.luggage} Büyük Bavul</Typography>
                        </div>
                        {/* <div className="mid-column">
                          <Icon path={mdiCarBrakeAbs} size={1} className="iconClass"/>
                          <Typography level="body-sm">ABS</Typography>
                        </div> */}
                        <div className="mid-column">
                          <Icon path={mdiGasStationOutline} size={1} className="iconClass"/>
                          <Typography level="body-sm">{car.fuelTypeEntityName}</Typography>
                        </div>
                        <div className="mid-column">
                          <Icon path={mdiCarShiftPattern} size={1} className="iconClass" />
                          <Typography level="body-sm">{car.shiftTypeEntityName}</Typography>
                        </div>
                    </Grid>
                    <Grid xs={6} sx={{paddingLeft:3}}>
                        <Typography level="title-lg" sx={{ marginBottom: 1.6 }}>Kiralama Koşulları</Typography>
                        <div className="mid-column">
                          <Icon path={mdiCalendarAccountOutline} size={1} className="iconClass"/>
                          <Typography level="body-sm">21 Yaş Ve Üstü</Typography>
                        </div>
                        <div className="mid-column">
                          <Icon path={mdiCarChildSeat} size={1} className="iconClass"/>
                          <Typography level="body-sm">Ehliyet Yaşı 1 ve Üzeri</Typography>
                        </div>
                        <div className="mid-column">
                          <Icon path={mdiCreditCardMultipleOutline} size={1} className="iconClass"/>
                          <Typography level="body-sm">1 Kredi Kartı</Typography>
                        </div>
                        <div className="mid-column">
                          
                        </div>
                    </Grid>
                </Grid>
                 
                </CardContent>
                <CardOverflow>
               <Button variant="solid" color="danger" size="lg" onClick={() => onButtonClick(car.id)}>
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