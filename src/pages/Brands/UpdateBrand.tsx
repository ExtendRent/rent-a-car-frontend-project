import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BrandModel } from "../../models/Responses/Brand/BrandModel";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import {
  fetchBrands,
  getByIdBrand,
  updateBrand,
} from "../../store/slices/brandSlice";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Button } from "@mui/joy";
import { addBrandImages } from "../../store/slices/imageSlice";
import "./Brand.css";
import { Alert } from "@mui/material";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";

const UpdateBrand = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const brandId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [brand, setBrand] = useState<BrandModel>();
  const [file, setFile] = useState<File | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.brand.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdBrand({ id: brandId }));
      setBrand((newResponse as any)?.payload);

      dispatch(fetchBrands());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Marka Giriniz."),
  });
  const initialValues = {
    id: brandId,
    name: brand?.name,
    brandImageEntityUrl: brand?.brandImageEntityUrl,
    brandImageEntityId: brand?.brandImageEntityId,
  };

  const handleUpdateBrand = async (values: any) => {
    try {
      const response = await dispatch(updateBrand(values));

      if ("error" in response) {
        if (response.error.message && response.error.message.includes("1007")) {
          setErrorMessage("İşlem başarısız.");
          console.log(response);
        } else {
          setErrorMessage("İşlem başarısız.");
          console.log(response);
        }
      } else {
        setSuccessMessage("Marka Güncellendi.");
        setTimeout(() => {
          setSuccessMessage("");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Redux action dispatch hatası:", error);
      setErrorMessage("İşlem başarısız. Lütfen tekrar deneyin.");
    }
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    // Access the selected files
    const files = target.files;

    // Do something with the selected files
    if (files) {
      // Process the files here
      setFile(target.files[0]);
    }
  };
  return (
    <SideBar>
       <div className="container-card">
          <div className="form">
          <h2 className="h2-card">Marka Güncelle</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleUpdateBrand(values);
      }}
      enableReinitialize={true}
    >
            <Form>
              <div className="row-update-brand">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Marka"
                      placeHolder="Marka Giriniz."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <input type="file" name="image" onChange={handleOnChange} />
                  </div>
                  <Button
                    style={{
                      marginTop: "30px",
                      backgroundColor: "rgb(140,24,24)",
                      color: "white",
                      width: "200px",
                      borderRadius: "10px",
                      marginLeft: "140px",
                    }}
                    type="submit"
                  >
                    Güncelle
                  </Button>
                </div>
              </div>
            </Form>
            </Formik>
            {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
          
          {!errorCustom && successMessage && (
          <Alert severity="success">{successMessage}</Alert>
  )}
          </div>
        </div>
      </SideBar>
    
  );
};

export default UpdateBrand;
