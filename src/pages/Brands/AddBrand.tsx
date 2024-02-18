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

    const handleAddBrand = (values: any) => {
        dispatch(addBrand(values));
    };

    const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Marka en az 2 karakter olmalıdır')
        .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/, 'Marka sadece harflerden oluşmalıdır')
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
                <div className="container-car">
                    <h2 className='h2-car'>Marka Ekleme</h2>
                    <Form>
                        <div className="row">
                            <div id='select-block' className="col-md-6">
                                <div className="mb-2">
                                <FormikInput
                                    name="name"
                                    label="Marka Giriniz"
                                    placeHolder="Marka Giriniz."
                                    type='text'
                                />
                                </div>
                                <div className="mb-2">
                                    <FormikInput
                                        name="logoImagePath"
                                        label="Resim Giriniz"
                                        placeHolder="Resim Giriniz."
                                        type='text'
                                    />
                                </div>
                                <Button type="submit">Ekle</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </SideBar>
        </Formik>
    );
};

export default AddBrand;
