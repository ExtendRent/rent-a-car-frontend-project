
import { Container, FormLabel, Grid, FormControl } from '@mui/joy';
import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';
import ReactInputMask from 'react-input-mask';
import { AutocompleteLoading } from '../../components/AutocompleteLoading/AutocompleteLoading';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';
import { Input } from '@mantine/core';
import { IMaskInput } from 'react-imask';








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

export default function Login({ }: Props) {
    // Bugünün tarihini al
  const today = new Date();

  // 18 yıl öncesinin tarihini hesapla
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    return (
        <Box sx={{ width: '100%', marginTop: 20 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={6} sx={{ borderRightStyle: "solid", borderWidth: 1.5, borderColor: "#E1DED9", paddingLeft: 10 }}>
                    <Stack direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <FormControl>
                            <AutocompleteLoading />
                            <FormLabel sx={{ marginBottom: 1 }}>T.C. No *</FormLabel>
                            
                            <FormLabel sx={{ marginBottom: 1 }}>Cep telefonu *</FormLabel>
                            <Input component={IMaskInput} mask="+7 (000) 000-00-00" placeholder="Your phone" />;
                             <PasswordStrength/>
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
                            <FormLabel sx={{ marginBottom: 1 }}>Soyadınız (ehliyetinizde yer aldığı gibi) *</FormLabel>
                        
                            <FormLabel sx={{ marginBottom: 1 }}>Doğum Tarihi *</FormLabel>
                            {/* <Input
                                type="date"
                                slotProps={{
                                    input: {
                                        min: '1800-06-07',
                                        max: eighteenYearsAgo.toISOString().split('T')[0], // Max tarihi 18 yıl önceye ayarla
                                    },
                                }}
                            /> */}
                            <AutocompleteLoading />
                            <FormLabel sx={{ marginBottom: 1 }}>Şifre Tekrar *</FormLabel>
                            
                        </FormControl>
                    </Stack>
                </Grid>
            </Grid>
        </Box>

    )
}