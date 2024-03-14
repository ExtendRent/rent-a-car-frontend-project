import { useState } from "react";
import { addBrand } from "../../store/slices/brandSlice";
import { RootState } from "../../store/configureStore";
import SideBar from "../../components/Sidebar/SideBar";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Alert, Button } from "@mui/material";
import * as Yup from "yup";
import "./AddBrand.css";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { addBrandImages } from "../../store/slices/imageSlice";

type Props = {};

const AddBrand = (props: Props) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | undefined>();
  const errorCustom = useAppSelector((state: RootState) => state.brand.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imageError, setImageError] = useState("");
  const handleAddBrand = async (values: any) => {
    if (typeof file === "undefined") {
      setImageError("Lütfen bir resim seçiniz");
      return;
    }

    const formData = new FormData();
    try {
      formData.append("image", file);
      const thunkParams = {
        image: formData,
        brandName: values.name,
      };
      const imageResponse = await dispatch(addBrandImages(thunkParams));
      if (imageResponse) {
        const brandImageEntityId = imageResponse.payload;
        const updatedValues = { ...values, brandImageEntityId };
        const response = await dispatch(addBrand(updatedValues));
        setSuccessMessage("İşlem başarıyla tamamlandı");
      }
    } catch (error) {
      console.error("Error : ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
    window.location.href = "/adminPanel/brands";
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    const files = target.files;

    if (files) {
      setFile(target.files[0]);
      setImageError("");
    } else {
      // Eğer resim seçilmediyse hata mesajını ayarla
      setImageError("Lütfen bir resim seçiniz");
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Marka en az 2 karakter olmalıdır")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Marka sadece harflerden oluşmalıdır"
      )
      .required("Marka Giriniz"),
  });

  return (
    <Formik
      initialValues={{ name: "", logoImagePath: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddBrand(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Marka Ekleme</h2>
            <Form>
              <div className="row-add-brand">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Marka "
                      placeHolder="Marka Giriniz."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <input type="file" name="image" onChange={handleOnChange} />
                    {imageError && <Alert severity="error">{imageError}</Alert>}
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
                    Ekle
                  </Button>
                </div>
              </div>
            </Form>
            {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
            {!errorCustom && successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
          </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default AddBrand;
