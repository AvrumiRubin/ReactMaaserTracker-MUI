import React, { useEffect, useState } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import dateFormat from 'dateformat';

// const incomes = [
//   { id: 1, source: 'Job', amount: 5000, date: '2023-06-13' },
//   { id: 2, source: 'Gift', amount: 300, date: '2023-06-11' },
//   { id: 3, source: 'Job', amount: 2500, date: '2023-06-11' },
//   { id: 4, source: 'Investments', amount: 1000, date: '2023-06-10' }
// ]

// const groupedIncomes = [
//   {
//     source: "Job",
//     incomes:
//       [
//         { id: 1, source: "Job", amount: 5000, date: "2023-06-13" },
//         { id: 3, source: "Job", amount: 2500, date: "2023-06-11" }
//       ]
//   },
//   {
//     source: "Gift",
//     incomes:
//       [
//         { id: 2, source: "Gift", amount: 300, date: "2023-06-11" }
//       ]
//   },
//   {
//     source: "Investments",
//     incomes:
//       [
//         { id: 4, source: "Investments", amount: 1000, date: "2023-06-10" }
//       ]
//   }
// ]

const IncomePage = () => {

  const [groupBySource, setGroupBySource] = useState(false);
  const [incomes, setIncome] = useState([]);
  //const [groupedIncomes, setGroupedIncomes] = useState([]);

  const getIncomes = async () => {
    const { data } = await axios.get('/api/incomepayments/getall');
    setIncome(data);
  }

  useEffect(() => {
    getIncomes();
  }, []);

  const groupIncomePayments = () => {
    const result = [];
    for (let income of incomes) {
      const incomename = income.income.name;
      const exists = result.find(i => i.name === incomename);
      if (!exists) {
        result.push({ name: incomename, incomes: [income] });
      } else {
        exists.incomes.push(income);
      }
    }
    return result;
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />

      {!groupBySource ? (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomes.map((income) => (
                <TableRow key={income.id}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                    {income.income.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{dateFormat(income.date, "ddd mmm dd yyyy h:MM:ss TT")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        groupIncomePayments().map(({ name, incomes }) => (
          <div key={name} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
              {name}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomes.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                        {income.income.name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{dateFormat(income.date, "ddd mmm dd yyyy h:MM:ss TT")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      )}
    </Container>
  );
}

export default IncomePage;
