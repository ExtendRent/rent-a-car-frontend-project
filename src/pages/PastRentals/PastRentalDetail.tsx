import React, { useEffect } from "react";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import { getByIdRental } from "../../store/slices/rentalSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/useAppDispatch";

const PastRentalDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const rentalId = parseInt(id || '');
  
  // Redux store'dan veriyi al
  const rentalResponse = useAppSelector((state: RootState) => state.rental.getByIdRental);

  // useEffect kullanarak veriyi alın
  useEffect(() => {
    if (rentalId) {
      dispatch(getByIdRental({ id: rentalId }));
    } 
  }, [dispatch, rentalId]);

  // Eğer rentalResponse henüz gelmemişse veya boşsa, yükleniyor mesajını göster
  if (!rentalResponse || rentalResponse.length === 0) {
    return <div>Yükleniyor...</div>;
  }

  // rentalResponse dizisinin ilk öğesini alın
  const rentalData = rentalResponse[0].response;

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
            <strong>Başlangıç Tarihi:</strong> {rentalData.startDate.toString()}<br/>
            <strong>Bitiş Tarihi:</strong> {rentalData.endDate.toString()}<br/>
            <strong>İade Tarihi:</strong> {rentalData.returnDate.toString()}<br/>
            <strong>Ödeme Tutarı:</strong> {rentalData.paymentDetailsEntityAmount}<br/>
            <strong>Ödeme Tipi:</strong> {rentalData.paymentDetailsEntityPaymentTypeEntityPaymentTypeName}<br/>
            <strong>Kiralama Durumu:</strong> {rentalData.rentalStatusEntityName}<br/>
            <strong>İndirim Kodu:</strong> {rentalData.discountEntityDiscountCode}<br/>
            <strong>Aktif:</strong> {rentalData.active ? 'Evet' : 'Hayır'}<br/>
            <strong>Silinmiş:</strong> {rentalData.deleted ? 'Evet' : 'Hayır'}<br/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PastRentalDetail;
