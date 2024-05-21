import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { formatCurrency } from './CurrencyFormatter';

const OverviewPage = () => {


    const [overview, setOverview] = useState(null);

    const Overview = async () => {
        const { data } = await axios.get('/api/maaserpayments/overview');
        setOverview(data);
    }

    useEffect(() => {
        Overview();
    }, []);


    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center'
            }}
        >

            <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
                {!!overview ? <>
                    <Typography variant="h2" gutterBottom>
                        Overview
                    </Typography>
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Total Income: {formatCurrency(overview.totalIncome)}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Total Maaser: {formatCurrency(overview.totalMaaser)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Maaser Obligated: {formatCurrency(overview.obligatedAmount)}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Remaining Maaser obligation: {formatCurrency(overview.remainingObligation < 0 ? "$0.00" : (overview.remainingObligation))}
                        </Typography>
                    </Box>
                </> : <>
                    <Typography variant="h5" gutterBottom>
                        Loading...
                    </Typography></>
                }
            </Paper>
        </Container>
    );
}

export default OverviewPage;
