import React, { useState, useEffect } from 'react';
import { Grid, Typography, Hidden, Divider,Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { MeetingRoom } from '@material-ui/icons';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import {Logout,GetUser} from '../../Services/Auth-service'
import {GetBlockchains,GetAllChains} from '../../Services/AddBlocks'
import Loader from '../common/Loader'
import ChainTable from './ChainTable'
import DetailModal from './DetailModal'
import {GetAllUser,GetUserAllChains,DeleteBlockChain} from '../../Services/admin-services'
import UserTable from './userTable'
import UserChainDetails from './UserChainDetails'
import {GiBreakingChain} from 'react-icons/gi'
import {FaRegUser} from 'react-icons/fa'
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
        // backgroundColor:"#c0c0c0",
        // width:188,
        color:"#1C86EE",
        paddingTop:theme.spacing(3),
        paddingBottom:theme.spacing(3),
        cursor:"pointer",
        transition:"background 0.5s"
    },
    notSelect:{
        paddingLeft:theme.spacing(7),
        width:188,
        color:"white",
        paddingTop:theme.spacing(3),
        paddingBottom:theme.spacing(3),
        cursor:"pointer",
        transition:"background 0.5s"
    },
    font:{
        fontWeight:200,
        fontSize:17,
        //color:"white"
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


const AdminDashboard = (props) => {
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
    const [userInfo,setUserInfo]=useState()
    const [details,setDetails]=useState(false)
    const [row,setRow]=useState()
    const [ID,setID]=useState()
    const [user,setUser]=useState()
    const [deleteChain,setDeleteChain]=useState(false)
    const [init,setInit]=useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
    };

    //const {role}=props.match.params

    useEffect(()=>{
        if(!chain){
            getchain()
            if(!user){
                getUser()
                if(!userInfo){
                    getUserInfo()
                }
            }
        }
        if(ID){
            getUserChains()
        }
        if(deleteChain && !init){
            getchain()
            setInit(true)
        }

   },[chain,ID,deleteChain])

   const getUser=async()=>{
    GetUser()
    .then((res)=>{
        console.log(res)
        setUser(res)
    })
    .catch(err=>{
        setUser(err)
    })
}

   const getUserInfo=async()=>{
        GetAllUser()
        .then((res)=>{
            setUserInfo(res)
        })
        .catch(err=>{
            setUserInfo(err)
        })
   }

  const getUserChains =() => {
      GetUserAllChains(ID)
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
       console.log(res)
       setChain(res)
       setLoading(false)
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
                                
                                <div style={{paddingLeft:35,marginBottom:25}}>
                                    <img className={classes.pic} src={require(`../assets/Avatar.png`)} height="150" width="150"/>
                                    <Typography color="textSecondary" style={{fontSize:18.5,textAlign:"center",color:"white"}}>Admin</Typography>
                                </div>
                                <div onClick={()=>{setValue(0)}} className={value===0? classes.select:classes.notSelect}>
                                    <Typography className={classes.font} variant="body1" component="span">Blockchain</Typography>
                                </div>                              
                                <div onClick={()=>{setValue(1)}} className={value===1? classes.select:classes.notSelect}>
                                    <Typography className={classes.font} variant="body1" component="span">Users</Typography>
                                </div>                              
                                <Button style={{position:"fixed",bottom:"10px",left:"30px",width:150}}  onClick={()=>handleLogout()} variant="outlined" color="primary">Logout</Button>
                            </Grid>
                        </Hidden>
                        
                        <Grid container style={{height:"100%"}} direction="row" xs={12} sm={10}>
                            <Grid container justify="flex-end" alignItems="center">
                                <Grid container justify="center" >
                                    <img className={classes.padd} src={require(`../assets/icon.jpeg`)} height="70" width="auto"/>         
                                </Grid>
                                <Grid container justify="flex-end" xs={6}>
                                    {/* {value===0 && <Button onClick={()=>setModal1(true)} className={classes.Top} color="primary" variant="contained">Create Block</Button>} */}
                                </Grid>
                                {/* {value===1 && <Button onClick={()=>setModal(true)} className={classes.Top} color="primary" variant="contained">Create New Vehicle</Button>}
                                {value===2 && ""} */}
                                <Divider style={{width:"100%"}}/>
                            </Grid>
                            <Grid container alignItems="flex-start" justify="center">
                                {/* {value===1 && data ?  <TransporterTable rows={data} />:data===null? <Loader/>: ""}
                                {value===0 && avail? <Availability rows={avail}/>:avail===null?<Loader/>:"" }
                                {value===2 && book? <ShipperInformationTable rows={book}/>:book===null?<Loader/>:"" } */}
                                {
                                  value===0 && 
                                    <Grid container>
                                        <Typography variant="h5" className={classes.chain} color="primary">BLOCKCHAINS</Typography>
                                        {chain && <ChainTable setopen={setDetails} setDeleteChain={setDeleteChain} setRow={setRow} rows={chain}/>}
                                    </Grid>
                                }
                                {
                                    value===1 && 
                                    <Grid container>
                                         <Typography variant="h5" className={classes.chain} color="primary">Users</Typography>
                                         {userInfo && <UserTable setopen={setModal} setID={setID} rows={userInfo}/>}
                                    </Grid>
                                }
                                {value===2 && <div>{userInfo===null?<Loader/>:<ProfileMobile handleLogout={handleLogout} data={user}/>}</div>}
                                
                            </Grid>
                            {details && <DetailModal data={row} setOpen={setDetails}/>}
                            {modal && <UserChainDetails data={userChains} setData={setUserChains} setOpen={setModal}/>}
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
                                    <Tab icon={<GiBreakingChain style={{fontSize:20}}/>} label="Blockchains" />
                                    <Tab icon={<FaRegUser style={{fontSize:20}}/>} label="Users" />
                                    <Tab icon={<PersonPinIcon style={{fontSize:20}}/>} label="Profile" />
                                </Tabs>
                            </Paper>
                        </Hidden>

                    </Grid>
                    {/* {modal1 && role==='supplier'? <CreateBlockSupplierModal blockchains={chain} setOpen={setModal1}/>
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
                    } */}
                </div> 
            }
        </div>
    );
}
export default AdminDashboard;