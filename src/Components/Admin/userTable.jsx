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


export default function UserTable({setopen,setID,rows}) {
  const classes = useStyles();

  const handleClick=(id)=>{
      console.log(id)
      setID(id)
      setopen(true)
    
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
            <TableCell align="center" className={classes.head}>Full Name</TableCell>
            <TableCell align="center" className={classes.head}>Email</TableCell>
            <TableCell align="center" className={classes.head}>Contact</TableCell>
            <TableCell align="center" className={classes.head}>Role</TableCell>
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
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
              <TableCell align="center"><ButtonComponent color="primary" variant="contained" onClick={()=>handleClick(row._id)}>Details</ButtonComponent></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      }
    </TableContainer>
  );
}