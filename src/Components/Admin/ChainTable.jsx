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
import {FaRegCheckCircle} from 'react-icons/fa'
import {GiCancel} from 'react-icons/gi'

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
  tablestyle:{
    //border:'1px solid lightgrey'
  },
  head:{
    fontSize:15,
    fontWeight:"bolder",
    color:"white"
  },
  tableHeader:{
    background:"#1C86EE",
  },
});


export default function ChainTable({setopen,rows,setRow}) {
  const classes = useStyles();

  const handleClick=(row)=>{
    setopen(true)
    setRow(row)
  }

  const deleteChain=(id)=>{
    console.log(id)
  }

  return (
    <TableContainer className={classes.tablestyle} component={Paper}>
      {
        rows.length===0?
        <Typography style={{textAlign:"center"}}>No Data Available</Typography>
        :
      <Table className={classes.table} aria-label="simple table">
        {console.log(rows)}
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell align="center" className={classes.head}>Chain Name</TableCell>
            <TableCell align="center" className={classes.head}>Time Stamp</TableCell>
            <TableCell align="center" className={classes.head}>Status</TableCell>
            <TableCell align="center" className={classes.head}>Chain Infomation</TableCell>
            <TableCell align="center" className={classes.head}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" align="center" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.timestamp}</TableCell>
              <TableCell align="center">{row.verified===false?<Typography color="error">Not Verified</Typography>:<Typography color="primary">Verified</Typography>}</TableCell>
              <TableCell align="center"><ButtonComponent variant="outlined" color="secondary" onClick={()=>deleteChain(row._id)}>Delete</ButtonComponent></TableCell>
              <TableCell align="center"><ButtonComponent color="primary" variant="contained" onClick={()=>handleClick(row)}>Details</ButtonComponent></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      }
    </TableContainer>
  );
}