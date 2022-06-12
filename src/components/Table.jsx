import React from 'react'
import '../App.css'
import Table1 from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Shows', 159, 6.0, 24, 4.0),
    createData('Contestents', 237, 9.0, 37, 4.3),
    createData('Entry Tickets', 262, 16.0, 24, 6.0),
    createData('Raffle Tickets', 305, 3.7, 67, 4.3),
    createData('Cages', 356, 16.0, 49, 3.9),
  ];

export default function Table() {
  return (
    <div className='table'>
        <TableContainer component={Paper}>
      <Table1 sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>All Shows</TableCell>
            <TableCell align="right" className='tableCell'>Entry Tickets</TableCell>
            <TableCell align="right" className='tableCell'>Raffle Tickets</TableCell>
            <TableCell align="right" className='tableCell'>Cages</TableCell>
            <TableCell align="right" className='tableCell'>Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className='tableCell'>
                {row.name}
              </TableCell>
              <TableCell align="right" className='tableCell'>{row.calories}</TableCell>
              <TableCell align="right" className='tableCell'>{row.fat}</TableCell>
              <TableCell align="right" className='tableCell'>{row.carbs}</TableCell>
              <TableCell align="right" className='tableCell'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table1>
    </TableContainer>
    </div>
  )
}
