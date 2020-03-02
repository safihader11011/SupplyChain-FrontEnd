import 'date-fns';
import React,{Fragment,useState,useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, Typography } from "@material-ui/core";
import Input from '../../common/Input'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonComponent from '../../common/Button'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
//import Joi from 'joi-browser';
import Loader from '../../common/Loader'
import Error from '../../common/Error';
import {AddBlockOther} from '../../../Services/AddBlocks'
import {GetUser} from '../../../Services/Auth-service'

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
        marginLeft:0,
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
  
const CreateBlockManufacturerModal = ({blockchains,setOpen }) => {
    const [modalStyle] = React.useState(getModalStyle);
    const [expiryDate, setExpiryDate] = React.useState();
    const [manufacturingDate, setmanufacturingDate] = React.useState();
    const [endingDate, setEndingDate] = React.useState();
    const [startingTime, setStartingTime] = React.useState();
    const [endingTime, setEndingTime] = React.useState();
    const [initials, setInitials] = useState(false);
    const [list,setList]=useState([])
    const [selectedDate, handleDateChange] = useState(new Date());
    const [count,setCount]=useState([1])
    const [map,setMap]=useState(false)
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const [created,setCreated]=useState(false)
    const [itemNo,setItemNo]=useState([])
    const [Loading,setLoading]=useState(false)
     
    var arr=[]
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
        window.location.reload()
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
      if(id==='items'){
          const temp1=data.items
          var arr1=[]
          for(let i=1;i<=temp1;i++){
                arr1.push(i)
          }
          //console.log(arr1)
          setItemNo(arr1)
          setMap(true)
        // if(!data.items){
        //   setItemNo([])
        //   setMap(false)
        // }
        // else{
        //   var temp1=itemNo
        //   for(let i=1;i<=data.items;i++){
        //     temp1.push(i)
        //   }
        //   setItemNo(temp1)
        //   setMap(true)
        // }
      }
      console.log(data)
    };


    const onChange4 = event => {
      var ans
      const { id, value } = event.target;
      if(arr.length>0){
        ans=arr.findIndex((element,index)=>{
            return(element.id===id)
        })
        if(ans>=0){
          arr.splice(ans,1)
          arr.push({id,value})
        }
        else if(ans<0){
          arr.push({id,value})
        }
      }
      else{
        arr.push({id,value})
      }
      console.log(arr)
      const temp = data;
      temp['itemDetails'] = arr;
      setData(temp);
      console.log(data)
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
      if(value==='manufacturingDate'){
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

   

    const handleCreate=async()=>{
      if(!expiryDate){
        var textValue="";
        const date = new Date().getUTCDate().toString()
        const month = (new Date().getUTCMonth()+1).toString()
        const year =  new Date().getUTCFullYear().toString()
        textValue =  date + '/' + month + '/' + year;
        const temp=data
        temp['expiryDate']=textValue
        setExpiryDate(new Date())
      }
      if(!manufacturingDate){
        var textValue="";
        const date = new Date().getUTCDate().toString()
        const month = (new Date().getUTCMonth()+1).toString()
        const year =  new Date().getUTCFullYear().toString()
        textValue =  date + '/' + month + '/' + year;
        const temp=data
        temp['manufacturingDate']=textValue
        setmanufacturingDate(new Date())
      }
      setLoading(true)
      const user=await GetUser()
      var data1={};
      data1['name']=user.name
      data1['role']=user.role
      data1['UserId']=user._id
      data1['data']=[
        data
      ]
      console.log(data1)
      const res=await AddBlockOther(data1,data.blockchains)
      if(res){
        setLoading(false)
        setCreated(true)
      }
      else{
        setLoading(false)
      }
    }
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
          justify="center"
          style={modalStyle}
          className={classes.paper}
        >
          { 
              Loading?
              <Loader/>
              :
              created?
              <Grid container alignItems="center" justify="center">
                <Grid container alignItems="center" justify="center">
                  <Typography variant="h4" className={classes.bold}>Block Added</Typography>
                </Grid>
                <Grid container justify="center">
                  <ButtonComponent variant="contained" color="secondary" onClick={()=>handleClose()} styles={{marginTop:15,width:120}}>Close</ButtonComponent>
                </Grid>
              </Grid>
            :
            <Grid container justify="center">
              
            <Grid container justify="center">
             <Typography variant="h4" style={{textAlign:"center"}} className={classes.bold}>Add Manufacturing Informaion</Typography>
            </Grid>

            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                Blockchains
            </InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            name="blockchains"
            //value={axles}
            //onChange={(event)=>handleChange(event,setAxles)}
            onChange={onChange1}
            id="blockchains"
            
            // labelWidth={labelWidth}
            >
              {
                blockchains.map((item)=>{
                  return(
                    <MenuItem value={item._id}>{item.name}</MenuItem>
                  )
                })
              }
            </Select>
        </FormControl>

            <Input id="items" variant="outlined" style={{width:"100%"}} label="Number of Items" placeholder="Number of Items" onChange={onChange} />
            {error && (error.items) && <Error text={error.items}/>}
            
            {
              map && itemNo.map((item,index)=>{
                return(
                  <div key={index}>
                    <Input id={`quantity${index+1}`} variant="outlined" style={{width:"100%"}} label={`Quantity of Item ${item}`} placeholder={`Quantity of Item ${item}`} onChange={onChange4} />
                    {error && (error.quantity) && <Error text={error.quantity}/>}
                  </div>   
                )
              })
            }

            
            <Input id="finalProduct" variant="outlined" style={{width:"100%"}} label="Quantity of Final Product" placeholder="Quantity of Final Product" onChange={onChange} />
            {error && (error.product) && <Error text={error.product}/>}

            <Grid container>
                <Grid className={classes.marL} container alignItems="center" xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                      style={{width:"100%"}}
                      margin="normal"
                      id="manufacturingDate"
                      format={'dd/MM/yyyy'}
                      value={manufacturingDate}
                      label="Manufacturing Date"
                      name="manufacturingDate"
                      onChange={(event)=>onChange2(event,setmanufacturingDate,'manufacturingDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {error && error.manufacturingDate && <Error text={error.manufacturingDate} /> }
                </Grid>
            </Grid>
            

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
            
            <Input id="price" variant="outlined" style={{width:"100%"}} label="Price" placeholder="Price" onChange={onChange} />
            {error && (error.price) && <Error text={error.price}/>}
 
           
            
            <Grid container justify="center">
                <ButtonComponent variant="contained" color="primary" styles={{marginTop:15,width:120}} onClick={()=>handleCreate()}>Create</ButtonComponent>
                <ButtonComponent variant="contained" color="secondary" onClick={()=>setOpen(false)} styles={{marginTop:15,width:120}}>Cancel</ButtonComponent>
            </Grid>
            </Grid>
            }
         </Grid> 
      </Modal>
     );
}
 
export default CreateBlockManufacturerModal;