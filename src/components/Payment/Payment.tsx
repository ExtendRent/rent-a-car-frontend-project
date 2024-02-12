import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { AddShowRentalResponse } from '../../models/Responses/AddShowRentalResponse';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Grid, Button } from '@mui/material';
import CreditCardForm from '../CreditCardForm/CreditCardForm';
import { AppDispatch } from '../../store/configureStore';
import { addRental } from '../../store/slices/showRentalSlice';
import { fetchPaymentTypes } from '../../store/slices/paymentTypeSlice';
  
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
  onPaymentProcessClick: () => void;
  setLastAmount: Dispatch<SetStateAction<number>>;
}> = ({ startDate, endDate, response, onPaymentProcessClick ,setLastAmount }) => {
  const [lastAmount, setLastAmountLocal] = useState<number>(0);
  const carsState = useSelector((state: any) => state.showRental.showRental);
  const dispatch = useDispatch<AppDispatch>();
  const paymentTypeState = useSelector((state: any) => state.paymentType);
  const [paymentResponse, setPaymentResponse] = useState<number | undefined>();
  const [selectedPaymentType, setSelectedPaymentType] = useState<number>(0);
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>({
    cardNumber: '',
    cardOwnerName: '',
    cardOwnerSurname: '',
    expirationDate: new Date(), // Başlangıçta geçerli tarihle başlatın
    cvc: ''
  });
  
  useEffect(() => {
    dispatch(fetchPaymentTypes())
    setLastAmountLocal(carsState[carsState.length - 1]?.response?.amount || 0);
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
        paymentTypeId: selectedPaymentType,
        amount: lastAmount ,
        discountCode: response?.response.discountCode,
        creditCardInformation: creditCardInfo
      }));
      
        setPaymentResponse(lastAmount);
        setLastAmountLocal(lastAmount);
      
      onPaymentProcessClick();
    } else {
      console.error("Invalid customer or car ID.");
    }
  };

  const handleConfirmButtonClick = () => {
    handleCalculateClick();
    onPaymentProcessClick();
    setLastAmount(lastAmount);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paymentTypeId = parseInt(e.target.value, 10);
    setSelectedPaymentType(paymentTypeId);
    
  };

  return (
    <>
      <div className="py-4">
        <h2>Fiyat: {lastAmount}</h2>
      </div>
      <label htmlFor="paymentTypeSelect" className="form-label">Ödeme Yöntemi</label>
      <select className="form-select mb-3" value={selectedPaymentType || ""} onChange={handleSelectChange}>
        <option value="" disabled>Seçiniz</option>
        {paymentTypeState.paymentTypes.map((paymentType: any) => (
          <option key={paymentType.id} value={paymentType.id}>
            {paymentType.name}
          </option>
        ))}
      </select>
      {selectedPaymentType === 1 && (
        <CreditCardForm onCreditCardChange={handleCreditCardChange}/>
      )}
      
     
      <div className="d-grid" style={{justifyItems: 'end'}}>
        <button
          className="btn btn-dark"
          onClick={handleConfirmButtonClick}
          disabled={selectedPaymentType !== 1}
          
        >
          Ödeme
        </button>
      </div>
      {selectedPaymentType !== 1 ? (
        <p className="text-danger">Sadece kredi kartı ile ödeme yapılabilir.</p>
      ) : null}
    </>
  );
}

export default Payment;
