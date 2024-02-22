import React ,{ useEffect, useState } from 'react'
import { Button } from "@mui/joy";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
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
      .required('İsim giriniz'),
    surname: Yup.string()
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Soyisim sadece harflerden oluşmalıdır')
      .required('Soyisim giriniz'),
    emailAddress: Yup.string().required('Mail Adresi Giriniz'),
    password: Yup.string().required('Şifre Giriniz'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Telefon numarası sadece sayılardan oluşmalıdır')
      .min(10, 'Telefon numarası 10 hane olmalıdır')
      .max(10, 'Telefon numarası 10 hane olmalıdır')
      .required('Telefon numarası giriniz'),
    drivingLicenseNumber: Yup.number()
      .required('Maaş giriniz'),
    expectedMinDrivingLicenseTypeId:Yup.number().required('Ehliyet giriniz'),
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
    <SideBar>
      <div className="container-car">
        <h2 className="h2-car">Bilgilerim</h2>
        <Form style={{float:'inline-start',background: "rgb(255, 244, 234)",padding:"50px",borderRadius:"10px"}}>
          <div className="row">
              <div id="select-block" className="col-md-6">
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="İsim Giriniz"
                    placeHolder="İsim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="surname"
                    label="Soyisim Giriniz"
                    placeHolder="İsim Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="emailAddress"
                    label="Mail Adresi Giriniz"
                    placeHolder="Mail Adresi Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="phoneNumber"
                    label="Telefon Numarası Giriniz"
                    placeHolder="Telefon Numarası Giriniz."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="drivingLicenseNumber"
                    label="Ehliyet Numarası Giriniz"
                    placeHolder="Ehliyet Numarası Giriniz."
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
        {/* <div style={{ width: '2px', background: 'black', margin: '0 20px' }}></div> */}
        <Form style={{float:'inline-end',background: "rgb(255, 244, 234)",padding:"50px",borderRadius:"10px"}}>
          <div className="row">
              
              <div id="select-block" className="col-md-6">
              
                <div className="mb-2">
                <label className="form-label">Mail Giriniz</label>
                <input
                    className='inputForm'
                    type="text"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="Mail Adresi Giriniz"
                  />
                </div>
                <div className="mb-2">
                <label className="form-label">Eski Şifre Giriniz</label>
                  <input
                    className='inputForm'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şu Anki Şifre"
                  />
                </div> 
                <div className="mb-2">
                <label className="form-label">Yeni Şifre Giriniz</label>
                  <input
                    className='inputForm'
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
    </SideBar>
  </Formik>
  )
}

export default UpdateCustomer