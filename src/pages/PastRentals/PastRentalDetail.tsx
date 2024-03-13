import React, { useEffect } from "react";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import { getByIdRental, fetchRentals } from "../../store/slices/rentalSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/useAppDispatch";

const PastRentalDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const rentalId = parseInt(id || '');
  
  // RentalModel dizisi içinden gelen verileri alın
  const rentalResponse = useAppSelector((state: RootState) => state.rental.getByIdRental);

  // Eğer rentalResponse henüz gelmemişse veya boşsa, yükleniyor mesajını göster
  if (!rentalResponse || rentalResponse.length === 0) {
    return <div>Loading...</div>;
  }

  // rentalResponse dizisinin ilk öğesini alın
  const rentalData = rentalResponse[0];

  useEffect(() => {
    if (rentalId) {
      dispatch(getByIdRental({ id: rentalId }));
    } else {
      dispatch(fetchRentals());
    }
  }, [dispatch, rentalId]);

  // rentalData nesnesinden gelen verileri kullanarak arayüzü oluştur
  return (
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Kiralama Geçmiş Detaylarım</h2>
        <ul>
          <li>
            <strong>ID:</strong> {rentalData.id}<br/>
            <strong>Müşteri Adı:</strong> {rentalData.customerEntityName} {rentalData.customerEntitySurname}<br/>
            <strong>Marka:</strong> {rentalData.carEntityBrandEntityName}<br/>
            <strong>Model:</strong> {rentalData.carEntityModelEntityName}<br/>
            <strong>Renk:</strong> {rentalData.carEntityColorEntityName}<br/>
            <strong>Kasa Tipi:</strong> {rentalData.carBodyTypeEntityName}<br/>
            <strong>Yıl:</strong> {rentalData.carEntityYear}<br/>
            <strong>Kiralama Ücreti:</strong> {rentalData.carEntityRentalPrice}<br/>
            <strong>Araç Plakası:</strong> {rentalData.carEntityLicensePlate}<br/>
            <strong>Ödeme Tutarı:</strong> {rentalData.paymentDetailsEntityAmount}<br/>
            <strong>Ödeme Tipi:</strong> {rentalData.paymentDetailsEntityPaymentTypeEntityPaymentTypeName}<br/>
            <strong>Kiralama Durumu:</strong> {rentalData.rentalStatusEntityName}<br/>
            <strong>İndirim Kodu:</strong> {rentalData.discountEntityDiscountCode}<br/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PastRentalDetail;
