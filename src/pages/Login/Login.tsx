import React, { FormEvent, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useNavigate } from "react-router-dom";
import { addSignIn } from "../../store/slices/signInSlice";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldInputProps,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import { Autocomplete, PasswordInput } from "@mantine/core";
import { Alert } from "@mui/material";
import { ErrorResponse } from "../../services/signInService";
import { unwrapResult } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import "./Login.css";

const Login: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await dispatch(
        addSignIn({ email: values.email, password: values.password })
      );
      if ("error" in response) {
        if (response.error.message && response.error.message.includes("1007")) {
          setErrorMessage("Giriş başarısız. Kullanıcı bulunamadı.");
        } else {
          setErrorMessage("Giriş başarısız. Lütfen tekrar deneyin.");
          console.log(response);
        }
      } else {
        setSuccessMessage("Hoşgeldiniz! Giriş başarılı.");
        setTimeout(() => {
          setSuccessMessage("");
          window.location.reload();
          //navigate("/");
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.error("Redux action dispatch hatası:", error);
      setErrorMessage("Giriş başarısız. Lütfen tekrar deneyin.");
    }
  };

  const data = ["gmail.com", "outlook.com", "yahoo.com"];

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Geçerli bir e-posta adresi giriniz")
      .required("E-posta adresi boş geçilemez"),
    password: Yup.string().required("Şifre boş geçilemez"),
    /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir'
    ), */
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="container-card">
      <div className="form-login">
        <div className="login-card">
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2 className="h2-card">Giriş Yap</h2>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <Autocomplete
                        label=""
                        placeholder="Email adresiniz"
                        value={values.email}
                        onChange={(value) =>
                          setFieldValue("email", value || "")
                        }
                        data={data.map(
                          (provider) => `${values.email}@${provider}`
                        )}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                      <Field name="password">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<string>;
                          form: FormikProps<any>;
                        }) => (
                          <div>
                            <PasswordInput
                              placeholder="Şifre"
                              label=""
                              value={field.value}
                              onChange={(event) => {
                                form.setFieldValue(
                                  "password",
                                  event.target.value
                                );
                              }}
                            />
                            <ErrorMessage name="password">
                              {(message) => (
                                <div className="text-danger">{message}</div>
                              )}
                            </ErrorMessage>
                          </div>
                        )}
                      </Field>
                      <button type="submit" className="button3">
                        Giriş Yap
                      </button>
                    </Form>
                  )}
                </Formik>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {successMessage && (
                  <Alert severity="success">{successMessage}</Alert>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Login;
