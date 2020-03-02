import React,{useState} from 'react';
import { Grid, Typography,Hidden,Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../common/Loader'
import ButtonComponent from '../common/Button'

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
    mT:{
      marginTop:theme.spacing(2),
      marginBottom:theme.spacing(1)
    },
    
}));
  


const ProfileMobile = ({handleLogout,data}) => {
    const classes=useStyles();

    return ( 
        <div> 
            <Grid container justify="center" alignItems="center" direction="column">
                <img className={classes.pic} src={require(`../assets/Avatar.png`)} height="150" width="150"/>
                <Typography className={classes.mT}>{data.name}</Typography>
                <Typography variant="caption">{data.role}</Typography>
                <ButtonComponent variant="outlined" color="primary" onClick={()=>handleLogout()}>Logout</ButtonComponent>
            </Grid>
        </div>
     );
}
 
export default ProfileMobile;