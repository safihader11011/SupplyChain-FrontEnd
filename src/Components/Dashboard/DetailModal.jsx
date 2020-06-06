import React,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, Typography,Divider } from "@material-ui/core";

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
        textAlign:'center'
      }
  }));
  
const DetailModal = ({setOpen,data}) => {
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    
    const handleClose = () => {
        setOpen(false);
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
            {console.log(data)}
            <Grid container justify="center">
             <Typography variant="h4" color="primary" className={classes.heading}>{data.name}</Typography>
            </Grid>
          <div>
          {
              data.blocks.map((item)=>{
                  return(
                      <div className={classes.mt}>
                          {
                            item.name &&  
                            <div>
                              {console.log(item)}
                            <Typography variant="h6" style={{textAlign:"center",textTransform:"capitalize"}}>{item.role} DETAILS</Typography>
                            <Typography component="span" className={classes.bld}>Name : <Typography component="span">{item.name}</Typography><br/></Typography>
                            <Typography component="span" className={classes.bld}>Timestamp : <Typography component="span">{item.timestamp}</Typography><br/></Typography>
                            <div className={classes.bord}>
                            <Typography component="span" variant="h6" className={classes.bld}>Items Information</Typography>
                            {
                                item.data.map(prod=>{
                                    return(
                                        <div>
                                            {prod.price && <Typography component="span" className={classes.bld}>Price : <Typography component="span">{prod.price}</Typography><br/></Typography>}
                                            {prod.product && <Typography component="span" className={classes.bld}>Product : <Typography component="span">{prod.product}</Typography><br/></Typography>}
                                            {prod.products && <Typography component="span" className={classes.bld}>Products : <Typography component="span">{prod.products}</Typography><br/></Typography>}
                                            {prod.quantity && <Typography component="span" className={classes.bld}>Quantity : <Typography component="span">{prod.quantity}</Typography><br/></Typography>}
                                            {prod.expiry && <Typography component="span" className={classes.bld}>Expiry : <Typography component="span">{prod.expiry}</Typography><br/></Typography>}
                                            {prod.bought && <Typography component="span" className={classes.bld}>Bought : <Typography component="span">{prod.bought}</Typography><br/></Typography>}
                                            {prod.items && <Typography component="span" className={classes.bld}>Items Recieved : <Typography component="span">{prod.items}</Typography><br/></Typography>}
                                            {prod.profit && <Typography component="span" className={classes.bld}>Profit : <Typography component="span">{prod.profit}</Typography><br/></Typography>}
                                            {prod.sold && <Typography component="span" className={classes.bld}>Items Sold : <Typography component="span">{prod.sold}</Typography><br/></Typography>}
                                            {prod.left && <Typography component="span" className={classes.bld}>Items Left : <Typography component="span">{prod.left}</Typography><br/></Typography>}
                                            {prod.days && <Typography component="span" className={classes.bld}>Days Required : <Typography component="span">{prod.days}</Typography><br/></Typography>}
                                            {prod.retailers && <Typography component="span" className={classes.bld}>Number of Retailers : <Typography component="span">{prod.retailers}</Typography><br/></Typography>}
                                            {prod.cost && <Typography component="span" className={classes.bld}>Transportation Cost : <Typography component="span">{prod.cost}</Typography><br/></Typography>}
                                            {prod.count && <Typography component="span" className={classes.bld}>Count : <Typography component="span">{prod.count}</Typography><br/></Typography>}
                                            {prod.finalProduct && <Typography component="span" className={classes.bld}>Quantity of Final Products : <Typography component="span">{prod.finalProduct}</Typography><br/></Typography>}
                                            {prod.expiryDate && <Typography component="span" className={classes.bld}>Expiry Date : <Typography component="span">{prod.expiryDate}</Typography><br/></Typography>}
                                            {prod.manufacturingDate && <Typography component="span" className={classes.bld}>Manufacturing Date : <Typography component="span">{prod.manufacturingDate}</Typography><br/></Typography>}
                                            {prod.itemDetails && prod.itemDetails.map((item,index)=>{
                                              return(
                                                <Typography component="span" className={classes.bld}>{`Quantity of item ${index+1}`} : <Typography component="span">{item.value}</Typography><br/></Typography>
                                              )
                                            })}
                                            <Divider className={classes.divider}/>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <Divider className={classes.divider}/>
                            </div>
      
                        }
                      </div>
                  )
              })
          }
          </div>
         </Grid> 
      </Modal>
     );
}
 
export default DetailModal;