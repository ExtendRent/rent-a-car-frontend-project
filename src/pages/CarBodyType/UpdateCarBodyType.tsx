import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useParams } from 'react-router-dom';
import { fetchCarBodyTypes, getByIdCarBodyType, updateCarBodyType } from '../../store/slices/carBodyTypeSlice';
import { Button } from "@mui/joy";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { GetByIdCarBodyType } from '../../models/Responses/CarBodyType/GetByIdCarBodyType';
type Props = {}

const UpdateCarBodyType = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const carBodyTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [carBodyType, setCarBodyType] = useState<GetByIdCarBodyType>(); 
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const [selectedValue, setSelectedValue] = useState({});
  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdCarBodyType({ id: carBodyTypeId }));
      setCarBodyType((newResponse as any)?.payload); 
      console.log(newResponse);
      
      dispatch(fetchCarBodyTypes());
      
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    id: Yup.number().required("Marka seçiniz"),
    name: Yup.string().required("Model seçiniz"),
  });
  const initialValues = {
    id: carBodyType?.id,
    name:carBodyType?.name,
  };
  
  const handleUpdateCarModel = async (values: any) => {
    dispatch(updateCarBodyType(values));
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
        <div className="container-car">
          <h2 className="h2-car">Kasan Tipi Güncelleme</h2>
          <Form>
            <div className="row">
              <div id="select-block" className="col-md-6">
                <div className="mb-2">
                    <FormikSelect
                      label="Kasa Tipi Seç"
                      name="id"
                      options={carBodyTypeState.carBodyTypes.map(
                        (carBodyType: any) => ({
                          value: carBodyType.id,
                          label: carBodyType.name,
                        })
                      )}
                    />
                  </div>
                  <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="Kasa Tipi Giriniz"
                    placeHolder="Kasa Tipi Giriniz."
                    type="text"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="btn btn-primary">
              Güncelle
            </Button>
          </Form>
        </div>
      </SideBar>
    </Formik>
  )
}

export default UpdateCarBodyType