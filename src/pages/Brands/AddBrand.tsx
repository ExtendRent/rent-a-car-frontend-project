import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBrand } from "../../store/slices/brandSlice";
import { AppDispatch } from "../../store/configureStore";
import SideBar from "../../components/Sidebar/SideBar";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import {Button } from '@mui/material';
import * as Yup from 'yup';
import './AddBrand.css';

type Props = {};

const AddBrand = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();

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
                </div>
                </div>
            </SideBar>
        </Formik>
    );
};

export default AddBrand;
