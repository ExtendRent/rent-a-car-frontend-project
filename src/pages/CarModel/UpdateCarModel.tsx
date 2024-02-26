import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BrandModel } from "../../models/Responses/Brand/BrandModel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { fetchBrands } from "../../store/slices/brandSlice";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Button } from "@mui/joy";
import {
  fetchCarModels,
  getByIdCarModels,
  updateCarModel,
} from "../../store/slices/carModelSlice";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { GetByIdCarModelModel } from "../../models/Responses/CarModel/GetByIdCarModelModel";
import "./CarModel.css";
type Props = {};

const UpdateCarModel = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const carModelId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [carModel, setCarModel] = useState<GetByIdCarModelModel>();
  const [file, setFile] = useState<File | undefined>();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState = useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdCarModels({ id: carModelId }));
      setCarModel((newResponse as any)?.payload.response);

      dispatch(fetchCarModels());
      dispatch(fetchBrands());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    brandEntityId: Yup.number().required("Marka seçiniz"),

    carModelEntityId: Yup.number().required("Model seçiniz"),
    carModelEntityName: Yup.string().required("Model giriniz."),
  });
  const initialValues = {
    brandEntityId: carModel?.brandEntityId,
    carModelEntityId: carModel?.id,
    carModelEntityName: carModel?.name,
  };

  const handleUpdateCarModel = async (values: any) => {
    dispatch(updateCarModel(values));
    // Sayfayı yenile
    window.location.reload();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleUpdateCarModel(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Model Güncelleme</h2>
            <Form>
              <div className="row-add-carModel">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikSelect
                      label="Marka Seç"
                      name="brandEntityId"
                      options={brandState.brands.map((brands: any) => ({
                        value: brands.id,
                        label: brands.name,
                      }))}
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Araç Model Seç"
                      name="carModelEntityId"
                      options={carModelState.carModel.map((carModel: any) => ({
                        value: carModel.id,
                        label: carModel.name,
                      }))}
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
          </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default UpdateCarModel;
