import React,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, Typography,Divider } from "@material-ui/core";
import Loader from '../common/Loader'

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
      },
      mt:{
          marginTop:theme.spacing(3)
      },
      bld:{
        fontWeight:"bold"
      },
      divider:{
        margin:theme.spacing(4,0,2,0)
      },
      heading:{
        marginBottom:theme.spacing(3)
      },
      bord:{
        border:'0.5px solid lightgrey',
        borderRadius:8,
        padding:theme.spacing(1),
        textAlign:'center',
        marginTop:theme.spacing(3)
      }
  }));
  
const UserChainDetails = ({setData,setOpen,data}) => {
    const [modalStyle] = React.useState(getModalStyle);
    const [loading,setLoading]=useState(true)
    const classes = useStyles();
    
    const handleClose = () => {
        setOpen(false);
        setData()
    };

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
          justify="center"
        >
            {
              loading && !data?
              <Loader/>
                :
              <div>
                <Grid container justify="center">
                <Typography variant="h4" color="primary" className={classes.heading}>User's Blockchains</Typography>
                </Grid>
                {
                    data.length===0 ? <Typography style={{textAlign:"center"}}>No Data To Show</Typography>
                    :
                    data && data.map(item=>{
                        return(
                            <div className={classes.bord}>
                                <Typography component="span" className={classes.bld}>Blockchain Name : <Typography component="span">{item.name}</Typography><br/></Typography>
                                <Typography component="span" className={classes.bld}>Timestamp : <Typography component="span">{item.timestamp}</Typography><br/></Typography>
                                <Typography component="span" className={classes.bld}>Number of Blocks : <Typography component="span">{item.blocks.length}</Typography><br/></Typography>
                            </div>
                        )
                    })
                }
            </div>
            }
         </Grid> 
      </Modal>
     );
}
 
export default UserChainDetails;