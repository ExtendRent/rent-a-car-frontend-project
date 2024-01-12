
import { Container, FormLabel, Grid, Input } from '@mui/joy';
import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';



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
    return (
        <Box sx={{ width: '100%', marginTop: 20 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={6} sx={{borderRightStyle: "solid",borderWidth:1.5,borderColor: "#E1DED9",paddingLeft:10}}>
            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <FormLabel sx={{ marginTop: 10, marginBottom: 10 }}>Adınızı giriniz..</FormLabel>
                <Input name='name' type='text' placeholder='Adınızı giriniz..' sx={{ width: 500 }}></Input>
                <Input name='name' type='text' placeholder='Adınızı giriniz..' sx={{ width: 500 }}></Input>
                <Input name='name' type='text' placeholder='Adınızı giriniz..' sx={{ width: 500 }}></Input>
                <Input name='name' type='text' placeholder='Adınızı giriniz..' sx={{ width: 500 }}></Input>
             </Stack>
            
            </Grid>

            <Grid xs={6} sx={{paddingRight:10}}>
            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <Input name='name' type='text' placeholder='Adınızı giriniz..' sx={{ width: 500 }}></Input>
                <Input name='name' type='text' placeholder='Adınızı giriniz..' sx={{ width: 500 }}></Input>
                <Input name='name' type='text' placeholder='Adınızı giriniz..' sx={{ width: 500 }}></Input>
                <Input name='name' type='text' placeholder='Adınızı giriniz..' sx={{ width: 500 }}></Input>

            </Stack>
            </Grid>
            </Grid>
        </Box>

    )
}