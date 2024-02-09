import React, { useEffect, useState } from 'react';
import { AddShowRentalResponse } from '../../models/Responses/AddShowRentalResponse';
import { addShowRental } from '../../store/slices/showRentalSlice';
import { AppDispatch } from '../../store/configureStore';
import { useDispatch } from 'react-redux';
import { Button, TextField, Grid, Typography, Box } from '@mui/material';


const ShowRental: React.FC<{ response: AddShowRentalResponse | undefined, onPaymentProcessClick: () => void }> = ({ response, onPaymentProcessClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState<number | undefined>(undefined);
  const [rentalResponse, setRentalResponse] = useState<AddShowRentalResponse | undefined>();


  if (!response) {
    return <div>Bilgiler yükleniyor...</div>;
  }

  const { customerDTO, carDTO, startDate, endDate, discountCode, amount } = response.response;
  const handleCalculateClick = async () => {
    const newAmountResponse = await dispatch(addShowRental({
      discountCode: discountCodeInput,
      carEntityId: carDTO.id,
      startDate: startDate,
      endDate: endDate,
      customerEntityId: customerDTO.id,
    }));

    if (newAmountResponse.payload) {
      setRentalResponse(newAmountResponse.payload as AddShowRentalResponse);
      setCalculatedAmount(rentalResponse?.response.amount);
      
    }
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom style={{textAlign: 'center', marginBottom: '20px'}}>Kiralama Detayları</Typography>
      {response ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom style={{color: 'blue'}}>Müşteri Bilgileri:</Typography>
            <Typography variant="body1" gutterBottom>
              Ad: {response.response.customerDTO?.name} <br />
              Soyad: {response.response.customerDTO?.surname} <br />
              Mail Adresi: {response.response.customerDTO?.emailAddress} <br />
              Telefon Numarası: {response.response.customerDTO?.phoneNumber} <br />
              Ehliyet Tipi: {response.response.customerDTO?.drivingLicenseTypes} <br />
              Ehliyet No: {response.response.customerDTO?.drivingLicenseNumber} <br />
              ...
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom style={{color: 'blue'}}>Araç Bilgileri:</Typography>
            <Typography variant="body1" gutterBottom>
              Marka: {response.response.carDTO?.carModelEntityBrandEntityName} <br />
              Model: {response.response.carDTO?.carModelEntityName} <br />
              Tip: {response.response.carDTO?.carBodyTypeEntityName} <br />
              Renk: {response.response.carDTO?.colorEntityName} <br />
              Yakıt Tipi: {response.response.carDTO?.fuelTypeEntityName} <br />
              Kilometre: {response.response.carDTO?.kilometer} <br />
              ...
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom style={{color: 'blue'}}>Kiralama Tarihleri:</Typography>
            <Typography variant="body1" gutterBottom>
              Başlangıç Tarihi: {response.response.startDate?.toString()} <br />
              Bitiş Tarihi: {response.response.endDate?.toString()} <br />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom style={{color: 'blue'}}>İndirim Kodu:</Typography>
            <Typography variant="body1" gutterBottom>{response.response.discountCode}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom style={{color: 'blue'}}>Fiyat:</Typography>
            <Typography variant="body1" gutterBottom>{calculatedAmount !== undefined ? calculatedAmount : response.response.amount}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Bilgiler yükleniyor...</Typography>
      )}
      <TextField
        label="İndirim Kodu"
        variant="outlined"
        fullWidth
        value={discountCodeInput}
        onChange={(e) => setDiscountCodeInput(e.target.value)}
        sx={{ mt: 3 }}
      />
      <Button onClick={handleCalculateClick} variant="contained" color="primary" sx={{ mt: 2 }}>Hesapla</Button>
      <Button onClick={onPaymentProcessClick} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>Ödeme Yap</Button>
    </Box>
  );
};

export default ShowRental;
