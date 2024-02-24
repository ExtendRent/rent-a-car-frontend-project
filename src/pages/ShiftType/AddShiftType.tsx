import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useState } from "react";
import { addShiftType } from "../../store/slices/shiftTypeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";

type Props = {};

const AddShiftType = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddShiftType = (values: any) => {
    dispatch(addShiftType(values));
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
            <div className="row">
              <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="Vites Tipi Giriniz"
                    placeHolder="Vites Tipi Giriniz."
                    type="text"
                  />
                  <Button type="submit">Ekle</Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default AddShiftType;
