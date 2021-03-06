import React, { useState, useEffect } from 'react';
import { Grid, Typography, Hidden, Divider,Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import { People, MeetingRoom } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CreateBlockSupplierModal from './Supplier/CreateBlockSupplierModal'
import CreateBlockManufacturerModal from './Manufacturer/CreateBlockManufacturerModal'
import CreateBlockTransporterModal from './Transporter/CreateBlockTransporterModal'
import CreateBlockRetailerModal from './Retailer/CreateBlockRetailerModal'
import CreateBlockConsumerModal from './Consumer/CreateBlockConsumerModal'
import {Logout,GetUser} from '../../Services/Auth-service'
import {GetBlockchains,GetAllChains} from '../../Services/AddBlocks'
import Loader from '../common/Loader'
import ChainTable from './ChainTable'
import DetailModal from './DetailModal'
import {CurrentUserID} from '../../Services/Auth-service'
import {GiBreakingChain} from 'react-icons/gi'
import ProfileMobile from './ProfileMobile'


const useStyles = makeStyles(theme => ({
    pic:{
        border:"2px solid #2e3344",
        marginTop:theme.spacing(14),
        borderRadius:theme.spacing(20),
        '&:hover':{
            transition:'filter 500ms,transform 800ms',
            filter:'brightness(50%)',
            transform:'scale(1.1)'
        }
        //borderRadius:theme.spacing(50)
    },
    padd:{
        marginTop:theme.spacing(3),
        paddingLeft:theme.spacing(4),
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
    },
    chain:{
        padding:theme.spacing(5)
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
    const [chain,setChain]=useState();
    const [userChains,setUserChains]=useState()
    const [userInfo,setUserInfo]=useState(null)
    const [details,setDetails]=useState(false)
    const [row,setRow]=useState()
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
    };

    const role=CurrentUserID()

    useEffect(()=>{
        if(!chain){
            getchain()
            if(!userChains){
                getUserChains()
                if(!userInfo){
                    getUserInfo()
                }
            }
        }

   },[chain])

   const getUserInfo=async()=>{
        GetUser()
        .then((res)=>{
            console.log(res)
            setUserInfo(res)
        })
        .catch(err=>{
            setUserInfo(err)
        })
   }

  const getUserChains =() => {
      GetAllChains()
      .then((res)=>{
         setUserChains(res)
         setLoading(false)
      })
      .catch(err=>{
        setLoading(false)
      })
  };

   const getchain=async()=>{
       const res=await GetBlockchains();
       setChain(res)
   }

    const handleLogout = event => {
        setLoading(true);
        Logout().then(t => window.open('/', '_self'));
    }

    
    const classes = useStyles();
    return ( 
        <div>
            {
            loading? <Loader />
               :
                <div>
                    <Grid container direction="row" xs={12}>
                        <Hidden smDown>
                            <Grid style={{paddingTop:"5px",height:"100vh",background:"#2a2a2a",position:"sticky",top:0,left:0}} container direction="column" alignItems="flex-start" justify="flex-start" sm={2}>
                                
                                <div style={{paddingLeft:35,marginBottom:10}}>
                                    <img className={classes.pic} src={require(`../assets/Avatar.png`)} height="150" width="150"/>
                                    <Typography color="textSecondary" style={{fontSize:18.5,textAlign:"center",color:"white"}}>{userInfo? userInfo.name:"User"}</Typography>
                                </div>
                                    <span onClick={()=>{setValue(0)}} className={value=="profile"? classes.select:classes.notSelect}>
                                        {/* <img className={classes.paddR} src={require(`../assets/icon.jpg`)} height="20" width="auto"/> */}
                                        {/* <Typography className={classes.font} variant="body1" component="span">Blockchain</Typography> */}
                                    </span>                              
                                <Button style={{position:"fixed",bottom:"10px",left:"30px",width:150}}  onClick={()=>handleLogout()} variant="outlined" color="primary">Logout</Button>
                            </Grid>
                        </Hidden>
                        
                        <Grid container style={{height:"100%"}} direction="row" xs={12} sm={10}>
                            <Grid container justify="flex-end" alignItems="center">
                                <Grid container justify="flex-start"  xs={6}>
                                    <img className={classes.padd} src={require(`../assets/icon.jpeg`)} height="70" width="auto"/>         
                                </Grid>
                                <Grid container justify="flex-end" xs={6}>
                                    {value===0 && <Button onClick={()=>setModal1(true)} className={classes.Top} color="primary" variant="contained">Create Block</Button>}
                                </Grid>
                                {/* {value===1 && <Button onClick={()=>setModal(true)} className={classes.Top} color="primary" variant="contained">Create New Vehicle</Button>}
                                {value===2 && ""} */}
                                <Divider style={{width:"100%"}}/>
                            </Grid> 
                            <Grid container alignItems="flex-start" justify="center">
                                {
                                    value==0 &&
                                    <Grid container>
                                    <Typography variant="h5" className={classes.chain} color="primary">BLOCKCHAINS</Typography>
                                    {
                                        userChains && <ChainTable setopen={setDetails} setRow={setRow} rows={userChains}/>   
                                    }
                                    </Grid>
                                }
                                {value===1 && <div>{userInfo===null?<Loader/>:<ProfileMobile handleLogout={handleLogout} data={userInfo}/>}</div>}
                                {/* {value===1 && userInfo!==null && <ProfileMobile handleLogout={handleLogout} data={userInfo}/>} */}
                                {/*{value===0 && avail? <Availability rows={avail}/>:avail===null?<Loader/>:"" }
                                {value===2 && book? <ShipperInformationTable rows={book}/>:book===null?<Loader/>:"" } */}
                                
                            </Grid>
                            {details && <DetailModal data={row} setOpen={setDetails}/>}
                        </Grid>
                        <Hidden smUp>
                            <Paper square className={classes.root}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    indicatorColor="secondary"
                                    textColor="primary"
                                    aria-label="icon label tabs example"
                                >
                                    <Tab  icon={<GiBreakingChain style={{fontSize:20}}/>} label="Blockchains" />
                                    <Tab icon={<PersonPinIcon style={{fontSize:20}}/>} label="Profile" />
                                </Tabs>
                            </Paper>
                        </Hidden>

                    </Grid>
                    {modal1 && role==='supplier'? <CreateBlockSupplierModal blockchains={chain} setOpen={setModal1}/>
                    :
                    modal1 && role==='manufacturer'? <CreateBlockManufacturerModal blockchains={chain} setOpen={setModal1}/>
                            :
                    modal1 && role==='transporter'? <CreateBlockTransporterModal blockchains={chain} setOpen={setModal1}/>
                    :
                    modal1 && role==='retailer'?<CreateBlockRetailerModal blockchains={chain} setOpen={setModal1}/>
                    :
                    modal1 && role==="consumer"?<CreateBlockConsumerModal blockchains={chain} setOpen={setModal1}/>
                    :
                    ""
                    }
                </div> 
            }
        </div>
    );
}
export default Dashboard;