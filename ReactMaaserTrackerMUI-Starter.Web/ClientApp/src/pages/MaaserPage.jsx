import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import dateFormat, { masks } from "dateformat";



const MaaserPage = () => {

  const [maaserPayments, setMaaserPayments] = useState([]);


const GetMaaserPayments = async () => {
  const {data} = await axios.get('/api/maaserpayments/getmaaser')
  setMaaserPayments(data);
}

useEffect(() => {
  GetMaaserPayments();
}, []);


  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Maaser Payments History
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Recipient</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maaserPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                  {payment.recipient}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>${payment.amount}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>{dateFormat(payment.date,"ddd mmm dd yyyy h:MM:ss TT ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MaaserPage;
