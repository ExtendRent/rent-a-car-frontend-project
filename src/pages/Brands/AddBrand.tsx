import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBrand } from "../../store/slices/brandSlice";
import { AppDispatch } from "../../store/configureStore";
import SideBar from "../../components/Sidebar/SideBar";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import {Button } from '@mui/material';
import * as Yup from 'yup';

type Props = {};

const AddBrand = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [brandName, setBrandName] = useState("");
    const [logoImagePath, setLogoImagePath] = useState("");

    const handleAddBrand = () => {
        if (brandName.trim() !== "") {
            dispatch(addBrand({ name: brandName, logoImagePath: logoImagePath}));
            setBrandName("");
            setLogoImagePath("");
        }
    };

    const validationSchema = Yup.object().shape({
        brandName: Yup.string().required('Marka Giriniz'),
        logoImagePath: Yup.string().required('Fotoğraf Giriniz'),
    })

    return (
        <Formik
            initialValues={{ brandName: '', logoImagePath: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                handleAddBrand();
                resetForm(); // Formu sıfırla
            }}
        >
            <SideBar>
                <div className="container-car">
                    <h2 className='h2-car'>Marka Ekleme</h2>
                    <Form>
                        <div className="row">
                            <div id='select-block' className="col-md-6">
                                <div className="mb-2">
                                <FormikInput
                                    name="brandName"
                                    label="Marka Giriniz"
                                    placeHolder="Marka Giriniz."
                                    value={brandName}
                                    onChange={(value) => setBrandName(value as string)} // onChange prop'unu burada kullanıyoruz
                                    type='text'
                                />
                                </div>
                                <div className="mb-2">
                                    <FormikInput
                                        name="logoImagePath"
                                        label="Resim Giriniz"
                                        placeHolder="Resim Giriniz."
                                        value={logoImagePath}
                                        onChange={(value) => setLogoImagePath(value as string)} 
                                        type='text'
                                    />
                                </div>
                                <Button onClick={handleAddBrand}>Ekle</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </SideBar>
        </Formik>
    );
};

export default AddBrand;
