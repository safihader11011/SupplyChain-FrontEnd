import 'date-fns';
import React,{Fragment,useState,useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, Typography } from "@material-ui/core";
import Input from '../common/Input'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonComponent from '../common/Button'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
//import Joi from 'joi-browser';
import Error from '../common/Error';
import AddMoreProducts from './AddMoreProducts/AddMoreProducts'

function getModalStyle() {
    //const top = 50;
    const left = 50;
  
    return {
      //top: `${top}%`,
      left: `${left}%`,
      transform: `translate( -${left}%)`

    };
  }
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid grey",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5, 8, 8),
      outline: "none",
      minHeight:600
    },
  
    label: {
      margin: theme.spacing(4, 4),
      textAlign: "center",
      fontSize: 16,
      fontWeight: 550,
      fontFamily: "'Barlow Semi Condensed', sans-serif"
    },
    modalStyle1:{
          position:'absolute',
          top:'0%',
          left:'0%',
          overflow:'scroll',
          height:'100%',
          display:'block'
      },
    Image: {
          height:"auto",
          width:300,
          margin: "0px",
          padding: "0px",
      },
    marg: {
      margin: theme.spacing(0, 0)
    },
    p: {
      marginBottom:theme.spacing(10)
    },
    p1: {
      marginBottom:theme.spacing(3)
    },
    font1: {
      fontSize:18
    },
    bold:{
        padding:theme.spacing(3,0,3,0)
    },
    formControl: {
        margin: theme.spacing(1),
        width:"100%"
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      recp:{
        marginLeft:theme.spacing(1),
        paddingTop:theme.spacing(2),
        paddingBottom:theme.spacing(2)
      },
      marL:{
        marginLeft:theme.spacing(1),
        width:350
      }
  }));
  
