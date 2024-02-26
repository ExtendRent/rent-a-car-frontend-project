import React, { useEffect, useState } from "react";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import { Button, TextField, Grid, Typography, Box } from "@mui/material";
import { AppDispatch } from "../../store/configureStore";
import { fetchPaymentTypes } from "../../store/slices/paymentTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./RentalDetail.css";
const RentalDetail: React.FC<{
  response: AddShowRentalResponse | undefined;
  onPaymentProcessClick: () => void;
  lastAmount: number | undefined;
}> = ({ response, onPaymentProcessClick, lastAmount }) => {
  return (
    <div className="form-rental-detail">
      <Box
        sx={{
          p: 3,
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: "center", marginBottom: "20px", color: "black" }}
        >
          Sipariş Detayları
        </Typography>
        {response ? (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#009688" }}
              >
                Müşteri Bilgileri:
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ color: "black" }}
              >
                <strong>Ad:</strong>{" "}
                <span style={{ color: "black" }}>
                  {response.response.customerDTO?.name}
                </span>
                <br />
                <strong>Soyad:</strong>{" "}
                <span style={{ color: "black" }}>
                  {response.response.customerDTO?.surname}
                </span>
                <br />
                <strong>Mail Adresi:</strong>{" "}
                <span style={{ color: "black" }}>
                  {response.response.customerDTO?.emailAddress}
                </span>
                <br />
                <strong>Telefon Numarası:</strong>{" "}
                <span style={{ color: "black" }}>
                  {response.response.customerDTO?.phoneNumber}
                </span>
                <br />
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#009688" }}
              >
                Araç Bilgileri:
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Marka:</strong>{" "}
                {response.response.carDTO?.carModelEntityBrandEntityName} <br />
                <strong>Model:</strong>{" "}
                {response.response.carDTO?.carModelEntityName} <br />
                <strong>Tip:</strong>{" "}
                {response.response.carDTO?.carBodyTypeEntityName} <br />
                <strong>Renk:</strong>{" "}
                {response.response.carDTO?.colorEntityName} <br />
                <strong>Yakıt Tipi:</strong>{" "}
                {response.response.carDTO?.fuelTypeEntityName} <br />
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#009688" }}
              >
                Kiralama Tarihleri:
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Başlangıç Tarihi:</strong>{" "}
                {response.response.startDate?.toString()} <br />
                <strong>Bitiş Tarihi:</strong>{" "}
                {response.response.endDate?.toString()} <br />
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#009688" }}
              >
                Toplam Tutar:
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{
                  fontSize: "1.5rem",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                {lastAmount} TL
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ marginTop: "20px", color: "#333" }}
              >
                Teşekkür ederiz. İyi yolculuklar!
              </Typography>
              <Link to="/">
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    color: "#fff",
                    backgroundColor: "#009688",
                  }}
                >
                  AnaSayfa'ya Dön
                </Button>
              </Link>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Bilgiler yükleniyor...</Typography>
        )}
      </Box>
    </div>
  );
};

export default RentalDetail;
