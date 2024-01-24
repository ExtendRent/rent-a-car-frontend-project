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
import { fetchCars } from "../../store/slices/carSlice";
import { AppDispatch } from "../../store/configureStore";
interface CarCartProps {
  onButtonClick: (carId: string) => void;
}
export default function CarCart({ onButtonClick }: CarCartProps) {
  
  /* const [cars, setCars] = useState<CarModel[]>([]);

  useEffect(() => {
    let carService = new CarService();
  
    carService.getAll().then((result) => {
      setCars(result.data.response);
    });
  
  }, []); */

  const carsState =useSelector((state: any) => state.car);
  const dispatch =useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(fetchCars())
  },[])

  return (
    <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 ,maxWidth:1500,marginLeft:4,marginRight:4}}
      >
          {carsState.cars.map((car:any) => (
            <Grid  xs={1} sm={4} md={4}>
              <Card sx={{ height:600, marginTop: 12 }} key={car.id}>
                <Typography level="title-lg">{car.carModelEntityBrandEntityName} {car.carModelEntityName} {car.rentalPrice} TL</Typography>
                <AspectRatio minHeight="140px" maxHeight="260px" sx={{marginBottom:1.6}}>
                  <img
                    src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
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
                        <div className="mid-column">
                          <Icon path={mdiCarBrakeAbs} size={1} className="iconClass"/>
                          <Typography level="body-sm">ABS</Typography>
                        </div>
                        <div className="mid-column">
                          <Icon path={mdiGasStationOutline} size={1} className="iconClass"/>
                          <Typography level="body-sm">Dizel/Benzin</Typography>
                        </div>
                        <div className="mid-column">
                          <Icon path={mdiCarShiftPattern} size={1} className="iconClass" />
                          <Typography level="body-sm">Manuel</Typography>
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
   
  );
}