import  { useState } from "react";
import { addBrand } from "../../store/slices/brandSlice";
import { RootState } from "../../store/configureStore";
import SideBar from "../../components/Sidebar/SideBar";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import {Alert, Button } from '@mui/material';
import * as Yup from 'yup';
import './AddBrand.css';
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";

type Props = {};

const AddBrand = (props: Props) => {
    const dispatch = useAppDispatch();
    const errorCustom = useAppSelector((state: RootState) => state.brand.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

    const handleAddBrand = (values: any) => {
        dispatch(addBrand(values));
    };

    const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Marka en az 2 karakter olmalıdır')
        .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Marka sadece harflerden oluşmalıdır')
        .required('Marka Giriniz'),
    logoImagePath: Yup.string().required('Fotoğraf Giriniz'),
    });


    return (
        <Formik
            initialValues={{ name: '', logoImagePath: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleAddBrand(values);
            }}
            enableReinitialize={true}
        >
            <SideBar>
                <div className="container-card">
                <div className="form">
                    <h2 className='h2-card'>Marka Ekleme</h2>
                    <Form>
                        <div className="row-add-brand">
                            <div id='select-block' className="col-md-6" style={{marginTop:'110px'}}>
                                <div className="mb-2">
                                <FormikInput
                                    name="name"
                                    label="Marka "
                                    placeHolder="Marka Giriniz."
                                    type='text'
                                />
                                </div>
                                <div className="mb-2">
                                    <FormikInput
                                        name="logoImagePath"
                                        label="Resim "
                                        placeHolder="Resim Giriniz."
                                        type='text'
                                    />
                                </div>
                                <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px", marginLeft:"140px" }} type='submit'>Ekle</Button>
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
