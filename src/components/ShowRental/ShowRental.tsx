import React, { useEffect, useState } from "react";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import { addShowRental } from "../../store/slices/showRentalSlice";
import { AppDispatch } from "../../store/configureStore";
import { useDispatch } from "react-redux";
import { InputAdornment, OutlinedInput, TextField } from "@mui/material";
import Button from "@mui/joy/Button";
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
import "./DiscountInput.css";
import ShowCarCard from "./CarCard/ShowCarCard";
const ShowRental: React.FC<{
  response: AddShowRentalResponse | undefined;
  onPaymentProcessClick: () => void;
}> = ({ response, onPaymentProcessClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState<number | undefined>(
    undefined
  );

  const [rentalResponse, setRentalResponse] = useState<
    AddShowRentalResponse | undefined
  >();

  if (!response) {
    return <div>Bilgiler yükleniyor...</div>;
  }
  /* tarihi reformat etmek */
  const formatDate = (tarih: Date | string) => {
    const dateObject = new Date(tarih);
    if (dateObject instanceof Date && !isNaN(dateObject.getTime())) {
      const gun = dateObject.getDate().toString().padStart(2, "0");
      const ay = (dateObject.getMonth() + 1).toString().padStart(2, "0");
      const yil = dateObject.getFullYear().toString();
      return `${gun}.${ay}.${yil}`;
    } else {
      return "Geçersiz Tarih";
    }
  };

  const calculateTotalDays = (startDate: Date, endDate: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startTime = Date.UTC(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );
    const endTime = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    const dayDifference = Math.round(Math.abs((startTime - endTime) / oneDay));

    return dayDifference;
  };

  const { customerDTO, carDTO, startDate, endDate, discountCode, amount } =
    response.response;

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

  /* const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }; */

  return (
    <div className="show-rental-container mt-4">
      <div className="text-white firstHeaderText">
        <h3>Macera Detayları</h3>
      </div>
      <div className="line"></div>

      <div className="row">
        {/* CarCard */}
        <div className="col-md-6">
          <div>
            {response && response.response.carDTO && (
              <ShowCarCard carDTO={response.response.carDTO} />
            )}
          </div>
        </div>

        {/* Kiralama Detayları */}
        <div className="col-md-6">
          <div className="text-white">
            <h5 className="second-header">Müşteri Bilgileri:</h5>
            <div className="customer-info-container">
              <div className="label-value-pair">
                <div>
                  <p>Ad:</p>
                  <p>Soyad:</p>
                  <p>Mail Adresi:</p>
                  <p>İletişim Numarası:</p>
                  <p>Ehliyet Tipi:</p>
                </div>
              </div>
              <div className="customer-values">
                <div>
                  <p>{customerDTO.name}</p>
                  <p>{customerDTO.surname}</p>
                  <p>{customerDTO.emailAddress}</p>
                  <p>{customerDTO.phoneNumber}</p>
                  <p>{customerDTO.drivingLicenseTypeEntityName}</p>
                </div>
              </div>
            </div>

            <h5 className="second-header">Araç Bilgileri:</h5>
            <div className="car-info-container">
              <div className="label-value-pair">
                <p>Marka:</p>
                <p>Model:</p>
                <p>Renk:</p>
                <p>Yıl:</p>
              </div>
              <div className="car-info-values">
                <div>
                  <p>{carDTO.carModelEntityBrandEntityName}</p>
                  <p>{carDTO.carModelEntityName}</p>
                  <p>{carDTO.colorEntityName}</p>
                  <p>{carDTO.year}</p>
                </div>
              </div>
            </div>

            <h4 className="second-header-center">Macera Tarihleri</h4>
            <div className="rental-dates-container">
              <div className="rental-date-values">
                {formatDate(startDate)} - {formatDate(endDate)}
              </div>
            </div>
          </div>

          {/* İndirim Kodu ve Hesapla Butonu */}
          <div className="mb-3 asd">
            {/* Fiyat*/}
            <div style={{ float: "left", marginTop:'auto'}}>
              <p style={{ color: "white" }}>
                <strong
                  style={{
                    alignSelf: "flex-start",
                    color: "white",
                    alignItems: "center",
                  }}
                >
                  {calculateTotalDays(startDate, endDate)}
                </strong>{" "}
                Günlük fiyat:
                <strong style={{ color: "white" }}>
                  {" "}
                  {calculatedAmount !== undefined
                    ? calculatedAmount
                    : amount}{" "}
                  TL
                </strong>
              </p>
            </div>
            <div className="input-container" style={{ float: "right" }}>
              <span className="text-white">indirim kodu</span>
              <OutlinedInput
                value={discountCodeInput}
                onChange={(e) =>
                  setDiscountCodeInput(e.target.value.toUpperCase().trim())
                }
                className="custom-input"
                placeholder="AAAA"
                style={{ width: "210px", height: "50px" }}
                endAdornment={
                  <InputAdornment position="end">
                    <Button onClick={handleCalculateClick}>Uygula</Button>
                  </InputAdornment>
                }
              />
            </div>
          </div>

          {/* checkbboxes */}
          <div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="termsCheckbox"
                /* checked={isChecked}
        onChange={handleCheckboxChange} */
                className="checkbox-input"
              />
              <label htmlFor="termsCheckbox" className="checkbox-label">
                ExtendRent
                <a
                  href="/link/to/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  kullanım şartlarını
                </a>{" "}
                okudum, anladım, kabul ediyorum.
              </label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="termsCheckbox"
                /* checked={isChecked}
        onChange={handleCheckboxChange} */
                className="checkbox-input"
              />
              <label htmlFor="termsCheckbox" className="checkbox-label">
                <a
                  href="/link/to/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kiralama koşullarını
                </a>{" "}
                okudum, anladım, kabul ediyorum.
              </label>
            </div>
          </div>
        </div>
        <Button onClick={onPaymentProcessClick} className="mt-2 button-pay">
          Ödemeye İlerle
        </Button>
      </div>
    </div>
  );
};

export default ShowRental;
