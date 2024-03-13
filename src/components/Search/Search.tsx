import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import {
  getByAllFilteredCars,
  getByDateCars,
} from "../../store/slices/carSlice";
import { AppDispatch, RootState } from "../../store/configureStore";
import { GetByDateCarResponse } from "../../models/Responses/Car/GetByDateCarResponse";
import SelectedCar from "../../pages/SelectedCar/SelectedCar";
import { AllGetByDateCarResponse } from "../../models/Responses/Car/AllGetByDateCarResponse";
import carIcon from "../../assets/coupe-car.png";
import wheelIcon from "../../assets/steering-wheel.png";
import "./Search.css";
import { Alert } from "@mui/material";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchCarResponse, setSearchCarResponse] = useState<
    AllGetByDateCarResponse | undefined
  >();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carModel.error);

  return (
    <div className="container-lg mt-5">
      <Formik
        initialValues={{
          startDate: new Date().toISOString().slice(0, 10),
          endDate: "",
        }}
        onSubmit={async (values) => {
          const { startDate, endDate } = values;
          try {
            if (!endDate) {
              setErrorMessage("Bitiş tarihini seçiniz.");
              return;
            }
        
            const parsedStartDate = new Date(startDate);
            const parsedEndDate = new Date(endDate);
        
            if (parsedEndDate < parsedStartDate) {
              setErrorMessage("Başlangıç tarihinden önce bir tarih seçemezsiniz.");
              return;
            }
        
            const startDateValue =
              parsedStartDate instanceof Date
                ? parsedStartDate.toISOString().split("T")[0]
                : parsedStartDate;
            const endDateValue =
              parsedEndDate instanceof Date
                ? parsedEndDate.toISOString().split("T")[0]
                : parsedEndDate;
        
            const response = await dispatch(
              getByAllFilteredCars({
                startDate: startDateValue,
                endDate: endDateValue,
              })
            );
        
            if (response.payload) {
              setSearchCarResponse(response.payload as AllGetByDateCarResponse);
            }
        
            navigate(`/selectedCar`, {
              state: { startDate: startDateValue, endDate: endDateValue },
            });
          } catch (error) {
            console.error("Redux action dispatch hatası:", error);
            setErrorMessage("İşlem başarısız. Lütfen tekrar deneyin.");
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="startDate"
                className="form-label text-white fs-2 text-fadeInUpFast"
              >
                Başlama Tarihi
              </label>

              <Field
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="endDate"
                className="form-label custom-label text-white fs-2 text-fadeInUpFast"
              >
                Dönüş Tarihi
              </label>
              <Field
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button type="submit" className="button3">
                Tarihe Göre Ara
                <img className="wheelIcon" src={wheelIcon} alt="wheel" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!errorCustom && successMessage && (
        <Alert severity="success">{successMessage}</Alert>
      )}
    </div>
  );
};

export default Search;
