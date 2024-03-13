import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { useState } from "react";
import { addShiftType } from "../../store/slices/shiftTypeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert } from "@mui/material";


type Props = {};

const AddShiftType = (props: Props) => {
  
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.shiftType.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");


  const handleAddShiftType = (values: any) => {
    try {
    dispatch(addShiftType(values));
    setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Vites Tipi en az 2 karakter olmalıdır")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Vites Tipi sadece harflerden oluşmalıdır"
      )
      .required("Vites Tipi Giriniz"),
  });
  const initialValues = {
    name: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddShiftType(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Vites Tipi Ekleme</h2>
            <Form>
              <div className="row-add-carModel">
                <div id="select-block" className="col-md-6" style={{ marginTop: '110px' }}>
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Vites Tipi "
                      placeHolder="Vites Tipi Giriniz."
                      type="text"
                    />
                    <Button style={{ marginTop: '30px', backgroundColor: "rgb(140,24,24)", color: "white", width: "200px", borderRadius: "10px", marginLeft: "140px" }} type='submit'>Ekle</Button>
                  </div>
                </div>
              </div>
            </Form>
            {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
          </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default AddShiftType;
