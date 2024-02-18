
import { Container, FormLabel, Grid, FormControl } from '@mui/joy';
import React, { useRef, useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';
import { AutocompleteLoading } from '../../components/AutocompleteLoading/AutocompleteLoading';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';
import { InputMask } from '@react-input/mask';
import { Autocomplete, Button, PasswordInput, TextInput } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addCustomer } from '../../store/slices/customerSlice';
import { useNavigate } from 'react-router-dom';





const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography['body-sm'],
    textAlign: 'center',
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
}));

type Props = {}

export default function SignUp({ }: Props) {

    const dispatch =useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState<number>();
    const [password, setPassword] = useState('');
    const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
    const [drivingLicenseTypes, setDrivingLicenseTypes] = useState<string[]>(["B"]);

    const handleSignUp = () => {
         /* if (name && surname && emailAddress && phoneNumber && password) {
            dispatch(
                addCustomer({
                    name,
                    surname,
                    emailAddress,
                    password,
                    phoneNumber,
                    drivingLicenseNumber,
                    drivingLicenseTypes
                }) 
            );
        
      
        alert('Üyelik işlemi başarıyla tamamlandı');

        // Form elemanlarını temizle
        setName('');
        setSurname('');
        setEmailAddress('');
        setPhoneNumber(0); // Eğer phoneNumber bir sayı olmalıysa
        setPassword('');
        navigate('/login');

    } else {
        // Eksik bilgi varsa kullanıcıyı uyar
        alert('Lütfen tüm alanları doldurun.');
    } */
    };
    const data =
    emailAddress.trim().length > 0 && !emailAddress.includes('@')
        ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${emailAddress}@${provider}`)
        : [];
    return (
        <Box sx={{ width: '100%', marginTop: 10 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={6} sx={{ borderRightStyle: "solid", borderWidth: 1.5, borderColor: "#E1DED9", paddingLeft: 10 }}>
                    <Stack direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <FormControl>
                        <TextInput
                            style={{ marginBottom: 20 }}
                            placeholder="Adınız"
                            label="Adınız"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            <Autocomplete
                            value={emailAddress}
                            onChange={setEmailAddress}
                            label="Email adresiniz"
                            placeholder="Email adresiniz"
                            data={data}
                            
                            />
                            
                            <FormLabel sx={{ marginBottom: 1 }}>Cep telefonu *</FormLabel>
                            <InputMask 
                                style={{ borderColor: '#f1f3f5' }} 
                                mask="+90 (___) ___-__-__" 
                                replacement={{ _: /\d/ }} 
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları al
                                    setPhoneNumber(Number(numericValue.replace(/^90/, '')));
                                }}/>
                            
                        </FormControl>
                    </Stack>

                </Grid>

                <Grid xs={6} sx={{ paddingRight: 10 }}>
                    <Stack direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        bgcolor={""}>
                        <FormControl>

                            <TextInput
                                style={{ marginBottom: 20 }}
                                placeholder="Soyadınız"
                                label="Soyadınız"
                                required
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                />   
                                <PasswordStrength/>
                                <PasswordInput 
                                    placeholder="Şifre" 
                                    label="Şifre" 
                                    required 
                                    onChange={(e) => setPassword(e.target.value)}/>

                        </FormControl>
                    </Stack>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSignUp}>
                        Üye ol
                    </Button>
                </Grid>
            </Grid>
        </Box>

    )
}