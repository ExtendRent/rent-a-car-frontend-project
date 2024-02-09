import React, { useEffect, useState } from 'react';
import { AddShowRentalResponse } from '../../models/Responses/AddShowRentalResponse';
import { addShowRental } from '../../store/slices/showRentalSlice';
import { AppDispatch } from '../../store/configureStore';
import { useDispatch } from 'react-redux';


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
      //setCalculatedAmount(newAmountResponse.payload.amount);
      setRentalResponse(newAmountResponse.payload as AddShowRentalResponse);
      setCalculatedAmount(rentalResponse?.response.amount);
      
    }
  };
  return (
    <div>
      <h2>Kiralama Detayları</h2>
      <p>
        <strong>Müşteri Bilgileri:</strong>
        <br />
        ID: {customerDTO?.id} {/* Optional chaining (?) ekledik */}
        <br />
        Telefon Numarası: {customerDTO?.phoneNumber} {/* Optional chaining (?) ekledik */}
        <br />
        ...
      </p>
      <p>
        <strong>Araç Bilgileri:</strong>
        <br />
        ID: {carDTO?.id} {/* Optional chaining (?) ekledik */}
        <br />
        Marka: {carDTO?.carModelEntityBrandEntityName || "Bilgi Yok"}
        <br />
        ...
      </p>
      <p>
        <strong>Kiralama Tarihleri:</strong>
        <br />
        Başlangıç Tarihi: {startDate?.toString()} {/* Optional chaining (?) ekledik */}
        <br />
        Bitiş Tarihi: {endDate?.toString()} {/* Optional chaining (?) ekledik */}
      </p>
      <p>
        <strong>İndirim Kodu:</strong> {discountCode}
      </p>
      <p>
        <strong>Fiyat:</strong> {calculatedAmount !== undefined ? calculatedAmount : amount}
      </p>
      <div>
        <input 
          type="text" 
          value={discountCodeInput} 
          onChange={(e) => setDiscountCodeInput(e.target.value)} 
          placeholder="İndirim Kodu" 
        />
        <button onClick={handleCalculateClick}>Hesapla</button>
      </div>
      <div>
        <button onClick={() => onPaymentProcessClick()}>Ödeme Yap</button>
      </div>
      <p>sss</p>
    </div>
  );
};

export default ShowRental;