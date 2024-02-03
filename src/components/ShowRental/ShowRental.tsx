import React, { useEffect } from 'react';
import { AddShowRentalResponse } from '../../models/Responses/AddShowRentalResponse';

const ShowRental: React.FC<{ response: AddShowRentalResponse | undefined }> = ({ response }) => {
  console.log(response?.response.carDTO.carBodyTypeEntityName);
  /* if (typeof response === 'object' && typeof response.data.customerDTO === 'object') {
    console.log(response.data.customerDTO?.phoneNumber);
  } */
  if (!response) {
    return <div>Bilgiler yükleniyor...</div>;
  }

  const { customerDTO, carDTO, startDate, endDate, discountCode, amount } = response.response;

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
        <strong>Fiyat:</strong> {amount}
      </p>
    </div>
  );
};

export default ShowRental;