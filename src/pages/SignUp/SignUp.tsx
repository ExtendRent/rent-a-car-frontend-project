import { Container, FormLabel, Grid, FormControl } from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import { styled } from "@mui/joy/styles";
import { AutocompleteLoading } from "../../components/AutocompleteLoading/AutocompleteLoading";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";
import { InputMask } from "@react-input/mask";
import { Autocomplete, Button, PasswordInput, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { addCustomer } from "../../store/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { fetchDrivingLicenseTypes } from "../../store/slices/drivingLicenseTypeSlice";
import { Alert } from "@mui/material";

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography["body-sm"],
  textAlign: "center",
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: "1px solid",
  borderColor: theme.palette.divider,
  padding: theme.spacing(1),
  borderRadius: theme.radius.md,
}));

type Props = {};

export default function SignUp({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  const [drivingLicenseTypeEntityId, setDrivingLicenseTypeEntityId] = useState<
    number | undefined
  >(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const drivingLicenseTypeState = useSelector(
    (state: any) => state.drivingLicenseType
  );
  const handleSignUp = async () => {
    if (name && surname && emailAddress && phoneNumber && password) {
        try {
            const response = await dispatch(
                addCustomer({
                name,
                surname,
                emailAddress,
                password,
                phoneNumber,
                drivingLicenseNumber,
                drivingLicenseTypeEntityId,
                })
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
        }
        catch (error) {
            console.error("Redux action dispatch hatası:", error);
            setErrorMessage("İşlem başarısız. Lütfen tekrar deneyin.");
        }
      }

      
      
    else {
      // Eksik bilgi varsa kullanıcıyı uyar
      alert("Lütfen tüm alanları doldurun.");
    }
  };
  const data =
    emailAddress.trim().length > 0 && !emailAddress.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map(
          (provider) => `${emailAddress}@${provider}`
        )
      : [];
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDrivingLicenseTypeEntityId(parseInt(e.target.value, 10));
  };
  useEffect(() => {
    dispatch(fetchDrivingLicenseTypes());
  }, [dispatch]);
  return (
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card rent">Kayıt Ol</h2>
        <Box sx={{ width: "100%", marginTop: 10 }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid
              xs={6}
              sx={{
                borderRightStyle: "solid",
                borderWidth: 1.1,
                borderColor: "#E1DED9",
                paddingLeft: 10,
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <FormControl>
                  <TextInput
                    style={{ marginBottom: 20 }}
                    placeholder="Adınız"
                    label="Adınız"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Autocomplete
                    value={emailAddress}
                    onChange={setEmailAddress}
                    label="Email adresiniz"
                    placeholder="Email adresiniz"
                    data={data}
                  />

                  <FormLabel sx={{ marginBottom: 1, color: "white" }}>
                    Cep telefonu *
                  </FormLabel>
                  <InputMask
                    style={{
                      borderColor: "#f1f3f5",
                      borderRadius: "6px",
                      height: "50px",
                      fontSize: "15px",
                      color: "black",
                      padding: "0 12px",
                    }}
                    placeholder="Cep telefonu"
                    mask="+90 (___) ___-__-__"
                    replacement={{ _: /\d/ }}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numericValue = value
                        .substring(3)
                        .replace(/\D/g, "");
                      setPhoneNumber(numericValue);
                    }}
                  />
                </FormControl>
              </Stack>
            </Grid>

            <Grid xs={6} sx={{ paddingRight: 10 }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                bgcolor={""}
              >
                <FormControl>
                  <TextInput
                    style={{ marginBottom: 20 }}
                    placeholder="Soyadınız"
                    label="Soyadınız"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  {/* <PasswordStrength /> */}
                  <PasswordInput
                    placeholder="Şifre"
                    label="Şifre"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label style={{color: "white" }}>
                    Ehliyet Tipi *
                  </label>
                  <select
                    value={drivingLicenseTypeEntityId || ""}
                    onChange={handleSelectChange}
                    style={{ height: "51px", borderRadius: "5px"}}
                    >
                    <option value="" disabled hidden >
                      Ehliyet Tipi Giriniz
                    </option>
                    {drivingLicenseTypeState.drivingLicenseTypes.map(
                      (drivingLicenseType: any) => (
                        <option
                          key={drivingLicenseType.id}
                          value={drivingLicenseType.id}
                        >
                          {drivingLicenseType.name}
                        </option>
                      )
                    )}
                  </select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 20,
                }}
              >
                <button
                  type="submit"
                  className="button3"
                  onClick={handleSignUp}
                >
                  Üye ol
                </button>
              </Box>
              
                    {errorMessage && <Alert severity="error" style={{width:"430px"}}>{errorMessage}</Alert>}
                    {successMessage && (
                    <Alert severity="success">{successMessage}</Alert>
                    )}
                
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
