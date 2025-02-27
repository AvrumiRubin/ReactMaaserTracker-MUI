import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// const sources = [
//     { label: 'Job' },
//     { label: 'Gift' },
//     { label: 'Savings' },
//     { label: 'Investments' },
//     { label: 'Other' },
// ];



const AddIncomePage = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [incomeSource, setIncomeSource] = useState([]);
    const [selectedSource, setSelectedSource] = useState(0);
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();

    const GetSources = async () => {
        const { data } = await axios.get('/api/income/getincome')
        setIncomeSource(data)
    }
    useEffect(() => {
        GetSources();
    }, []);


    const addPayment = async () => {
        await axios.post('/api/incomepayments/addpayment',{IncomeId: selectedSource.id, amount, date: selectedDate})
        navigate('/income');
    }



    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={incomeSource}
                getOptionLabel={(option) => option.name}
                fullWidth
                margin="normal"
                onChange={(e, value) => setSelectedSource(value)}
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                onChange={e => setAmount(e.target.value)}
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" onClick={addPayment} color="primary">Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
