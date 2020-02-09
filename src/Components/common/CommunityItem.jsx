import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    image: {
        height: 75,
        width: 75,
        marginBottom: 10
    },
    title: {
        color: '#2d2d2d',
        fontSize: 15
    },
    text: {
        color: '#b6b6b6',
        fontSize: 10
    },
    heading: {
        color: '#2d2d2d'
    }
}))

const CommunityItem = ({ data }) => {

    const classes = useStyles();
    return (
        <Grid container direction='column'>
            
            <img src={data.image} className={classes.image} />
            <Typography className={classes.title}>{data.name}</Typography>
            
            <Typography className={classes.text}>Date Created: {data.createdOn}</Typography>
            <Typography className={classes.text}>Number of Members: {data.members}</Typography>
            <Typography className={classes.text}>Number of Threads: {data.threads}</Typography>
            
            <div style={{height:10}} />
            <Typography className={classes.text}><span className={classes.heading}>Description:</span> {data.description}</Typography>

        </Grid>
    )
}

export default CommunityItem
