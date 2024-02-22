import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrandModel } from '../../models/Responses/Brand/BrandModel';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchBrands, getByIdBrand, updateBrand } from '../../store/slices/brandSlice';
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { Button } from "@mui/joy";
import { addBrandImages } from '../../store/slices/imageSlice';


const UpdateBrand = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const brandId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [brand, setBrand] = useState<BrandModel>();
  const [file, setFile] = useState<File | undefined>();

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    }
    else
      fetchData();

  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
     
      const newResponse = await dispatch(getByIdBrand({id:brandId}))
      setBrand((newResponse as any)?.payload)
    
      dispatch(fetchBrands());
        
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    
    /* brandEntityId: Yup.number().required("Marka seçiniz"),
    
    carImageEntityId: Yup.string().required("Fotoğraf giriniz"), */
  });
  const initialValues = {
    name: brand?.name,
    brandImageEntityUrl: brand?.brandImageEntityUrl,
  };

  const handleUpdateBrand = async (values: any) => {
    if(typeof file === 'undefined') return;
    const formData =new FormData();
    formData.append('file',file)

    console.log(formData);
    
    const { licensePlate, carImageEntityId } = values;
    /* const imageResponse = await dispatch(addBrandImages({
      image: formData,
      licensePlate: values.licensePlate
    })); */
   
    
    dispatch(updateBrand(values));
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };
  
    // Access the selected files
    const files = target.files;
  
    // Do something with the selected files
    if (files) {
      // Process the files here
     setFile(target.files[0])
     
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
  
        handleUpdateBrand(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-car">
          <h2 className="h2-car">Marka Güncelle</h2>
          <Form>
            <div className="row">
              <div id="input-block" className="col-md-6">
                
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="Marka Giriniz"
                    placeHolder="Marka Giriniz."
                    type="text"
                  />
                </div>
                <div className="mb-2">
                  <input type='file' name='image' onChange={handleOnChange}/>
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
  );
};

export default UpdateBrand;
