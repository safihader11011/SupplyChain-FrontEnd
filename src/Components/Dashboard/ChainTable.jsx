import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonComponent from '../common/Button'

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});


export default function ChainTable({setopen,rows,setRow}) {
  const classes = useStyles();

  const handleClick=(row)=>{
    setopen(true)
    setRow(row)
  }

  return (
    <TableContainer style={{padding:15}} component={Paper}>
      {
        rows.length===0?
        <Typography style={{textAlign:"center"}}>No Data Available</Typography>
        :
      <Table className={classes.table} aria-label="simple table">
        {console.log(rows)}
        <TableHead>
          <TableRow>
            <TableCell>Chain Name</TableCell>
            <TableCell align="right">Time Stamp</TableCell>
            <TableCell align="right">Chain Infomation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.timestamp}</TableCell>
              <TableCell align="right"><ButtonComponent color="primary" variant="contained" onClick={()=>handleClick(row)}>Details</ButtonComponent></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      }
    </TableContainer>
  );
}