const CreateBlockSupplierModal = ({cities,setOpen }) => {
    const [modalStyle] = React.useState(getModalStyle);
    const [expiryDate, setExpiryDate] = React.useState();
    const [endingDate, setEndingDate] = React.useState();
    const [startingTime, setStartingTime] = React.useState();
    const [endingTime, setEndingTime] = React.useState();
    const [initials, setInitials] = useState(false);
    const [list,setList]=useState([])
    const [selectedDate, handleDateChange] = useState(new Date());
    const [count,setCount]=useState([1])

    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const [created,setCreated]=useState(false)
     

    const classes = useStyles();
  
    const inputLabel = React.useRef(null);
    
  // const Initialize =async()=>{
  //     const Fleet=await GetFleet(); 
  //     setList(Fleet)
  //     console.log(Fleet)
  //     setInitials(true)
  // }



    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, func)=> {
        func(event.target.value);
    };

    // const handleDateChange = date => {
    //     setSelectedDate(date);
    // };

    // const schema = {
    //   vehicle:Joi.string().label('vehicle').required(),
    //   loaded:Joi.string().label('Loaded/Empty').required(),
    //   startingDate:Joi.string().label('Starting Date').required(),
    //   endingDate:Joi.string().label('Ending Date').required(),
    //   startingTime:Joi.string().label('Starting Time').required(),
    //   endingTime:Joi.string().label('Ending Time').required(),
    //   initialPoint:Joi.string().label('Initial Point').required(),
    //   preferedDestination:Joi.string().label('Prefered Destination').required(),
    // }
    
    // const validate = () => {
    //   const result = Joi.validate(data, schema, {abortEarly:false});
    
    //   if(!result.error) return null;
    
    //   const newError = {};
    //   result.error.details.map(err => {
    //     return newError[err.path[0]] = err.message;
    //       });
  
    //   return newError;   
    //   }



    const onChange = event => {
      const { id, value } = event.target;
      const temp = data;
      temp[id] = value;
      setData(temp);

    };
    
    const onChange1 = event => {
      
      const { name, value } = event.target;
      const temp = data;
      temp[name] = value;
      setData(temp);
    };

    const onChange2 = (event,name,value) => {
      
      console.log(event)
      var textValue="";
      if(value==='expiryDate'){
        const date = event.getUTCDate().toString()
        const month = (event.getUTCMonth()+1).toString()
        const year =  event.getUTCFullYear().toString()
        textValue = date + '/' + month + '/' + year;
      }
      
      console.log(textValue)
      name(event)
      const time = textValue
      const temp = data;
      temp[value] = time;
      setData(temp);

    };

    const handleCount=()=>{
      var temp=count
      temp.push(1)
      setCount(temp)
    }

    // const handleCreate = event => {
    //   if(!startingDate){
    //     var textValue="";
    //     const date = new Date().getUTCDate().toString()
    //     const month = (new Date().getUTCMonth()+1).toString()
    //     const year =  new Date().getUTCFullYear().toString()
    //     textValue =  date + '/' + month + '/' + year;
    //     const temp=data
    //     temp['startingDate']=textValue
    //     setStartingDate(new Date())
    //   }
    //   if(!endingDate){
    //     var textValue="";
    //     const date = new Date().getUTCDate().toString()
    //     const month = (new Date().getUTCMonth()+1).toString()
    //     const year =  new Date().getUTCFullYear().toString()
    //     textValue =  date + '/' + month + '/' + year;
    //     const temp=data
    //     temp['endingDate']=textValue
    //     setEndingDate(new Date())

    //   }
    //   if(!startingTime){
    //     var textValue="";
    //     const hours = new Date().getHours().toString().padStart(2, "0");
    //     const minutes = new Date().getMinutes().toString().padStart(2, "0")
    //     textValue = hours + ':' + minutes;
    //     const temp=data
    //     temp['startingTime']=textValue
    //     setStartingTime(new Date())
    //   }
    //   if(!endingTime){
    //     var textValue="";
    //     const hours = new Date().getHours().toString().padStart(2, "0");
    //     const minutes = new Date().getMinutes().toString().padStart(2, "0")
    //     textValue = hours + ':' + minutes;
    //     const temp=data
    //     temp['endingTime']=textValue
    //     setEndingTime(new Date())
    //   }
    //   console.log(data)
    //     setError(validate())
      
    //     // const temp=data;
    //     // var date=new Date()
    //     // temp['Timestamp'] = date.toLocaleString();
    //     // setData(temp);

    //    // const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
       
        

    // }

    // const handleCreateAvailability=()=>{
    //     if(!error){
    //       const temp=data;
    //       var date=new Date()
    //       temp['Timestamp'] = date.toLocaleString();
    //       setData(temp);
    //       if(CreateAvailability(data)){
    //         setCreated(true)
    //       }
    //     }
    // }
    
    return ( 
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={true}
        onClose={handleClose}
        className={classes.modalStyle1}
      >
          <Grid
          container
          xs={12}
          direction="row"
          style={modalStyle}
          className={classes.paper}
        >
          {
              created?
              <Grid container alignItems="center" justify="center">
                <Grid container alignItems="center" justify="center">
                  <Typography variant="h4" className={classes.bold}>Blockchain Created!</Typography>
                </Grid>
                <Grid container justify="center">
                  <ButtonComponent variant="contained" color="secondary" onClick={()=>handleClose()} styles={{marginTop:15,width:120}}>Close</ButtonComponent>
                </Grid>
              </Grid>
            :
            <div>
            <Grid container justify="center">
             <Typography variant="h4" className={classes.bold}>Create Blockchain</Typography>
            </Grid>

            <Input id="blockchain" variant="outlined" style={{width:"100%"}} label="Blockchain Name" placeholder="Blockchain Name" onChange={onChange} />
            {error && (error.blockchain) && <Error text={error.blockchain}/>}

            {/* <Input id="price" variant="outlined" style={{width:"100%"}} label="Price" placeholder="Price" onChange={onChange} />
            {error && (error.price) && <Error text={error.price}/>}
            
            <Input id="product" variant="outlined" style={{width:"100%"}} label="Product Name" placeholder="Product Name" onChange={onChange} />
            {error && (error.product) && <Error text={error.product}/>}

            <Input id="quantity" variant="outlined" style={{width:"100%"}} label="Quantity" placeholder="Quantity" onChange={onChange} />
            {error && (error.quantity) && <Error text={error.quantity}/>}
 
            <Grid container>
                <Grid className={classes.marL} container alignItems="center" xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                      style={{width:"100%"}}
                      margin="normal"
                      id="expiryDate"
                      format={'dd/MM/yyyy'}
                      value={expiryDate}
                      label="Expiry Date"
                      name="expiryDate"
                      onChange={(event)=>onChange2(event,setExpiryDate,'expiryDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {error && error.expiryDate && <Error text={error.expiryDate} /> }

                </Grid>
            </Grid>
            
            */}
            {
              count.map((item,index)=>{
                return(
                  <AddMoreProducts key={index}/>
                )
              })
            }
            <Grid container justify="center">
                <ButtonComponent variant="contained" color="primary" styles={{marginTop:15}} onClick={()=>setCount([...count,1])}>Add More Items</ButtonComponent>
            </Grid>

            <Grid container justify="center">
                <ButtonComponent variant="contained" color="primary" styles={{marginTop:15,width:120}}>Create</ButtonComponent>
                <ButtonComponent variant="contained" color="secondary" onClick={()=>setOpen(false)} styles={{marginTop:15,width:120}}>Cancel</ButtonComponent>
            </Grid>
            </div>
            }
         </Grid> 
      </Modal>
     );
}
 
export default CreateBlockSupplierModal;