import React, { useEffect, useState } from "react";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import { addShowRental } from "../../store/slices/showRentalSlice";
import { AppDispatch } from "../../store/configureStore";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CardOverflow, Grid } from "@mui/joy";
import Icon from "@mdi/react";
import {
  mdiAccountGroup,
  mdiBagSuitcase,
  mdiGasStationOutline,
  mdiCarShiftPattern,
  mdiCalendarAccountOutline,
  mdiCarChildSeat,
  mdiCreditCardMultipleOutline,
} from "@mdi/js";
import "./ShowRental.css";
import "./ShowCarCard.css";

const ShowRental: React.FC<{
  response: AddShowRentalResponse | undefined;
  onPaymentProcessClick: () => void;
}> = ({ response, onPaymentProcessClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState<number | undefined>(undefined);
  const [rentalResponse, setRentalResponse] = useState<AddShowRentalResponse | undefined>();

  if (!response) {
    return <div>Bilgiler yükleniyor...</div>;
  }

  const { customerDTO, carDTO, startDate, endDate, discountCode, amount } = response.response;

  const handleCalculateClick = async () => {
    const newAmountResponse = await dispatch(
      addShowRental({
        discountCode: discountCodeInput,
        carEntityId: carDTO.id,
        startDate: startDate,
        endDate: endDate,
        customerEntityId: customerDTO.id,
      })
    );

    if (newAmountResponse.payload) {
      setRentalResponse(newAmountResponse.payload as AddShowRentalResponse);
      setCalculatedAmount(rentalResponse?.response.amount);
    }
  };

  return (
    <div>
      Kiralama Detayları
      <div>
        Müşteri Bilgileri:
        Ad: {customerDTO?.name} <br />
        Soyad: {customerDTO?.surname} <br />
        Mail Adresi: {customerDTO?.emailAddress} <br />
        Telefon Numarası: {customerDTO?.phoneNumber} <br />
        Ehliyet Tipi: {customerDTO?.drivingLicenseTypeEntityName} <br />
        Ehliyet No: {customerDTO?.drivingLicenseNumber} <br />
      </div>
      <div>
        Kiralama Tarihleri:
        Başlangıç Tarihi: {startDate?.toString()} <br />
        Bitiş Tarihi: {endDate?.toString()} <br />
      </div>
      <div>
        İndirim Kodu: {discountCode}
      </div>
      <div>
        Fiyat: {calculatedAmount !== undefined ? calculatedAmount : amount}
      </div>
      <div>
        <input
          type="text"
          placeholder="İndirim Kodu"
          value={discountCodeInput}
          onChange={(e) => setDiscountCodeInput(e.target.value)}
          style={{
            marginTop: '16px',
            width: '100%',
            padding: '10px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <Button onClick={handleCalculateClick} color="primary" sx={{ mt: 2 }}>
        Hesapla
      </Button>
      <Button onClick={onPaymentProcessClick} sx={{ mt: 2, ml: 2 }}>
        Ödeme Yap
      </Button>

      <div className="carCard">
        <div>
          <div
            style={{
              height: 600,
              marginTop: 12,
            }}
            key={carDTO.id}
          >
            <img
              src={carDTO.imageEntityImageUrl}
              loading="lazy"
              alt=""
              style={{
                maxWidth: "100%",
                height: "-webkit-fill-available",
                marginBottom: 1.6,
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          <div style={{ display: "flex" }}>
            <div
              style={{
                borderRightStyle: "solid",
                borderWidth: 1.5,
                borderColor: "#E1DED9",
                paddingLeft: 2,
                width: "50%",
              }}
            >
              <div style={{ marginBottom: 1.6 }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Araç Özellikleri
                </span>
              </div>
              <div className="mid-column">
                <Icon path={mdiAccountGroup} size={1} className="iconClass" />
                <span>{carDTO.seat} Kişi</span>
              </div>
              <div className="mid-column">
                <Icon path={mdiBagSuitcase} size={1} className="iconClass" />
                <span>{carDTO.luggage} Büyük Bavul</span>
              </div>
              <div className="mid-column">
                <Icon path={mdiGasStationOutline} size={1} className="iconClass" />
                <span>{carDTO.fuelTypeEntityName}</span>
              </div>
              <div className="mid-column">
                <Icon path={mdiCarShiftPattern} size={1} className="iconClass" />
                <span>{carDTO.shiftTypeEntityName}</span>
              </div>
            </div>

            <div style={{ paddingLeft: 3, width: "50%" }}>
              <div style={{ marginBottom: 1.6 }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Kiralama Koşulları
                </span>
              </div>
              <div className="mid-column">
                <Icon path={mdiCalendarAccountOutline} size={1} className="iconClass" />
                <span>21 Yaş Ve Üstü</span>
              </div>
              <div className="mid-column">
                <Icon path={mdiCarChildSeat} size={1} className="iconClass" />
                <span>Ehliyet Yılı 1 ve Üzeri</span>
              </div>
              <div className="mid-column">
                <Icon path={mdiCreditCardMultipleOutline} size={1} className="iconClass" />
                <span>1 Kredi Kartı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRental;
