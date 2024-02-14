import React, { FormEvent, useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useNavigate } from 'react-router-dom';
import { addSignIn } from '../../store/slices/signInSlice';
import { Formik, Form, Field, ErrorMessage, FieldInputProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Autocomplete, PasswordInput } from '@mantine/core';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (values: { email: string }) => {
    const { email } = values;

    if (email && password) {
      try {
        const signInData = await dispatch(addSignIn({ email, password }));

        alert('Üyelik işlemi başarıyla tamamlandı');
        navigate('/');
      } catch (error) {
        console.error('Hata:', error);
        alert('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  };

  const data = ['gmail.com', 'outlook.com', 'yahoo.com'];

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Lütfen bu alanı doldurunuz'), // Email alanının hata mesajını değiştirdik
    password: Yup.string().required('Lütfen bu alanı doldurunuz'), // Password alanının hata mesajını değiştirdik
  });

  const initialValues = {
    email: '',
    password: '',
    // Diğer alanlar buraya eklenebilir
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Giriş Yap</h2>
              <Form>
                <Autocomplete
                  label="Email adresiniz"
                  placeholder="Email adresiniz"
                  value={values.email}
                  onChange={(value) => setFieldValue('email', value || '')}
                  data={data.map((provider) => `${values.email}@${provider}`)}
                />
                <ErrorMessage name="email" component="div" className="error" />
                <Field name="password">
                    {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<any>; }) => (
                      <div> {/* PasswordInput bileşeninin yanına hata mesajını eklemek için bir div ekledik */}
                        <PasswordInput
                          placeholder="Şifre"
                          label="Şifre"
                          required
                          value={field.value}
                          onChange={(event) => {
                            form.setFieldValue('password', event.target.value); 
                          }}
                        />
                      <ErrorMessage name="password">
                        {message => <div className="error">{message}</div>}
                      </ErrorMessage>
                      </div>
                    )}
                  </Field>
                <Button type="submit" variant="contained" color="primary">
                  Giriş Yap
                </Button>
              </Form>
            </Grid>
          </Grid>
        </Container>
      )}
    </Formik>
  );
};

export default Login;
