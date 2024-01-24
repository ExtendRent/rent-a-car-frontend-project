// Login.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useNavigate } from 'react-router-dom';
import { addSignIn } from '../../store/slices/signInSlice';


const Login: React.FC = () => {
  
  const dispatch =useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleSubmit = () => {
        if (email && password) {
            dispatch(
                addSignIn({
                  email,
                  password
                })
            );
        
                
        alert('Üyelik işlemi başarıyla tamamlandı');

       
        navigate('/login');
    } else {
        // Eksik bilgi varsa kullanıcıyı uyar
        alert('Lütfen tüm alanları doldurun.');
    }
    };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Giriş Yap</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="E-posta"
              type="email"
              name="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Şifre"
              type="password"
              name="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Giriş Yap
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
