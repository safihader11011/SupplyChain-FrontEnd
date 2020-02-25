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
import AddMoreProducts from './AddMoreProducts/AddMoreProducts'
import {GetUser} from '../../../Services/Auth-service'
import {AddBlock} from '../../../Services/Supplier-services'
import {GetAllChains} from '../../../Services/AddBlocks'

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
    const [Loading,setLoading]=useState(false)
     

    const classes = useStyles();
  
    const inputLabel = React.useRef(null);


    const handleClose = () => {
        setOpen(false);
        window.location.reload()
    };

    const handleChange = (event, func)=> {
        func(event.target.value);
    };

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
    // const handleClick=()=>{
    //   setError(validate())
    // }

    const handleCreate=async()=>{
      //console.log(data)
      
      setLoading(true)
      const temp=Object.keys(data)
      const user=await GetUser()
      //console.log(temp)
      var items=[];
      var obj={};
      var count=0
      temp.map(item=>{
        if(item!=='blockchain'){
          if(count===0){
            obj.price=data[item];
            count++;
          }
          else if(count===1){
            obj.product=data[item];
            count++;
          }
          else if(count===2){
            obj.quantity=data[item];
            items.push(obj)
            obj=Object.assign({},{})
            count=0;
          } 
        }
      })
      var data1={};
      data1['name']=data.blockchain;
      data1['blocks']={
        name:user.name,
        role:user.role,
        data:items
      }
      const res=await AddBlock(data1,user._id)
      if(res){
        setLoading(false)
        setCreated(true)
      }
      else{
        setLoading(false)
      }
    }

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
            Loading?
              <Loader/>
              :
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

            {
              count.map((item,index)=>{
                return(
                  <AddMoreProducts data={data} setData={setData} onChange={onChange} key={index} index={index} />
                )
              })
            }
            <Grid container justify="center">
                <ButtonComponent variant="outlined" color="primary" styles={{marginTop:15}} onClick={()=>setCount([...count,1])}>Add More Items</ButtonComponent>
            </Grid>

            <Grid container justify="center">
                <ButtonComponent variant="contained" color="primary" styles={{marginTop:15,width:120}} onClick={()=>handleCreate()}>Create</ButtonComponent>
                <ButtonComponent variant="contained" color="secondary" onClick={()=>setOpen(false)} styles={{marginTop:15,width:120}}>Cancel</ButtonComponent>
            </Grid>
            </div>
            }
         </Grid> 
      </Modal>
     );
}
 
export default CreateBlockSupplierModal;