import React, { useState, useEffect } from 'react';
import { Grid, Typography, Hidden, Divider,Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import Loader from '../common/Loader'
// import { Logout } from '../Services/Auth-Service';
// import queryString from 'query-string';
// import Members from './Components/Members'
// import OrderDetails from './Components/OrderDetails'
// import Products from './Components/Products/Products';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import { People, MeetingRoom } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
// import TransporterModal from './common/TranspoterModal'
// import TransporterTable from './common/TransporterTable'
// import Availability from './Availability'
import CreateBlockSupplierModal from './Supplier/CreateBlockSupplierModal'
import CreateBlockManufacturerModal from './Manufacturer/CreateBlockManufacturerModal'
import CreateBlockTransporterModal from './Transporter/CreateBlockTransporterModal'
import CreateBlockRetailerModal from './Retailer/CreateBlockRetailerModal'
import CreateBlockConsumerModal from './Consumer/CreateBlockConsumerModal'
 
// import {Logout} from '../../Services/Auth-Services'
// import {GetFleet,GetAvailability,GetShipperInformation} from '../../Services/Transporter-Services'
// import ShipperInformationTable from '../Dashboard/common/Booking/TransporterBooking'
// import {GetAllCities} from '../../Services/admin-Services'


const useStyles = makeStyles(theme => ({
    pic:{
        border:"2px solid #2e3344",
        marginTop:theme.spacing(14),
        //borderRadius:theme.spacing(50)
    },
    padd:{
        marginTop:theme.spacing(3),
        paddingLeft:theme.spacing(2),
        marginBottom:theme.spacing(3)
    },
    paddR:{
        paddingRight:theme.spacing(3),
        position:"relative",
        top:3,

    },
    paddT:{
        paddingTop:theme.spacing(4),
    },
    select:{
        paddingLeft:theme.spacing(7),
        backgroundColor:"#c0c0c0",
        width:188,
        color:"white",
        paddingTop:theme.spacing(3),
        paddingBottom:theme.spacing(3),
        cursor:"pointer",
        transition:"background 0.5s"
    },
    notSelect:{
        paddingLeft:theme.spacing(7),
        width:188,
        paddingTop:theme.spacing(3),
        paddingBottom:theme.spacing(3),
        cursor:"pointer",
        transition:"background 0.5s"
    },
    font:{
        fontWeight:200,
        fontSize:17,
        color:"white"
    },
    root: {
        flexGrow: 1,
        width:'100%',
        bottom:0,
        position:"fixed",
        height:80,
    },
    Top:{
        margin:theme.spacing(3)
    }
}));


const Dashboard = (props) => {
    const [initials, setInitials] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [value, setValue] = useState(0);
    const [modal,setModal]=useState(false)
    const [modal1,setModal1]=useState(false)
    const [avail,setAvail]=useState(null)
    const [book,setBook]=useState(null)
    const [cities,setCities]=useState(null)

    
    const rows1=[
        {
            registration:12345,
            axles:4,
            tonnage:10,
            height:50,
            width:80,
            length:100,
            productType:"Vehicle",
            vehicleType:"Truck",
            Timestamp:new Date().getTime()
        },
        {
            registration:12345,
            axles:2,
            tonnage:10,
            height:50,
            width:80,
            length:100,
            productType:"Vehicle",
            vehicleType:"Truck",
            Timestamp:new Date().getTime()
        },
        {
            registration:12345,
            axles:3,
            tonnage:10,
            height:50,
            width:80,
            length:100,
            productType:"Vehicle",
            vehicleType:"Truck",
            Timestamp:new Date().getTime()
        },
        {
            registration:12345,
            axles:5,
            tonnage:10,
            height:50,
            width:80,
            length:100,
            productType:"Vehicle",
            vehicleType:"Truck",
            Timestamp:new Date().getTime()
        },
        {
            registration:12345,
            axles:2,
            tonnage:10,
            height:50,
            width:80,
            length:100,
            productType:"Vehicle",
            vehicleType:"Truck",
            Timestamp:new Date().getTime()
        },
        
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
    };

    const {role}=props.match.params

    // const handleLogout=()=>{
    //      setLoading(true);
    //     Logout();
    // }


    // useEffect(()=>{
        
    //     const Initialize=async()=>{
    //         const rows=await GetFleet()
    //         const city=await GetAllCities()
    //         setCities(city)
    //         // const av=await GetAvailability()
    //         // setAvail(av)
    //         setData(rows)
    //         if(data ){
    //             setInitials(true);
                
    //         }
    //     }
        
    //     const Initialize1=async()=>{
    //         const av=await GetAvailability()
    //         setAvail(av)
    //         if(avail){
    //             setInitials(true);
    //         }
    //     }

    //     const Initialize2=async()=>{
    //         const ship=await GetShipperInformation()
    //         setBook(ship)
    //         if(book){
    //             setInitials(true);
    //         }
    //     }

        

    //     if(!initials){
    //         Initialize()
    //         Initialize1() 
    //         Initialize2()
    //     }
    //     if(!modal){
    //         Init()
    //     }
    //     if(!modal1){
    //         Init1()
    //     }
    // },[initials,modal,modal1])

    // const Init=async()=>{
    //     setData(null)
    //     const rows=await GetFleet()
    //     setData(rows)
    // }
    // const Init1=async()=>{
    //     setAvail(null)
    //     const av=await GetAvailability()
    //     setAvail(av)
    // }

    // const Init2=async()=>{
    //     setBook(null)
    //     const ship=await GetShipperInformation()
    //     setBook(ship)
    // }

    // // const handleLogout = event => {
    //     setLoading(true);
    //     Logout().then(t => window.open('/admin/login', '_self'));
    // }

    // const Initialize = () => {

    //     const result = queryString.parse(props.location.search);
    //     if (result && result.NewProduct) setValue(0);
    //     setInitials(true);

    // }

    // useEffect(() => {
        
    //     if (!initials) Initialize();
        
    // }, [initials])
    

    const classes = useStyles();
    return ( 
        <div>
            {/* {
            loading? <Loader />
               :
                <div> */}
                    <Grid container direction="row" xs={12}>
                        <Hidden smDown>
                            <Grid style={{paddingTop:"5px",minHeight:"100vh",background:"#2a2a2a"}} container direction="column" alignItems="flex-start" justify="flex-start" sm={2}>
                                
                                {/* <div style={{paddingLeft:35,marginBottom:10}}>
                                    <img className={classes.pic} src={require(`../../Assets/logo final-01.png`)} height="150" width="150"/>
                                    <Typography color="textSecondary" style={{fontSize:18.5,textAlign:"center"}}>Name</Typography>
                                </div> */}
                                    <span onClick={()=>{setValue(0)}} className={value=="profile"? classes.select:classes.notSelect}>
                                        {/* <img className={classes.paddR} src={require(`../../Assets/Icons/user.png`)} height="20" width="auto"/> */}
                                        <Typography className={classes.font} variant="body1" component="span">Blockchain</Typography>
                                    </span>                              
                                <Button style={{position:"fixed",bottom:"10px",left:"30px",width:150}}  variant="outlined" color="primary">Logout</Button>
                            </Grid>
                        </Hidden>
                        
                        <Grid container style={{height:"100%"}} direction="row" xs={12} sm={10}>
                            <Grid container justify="flex-end">
                              {/* <img className={classes.padd} src={require(`../../Assets/LOGO FORM.png`)} height="70" width="auto"/>          */}
                                {value===0 && <Button onClick={()=>setModal1(true)} className={classes.Top} color="primary" variant="contained">Create Block</Button>}
                                {/* {value===1 && <Button onClick={()=>setModal(true)} className={classes.Top} color="primary" variant="contained">Create New Vehicle</Button>}
                                {value===2 && ""} */}
                            </Grid>
                            <Grid container alignItems="flex-start">
                                {/* {value===1 && data ?  <TransporterTable rows={data} />:data===null? <Loader/>: ""}
                                {value===0 && avail? <Availability rows={avail}/>:avail===null?<Loader/>:"" }
                                {value===2 && book? <ShipperInformationTable rows={book}/>:book===null?<Loader/>:"" } */}
                            </Grid>
                        </Grid>

                        <Hidden smUp>
                            <Paper square className={classes.root}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    indicatorColor="primary"
                                    textColor="secondary"
                                    aria-label="icon label tabs example"
                                >
                                    <Tab icon={<PersonPinIcon />} label="Check Availability" />
                                    <Tab icon={<MeetingRoom />} label="Fleet Management" />
                                </Tabs>
                            </Paper>
                        </Hidden>

                    </Grid>
                {/* </div>
             }  */}
            {modal1 && role==='supplier'? <CreateBlockSupplierModal cities={cities} setOpen={setModal1}/>
                    :
            modal1 && role==='manufacturer'? <CreateBlockManufacturerModal cities={cities} setOpen={setModal1}/>
                    :
            modal1 && role==='transporter'? <CreateBlockTransporterModal cities={cities} setOpen={setModal1}/>
            :
            modal1 && role==='retailer'?<CreateBlockRetailerModal cities={cities} setOpen={setModal1}/>
            :
            modal1 && role==="consumer"?<CreateBlockConsumerModal cities={cities} setOpen={setModal1}/>
            :
            ""
            }
        </div>
    );
}
export default Dashboard;