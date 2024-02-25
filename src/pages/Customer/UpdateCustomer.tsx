import React ,{ useEffect, useState } from 'react'
import { Button } from "@mui/joy";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useParams } from 'react-router-dom';
import { GetByIdCustomerModel } from '../../models/Responses/Customer/GetByIdCustomerModel';
import { fetchCustomers, getByIdCustomer, updateCustomer } from '../../store/slices/customerSlice';
import { fetchDrivingLicenseTypes } from '../../store/slices/drivingLicenseTypeSlice';
import Divider from '@mui/material/Divider';
import { isUserTrue } from '../../store/slices/signInSlice';
import { changePassword } from '../../store/slices/userSlice';
import './UpdateCustomer.css';
import walpaper from '../../assets/wall9.jpg'
type Props = {}

const UpdateCustomer = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  
  const customerId = parseInt(id ?? "", 10);
  const [file, setFile] = useState<File | undefined>();
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [customer, setCustomer] = useState<GetByIdCustomerModel>(); 
  const customerState = useSelector((state: any) => state.customer);
  const [selectedValue, setSelectedValue] = useState({});
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const expectedMinDrivingLicenseTypeState = useSelector(
    (state: any) => state.drivingLicenseType
  );
  
  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdCustomer({ id: customerId }));
      setCustomer((newResponse as any)?.payload); 
      console.log(newResponse);
      
      dispatch(fetchCustomers());
      dispatch(fetchDrivingLicenseTypes());
     
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'İsim sadece harflerden oluşmalıdır')
      .required('İsim '),
    surname: Yup.string()
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Soyisim sadece harflerden oluşmalıdır')
      .required('Soyisim '),
    emailAddress: Yup.string().required('Mail Adresi '),
    password: Yup.string().required('Şifre '),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Telefon numarası sadece sayılardan oluşmalıdır')
      .min(10, 'Telefon numarası 10 hane olmalıdır')
      .max(10, 'Telefon numarası 10 hane olmalıdır')
      .required('Telefon numarası '),
    drivingLicenseNumber: Yup.number()
      .required('Maaş '),
    expectedMinDrivingLicenseTypeId:Yup.number().required('Ehliyet '),
  })

  const initialValues = {
    name:customer?.name,
    surname:customer?.surname,
    emailAddress:customer?.emailAddress,
    phoneNumber:customer?.phoneNumber,
    drivingLicenseNumber: customer?.drivingLicenseNumber,
    status:customer?.status,
    authority:customer?.authority,
    expectedMinDrivingLicenseTypeId:customer?.drivingLicenseTypeId,
  }
  
  const handleUpdateCustomer = async (values: any) => {
    dispatch(updateCustomer(values));
    window.location.reload();

  };
  const handleClick =async () => {
    if (!mail || !password || !newPassword) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
    } else if (password === newPassword) {
      setErrorMessage('Yeni şifre, eski şifre ile aynı olamaz.');
    } else {
      const isUser = await dispatch(isUserTrue({email:mail,password:password}));
      if(isUser){
        try {
          const changePass = await dispatch(changePassword({ id: customerId, password: newPassword }));
          // İstek başarılı olduysa
          console.log(changePass); // Değişiklik ile ilgili bilgileri burada kullanabilirsiniz
          // Başarılı mesajını set et
          setSuccessMessage('Şifreniz başarıyla güncellendi.');
          window.location.reload();
          
        } catch (error) {
          // İstek başarısız olduysa
          console.error('Şifre değiştirme işlemi başarısız:', error);
          // Hata mesajını set et
          setErrorMessage('Şifre değiştirme işlemi başarısız oldu.');
        }
      
      }
      setErrorMessage('');
    }
  };
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
 
      setSelectedValue(values);
      handleUpdateCustomer(values);
          

    }}
    enableReinitialize={true}
  >

      <div className="container-card">{/* <img src={walpaper} alt="Logo"/> */}
        <div className='form'>
          <h2 className="h2-card">Bilgilerim</h2>
          <Form style={{float:'inline-start',padding:"50px",borderRadius:"10px"}}>
            <div className="row">
                <div id="select-block" className="col-md-6">
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="İsim "
                      placeHolder="İsim ."
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="surname"
                      label="Soyisim "
                      placeHolder="İsim ."
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="emailAddress"
                      label="Mail Adresi "
                      placeHolder="Mail Adresi ."
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="phoneNumber"
                      label="Telefon Numarası "
                      placeHolder="Telefon Numarası ."
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="drivingLicenseNumber"
                      label="Ehliyet Numarası "
                      placeHolder="Ehliyet Numarası ."
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Ehliyet Tipi Seç"
                      name="expectedMinDrivingLicenseTypeId"
                      options={expectedMinDrivingLicenseTypeState.drivingLicenseTypes.map(
                        (drivingLicenseType: any) => ({
                          value: drivingLicenseType.id,
                          label: drivingLicenseType.name,
                        })
                      )}
                    />
                  </div>
                </div>
              
            </div>
            <Button type="submit" className="btn btn-primary">
              Güncelle
            </Button>
          </Form>
          
          <Form style={{float:'inline-end',padding:"50px",borderRadius:"10px"}}>
            <div className="row">
                
                <div id="select-block" className="col-md-6">
                
                  <div className="mb-2">
                  <label className="form-label">Mail </label>
                  <input
                      className='info'
                      type="text"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      placeholder="Mail Adresi "
                    />
                  </div>
                  <div className="mb-2">
                  <label className="form-label">Eski Şifre </label>
                    <input
                      className='info'
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Şu Anki Şifre"
                    />
                  </div> 
                  <div className="mb-2">
                  <label className="form-label">Yeni Şifre </label>
                    <input
                      className='info'
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Yeni Şifre"
                    />
                  </div> 
                </div>
            </div>
            <Button onClick={handleClick}>Güncelle</Button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </Form>
        </div>
      </div>
 
  </Formik>
  )
}

export default UpdateCustomer