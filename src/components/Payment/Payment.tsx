import React, { useEffect, useState } from 'react';
import { AddShowRentalResponse } from '../../models/Responses/AddShowRentalResponse';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Grid, Button } from '@mui/material';
import CreditCardForm from '../CreditCardForm/CreditCardForm';
import { AppDispatch } from '../../store/configureStore';
import { addRental } from '../../store/slices/showRentalSlice';
  
interface CreditCardInfo {
  cardNumber: string;
  cardOwnerName: string;
  cardOwnerSurname: string;
  expirationDate: Date; // Tarih nesnesi olarak ayarlayın
  cvc: string;
}

const Payment: React.FC<{ 
  startDate: Date | string; 
  endDate: Date | string; 
  response: AddShowRentalResponse | undefined; 
  onPaymentProcessClick: () => void 
}> = ({ startDate, endDate, response, onPaymentProcessClick }) => {
  const [lastAmount, setLastAmount] = useState<number>(0);
  const carsState = useSelector((state: any) => state.showRental.showRental);
  const dispatch = useDispatch<AppDispatch>();
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>({
    cardNumber: '',
    cardOwnerName: '',
    cardOwnerSurname: '',
    expirationDate: new Date(), // Başlangıçta geçerli tarihle başlatın
    cvc: ''
  });
  
  useEffect(() => {
    setLastAmount(carsState[carsState.length - 1]?.response?.amount || null);
  }, [carsState]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCreditCardChange = (creditCardInfo: CreditCardInfo) => {
    setCreditCardInfo(creditCardInfo);
  };

  const handleCalculateClick = async () => {
    const formattedStartDate = typeof startDate === 'string' ? startDate : startDate.toISOString().split('T')[0];
    const formattedEndDate = typeof endDate === 'string' ? endDate : endDate.toISOString().split('T')[0];
    const customerEntityId = response?.response.customerDTO.id;
    const carEntityId = response?.response.carDTO.id;

    if (customerEntityId !== undefined && carEntityId !== undefined) {
    
      
      const addRentalRequest = await dispatch(addRental({
        customerEntityId,
        carEntityId,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        paymentTypeId: 1,
        amount: lastAmount ,
        discountCode: response?.response.discountCode,
        creditCardInformation: creditCardInfo
      }));
    
      onPaymentProcessClick();
    } else {
      console.error("Invalid customer or car ID.");
    }
  };

  const handleConfirmButtonClick = () => {
    handleCalculateClick();
    onPaymentProcessClick();
  };

  return (
    <>
      <CreditCardForm onCreditCardChange={handleCreditCardChange}/>
      <p>Fiyat : {lastAmount}</p>
      <div className="d-grid">
        <button className="btn btn-dark" onClick={handleConfirmButtonClick}>Confirm</button>
      </div>
    </>
  );
}

export default Payment;
