// ShowRental.tsx

import React, { useEffect, useState } from 'react';
import { AddShowRentalResponse } from '../../models/Responses/Rental/AddShowRentalResponse';
import { addShowRental } from '../../store/slices/showRentalSlice';
import { AppDispatch } from '../../store/configureStore';
import { useDispatch } from 'react-redux';
import { Button, TextField, Grid, Typography, Box } from '@mui/material';
import "./ShowRental.css";

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
    <Box className="show-rental-container" sx={{ p: 3 }}>
      <Typography className="title" variant="h4" gutterBottom>Kiralama Detayları</Typography>
      {response ? (
        <Grid container spacing={2}>
          {/* ... (existing JSX code) */}
        </Grid>
      ) : (
        <Typography variant="body1">Bilgiler yükleniyor...</Typography>
      )}
      <TextField
        className="discount-code-input"
        label="İndirim Kodu"
        variant="outlined"
        fullWidth
        value={discountCodeInput}
        onChange={(e) => setDiscountCodeInput(e.target.value)}
        sx={{ mt: 3 }}
      />
      <Box className="buttons">
        <Button className="button" onClick={handleCalculateClick} variant="contained" color="primary" sx={{ mt: 2 }}>Hesapla</Button>
        <Button className="button" onClick={onPaymentProcessClick} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>Ödeme Yap</Button>
      </Box>
    </Box>
  );
};

export default ShowRental;
