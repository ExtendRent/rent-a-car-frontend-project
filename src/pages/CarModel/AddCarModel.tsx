import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addCarModel } from '../../store/slices/carModelSlice';
import { fetchBrands } from '../../store/slices/brandSlice';
import { Button } from "@mui/joy";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikSelect from '../../components/FormikSelect/FormikSelect';

type Props = {}

const AddCarModel = (props: Props) => {

  const dispatch =useDispatch<AppDispatch>();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState =useSelector((state: any) => state.brand);
  
  useEffect(()=>{
    dispatch(fetchBrands())
  },[dispatch])

  const handleAddCarModel = (values: any) => {
      dispatch(addCarModel(values));
  };
  const validationSchema = Yup.object().shape({
    carModelEntityName: Yup.string()
      .min(2, "Marka en az 2 karakter olmalıdır")
      .required("Marka Giriniz"),
    brandEntityId: Yup.number().required('Marka seçiniz'),
  });
  const initialValues = {
    brandEntityId: "",
    carModelEntityName:"",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleAddCarModel(values);
      }}
      enableReinitialize={true}
    >
    <SideBar>
        <div className="container-car">
          <h2 className="h2-car">Marka Ekleme</h2>
          <Form>
            <div className="row">
              <div id="select-block" className="col-md-6">
                <div className="mb-2">
                    <FormikSelect
                      label="Marka Seç"
                      name="brandEntityId"
                      options={brandState.brands.map((brands: any) => ({ value: brands.id, label: brands.name }))}
                    />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="carModelEntityName"
                    label="Model Giriniz"
                    placeHolder="Model Giriniz."
                    type="text"
                  />
                </div>
                  <Button type="submit">Ekle</Button>
              </div>
            </div>
          </Form>
        </div>
      </SideBar>
    </Formik>
  )
}

export default AddCarModel